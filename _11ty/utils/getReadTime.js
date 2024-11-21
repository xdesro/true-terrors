import { JSDOM } from "jsdom";

export default function (data) {
// TODO why does this need rawInput, why don't I have access to content?
  const { document } = new JSDOM(`${data.page.rawInput}`).window;
  // Calculate read time without code samples or mathJax.
  const elementsToRemove = [...document.querySelectorAll("pre, mjx-container")];
  elementsToRemove.forEach((element) => element.remove());
  const text = document.body.textContent;

  const wordCount = text.split(" ").length;
  const wordsPerMinute = 200;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  return `${readingTime} minute read`;
}
