---
layout: post
title:  "Introduction to Diffusion Models"
date:   2023-10-12
title_include: true
categories: blog
---

<script type="text/x-mathjax-config">
MathJax.Hub.Config({
  <!-- tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}, -->
  jax: ["input/TeX","output/HTML-CSS"],
  displayAlign: "left",
  "HTML-CSS": { scale: 110}
});
</script>

Diffusion models have emerged as a powerful class of generative models, particularly in generating high-quality images. They operate by progressively adding noise to training data and then learning to reverse this process, effectively generating new data samples from random noise. This approach is deeply rooted in concepts from statistical physics and stochastic differential equations (SDEs).

## Generative Modeling and the Role of the Score Function

In generative modeling, our goal is to estimate a data distribution $$q_{\text{data}}(x)$$ using a model $$p_{\theta}(x)$$ parameterized by $$\theta$$. A key concept in this context is the *score function*, defined as the gradient of the log-density of the data distribution:

$$s(x) = \nabla_x \log q_{\text{data}}(x)$$

This score function provides the direction in which the data density increases most rapidly and is instrumental in guiding the generation of new samples.

## Langevin Dynamics and the Fokker-Planck Equation

Langevin dynamics describe the evolution of a system under both deterministic forces and stochastic noise. In the context of diffusion models, they are used to sample from a distribution by iteratively updating samples with both gradient information (from the score function) and Gaussian noise:

$$x_{t+1} = x_t + \frac{\epsilon}{2} s(x_t) + \sqrt{\epsilon} z_t$$

where $$\epsilon$$ is a step size and $$z_t \sim \mathcal{N}(0, I)$$ is Gaussian noise. The corresponding Fokker-Planck equation describes the time evolution of the probability density function of the system's state, ensuring that, under appropriate conditions, the samples converge to the target distribution.

## Constructing the Forward and Reverse Processes

Diffusion models define a forward process that gradually adds noise to the data, transforming it into a simple prior distribution (e.g., Gaussian). This process can be modeled as a stochastic differential equation:

$$dx = f(x, t)\, dt + g(t)\, dW_t$$

where $$f(x, t)$$ is a drift term, $$g(t)$$ is a diffusion coefficient, and $$W_t$$ represents a Wiener process. The reverse process, which aims to denoise and generate new samples, follows a similar SDE but with time running backward.

## Estimating the Score Function

A critical challenge in diffusion models is accurately estimating the score function $$s(x)$$. One effective method is *denoising score matching*, which involves training a neural network to predict the gradient of the log-density of noisy data. The objective function for this training is:

$$\mathbb{E}_{q_{\sigma}(x)} \left[ \frac{1}{2} \left\| s_{\theta}(x) - \nabla_x \log q_{\sigma}(x) \right\|^2 \right]$$

where $$q_{\sigma}(x)$$ is the distribution of data corrupted with noise of level $$\sigma$$. By minimizing this objective, the model learns to approximate the true score function, enabling effective sample generation.

## Training and Sampling with Diffusion Models

Training a diffusion model involves two main steps:

1. **Defining a Noise Schedule**: Set a schedule for the noise levels to be added during the forward process, typically increasing over time.

2. **Learning to Denoise**: Train a neural network to reverse the noising process by estimating the score function at various noise levels.

Once trained, sampling from the model is achieved by starting with random noise and iteratively applying the learned reverse process to generate data samples that resemble the training data distribution.

> **Follow me on Twitter [@theujjwal9](https://twitter.com/theujjwal9)**