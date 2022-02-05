export default
`#version 300 es
#define NUMBER_LIGHTS 2

precision highp float;

in vec4 vPosition;
in vec4 vNormal;

uniform mat4 u_model;
uniform mat4 u_view;
uniform mat4 u_projection;

uniform vec4 lightPosition[NUMBER_LIGHTS];
uniform vec4 lightColor[NUMBER_LIGHTS];
uniform float lightIntensity[NUMBER_LIGHTS];
uniform float lightLinearAttenuation[NUMBER_LIGHTS];
uniform float lightQuadraticAttenuation[NUMBER_LIGHTS];

out vec4 minhaColor;

void main()
{
  vec4 vColor = vec4(1.0, 1.0, 1.0, 1.0);

  vec4 lighting;
      
  for(int i=0; i < NUMBER_LIGHTS; i++) {
    float distanceFromLight = distance(lightPosition[i], vPosition);
    vec4 direction = normalize(lightPosition[i] - vPosition);
    
    float lightCalculation = max(0.0, dot(vNormal, direction));

    float falloff = (
      1.0 / (
        1.0 +
        lightLinearAttenuation[i] * distanceFromLight +
        lightQuadraticAttenuation[i] * pow(distanceFromLight, 2.0)
      )
    );

    lighting += lightCalculation * falloff * lightIntensity[i] * lightColor[i];
  }
  
  minhaColor =  vec4(vColor.xyz * lighting.xyz, 1.0);
}`


