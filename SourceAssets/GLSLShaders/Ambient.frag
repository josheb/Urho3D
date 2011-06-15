#include "Uniforms.frag"
#include "Samplers.frag"
#include "Fog.frag"

varying vec2 vScreenPos;

void main()
{
    vec4 diffInput = texture2D(sDiffBuffer, vScreenPos);
    float depth = texture2D(sDepthBuffer, vScreenPos).r;

    vec3 ambientColor = cAmbientColor * diffInput.rgb;

    #ifdef ORTHO
        float linearDepth = depth;
    #else
        float linearDepth = ReconstructDepth(depth);
    #endif

    gl_FragColor = vec4(ambientColor + GetFogFactor(linearDepth) * cFogColor, 1.0);
    // Copy the actual hardware depth value with slight bias to the destination depth buffer
    gl_FragDepth = min(depth + 0.0000001, 1.0);
}
