import createShader from '../../../js/utils/createShader';

import frag from '../shaders/frag.glsl';
import vert from '../../../js/shaders/vert.glsl';

export default class DarkForest {
  constructor(gl) {
    this.gl = gl;
    this.startTime = Date.now();
    this.vertexShaderSource = vert;
    this.fragmentShaderSource = frag;
    this.initShaders();
    this.initBuffers();
    this.initTexture();
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
  initAttribute(name, values) {
    const buffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(values),
      this.gl.STATIC_DRAW,
    );
    const location = this.gl.getAttribLocation(this.program, name);
    this.gl.enableVertexAttribArray(location);
    this.gl.vertexAttribPointer(location, 2, this.gl.FLOAT, false, 0, 0);
  }
  initBuffers() {
    this.initAttribute('a_position', [-1, -1, 1, -1, -1, 1, 1, 1]);
    this.initAttribute('a_texCoord', [0, 1, 1, 1, 0, 0, 1, 0]);
  }
  initTexture() {
    this.texture = this.gl.createTexture();
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_WRAP_S,
      this.gl.CLAMP_TO_EDGE,
    );
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_WRAP_T,
      this.gl.CLAMP_TO_EDGE,
    );
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_MIN_FILTER,
      this.gl.LINEAR,
    );
  }
  initUniforms() {
    this.uniforms = {
      time: this.gl.getUniformLocation(this.program, 'u_time'),
      page: this.gl.getUniformLocation(this.program, 'u_page'),
      resolution: this.gl.getUniformLocation(this.program, 'u_resolution'),
      velocity: this.gl.getUniformLocation(this.program, 'u_velocity'),
    };
  }
  render(params) {
    const time = (Date.now() - this.startTime) * 0.001;

    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
    this.gl.texImage2D(
      this.gl.TEXTURE_2D,
      0,
      this.gl.RGBA,
      this.gl.RGBA,
      this.gl.UNSIGNED_BYTE,
      params.page,
    );

    this.gl.uniform1i(this.uniforms.page, 0);
    this.gl.uniform1f(this.uniforms.time, time);
    this.gl.uniform2f(this.uniforms.resolution, params.width, params.height);
    this.gl.uniform1f(this.uniforms.velocity, params.velocity);
    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
  }
}
