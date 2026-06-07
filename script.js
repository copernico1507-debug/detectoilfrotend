// ==================== THREE.JS 3D SCENE ====================
let scene, camera, renderer, mesh;

function init3DScene() {
  const container = document.getElementById('canvas3d');
  if (!container || container.clientWidth === 0) return;

  const width = container.clientWidth;
  const height = container.clientHeight;

  // Scene setup
  scene = new THREE.Scene();
  scene.background = null;
  
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 3;

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // Create 3D torus geometry
  const geometry = new THREE.TorusKnotGeometry(1.5, 0.5, 100, 16);
  const material = new THREE.MeshPhongMaterial({
    color: 0xa855f7,
    emissive: 0x7c3aed,
    shininess: 100,
    wireframe: false
  });
  
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // Lighting
  const light1 = new THREE.PointLight(0xa855f7, 1, 100);
  light1.position.set(5, 5, 5);
  scene.add(light1);

  const light2 = new THREE.PointLight(0x0ea5e9, 0.8, 100);
  light2.position.set(-5, -5, 5);
  scene.add(light2);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambientLight);

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    
    mesh.rotation.x += 0.002;
    mesh.rotation.y += 0.003;
    mesh.rotation.z += 0.001;

    renderer.render(scene, camera);
  }

  animate();

  // Handle window resize
  window.addEventListener('resize', () => {
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  });
}

// ==================== PARTICLES SYSTEM ====================
function createParticles() {
  const container = document.getElementById('particlesContainer');
  if (!container) return;

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.width = Math.random() * 4 + 2 + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = ['#a855f7', '#0ea5e9', '#ec4899'][Math.floor(Math.random() * 3)];
    particle.style.borderRadius = '50%';
    particle.style.position = 'absolute';
    particle.style.opacity = Math.random() * 0.7 + 0.3;
    particle.style.animation = `floatParticle ${Math.random() * 20 + 10}s linear infinite`;
    particle.style.pointerEvents = 'none';
    
    container.appendChild(particle);
  }

  // Add particle animation style
  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatParticle {
      0% {
        transform: translateY(0) translateX(0) scale(1);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translateY(-${window.innerHeight}px) translateX(${Math.random() * 100 - 50}px) scale(0);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

// ==================== LOADING SCREEN ====================
function hideLoadingScreen() {
  const loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 2000);
  }
}

// ==================== AUTH MODAL ====================
class AuthModal {
  constructor() {
    this.modal = document.getElementById('authModal');
    this.authContainer = document.querySelector('.auth-container');
    this.closeBtn = document.getElementById('closeModal');
    this.signInBtn = document.getElementById('signInBtn');
    this.signUpBtn = document.getElementById('signUpBtn');
    this.navLoginBtn = document.getElementById('navLoginBtn');
    this.heroLoginBtn = document.getElementById('heroLoginBtn');
    this.loginForm = document.getElementById('loginForm');
    this.signupForm = document.getElementById('signupForm');

    this.init();
  }

  init() {
    this.closeBtn.addEventListener('click', () => this.close());
    this.signInBtn.addEventListener('click', () => this.toggleToSignIn());
    this.signUpBtn.addEventListener('click', () => this.toggleToSignUp());
    this.navLoginBtn.addEventListener('click', () => this.open());
    this.heroLoginBtn.addEventListener('click', () => this.open());

    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.close();
    });

    this.loginForm.addEventListener('submit', (e) => this.handleLogin(e));
    this.signupForm.addEventListener('submit', (e) => this.handleSignup(e));
  }

  open() {
    this.modal.classList.add('active');
    this.authContainer.classList.remove('active');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggleToSignUp() {
    this.authContainer.classList.add('active');
  }

  toggleToSignIn() {
    this.authContainer.classList.remove('active');
  }

  handleLogin(e) {
    e.preventDefault();
    const email = this.loginForm.querySelector('input[type="email"]').value;
    showMessage(`✓ Iniciando sesión con ${email}`);
    setTimeout(() => {
      this.loginForm.reset();
      this.close();
    }, 1500);
  }

  handleSignup(e) {
    e.preventDefault();
    const name = this.signupForm.querySelector('input[type="text"]').value;
    showMessage(`✓ ¡Bienvenido ${name}! Cuenta creada exitosamente`);
    setTimeout(() => {
      this.signupForm.reset();
      this.close();
      this.authContainer.classList.remove('active');
    }, 1500);
  }
}

