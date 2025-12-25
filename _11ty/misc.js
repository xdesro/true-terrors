export const footnotePlugin = (md) => {
  const footnoteRule = (state, silent) => {
    const start = state.pos;
    const max = state.posMax;

    if (state.src.charCodeAt(start) !== 0x5b /* [ */) return false;
    if (state.src.charCodeAt(start + 1) !== 0x5e /* ^ */) return false;

    let pos = start + 2;
    while (pos < max && state.src.charCodeAt(pos) !== 0x5d /* ] */) {
      pos++;
    }

    if (pos >= max) return false;

    const id = state.src.slice(start + 2, pos);

    if (!id || id.includes(' ')) return false;

    if (silent) return true;

    const token = state.push('footnote_ref', 'a', 0);
    token.attrSet('href', `#footnote-${id}`);
    token.attrSet('class', `footnote-inline`);
    token.content = id;

    state.pos = pos + 1;

    return true;
  };

  //   Renderer for the footnote reference
  md.renderer.rules.footnote_ref = function (tokens, idx) {
    const token = tokens[idx];
    const href = token.attrGet('href');
    const content = token.content;
    return `<a class="footnote-inline" href="${href}">${content}</a>`;
  };

  // Register the inline rule
  md.inline.ruler.before('emphasis', 'footnote_ref', footnoteRule);
};
