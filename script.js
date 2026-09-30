const MENU = [
  { id: "espresso", cat: "espresso", name: "Эспрессо", desc: "Бленд Бразилии и Колумбии, плотный и сладкий.", notes: ["какао", "орех"], price: 160 },
  { id: "cappuccino", cat: "espresso", name: "Капучино", desc: "Классика на бархатном молоке.", notes: ["молочный шоколад", "карамель"], price: 240, tag: "Хит" },
  { id: "flatwhite", cat: "espresso", name: "Флэт уайт", desc: "Двойной эспрессо на эфиопском зерне и немного молока.", notes: ["ягоды", "сливки"], price: 260 },
  { id: "raf", cat: "espresso", name: "Раф «Кедровый»", desc: "Сливочный раф с пастой из сибирского кедрового ореха.", notes: ["кедр", "ваниль"], price: 310, tag: "Сибирь" },
  { id: "v60", cat: "filter", name: "V60 Эфиопия", desc: "Воронка на лёгкой обжарке, чистая и цветочная чашка.", notes: ["жасмин", "бергамот", "персик"], price: 290 },
  { id: "aeropress", cat: "filter", name: "Аэропресс Кения", desc: "Яркая, сочная чашка с выраженной кислинкой.", notes: ["смородина", "грейпфрут"], price: 310 },
  { id: "chemex", cat: "filter", name: "Кемекс на двоих", desc: "500 мл сорта недели. Удобно взять с собой в термос.", notes: ["сорт недели"], price: 450 },
  { id: "coldbrew", cat: "cold", name: "Колд брю", desc: "Настаиваем 18 часов в холоде. Мягкий и бодрый.", notes: ["шоколад", "чернослив"], price: 270 },
  { id: "tonic", cat: "cold", name: "Эспрессо-тоник", desc: "Тоник, лёд, цедра и шот эфиопского эспрессо.", notes: ["цитрус", "свежесть"], price: 290 },
  { id: "icelatte", cat: "cold", name: "Айс латте", desc: "Эспрессо, холодное молоко и много льда.", notes: ["карамель", "орех"], price: 280 },
  { id: "croissant", cat: "food", name: "Круассан", desc: "Из местной пекарни, привозим каждое утро.", notes: ["сливочное масло"], price: 190 },
  { id: "cheesecake", cat: "food", name: "Облепиховый чизкейк", desc: "Нежный сливочный чизкейк с облепиховым конфи.", notes: ["облепиха", "сливки"], price: 280, tag: "Новинка" },
  { id: "brownie", cat: "food", name: "Брауни с кедром", desc: "Тёмный шоколад и обжаренный кедровый орех.", notes: ["шоколад", "кедр"], price: 240 },
];

const QUIZ = [
  {
    key: "milk",
    question: "Как вы обычно пьёте кофе?",
    options: [
      { value: "milk", icon: "🥛", title: "С молоком", text: "Мягко, сливочно, уютно" },
      { value: "black", icon: "☕", title: "Чёрный", text: "Хочу чувствовать вкус зерна" },
    ],
  },
  {
    key: "taste",
    question: "Какие вкусы вам ближе?",
    options: [
      { value: "fruit", icon: "🍓", title: "Ягоды и цитрус", text: "Ярко, сочно, с кислинкой" },
      { value: "choco", icon: "🍫", title: "Шоколад и орехи", text: "Сладко, плотно, без кислинки" },
    ],
  },
  {
    key: "temp",
    question: "Горячий или холодный?",
    options: [
      { value: "hot", icon: "🔥", title: "Горячий", text: "Греет в сибирский мороз" },
      { value: "cold", icon: "🧊", title: "Холодный", text: "Освежает летом на набережной" },
    ],
  },
];

const QUIZ_RESULTS = {
  "black-fruit-hot": { id: "v60", reason: "Чистая цветочная чашка на воронке раскроет эфиопское зерно полностью." },
  "black-fruit-cold": { id: "tonic", reason: "Цитрус и пузырьки тоника отлично подчёркивают яркий эспрессо." },
  "black-choco-hot": { id: "espresso", reason: "Наш бленд с нотами какао и ореха — концентрат того, что вы любите." },
  "black-choco-cold": { id: "coldbrew", reason: "18 часов настаивания дают мягкий шоколадный вкус без горечи." },
  "milk-fruit-hot": { id: "flatwhite", reason: "Эфиопский эспрессо с ягодными нотами и совсем немного молока." },
  "milk-fruit-cold": { id: "icelatte", reason: "Холодное молоко смягчает кислинку, а вкус остаётся живым." },
  "milk-choco-hot": { id: "raf", reason: "Сливки и сибирский кедровый орех — самый уютный напиток в меню." },
  "milk-choco-cold": { id: "icelatte", reason: "Карамельно-ореховый айс латте — то, что нужно в жаркий день." },
};

