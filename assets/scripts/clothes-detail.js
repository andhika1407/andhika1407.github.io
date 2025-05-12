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
    <img src=${item.Gambar} alt="" class="w-40 sm-w-100">
    <div class="w-55 sm-w-100">
        <h1>${item.Nama}</h1>
        <p>Warna: ${item.Warna}</p>
        <p>Style: ${item.Style}</p>
        <p>Cocok untuk ${item.Acara}</p>
        <p>Link pembelian: <a href=${item.Link}>${item.Link}</a></p>
    </div>
  `;
}

window.addEventListener("load", () => {
  renderItem();   
})