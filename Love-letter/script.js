/**
 * First Monthsary Love Letter — script.js
 *
 * Flow:
 *   Page loads  → Stage 1 (envelope + open button) visible
 *   Click Open  → envelope flap opens → Stage 1 fades out
 *                 → Stage 2 (letter + photos) fades in from below
 *   Click Close → Stage 2 fades out → Stage 1 resets & fades back in
 */

/* ============================================================
   1. FLOATING HEARTS
   ============================================================ */
const HEARTS        = ['❤️', '🩷', '💕', '💗', '💖', '✨', '🌹'];
const HEART_COUNT   = 18;
const heartsContainer = document.getElementById('heartsContainer');

function createHeart() {
  const el       = document.createElement('span');
  el.className   = 'floating-heart';
  el.textContent = HEARTS[Math.floor(Math.random() * HEARTS.length)];

  const size     = 0.9  + Math.random() * 1.4;
  const left     = Math.random() * 100;
  const duration = 7    + Math.random() * 9;
  const delay    = Math.random() * duration;

  el.style.cssText = `
    left: ${left}%;
    font-size: ${size}rem;
    animation-duration: ${duration}s;
    animation-delay: -${delay}s;
  `;

  heartsContainer.appendChild(el);

  el.addEventListener('animationiteration', () => {
    el.style.left      = `${Math.random() * 100}%`;
    el.style.fontSize  = `${0.9 + Math.random() * 1.4}rem`;
    el.textContent     = HEARTS[Math.floor(Math.random() * HEARTS.length)];
  });
}

for (let i = 0; i < HEART_COUNT; i++) createHeart();


/* ============================================================
   2. DOM REFERENCES
   ============================================================ */
const envelope     = document.getElementById('envelope');
const btnOpen      = document.getElementById('btnOpen');
const btnClose     = document.getElementById('btnClose');
const envelopeStage = document.getElementById('envelopeStage');
const letterStage  = document.getElementById('letterStage');
const photoLeft    = document.getElementById('photoLeft');
const photoRight   = document.getElementById('photoRight');
const letterBody   = document.getElementById('letterBody');

let isAnimating = false;


/* ============================================================
   3. OPEN SEQUENCE
   ============================================================ */
function openLetter() {
  if (isAnimating) return;
  isAnimating = true;

  // Step 1 — open envelope flap
  envelope.classList.add('is-open');

  // Step 2 — fade out envelope stage
  setTimeout(() => {
    envelopeStage.classList.add('hidden');
  }, 500);

  // Step 3 — make letter stage visible (display:flex) then trigger CSS transition
  setTimeout(() => {
    letterStage.setAttribute('aria-hidden', 'false');
    letterStage.classList.add('visible');

    // One rAF delay so the browser registers display:flex before animating
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        letterStage.classList.add('show');
      });
    });
  }, 700);

  // Step 4 — fade in photos + start typewriter
  setTimeout(() => {
    photoLeft.classList.add('visible');
    photoRight.classList.add('visible');
    startTypewriter();
    isAnimating = false;
    // playMusic(); // ← uncomment if using background music
  }, 900);
}


/* ============================================================
   4. CLOSE / RESET SEQUENCE
   ============================================================ */
function closeLetter() {
  if (isAnimating) return;
  isAnimating = true;

  // Stop typewriter and restore full HTML immediately
  stopTypewriter();

  // Step 1 — fade out photos & letter stage
  photoLeft.classList.remove('visible');
  photoRight.classList.remove('visible');
  letterStage.classList.remove('show');

  // Step 2 — hide letter stage from layout
  setTimeout(() => {
    letterStage.classList.remove('visible');
    letterStage.setAttribute('aria-hidden', 'true');
  }, 500);

  // Step 3 — close envelope flap & show envelope stage again
  setTimeout(() => {
    envelope.classList.remove('is-open');
    envelopeStage.classList.remove('hidden');
  }, 550);

  // Step 4 — unlock
  setTimeout(() => {
    isAnimating = false;
  }, 1000);
}


/* ============================================================
   5. EVENT LISTENERS
   ============================================================ */
btnOpen.addEventListener('click', openLetter);
btnClose.addEventListener('click', closeLetter);
// Also open on envelope click
envelope.addEventListener('click', openLetter);


/* ============================================================
   6. TYPEWRITER ANIMATION
   ============================================================ */
let typewriterTimer = null;
let originalHTML    = null;
const TYPING_SPEED  = 18; // ms per character

function startTypewriter() {
  // Capture original HTML once
  if (originalHTML === null) {
    originalHTML = letterBody.innerHTML;
  }

  // Extract plain text from HTML
  const tmp      = document.createElement('div');
  tmp.innerHTML  = originalHTML;
  const fullText = tmp.textContent || '';

  letterBody.textContent = '';
  letterBody.classList.add('typing');

  let i = 0;

  function tick() {
    if (i < fullText.length) {
      letterBody.textContent += fullText[i++];
      typewriterTimer = setTimeout(tick, TYPING_SPEED);
    } else {
      // Restore rich HTML tags (<em>, <br>, etc.)
      letterBody.innerHTML = originalHTML;
      letterBody.classList.remove('typing');
    }
  }

  tick();
}

function stopTypewriter() {
  clearTimeout(typewriterTimer);
  typewriterTimer = null;
  if (originalHTML !== null) letterBody.innerHTML = originalHTML;
  letterBody.classList.remove('typing');
}


/* ============================================================
   7. BACKGROUND MUSIC HELPER  (commented out)
   ============================================================

function playMusic() {
  const music = document.getElementById('bgMusic');
  if (!music) return;
  music.volume = 0.35;
  music.play().catch(() => {});
}

function stopMusic() {
  const music = document.getElementById('bgMusic');
  if (!music) return;
  music.pause();
  music.currentTime = 0;
}

   Enable: uncomment <audio> in index.html, point src to your file,
   then uncomment playMusic() in openLetter() and stopMusic() in closeLetter().
   ============================================================ */