const favoritesContainer = document.querySelector("#favorites .splide__list");
const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

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

function addToFavorites(id) {
  if (!favorites.includes(id)) {
    favorites.push(id);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderFavourites();
  }
}

window.addEventListener("load", () => {
  renderFavourites();
})

let currWindowAxis = 0;
let headerHeight = 200;
let nav = document.querySelector("nav");

window.addEventListener("scroll", () => {
  let scrollTop = window.scrollY;
  
  if (scrollTop < currWindowAxis) {
    if (scrollTop > headerHeight) {
      nav.classList.add("fixed");
    }
    else{
      nav.classList.remove("fixed");
    }
  }
  else{
    nav.classList.remove("fixed");
  }
  currWindowAxis = scrollTop;
})