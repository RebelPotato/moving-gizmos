# Moving Gizmos

A tiny&opinionated js library(?) for [explorable explainations](https://explorabl.es), data driven stories, and things like that.

Or: cheap explorables done quick

## The code

This is quite work in progress, but you can see an example in the playground.

## The story

### I accidentally js framework

The other day I saw [Idyll lang](https://idyll-lang.org/docs) and I was glad: I've always wanted an easier way to write interactive documents. However, it uses *React*. Surely this can be smaller, I thought.

So I wrote a handful of web components, which quickly turned into this library/framework.

### How this works

The library is basically built upon [preact/signals](https://preactjs.com/guide/v10/signals) library. Add a couple of html shorthands, add some sugar for writing markdown-like articles, and behold: your very own framework!
