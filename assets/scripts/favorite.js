// const favoritesContainer = document.querySelector("#favorites .splide__list");

// let favouriteSlide = !favoritesContainer ? null : new Splide( '#favorites .splide', {
//   perPage: 4,
//   padding: { left: '1rem', right: '1rem' },
//   gap: '2rem',
//   pagination: false,
//   focus: 'center',
//   breakpoints: {
//         640: {
//             perPage: 1,
//         }
//   }
// });
  
// function renderFavourites() {
//   favoritesContainer.innerHTML = "";

//   if (!favorites.length) {
//     favouriteSlide.destroy();
//     favouriteSlide.innerHTML = '<h2>Daftar Favorit masih kosong</h2>'

//     return;
//   }

//   favorites.forEach(id => {
//     let item = allCombination.find(i => i.id == id);
    
//     if (item) {
//       let card = document.createElement("div");
//       card.classList.add("splide__slide", "item-card");
//       // ini dibawah ni ganti nama atributnya (combination.name jadi combination.nama, etc)
//       card.innerHTML = `
//         <img src="${item.img}" alt="${item.name}" />
//         <h3>${item.name}</h3>
//         <button onclick=openDetail()>Lihat Detail</button>
//         <a href="${item.affiliateLink}" target="_blank"><button>Beli</button></a>
//       `;
//       card.addEventListener('click', () => openDetail(id));

//       favoritesContainer.appendChild(card);
//     }
//   });

//   if (favouriteSlide.state.is( Splide.STATES.IDLE )) {
//     favouriteSlide.refresh(); // If already mounted, refresh
//   } else {
//     favouriteSlide.mount(); // First-time mount
//   }
// }

function renderFavourites() {
    let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    let favoritesContainer = document.querySelector("#favorite");

    favoritesContainer.innerHTML = "";

    if (!favorites.length) {
        favoritesContainer.innerHTML = `
            <h2>Daftar Favorit masih kosong</h2>
            <a href="clothes-combination.html" class="blue-btn">Jelajahi Rekomendasi Gaya</a>
        `;
        return;
    }

    favorites.forEach(id => {
        let item = allCombination.find(i => i.id == id);

        if (item) {
            const itemContainer = document.createElement("div");
            itemContainer.classList.add("text-center");
            itemContainer.innerHTML = `
                <img src=${item.img} alt="" class="w-75 aspect-3x4"><br>
                <b>${item.name}</b>
                <p>Warna: ${item.color} <br> Style: ${item.style}</p>
                <a href="combination-detail.html?id=${item.id}" class="blue-btn">Lihat Detail</a>
            `;
            favoritesContainer.appendChild(itemContainer);
        }
    });
}

window.addEventListener("load", () => {
    renderFavourites();
})