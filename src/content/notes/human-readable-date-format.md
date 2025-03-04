---
title: 'Human-readable date formatting with vanilla JavaScript'
drafted: false
topics:
  - code snippet
  - js
publishDate: 2025-03-02T00:06:56.689Z
hasToc: true
---

Have one of these?

```md
Sat Mar 01 2025 19:50:03 GMT-0500 (Eastern Standard Time)

<!-- or perhaps one of these? -->
<!-- 2025-03-02T01:23:48.693Z -->
```

Need one of these?

```txt
March 1, 2025
```

Or some other format? You probably don’t need `moment.js` or piles of StackOverflow-ing into your apartment, you just need `Date.toLocaleDateString()`. Here’s some common use cases:

<abbr title="your mileage may vary">YMMV</abbr> with the `en-US` locale tag — if you're based somewhere else you might be better served by <a href="https://www.techonthenet.com/js/language_tags.php">using another locale</a>.{.editors-note}

## Date Only

### March 1, 2025

```js
new Date().toLocaleDateString('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});
```

This `.toLocaleDateString()` method exists on any `Date` object. If we've got a string that represents a date, we'll need to parse a `Date` object from it first:

```js
const someArbitraryDate = new Date(Date.parse('2025-03-02T01:23:48.693Z'));

someArbitraryDate.toLocaleDateString();
```

### 3/1/2025

```js
new Date().toLocaleDateString('en-US');
```

### 03/01/25

```js
new Date().toLocaleDateString('en-US', {
  month: '2-digit',
  year: '2-digit',
  day: '2-digit',
});
```

### 01/03/25 (blimey lol)

```js
new Date().toLocaleDateString('en-GB', {
  month: '2-digit',
  year: '2-digit',
  day: '2-digit',
});
```

### Saturday, March 1, 2025

```js
new Date().toLocaleDateString('en-US', {
  dateStyle: 'full',
});
```

## Time only

Now we’ll mix it up and use `Date().toLocaleTimeString()`

### 8:08:03 PM

```js
new Date().toLocaleTimeString();
```

### 20:08:03 PM

```js
new Date().toLocaleTimeString('en-US', {
  hour12: false,
});
```

### 8:08 PM

```js
new Date().toLocaleTimeString('en-US', {
  timeStyle: 'short',
});
```

### 8:08:03 PM EST

```js
new Date().toLocaleTimeString('en-US', {
  timeStyle: 'long',
});
```

### 8:08:03 PM Eastern Standard Time

```js
new Date().toLocaleTimeString('en-US', {
  timeStyle: 'full',
});
```

### 8:08:03 PM East Africa Time

```js
new Date().toLocaleTimeString('en-US', {
  timeStyle: 'full',
  timeZone: 'Africa/Nairobi',
});
```

For a full list of time zone options, you can use the `TZ identifier` column on [the Wikipedia list page for tz database time zones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).

### 8:08:03 PM GMT+3

```js
new Date().toLocaleTimeString('en-US', {
  timeZone: 'Africa/Nairobi',
  timeZoneName: 'short',
});
```

### 8 PM

```js
new Date().toLocaleTimeString('en-US', {
  hour: 'numeric',
});
```

## Date & Time

You can use `Date.toLocaleString` to combine the two:

### 3/1/2025, 8:08:03 PM

```js
new Date().toLocaleString('en-US');
```

### Mar 1, 2025, 8:08 PM

```js
new Date().toLocaleString('en-US', {
  dateStyle: 'medium',
  timeStyle: 'short',
});
```
