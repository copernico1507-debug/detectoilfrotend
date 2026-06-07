// ==================== CANVAS ANIMATION ====================
function initTypewriterCanvas() {
  const canvas = document.getElementById('typewriterCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const textPart1 = "Welcome to ";
  const textPart2 = "FEZAcademy";
  const fullText = textPart1 + textPart2;

  let charIndex = 0;
  let isDeleting = false;
  let lastTime = 0;
  let timer = 0;
  let cursorVisible = true;
  let cursorTimer = 0;
  let waitTimer = 0;

  function resize() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  function draw(timestamp) {
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.fillStyle = "rgba(5, 1, 10, 0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const fontSize = Math.min(canvas.width / 12, 60);
    ctx.font = `bold ${fontSize}px Poppins, sans-serif`;
    ctx.textBaseline = "middle";

    if (waitTimer > 0) {
      waitTimer -= deltaTime;
    } else {
      timer += deltaTime;
      const currentSpeed = isDeleting ? 50 : 120;

      if (timer > currentSpeed) {
        if (!isDeleting) {
          charIndex++;
          if (charIndex === fullText.length) {
            isDeleting = true;
            waitTimer = 2000;
          }
        } else {
          charIndex--;
          if (charIndex === 0) {
            isDeleting = false;
            waitTimer = 500;
          }
        }
        timer = 0;
      }
    }

    cursorTimer += deltaTime;
    if (cursorTimer > 500) {
      cursorVisible = !cursorVisible;
      cursorTimer = 0;
    }

    const totalFullWidth = ctx.measureText(fullText).width;
    let startX = (canvas.width - totalFullWidth) / 2;
    const y = canvas.height / 2;
    let currentX = startX;

    for (let i = 0; i < charIndex; i++) {
      const char = fullText[i];
      const isPart2 = i >= textPart1.length;

      if (isPart2) {
        ctx.shadowBlur = 20;
        ctx.shadowColor = "#a855f7";
        ctx.fillStyle = "#a855f7";
      } else {
        ctx.shadowBlur = 0;
        ctx.fillStyle = "#ffffff";
      }

      ctx.fillText(char, currentX, y);
      currentX += ctx.measureText(char).width;
    }

    if (cursorVisible) {
      ctx.shadowBlur = 0;
      ctx.fillStyle = charIndex > textPart1.length ? "#a855f7" : "#ffffff";
      ctx.fillRect(currentX + 5, y - (fontSize / 2), 4, fontSize);
    }

    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
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
    showMessage(`Iniciando sesión con ${email}...`);
    console.log('Login:', email);
    setTimeout(() => this.close(), 1500);
  }

  handleSignup(e) {
    e.preventDefault();
    const name = this.signupForm.querySelector('input[type="text"]').value;
    showMessage(`¡Bienvenido ${name}! Tu cuenta ha sido creada.`);
    console.log('Signup:', name);
    setTimeout(() => this.close(), 1500);
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
        const sectionTop = targetSection.offsetTop - 100;
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
  messageBox.textContent = text;
  messageBox.classList.add('active');
  messageBox.classList.remove('hide');

  setTimeout(() => {
    messageBox.classList.add('hide');
    setTimeout(() => {
      messageBox.classList.remove('active');
    }, 300);
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

// ==================== INTERSECTION OBSERVER ====================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.feature-card').forEach(card => {
  observer.observe(card);
});

// ==================== INITIALIZE ON LOAD ====================
document.addEventListener('DOMContentLoaded', () => {
  initTypewriterCanvas();
  new Navbar();
  new AuthModal();

  // Add fade-in animation to feature cards
  const style = document.createElement('style');
  style.textContent = `
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
});

// ==================== PERFORMANCE ====================
// Lazy load images if any
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}