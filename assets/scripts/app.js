const colorFilter = document.getElementById("colorFilter");
const styleFilter = document.getElementById("styleFilter");
// const itemsContainer = document.getElementById("itemsContainer");
const itemsContainer = document.querySelector("#catalog .splide__list");
const favoritesContainer = document.getElementById("favoritesContainer");

const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

let catalogSlide = new Splide( '#catalog', {
  perPage: 3,
  padding: { left: '1rem', right: '1rem' },
  gap: '2rem',
  pagination: false,
  focus: 'center'
});

function renderItems() {
  const selectedColor = colorFilter.value;
  const selectedStyle = styleFilter.value;

  const filtered = allItems.filter(item => {
    const matchColor = !selectedColor || item.color === selectedColor;
    const matchStyle = !selectedStyle || item.style === selectedStyle;
    return matchColor && matchStyle;
  });

  itemsContainer.innerHTML = "";
  
  if (!filtered.length) {
    catalogSlide.destroy();
    itemsContainer.innerHTML = '<h2 class="tect-center">Maaf, belum ada rekomendasi di sistem kami!</h2>'

    return;
  }
  
  filtered.forEach(item => {
    const card = document.createElement("li");
    card.classList.add("splide__slide", "item-card");
    card.innerHTML = `
      <img src="${item.img}" alt="${item.name}" />
      <h3>${item.name}</h3>
      <a href="${item.affiliateLink}" target="_blank"><button>Beli</button></a>
      <button onclick="addToFavorites('${item.id}')">❤ Simpan</button>
    `;
    itemsContainer.appendChild(card);
  });

  if (catalogSlide.state.is( Splide.STATES.IDLE )) {
    catalogSlide.refresh(); // If already mounted, refresh
  } else {
    catalogSlide.mount(); // First-time mount
  }

  // filtered.forEach(item => {
  //   const card = document.createElement("div");
  //   card.classList.add("item-card");
  //   card.innerHTML = `
  //     <img src="${item.img}" alt="${item.name}" />
  //     <h3>${item.name}</h3>
  //     <a href="${item.affiliateLink}" target="_blank"><button>Beli</button></a>
  //     <button onclick="addToFavorites('${item.id}')">❤ Simpan</button>
  //   `;
  //   itemsContainer.appendChild(card);
  // });
}

function renderFavorites() {
  favoritesContainer.innerHTML = "";
  favorites.forEach(id => {
    const item = allItems.find(i => i.id == id);
    if (item) {
      const card = document.createElement("div");
      card.className = "item-card";
      card.innerHTML = `
        <img src="${item.img}" alt="${item.name}" />
        <h3>${item.name}</h3>
        <a href="${item.affiliateLink}" target="_blank"><button>Beli</button></a>
      `;
      card.addEventListener('click', () => openPreview(id));

      favoritesContainer.appendChild(card);
    }
  });
}

function addToFavorites(id) {
  if (!favorites.includes(id)) {
    favorites.push(id);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderFavorites();
  }
}

colorFilter.addEventListener("change", renderItems);
styleFilter.addEventListener("change", renderItems);

window.addEventListener("load", () => {
  renderItems();
  renderFavorites();
})

const openPreview = (itemId) => {
    // Ambil detail item dan tampilkan di modal
    const previewDetails = document.getElementById('previewDetails');
    previewDetails.innerHTML = `Informasi tentang ${itemId}`; // Sesuaikan dengan data item
    document.getElementById('previewModal').style.display = 'block';
};

const closePreview = () => {
    document.getElementById('previewModal').style.display = 'none';
};