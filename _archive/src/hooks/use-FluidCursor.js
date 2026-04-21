const fluidCursor = () => {
  const canvas = document.getElementById('fluid');
  if (!canvas) return;

  const gl = canvas.getContext('webgl', { preserveDrawingBuffer: true });
  if (!gl) {
    console.warn('WebGL not supported');
    return;
  }

  // Resize canvas to full screen
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Vertex shader
  const vertexShaderSource = `
    attribute vec2 a_position;
    void main() {
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

  // Fragment shader with #A489AD theme colors
  const fragmentShaderSource = `
    precision mediump float;
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    uniform float u_time;
    
    void main() {
      vec2 st = gl_FragCoord.xy / u_resolution.xy;
      vec2 mouse = u_mouse / u_resolution.xy;
      
      float dist = distance(st, mouse);
      float intensity = 0.8 / (dist + 0.1);
      
      // Theme colors: #A489AD (purple-mauve), black, white
      vec3 color1 = vec3(0.643, 0.537, 0.678); // #A489AD
      vec3 color2 = vec3(0.541, 0.478, 0.568); // Darker variant
      vec3 color3 = vec3(0.8, 0.8, 0.8); // Light gray/white
      
      vec3 color = mix(color1, color2, st.x);
      color = mix(color, color3, sin(u_time * 0.5 + st.y * 3.14159) * 0.3 + 0.3);
      color *= intensity * 0.25;
      
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compile error:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return null;
    }
    return program;
  }

  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  const program = createProgram(gl, vertexShader, fragmentShader);

  if (!program) return;

  // Get attribute and uniform locations
  const positionLocation = gl.getAttribLocation(program, 'a_position');
  const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
  const mouseLocation = gl.getUniformLocation(program, 'u_mouse');
  const timeLocation = gl.getUniformLocation(program, 'u_time');

  // Create buffer
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  const positions = [-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  // Mouse tracking
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  canvas.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = window.innerHeight - e.clientY;
  });

  canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    if (e.touches.length > 0) {
      mouseX = e.touches[0].clientX;
      mouseY = window.innerHeight - e.touches[0].clientY;
    }
  });

  // Render loop
  let startTime = Date.now();

  function render() {
    // Set viewport
    gl.viewport(0, 0, canvas.width, canvas.height);

    // Clear canvas
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Use program
    gl.useProgram(program);

    // Set uniforms
    gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    gl.uniform2f(mouseLocation, mouseX, mouseY);
    gl.uniform1f(timeLocation, (Date.now() - startTime) * 0.001);

    // Enable attribute
    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Draw
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    requestAnimationFrame(render);
  }

  render();
};

export default fluidCursor;