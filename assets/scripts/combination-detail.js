function searchItemsByID(arrayOfItemID){
    const items = allItems.filter(item => {
        return arrayOfItemID.includes(item.ID);
    });
  
    return items;
  }
  
  function getCombination(combinationID){
    for (const item of allCombination) {
        if (item.id == combinationID) {
            return item;
        }
    }

    return false;
  }

  function renderCombination(){
    let id = new URLSearchParams(window.location.search).get("id");
    let data = getCombination(id);
    
    let displayContainer = document.querySelector("#combination-detail");

    if (!data) {
        displayContainer.innerHTML = '<h2 class="w-100">Maaf, gaya dengan ID tersebut tidak ada di sistem kami!</h2>'
        return;
    }

    let title = document.createElement("h1");
    title.textContent = data.name;
    displayContainer.prepend(title);

    let thumbnailContainer = document.querySelector("#thumbnail");
    thumbnailContainer.innerHTML = `
        <img src=${data.img} alt="" class="w-100">
        <button class="blue-btn">Simpan Gaya</button>
    `;
    
    let items = searchItemsByID(data.items);
    let itemContainer = document.querySelector("#items-container");

    items.forEach(item => {
        itemContainer.innerHTML +=`
            <div class="d-flex gap-2 mb-2">
                <img src=${item.Gambar} alt="" class="w-30 sm-w-50 mr-2">
                <div>
                    <b>${item.Nama}</b>
                    <p>Warna: ${item.Warna}</p>
                    <p>Style: ${item.Style}</p>
                    <p>Cocok untuk ${item.Acara}</p>
                    <button class="blue-btn"><a href="clothes-detail.html?id=${item.ID}" >Lihat Detail</a></button>
                </div>
                <hr>
            </div>
        `;
    });
  }
  
  window.addEventListener("load", () => {
    renderCombination();   
  })