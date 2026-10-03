import createShader from '../../../js/utils/createShader';

import frag from '../shaders/frag.glsl';
import vert from '../../../js/shaders/vert.glsl';

export default class DarkForest {
  constructor(gl) {
    this.gl = gl;
    this.vertexShaderSource = vert;
    this.fragmentShaderSource = frag;
    this.initShaders();
    this.initBuffers();
    this.initTextures();
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
  createTexture(unit) {
    const texture = this.gl.createTexture();
    this.gl.activeTexture(this.gl.TEXTURE0 + unit);
    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
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
    return texture;
  }
  initTextures() {
    this.gl.pixelStorei(this.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    this.pageTexture = this.createTexture(0);
    this.heroTexture = this.createTexture(1);
  }
  initUniforms() {
    this.uniforms = {
      page: this.gl.getUniformLocation(this.program, 'u_page'),
      hero: this.gl.getUniformLocation(this.program, 'u_hero'),
      heroRect: this.gl.getUniformLocation(this.program, 'u_heroRect'),
      resolution: this.gl.getUniformLocation(this.program, 'u_resolution'),
      velocity: this.gl.getUniformLocation(this.program, 'u_velocity'),
    };
  }
  upload(unit, texture, image) {
    this.gl.activeTexture(this.gl.TEXTURE0 + unit);
    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
    this.gl.texImage2D(
      this.gl.TEXTURE_2D,
      0,
      this.gl.RGBA,
      this.gl.RGBA,
      this.gl.UNSIGNED_BYTE,
      image,
    );
  }
  updatePage(page) {
    this.upload(0, this.pageTexture, page);
  }
  updateHero(hero) {
    if (hero === this.hero) return;
    this.hero = hero;
    this.upload(1, this.heroTexture, hero);
  }
  render(params) {
    this.gl.uniform1i(this.uniforms.page, 0);
    this.gl.uniform1i(this.uniforms.hero, 1);
    this.gl.uniform4f(this.uniforms.heroRect, ...params.heroRect);
    this.gl.uniform2f(this.uniforms.resolution, params.width, params.height);
    this.gl.uniform1f(this.uniforms.velocity, params.velocity);
    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
  }
}
