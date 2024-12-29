---
title: A One-Liner For Freeing Ports on OS X
slug: a-one-liner-for-freeing-ports-on-os-x
heroImage: ./img/4no.A One-Liner For Freeing Ports on OS X.png
excerpt: "I used to be like you, constantly Googling “how to kill processes running at a specific port”. But now I’m different: stronger, better — and you can too. Here’s a quick-and-dirty bash function for saving you the search in the future."
publishDate: 2023-02-28T12:07-07:00
socialSharingImage: ./img/4no.A One-Liner For Freeing Ports on OS X.png
tags:
  - article
category: resource
topics:
  - bash
toc:
  - { title: TL;DR, url: "#tl-dr" }
  - { title: Finding the offending process, url: "#finding-the-offending-process" }
  - { title: Killing in the port of, url: "#killing-in-the-port-of" }
  - { title: Conclusion, url: "#conclusion" }
---

## TL;DR

One of my most-frequently searched dev tasks over the course of my career thus far has been the "how do I find what process is on a port" to “how do I kill a given process” wombo-combo — there’s always some memory-leaky service running that <kbd>ctrl</kbd>+<kbd>c</kbd> isn’t tough enough for. Figured it’d be good to write a quick shell function for doing just this. Before I get into the explainer, here’s the code:

```sh
function killport {
	echo '🚨 Killing all processes at port' $1
	lsof -ti tcp:$1 | xargs kill
}
```

This bad boy can also be found as a [script in Gist form on GitHub](https://gist.github.com/xdesro/e7bbec9b2a1c31f0c04a1e2d22597dd8).

Sorry, this guide doesn’t currently solve for Windows or Linux systems, as far as I know. If y’all have an analogous solution, I’d happily include it in this post :){.editors-note}

## Finding the offending process

After defining our function and adding some cute helper text, we can use `lsof` (list open files) to find processes that match our criteria. The manual for the `lsof` says:

> An open file may be...a stream or a network file (Internet socket, NFS file or UNIX domain socket.)

Sounds like exactly what we’re on the hunt for. We’ll pass a couple of options to make this work as a function:

- `-t`: The lower-case version of the `-T` flag sets some preferences for the output we get from running `lsof`. Specifically, `-t` returns only the PID, which is useful for piping this output to the `kill` command.
- `-i`: This flag tells `lsof` to specifically look for matching internet addresses. We can pass the port we’re looking for in the format `[protocol]:[port]`.

The protocol will be TCP, and then we can use a bash _positional parameter_ to accept the port number as an argument to our `killport` function:

```sh
lsof -ti tcp:$i
```

## Killing in the port of

Now that we have the `PID` of the process that is running on the port we want closed, we can send that over to the `kill` command. We’ll use a bash pipe and the `xargs` command to pass that information on.

All the pipe is doing here is passing the output of `lsof` to `xargs`, and all `xargs` is doing is taking some input and providing it as an argument to the `kill` command. All-told, that comes out to:

```sh
lsof -ti tcp:$i | xargs kill
```

That’s digital plumbing babey; we’re doing steampunk in cyberspace — and they said it couldn't be done.

## Conclusion

Gosh, thanks for reading, and gosh I hope it was useful! I am very certain there are one thousand and one enhancements that could be made for this puppy, so if you’d like to hit me with the Um Actually To End All Um Actuallies, [shoot me an email](mailto:yo@henry.codes?subject=You%20Fool.%20You%20Absolute%20Goombus.%20What%20Were%20You%20Thinking.). Like I mentioned earlier, I’d also love to make this article serve Windows and Linux users, so def get in touch about that too :D

### Further Reading

- [Manual page for `lsof`](https://man7.org/linux/man-pages/man8/lsof.8.html)
- [Manual page for `xargs`](https://man7.org/linux/man-pages/man1/xargs.1.html)
- [Manual page for `kill`](https://man7.org/linux/man-pages/man2/kill.2.html)
- And [here’s that Gist again](https://gist.github.com/xdesro/e7bbec9b2a1c31f0c04a1e2d22597dd8).
