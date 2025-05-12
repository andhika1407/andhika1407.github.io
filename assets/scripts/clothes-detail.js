const favoritesContainer = document.querySelector("#favorites .splide__list");
const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

function searchItemByID(){
  let itemID = new URLSearchParams(window.location.search).get("id"); 

  if (!itemID) {
    return false;
  }
  
  for (const item of allItems) {
    if (item.ID == itemID) {
      return item;
    }
  }

  return false; // kalo ga ketemu
}

function renderItem(){
  let item = searchItemByID();

  let displayContainer = document.querySelector("#clothes-detail");

  if (!item) {
    displayContainer.innerHTML = '<h2 class="w-100">Maaf, pakaian tersebut tidak ada di sistem kami!</h2>'
    return;
  }

  displayContainer.innerHTML =`
    <img src=${item.Gambar} alt="" class="w-40">
    <div class="w-55">
        <h1>${item.Nama}</h1>
        <p>Warna: ${item.Warna}</p>
        <p>Style: ${item.Style}</p>
        <p>Cocok untuk ${item.Acara}</p>
        <p>Link pembelian: <a href="${item.link}">${item.Link}</a></p>
    </div>
  `;
}

let favouriteSlide = !favoritesContainer ? null : new Splide( '#favorites .splide', {
  perPage: 4,
  padding: { left: '1rem', right: '1rem' },
  gap: '2rem',
  pagination: false,
  focus: 'center',
  breakpoints: {
		640: {
			perPage: 1,
		}
  }
});

function renderFavourites() {
  favoritesContainer.innerHTML = "";

  if (!favorites.length) {
    favouriteSlide.destroy();
    favouriteSlide.innerHTML = '<h2>Daftar Favorit masih kosong</h2>'

    return;
  }

  favorites.forEach(id => {
    let item = allCombination.find(i => i.id == id);
    
    if (item) {
      let card = document.createElement("div");
      card.classList.add("splide__slide", "item-card");
      // ini dibawah ni ganti nama atributnya (combination.name jadi combination.nama, etc)
      card.innerHTML = `
        <img src="${item.img}" alt="${item.name}" />
        <h3>${item.name}</h3>
        <button onclick=openDetail()>Lihat Detail</button>
        <a href="${item.affiliateLink}" target="_blank"><button>Beli</button></a>
      `;
      card.addEventListener('click', () => openDetail(id));

      favoritesContainer.appendChild(card);
    }
  });

  if (favouriteSlide.state.is( Splide.STATES.IDLE )) {
    favouriteSlide.refresh(); // If already mounted, refresh
  } else {
    favouriteSlide.mount(); // First-time mount
  }
}

window.addEventListener("load", () => {
  renderItem();   
  renderFavourites()
})