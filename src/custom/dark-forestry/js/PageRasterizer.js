const WORD = /[^\s-]+-?|-/g;
const SELECTION_COLOR = 'rgba(136, 136, 136, 0.35)';

export default class PageRasterizer {
  constructor({ root, pixelRatio }) {
    this.root = root;
    this.pixelRatio = pixelRatio;
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
    this.styles = new Map();
    this.metrics = new Map();
    this.images = new Map();
    this.covers = new WeakMap();
    this.background = getComputedStyle(document.body).backgroundColor;
    this.textNodes = [];
    this.words = [];
    this.lines = [];
    this.borders = [];
    this.backgrounds = [];
    this.pictures = [];
    this.dividers = [];
    this.markers = [];
  }
  toDocument({ left, top, width, height }) {
    return { x: left + window.scrollX, y: top + window.scrollY, width, height };
  }
  measure(scope = this.root) {
    this.invalidate();
    const isOutside = (node) => node.isConnected && !scope.contains(node);
    const keepOutside = (items) => items.filter(({ el }) => isOutside(el));

    this.styles.forEach((_, el) => !isOutside(el) && this.styles.delete(el));
    this.textNodes = this.textNodes.filter(isOutside);
    this.words = keepOutside(this.words);
    this.lines = keepOutside(this.lines);
    this.borders = keepOutside(this.borders);
    this.backgrounds = keepOutside(this.backgrounds);
    this.pictures = keepOutside(this.pictures);
    this.dividers = keepOutside(this.dividers);
    this.markers = keepOutside(this.markers);

    const walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT);
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
        const rects = [...range.getClientRects()];
        this.words.push({
          el,
          text,
          ...this.toDocument(rects.find((rect) => rect.width) ?? rects[0]),
        });
      }
    }

    [scope, ...scope.querySelectorAll('*')].forEach((el) => {
      const rect = this.toDocument(el.getBoundingClientRect());
      const style = getComputedStyle(el);
      const after = getComputedStyle(el, '::after');

      if (parseFloat(style.borderLeftWidth)) {
        this.borders.push({ el, ...rect });
      }
      if (
        style.backgroundColor !== 'rgba(0, 0, 0, 0)' &&
        !el.matches('picture, img')
      ) {
        [...el.getClientRects()].forEach((rect) =>
          this.backgrounds.push({ el, ...this.toDocument(rect) }),
        );
      }
      if (el.matches('img')) {
        let clip = el.parentElement;
        while (
          clip !== this.root &&
          getComputedStyle(clip).overflow === 'visible'
        ) {
          clip = clip.parentElement;
        }
        this.pictures.push({
          el,
          clip: this.toDocument(clip.getBoundingClientRect()),
        });
      }
      if (after.backgroundImage !== 'none') {
        this.dividers.push({ el, style: after, ...rect });
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
    this.invalidate();
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
  invalidate() {
    this.isDirty = true;
  }
  restyle() {
    this.invalidate();
    this.styles.clear();
  }
  style(el) {
    if (!this.styles.has(el)) {
      const style = getComputedStyle(el);
      let opacity = style.visibility === 'hidden' ? 0 : 1;
      for (let node = el; this.root.contains(node); node = node.parentElement) {
        opacity *= parseFloat(getComputedStyle(node).opacity);
      }
      this.styles.set(el, {
        opacity,
        color: style.color,
        backgroundColor: style.backgroundColor,
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
    const { opacity } = this.style(el);
    if (!opacity) return;
    if (opacity === 1) return draw();

    ctx.globalAlpha = opacity;
    draw();
    ctx.globalAlpha = 1;
  }
  loadImage(src) {
    if (!this.images.has(src)) {
      const img = new Image();
      img.onload = () => this.invalidate();
      img.src = src;
      this.images.set(src, img);
    }
    const img = this.images.get(src);
    return img.complete && img.naturalWidth ? img : null;
  }
  hero() {
    const [picture] = this.pictures;
    const img = picture && this.loadImage(picture.el.currentSrc);
    if (!img) return null;
    const { left, top, width, height } = picture.el.getBoundingClientRect();
    return {
      image: this.cover(img, width, height),
      rect: [
        left / this.width,
        top / this.height,
        width / this.width,
        height / this.height,
      ],
    };
  }
  cover(img, width, height) {
    const w = Math.round(width * this.pixelRatio);
    const h = Math.round(height * this.pixelRatio);
    let cover = this.covers.get(img);
    if (cover?.width === w && cover?.height === h) return cover;

    cover = document.createElement('canvas');
    cover.width = w;
    cover.height = h;
    const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
    cover
      .getContext('2d')
      .drawImage(
        img,
        (img.naturalWidth - w / scale) / 2,
        (img.naturalHeight - h / scale) / 2,
        w / scale,
        h / scale,
        0,
        0,
        w,
        h,
      );
    this.covers.set(img, cover);
    return cover;
  }
  resize(width, height) {
    this.invalidate();
    this.width = width;
    this.height = height;
    this.canvas.width = width * this.pixelRatio;
    this.canvas.height = height * this.pixelRatio;
  }
  draw() {
    this.isDirty = false;
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

    this.backgrounds.filter(isVisible).forEach(({ el, x, y, width, height }) => {
      this.paint(el, () => {
        ctx.fillStyle = this.style(el).backgroundColor;
        ctx.fillRect(x, y, width, height);
      });
    });

    this.pictures
      .filter(({ clip }) => isVisible(clip))
      .forEach(({ el, clip }) => {
        if (this.loadImage(el.currentSrc)) {
          ctx.clearRect(clip.x, clip.y, clip.width, clip.height);
        } else {
          ctx.fillStyle = this.style(el).backgroundColor;
          ctx.fillRect(clip.x, clip.y, clip.width, clip.height);
        }
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
      const outline = getComputedStyle(focused);
      const lineWidth = parseFloat(outline.outlineWidth);
      const offset = parseFloat(outline.outlineOffset) + lineWidth / 2;
      if (outline.outlineStyle === 'none' || !lineWidth) return;

      ctx.strokeStyle = outline.outlineColor;
      ctx.lineWidth = lineWidth;
      ctx.setLineDash(
        outline.outlineStyle === 'dashed' ? [lineWidth * 3, lineWidth * 3] : [],
      );
      [...focused.getClientRects()].forEach((rect) => {
        const { x, y, width, height } = this.toDocument(rect);
        ctx.strokeRect(
          x - offset,
          y - offset,
          width + offset * 2,
          height + offset * 2,
        );
      });
      ctx.setLineDash([]);
    }
  }
}
