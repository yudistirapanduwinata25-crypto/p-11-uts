
"use strict";

// ==================================================
// 1. DATA PRODUK VELORA - 30 PRODUK
// Setiap produk memiliki URL gambar berbeda
// ==================================================

const products = [
  { id: 1, name: "Velocity Red", category: "Running", price: 850000, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700", tag: "BEST SELLER" },
  { id: 2, name: "Cloud Essential", category: "Lifestyle", price: 720000, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=700", tag: "POPULAR" },
  { id: 3, name: "Urban Motion", category: "Casual", price: 790000, image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=700", tag: "NEW" },
  { id: 4, name: "Sport Runner", category: "Running", price: 920000, image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=700", tag: "NEW" },
  { id: 5, name: "Court Legend", category: "Basket", price: 1100000, image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=700", tag: "PREMIUM" },
  { id: 6, name: "Daily Comfort", category: "Casual", price: 580000, image: "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?w=700", tag: "SALE" },
  { id: 7, name: "Modern Classic", category: "Lifestyle", price: 780000, image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=700", tag: "POPULAR" },
  { id: 8, name: "Power Dunk", category: "Basket", price: 1250000, image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=700", tag: "LIMITED" },
  { id: 9, name: "Air Flex Pro", category: "Running", price: 990000, image: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=700", tag: "NEW" },
  { id: 10, name: "Classic Leather", category: "Formal", price: 1150000, image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=700", tag: "PREMIUM" },

  { id: 11, name: "Street Walker", category: "Casual", price: 690000, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=701", tag: "POPULAR" },
  { id: 12, name: "Urban High", category: "Basket", price: 1350000, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=702", tag: "EXCLUSIVE" },
  { id: 13, name: "Speed Runner", category: "Running", price: 890000, image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=703", tag: "NEW" },
  { id: 14, name: "White Minimal", category: "Lifestyle", price: 750000, image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=704", tag: "POPULAR" },
  { id: 15, name: "Black Street", category: "Casual", price: 820000, image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=705", tag: "BEST SELLER" },
  { id: 16, name: "Basket Pro X", category: "Basket", price: 1450000, image: "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=706", tag: "PREMIUM" },
  { id: 17, name: "Flex Runner", category: "Running", price: 950000, image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=707", tag: "NEW" },
  { id: 18, name: "Classic Brown", category: "Formal", price: 1200000, image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=708", tag: "PREMIUM" },
  { id: 19, name: "Daily Walk", category: "Casual", price: 620000, image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=709", tag: "SALE" },
  { id: 20, name: "Comfort Max", category: "Lifestyle", price: 880000, image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=710", tag: "POPULAR" },

  { id: 21, name: "Jump Force", category: "Basket", price: 1300000, image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=711", tag: "LIMITED" },
  { id: 22, name: "Runner Elite", category: "Running", price: 1050000, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=712", tag: "PREMIUM" },
  { id: 23, name: "Canvas Basic", category: "Casual", price: 550000, image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=713", tag: "SALE" },
  { id: 24, name: "Office Style", category: "Formal", price: 980000, image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=714", tag: "NEW" },
  { id: 25, name: "Street Legend", category: "Lifestyle", price: 830000, image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=715", tag: "POPULAR" },
  { id: 26, name: "Power Court", category: "Basket", price: 1550000, image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=716", tag: "EXCLUSIVE" },
  { id: 27, name: "Run Active", category: "Running", price: 780000, image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=717", tag: "NEW" },
  { id: 28, name: "Elegant Step", category: "Formal", price: 1250000, image: "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=718", tag: "PREMIUM" },
  { id: 29, name: "Weekend Casual", category: "Casual", price: 670000, image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=719", tag: "POPULAR" },
  { id: 30, name: "Future Motion", category: "Lifestyle", price: 920000, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=720", tag: "NEW" }
];


// ==================================================
// 2. FORMAT HARGA
// ==================================================

function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(number);
}


// ==================================================
// 3. NOTIFIKASI
// ==================================================

let toastTimer;

function showToast(message) {
  const toast = document.getElementById("toast");

  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}


// ==================================================
// 4. NAVIGASI ANTAR HALAMAN
// ==================================================

const pageNames = [
  "home",
  "koleksi",
  "tentang",
  "kontak",
  "keranjang",
  "checkout"
];

function navigateTo(page) {
  if (!pageNames.includes(page)) return;

  if (page === "checkout" && cart.length === 0) {
    showToast("Keranjang masih kosong!");
    return;
  }

  if (location.hash !== "#" + page) {
    history.pushState(null, "", "#" + page);
  }

  showPage(page);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showPage(page) {
  document.querySelectorAll(".page").forEach(section => {
    section.classList.remove("active");
  });

  const target = document.getElementById(page);

  if (target) target.classList.add("active");

  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === "#" + page
    );
  });

  const nav = document.querySelector(".nav");

  if (nav) nav.classList.remove("open");

  if (page === "keranjang") renderCart();
  if (page === "checkout") renderCheckout();
}

function handleNavigation() {
  let page = location.hash.replace("#", "") || "home";

  if (!pageNames.includes(page)) page = "home";

  showPage(page);
}

window.addEventListener("hashchange", handleNavigation);
window.addEventListener("popstate", handleNavigation);

document.addEventListener("click", event => {
  const link = event.target.closest('a[href^="#"]');

  if (!link) return;

  const page = link.getAttribute("href").replace("#", "");

  if (pageNames.includes(page)) {
    event.preventDefault();
    navigateTo(page);
  }
});


// ==================================================
// 5. MENU MOBILE
// ==================================================

const menuToggle = document.getElementById("menuToggle");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    document.querySelector(".nav").classList.toggle("open");
  });
}


// ==================================================
// 6. SLIDER HOME
// ==================================================

const slides = [
  {
    image: products[0].image,
    title: "Velocity Red"
  },
  {
    image: products[1].image,
    title: "Cloud Essential"
  },
  {
    image: products[2].image,
    title: "Urban Motion"
  }
];

let currentSlide = 0;

function showSlide(index) {
  currentSlide = (index + slides.length) % slides.length;

  const image = document.getElementById("heroImage");
  const title = document.querySelector(".hero-label h3");

  if (image) image.src = slides[currentSlide].image;
  if (title) title.textContent = slides[currentSlide].title;

  document.querySelectorAll("#sliderDots button").forEach((dot, i) => {
    dot.classList.toggle("active", i === currentSlide);
  });
}

function changeSlide(direction) {
  showSlide(currentSlide + direction);
}

function createDots() {
  const container = document.getElementById("sliderDots");

  if (!container) return;

  container.innerHTML = slides.map((slide, index) => `
    <button
      class="${index === 0 ? "active" : ""}"
      onclick="showSlide(${index})"
      aria-label="Slide ${index + 1}">
    </button>
  `).join("");
}

createDots();

setInterval(() => {
  const home = document.getElementById("home");

  if (home && home.classList.contains("active")) {
    changeSlide(1);
  }
}, 5000);


// ==================================================
// 7. KARTU PRODUK
// ==================================================

function productCard(product) {
  return `
    <article class="product-card">
      <div class="product-image">
        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
          onerror="this.onerror=null;this.src='https://placehold.co/600x500/f0eee8/101b2b?text=VELORA';">

        <span class="product-tag">${product.tag}</span>
      </div>

      <div class="product-info">
        <p class="product-category">${product.category}</p>
        <h3>${product.name}</h3>
        <p class="product-price">${formatRupiah(product.price)}</p>

        <button class="add-cart" onclick="addToCart(${product.id})">
          + Tambah ke Keranjang
        </button>
      </div>
    </article>
  `;
}


// ==================================================
// 8. PRODUK PILIHAN DI HOME
// ==================================================

function renderFeatured() {
  const container = document.getElementById("featuredProducts");

  if (!container) return;

  container.innerHTML = products
    .slice(0, 4)
    .map(productCard)
    .join("");
}

renderFeatured();


// ==================================================
// 9. PENCARIAN DAN KATEGORI PRODUK
// ==================================================

let selectedCategory = "Semua";

function renderProducts() {
  const container = document.getElementById("allProducts");

  if (!container) return;

  const searchInput = document.getElementById("searchInput");
  const sortSelect = document.getElementById("sortSelect");

  const search = searchInput.value.toLowerCase();
  const sort = sortSelect.value;

  let filtered = products.filter(product => {
    const matchName = product.name.toLowerCase().includes(search);

    const matchCategory =
      selectedCategory === "Semua" ||
      product.category === selectedCategory;

    return matchName && matchCategory;
  });

  if (sort === "low") {
    filtered.sort((a, b) => a.price - b.price);
  }

  if (sort === "high") {
    filtered.sort((a, b) => b.price - a.price);
  }

  if (sort === "name") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  document.getElementById("resultCount").textContent =
    `${filtered.length} produk ditemukan`;

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <h3>Produk Tidak Ditemukan</h3>
        <p>Coba kata kunci atau kategori lainnya.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(productCard).join("");
}

document.getElementById("searchInput")
  .addEventListener("input", renderProducts);

document.getElementById("sortSelect")
  .addEventListener("change", renderProducts);

document.querySelectorAll(".category-btn").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".category-btn").forEach(item => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    selectedCategory = button.dataset.category;

    renderProducts();
  });
});

renderProducts();


// ==================================================
// 10. DATA KERANJANG
// ==================================================

let cart = [];

try {
  cart = JSON.parse(localStorage.getItem("veloraCart")) || [];
} catch (error) {
  cart = [];
}

function saveCart() {
  localStorage.setItem("veloraCart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const countElement = document.getElementById("cartCount");

  if (!countElement) return;

  const count = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  countElement.textContent = count;
}

function addToCart(id) {
  const product = products.find(item => item.id === id);

  if (!product) return;

  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }

  saveCart();

  showToast(product.name + " berhasil ditambahkan!");
}

function changeQuantity(id, amount) {
  const item = cart.find(product => product.id === id);

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter(product => product.id !== id);
  }

  saveCart();
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);

  saveCart();
  renderCart();

  showToast("Produk berhasil dihapus!");
}

function getCartTotal() {
  return cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
}


// ==================================================
// 11. TAMPILAN KERANJANG
// ==================================================

function renderCart() {
  const container = document.getElementById("cartItems");

  if (!container) return;

  document.getElementById("cartTotal").textContent =
    formatRupiah(getCartTotal());

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <h3>Keranjang Masih Kosong</h3>
        <p>Yuk, pilih sepatu favoritmu di koleksi VELORA.</p>

        <button class="btn-primary" onclick="navigateTo('koleksi')">
          Lihat Koleksi
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-row">
      <img src="${item.image}" alt="${item.name}">

      <div class="cart-product">
        <h4>${item.name}</h4>
        <p>${formatRupiah(item.price)}</p>
      </div>

      <div class="quantity">
        <button onclick="changeQuantity(${item.id}, -1)">−</button>
        <span>${item.quantity}</span>
        <button onclick="changeQuantity(${item.id}, 1)">+</button>
      </div>

      <button class="remove-btn" onclick="removeFromCart(${item.id})">
        Hapus
      </button>
    </div>
  `).join("");
}


// ==================================================
// 12. CHECKOUT
// ==================================================

function openCheckout() {
  if (cart.length === 0) {
    showToast("Keranjang masih kosong!");
    return;
  }

  navigateTo("checkout");
}

function renderCheckout() {
  const container = document.getElementById("checkoutItems");

  if (!container) return;

  container.innerHTML = cart.map(item => `
    <div class="checkout-item">
      <span>${item.name} × ${item.quantity}</span>
      <strong>${formatRupiah(item.price * item.quantity)}</strong>
    </div>
  `).join("");

  document.getElementById("checkoutTotal").textContent =
    formatRupiah(getCartTotal());
}


// ==================================================
// 13. MODAL PEMBELIAN BERHASIL
// ==================================================

function createSuccessModal() {
  if (document.getElementById("successModal")) return;

  const modal = document.createElement("div");

  modal.id = "successModal";

  modal.innerHTML = `
    <div class="success-card">
      <div class="success-icon">✓</div>

      <h2>Pembelian Berhasil!</h2>

      <p class="success-message">
        Terima kasih sudah berbelanja di VELORA.
        Pesanan kamu berhasil dibuat.
      </p>

      <div class="success-details" id="successDetails"></div>

      <button class="btn-primary" id="successClose">
        Kembali ke Beranda
      </button>
    </div>
  `;

  document.body.appendChild(modal);

  document.getElementById("successClose").addEventListener("click", () => {
    modal.classList.remove("show");
    navigateTo("home");
  });
}

function showPurchaseSuccess(order) {
  createSuccessModal();

  const details = document.getElementById("successDetails");

  const rows = [
    ["Nomor Pesanan", order.orderNumber],
    ["Nama", order.name],
    ["Jumlah Produk", order.totalItems + " item"],
    ["Total Pembayaran", formatRupiah(order.total)],
    ["Alamat", order.address]
  ];

  details.replaceChildren();

  rows.forEach(([label, value]) => {
    const paragraph = document.createElement("p");
    const strong = document.createElement("strong");

    strong.textContent = label + ": ";

    paragraph.appendChild(strong);
    paragraph.appendChild(document.createTextNode(value));

    details.appendChild(paragraph);
  });

  document.getElementById("successModal").classList.add("show");
}


// ==================================================
// 14. PROSES PEMBELIAN
// Tidak membuka WhatsApp
// ==================================================

document.getElementById("checkoutForm")
  .addEventListener("submit", function(event) {
    event.preventDefault();

    if (cart.length === 0) {
      showToast("Keranjang masih kosong!");
      navigateTo("koleksi");
      return;
    }

    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const address = document.getElementById("customerAddress").value.trim();
    const note = document.getElementById("customerNote").value.trim();

    if (!name || !phone || !address) {
      showToast("Lengkapi data pemesanan terlebih dahulu!");
      return;
    }

    const totalItems = cart.reduce(
      (total, item) => total + item.quantity,
      0
    );

    const order = {
      orderNumber: "VLR-" + Date.now().toString().slice(-8),
      name,
      phone,
      address,
      note,
      totalItems,
      total: getCartTotal(),
      products: cart.map(item => ({ ...item })),
      date: new Date().toLocaleString("id-ID")
    };

    // Simpan riwayat pembelian
    let orderHistory = [];

    try {
      orderHistory =
        JSON.parse(localStorage.getItem("veloraOrders")) || [];
    } catch (error) {
      orderHistory = [];
    }

    orderHistory.push(order);

    localStorage.setItem(
      "veloraOrders",
      JSON.stringify(orderHistory)
    );

    // Kosongkan keranjang
    cart = [];
    saveCart();

    // Reset form
    this.reset();

    // Tampilkan notifikasi sukses
    showPurchaseSuccess(order);
  });


// ==================================================
// 15. FORM KONTAK
// ==================================================

document.getElementById("contactForm")
  .addEventListener("submit", function(event) {
    event.preventDefault();

    this.reset();

    showToast("Terima kasih! Pesan berhasil dicatat.");
  });


// ==================================================
// 16. STYLE NOTIFIKASI PEMBELIAN
// ==================================================

const successStyle = document.createElement("style");

successStyle.textContent = `
  #successModal {
    display: none;
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgba(5, 13, 25, .82);
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  #successModal.show {
    display: flex;
    animation: successFade .25s ease;
  }

  .success-card {
    background: #fff;
    width: 100%;
    max-width: 440px;
    padding: 35px;
    text-align: center;
    border-radius: 8px;
    box-shadow: 0 20px 60px #0004;
    max-height: 90vh;
    overflow-y: auto;
  }

  .success-icon {
    width: 72px;
    height: 72px;
    margin: 0 auto 20px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: #e5f5eb;
    color: #23834a;
    font-size: 38px;
    font-weight: bold;
  }

  .success-card h2 {
    color: #101b2b;
    font-family: 'Playfair Display', serif;
    margin-bottom: 12px;
  }

  .success-message {
    color: #777f89;
    line-height: 1.7;
    font-size: 13px;
    margin-bottom: 22px;
  }

  .success-details {
    background: #f7f5f0;
    text-align: left;
    padding: 18px;
    margin-bottom: 22px;
    border-radius: 5px;
  }

  .success-details p {
    font-size: 12px;
    line-height: 1.9;
    color: #424b57;
    overflow-wrap: anywhere;
  }

  .success-card .btn-primary {
    width: 100%;
  }

  @keyframes successFade {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

document.head.appendChild(successStyle);


// ==================================================
// 17. INISIALISASI
// ==================================================

updateCartCount();
handleNavigation();
