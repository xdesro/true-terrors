---
title: 'A bookmarklet for clearing cookies for the current page'
drafted: false
topics:
  - code snippet
  - bookmarklets
  - cookies
publishDate: 2025-05-13T13:22:00.000Z
hasToc: true
---

## TL;DR

Here's the one-liner:

<!-- prettier-ignore-start -->
```js
javascript:!(function(){try{const o=window.location.hostname;const t=document.cookie.split(";");const c=(new Date).toUTCString();t.forEach(e=>{const t=e.match(/^(.*?)=/)[1];if(t.startsWith("__Host-")){document.cookie=`${t}$=;expires=${c};path=/;secure`}else{document.cookie=`${t}=;expires=${c};path=/`;document.cookie=`${t}=;expires=${c};path=/;domain=${o}`}})}catch(e){alert(`Error clearing cookies: ${e.message}`)}})();
```
<!-- prettier-ignore-end -->

## How do I use this?

1. Create a new bookmark:
   - _In Firefox:_ In the top menu, navigate to `Bookmarks > Manage Bookmarks`, click the gear icon, and add a bookmark.
   - _In Chrome:_ Navigate to `chrome://bookmarks/`, then click the `⁝` icon and `Add new bookmark`.
2. Name it whatever you want (I use "Clear cookies") and set the URL to the snippet above.
3. On a page with cookies you want to clear, click the bookmark you created, and it will execute the JS that invalidates all the cookies.

## Walk me through what this JS does before I run some stranger's code in my browser

Lol sure, here's the code beautified and commented out. Some things to note:

- [You can't actually delete cookies](https://whitep4nth3r.com/blog/cookies-not-deleted/), you have to just set their expiration date to Before Now, so the browser considers them invalid.
- `__Host-` prefixed cookies need the `secure` flag in order to be updated.
- `__Secure-` prefixed cookies cannot be set via JavaScript.
- This code doesn't address cookies set on a subdomain. You could add some logic to break out a subdomain but it starts to get pretty RegEx-y and I figured we could keep this far simpler and cover most use-cases.

```js
// Create an IIFE¹.
(function () {
  try {
    // Get the domain name in order to remove domain-specific cookies
    const domain = window.location.hostname;
    // Get all the cookies set on the document and break 'em up'
    const cookiesList = document.cookie.split(';');
    // Create a new date from right this instant, we'll use this to invalidate all existing cookies.
    const dateToInvalidateBy = new Date().toUTCString();

    cookiesList.forEach((cookie) => {
      // Cookies are set like `cookieName=cookieValue;`, this grabs ONLY the name segment.
      const cookieName = cookie.match(/^(.*?)=/)[1];
      // I found I needed to select cookies that started with __Host
      // and pass them the `secure` flag in order to properly invalidate them.
      if (cookieName.startsWith('__Host-')) {
        // For all cookies, we just tell the document cookie manager that the cookie's value has changed
        // Basically: cookie name has an empty value, expires right now, and has some metadata (path, security, domain, etc)
        document.cookie = `${cookieName}$=;expires=${dateToInvalidateBy};path=/;secure`;
      } else {
        document.cookie = `${cookieName}=;expires=${dateToInvalidateBy};path=/`;
        document.cookie = `${cookieName}=;expires=${dateToInvalidateBy};path=/;domain=${domain}`;
      }
    });
    alert('Cookies cleared. Feel free to reload.');
  } catch (err) {
    alert(`Error clearing cookies: ${err.message}`);
  }
})();
```

### Footnotes

¹ — <abbr title="Immediately Invoked Function Expression">_IIFE_</abbr>: Immediately Invoked Function Expression. [More on IIFEs here](https://developer.mozilla.org/en-US/docs/Glossary/IIFE).
