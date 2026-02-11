import gsap from 'gsap';
import createShader from '../../js/utils/createShader';
import frag from './frag.glsl';
import vert from './vert.glsl';

const skyRgbToNormalizedStr = (rgb) => {
  const [r, g, b, a] = rgb.map((channel) => channel / 255);

  return [r, g, b];
};

export default class NightSky {
  constructor(gl) {
    this.gl = gl;
    this.startTime = Date.now();
    this.vertexShaderSource = vert;
    this.fragmentShaderSource = frag;
    this.initShaders();
    this.initBuffers();
    this.initUniforms();
  }
  initShaders() {
    const vertexShader = createShader(
      this.gl,
      this.gl.VERTEX_SHADER,
      this.vertexShaderSource,
    );
    const fragmentShader = createShader(
      this.gl,
      this.gl.FRAGMENT_SHADER,
      this.fragmentShaderSource,
    );
    this.program = this.gl.createProgram();
    this.gl.attachShader(this.program, vertexShader);
    this.gl.attachShader(this.program, fragmentShader);
    this.gl.linkProgram(this.program);
    if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
      console.error(this.gl.getProgramInfoLog(this.program));
    }
    this.gl.useProgram(this.program);
  }
  initBuffers() {
    const positionBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
    const positions = [-1, -1, 1, -1, -1, 1, 1, 1];
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(positions),
      this.gl.STATIC_DRAW,
    );
    const positionLocation = this.gl.getAttribLocation(
      this.program,
      'position',
    );
    this.gl.enableVertexAttribArray(positionLocation);
    this.gl.vertexAttribPointer(
      positionLocation,
      2,
      this.gl.FLOAT,
      false,
      0,
      0,
    );
  }
  initUniforms() {
    this.uniforms = {
      time: this.gl.getUniformLocation(this.program, 'u_time'),
      bgColor: this.gl.getUniformLocation(this.program, 'u_bgColor'),
      starColor: this.gl.getUniformLocation(this.program, 'u_starColor'),
      starSize: this.gl.getUniformLocation(this.program, 'u_starSize'),
      density: this.gl.getUniformLocation(this.program, 'u_starDensity'),
      twinkleBrightness: this.gl.getUniformLocation(
        this.program,
        'u_twinkleBrightness',
      ),
      twinkleSpeed: this.gl.getUniformLocation(this.program, 'u_twinkleSpeed'),
      panSpeed: this.gl.getUniformLocation(this.program, 'u_panSpeed'),
    };
  }
  render(params) {
    const time = (Date.now() - this.startTime) * 0.001;
    this.gl.uniform1f(this.uniforms.time, time);
    this.gl.uniform3f(
      this.uniforms.bgColor,
      ...skyRgbToNormalizedStr(gsap.utils.splitColor(params.bgColor)),
    );

    this.gl.uniform3f(
      this.uniforms.starColor,
      ...skyRgbToNormalizedStr(gsap.utils.splitColor(params.starColor)),
    );
    this.gl.uniform1f(this.uniforms.density, params.starDensity);
    this.gl.uniform1f(this.uniforms.starSize, params.starSize);
    this.gl.uniform1f(this.uniforms.twinkleSpeed, params.twinkleSpeed);
    this.gl.uniform1f(
      this.uniforms.twinkleBrightness,
      params.twinkleBrightness,
    );
    this.gl.uniform1f(this.uniforms.panSpeed, params.panSpeed);
    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
  }
}
