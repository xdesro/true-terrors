---
title: How To Map A Number Between Two Ranges
slug: how-to-map-a-number-between-two-ranges
heroImage: ./img/5w9.og-map-range.png
excerpt: A common task in creative web development and animation is converting a number in one range to a new range, also known as linear transformation. Here’s a basic rundown on executing that operation in a mathematical context, and how to translate that to JavaScript.
publishDate: 2023-10-18T14:00-07:00
socialSharingImage: ./img/5w9.og-map-range.png
category: tutorial
topics:
  - math
  - javascript
toc:
  - { title: TL;DR, url: "#tl-dr" }
  - { title: The Math Part, url: "#the-math-part" }
  - { title: The Code Part, url: "#the-code-part" }
  - { title: Conclusion, url: "#conclusion" }
---

Often in creative web projects, I find myself having to take a number, which exists in a specific range of numbers, and find the number that would be in the same position if the range were changed. Examples of this type of operation can vary anywhere from converting Fahrenheit to Celsius, to my recent use-case of creating an array of 500 “particles” with 3D coordinates and assigning each one a position between `{ z: -10 }` and `{ z: 12 }` relative to its position in the original array (i.e. `particles[0].z = -10` and `particles[499].z = 12`).

Here’s a basic tutorial on how to do that sort of thing, first as a mathematical rundown of the concept, and then a dirty JavaScript implementation.

## TL;DR

In a rush? Don’t have time for a mere five minute tutorial blog post complete with handy diagrams _even though I made them just for you?_ No worries, here's a quick JS one-liner for mapping a value from one range to another:

```js
const mapRange = (value, oldMin, oldMax, newMin, newMax) =>
  ((value - oldMin) / (oldMax - oldMin)) * (newMax - newMin) + newMin;
```

## The Math Part

What we’re doing here is a form of something called _linear transformation_, or _linear mapping_. Simply put, it’s just scaling any operation that happens on one side to the other. Take for instance that we have a line that goes between 0 and 2, and a value along that line of 1. Intuitively, we know that our value is halfway along the line, so if the line changes size (_maybe from 0 to 4)_, our new value will still be halfway along the line.

The actual concept of linear transformation gets way more complex than this, often involving matrices and vectors and extra dimensions and other words. Since as web developers, we’re merely lemon-muffin-brained baboons, we’ll keep to this shallower end of the pool for this blog post.{.editors-note}

### Breaking It Down

To implement this concept more concretely, the first thing we’ll need to do is to find the relationship between our initial value and our initial range. We can do this by subtracting the minimum of the range from both our value and the maximum of the range, and then dividing the updated value from the updated maximum.

In the following diagram, we’ll use `v` to represent our input value and `A` and `B` to represent our input range’s minimum and maximum values.

$$
\displaylines{(v-A)/(B-A)\\\\(1-0)/(2-0)\\\\\frac{1}{2}}$$

Just as we understood earlier, our value of 1 is 1/2 of distance between 0 and 2.

Next, we'll need to take this fraction multiply it by the actual size of the new range. We can find the actual size by subtracting the minimum of the new range from the maximum. We'll add the minimum back at the very end.

Here we’ll continue to use variables `v`, `A`, and `B` as before, but with the addition of `x` as our transformed value, `C` as our output range minimum, and `D` as our output range maximum.

$$
\displaylines{
x=((v-A)/(B-A))*(D-C)+C\\
\\
x=((1-0)/(2-0))*(4-0)+0\\
\\
x=\frac{1}{2}*4\\
\\
x=2
}
$$

### Applying The Concept

Now that we understand what needs to happen mathematically, we can try it out with a more practical application. Let's use the example of converting between Celsius and Fahrenheight we mentioned earlier.

For choosing the ranges, we can use any set of numbers we want, but let’s go with the freezing and boiling points of water, since we know those values in both scales. We can use any temperature, but for this blog post let’s try 17ºC. Knowing our ranges and input value, we can set up our problem:

$$
\displaylines{
((v - A)/(B-A))*(D-C)+C\\
\\
v=17\\
\\
[A,B]=[0,100]\\
[C,D]=[32,212]
}
$$

And all that’s left is to break out our variables and solve:

$$
\displaylines{
x=((17-0)/(100-0))*(212-32)+32\\
\\
x=\frac{17}{100}*180+32\\
\\
x=62.6
}
$$

Swell! So 17ºC in Fahrenheit is a lovely 62.6ºF Autumn day.

For style points and to prove our salt, we can convert right back simply by swapping the positions of the ranges and solving.

$$
\displaylines{
x=((v-A)/(B-A))*(D-C)+C\\
\\
v=62.6\\
[A,B]=[32,212]\\
[C,D]=[0,100]\\
\\
x=((62.6-32)/(212-32))*(100-0)+0\\
\\
x=30.6/180*100\\
\\
x=17
}
$$

Stupendous. Utterly stunning. We’ll make an insufferable mathematician out of you yet, old friend.

## The Code Part

With a mathematical function that does what we want, executing this operation in code is pretty straightforward, and we can even use more meaningful variables. We'll take our input value, initial range minimum and maximum, and output range minimum and maximum as props, and build a useful JavaScript one-liner from there.

```js
const mapRange = (v, A, B, C, D) => {
  return ((v - A) / (B - A)) * (D - C) + C;
};

// or better yet

const mapRange = (value, inputMin, inputMax, outputMin, outputMax) => {
  return ((value - inputMin) / (inputMax - inputMin)) * (outputMax - outputMin) + outputMin;
};
```

## Conclusion

I hope this crash course on range mapping was useful to you. As a disclaimer, I’m not A Big Math Guy™, I just end up using a lot of these concepts when I’m making websites. If I got something wrong (_I’m specifically unsure about expressing this stuff correctly in the mathematical diagrams_), or could explain some aspect more clearly, feel free to [reach out via email](mailto:yo@henry.codes); I’m glad for the opportunity to improve these blog posts.

### Further Reading

- Generative artist [Matt DesLauriers](https://www.mattdesl.com/) created a toolkit for common mathematical operations for creative coding, which includes a more well-featured `mapRange` implementation, as well as a ton of other useful functions. I learned about this concept from him! You can [see the code for those utility functions here](https://github.com/mattdesl/canvas-sketch-util/blob/master/math.js) or [read the docs for them here](https://github.com/mattdesl/canvas-sketch-util/blob/master/docs/math.md)
