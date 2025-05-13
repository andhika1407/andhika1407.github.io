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
        <div class="d-flex">
            <div class="mr-4">
                <p>Jenis</p>
                <p>Warna</p>
                <p>Style</p>
                <p>Acara</p>
                <p>Musim</p>
            </div>
            <div class="w-90">
                <p>${item.Jenis}</p>
                <p>${item.Warna}</p>
                <p>${item.Style}</p>
                <p>${item.Acara}</p>
                <p>${item.Musim}</p>
            </div>
        </div>
        <button class="blue-btn w-55 sm-w-100"><a href=${item.Link} >Beli sekarang</a></button>
        <hr>
        <h3>Deskripsi Produk</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem modi illum error tenetur! Rem alias quae dolor ducimus, eveniet expedita nam tempora accusamus eum. Aperiam quidem sequi delectus molestias quae!</p>
    </div>
  `;
}

window.addEventListener("load", () => {
  renderItem();   
})