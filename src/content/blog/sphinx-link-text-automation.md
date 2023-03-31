---
author: Kayce Basques
pubDatetime: 2023-03-30T11:11:11Z
title: The curious case of the missing link text automation feature
postSlug: link-text-automation
tags:
  - links
  - sphinx
description: >
  Sphinx's approach to link text improves docs maintainability and reduces
  toil. Why is this approach not more common?
---

<p>{frontmatter.description}</p>

(Throughout this post I use the term **docs SSGs** to refer to the static site
generators (SSGs) that most documentation websites are built on top of:
Docusaurus, Jekyll, Sphinx, and so on. The ideas in this post also apply to docs
content management systems (CMSs) like WordPress, readme.com, and so on.)

## Background

The Nielsen Norman Group has done quite a bit of research on how to create
effective link text:

* [A Link is a Promise]
* ["Learn More" Links: You Can Do Better]
* [Better Link Labels: 4 Ss for Encouraging Clicks]

Long story short, effective link text is specific, sincere, substantial, and
succinct.

The [Structure link text] section of the Google Developer Documentation Style
Guide has a helpful rule-of-thumb that gets you most of the way there without
having to think much: just use the exact text of the title or section heading
that you're referencing.

(Not having to think about this stuff is good! We technical writers have more
than enough to think about!!)

## Problems with how most docs SSGs approach link text

In most docs SSGs, you have to manually create and maintain the link text.
For example, over in `guide.md` we might have a section heading like this:

```
## How to enable text compression { #compression }
```

(Assume that `{ #compression }` is a non-standard feature that allows you
to define the ID for that section heading. This is another helpful feature that
is strangely lacking in many docs SSGs! But, alas, I will have to save that
idea for another day.)

And then over in `reference.md` we link to this section like this:

```
See [How to enable text compression](./guide#compression).
```

(Assuming that both docs live in the same directory.)

One thing that bugs me about this manual approach is the tendency for the link
text to rot over time. If you change the section heading in `guide.md` there
is no automatic detection that the link text in `reference.md` is now
out-of-date.

But most importantly, this manual approach is textbook [toil]. If you follow
the rule-of-thumb that link text should always match the document title or
section heading, then there should be a way to put a placeholder where you want
the title or heading to go, and when you build the site the placeholder is replaced
with the actual title or heading. There is [no raisin] to manually maintain
this crap. Not a single raisin! None!!

## How Sphinx handles link text

Automatic replacement of placeholders is exactly what Sphinx provides. Over in
`guide.rst` (previously `guide.md`, see the note below) you create an
[explicit target] to the section heading:

```
.. _compression:

==============================
How to enable text compression
==============================
```

(The filename changed from `guide.md` to `guide.rst` because most Sphinx sites
use [reStructuredText] (reST), not Markdown. Sphinx also supports a Markdown-y
syntax called [MyST].)

And then in `reference.rst` you simply add a reference to that section heading:

```
See :ref:`compression`.
```

This gets replaced with `How to enable text compression` at build time.

This solution totally fixes the toil problem but it doesn't quite fix the rot
problem. If you change that section heading in `guide.rst` there isn't really an
automated way to make sure that the link in `reference.rst` still makes sense.
The only solution I can think of for that problem is to create a linter like
[IfThisThenThat].

Another huge benefit of this approach is that the build system warns you when
you're linking to a section that no longer exists:

```
$ make html
Running Sphinx v6.1.3
...
/.../reference.rst:4: WARNING: undefined label: 'compression'
```

## The status of this feature in other docs SSGs

[If I wasn't so lazy] I would list out the exact status of this feature on
other docs SSGs. I am not going to do that, however, because, as previously
alluded to, I am lazy. I don't mean to imply that this feature is not supported
on any other docs SSG. I am sure there is some other docs SSG out there that
has "seen the light." From what I can tell, though, Sphinx has the best and
most prominent built-in support for this feature.

## ChatGPT's summary of this post

> Sphinx's approach to link text in documentation websites enhances
> maintainability and reduces toil, using placeholders to automatically update
> link text. This method effectively tackles the toil problem but does not
> completely address the issue of outdated link text when a section heading
> changes. While Sphinx is not the only platform to offer such features, it
> stands out for its built-in support. Despite its advantages, this approach is
> not more common in other documentation site generators or content management
> systems.

[explicit target]: https://docs.readthedocs.io/en/stable/guides/cross-referencing-with-sphinx.html#explicit-targets
[Sphinx]: https://www.sphinx-doc.org
[Structure link text]: https://developers.google.com/style/link-text#structure-link-text
[A Link is a Promise]: https://www.nngroup.com/articles/link-promise/
["Learn More" Links: You Can Do Better]: https://www.nngroup.com/articles/learn-more-links/
[Better Link Labels: 4 Ss for Encouraging Clicks]: https://www.nngroup.com/articles/better-link-labels/
[toil]: https://sre.google/sre-book/eliminating-toil/
[no raisin]: https://www.youtube.com/watch?v=V3ZUhWuiQ20
[MyST]: https://myst-parser.readthedocs.io/en/latest/
[reStructuredText]: https://www.sphinx-doc.org/en/master/usage/restructuredtext/index.html
[IfThisThenThat]: https://fuchsia.dev/fuchsia-src/development/source_code/presubmit_checks#ifthisthenthat
[If I wasn't so lazy]: https://www.youtube.com/watch?v=siGFs_NhcOk