// ==================== NAVBAR ====================
class Navbar {
  constructor() {
    this.hamburger = document.getElementById('hamburger');
    this.navMenu = document.querySelector('.nav-menu');
    this.navLinks = document.querySelectorAll('.nav-link');

    this.init();
  }

  init() {
    this.hamburger.addEventListener('click', () => this.toggleMenu());
    this.navLinks.forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });

    window.addEventListener('scroll', () => this.updateActiveLink());
  }

  toggleMenu() {
    this.navMenu.classList.toggle('active');
    this.hamburger.classList.toggle('active');
  }

  closeMenu() {
    this.navMenu.classList.remove('active');
    this.hamburger.classList.remove('active');
  }

  updateActiveLink() {
    const scrollPosition = window.scrollY;

    this.navLinks.forEach(link => {
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const sectionTop = targetSection.offsetTop - 150;
        const sectionBottom = sectionTop + targetSection.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          this.navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  }
}

// ==================== MESSAGE BOX ====================
function showMessage(text, duration = 3000) {
  const messageBox = document.getElementById('messageBox');
  const messageText = document.getElementById('messageText');
  
  messageText.textContent = text;
  messageBox.classList.add('active');

  setTimeout(() => {
    messageBox.classList.remove('active');
  }, duration);
}

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#' || href === '') return;

    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ==================== SCROLL ANIMATIONS ====================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = `fadeInUp 0.8s ease-out ${index * 0.1}s both`;
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// ==================== HOVER TILT EFFECT ====================
function setupTiltEffect() {
  const cards = document.querySelectorAll('.feature-card, .pricing-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
  });
}

// ==================== PARALLAX EFFECT ====================
function setupParallax() {
  window.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    const spheres = document.querySelectorAll('.floating-sphere');
    spheres.forEach((sphere, index) => {
      const speed = (index + 1) * 10;
      sphere.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
  });
}

// ==================== GSAP ANIMATIONS (Optional) ====================
function setupScrollAnimations() {
  const featureCards = document.querySelectorAll('.feature-card');
  const techItems = document.querySelectorAll('.tech-item');
  const pricingCards = document.querySelectorAll('.pricing-card');

  [featureCards, techItems, pricingCards].forEach(elements => {
    elements.forEach((el, index) => {
      observer.observe(el);
    });
  });
}

// ==================== BUTTON RIPPLE EFFECT ====================
function setupRippleEffect() {
  const buttons = document.querySelectorAll('.btn, .btn-form');
  
  buttons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');

      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

// ==================== ADD RIPPLE STYLES ====================
function addRippleStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      transform: scale(0);
      animation: rippleEffect 0.6s ease-out;
      pointer-events: none;
    }

    @keyframes rippleEffect {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);
}

// ==================== PERFORMANCE OPTIMIZATION ====================
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ==================== INITIALIZE ON LOAD ====================
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  hideLoadingScreen();
  addRippleStyles();
  init3DScene();
  createParticles();
  new Navbar();
  new AuthModal();
  setupTiltEffect();
  setupParallax();
  setupScrollAnimations();
  setupRippleEffect();

  console.log('🎉 FEZAcademy Ultra Professional Frontend Loaded!');
});

// ==================== RESPONSIVE HANDLING ====================
window.addEventListener('resize', debounce(() => {
  if (renderer && scene && camera) {
    const container = document.getElementById('canvas3d');
    if (container) {
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
  }
}, 250));

// ==================== MOUSE FOLLOW EFFECT ====================
document.addEventListener('mousemove', (e) => {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  if (mesh) {
    mesh.rotation.x += (y * 0.001 - mesh.rotation.x) * 0.1;
    mesh.rotation.y += (x * 0.001 - mesh.rotation.y) * 0.1;
  }
});