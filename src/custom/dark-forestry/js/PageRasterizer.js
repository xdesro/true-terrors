// hyphens are line-break opportunities too
const WORD = /[^\s-]+-?|-/g;
const SELECTION_COLOR = 'rgba(136, 136, 136, 0.35)';

export default class PageRasterizer {
  constructor({ root, pixelRatio }) {
    this.root = root;
    this.pixelRatio = pixelRatio;
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.styles = new Map();
    this.metrics = new Map();
    this.images = new Map();
  }
  toDocument({ left, top, width, height }) {
    return { x: left + window.scrollX, y: top + window.scrollY, width, height };
  }
  measure() {
    this.styles.clear();
    this.background = getComputedStyle(document.body).backgroundColor;
    this.textNodes = [];
    this.words = [];
    this.lines = [];
    this.borders = [];
    this.pictures = [];
    this.dividers = [];
    this.markers = [];

    const walker = document.createTreeWalker(this.root, NodeFilter.SHOW_TEXT);
    const range = document.createRange();
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const el = node.parentElement;
      if (!node.textContent.trim()) continue;
      this.textNodes.push(node);

      range.selectNodeContents(node);
      [...range.getClientRects()].forEach((rect) =>
        this.lines.push({ el, ...this.toDocument(rect) }),
      );

      for (const match of node.textContent.matchAll(WORD)) {
        const [text] = match;
        range.setStart(node, match.index);
        range.setEnd(node, match.index + text.length);
        this.words.push({
          el,
          text,
          ...this.toDocument(range.getClientRects()[0]),
        });
      }
    }

    this.root.querySelectorAll('*').forEach((el) => {
      const rect = this.toDocument(el.getBoundingClientRect());
      const style = getComputedStyle(el);
      const after = getComputedStyle(el, '::after');

      if (parseFloat(style.borderLeftWidth)) {
        this.borders.push({ el, ...rect });
      }
      if (el.matches('img')) {
        this.pictures.push({ el, ...rect });
      }
      if (after.backgroundImage !== 'none') {
        this.dividers.push({ style: after, ...rect });
      }
      if (el.matches('li')) {
        this.markers.push({
          el,
          text: style.listStyleType.slice(1, -1),
          firstWord: this.words.find((word) => el.contains(word.el)),
          ...rect,
        });
      }
    });

