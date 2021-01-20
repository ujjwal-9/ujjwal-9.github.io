---
layout: post
title:  "Lean Proof Assistant"
date:   2021-01-21
title_include: true
categories: blog
image_url: /assets/img/intro-lean/cover.png
---

Lean is an open source proof assistant developed by Microsoft Research. 

[Github](https://github.com/leanprover/lean)



# Introduction

Mathematics is characterised by the inferences allowed in the justification for the statements. The justification of one mathematician can be checked by
another by checking that each inference is between those allowed. 

Mathematicians usually write proofs in natural languages using some special symbols to denote mathematical operations ($\int$ - Integration) and objects ($e$ - Euler's number). Logicians have agreed upon [rules of inference](https://en.wikipedia.org/wiki/List_of_rules_of_inference) which supports validity of proof.

Since these rules are mechanical, the process of checking is also mechanical as of now. But with advent of interactive theorem proving assistant it is possible to represent these proof in a manner that a machine can verify. One such proof assistant is lean (among other like Coq).

# Background on Lean

> Lean = Functional Programming + Logic

Lean encodes formal language in a version of **dependent type theory** (alternative to set theory) called *Calculus of Constructions*, with a countable hierarchy of non-cumulative universes and inductive types.

The only two things Lean can do is:
1. create terms 
2. check their types 

By iterating these two operations one can teach Lean to verify complex mathematical proofs.

Lets first look at simple type theory.

## Simple Type Theory

Everything is a set, including numbers, functions, triangles, stochastic processes, and Riemannian manifolds. Using these sets we can construct rich mathematical intutions. But it will be helpful if we can manage and keep track of the various kinds of mathematical objects we are working with.

*Type theory* states that every mathematical expression has a type. For example, $x$ may denote natural numbers and $f(x)$ may denote function on natural numbers maping them to lets say complex numbers. Such types conversions also make simple type theory even more powerful.

Lets see how we declare mathematical objects in lean and declare their types.

```lean
constant m : nat        -- m is a natural number
constants b1 b2 : bool  -- declare two constants at once

#check m                -- output: nat
#check b1               -- bool
#check b1 && b2         -- "&&" is boolean and
#check b1 || b2         -- boolean or
```

`constant` and `constants` commands introduce new constant symbols into the working environment. `#check` command asks Lean to report their types.

Lets see how we convert make new types out of others.

```lean
constants m n : nat
constant g : nat → nat → nat
constant g': nat → (nat → nat)   -- has the same type as g!
constant f : nat → nat           -- type the arrow as "\to" or "\r"
constant F : (nat → nat) → nat   -- a "functional"

#check g m n                     -- ℕ
#check g m                       -- ℕ → ℕ
#check F f                       -- ℕ
#check g m n                     -- ℕ
```

Thing to note from above example: 
1. Application of a function f to a value x is denoted `f x`. 
2. Arrows associate to the right, example. `the type of g is nat → (nat → nat)`. Thus g is a function that takes natural numbers and returns another function that takes a natural number and returns a natural number. 

Type theory also allows for partial application of a function where, as told in point 2 above, `g m` is a function that waits for argument `n` to return `g m n`.

> **Currying**, redefining a function to look like other.

## Types as Objects

Leans dependent type theory extends simple type theory by making types as object of study themselves. We can also declare new constants and constructors for types.

```lean
constants α β : Type
constant F : Type → Type
constant G : Type → Type → Type

#check nat               -- Type
#check bool              -- Type
#check nat → bool        -- Type
#check nat × bool        -- Type
#check α                 -- Type
#check F α               -- Type
#check F nat             -- Type
#check G α               -- Type → Type
#check G α β             -- Type
#check G α nat           -- Type
```

Type list α denotes the type of lists of elements of type α.

```lean
constant α : Type

#check list α    -- Type
#check list nat  -- Type
```

> Lean has an infinite hierarchy of types. It's type also has type.

```lean
#check Type     -- Type 1
#check Type 1   -- Type 2
#check Type 2   -- Type 3
```

## Functions

How do we create a function from another expression? We use process known as *abstraction*, or *lambda abstraction*.

`x: α` and `t: β`. `fun x : α, t` is equivalent with `λ x : α, t`. Both are object of type α → β.

Example. $f(x) = x + 5$, where $x$ is natural number. It is translated in lean as `λ x : nat, x + 5`

```lean
constants α β  : Type
constants a1 a2 : α
constants b1 b2 : β

constant f : α → α
constant g : α → β
constant h : α → β → α
constant p : α → α → bool

#check fun x : α, f x                      -- α → α
#check λ x : α, f x                        -- α → α
#check λ x : α, f (f x)                    -- α → α
#check λ x : α, h x b1                     -- α → α
#check λ y : β, h a1 y                     -- β → α
#check λ x : α, p (f (f x)) (h (f a1) b2)  -- α → bool
#check λ x : α, λ y : β, h (f x) y         -- α → β → α
#check λ (x : α) (y : β), h (f x) y        -- α → β → α
#check λ x y, h (f x) y                    -- α → β → α
```

>  Expression `λ x : α, x` denotes the identity function on α

> We can leave type annotations on the variable, lean will infer it.

`λ x, g (f x)` == `λ x : α, g (f x)`  


# Example

Here we prove that **prime numbers are more than any assigned multitude of prime numbers**.

> This proposition states that there are more than any finite number of prime numbers, that is to say, there are infinitely many primes.

## Outline of proof

[Source](https://mathcs.clarku.edu/~djoyce/java/elements/bookIX/propIX20.html)

- Suppose that there are n primes, a1, a2, ..., an. Euclid, as usual, takes an specific small number, n = 3, of primes to illustrate the general case. Let m be the least common multiple of all of them. 
> The least common multiple was also considered in proposition [IX.14](https://mathcs.clarku.edu/~djoyce/java/elements/bookIX/propIX14.html). It wasn’t noted in the proof of that proposition that the least common multiple of primes is their product, and it isn't noted in this proof, either.

- Consider the number m + 1. If it’s prime, then there are at least n + 1 primes.

- So suppose m + 1 is not prime. Then according to [VII.31](https://mathcs.clarku.edu/~djoyce/java/elements/bookVII/propVII31.html), some prime g divides it. But g cannot be any of the primes a1, a2, ..., an, since they all divide m and do not divide m + 1. Therefore, there are at least n + 1 primes. Q.E.D.

- This proposition is not used in the rest of the Elements.


## Lean Proof

```lean
-- Definitions about natural numbers and primes
import data.nat.prime

-- Library on linear arithmatic
import tactic.linarith

-- Define namespace, which is natural numbers in this case
open nat 


-- Define theorem or goal to prove
theorem infinitude_of_primes: ∀ N, ∃ p >= N, prime p :=
-- between begin-end block we write tactics
begin
  -- define N to be a natural number as a part of our local hypothesis
  intro N,

  -- Continue with proof as mentioned in link provided in header
  -- let M to be N! + 1 : local definition
  let M := factorial N + 1,
  
  -- let p be smallest prime factor of M which is not 1
  let p := min_fac M,


  -- define supporting hypothesis pp, p is prime
  have pp : prime p := 
  -- begin proof for supporting p being prime
  begin
    -- minimum factor of a number is prime, but what about if M = 1
    refine min_fac_prime _,
    -- so here we prove M != 1 (or M > 1)
    have : factorial N > 0 := factorial_pos N,
    -- this just automatically takes care of linear arithmatic required for proof
    linarith,
  end,

  -- before this we had existenial statement but now we have condition in p
  use p,

  -- split our goal in  2 subgoals
  split,

  -- proof by contradiction so it should output False
  {by_contradiction,
   
   /- hypothesis h1, p divides N! + 1 proved by  
   min_fac_dvd : ∀ (n : ℕ), n.min_fac ∣ n
   -/
   have h₁ : p ∣ factorial N + 1 := min_fac_dvd M, 
   
   -- hypothesis h2, p divides N!
   have h₂ : p ∣  factorial N := 
   begin
     refine pp.dvd_factorial.mpr _,
     -- proved p <= N, using hypothsis h
     exact le_of_not_ge h,
   end,
   /-
   proved using dvd_add_right with support from local hypothesis h₂ and h₁
   -/
   have h : p ∣ 1 := (nat.dvd_add_right h₂).mp h₁,
   -- prime not dividing one using local hypothesis pp and h
   exact prime.not_dvd_one pp h, },
   -- second part of proof is just our hypothesis pp that we already proved
  {exact pp, },
end
```

<!-- <script src="https://gist.github.com/Ujjwal-9/36967b848bd1fa8c21b6e20b35a680b9.js"></script> -->

# Reference

[Theorem proving in lean](https://leanprover.github.io/theorem_proving_in_lean/)

[lean-forward.github.io](https://lean-forward.github.io/logical-verification/2020/)

[Natural Number Game By Kevin Buzzard and Mohammad Pedramfar.](https://wwwf.imperial.ac.uk/~buzzard/xena/natural_number_game/)

[Formalizing 100 theorems](http://www.cs.ru.nl/~freek/100/index.html)

[Xena Project](https://xenaproject.wordpress.com/)

[The Future of Mathematics?](https://www.youtube.com/watch?v=Dp-mQ3HxgDE&ab_channel=MicrosoftResearch)