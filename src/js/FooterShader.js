import vert from './shaders/vert.glsl';
import frag from './shaders/frag.glsl';
import * as dat from 'dat.gui';

const createShader = (gl, type, source) => {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
};

export default class FooterShader {
  constructor() {
    this.guiHidden = true;
    const shaderProps = {
      WIND_SCALE: 3.0,
      WIND_SPEED: 0.2,
      WIND_AMPLITUDE_X: 0.001,
      WIND_AMPLITUDE_Y: 0.004,
      COLOR_SHIFT: 0.0,
      JITTER_INTENSITY: 0.001,
      DRIFT_SPEED: 0.2,
      DRIFT_SCALE: 5.0,
      DRIFT_INTENSITY: 0.001,
      VERTICAL_BIAS: 0.01,
    };
    window.gui = new dat.GUI({ hideable: false });
    window.gui.hide();
    const windFolder = window.gui.addFolder('Wind');
    const vhsFolder = window.gui.addFolder('VHS');
    const driftFolder = window.gui.addFolder('Drift');

    windFolder.add(shaderProps, 'WIND_SCALE', 0.0, 300.0, 1);
    windFolder.add(shaderProps, 'WIND_SPEED', 0.0, 10.0, 0.1);
    windFolder.add(shaderProps, 'WIND_AMPLITUDE_X', 0.0, 1, 0.001);
    // windFolder.add(shaderProps, 'WIND_AMPLITUDE_Y', 0.0, 1, 0.001);

    vhsFolder.add(shaderProps, 'COLOR_SHIFT', 0, 1, 0.01);
    vhsFolder.add(shaderProps, 'JITTER_INTENSITY', 0, 0.25, 0.001);

    driftFolder.add(shaderProps, 'DRIFT_SPEED', 0, 2, 0.1);
    driftFolder.add(shaderProps, 'DRIFT_SCALE', 0, 10, 0.1);
    driftFolder.add(shaderProps, 'DRIFT_INTENSITY', 0, 1, 0.001);
    driftFolder.add(shaderProps, 'VERTICAL_BIAS', 0, 1, 0.01);

    const prefersReducedMotion =
      window.matchMedia(`(prefers-reduced-motion: reduce)`) === true ||
      window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;

    const canvas = document.createElement('canvas');
    canvas.classList.add('footer-canvas');
    const footer = document.querySelector('.footer-border');
    footer.parentElement.insertBefore(canvas, footer);

    const gl = canvas.getContext('webgl');

    if (!gl) {
      console.error('WebGL not supported');
      throw new Error('WebGL not supported');
    }

    const vertexShaderSource = vert;

    const fragmentShaderSource = frag;

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(
      gl,
      gl.FRAGMENT_SHADER,
      fragmentShaderSource
    );

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      throw new Error('Failed to link program');
    }

    const positionBuffer = gl.createBuffer();
    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const texCoordBuffer = gl.createBuffer();
    const texCoords = new Float32Array([0, 1, 1, 1, 0, 0, 1, 0]);

    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);

    const image = new Image();
    image.src = '/img/footer-border.png';
    image.crossOrigin = 'anonymous';
    image.onload = () => {
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        image
      );
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

      const startTime = performance.now();
      function render(currentTime) {
        const displayWidth = canvas.clientWidth * 3;
        const displayHeight = canvas.clientHeight * 3;
        if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
          canvas.width = displayWidth;
          canvas.height =
            displayWidth * (image.naturalHeight / image.naturalWidth);
          gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        }

        const elapsedTime = (currentTime - startTime) / 1000;

        gl.useProgram(program);

        const timeLocation = gl.getUniformLocation(program, 'u_time');
        const resolutionLocation = gl.getUniformLocation(
          program,
          'u_resolution'
        );
        gl.uniform1f(timeLocation, elapsedTime);
        gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);

        gl.uniform1f(
          gl.getUniformLocation(program, 'WIND_SCALE'),
          shaderProps.WIND_SCALE
        );
        gl.uniform1f(
          gl.getUniformLocation(program, 'WIND_SPEED'),
          shaderProps.WIND_SPEED
        );
        gl.uniform2f(
          gl.getUniformLocation(program, 'WIND_AMPLITUDE'),
          shaderProps.WIND_AMPLITUDE_X,
          shaderProps.WIND_AMPLITUDE_Y
        );
        gl.uniform1f(
          gl.getUniformLocation(program, 'COLOR_SHIFT'),
          shaderProps.COLOR_SHIFT
        );
        gl.uniform1f(
          gl.getUniformLocation(program, 'JITTER_INTENSITY'),
          shaderProps.JITTER_INTENSITY
        );
        gl.uniform1f(
          gl.getUniformLocation(program, 'DRIFT_SPEED'),
          shaderProps.DRIFT_SPEED
        );
        gl.uniform1f(
          gl.getUniformLocation(program, 'DRIFT_SCALE'),
          shaderProps.DRIFT_SCALE
        );
        gl.uniform1f(
          gl.getUniformLocation(program, 'DRIFT_INTENSITY'),
          shaderProps.DRIFT_INTENSITY
        );
        gl.uniform1f(
          gl.getUniformLocation(program, 'VERTICAL_BIAS'),
          shaderProps.VERTICAL_BIAS
        );

        const positionLocation = gl.getAttribLocation(program, 'a_position');
        gl.enableVertexAttribArray(positionLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        const texCoordLocation = gl.getAttribLocation(program, 'a_texCoord');
        gl.enableVertexAttribArray(texCoordLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
        gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        if (!prefersReducedMotion) {
          requestAnimationFrame(render);
        }
      }
      render(startTime);
    };

    window.addEventListener('keypress', ({ shiftKey, key }) => {
      if (window.gui) {
        if (shiftKey && key === 'F') {
          if (this.guiHidden) {
            window.gui.show();
          } else {
            window.gui.hide();
          }
          this.guiHidden = !this.guiHidden;
        }
      }
    });
  }
}
