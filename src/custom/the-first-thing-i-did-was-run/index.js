import createShader from '../../js/utils/createShader';

import frag from './frag.glsl';
import vert from './vert.glsl';
import { gsap } from 'gsap';

class NightSky {
  constructor(gl) {
    this.gl = gl;
    this.startTime = Date.now();

    // Shader sources
    this.vertexShaderSource = `
                    attribute vec2 position;
                    void main() {
                        gl_Position = vec4(position, 0.0, 1.0);
                    }
                `;

    this.fragmentShaderSource = `
                    precision highp float;
                    
                    uniform vec2 u_resolution;
                    uniform float u_time;
                    uniform vec3 u_bgColor;
                    uniform vec3 u_starColor;
                    uniform float u_density;
                    uniform float u_minSize;
                    uniform float u_maxSize;
                    uniform float u_twinkleSpeed;
                    uniform float u_twinkleIntensity;
                    uniform float u_brightness;
                    
                    // Hash function for pseudo-random numbers
                    float hash(vec2 p) {
                        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
                    }
                    
                    void main() {
                        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
                        vec3 color = u_bgColor;
                        
                        // Scale UV for star distribution
                        vec2 starUV = uv * u_density;
                        vec2 gridID = floor(starUV);
                        vec2 gridUV = fract(starUV);
                        
                        // Check neighboring cells for stars
                        for(float y = -1.0; y <= 1.0; y++) {
                            for(float x = -1.0; x <= 1.0; x++) {
                                vec2 offset = vec2(x, y);
                                vec2 neighborID = gridID + offset;
                                
                                // Random position within cell
                                float randX = hash(neighborID);
                                float randY = hash(neighborID + vec2(42.0, 42.0));
                                vec2 starPos = offset + vec2(randX, randY);
                                
                                // Distance to star
                                float dist = length(gridUV - starPos);
                                
                                // Random size for this star
                                float sizeRand = hash(neighborID + vec2(100.0, 100.0));
                                float starSize = mix(u_minSize, u_maxSize, sizeRand) * 0.01;
                                
                                // Random twinkle phase and speed
                                float phaseRand = hash(neighborID + vec2(200.0, 200.0));
                                float speedRand = hash(neighborID + vec2(300.0, 300.0));
                                float twinklePhase = phaseRand * 6.28318;
                                float twinkleSpeed = 0.5 + speedRand * 1.5;
                                
                                // Twinkle effect
                                float twinkle = sin(u_time * u_twinkleSpeed * twinkleSpeed + twinklePhase);
                                twinkle = twinkle * 0.5 + 0.5; // Normalize to 0-1
                                twinkle = mix(1.0 - u_twinkleIntensity, 1.0, twinkle);
                                
                                // Star brightness based on distance
                                float star = smoothstep(starSize, 0.0, dist);
                                star *= twinkle * u_brightness;
                                
                                // Add glow
                                float glow = smoothstep(starSize * 3.0, 0.0, dist) * 0.3;
                                glow *= twinkle * u_brightness;
                                
                                color = mix(color, u_starColor, star + glow);
                            }
                        }
                        
                        gl_FragColor = vec4(color, 1.0);
                    }
                `;

    this.initShaders();
    this.initBuffers();
    this.initUniforms();
  }

  initShaders() {
    const vertexShader = createShader(
      this.gl,
      this.gl.VERTEX_SHADER,
      this.vertexShaderSource
    );
    const fragmentShader = createShader(
      this.gl,
      this.gl.FRAGMENT_SHADER,
      this.fragmentShaderSource
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
      this.gl.STATIC_DRAW
    );

    const positionLocation = this.gl.getAttribLocation(
      this.program,
      'position'
    );
    this.gl.enableVertexAttribArray(positionLocation);
    this.gl.vertexAttribPointer(
      positionLocation,
      2,
      this.gl.FLOAT,
      false,
      0,
      0
    );
  }

  initUniforms() {
    this.uniforms = {
      resolution: this.gl.getUniformLocation(this.program, 'u_resolution'),
      time: this.gl.getUniformLocation(this.program, 'u_time'),
      bgColor: this.gl.getUniformLocation(this.program, 'u_bgColor'),
      starColor: this.gl.getUniformLocation(this.program, 'u_starColor'),
      density: this.gl.getUniformLocation(this.program, 'u_density'),
      minSize: this.gl.getUniformLocation(this.program, 'u_minSize'),
      maxSize: this.gl.getUniformLocation(this.program, 'u_maxSize'),
      twinkleSpeed: this.gl.getUniformLocation(this.program, 'u_twinkleSpeed'),
      twinkleIntensity: this.gl.getUniformLocation(
        this.program,
        'u_twinkleIntensity'
      ),
      brightness: this.gl.getUniformLocation(this.program, 'u_brightness'),
    };
  }

  render(params) {
    const time = (Date.now() - this.startTime) * 0.001;

    this.gl.uniform2f(this.uniforms.resolution, params.width, params.height);
    this.gl.uniform1f(this.uniforms.time, time);
    this.gl.uniform3fv(this.uniforms.bgColor, params.bgColor);
    this.gl.uniform3fv(this.uniforms.starColor, params.starColor);
    this.gl.uniform1f(this.uniforms.density, params.density);
    this.gl.uniform1f(this.uniforms.minSize, params.minSize);
    this.gl.uniform1f(this.uniforms.maxSize, params.maxSize);
    this.gl.uniform1f(this.uniforms.twinkleSpeed, params.twinkleSpeed);
    this.gl.uniform1f(this.uniforms.twinkleIntensity, params.twinkleIntensity);
    this.gl.uniform1f(this.uniforms.brightness, params.brightness);

    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
  }
}

// Initialize
const canvas = document.querySelector('canvas');
const gl = canvas.getContext('webgl');

if (!gl) {
  alert('WebGL not supported');
}

const nightSky = new NightSky(gl);

// Starting uniforms constant
const UNIFORMS = {
  bgColor: [0.04, 0.09, 0.16], // Dark blue [R, G, B]
  starColor: [1.0, 1.0, 1.0], // White [R, G, B]
  density: 100, // Number of stars
  minSize: 0.5, // Minimum star size
  maxSize: 3.0, // Maximum star size
  twinkleSpeed: 1.0, // Speed of twinkling
  twinkleIntensity: 0.6, // How much stars twinkle (0-1)
  brightness: 1.0, // Overall star brightness
};

// Resize canvas
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  gl.viewport(0, 0, canvas.width, canvas.height);
}
window.addEventListener('resize', resize);
resize();

// Render loop
function render() {
  const params = {
    width: canvas.width,
    height: canvas.height,
    ...UNIFORMS,
  };

  nightSky.render(params);
  requestAnimationFrame(render);
}
render();
