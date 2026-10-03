precision highp float;
uniform sampler2D u_page;
uniform vec2 u_resolution;
uniform float u_velocity;

varying vec2 v_texCoord;

#define VELOCITY_SCALE 25.0
#define DISTORTION 0.1
#define CHANNEL_SPLIT 0.008
#define EDGE_START 0.1
#define EDGE_END 0.8

float edge(vec2 uv) {
  return smoothstep(EDGE_START, EDGE_END, abs(uv.y - 0.5));
}

vec2 lens(vec2 uv, float amount) {
  vec2 centered = uv - 0.5;
  vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
  float radius = dot(centered * aspect, centered * aspect);
  return 0.5 + centered * (1.0 - amount * edge(uv) * radius);
}

void main() {
  vec2 uv = v_texCoord;
  float strength = clamp(abs(u_velocity) * VELOCITY_SCALE, 0.0, 1.0);
  float amount = DISTORTION * strength;
  vec2 split = vec2(0.0, sign(u_velocity) * CHANNEL_SPLIT * strength * edge(uv));

  float r = texture2D(u_page, lens(uv, amount * 1.1) + split).r;
  float g = texture2D(u_page, lens(uv, amount)).g;
  float b = texture2D(u_page, lens(uv, amount * 0.9) - split).b;

  gl_FragColor = vec4(r, g, b, 1.0);
}
