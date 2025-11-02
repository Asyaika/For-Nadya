// daftar teks untuk efek typewriter
const texts = {
  1: "Hi Nad, we’ve got something special for you, open it!",
  2: "Happy Birthday Nadya!!!",
  3: "Make a wish now!",
  4: "Happy birthday! I just hope this year feels a little lighter, a little kinder, and a lot more you. "
};

function typeWriter(id, text, speed = 60) {
  const element = document.getElementById(id);
  element.textContent = "";
  let i = 0;
  const interval = setInterval(() => {
    element.textContent += text.charAt(i);
    i++;
    if (i >= text.length) clearInterval(interval);
  }, speed);
}

function nextScene(num) {
  const active = document.querySelector('.scene.active');
  if (active) active.classList.remove('active', 'fade', 'bounce');

  const next = document.getElementById('scene' + num);
  next.classList.add('active');

  // Animasi sesuai scene
  if (num === 3) next.classList.add('bounce');
  else next.classList.add('fade');

  const m1 = document.getElementById('music1');
  const m2 = document.getElementById('music2');

  if (num === 1) {
    m1.play();
    typeWriter("text1", texts[1]);
  } 
  else if (num === 2) {
    m1.pause();
    m2.play();
    startConfetti();
    typeWriter("text2", texts[2]);
  } 
  else if (num === 3) {
    stopConfetti();
    typeWriter("text3", texts[3]);
  } 
  else if (num === 4) {
    typeWriter("text4", texts[4]);
  }
}

// === confetti sederhana ===
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
let confettis = [];
let confettiInterval;

function startConfetti() {
  resizeCanvas();
  confettis = Array.from({ length: 100 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 6 + 2,
    c: `hsl(${Math.random() * 360}, 100%, 70%)`,
    s: Math.random() * 3 + 2
  }));
  confettiInterval = setInterval(drawConfetti, 20);
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confettis.forEach(f => {
    ctx.beginPath();
    ctx.arc(f.x, f.y, f.r, 0, 2 * Math.PI);
    ctx.fillStyle = f.c;
    ctx.fill();
    f.y += f.s;
    if (f.y > canvas.height) f.y = 0;
  });
}

function stopConfetti() {
  clearInterval(confettiInterval);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.onresize = resizeCanvas;
