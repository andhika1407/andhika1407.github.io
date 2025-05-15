const colorFilter = document.getElementById("colorFilter");
const styleFilter = document.getElementById("styleFilter");
const itemsContainer = document.querySelector("#catalog .splide__list");
const combinationContainer = document.querySelector("#combination-list");

let catalogSlide = !itemsContainer ? null : new Splide( '#catalog', {
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

function filterCombination(color, style) {
  const filtered = allCombination.filter(item => {
    const matchColor = !color || item.color.includes(color);
    const matchStyle = !style || item.style.includes(style);
    return matchColor && matchStyle;
  });

  return filtered;
}

// function renderCombination() {
//   const selectedColor = colorFilter.value;
//   const selectedStyle = styleFilter.value;

//   let filteredCombination = filterCombination(selectedColor, selectedStyle);
//   itemsContainer.innerHTML = "";
  
//   if (!filteredCombination.length) {
//     catalogSlide.destroy();
//     itemsContainer.innerHTML = '<h2>Maaf, belum ada rekomendasi di sistem kami!</h2>'

//     return;
//   }
  
//   filteredCombination.forEach(combination => {
//     const card = document.createElement("li");
//     card.classList.add("splide__slide", "item-card");
//     // ini dibawah ni ganti nama atributnya (combination.name jadi combination.nama, etc)
//     card.innerHTML = `
//       <img src="${combination.img}" alt="${combination.name}" />                 
//       <h3>${combination.name}</h3>
//       <button onclick="openDetail('${combination.id}')">Lihat Detail</button>
//       <button onclick="addToFavorites('${combination.id}')">❤ Simpan</button>
//     `;
//     itemsContainer.appendChild(card);
//   });

//   if (catalogSlide.state.is( Splide.STATES.IDLE )) {
//     catalogSlide.refresh(); // If already mounted, refresh
//   } else {
//     catalogSlide.mount(); // First-time mount
//   }

//   // filteredCombination.forEach(item => {
//   //   const card = document.createElement("div");
//   //   card.classList.add("item-card");
//   //   card.innerHTML = `
//   //     <img src="${combination.img}" alt="${combination.name}" />
//   //     <h3>${combination.name}</h3>
//   //     <a href="${combination.affiliateLink}" target="_blank"><button>Beli</button></a>
//   //     <button onclick="addToFavorites('${combination.id}')">❤ Simpan</button>
//   //   `;
//   //   itemsContainer.appendChild(card);
//   // });
// }

function renderCombination(){
  const selectedColor = colorFilter.value;
  const selectedStyle = styleFilter.value;

  let filteredCombination = filterCombination(selectedColor, selectedStyle);
  combinationContainer.innerHTML = "";
  
  if (!filteredCombination.length) {
    combinationContainer.innerHTML = `
      <p></p>
      <h2 class="text-center">Maaf, belum ada pakaian yang pas dengan gaya dan warna tersebut di sistem kami!</h2>
      <p></p>
    `

    return;
  }
  
  filteredCombination.forEach(item => {
    const itemContainer = document.createElement("div");
    itemContainer.classList.add("text-center", "item-card");
    itemContainer.innerHTML = `
      <img src=${item.img} alt=""><br>
      <b>${item.name}</b>
      <p>Warna: ${item.color} <br> Style: ${item.style}</p>
      <a href="combination-detail.html?id=${item.id}" class="cream-btn">LIHAT DETAIL</a>
    `;
    combinationContainer.appendChild(itemContainer);
  });
}

colorFilter.addEventListener("change", renderCombination);
styleFilter.addEventListener("change", renderCombination);

let popup = new Splide( '#previewDetails', {
  perPage: 3,
  padding: { left: '1rem', right: '1rem' },
  pagination: false,
  // focus: 'center',
  breakpoints: {
		640: {
			perPage: 1,
		}
  }
});

function openDetail(combinationID) {
  let combinationData = allCombination.find(i => i.id == combinationID);
  let itemsID = combinationData ? combinationData.items : [];
  
  let container = document.querySelector("#previewModal .splide__list");

  itemsID.forEach(id => {
    let item = allItems.find(i => i.id == id);

    const card = document.createElement("li");
    card.classList.add("splide__slide", "item-card");
    card.innerHTML = `
      <img src="${item.Gambar}" alt="${item.Nama}" />
      <h3>${item.Nama}</h3>
      <p>Lorem ipsum dolor sit amet</p>
      <a href="${item.Link}" target="_blank"><button>Beli</button></a>
    `;
    container.appendChild(card);
  });


  document.getElementById('previewModal').style.display = 'block';

  // Ambil detail item dan tampilkan di modal
  const previewDetails = document.getElementById('previewDetails');
  if (popup.state.is( Splide.STATES.IDLE )) {
    // popup.refresh(); // If already mounted, refresh
  } else {
    popup.mount(); // First-time mount
  }
};

function closePreview() {
  document.getElementById('previewModal').style.display = 'none';
};

window.addEventListener("load", () => {
  renderCombination();
})