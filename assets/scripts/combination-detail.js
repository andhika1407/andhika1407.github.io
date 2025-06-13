function addToFavorites(id) {
    let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    
    if (favorites.includes(id)) {
        let notifContainer = document.querySelector(".modal-content");

        notifContainer.innerHTML = `
            <img src="assets/images/icon/warning.png" alt="" class="med-icon">
            <h2>Gaya ini sudah ditambahkan!</h2>
            <a href="favorite.html" class="btn cream-btn mr-2">Lihat Favorit</a>
            <a href="clothes-combination.html" class="btn cream-btn">Lihat Gaya Lain</a>
        `;
    }
    else{
        favorites.push(id);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }

    showModal();
}

function renderCombination(){
    let id = new URLSearchParams(window.location.search).get("id");
    let data = false;

    if (id.includes("CSTM")) {
        let customFav = JSON.parse(localStorage.getItem("customCombination") || "[]");
        data = customFav.find(i => i.id == id);
    }
    else{
        data = getCombination(id);
    }
    
    let displayContainer = document.querySelector("#combination-detail");

    if (!data) {
        displayContainer.innerHTML = '<h2 class="w-100">Maaf, gaya dengan ID tersebut tidak ada di sistem kami!</h2>'
        return;
    }

    let thumbnailContainer = document.querySelector("#thumbnail");
    thumbnailContainer.innerHTML = `
        <div class="d-flex justify-between">
            <h1>${data.name}</h1>
            <div class="d-flex">
                <a href="customize.html?id=${id}"><button class="cream-btn">Edit Gaya</button></a>
                <button class="cream-btn ml-2" onclick="addToFavorites('${id}')">Simpan Gaya</button>
            </div>
        </div>
        <img src=${data.img} alt="" class="w-100">
    `;
    
    let items = searchItemsByID(data.items);
    let itemContainer = document.querySelector("#items-container");

    items.forEach(item => {
        itemContainer.innerHTML +=`
            <div class="d-flex mb-2">
                <img src=${item.Gambar} alt="" class="w-30 sm-w-50 mr-2">
                <div>
                    <b>${item.Nama}</b>
                    <p>Warna: ${item.Warna}</p>
                    <p>Style: ${item.Style}</p>
                    <p>Cocok untuk ${item.Acara}</p>
                    <button class="cream-btn"><a href="clothes-detail.html?id=${item.ID}" >Lihat Detail</a></button>
                </div>
                <hr>
            </div>
        `;
    });
  }

  window.addEventListener("load", () => {
    renderCombination();   
  })