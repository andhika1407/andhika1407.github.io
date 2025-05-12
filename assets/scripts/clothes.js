const colorFilter = document.getElementById("colorFilter");
const styleFilter = document.getElementById("styleFilter");
// const clothesContainer = document.querySelector("#clothes-list .splide__list");
const clothesContainer = document.querySelector("#clothes-filter");
const favoritesContainer = document.querySelector("#favorites .splide__list");

const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

let clotheSlide = new Splide( '#clothes-list', {
  perPage: 3,
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

function filterItems(type, color, style){
  const filtered = allItems.filter(item => {
    const matchType = !type || item.Kategori.includes(type);
    const matchColor = !color || item.Warna.includes(color);
    const matchStyle = !style || item.Style.includes(style);
    return matchType && matchColor && matchStyle;
  });

  return filtered;
}

// function renderClothes(){
//   const selectedColor = colorFilter.value;
//   const selectedStyle = styleFilter.value;

//   let filteredItems = filterItems(selectedColor, selectedStyle);
//   clothesContainer.innerHTML = "";
  
//   if (!filteredItems.length) {
//     catalogSlide.destroy();
//     clothesContainer.innerHTML = '<h2>Maaf, belum ada pakaian yang pas dengan gaya dan warna tersebut di sistem kami!</h2>'

//     return;
//   }
  
//   filteredItems.forEach(item => {
//     const card = document.createElement("li");
//     card.classList.add("splide__slide", "item-card");
//     // ini dibawah ni ganti nama atributnya (item.name jadi item.nama, etc)
//     card.innerHTML = `
//       <img src="${item.Gambar}" alt="${item.Nama}" />                 
//       <h3>${item.Nama}</h3>
//     `;
//     clothesContainer.appendChild(card);
//   });

//   if (clotheSlide.state.is( Splide.STATES.IDLE )) {
//     clotheSlide.refresh(); // If already mounted, refresh
//   } else {
//     clotheSlide.mount(); // First-time mount
//   }
// }

function renderClothes(type="", style="", color=""){
  let filteredItems = filterItems(type, color, style);
  clothesContainer.innerHTML = "";
  
  if (!filteredItems.length) {
    catalogSlide.destroy();
    clothesContainer.innerHTML = '<h2 class="text-center">Maaf, belum ada pakaian yang pas dengan gaya dan warna tersebut di sistem kami!</h2>'

    return;
  }
  
  filteredItems.forEach(item => {
    const itemContainer = document.createElement("div");
    itemContainer.classList.add("text-center");
    itemContainer.innerHTML = `
      <img src=${item.Gambar} alt="" class="w-75 aspect-3x4"><br>
      <b>${item.Nama}</b>
      <p>Warna: ${item.Warna}</p>
      <a href="clothes-detail.html?id=${item.ID}" class="blue-btn">Lihat Detail</a>
    `;
    clothesContainer.appendChild(itemContainer);
  });
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

function addToFavorites(id) {
  if (!favorites.includes(id)) {
    favorites.push(id);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderFavourites();
  }
}

// colorFilter.addEventListener("change", renderClothes);
// styleFilter.addEventListener("change", renderClothes);

window.addEventListener("load", () => {
  renderClothes();   
  renderFavourites();
})