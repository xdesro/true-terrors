---
title: 'Disabling WebGL in your browser'
drafted: false
topics:
  - code snippet
  - webgl
  - browsers
publishDate: 2025-05-07T15:58:00.000Z
hasToc: true
---

For testing different scenarios and user preferences, you can use these steps to disable WebGL in different browsers. These work for MacOS. If someone tells me how to do it in Windows or I get the gumption I'll update this post lol.

## Disabling WebGL in Firefox & Zen

1. Navigate your browser to `about:config`
2. In the search bar, type `webgl.disabled`.
3. Set the property that shows up to _true_.

To re-enable WebGL, you'll need to un-set this configuration property.

## Disabling WebGL in Google Chrome & Arc

For Chrome/Chromium-based browsers, you have to pass a special flag when you start the application. If you've installed Chrome somewhere other than the default location, you'll need to update this script accordingly.

1. In your Terminal, run:

```sh
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --disable-webgl
```

To re-enable WebGL, just close the browser completely and start it again how you normally would.

## Disabling WebGL in Safari, Edge, etc.

Sorry to bait you here with the headline. Haven't worked out how to do it yet, but I'll update when I do!{.editors-note}
