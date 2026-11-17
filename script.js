// ====== Tema claro / oscuro ======
const root = document.documentElement;
const themeBtn = document.getElementById("themeToggle");
try {
  const saved = localStorage.getItem("theme");
  if (saved) root.setAttribute("data-theme", saved);
} catch (e) {}
themeBtn.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  try { localStorage.setItem("theme", next); } catch (e) {}
});

// ====== Menú móvil ======
const nav = document.getElementById("nav");
document.getElementById("menuBtn").addEventListener("click", () => nav.classList.toggle("open"));
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

// ====== Efecto de escritura "HI, I'M" ======
const typed = document.getElementById("typed");
const words = ["SERGIO", "DEV404", "A DEVELOPER", "A DESIGNER"];
let w = 0, c = 0, deleting = false;
function type() {
  const word = words[w];
  typed.textContent = " " + word.slice(0, c);
  if (!deleting && c < word.length) { c++; setTimeout(type, 140); }
  else if (!deleting) { deleting = true; setTimeout(type, 1400); }
  else if (c > 0) { c--; setTimeout(type, 70); }
  else { deleting = false; w = (w + 1) % words.length; setTimeout(type, 300); }
}
type();

// ====== Cuadros aleatorios de fondo ======
const squares = document.getElementById("bgSquares");
function makeSquares() {
  squares.innerHTML = "";
  const count = Math.floor(window.innerWidth / 70);
  for (let i = 0; i < count; i++) {
    const s = document.createElement("i");
    const size = 20 + Math.random() * 30;
    s.style.width = s.style.height = size + "px";
    s.style.left = Math.random() * 100 + "%";
    s.style.top = Math.random() * 100 + "%";
    s.style.animationDelay = Math.random() * 4 + "s";
    s.style.animationDuration = 3 + Math.random() * 4 + "s";
    squares.appendChild(s);
  }
}
makeSquares();
window.addEventListener("resize", makeSquares);

// ====== Bloques "glitch" sobre la foto ======
const glitch = document.getElementById("glitchBlocks");
function glitchBlocks() {
  glitch.innerHTML = "";
  for (let i = 0; i < 7; i++) {
    const b = document.createElement("i");
    const size = 30 + Math.random() * 50;
    b.style.width = size + "px";
    b.style.height = size + "px";
    b.style.left = Math.random() * 90 + "%";
    b.style.top = Math.random() * 90 + "%";
    b.style.opacity = Math.random() > 0.4 ? 0.6 : 0;
    glitch.appendChild(b);
  }
}
glitchBlocks();
setInterval(glitchBlocks, 1800);

// ====== Contadores animados ======
const counters = document.querySelectorAll("[data-count]");
const countObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, target = +el.dataset.count;
    let n = 0;
    const step = setInterval(() => {
      n++; el.textContent = n;
      if (n >= target) clearInterval(step);
    }, 900 / target);
    countObs.unobserve(el);
  });
}, { threshold: 0.6 });
counters.forEach(c => countObs.observe(c));

// ====== Link activo según el scroll ======
const links = document.querySelectorAll(".nav-link");
const sections = [...links].map(l => document.querySelector(l.getAttribute("href")));
const spy = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id));
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
sections.forEach(s => s && spy.observe(s));

// ====== Aparición al hacer scroll ======
document.querySelectorAll(".block, .project, .service").forEach(el => el.classList.add("reveal"));
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("show"); revealObs.unobserve(e.target); } });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach(el => revealObs.observe(el));

// ====== Año del footer ======
document.getElementById("year").textContent = new Date().getFullYear();
