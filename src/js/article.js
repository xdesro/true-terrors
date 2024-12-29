// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// gsap.registerPlugin(ScrollTrigger);

(() => {
  // const THRESHOLD = 255 / 2;
  const options = {
    THRESHOLD: 70,
  };

  const headerInner = document.querySelector('.article-header__inner');
  const canvasWrapper = document.createElement('div');
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  const heroImage = document.querySelector('.article-header__image');
  canvasWrapper.classList.add('article-header__canvas-wrapper');
  const img = new Image();
  img.src = heroImage.src;
  img.crossOrigin = '';
  const bayerThresholdMap = [
    [15, 135, 45, 165],
    [195, 75, 225, 105],
    [60, 180, 30, 150],
    [240, 120, 210, 90],
  ];

  const imageDataToDither = (imageData, threshold) => {
    for (
      let currentPixel = 0;
      currentPixel <= imageData.data.length;
      currentPixel += 4
    ) {
      const x = (currentPixel / 4) % imageData.width;
      const y = Math.floor(currentPixel / 4 / imageData.width);
      const map = Math.floor(
        (imageData.data[currentPixel] + bayerThresholdMap[x % 4][y % 4]) / 2
      );
      imageData.data[currentPixel] = map < threshold ? 0 : 255;

      imageData.data[currentPixel + 1] = imageData.data[currentPixel + 2] =
        imageData.data[currentPixel];

      imageData.data[currentPixel + 3] = 255;
    }

    return imageData;
  };

  const drawCanvas = function (offset) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate canvas size and draw the image
    const { width: containerWidth, height } = heroImage.getBoundingClientRect();
    const ratio = img.width / img.height;
    canvas.width = containerWidth;
    canvas.height = containerWidth / ratio;
    context.drawImage(img, 0, 0, containerWidth, containerWidth / ratio);

    // Get the image data
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    // Apply dithering with animated offsets
    const ditheredData = imageDataToDither(imageData, options.THRESHOLD);

    // Put the modified image data back onto the canvas
    context.putImageData(ditheredData, 0, 0);
  };

  // Initialize canvas and start animation
  img.onload = () => {
    canvasWrapper.appendChild(canvas);
    headerInner.appendChild(canvasWrapper);
    drawCanvas(0); // Initial

    // canvas.toBlob((blob) => {
    //   const newImg = document.createElement('img');
    //   const url = URL.createObjectURL(blob);

    //   newImg.onload = () => {
    //     // no longer need to read the blob so it's revoked
    //     URL.revokeObjectURL(url);
    //   };

    //   newImg.src = url;
    //   newImg.width = heroImage.getBoundingClientRect().width;
    //   newImg.height = heroImage.getBoundingClientRect().height;
    //   newImg.classList.add('article-header__canvas-wrapper');
    //   newImg.style.objectPosition = 'center center';
    //   headerInner.appendChild(newImg);
    // });

    // animate();
    // headerInner.querySelector('picture').remove();
  };

  //   const tl = gsap.timeline({
  //     scrollTrigger: {
  //       target: '.article-header',
  //       start: `top top`,
  //       end: `+=${window.innerHeight}px`,
  //       scrub: 1,
  //     },
  //     onUpdate() {
  //       console.log(options);
  //       drawCanvas();
  //     },
  //   });
  //   tl.to(options, {
  //     THRESHOLD: 200,
  //   });
})();
