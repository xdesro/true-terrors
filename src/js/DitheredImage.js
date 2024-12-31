export default class DitheredImage {
  constructor({ img, wrapper }) {
    this.wrapper = wrapper;
    this.img = img;
    this.options = {
      THRESHOLD: 90,
    };
    this.bayer = [
      [15, 135, 45, 165],
      [195, 75, 225, 105],
      [60, 180, 30, 150],
      [240, 120, 210, 90],
    ];

    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');

    this.handleResize = this.handleResize.bind(this);
    this.mount();
  }
  mount() {
    this.loadingImage = new Image();
    this.loadingImage.src = this.img.src;
    this.loadingImage.crossOrigin = '';

    this.loadingImage.onload = function ({ target }) {
      this.drawCanvas(target);
      this.wrapper.appendChild(this.canvas);
      this.addListeners();
    }.bind(this);
  }
  imageDataToDither(imageData, threshold) {
    for (
      let currentPixel = 0;
      currentPixel <= imageData.data.length;
      currentPixel += 4
    ) {
      const x = (currentPixel / 4) % imageData.width;
      const y = Math.floor(currentPixel / 4 / imageData.width);
      const map = Math.floor(
        (imageData.data[currentPixel] + this.bayer[x % 4][y % 4]) / 2
      );
      imageData.data[currentPixel] = map < threshold ? 0 : 255;

      imageData.data[currentPixel + 1] = imageData.data[currentPixel + 2] =
        imageData.data[currentPixel];

      imageData.data[currentPixel + 3] = 255;
    }

    return imageData;
  }
  drawCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const { width: containerWidth, height } = this.img.getBoundingClientRect();
    const ratio = this.img.width / this.img.height;
    this.canvas.width = containerWidth;
    this.canvas.height = containerWidth / ratio;
    this.context.drawImage(
      this.loadingImage,
      0,
      0,
      containerWidth,
      containerWidth / ratio
    );

    const imageData = this.context.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
    const ditheredData = this.imageDataToDither(
      imageData,
      this.options.THRESHOLD
    );

    this.context.putImageData(ditheredData, 0, 0);
  }
  handleResize() {
    this.drawCanvas();
  }
  removeListeners() {
    window.removeEventListener('resize', this.handleResize);
  }
  addListeners() {
    window.addEventListener('resize', this.handleResize, false);
  }
}