const CATEGORY_NAMES = { espresso: "Эспрессо", filter: "Альтернатива", cold: "Холодное", food: "Десерты" };

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const formatPrice = (value) => `${value.toLocaleString("ru-RU")} ₽`;
const findItem = (id) => MENU.find((item) => item.id === id);
const photoOf = (item) => `images/${item.id}.jpg`;

/* ---------- Шапка и мобильное меню ---------- */

const header = $("#header");
const nav = $("#nav");
const burger = $("#burger");

window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 40);
}, { passive: true });

burger.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  burger.classList.toggle("is-open", open);
  document.body.classList.toggle("no-scroll", open);
});

$$("a", nav).forEach((link) => link.addEventListener("click", () => {
  nav.classList.remove("is-open");
  burger.classList.remove("is-open");
  document.body.classList.remove("no-scroll");
}));

/* ---------- Появление при прокрутке ---------- */

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("is-visible");
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

$$(".reveal").forEach((el) => {
  const siblings = $$(":scope > .reveal", el.parentElement);
  el.style.setProperty("--delay", `${siblings.indexOf(el) * 0.1}s`);
  revealObserver.observe(el);
});

/* ---------- Счётчики ---------- */

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    animateCounter(entry.target);
    counterObserver.unobserve(entry.target);
  });
}, { threshold: 0.6 });

$$("[data-count]").forEach((el) => counterObserver.observe(el));

function animateCounter(el) {
  const target = Number(el.dataset.count);
  const suffix = el.dataset.suffix || "";
  const duration = reduceMotion ? 0 : 1600;
  const start = performance.now();

  const tick = (now) => {
    const progress = duration ? Math.min((now - start) / duration, 1) : 1;
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * eased).toLocaleString("ru-RU") + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* ---------- Параллакс ---------- */

const parallaxEls = $$("[data-parallax]");
let parallaxTicking = false;

function updateParallax() {
  const y = window.scrollY;
  parallaxEls.forEach((el) => {
    el.style.setProperty("--py", `${y * Number(el.dataset.parallax)}px`);
  });
  parallaxTicking = false;
}

if (!reduceMotion) {
  window.addEventListener("scroll", () => {
    const heroVisible = window.scrollY < window.innerHeight * 1.2;
    if (heroVisible && !parallaxTicking) {
      parallaxTicking = true;
      requestAnimationFrame(updateParallax);
    }
  }, { passive: true });
}

/* ---------- Таймер обжарки ---------- */

function updateRoastTimer() {
  const now = new Date();
  const next = new Date(now);
  const daysUntilThursday = (4 - now.getDay() + 7) % 7;
  next.setDate(now.getDate() + daysUntilThursday);
  next.setHours(10, 0, 0, 0);
  if (next <= now) next.setDate(next.getDate() + 7);

  const diff = next - now;
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const parts = days ? `${days} д ${hours} ч` : `${hours} ч ${minutes} мин`;
  $("#roastTimer").textContent = `через ${parts}`;
}

updateRoastTimer();
setInterval(updateRoastTimer, 30000);

/* ---------- Меню ---------- */

const menuGrid = $("#menuGrid");

function renderMenu(filter = "all") {
  const items = filter === "all" ? MENU : MENU.filter((item) => item.cat === filter);
  menuGrid.innerHTML = items.map((item, i) => `
    <article class="item" style="--i: ${i}">
      ${item.tag ? `<span class="item__tag">${item.tag}</span>` : ""}
      <div class="item__visual"><img src="${photoOf(item)}" alt="${item.name}" loading="lazy" width="1024" height="768"></div>
      <h3>${item.name}</h3>
      <p class="item__desc">${item.desc}</p>
      <div class="item__notes">${item.notes.map((note) => `<span>${note}</span>`).join("")}</div>
      <div class="item__bottom">
        <span class="item__price">${formatPrice(item.price)}</span>
        <button class="add-btn" data-add="${item.id}" aria-label="Добавить ${item.name} в заказ">+ В заказ</button>
      </div>
    </article>
  `).join("");
}

$("#filters").addEventListener("click", (event) => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;
  $$(".filter").forEach((b) => b.classList.toggle("is-active", b === button));
  renderMenu(button.dataset.filter);
});

