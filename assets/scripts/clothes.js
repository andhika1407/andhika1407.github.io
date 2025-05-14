const colorFilter = document.getElementById("colorFilter");
const styleFilter = document.getElementById("styleFilter");
// const clothesContainer = document.querySelector("#clothes-list .splide__list");
const clothesContainer = document.querySelector("#clothes-filter");

// let clotheSlide = new Splide( '#clothes-list', {
//   perPage: 3,
//   padding: { left: '1rem', right: '1rem' },
//   gap: '2rem',
//   pagination: false,
//   focus: 'center',
//   breakpoints: {
// 		640: {
// 			perPage: 1,
// 		}
//   }
// });

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
    clothesContainer.innerHTML = '<h2 class="text-center">Maaf, belum ada pakaian yang pas dengan gaya dan warna tersebut di sistem kami!</h2>'

    return;
  }
  
  filteredItems.forEach(item => {
    const itemContainer = document.createElement("div");
    itemContainer.classList.add("text-center");
    itemContainer.innerHTML = `
      <img src=${item.Gambar} alt="" class="w-75 sm-w-100 aspect-3x4"><br>
      <b>${item.Nama}</b>
      <p>Warna: ${item.Warna}</p>
      <a href="clothes-detail.html?id=${item.ID}" class="blue-btn">Lihat Detail</a>
    `;
    clothesContainer.appendChild(itemContainer);
  });
}

// colorFilter.addEventListener("change", renderClothes);
// styleFilter.addEventListener("change", renderClothes);

window.addEventListener("load", () => {
  renderClothes();   
})