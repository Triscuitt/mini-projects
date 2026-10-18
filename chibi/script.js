/* =========================================================
   Moonlight Love — Script
   Handles stars, fireflies, floating hearts, and the
   "Forgive Me?" interaction.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  createStars(70);
  createFireflies(14);
  startHeartLoop();

  const forgiveBtn = document.getElementById('forgiveBtn');
  forgiveBtn.addEventListener('click', onForgiveClick);
});

/* ---------- Stars ---------- */
function createStars(count) {
  const container = document.getElementById('stars');
  const frag = document.createDocumentFragment();

  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.top = `${Math.random() * 65}%`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.animationDuration = `${1.5 + Math.random() * 3}s`;
    star.style.animationDelay = `${Math.random() * 3}s`;
    const size = 1 + Math.random() * 2;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    frag.appendChild(star);
  }
  container.appendChild(frag);
}

/* ---------- Fireflies ---------- */
function createFireflies(count) {
  const container = document.getElementById('fireflies');
  const frag = document.createDocumentFragment();

  for (let i = 0; i < count; i++) {
    const fly = document.createElement('div');
    fly.className = 'firefly';
    fly.style.top = `${40 + Math.random() * 55}%`;
    fly.style.left = `${Math.random() * 100}%`;

    // Build a small randomized wander path using CSS custom keyframes via inline animation
    const duration = 6 + Math.random() * 8;
    const delay = Math.random() * 5;
    fly.style.animationDuration = `${duration}s, 2.2s`;
    fly.style.animationDelay = `${delay}s, ${Math.random() * 2}s`;

    // Generate a unique wander keyframe for this firefly
    const name = `wander-${i}-${Math.floor(Math.random() * 10000)}`;
    injectWanderKeyframe(name);
    fly.style.animationName = `${name}, fireflyBlink`;

    frag.appendChild(fly);
  }
  container.appendChild(frag);
}

function injectWanderKeyframe(name) {
  const style = document.createElement('style');
  const x1 = rand(-40, 40), y1 = rand(-30, 30);
  const x2 = rand(-40, 40), y2 = rand(-30, 30);
  const x3 = rand(-40, 40), y3 = rand(-30, 30);

  style.textContent = `
    @keyframes ${name} {
      0%   { transform: translate(0, 0); }
      25%  { transform: translate(${x1}px, ${y1}px); }
      50%  { transform: translate(${x2}px, ${y2}px); }
      75%  { transform: translate(${x3}px, ${y3}px); }
      100% { transform: translate(0, 0); }
    }
  `;
  document.head.appendChild(style);
}

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

/* ---------- Floating hearts ---------- */
function spawnHeart(burst = false) {
  const container = document.getElementById('heartsContainer');
  const heart = document.createElement('div');
  heart.className = 'floating-heart';
  heart.textContent = Math.random() > 0.5 ? '❤️' : '💕';
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.setProperty('--drift', `${rand(-60, 60)}px`);
  const duration = burst ? rand(3, 5) : rand(6, 10);
  heart.style.animationDuration = `${duration}s`;
  heart.style.fontSize = `${14 + Math.random() * 14}px`;

  container.appendChild(heart);

  // Clean up after animation completes
  setTimeout(() => heart.remove(), duration * 1000 + 200);
}

function startHeartLoop() {
  // Gentle ambient hearts rising at random intervals
  spawnHeart();
  const interval = () => {
    spawnHeart();
    setTimeout(interval, rand(1800, 4200));
  };
  setTimeout(interval, rand(1000, 2500));
}

/* ---------- Forgive Me interaction ---------- */
let forgiven = false;

function onForgiveClick() {
  if (forgiven) return;
  forgiven = true;

  document.body.classList.add('forgiven');

  // Fill the screen with extra glowing hearts
  for (let i = 0; i < 26; i++) {
    setTimeout(() => spawnHeart(true), i * 70);
  }

  // Sparkles around the chibi
  spawnSparkles();

  // Update speech bubble text with a little pop
  const bubble = document.getElementById('speechBubble');
  const text = document.getElementById('speechText');
  bubble.style.transform = 'scale(0.85)';
  bubble.style.opacity = '0.5';

  setTimeout(() => {
    text.textContent = 'Thank you mwaah mwaah mwaah I love you ❤️';
    bubble.style.transform = 'scale(1.08)';
    bubble.style.opacity = '1';
    setTimeout(() => {
      bubble.style.transform = 'scale(1)';
    }, 200);
  }, 250);

  // Transform the button
  const btn = document.getElementById('forgiveBtn');
  const btnText = document.getElementById('btnText');
  btn.classList.add('thanked');
  btnText.textContent = 'Thank You ❤️';
  btn.disabled = true;
}

function spawnSparkles() {
  const burst = document.getElementById('sparkleBurst');
  for (let i = 0; i < 18; i++) {
    const s = document.createElement('div');
    s.className = 'sparkle';
    const angle = Math.random() * Math.PI * 2;
    const distance = 40 + Math.random() * 60;
    s.style.left = `${50 + Math.random() * 20 - 10}%`;
    s.style.top = `${40 + Math.random() * 20}%`;
    s.style.setProperty('--sx', `${Math.cos(angle) * distance}px`);
    s.style.setProperty('--sy', `${Math.sin(angle) * distance}px`);
    s.style.animationDelay = `${Math.random() * 0.3}s`;
    burst.appendChild(s);
    setTimeout(() => s.remove(), 1500);
  }
}