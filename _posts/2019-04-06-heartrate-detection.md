---
layout: post
title:  "Heartrate detection using camera"
date:   2019-04-06
title_include: true
categories: blog
image_url: /assets/img/heartrate/cover.png
---

Euler Video Magnification [Project Link](https://people.csail.mit.edu/mrub/evm/) at MIT CSAIL

<script type="text/x-mathjax-config">
MathJax.Hub.Config({
  <!-- tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}, -->
  jax: ["input/TeX","output/HTML-CSS"],
  displayAlign: "left",
  "HTML-CSS": { scale: 110}
});
</script>


# Introuction

The world generates countless signals as it moves ahead in time, but most of these signals are invisible to the human eyes. This is due to the frequency of these signals, either it is too low to be perceived as change or it is too high that we can’t see the change actually occurring.

Finding a pattern in a seemingly random event is about how do we process the given information and convert it into something useful. In this article, we try to connect the dots of predicting heart rate with a camera alone. For this, we tag the video frame with actual heart rate and get to know which features impact an accurate prediction. For example which color signal in our RGB frames contributes towards better prediction and many more such small details.

Take for instance our eyes and our ability to understand facial expressions in others. These changes last in a long enough amount of time that we are able to perceive it. But changes exhibited by a heart rate last for a very short period of time and hence become invisible to us. With the camera of a sufficiently high frame rate, i.e almost all modern cameras, these changes become visible. And hence we can find the heart rate.

In this blog, we are going to introduce the algorithms required and demonstrate how to read a persons heart rate with a camera alone. The technique is called Euler Video Magnification.

## Measuring Heart Rate

In order to measure your heart rate, doctors have traditionally relied upon technology that is based on monitors with leads that attach to your body. These devices measure one of the following pulses:

