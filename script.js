let scene, camera, renderer, mesh;

function init3DScene() {
  const container = document.getElementById('canvas3d');
  if (!container || container.clientWidth === 0) return;

  const width = container.clientWidth;
  const height = container.clientHeight;

  scene = new THREE.Scene();
  scene.background = null;
  
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 3;

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  const geometry = new THREE.TorusKnotGeometry(1.5, 0.5, 100, 16);
  const material = new THREE.MeshPhongMaterial({
    color: 0xa855f7,
    emissive: 0x7c3aed,
    shininess: 100
  });
  
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const light1 = new THREE.PointLight(0xa855f7, 1, 100);
  light1.position.set(5, 5, 5);
  scene.add(light1);

  const light2 = new THREE.PointLight(0x0ea5e9, 0.8, 100);
  light2.position.set(-5, -5, 5);
  scene.add(light2);

  scene.add(new THREE.AmbientLight(0xffffff, 0.3));

  function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.x += 0.002;
    mesh.rotation.y += 0.003;
    mesh.rotation.z += 0.001;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });

  document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    mesh.rotation.x += (y * 0.001 - mesh.rotation.x) * 0.1;
    mesh.rotation.y += (x * 0.001 - mesh.rotation.y) * 0.1;
  });
}

function createParticles() {
  const container = document.getElementById('particlesContainer');
  if (!container) return;

  for (let i = 0; i < 50; i++) {
    const p = document.createElement('div');
    p.style.position = 'absolute';
    p.style.width = Math.random() * 4 + 2 + 'px';
    p.style.height = p.style.width;
    p.style.background = ['#a855f7', '#0ea5e9', '#ec4899'][Math.floor(Math.random() * 3)];
    p.style.borderRadius = '50%';
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    p.style.opacity = Math.random() * 0.7 + 0.3;
    p.style.animation = `float-p ${Math.random() * 20 + 10}s linear infinite`;
    container.appendChild(p);
  }
}

class AuthModal {
  constructor() {
    this.modal = document.getElementById('authModal');
    this.closeBtn = document.getElementById('closeModal');
    this.loginBtn = document.getElementById('navLoginBtn');
    this.heroBtn = document.getElementById('heroLoginBtn');
    this.toggleBtn = document.getElementById('toggleForm');
    this.containers = document.querySelectorAll('.form-container');
    this.init();
  }

  init() {
    this.closeBtn.onclick = () => this.close();
    this.loginBtn.onclick = () => this.open();
    this.heroBtn.onclick = () => this.open();
    this.toggleBtn.onclick = () => this.toggle();
    this.modal.onclick = (e) => e.target === this.modal && this.close();
  }

  open() {
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggle() {
    this.containers.forEach(c => c.classList.toggle('active'));
  }
}

class Navbar {
  constructor() {
    this.hamburger = document.getElementById('hamburger');
    this.menu = document.querySelector('.nav-menu');
    this.links = document.querySelectorAll('.nav-link');
    this.init();
  }

  init() {
    this.hamburger.onclick = () => this.menu.classList.toggle('active');
    this.links.forEach(link => {
      link.onclick = () => this.menu.classList.remove('active');
    });
  }
}

function showMessage(text) {
  const box = document.getElementById('messageBox');
  document.getElementById('messageText').textContent = text;
  box.classList.add('active');
  setTimeout(() => box.classList.remove('active'), 3000);
}

document.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float-p {
      0% { transform: translateY(0); opacity: 0; }
      10% { opacity: 1; }
      90% { opacity: 1; }
      100% { transform: translateY(-${window.innerHeight}px); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  document.getElementById('loadingScreen').style.display = 'none';
  init3DScene();
  createParticles();
  new AuthModal();
  new Navbar();

  document.getElementById('loginForm').onsubmit = (e) => {
    e.preventDefault();
    showMessage('✓ Iniciando sesión...');
    setTimeout(() => { document.getElementById('authModal').classList.remove('active'); }, 1500);
  };

  document.getElementById('signupForm').onsubmit = (e) => {
    e.preventDefault();
    showMessage('✓ ¡Cuenta creada exitosamente!');
    setTimeout(() => { document.getElementById('authModal').classList.remove('active'); }, 1500);
  };

  console.log('🎉 FEZAcademy Ultra Professional Frontend Loaded!');
});