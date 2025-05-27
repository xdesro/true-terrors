---
title: 'Frequently-used ffmpeg recipes'
topics:
  - terminal
  - ffmpeg
  - encoding
publishDate: 2025-05-26T23:02:03.118Z
---

I use a `ffmpeg` at least twice weekly for stupid side projects and non-stupid side projects; here's a list for posterity and for my future self (who I adore) to keep track of commonly-used recipes.

### Converting .webm to .mp4

```sh
ffmpeg -fflags +genpts -i ${filename}.webm -r ${target frame rate} ${target filename}.mp4
```

The `+genpts` format flag _generates presentation timestamps_, which <abbr title="in my experience">IME</abbr> fixes some jank when trying to copy the file over directly. The `-r ${framerate}` bit is not required, but it's one more thing to sort out jank outputs.

### Converting a video to frames

```sh
ffmpeg -i ${input filename} ${output filename prefix}%d.png
```

The `%d` in the output filename adds a frame number to the end. If you have like 400 frames and you want all the filename numbers padded, you can do something like `%3d` instead, to output something like `frame_001.png` instead of `frame_1.png`.

### Converting frames back to video (or GIF)

```sh
ffmpeg -i frames/frame_%d.png output.gif
```

This one's pretty obvious lol, it just ingests the frame format however you specify. There might be different rules for converting to something other than `.gif` but I only tested `.gif` for this post.

For what it's worth, I tested both `.gif` with a soft G sound and `.gif` with a hard G sound but the output is the same.{.editors-note}

### Generating & consuming a color palette for GIFs, etc.

To generate a color palette:

```sh
ffmpeg -i input.mp4 -vf "palettegen" palette.png
```

To use that palette to optimize a GIF output:

```sh
ffmpeg -i frames/frame_%0d.png -i palette.png -filter_complex "paletteuse" output.gif
```
