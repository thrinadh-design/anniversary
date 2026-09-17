const loginScreen = document.querySelector('#loginScreen');
const loginForm = document.querySelector('#loginForm');
const loginError = document.querySelector('#loginError');
const site = document.querySelector('#site');
const particleLayer = document.querySelector('#particleLayer');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Small, frontend-only demo gate. The secret is intentionally easy to change.
loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const username = document.querySelector('#username').value.trim();
  const password = document.querySelector('#password').value.trim().toLowerCase();
  if (username && ['forever', 'chinnu', 'love'].includes(password)) {
    loginError.textContent = 'Welcome to our little love story 💕';
    burstParticles(['♥', '♡', '✦'], 24);
    window.setTimeout(() => {
      loginScreen.classList.add('exit');
      site.classList.add('unlocked');
      site.setAttribute('aria-hidden', 'false');
      document.querySelector('#home').scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    }, reducedMotion ? 150 : 1000);
  } else {
    loginError.textContent = 'Our secret is a little word: forever ✨';
  }
});

const menuToggle = document.querySelector('#menuToggle');
const navLinks = document.querySelector('#navLinks');
menuToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

// The shared particle helper powers celebrations without adding DOM libraries.
function burstParticles(symbols, amount = 15) {
  for (let index = 0; index < amount; index += 1) {
    const particle = document.createElement('span');
    particle.className = 'particle';
    particle.textContent = symbols[index % symbols.length];
    particle.style.left = `${25 + Math.random() * 50}%`;
    particle.style.top = `${42 + Math.random() * 25}%`;
    particle.style.setProperty('--x', `${(Math.random() - 0.5) * 55}vw`);
    particle.style.setProperty('--size', `${0.8 + Math.random() * 1.1}rem`);
    particle.style.setProperty('--duration', `${1.6 + Math.random() * 1.7}s`);
    particleLayer.appendChild(particle);
    particle.addEventListener('animationend', () => particle.remove());
  }
}

document.querySelector('#cutCake').addEventListener('click', () => {
  const cake = document.querySelector('#bigCake');
  cake.classList.add('cut');
  document.querySelector('#cakeMessage').classList.add('show');
  burstParticles(['♥', '✦', '✧', '♡'], 36);
});
document.querySelector('#bigCake').addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') document.querySelector('#cutCake').click();
});

document.querySelector('#kissButton').addEventListener('click', () => {
  document.querySelector('#kissMessage').classList.add('show');
  createKisses(14);
});
document.querySelectorAll('.kiss-options button').forEach((button) => button.addEventListener('click', () => createKisses(Number(button.dataset.kisses))));
function createKisses(amount) {
  const button = document.querySelector('#kissButton').getBoundingClientRect();
  for (let index = 0; index < amount; index += 1) {
    const kiss = document.createElement('span');
    kiss.className = 'kiss-particle';
    kiss.textContent = index % 3 === 0 ? '❤️' : '💋';
    kiss.style.left = `${button.left + button.width / 2}px`;
    kiss.style.top = `${button.top + button.height / 2}px`;
    kiss.style.setProperty('--x', `${(Math.random() - 0.5) * 55}vw`);
    kiss.style.setProperty('--y', `${-120 - Math.random() * 55}vh`);
    kiss.style.setProperty('--r', `${(Math.random() - 0.5) * 70}deg`);
    document.body.appendChild(kiss);
    kiss.addEventListener('animationend', () => kiss.remove());
  }
}

document.querySelector('#surpriseButton').addEventListener('click', () => {
  document.querySelector('#surpriseMessage').classList.toggle('show');
  burstParticles(['✦', '♥', '✧'], 28);
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const musicButton = document.querySelector('#musicButton');
let song;
musicButton.addEventListener('click', async () => {
  try {
    if (!song) {
      song = new Audio('assets/our-song.mp3');
      song.loop = true;
    }
    if (song.paused) {
      await song.play();
      musicButton.innerHTML = '⏸ <span>Our Song</span>';
    } else {
      song.pause();
      musicButton.innerHTML = '🎵 <span>Our Song</span>';
    }
  } catch (error) {
    musicButton.innerHTML = '🎵 <span>Add our-song.mp3</span>';
    window.setTimeout(() => { musicButton.innerHTML = '🎵 <span>Our Song</span>'; }, 2500);
  }
});
