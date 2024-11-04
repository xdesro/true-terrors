---
title: How To Convert Variable TTF Font Files to WOFF2
slug: how-to-convert-variable-ttf-font-files-to-woff2
heroImage: ./img/2EE.william-j-simpson-LqRJ1Oc9zlw-unsplash.jpg
excerpt: I recently received a variable font file from a client to use on their website, but not in a webfont format, so I figured I'd hunt down a route to convert that TTF into a WOFF2 for use in @font-face declarations!
publishDate: 2020-01-09T12:30-07:00
socialSharingImage: ./img/4N3.Frame 9.png
tags:
  - article
category: tutorial
topics:
  - variable fonts
  - web fonts
---

## Impetus

<test-component></test-component>

I've been working on a project lately that requires the loading of many, many webfonts. For the main UI font alone, we needed to download over 980<abbr title="kilobytes">kB</abbr> of WOFF and WOFF2 files. As it happened, the client eventually developed a variable font version of the UI face, which was a much smaller 225kB file.

However, when I received the variable font file, I realized it was a TTF, and not the WOFF2 that I would need to implement it in a `@font-face` declaration for web. In previous experience, converting variable TTF to WOFF via online tools like convert.io or FontSquirrel would often break the axes needed to interpolate between font variation settings.

A cursory search yielded Google's [woff2 library](https://github.com/google/woff2), a tool for compressing TTF to WOFF2 — it worked perfectly. Here's how to do the thing.

## Installing the library

This is covered in `woff2`'s README file, but we'll go over each step here in a little more depth, so it's clear what's going on.

### Clone woff2 locally

Open a terminal and `cd` into whichever directory. This doesn't need to be installed in a specific place, just remember where you're putting it. For this tutorial, I'm going to clone it into my `~/Sites` directory.

```bash
cd ~/Sites
git clone --recursive https://github.com/google/woff2.git
cd woff2
```

Here, we entered the correct directory, cloned the repo recursively, and entered the cloned directory. `woff2` uses the Brotli compression library as a dependency, so you need the `--recursive` flag to clone everything inside this repo.

### Build woff2

Next, we'll run a command to build the library and its dependencies, which will create the scripts we'll need.

In the `woff2` directory:

```bash
make clean all
```

If there were no errors, we should be good to go! (If there _were_ errors, [send me a DM](https://twitter.com/messages/compose?recipient_id=2509306208) and we'll debug through so it so I can update this blog post with troubleshooting steps.

## Converting the `.TTF`

Now that we've created the binary scripts for compressing and decompressing TTF into WOFF, we can run them here. In this example, I've downloaded the variable TTF to my `~/Downloads` folder.

In the `woff2` directory:

```bash
./woff2_compress ~/Downloads/variable-font.ttf
```

You'll get some output like this:

```
Processing /Users/henry/Downloads/variable-font.ttf => /Users/henry/Downloads/variable-font.woff2
Compressed 216568 to 94577.
```

And voilà, we've got a variable WOFF2 file, ready for use on the web.

Thanks for taking the time to read this. If you've got any questions or concerns, please [reach out and touch faith](https://twitter.com/messages/compose?recipient_id=2509306208) and we'll work through it together! Have a great day.
