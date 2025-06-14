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
  let filteredItems = filterItems(type, style, color);
  clothesContainer.innerHTML = "";
  
  if (!filteredItems.length) {
    clothesContainer.classList.remove('item-grid');

    clothesContainer.innerHTML = `
      <h2 class="text-center">Maaf, belum ada pakaian yang pas dengan gaya dan warna tersebut di sistem kami!</h2>
    `
    return;
  }

  clothesContainer.classList.add('item-grid');
  
  filteredItems.forEach(item => {
    const itemContainer = document.createElement("div");
    itemContainer.classList.add("text-center", "item-card");
    itemContainer.innerHTML = `
      <img src=${item.Gambar} alt=""><br>
      <b>${item.Nama}</b>
      <p>Warna: ${item.Warna}</p>
      <a href="clothes-detail.html?id=${item.ID}" class="btn cream-btn">LIHAT DETAIL</a>
    `;
    clothesContainer.appendChild(itemContainer);
  });
}

window.addEventListener("load", () => {
  renderClothes(); 
})