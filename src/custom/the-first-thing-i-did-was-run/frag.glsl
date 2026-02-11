precision highp float;
uniform vec3 u_bgColor;
uniform vec3 u_starColor;
uniform float u_starSize;
uniform float u_starDensity;
uniform float u_twinkleBrightness;
uniform float u_twinkleSpeed;
uniform float u_panSpeed;
uniform float u_time;

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = fract(sin(i.x * 73.0 + i.y * 251.0) * 13.5453);
  float b = fract(sin((i.x + 1.0) * 73.0 + i.y * 251.0) * 13.5453);
  float c = fract(sin(i.x * 73.0 + (i.y + 1.0) * 251.0) * 13.5453);
  float d = fract(sin((i.x + 1.0) * 73.0 + (i.y + 1.0) * 251.0) * 13.5453);
  float ab = mix(a, b, f.x);
  float cd = mix(c, d, f.x);
  return mix(ab, cd, f.y);
}

vec2 noise2d(vec2 p) {
  return vec2(noise(p), noise(p + vec2(17.0, 23.0)));
}

void main() {
  vec2 screenUv = gl_FragCoord.xy / vec2(800.0, 600.0);

  vec2 centered = screenUv - vec2(0.5, 0.0);

  float dist = length(centered);
  float angle = atan(centered.y, centered.x);

  angle += u_panSpeed;

  vec2 rotated = vec2(cos(angle), sin(angle)) * dist;

  vec2 uv = rotated + vec2(0.5, 0.0);

  vec2 scaledUv = uv * u_starDensity;
  vec2 gridPos = floor(scaledUv);
  vec2 cellUv = fract(scaledUv);

  vec2 gridOffset = noise2d(gridPos);

  vec2 starPos = gridOffset + noise2d(gridPos + vec2(0.5, 0.5)) * 0.3;

  float dist_star = length(cellUv - starPos);

  float star = smoothstep(u_starSize, 0.0, dist_star);

  float twinkle = sin(noise(gridPos + vec2(3.0, 7.0)) * 6.28318 + u_twinkleSpeed * u_time) * 0.5 + 0.5;
  star *= mix(1.0, twinkle, u_twinkleBrightness);

  vec3 col = mix(u_bgColor, u_starColor, star);
  gl_FragColor = vec4(col, 1.0);
}
