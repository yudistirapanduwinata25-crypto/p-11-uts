
document.addEventListener("DOMContentLoaded", () => {
  const games = {
    ml: {
      name: "Mobile Legends",
      description: "Top up Diamonds Mobile Legends dengan mudah.",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=85",
      serverRequired: true,
      currency: "Diamonds",
      items: [
        { amount: "86 Diamonds", price: 20000 },
        { amount: "172 Diamonds", price: 39000 },
        { amount: "257 Diamonds", price: 58000 },
        { amount: "344 Diamonds", price: 77000 },
        { amount: "514 Diamonds", price: 115000 },
        { amount: "706 Diamonds", price: 155000 }
      ]
    },
    ff: {
      name: "Free Fire",
      description: "Pilih nominal Diamonds Free Fire favoritmu.",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=85",
      serverRequired: false,
      currency: "Diamonds",
      items: [
        { amount: "70 Diamonds", price: 10000 },
        { amount: "140 Diamonds", price: 20000 },
        { amount: "355 Diamonds", price: 50000 },
        { amount: "720 Diamonds", price: 100000 },
        { amount: "1450 Diamonds", price: 200000 },
        { amount: "2180 Diamonds", price: 300000 }
      ]
    },
    pubg: {
      name: "PUBG Mobile",
      description: "Pilih nominal UC untuk kebutuhan bermainmu.",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=85",
      serverRequired: false,
      currency: "UC",
      items: [
        { amount: "60 UC", price: 15000 },
        { amount: "325 UC", price: 75000 },
        { amount: "660 UC", price: 150000 },
        { amount: "1800 UC", price: 375000 },
        { amount: "3850 UC", price: 750000 },
        { amount: "8100 UC", price: 1500000 }
      ]
    }
  };

  const params = new URLSearchParams(window.location.search);
  const gameKey = params.get("game");
  const game = games[gameKey];

  const form = document.getElementById("topupForm");
  const userInput = document.getElementById("userId");
  const serverInput = document.getElementById("serverId");
  const serverField = document.getElementById("serverField");
  const nominalContainer = document.getElementById("nominalOptions");
  const result = document.getElementById("orderResult");

  let selectedItem = null;

  const formatRupiah = (number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(number);

  if (!game) {
    document.getElementById("gameTitle").textContent = "Game Tidak Ditemukan";
    document.getElementById("gameDescription").textContent =
      "Silakan kembali dan pilih game yang tersedia.";
    form.hidden = true;
    nominalContainer.textContent = "Tidak ada nominal yang tersedia.";
    document.querySelector(".summary-panel .full-button").disabled = true;
    return;
  }

  document.title = `Top Up ${game.name} | TOPUPZONE`;
  document.getElementById("gameTitle").textContent = game.name;
  document.getElementById("gameDescription").textContent = game.description;
  document.getElementById("summaryGame").textContent = game.name;

  const banner = document.getElementById("gameBanner");
  banner.src = game.image;
  banner.alt = game.name;

  if (!game.serverRequired) {
    serverField.hidden = true;
    serverInput.required = false;
  } else {
    serverInput.required = true;
  }

  game.items.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "nominal-option";

    const amount = document.createElement("strong");
    amount.textContent = item.amount;

    const price = document.createElement("span");
    price.textContent = formatRupiah(item.price);

    button.append(amount, price);

    button.addEventListener("click", () => {
      selectedItem = item;

      document.querySelectorAll(".nominal-option").forEach((option) => {
        option.classList.remove("selected");
      });

      button.classList.add("selected");
      document.getElementById("summaryNominal").textContent = item.amount;
      document.getElementById("summaryPrice").textContent = formatRupiah(item.price);
      result.hidden = true;
    });

    nominalContainer.appendChild(button);
  });

  userInput.addEventListener("input", () => {
    document.getElementById("summaryUser").textContent =
      userInput.value.trim() || "-";
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const userId = userInput.value.trim();
    const serverId = serverInput.value.trim();

    if (!userId) {
      alert("Silakan masukkan User ID terlebih dahulu.");
      userInput.focus();
      return;
    }

    if (game.serverRequired && !serverId) {
      alert("Silakan masukkan Zone ID / Server ID.");
      serverInput.focus();
      return;
    }

    if (!selectedItem) {
      alert("Silakan pilih nominal top up terlebih dahulu.");
      return;
    }

    const orderCode = "TZ" + Date.now().toString().slice(-8);

    result.replaceChildren();

    const heading = document.createElement("h3");
    heading.textContent = "✓ Pesanan Demo Berhasil Dibuat";

    const details = [
      `Kode pesanan: ${orderCode}`,
      `Game: ${game.name}`,
      `User ID: ${userId}`,
      ...(game.serverRequired ? [`Zone ID: ${serverId}`] : []),
      `Nominal: ${selectedItem.amount}`,
      `Total contoh: ${formatRupiah(selectedItem.price)}`,
      "Status: Demo — belum dibayar"
    ];

    result.appendChild(heading);

    details.forEach((detail) => {
      const paragraph = document.createElement("p");
      paragraph.textContent = detail;
      result.appendChild(paragraph);
    });

    result.hidden = false;
  });
});
