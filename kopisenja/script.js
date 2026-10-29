
document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    // ==========================================
    // DATA PRODUK
    // ==========================================

    const products = [
        {
            id: "senja-latte",
            name: "Senja Latte",
            category: "Coffee",
            price: 22000,
            description: "Espresso, susu creamy, dan manis gula aren.",
            image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80",
            tag: "BEST SELLER"
        },
        {
            id: "velvet-cappuccino",
            name: "Velvet Cappuccino",
            category: "Coffee",
            price: 25000,
            description: "Espresso dengan foam susu yang lembut.",
            image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80",
            tag: "BARISTA PICK"
        },
        {
            id: "midnight-americano",
            name: "Midnight Americano",
            category: "Coffee",
            price: 18000,
            description: "Kopi hitam dengan karakter rasa yang bersih.",
            image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80",
            tag: "CLASSIC"
        },
        {
            id: "caramel-macchiato",
            name: "Caramel Macchiato",
            category: "Coffee",
            price: 27000,
            description: "Espresso, susu, dan sentuhan karamel.",
            image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80",
            tag: "FAVORITE"
        },
        {
            id: "mocha-cloud",
            name: "Mocha Cloud",
            category: "Coffee",
            price: 26000,
            description: "Perpaduan espresso dan cokelat yang kaya.",
            image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=800&q=80",
            tag: "RICH TASTE"
        },
        {
            id: "vanilla-milk",
            name: "Vanilla Milk",
            category: "Non-Coffee",
            price: 21000,
            description: "Susu creamy dengan aroma vanila lembut.",
            image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80",
            tag: "CREAMY"
        },
        
        {
            id: "chocolate-velvet",
            name: "Chocolate Velvet",
            category: "Non-Coffee",
            price: 23000,
            description: "Cokelat dengan rasa pekat dan tekstur lembut.",
            image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
            tag: "CHOCOLATE"
        },

        {
            id: "matcha-latte",
            name: "Matcha Latte",
            category: "Non-Coffee",
            price: 25000,
            description: "Matcha dengan susu untuk rasa earthy dan creamy.",
            image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=800&q=80",
            tag: "GREEN BLEND"
        },
        {
            id: "senja-tea",
            name: "Senja Tea",
            category: "Tea",
            price: 16000,
            description: "Teh aromatik yang ringan dan menyegarkan.",
            image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80",
            tag: "REFRESHING"
        }
    ];

    // Keranjang menyimpan jumlah setiap produk.
    const cart = {};

    let selectedCategory = "Semua";
    let searchKeyword = "";
    let orderNumber = 0;

    // ==========================================
    // AMBIL ELEMEN HTML
    // ==========================================

    const menuGrid = document.getElementById("menu-grid");
    const categoryList = document.getElementById("category-list");
    const menuSearch = document.getElementById("menu-search");

    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");
    const cartCountLabel = document.getElementById("cart-count-label");

    const checkoutBtn = document.getElementById("checkout-btn");
    const checkoutOverlay = document.getElementById("checkout-overlay");
    const checkoutForm = document.getElementById("checkout-form");
    const checkoutSummary = document.getElementById("checkout-summary-items");
    const checkoutTotal = document.getElementById("checkout-total");
    const closeCheckout = document.getElementById("close-checkout");

    const receiptOverlay = document.getElementById("receipt-overlay");
    const receiptDetails = document.getElementById("receipt-details");
    const finishOrder = document.getElementById("finish-order");
    const printReceipt = document.getElementById("print-receipt");

    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    const goToCart = document.getElementById("go-to-cart");

    // ==========================================
    // FORMAT HARGA
    // ==========================================

    function formatRupiah(amount) {
        return "Rp " + Number(amount).toLocaleString("id-ID");
    }

    // ==========================================
    // NAVIGASI ANTARHALAMAN
    // ==========================================

    function showSlide(slideId) {
        const target = document.getElementById(slideId);

        if (!target || !target.classList.contains("slide")) {
            return;
        }

        document.querySelectorAll(".slide").forEach(function (slide) {
            slide.classList.remove("active");
        });

        target.classList.add("active");

        document.querySelectorAll(".nav-menu .nav-link").forEach(function (link) {
            link.classList.toggle(
                "active",
                link.getAttribute("href") === "#" + slideId
            );
        });

        if (navMenu) {
            navMenu.classList.remove("open");
        }

        if (menuToggle) {
            menuToggle.setAttribute("aria-expanded", "false");
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    document.querySelectorAll(".nav-link").forEach(function (link) {
        link.addEventListener("click", function (event) {
            const href = link.getAttribute("href");

            if (href && href.startsWith("#")) {
                const target = document.querySelector(href);

                if (target && target.classList.contains("slide")) {
                    event.preventDefault();
                    showSlide(href.substring(1));
                }
            }
        });
    });

    // Tombol yang berpindah ke slide atau bagian tertentu.
    document.querySelectorAll("[data-goto]").forEach(function (button) {
        button.addEventListener("click", function () {
            const targetId = button.dataset.goto;
            const target = document.getElementById(targetId);

            if (target && target.classList.contains("slide")) {
                showSlide(targetId);
            }
        });
    });

    // Navigasi mobile.
    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", function () {
            const isOpen = navMenu.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.textContent = isOpen ? "×" : "☰";
        });
    }

    // Buka bagian keranjang.
    if (goToCart) {
        goToCart.addEventListener("click", function () {
            const cartSection = document.getElementById("keranjang");

            if (cartSection) {
                cartSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    }

    // ==========================================
    // TAMPILKAN MENU PRODUK
    // ==========================================

    function renderMenu() {
        if (!menuGrid) return;

        menuGrid.innerHTML = "";

        const filteredProducts = products.filter(function (product) {
            const categoryMatch =
                selectedCategory === "Semua" ||
                product.category === selectedCategory;

            const keyword = searchKeyword.toLowerCase();

            const searchMatch =
                product.name.toLowerCase().includes(keyword) ||
                product.description.toLowerCase().includes(keyword) ||
                product.category.toLowerCase().includes(keyword);

            return categoryMatch && searchMatch;
        });

        if (filteredProducts.length === 0) {
            const message = document.createElement("div");
            message.className = "no-results";
            message.textContent =
                "Menu tidak ditemukan. Coba kata kunci yang berbeda.";

            menuGrid.appendChild(message);
            return;
        }

        filteredProducts.forEach(function (product) {
            const card = document.createElement("article");
            card.className = "menu-card";

            const imageWrap = document.createElement("div");
            imageWrap.className = "menu-image-wrap";

            const image = document.createElement("img");
            image.className = "menu-image";
            image.src = product.image;
            image.alt = product.name;
            image.loading = "lazy";

            const tag = document.createElement("span");
            tag.className = "menu-tag";
            tag.textContent = product.tag;

            imageWrap.appendChild(image);
            imageWrap.appendChild(tag);

            const body = document.createElement("div");
            body.className = "menu-card-body";

            const category = document.createElement("span");
            category.className = "menu-category-label";
            category.textContent = product.category;

            const title = document.createElement("h3");
            title.textContent = product.name;

            const description = document.createElement("p");
            description.className = "menu-description";
            description.textContent = product.description;

            const bottom = document.createElement("div");
            bottom.className = "menu-card-bottom";

            const price = document.createElement("strong");
            price.className = "menu-price";
            price.textContent = formatRupiah(product.price);

            const addButton = document.createElement("button");
            addButton.type = "button";
            addButton.className = "add-to-cart";
            addButton.dataset.productId = product.id;
            addButton.textContent = "+ Tambah";

            bottom.appendChild(price);
            bottom.appendChild(addButton);

            body.appendChild(category);
            body.appendChild(title);
            body.appendChild(description);
            body.appendChild(bottom);

            card.appendChild(imageWrap);
            card.appendChild(body);

            menuGrid.appendChild(card);
        });
    }

    // ==========================================
    // FILTER KATEGORI
    // ==========================================

    if (categoryList) {
        categoryList.addEventListener("click", function (event) {
            const button = event.target.closest(".category-btn");

            if (!button) return;

            selectedCategory = button.dataset.category;

            categoryList.querySelectorAll(".category-btn").forEach(function (item) {
                item.classList.toggle("active", item === button);
            });

            renderMenu();
        });
    }

    // ==========================================
    // PENCARIAN MENU
    // ==========================================

    if (menuSearch) {
        menuSearch.addEventListener("input", function () {
            searchKeyword = menuSearch.value.trim();
            renderMenu();
        });
    }

    // ==========================================
    // TAMBAH PRODUK KE KERANJANG
    // ==========================================

    if (menuGrid) {
        menuGrid.addEventListener("click", function (event) {
            const button = event.target.closest(".add-to-cart");

            if (!button) return;

            const product = products.find(function (item) {
                return item.id === button.dataset.productId;
            });

            if (!product) {
                alert("Produk tidak ditemukan.");
                return;
            }

            addProduct(product);

            const originalText = button.textContent;
            button.textContent = "Ditambahkan ✓";
            button.disabled = true;

            setTimeout(function () {
                button.textContent = originalText;
                button.disabled = false;
            }, 700);
        });
    }

    function addProduct(product) {
        if (cart[product.id]) {
            cart[product.id].qty += 1;
        } else {
            cart[product.id] = {
                id: product.id,
                name: product.name,
                price: product.price,
                qty: 1
            };
        }

        renderCart();
    }

    // ==========================================
    // RENDER KERANJANG
    // ==========================================

    function renderCart() {
        if (!cartItems || !cartTotal || !cartCount) return;

        cartItems.innerHTML = "";

        const items = Object.values(cart);

        const totalQty = items.reduce(function (sum, item) {
            return sum + item.qty;
        }, 0);

        const totalPrice = items.reduce(function (sum, item) {
            return sum + item.price * item.qty;
        }, 0);

        if (items.length === 0) {
            const empty = document.createElement("p");
            empty.className = "empty-cart";
            empty.textContent =
                "Keranjang masih kosong. Yuk, pilih kopi favoritmu! ☕";

            cartItems.appendChild(empty);
        }

        items.forEach(function (item) {
            const row = document.createElement("div");
            row.className = "cart-item";

            const info = document.createElement("div");
            info.className = "cart-info";

            const name = document.createElement("strong");
            name.textContent = item.name;

            const price = document.createElement("span");
            price.textContent = formatRupiah(item.price) + " / gelas";

            info.appendChild(name);
            info.appendChild(price);

            const quantityControl = document.createElement("div");
            quantityControl.className = "quantity-control";

            const minus = document.createElement("button");
            minus.type = "button";
            minus.className = "qty-btn minus";
            minus.dataset.productId = item.id;
            minus.textContent = "−";
            minus.setAttribute("aria-label", "Kurangi " + item.name);

            const quantity = document.createElement("span");
            quantity.className = "qty-number";
            quantity.textContent = item.qty;

            const plus = document.createElement("button");
            plus.type = "button";
            plus.className = "qty-btn plus";
            plus.dataset.productId = item.id;
            plus.textContent = "+";
            plus.setAttribute("aria-label", "Tambah " + item.name);

            quantityControl.appendChild(minus);
            quantityControl.appendChild(quantity);
            quantityControl.appendChild(plus);

            const subtotal = document.createElement("strong");
            subtotal.className = "subtotal";
            subtotal.textContent = formatRupiah(item.price * item.qty);

            const remove = document.createElement("button");
            remove.type = "button";
            remove.className = "remove-btn";
            remove.dataset.productId = item.id;
            remove.textContent = "×";
            remove.title = "Hapus " + item.name;
            remove.setAttribute("aria-label", "Hapus " + item.name);

            row.appendChild(info);
            row.appendChild(quantityControl);
            row.appendChild(subtotal);
            row.appendChild(remove);

            cartItems.appendChild(row);
        });

        cartCount.textContent = totalQty;

        if (cartCountLabel) {
            cartCountLabel.textContent = totalQty;
        }

        cartTotal.textContent = formatRupiah(totalPrice);

        if (checkoutOverlay && checkoutOverlay.classList.contains("show")) {
            renderCheckoutSummary();
        }
    }

    // ==========================================
    // AKSI TOMBOL +, −, HAPUS
    // ==========================================

    if (cartItems) {
        cartItems.addEventListener("click", function (event) {
            const button = event.target.closest("button");

            if (!button) return;

            const productId = button.dataset.productId;

            if (!productId || !cart[productId]) return;

            if (button.classList.contains("plus")) {
                cart[productId].qty += 1;
            } else if (button.classList.contains("minus")) {
                cart[productId].qty -= 1;

                if (cart[productId].qty <= 0) {
                    delete cart[productId];
                }
            } else if (button.classList.contains("remove-btn")) {
                delete cart[productId];
            } else {
                return;
            }

            renderCart();
        });
    }

    // ==========================================
    // RINGKASAN CHECKOUT
    // ==========================================

    function renderCheckoutSummary() {
        if (!checkoutSummary || !checkoutTotal) return;

        checkoutSummary.innerHTML = "";

        const items = Object.values(cart);
        let total = 0;

        items.forEach(function (item) {
            const subtotal = item.price * item.qty;
            total += subtotal;

            const row = document.createElement("p");
            row.textContent =
                item.name +
                " × " +
                item.qty +
                " — " +
                formatRupiah(subtotal);

            checkoutSummary.appendChild(row);
        });

        checkoutTotal.textContent = formatRupiah(total);
    }

    // ==========================================
    // BUKA CHECKOUT
    // ==========================================

    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", function () {
            if (Object.keys(cart).length === 0) {
                alert("Keranjang masih kosong. Silakan pilih menu dahulu!");
                return;
            }

            renderCheckoutSummary();

            if (checkoutOverlay) {
                checkoutOverlay.classList.add("show");
                document.body.style.overflow = "hidden";
            }
        });
    }

    // ==========================================
    // TUTUP CHECKOUT
    // ==========================================

    function closeCheckoutModal() {
        if (checkoutOverlay) {
            checkoutOverlay.classList.remove("show");
        }

        document.body.style.overflow = "";
    }

    if (closeCheckout) {
        closeCheckout.addEventListener("click", closeCheckoutModal);
    }

    if (checkoutOverlay) {
        checkoutOverlay.addEventListener("click", function (event) {
            if (event.target === checkoutOverlay) {
                closeCheckoutModal();
            }
        });
    }

    // ==========================================
    // BUAT STRUK PESANAN
    // ==========================================

    if (checkoutForm) {
        checkoutForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (Object.keys(cart).length === 0) {
                alert("Keranjang kosong. Silakan pilih menu dahulu!");
                closeCheckoutModal();
                return;
            }

            const customerName =
                document.getElementById("customer-name").value.trim();

            const customerPhone =
                document.getElementById("customer-phone").value.trim();

            const orderNote =
                document.getElementById("order-note").value.trim();

            const paymentMethod =
                document.getElementById("payment-method").value;

            if (!customerName || !customerPhone || !paymentMethod) {
                alert("Mohon lengkapi nama, nomor HP, dan pembayaran.");
                return;
            }

            if (!/^[0-9+\-\s()]{8,20}$/.test(customerPhone)) {
                alert("Nomor HP belum valid. Periksa kembali nomor kamu.");
                return;
            }

            const items = Object.values(cart).map(function (item) {
                return {
                    name: item.name,
                    qty: item.qty,
                    price: item.price,
                    subtotal: item.price * item.qty
                };
            });

            const total = items.reduce(function (sum, item) {
                return sum + item.subtotal;
            }, 0);

            // Nomor demo berdasarkan waktu dan urutan pesanan.
            orderNumber += 1;

            const orderId =
                "KS-" +
                Date.now().toString().slice(-7) +
                String(orderNumber).padStart(2, "0");

            if (!receiptDetails || !receiptOverlay) {
                alert("Bagian struk tidak ditemukan. Periksa index.html.");
                return;
            }

            receiptDetails.innerHTML = "";

            const heading = document.createElement("h3");
            heading.textContent = "KOPI SENJA";
            receiptDetails.appendChild(heading);

            addReceiptLine("Nomor pesanan", orderId);
            addReceiptLine("Nama pelanggan", customerName);
            addReceiptLine("Nomor HP", customerPhone);
            addReceiptLine("Pembayaran", paymentMethod);
            addReceiptLine("Waktu", new Date().toLocaleString("id-ID"));

            const divider = document.createElement("hr");
            receiptDetails.appendChild(divider);

            items.forEach(function (item) {
                addReceiptLine(
                    item.name + " × " + item.qty,
                    formatRupiah(item.subtotal)
                );
            });

            if (orderNote) {
                const noteDivider = document.createElement("hr");
                receiptDetails.appendChild(noteDivider);
                addReceiptLine("Catatan", orderNote);
            }

            const totalDivider = document.createElement("hr");
            receiptDetails.appendChild(totalDivider);

            const totalElement = document.createElement("h3");
            totalElement.className = "receipt-total";
            totalElement.textContent = "Total: " + formatRupiah(total);
            receiptDetails.appendChild(totalElement);

            const footer = document.createElement("p");
            footer.textContent =
                "Terima kasih sudah menikmati KOPI SENJA. Selamat menikmati!";
            receiptDetails.appendChild(footer);

            closeCheckoutModal();
            receiptOverlay.classList.add("show");
            document.body.style.overflow = "hidden";
        });
    }

    function addReceiptLine(label, value) {
        const row = document.createElement("p");

        const strong = document.createElement("strong");
        strong.textContent = label + ": ";

        const text = document.createElement("span");
        text.textContent = value;

        row.appendChild(strong);
        row.appendChild(text);

        receiptDetails.appendChild(row);
    }

    // ==========================================
    // SELESAI PESANAN
    // ==========================================

    function finishCurrentOrder() {
        if (receiptOverlay) {
            receiptOverlay.classList.remove("show");
        }

        document.body.style.overflow = "";

        Object.keys(cart).forEach(function (id) {
            delete cart[id];
        });

        renderCart();

        if (checkoutForm) {
            checkoutForm.reset();
        }

        alert(
            "Pesanan berhasil dibuat! Terima kasih sudah memesan di KOPI SENJA."
        );
    }

    if (finishOrder) {
        finishOrder.addEventListener("click", finishCurrentOrder);
    }

    // ==========================================
    // CETAK STRUK
    // ==========================================

    if (printReceipt) {
        printReceipt.addEventListener("click", function () {
            window.print();
        });
    }

    // ==========================================
    // TUTUP MODAL DENGAN TOMBOL ESC
    // ==========================================

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            if (checkoutOverlay && checkoutOverlay.classList.contains("show")) {
                closeCheckoutModal();
            }
        }
    });

    // ==========================================
    // JALANKAN SAAT HALAMAN DIBUKA
    // ==========================================

    renderMenu();
    renderCart();
});
