import React, { useRef, useEffect } from 'react';

const StarfieldAnimation = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        let gl;
        try {
            gl = canvas.getContext('webgl');
            if (!gl) {
                console.error('WebGL is not supported or is disabled.');
                return;
            }
        } catch (e) {
            console.error('Error creating WebGL context:', e);
            return;
        }

        const vertSrc = `
            attribute vec2 position;
            void main() {
              gl_Position = vec4(position, 0.0, 1.0);
            }
        `;

        const fragSrc = `
            precision highp float;

            uniform vec2 iResolution;
            uniform float iTime;

            vec3 hash( vec3 p ) {
              p = vec3( dot(p,vec3(127.1,311.7, 74.7)),
                        dot(p,vec3(269.5,183.3,246.1)),
                        dot(p,vec3(113.5,271.9,124.6)));
              return -1.0 + 2.0*fract(sin(p)*43758.5453123);
            }

            float noise( in vec3 p ) {
              vec3 i = floor( p );
              vec3 f = fract( p );
              vec3 u = f*f*(3.0-2.0*f);
              return mix( mix( mix( dot( hash( i + vec3(0.0,0.0,0.0) ), f - vec3(0.0,0.0,0.0) ),
                                  dot( hash( i + vec3(1.0,0.0,0.0) ), f - vec3(1.0,0.0,0.0) ), u.x),
                             mix( dot( hash( i + vec3(0.0,1.0,0.0) ), f - vec3(0.0,1.0,0.0) ),
                                  dot( hash( i + vec3(1.0,1.0,0.0) ), f - vec3(1.0,1.0,0.0) ), u.x), u.y),
                        mix( mix( dot( hash( i + vec3(0.0,0.0,1.0) ), f - vec3(0.0,0.0,1.0) ),
                                  dot( hash( i + vec3(1.0,0.0,1.0) ), f - vec3(1.0,0.0,1.0) ), u.x),
                             mix( dot( hash( i + vec3(0.0,1.0,1.0) ), f - vec3(0.0,1.0,1.0) ),
                                  dot( hash( i + vec3(1.0,1.0,1.0) ), f - vec3(1.0,1.0,1.0) ), u.x), u.y), u.z );
            }

            void main() {
              vec2 uv = gl_FragCoord.xy / iResolution.xy;
              vec3 stars_direction = normalize(vec3(uv * 2.0 - 1.0, 1.0));
              float stars_threshold = 8.0;
              float stars_exposure = 200.0;
              float stars = pow(clamp(noise(stars_direction * 200.0), 0.0, 1.0), stars_threshold) * stars_exposure;
              stars *= mix(0.4, 1.4, noise(stars_direction * 100.0 + vec3(iTime)));
              gl_FragColor = vec4(vec3(stars),1.0);
            }
        `;

        let program;
        try {
            const vertShader = compileShader(vertSrc, gl.VERTEX_SHADER);
            const fragShader = compileShader(fragSrc, gl.FRAGMENT_SHADER);
            
            program = gl.createProgram();
            gl.attachShader(program, vertShader);
            gl.attachShader(program, fragShader);
            gl.linkProgram(program);

            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                throw new Error(gl.getProgramInfoLog(program));
            }
        } catch(error) {
            console.error('Shader setup failed:', error);
            return;
        }

        function compileShader(source, type) {
            const shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                throw new Error(gl.getShaderInfoLog(shader));
            }
            return shader;
        }

        gl.useProgram(program);

        const posLoc = gl.getAttribLocation(program, 'position');
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            -1, -1, 1, -1, -1, 1,
            -1, 1, 1, -1, 1, 1,
        ]), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(posLoc);
        gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

        const iResolution = gl.getUniformLocation(program, 'iResolution');
        const iTime = gl.getUniformLocation(program, 'iTime');

        let animationFrameId;
        function render(time) {
            gl.uniform2f(iResolution, canvas.width, canvas.height);
            gl.uniform1f(iTime, time * 0.001);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
            animationFrameId = requestAnimationFrame(render);
        }

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        }
        window.addEventListener('resize', resize);
        resize();
        
        render(0);

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
            if (gl && program) {
                gl.deleteProgram(program);
                gl.deleteBuffer(buffer);
            }
        };
    }, []);

    return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', display: 'block', pointerEvents: 'none', zIndex: 0 }} />;
};

export default StarfieldAnimation;
