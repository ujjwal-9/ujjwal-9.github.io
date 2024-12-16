---
layout: full-width
title: Research
weight: 3
---

## 3DCoMPaT
<p class="paper" markdown="1">
    *[3DCoMPaT: Composition of Materials on Parts of 3D Things](https://3dcompat-dataset.org/)*<br/>
    Published at ECCV 2022 Oral Track. <br/>
    Yuchen Li<sup>*</sup>, **Ujjwal Upadhyay**<sup>*</sup>, Habib Slim<sup>*</sup>, Ahmed Abdelreheem, Arpit Prajapati, Suhail Pothigara, Peter Wonka, Mohamed Elhoseiny
</p>

```We present 3D CoMPaT, a richly annotated large-scale dataset of more than 7.19 million rendered compositions of Materials on Parts of 7262 unique 3D Models; 990 compositions per model on average. 3DCoMPaT covers 43 shape categories, 235 unique part names, and 167 unique material classes that can be applied to parts of 3D objects. Each object with the applied part-material compositions is rendered from four equally spaced views as well as four randomized views, leading to a total of 58 million renderings (7.19 million compositions ×8 views). This dataset primarily focuses on stylizing 3D shapes at part-level with compatible materials. We introduce a new task, called Grounded CoMPaT Recognition (GCR), to collectively recognize and ground compositions of materials on parts of 3D objects.```

## 3DRefTransformer
<p class="paper" markdown="1">
    *[3DRefTransformer: Fine-Grained Object Identification in Real-World Scenes Using Natural Language](https://openaccess.thecvf.com/content/WACV2022/papers/Abdelreheem_3DRefTransformer_Fine-Grained_Object_Identification_in_Real-World_Scenes_Using_Natural_Language_WACV_2022_paper.pdf)*<br/>
    Published at WACV 2022. <br/>
    Ahmed Abdelreheem, **Ujjwal Upadhyay**, Ivan Skorokhodov, Rawan Al Yahya, Jun Chen, Mohamed Elhoseiny
</p>

```In this paper, we study fine-grained 3D object identification in real-world scenes described by a textual query. The task aims to discriminatively understand an instance of a particular 3D object described by natural language utterances among other instances of 3D objects of the same class appearing in a visual scene. We introduce the 3DRefTransformer net, a transformer-based neural network that identifies 3D objects described by linguistic utterances in real-world scenes. The network's input is 3D object segmented point cloud images representing a real-world scene and a language utterance that refers to one of the scene objects. The goal is to identify the referred object.```

## Deep-ASPECTS
<p class="paper" markdown="1">
    *[Deep-ASPECTS: A Segmentation-Assisted Model for Stroke Severity Measurement](https://arxiv.org/abs/2203.03622)*<br/>
    Published at ECCV 2022. <br/>
    **Ujjwal Upadhyay**, Mukul Ranjan, Satish Golla, Swetha Tanamala, Preetham Sreenivas, Sasank Chilamkurthy, Jeyaraj Pandian, Jason Tarpley
</p>

```The quick onset of a focused neurological deficit caused by interruption of blood flow in the territory supplied by the MCA is known as an MCA stroke. Alberta stroke programme early CT score (ASPECTS) is used to estimate the extent of early ischemic changes in patients with MCA stroke. This study proposes a deep learning-based method to score the CT scan for ASPECTS. Our work has three highlights. First, we propose a novel method for medical image segmentation for stroke detection. Second, we show the effectiveness of AI solution for fully-automated ASPECT scoring with reduced diagnosis time for a given non-contrast CT (NCCT) Scan. Our algorithms show a dice similarity coefficient of 0.64 for the MCA anatomy segmentation and 0.72 for the infarcts segmentation. Lastly, we show that our model's performance is inline with inter-reader variability between radiologists.```


## AI based gaze deviation detection to aid LVO diagnosis in NCCT

<p class="paper" markdown="1">
    *[AI based gaze deviation detection to aid LVO diagnosis in NCCT](https://jnis.bmj.com/content/14/Suppl_1/A41)*<br/>
    Published at Society of NeuroInterventional Surgery (SNIS) 2022. <br/>
    **Ujjwal Upadhyay**, Satish Golla, Shubham Kumar, Kamila Szweda, Reza Shahripour, Jason Tarpley
</p>

```Stroke caused by emergent large vessel occlusion (LVO) is a critical time-sensitive diagnosis requiring prompt identification to identify candidates for endovascular therapy (EVT). As a result, identifying imaging findings on non-contrast computed tomography (NCCT) that are predictive of LVO would aid in the identification of potential EVT candidates. We present and validate gaze deviation as an indicator for detecting LVO using NCCT. In addition, we present an Artificial Intelligence (AI) algorithm for detecting this indicator.```

## LVO Detection on CT Angiography using Deep Learning

<p class="paper" markdown="1">
    *[Deep Learning Based LVO Detection on CT Angiography of Brain](https://scholar.google.com/citations?view_op=view_citation&hl=en&user=lvpaXdEAAAAJ&citation_for_view=lvpaXdEAAAAJ:_FxGoFyzp5QC)*<br/>
    Published at International Journal of Stroke 2022. <br/>
    Shubham Kumar, Arjun Agarwal, Swetha Tanamala, Satish Golla, Preetham Putha, **Ujjwal Upadhyay**, Sasank Chilamkurthy, Jeyaraj Pandian
</p>


## Arterial Input Function Estimation on CT Perfusion

<p class="paper" markdown="1">
    *[Machine Learning Approach to Arterial Input Function Estimation in Cerebral Perfusion Imaging](https://scholar.google.com/citations?view_op=view_citation&hl=en&user=lvpaXdEAAAAJ&citation_for_view=lvpaXdEAAAAJ:Y0pCki6q_DkC)*<br/>
    Published at ECCV 2022. <br/>
    Ravi Kushawaha, Sasank Chilamkurthy, Satish Golla, **Ujjwal Upadhyay**, Swetha Tanamala, Preetham Putha, Ken Butcher
</p>


## Latent Space Poisoning
It's an adversarial attack which used JointVAE architecture to search the latent space for potential examples which can fool the black box classifer. The work ended up beating PGD based defenses on various datasets (MNIST, CelebA, and SVHN) and reducing its success rate by ~70%.

<p class="paper" markdown="1">
    *[Generating Out of Distribution Adversarial Attack using Latent Space Poisoning](https://arxiv.org/abs/2012.05027)*<br/>
    Published at IEEE SPL 2021. <br/>
    **Ujjwal Upadhyay**, Prerana Mukherjee
</p>

```In this paper, we propose a novel mechanism of generating adversarial examples where the actual image is not corrupted rather its latent space representation is utilized to tamper with the inherent structure of the image while maintaining the perceptual quality intact and to act as legitimate data samples. As opposed to gradient-based attacks, the latent space poisoning exploits the inclination of classifiers to model the independent and identical distribution of the training dataset and tricks it by producing out of distribution samples. We train a disentangled variational autoencoder (beta-VAE) to model the data in latent space and then we add noise perturbations using a class-conditioned distribution function to the latent space under the constraint that it is misclassified to the target label.```

## Stroke Care with AI in LMIC's
<p class="paper" markdown="1">
    *[AI improves stroke diagnosis and care at a low resource hospital in India](https://www.jns-journal.com/article/S0022-510X(21)02356-X/fulltext)*<br/>
    Published at Journal of the Neurological Sciences 2021. <br/>
    **Ujjwal Upadhyay**, Jemin Webster, Swetha Tanamala, Sasank Chilamkurthy, Satish Golla, Justy Antony Chiramal
</p>

```AI solution (qER) was developed to report abnormalities given a non-contrast CT (NCCT). qER compiles findings into a detailed report highlighting abnormalities, indicating affected brain region along with estimated volume for bleeds. These findings coupled with clinical symptoms helps identify stroke.```

## EmoSpeech Command Dataset
In collaboration with the IIT Delhi, Marconi Society and Google, My team developed and performed validation of a predictive model to target safety systems on edge devices. The source code is available on GitHub. Our work was reported in the [India Today](https://www.indiatoday.in/education-today/news/story/delhi-college-students-win-prestigious-marconi-awards-for-apps-on-women-safety-and-checking-air-pollution-1611854-2019-10-22), [The Hindu](https://www.thehindubusinessline.com/news/variety/delhi-students-solutions-for-womens-safety-air-pollution-bag-marconi-societys-celestini-programme-awards/article29765200.ece), and [Financial Express](https://www.financialexpress.com/industry/technology/benefits-of-connectivity-students-win-marconi-awards-for-innovative-apps/1747344/) among many others.
<p class="paper" markdown="1">
    *[Indian EmoSpeech Command Dataset: A dataset for emotion based speech recognition in the wild](https://arxiv.org/abs/1910.13801)*<br/>
    Submitted at Computer Speech and Language Journal.<br/>
    Subham Banga<sup>*</sup>, **Ujjwal Upadhyay**<sup>*</sup>, Piyush Agarwal<sup>*</sup>, Aniket Sharma<sup>*</sup>, Prerana Mukherjee
</p>

```Speech emotion analysis is an important task which further enables several application use cases. The non-verbal sounds within speech utterances also play a pivotal role in emotion analysis in speech. Due to the widespread use of smartphones, it becomes viable to analyze speech commands captured using microphones for emotion understanding by utilizing on-device machine learning models. The non-verbal information includes the environment background sounds describing the type of surroundings, current situation and activities being performed. In this work, we consider both verbal (speech commands) and non-verbal sounds (background noises) within an utterance for emotion analysis in real-life scenarios. We create an indigenous dataset for this task namely "Indian EmoSpeech Command Dataset". It contains keywords with diverse emotions and background sounds, presented to explore new challenges in audio analysis. ```

## Video Aggression Net
The project aims at identifying agressive activity from video.
<p class="paper" markdown="1">
    *[Video-AggNet: Fine-grained aggressive activity recognition in the wild]()*<br/>
    Submitted at IEEE ICME 2021.<br/>
    **Ujjwal Upadhyay**, Prerana Mukherjee, Anupama Ray, Ritu Garg
</p>

```In this paper, we propose an end-to-end attention guided fine-grained aggressive activity recognition framework namely \textit{Video-AggNet}. We make an inherent assumption that criminal activities that are recorded in CCTV cameras are highly influenced by the location of the objects and their movement that might affect other objects in future timestamp. In order to handle this, we provide a keyframe selection strategy which is used to sample out the relevant frames and reduce processing.```

<!-- ## Algorithmic Fairness
<p class="paper" markdown="1">
*[Prediction-Based Decisions and Fairness: A Catalogue of Choices, Assumptions, and Definitions](https://arxiv.org/abs/1811.07867)*<br/>
To Appear in Annual Review of Statistics, 2021<br/>
S Mitchell, **E Potash**, S Barocas, A D'Amour, K Lum
</p> -->
