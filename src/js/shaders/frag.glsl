precision mediump float;

uniform sampler2D u_image;
uniform float u_time;
uniform vec2 u_resolution;
varying vec2 v_texCoord;

// const float WIND_SCALE = 3.0;
uniform float WIND_SCALE;
// const float WIND_SPEED = 0.2;
uniform float WIND_SPEED;
// const vec2 WIND_AMPLITUDE = vec2(0.001, 0.004);
uniform vec2 WIND_AMPLITUDE;

const float NOISE_INTENSITY = 0.01;
// const float COLOR_SHIFT = 0.0;
uniform float COLOR_SHIFT;
// const float JITTER_INTENSITY = 0.001;
uniform float JITTER_INTENSITY;

const float DRIFT_SPEED = 0.2;
// const float DRIFT_SCALE = 5.0;
uniform float DRIFT_SCALE;
// const float DRIFT_INTENSITY = 0.001;
uniform float DRIFT_INTENSITY;
// const float VERTICAL_BIAS = 0.01;
uniform float VERTICAL_BIAS;

vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec2 mod289(vec2 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 permute(vec3 x) {
    return mod289(((x * 34.0) + 1.0) * x);
}

float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);

    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);

    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;

    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));

    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;

    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;

    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);

    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float vhsNoise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

vec2 getDriftOffset(vec2 uv, float time) {
    float noise1 = snoise(vec2(uv.x * DRIFT_SCALE, uv.y * DRIFT_SCALE + time * DRIFT_SPEED));
    float noise2 = snoise(vec2(uv.x * DRIFT_SCALE * 2.0 + time * 0.5, uv.y * DRIFT_SCALE * 2.0 + time * DRIFT_SPEED * 1.3));

    vec2 offset;
    offset.x = (noise1 * 0.7 + noise2 * 0.3) * DRIFT_INTENSITY;

    offset.y = ((noise1 * 0.7 + noise2 * 0.3) * DRIFT_INTENSITY + DRIFT_SPEED * time * DRIFT_INTENSITY) * VERTICAL_BIAS;

    float verticalFalloff = 1.0 - uv.y;
    offset *= verticalFalloff * verticalFalloff;

    return offset;
}
void main() {
    vec2 uv = v_texCoord;

    float timeScale = u_time * WIND_SPEED;
    float noiseX = snoise(vec2(uv.y * WIND_SCALE + timeScale * 0.5, timeScale * 0.7));
    float noiseY = snoise(vec2(uv.x * WIND_SCALE + timeScale * 0.4, timeScale * 0.6));
    noiseX += 0.5 * snoise(vec2(uv.y * WIND_SCALE * 2.0 + timeScale, timeScale * 0.8));
    noiseY += 0.5 * snoise(vec2(uv.x * WIND_SCALE * 2.0 + timeScale, timeScale * 0.9));
    uv.x += noiseX * WIND_AMPLITUDE.x;
    uv.y += noiseY * WIND_AMPLITUDE.y;

    vec2 driftOffset = getDriftOffset(uv, u_time);
    uv += driftOffset;

    float jitter = random(vec2(u_time, uv.y)) * JITTER_INTENSITY;
    uv.x += jitter;

    vec4 baseColor = texture2D(u_image, uv);
    vec4 colorR = texture2D(u_image, uv + vec2(COLOR_SHIFT, 0.0));
    vec4 colorB = texture2D(u_image, uv - vec2(COLOR_SHIFT, 0.0));

    vec4 color;
    color.r = colorR.r;
    color.g = baseColor.g;
    color.b = colorB.b;
    color.a = baseColor.a;

    float staticNoise = vhsNoise(vec2(uv.x * 100.0 + u_time, uv.y * 100.0 + u_time));
    color.rgb = mix(color.rgb, vec3(staticNoise), NOISE_INTENSITY);

    float luminance = dot(color.rgb, vec3(0.299, 0.587, 0.114));

    if(luminance > 0.7) {
        discard;
    }

    gl_FragColor = color;
}