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

            // 2D noise function
float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
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