    this.measureSelection();
  }
  measureSelection() {
    this.selection = [];
    const selection = document.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const nodeRange = document.createRange();
    this.textNodes
      .filter((node) => range.intersectsNode(node))
      .forEach((node) => {
        nodeRange.selectNodeContents(node);
        if (node === range.startContainer) {
          nodeRange.setStart(node, range.startOffset);
        }
        if (node === range.endContainer) {
          nodeRange.setEnd(node, range.endOffset);
        }
        [...nodeRange.getClientRects()].forEach((rect) =>
          this.selection.push(this.toDocument(rect)),
        );
      });
  }
  style(el) {
    if (!this.styles.has(el)) {
      const style = getComputedStyle(el);
      let opacity = style.visibility === 'hidden' ? 0 : 1;
      const filters = [];
      for (let node = el; this.root.contains(node); node = node.parentElement) {
        const nodeStyle = getComputedStyle(node);
        opacity *= parseFloat(nodeStyle.opacity);
        if (nodeStyle.filter !== 'none') filters.push(nodeStyle.filter);
      }
      this.styles.set(el, {
        opacity,
        filter: filters.join(' ') || 'none',
        color: style.color,
        font: `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`,
        fontSize: parseFloat(style.fontSize),
        underline: style.textDecorationLine.includes('underline'),
        borderColor: style.borderLeftColor,
        borderWidth: parseFloat(style.borderLeftWidth),
      });
    }
    return this.styles.get(el);
  }
  baseline({ el, y, height }) {
    const { font } = this.style(el);
    if (!this.metrics.has(font)) {
      this.ctx.font = font;
      const { fontBoundingBoxAscent, fontBoundingBoxDescent } =
        this.ctx.measureText('Hg');
      this.metrics.set(font, [fontBoundingBoxAscent, fontBoundingBoxDescent]);
    }
    const [ascent, descent] = this.metrics.get(font);
    return y + (height - ascent - descent) / 2 + ascent;
  }
  paint(el, draw) {
    const { ctx } = this;
    const { opacity, filter } = this.style(el);
    if (!opacity) return;

    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.filter = filter;
    draw();
    ctx.restore();
  }
  // srcset makes naturalWidth lie about the bitmap size, so draw from a plain copy
  loadImage(src) {
    if (!this.images.has(src)) {
      const img = new Image();
      img.src = src;
      this.images.set(src, img);
    }
    const img = this.images.get(src);
    return img.complete && img.naturalWidth ? img : null;
  }
  resize(width, height) {
    this.width = width;
    this.height = height;
    this.canvas.width = width * this.pixelRatio;
    this.canvas.height = height * this.pixelRatio;
  }
  draw() {
    const { ctx, pixelRatio, width, height } = this;
    const { scrollX, scrollY } = window;
    const isVisible = (rect) =>
      rect.y + rect.height >= scrollY && rect.y <= scrollY + height;

    ctx.setTransform(
      pixelRatio,
      0,
      0,
      pixelRatio,
      -scrollX * pixelRatio,
      -scrollY * pixelRatio,
    );
    ctx.fillStyle = this.background;
    ctx.fillRect(scrollX, scrollY, width, height);

    this.pictures.filter(isVisible).forEach(({ el, x, y, width, height }) => {
      const img = this.loadImage(el.currentSrc);
      if (!img) return;
      // object-fit: cover
      const scale = Math.max(
        width / img.naturalWidth,
        height / img.naturalHeight,
      );
      this.paint(el, () =>
        ctx.drawImage(
          img,
          (img.naturalWidth - width / scale) / 2,
          (img.naturalHeight - height / scale) / 2,
          width / scale,
          height / scale,
          x,
          y,
          width,
          height,
        ),
      );
    });

    this.dividers.forEach(({ style, x, y, width, height }) => {
      const img = this.loadImage(style.backgroundImage.slice(5, -2));
      if (!img) return;
      const dividerWidth = parseFloat(style.width);
      const dividerY =
        y + height - parseFloat(style.bottom) - parseFloat(style.height);
      ctx.drawImage(
        img,
        x + (width - dividerWidth) / 2,
        dividerY,
        dividerWidth,
        dividerWidth * (img.naturalHeight / img.naturalWidth),
      );
    });

    this.borders.filter(isVisible).forEach(({ el, x, y, height }) => {
      const { borderColor, borderWidth } = this.style(el);
      ctx.fillStyle = borderColor;
      ctx.fillRect(x, y, borderWidth, height);
    });

    ctx.fillStyle = SELECTION_COLOR;
    this.selection
      .filter(isVisible)
      .forEach(({ x, y, width, height }) => ctx.fillRect(x, y, width, height));

    this.words.filter(isVisible).forEach((word) => {
      const { font, color } = this.style(word.el);
      this.paint(word.el, () => {
        ctx.font = font;
        ctx.fillStyle = color;
        ctx.fillText(word.text, word.x, this.baseline(word));
      });
    });

    this.lines.filter(isVisible).forEach((line) => {
      const { underline, color, fontSize } = this.style(line.el);
      if (!underline) return;
      this.paint(line.el, () => {
        ctx.fillStyle = color;
        ctx.fillRect(
          line.x,
          this.baseline(line) + fontSize * 0.12,
          line.width,
          Math.max(1, fontSize / 16),
        );
      });
    });

    ctx.textAlign = 'right';
    this.markers.filter(isVisible).forEach((marker) => {
      const { font, color } = this.style(marker.el);
      ctx.font = font;
      ctx.fillStyle = color;
      ctx.fillText(marker.text, marker.x, this.baseline(marker.firstWord));
    });
    ctx.textAlign = 'start';

    const focused = document.activeElement;
    if (this.root.contains(focused) && focused.matches(':focus-visible')) {
      ctx.strokeStyle = this.style(focused).color;
      ctx.lineWidth = 2;
      [...focused.getClientRects()].forEach((rect) => {
        const { x, y, width, height } = this.toDocument(rect);
        ctx.strokeRect(x - 2, y - 2, width + 4, height + 4);
      });
    }
  }
}