const canHover = window.matchMedia("(hover: hover)").matches;

if (canHover && !reduceMotion) {
  menuGrid.addEventListener("mousemove", (event) => {
    const card = event.target.closest(".item");
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) translateY(-4px)`;
  });

  menuGrid.addEventListener("mouseout", (event) => {
    const card = event.target.closest(".item");
    if (card && !card.contains(event.relatedTarget)) card.style.transform = "";
  });
}

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-add]");
  if (!button) return;
  addToCart(button.dataset.add, button);
});

renderMenu();

/* ---------- Корзина ---------- */

const CART_KEY = "stolby-cart";
let cart = loadCart();

const cartEl = $("#cart");
const overlay = $("#overlay");
const cartBtn = $("#cartBtn");
const cartForm = $("#cartForm");
const cartSuccess = $("#cartSuccess");

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_KEY));
    return Array.isArray(saved) ? saved.filter((row) => findItem(row.id)) : [];
  } catch {
    return [];
  }
}

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function cartTotal() {
  return cart.reduce((sum, row) => sum + findItem(row.id).price * row.qty, 0);
}

function renderCart() {
  const count = cart.reduce((sum, row) => sum + row.qty, 0);
  const countEl = $("#cartCount");
  countEl.textContent = count;
  countEl.classList.toggle("is-visible", count > 0);

  $("#cartItems").innerHTML = cart.length
    ? cart.map((row) => {
      const item = findItem(row.id);
      return `
        <div class="cart-row">
          <img class="cart-row__photo" src="${photoOf(item)}" alt="">
          <div>
            <div class="cart-row__name">${item.name}</div>
            <div class="cart-row__price">${formatPrice(item.price)} · ${CATEGORY_NAMES[item.cat]}</div>
          </div>
          <div class="qty">
            <button data-qty="${row.id}" data-delta="-1" aria-label="Меньше">−</button>
            <span>${row.qty}</span>
            <button data-qty="${row.id}" data-delta="1" aria-label="Больше">+</button>
          </div>
        </div>`;
    }).join("")
    : `<div class="cart__empty"><b>☕</b>Пока пусто. Добавьте что-нибудь из меню.</div>`;

  $("#cartTotal").textContent = formatPrice(cartTotal());
  $("#cartSubmit").disabled = cart.length === 0;
}

function addToCart(id, sourceEl) {
  const row = cart.find((r) => r.id === id);
  if (row) row.qty += 1;
  else cart.push({ id, qty: 1 });
  saveCart();
  renderCart();
  flyToCart(sourceEl);
  showToast(`${findItem(id).name} — в заказе`);
}

function changeQty(id, delta) {
  const row = cart.find((r) => r.id === id);
  if (!row) return;
  row.qty += delta;
  if (row.qty <= 0) cart = cart.filter((r) => r.id !== id);
  saveCart();
  renderCart();
}

$("#cartItems").addEventListener("click", (event) => {
  const button = event.target.closest("[data-qty]");
  if (button) changeQty(button.dataset.qty, Number(button.dataset.delta));
});

function flyToCart(sourceEl) {
  const bump = () => {
    cartBtn.classList.remove("is-bump");
    void cartBtn.offsetWidth;
    cartBtn.classList.add("is-bump");
  };

  if (!sourceEl || reduceMotion) return bump();

  const from = sourceEl.getBoundingClientRect();
  const to = cartBtn.getBoundingClientRect();
  const dot = document.createElement("div");
  dot.className = "fly-dot";
  dot.style.left = `${from.left + from.width / 2 - 9}px`;
  dot.style.top = `${from.top + from.height / 2 - 9}px`;
  document.body.appendChild(dot);

  const dx = to.left + to.width / 2 - (from.left + from.width / 2);
  const dy = to.top + to.height / 2 - (from.top + from.height / 2);

  dot.animate([
    { transform: "translate(0, 0) scale(1)", opacity: 1 },
    { transform: `translate(${dx * 0.5}px, ${dy - 120}px) scale(1.3)`, opacity: 1, offset: 0.5 },
    { transform: `translate(${dx}px, ${dy}px) scale(.4)`, opacity: 0.6 },
  ], { duration: 750, easing: "cubic-bezier(.5, 0, .5, 1)" }).onfinish = () => {
    dot.remove();
    bump();
  };
}

function openCart() {
  cartEl.classList.add("is-open");
  overlay.classList.add("is-open");
  document.body.classList.add("no-scroll");
}

function closeCart() {
  cartEl.classList.remove("is-open");
  overlay.classList.remove("is-open");
  document.body.classList.remove("no-scroll");
}

cartBtn.addEventListener("click", openCart);
$("#cartClose").addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeCart();
});

const phoneInput = cartForm.elements.phone;
phoneInput.addEventListener("input", () => {
  let digits = phoneInput.value.replace(/\D/g, "");
  if (digits.startsWith("8")) digits = "7" + digits.slice(1);
  if (!digits.startsWith("7")) digits = "7" + digits;
  digits = digits.slice(0, 11);
  const d = digits.slice(1);
  let result = "+7";
  if (d.length) result += ` (${d.slice(0, 3)}`;
  if (d.length >= 3) result += ")";
  if (d.length > 3) result += ` ${d.slice(3, 6)}`;
  if (d.length > 6) result += `-${d.slice(6, 8)}`;
  if (d.length > 8) result += `-${d.slice(8, 10)}`;
  phoneInput.value = result;
});

cartForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!cart.length) return;

  if (phoneInput.value.replace(/\D/g, "").length !== 11) {
    phoneInput.focus();
    showToast("Проверьте номер телефона");
    return;
  }

  const data = new FormData(cartForm);
  const readyAt = new Date(Date.now() + Number(data.get("time")) * 60000);
  const readyTime = readyAt.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
  const orderNumber = Math.floor(100 + Math.random() * 900);
  const total = cartTotal();

  cart = [];
  saveCart();
  renderCart();

  $("#cartItems").hidden = true;
  cartForm.hidden = true;
  cartSuccess.hidden = false;
  cartSuccess.innerHTML = `
    <b>✓</b>
    <h4>Заказ №${orderNumber} принят</h4>
    <p>${data.get("name")}, будет готов к ${readyTime}</p>
    <p>${data.get("spot")} · ${formatPrice(total)}</p>
    <p><small>Это демо: заказ никуда не отправлен.</small></p>
    <button class="btn btn--ghost" id="newOrder">Новый заказ</button>
  `;

  $("#newOrder").addEventListener("click", () => {
    cartSuccess.hidden = true;
    $("#cartItems").hidden = false;
    cartForm.hidden = false;
    cartForm.reset();
    closeCart();
  });
});

renderCart();

/* ---------- Уведомление ---------- */

let toastTimer;

function showToast(text) {
  const toast = $("#toast");
  toast.textContent = text;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2200);
}

/* ---------- Квиз ---------- */

const quizBody = $("#quizBody");
const quizProgress = $("#quizProgress");
let quizAnswers = {};

function renderQuizStep(index) {
  quizProgress.style.width = `${(index / QUIZ.length) * 100}%`;

  if (index >= QUIZ.length) return renderQuizResult();

  const step = QUIZ[index];
  quizBody.innerHTML = `
    <div class="quiz__step">
      <h3 class="quiz__question">${index + 1}/${QUIZ.length}. ${step.question}</h3>
      <div class="quiz__options">
        ${step.options.map((option) => `
          <button class="quiz__option" data-value="${option.value}">
            <b>${option.icon}</b>
            ${option.title}<br>
            <span>${option.text}</span>
          </button>
        `).join("")}
      </div>
    </div>
  `;

  $$(".quiz__option", quizBody).forEach((button) => {
    button.addEventListener("click", () => {
      quizAnswers[step.key] = button.dataset.value;
      renderQuizStep(index + 1);
    });
  });
}

function renderQuizResult() {
  const key = `${quizAnswers.milk}-${quizAnswers.taste}-${quizAnswers.temp}`;
  const result = QUIZ_RESULTS[key];
  const item = findItem(result.id);

  quizBody.innerHTML = `
    <div class="quiz__step quiz__result">
      <img class="quiz__result-visual" src="${photoOf(item)}" alt="${item.name}">
      <div>
        <p class="eyebrow">Ваш напиток</p>
        <h3>${item.name} · ${formatPrice(item.price)}</h3>
        <p>${result.reason}</p>
        <div class="quiz__result-actions">
          <button class="btn btn--primary" data-add="${item.id}">Добавить в заказ</button>
          <button class="btn btn--ghost" id="quizRestart">Пройти ещё раз</button>
        </div>
      </div>
    </div>
  `;

  $("#quizRestart").addEventListener("click", () => {
    quizAnswers = {};
    renderQuizStep(0);
  });
}

renderQuizStep(0);