1. **Radial Pulse**: Place your pointer and middle fingers on the inside of your opposite wrist just below the thumb and then count how many beats you feel in 1 minute.
2. **Carotid Pulse**: Place your pointer and middle fingers on the side of your windpipe just below the jawbone and then count how many beats you feel in 1 minute.
3. **Brachial Pulse**: Another location for checking your pulse is the [brachial artery](https://www.healthline.com/human-body-maps/brachial-artery). This method is used most commonly in young children.

## Overview of Euler video magnification

A computational technique for visualizing subtle color and motion variations in ordinary videos by making the variations larger. It is a *microscope for small changes* that are hard or impossible for us to see by ourselves. In addition, these small changes can be quantitatively analyzed and used to recover sounds from vibrations in distant objects, characterize material properties, and, in this case, remotely measure a person’s pulse.

## Concept

The general concept behind this algorithm is to first of all approximate a point on the forehead.

The intensity of this point is then decomposed into different color space namely Red, Blue, Green. But we prefer Red and Green color only as Blue tends to introduce noise in heart rate detection.


{% maincolumn 'https://cdn-images-1.medium.com/max/2000/1*rBux120Fg5f-jZUyB8P-0A.png' 'Figure 1: Average Color Intensity Variation of a Location specified on the forehead.' %}

{% maincolumn 'https://cdn-images-1.medium.com/max/2000/1*YCLMq00v1riy1at2b5-kwg.png' 'Figure 2: Heart Rate extracted by Fourier Transform.' %}



The variation in Red and Green colorspace on the location approximated on the forehead is then fed to **Fourier Transform** to convert the function of spatial location on the video frame and time to frequency domain which therefore helps in extracting heart rate.

## What is Fourier transform?

Fourier transform decomposes (also called *analysis*) a [function](https://en.wikipedia.org/wiki/Function_(mathematics)) of time (a *signal*) into its constituent frequencies. The Fourier transform of a function of time is itself a [complex](https://en.wikipedia.org/wiki/Complex_number)-valued function of frequency, whose magnitude component represents the amount of that frequency present in the original function, and whose [complex argument](https://en.wikipedia.org/wiki/Complex_argument) is the [phase offset](https://en.wikipedia.org/wiki/Phase_offset) of the basic sinusoid in that frequency. You can learn the basics of Fourier transform from this video.

{% youtube spUNpyF58BY %}


Now let’s talk about some amplification techniques namely Lagrangian and Eulerian. These techniques will help us in amplifying the particular frequency so that we can see change happening at that rate, in our case heart rate.

## Lagrangian perspective

The Lagrangian version of amplification is to analyze the angle of motion of the pixels of interest in the tracking image. For example, if we want to study the flow rate of the river, we take a boat, go down the river, and record the movement of the ship.


{% maincolumn 'https://cdn-images-1.medium.com/max/2000/1*eODd2ohQgUxhCOOBvdqwfA.png' 'Lagrangian perspective of flow.'%}



**However, the Lagrange perspective approach has the following shortcomings:**

➔ It is necessary to accurately track and estimate the trajectory of particles, which requires more computational resources.

➔ The tracking of the particles is performed independently, and with the consideration, that system is closed i.e there is no transfer of energy in and out of frame being studied. So the lack of consideration of the overall image is prone to the fact that the image is not closed, thereby affecting the effect of the amplification.

➔ The amplification of the action of the target object is to modify the motion trajectory of the particle. Since the position of the particle changes, it is necessary to fill the original position of the particle, as there is a continuous flow in action and system is closed therefore some other particle will take the position. This increases the complexity of the algorithm.

> What is “change” — the trajectory of the pixel of interest over time, such pixels often need to be assisted by manual or other prior knowledge;

> Amplify “change” — increase the amplitude of these pixels.

## Euler perspective

Unlike the Lagrangian perspective, the Euler version of amplification does not explicitly track and estimate the motion of the particle but instead fixes the perspective in one place, such as the entire image.

After that, it is assumed that the **entire image is changing,** but the characteristics of the signals like frequency, amplitude, etc. are varying. So we are interested in the change in the signals. In this way, the amplification of the “change” becomes the precipitation and enhancement of the frequency band of interest. For example, the same is to study the flow rate of river water. We can also sit on the shore and observe the change of the river when it passes through a fixed place. This change may contain many components that are not related to the water flow itself, such as the leaves falling off the water surface. Oh, but we only focus on the part that best reflects the water flow rate.

{% maincolumn 'https://cdn-images-1.medium.com/max/2000/1*P__1_fSDtjWqBWnvDNo3Ew.png' 'Eulerian perspective of flow.'%}

> What is “change” — the whole scene is changing, and the change signals we are interested in are hidden in it;

> Amplify “change” — Separate and enhance the signal of interest by means of signal processing.

## Explanation

Now, why are we able to extract heart rate from the sequence of the frame? It is because the heart pushes the blood to every part of the body and to the head particularly (towards the brain), so it changes the color and opacity of the skin. These changes can be detected by analyzing the average red or green component of the frames, taken from the camera. We learned the above concepts to be able to understand the different filters required to develop the said application. The analysis is done using the following approach :

1. **Spatial filtering.** Pyramid multiresolution decomposition of the video sequence; This is done to extract features/structures of interest, and to attenuate noise.
2. **Time domain filtering.** Performing time-domain bandpass filtering on the images of each scale to obtain several frequency bands of interest; This is done using Fourier transform.
3. **Amplify the filtering result.** The signal of each frequency band is differentially approximated by Taylor series, and the result of linear amplification is approximated; This is why we studied Euler amplification above.
4. **Composite image.** The amplified image is synthesized.

The spatial and temporal processing is used to emphasize subtle temporal changes in a video.

{% maincolumn 'https://cdn-images-1.medium.com/max/2000/1*PIbHq6tg6djUwnmelOhaDw.png' 'Figure 3: Architecture for Euler Video Magnification.'%}


The video sequence is decomposed into different spatial frequency bands. These bands might be magnified differently due to the difference in their SNR (Signal To Noise Ratio). The goal of spatial processing is simply to increase the temporal signal-to-noise ratio by pooling multiple pixels, then for the purpose of **computational efficiency and spatial filtering**, the low-pass filter is applied to the frames of the video spatially and then downsampled using **Laplace Pyramid**.


### What is the Laplace Pyramid?

To understand this first of all we need to understand Gaussian Pyramid.

The original image is convolved with a Gaussian kernel. As described above the resulting image is a low pass filtered version of the original image. The cut-off frequency can be controlled using the parameter σ that is standard variation.

{% maincolumn 'https://cdn-images-1.medium.com/max/2000/1*DvmPVVn8qAFibpwcmj_ybA.png' 'Figure 4: Laplacian Pyramid Implementation. star represents convolution operation with Gaussian filter and downward arrow represent downsampling of the image.'%}

The Laplacian is then computed as the difference between the original image and the low pass filtered image i.e it’s the difference between successive gaussian pyramid levels. This process is continued to obtain a set of band-pass filtered images (since each is the difference between two levels of the Gaussian pyramid). Thus the Laplacian pyramid is a set of bandpass filters

{% maincolumn 'https://cdn-images-1.medium.com/max/2000/1*MFjKM3pJIBluxOvjDiyZJQ.png' 'Figure 5: I,f represent Gaussian images and h represent laplacian images'%}


The original image is repeatedly filtered and subsampled to generate the sequence of reduced resolution images. These comprise a set of low pass filtered copies of the original image in which the bandwidth decreases in one-octave steps.

So after using Laplace pyramid we then perform temporal processing on each spatial band. The time series corresponding to the value of a pixel in a frequency band is passed through a bandpass filter to extract the frequency bands of interest. For heart rate detection, I selected frequencies within 0.4–4Hz, corresponding to 24–240 beats per minute (this was specified in EVM paper itself) to magnify a pulse. The temporal processing is uniform for all spatial levels, and for all pixels within each level that is the time series of every pixel is passed through the same filter.

## How is it done?

Spatial Filtering: It is done to spatially filter the video sequence to obtain basebands of different spatial frequencies. The purpose of spatial filtering is simply to “spelt” multiple adjacent pixels into one piece, a low pass filter can be used. In fact, linear EVM uses Laplacian pyramids or Gaussian pyramids for multiresolution decomposition.

Time Domain Filtering: After obtaining the basebands of different spatial frequencies, bandpass filtering in the time domain is performed for each baseband in order to extract the part of the change signal we are interested in. For example, if we want to amplify the heart rate signal, we can choose bandpass filtering from 0.4 to 4 Hz (24 to 240 bpm). This band is the range of human heart rate.

## Amplification :

$$\hat I(x,t) = f(x+(1+ \alpha)\delta(t)$$

This represents Color Intensity of the pixels at location x in time t. δ(t) represents the displacement function. α is the amplification factor.


$$ f(x + δ(t)) $$ in a first-order Taylor expansion about x, can be represented as:

$$ I(x,t) \approx f(x) + \delta(t) \frac{\partial f(x)}{\partial x} $$


$$ f(x) = f(a) + f'(a)(x-a) $$

This is first order Taylor expansion. Here $$ (x-a) $$ is displacement function.

The temporal bandpass filter is selected to pull out the motions or signals that we wish to be amplified.

$$ B(x,t) = \delta(t) \frac{\partial f(x)}{\partial x} $$

This is a temporal Bandpass filter which is a result of applying a broadband temporal bandpass filter to $$ I(x, t) $$ at every position x. For now, $$ \delta(t) $$, is within the passband of the temporal bandpass filter.


> Tip: For color amplification of blood flow, a narrow passband produces a more noise-free result.

{% maincolumn 'https://cdn-images-1.medium.com/max/2000/1*ET0w7uEXFCneh4BMRVdkgQ.png' 'Figure 6: The ideal filters (a) and (b) are implemented using DCT (Discrete Cosine Transform). The second- order IIR filter (d) have a broader passband than an ideal filter.'%}

> Important: The Butterworth filter is used to convert a user-specified frequency band into a second-order IIR (infinite impulse response) and is used in our real-time application.

This shows that the frequency response of some of the temporal filters used in the paper. Ideal bandpass filters are used for color amplification as they have passbands with sharp cutoff frequencies.

For pulse detection, after computing Laplacian pyramid the magnification value or amplification factor α, for the finest two levels are set to 0. This causes downsampling and applies a spatial low pass filter to each frame to reduce both quantization and noise and to boost the subtle pulse signal that we are interested in. The incoming video frame is then passed through an ideal bandpass filter with a passband of 0.83 Hz to 1 Hz (50 bpm to 60 bpm). Finally, a large value of α ≈ 100 (amplification factor) and λc ≈ 1000 (**cutoff frequency, beyond which an attenuated version of α is used that is either force α to zero for all λ < λc, or linearly scale α down to zero. This is important parameter in controlling noise**) was applied to the resulting spatially lowpass signal to emphasize the color change as much as possible. The final video was formed by adding this signal back to the original.

{% maincolumn 'https://cdn-images-1.medium.com/max/2000/1*ET0w7uEXFCneh4BMRVdkgQ.png' 'Figure 6: The ideal filters (a) and (b) are implemented using DCT (Discrete Cosine Transform). The second- order IIR filter (d) have a broader passband than an ideal filter.'%}

{% youtube 3rWycBEHn3s %}

In this video, we can see periodic green to red variations at the heartbeat and how blood perfuses the face.

**“Higher α can exaggerate specific motions or color changes at the cost of increased noise.”** In some cases, one can account for color clipping artifacts by attenuating the chrominance components of each frame. This approach achieves this by doing all the processing in the YIQ space. Users can attenuate the chrominance components, I and Q, before conversion to the original color space.

***“The paper [Eulerian Video Magnification for Revealing Subtle Changes in the World](http://people.csail.mit.edu/mrub/papers/vidmag.pdf) is the work of the MIT CSAIL team.”***


## Conclusion

This algorithm can find its use in many aspects of our life like in pulse oximetry which is limited to certain application areas (usually the fingertip) and bears the risk of the probe failing due to the movement of the patient or low perfusion of the hands during long-time recordings. These limitations can be overcome by the analysis of video signals using this technique, which do not depend on contact-based measurement hardware and can be applied to well-circulated body areas (e.g. the head).

The world’s expanding and aging population has created a demand for inexpensive, unobtrusive, automated healthcare solutions. Eulerian Video Magnification (EVM) aids in the development of these solutions by allowing for the extraction of physiological signals from video data. This paper examines the potential of thermal video in conjunction with EVM to extract physiological measures, particularly heart rate.


> **Follow me on twitter [@theujjwal9](https://twitter.com/theujjwal9)**