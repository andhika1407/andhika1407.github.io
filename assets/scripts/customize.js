let combinationClothesList = document.querySelector("#clothes-list .splide__list");
let clothesContainer = document.querySelector("#clothes-filter");
let notifContainer = document.querySelector(".modal-content");
let selectedClothes = [];
let targetDelete;

let clotheSlide = new Splide( '#clothes-list .splide', {
  perPage: 3,
  padding: { left: '1rem', right: '1rem' },
  gap: '2rem',
  pagination: false,
  breakpoints: {
    600: {
        perPage: 1,
    },
    800: {
        perPage: 2
    }
  }
});

function addSelectedClothes(id){
    if (selectedClothes.some(obj => obj.ID === id)) {
        notifContainer.innerHTML = `
            <img src="assets/images/icon/warning.png" alt="" class="med-icon">
            <h2>Pakaian sudah terpilih</h2>
            <button class="cream-btn" onclick="hideModal()">OK</button>
        `;

        showModal();
        return;
    }

    let clothes = searchItemsByID(id)[0];
    selectedClothes.push(clothes);

    let clothesListSplide = document.querySelector("#clothes-list .splide__list");
    let clothesList = document.querySelector("#clothes-list");

    if (!clothesListSplide) {
        clothesList.innerHTML =`
            <h1>Kombinasimu</h1>
            <div class="splide">
                <div class="splide__track">
                    <ul class="splide__list"></ul>
                </div>
            </div>
        <button class="cream-btn" onclick="saveCombination()">Simpan Kombinasi</button>
        `;

        clotheSlide = new Splide( '#clothes-list .splide', {
            perPage: 3,
            padding: { left: '1rem', right: '1rem' },
            gap: '2rem',
            pagination: false,
            breakpoints: {
                640: {
                    perPage: 1,
                }
        }})
    }

    combinationClothesList = document.querySelector("#clothes-list .splide__list");

    const card = document.createElement("li");
    card.classList.add("splide__slide", "item-card");
    // ini dibawah ni ganti nama atributnya (item.name jadi item.nama, etc)
    card.innerHTML = `
        <img src="${clothes.Gambar}" alt="${clothes.Nama}" />                 
        <h3>${clothes.Nama}</h3>
        <button onclick="confirmDelete(this, '${clothes.ID}')" class="red-btn">Hapus</button>
    `;
    combinationClothesList.appendChild(card);
    
    if (clotheSlide.state.is( Splide.STATES.IDLE )) {
        clotheSlide.refresh();
    } 
    else {
        clotheSlide.mount();
    }

    notifContainer.innerHTML = `
        <img src="assets/images/icon/check.png" alt="" class="med-icon">
        <h2>Pakaian berhasil ditambahkan</h2>
        <button class="cream-btn" onclick="hideModal()">OK</button>
    `;
    showModal();
}

function deleteSelectedClothes(id){
    for (let index = 0; index < selectedClothes.length; index++) {
        if (selectedClothes[index].ID == id) {
            selectedClothes.splice(index, 1);
            break;
        }
    }

    targetDelete.remove();
    targetDelete = null
    clotheSlide.refresh();

    if (!selectedClothes.length) {
        let displayContainer = document.querySelector("#clothes-list");

        displayContainer.innerHTML = '<h3 class="w-100">Belum ada baju yang dipilih!</h3>'
    }

    hideModal();
}

function confirmDelete(elem, id){
    targetDelete = elem.parentNode;

    notifContainer.innerHTML = `
        <img src="assets/images/icon/warning.png" alt="" class="med-icon">
        <h2>Yakin hapus pakaian ini dari kombinasi?</h2>
        <button onclick="deleteSelectedClothes('${id}')" class="red-btn mr-2">Hapus</button>
        <button onclick="hideModal()" class="cream-btn">Batal Hapus</button>
    `;

    showModal();

    if (clotheSlide.state.is( Splide.STATES.IDLE )) {
        clotheSlide.refresh(); // If already mounted, refresh
    }
}

function renderCombination(){
    let id = new URLSearchParams(window.location.search).get("id");
    let combination = false;

    if (id.includes("CSTM")) {
        let customFav = JSON.parse(localStorage.getItem("customCombination") || "[]");
        combination = customFav.find(i => i.id == id);
    }
    else{
        combination = getCombination(id);
    }

    let displayContainer = document.querySelector("#clothes-list");

    if (!combination) {
        displayContainer.innerHTML = '<h3 class="w-100">Belum ada baju yang dipilih!</h3>'
        return;
    }
    
    selectedClothes = searchItemsByID(combination.items);
    
    selectedClothes.forEach(item => {
        const card = document.createElement("li");
        card.classList.add("splide__slide", "item-card");
        // ini dibawah ni ganti nama atributnya (item.name jadi item.nama, etc)
        card.innerHTML = `
            <img src="${item.Gambar}" alt="${item.Nama}" />                 
            <h3>${item.Nama}</h3>
            <button onclick="confirmDelete(this, '${item.ID}')" class="red-btn">Hapus</button>
        `;
        combinationClothesList.appendChild(card);
    });

    if (clotheSlide.state.is( Splide.STATES.IDLE )) {
        clotheSlide.refresh(); // If already mounted, refresh
    } else {
        clotheSlide.mount(); // First-time mount
    }
}

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
        <div class="d-flex justify-center">
            <button class="green-btn mr-2" onclick="addSelectedClothes('${item.ID}')">TAMBAH</button>
            <a href="clothes-detail.html?id=${item.ID}"><button class="cream-btn">LIHAT DETAIL</button></a>
        </div>
      `;
      clothesContainer.appendChild(itemContainer);
    });
}

function saveCombination(){
    let customCombination = JSON.parse(localStorage.getItem("favorites") || "[]");
    let customCount = customCombination.length + 1;

    let newTest = "";
    let newerTest = "";

    selectedClothes.forEach(item => {
        if (!newTest.includes(item.Warna)) {
            newTest += `${item.Warna}, `
        }
        if (!newerTest.includes(item.Style)) {
            newerTest += `${item.Style}, `
        }
    });

    let colors = selectedClothes.flatMap(item => 
        item.Warna.toLowerCase().split(/\s*,\s*/) 
    );
    let styles = selectedClothes.flatMap(item => 
        item.Style.toLowerCase().split(/\s*,\s*/) 
    );

    let combination = { 
        id: `CSTM${customCount}`,
        name: `Kombinasi Kustom ${customCount}`,
        img: selectedClothes[0].Gambar,
        color: [...new Set(colors)],
        style: [...new Set(styles)],
        items: selectedClothes.map((i) => i.ID),
    }   

    customCombination.push(combination);

    localStorage.setItem("customCombination", JSON.stringify(customCombination));

    notifContainer.innerHTML = `
        <img src="assets/images/icon/check.png" alt="" class="med-icon">
        <h2>Berhasil ditambahkan!</h2>
        <a href="favorite.html" class="btn cream-btn mr-2">Lihat Favorit</a>
        <a href="clothes-combination.html" class="btn cream-btn">Lihat Gaya Lain</a>
    `;

    showModal();
}

window.addEventListener("load", () => {
    renderCombination();
    renderClothes();

    colorFilter.addEventListener("change", () => {
        let selectedColor = colorFilter.value;
        let selectedStyle = styleFilter.value;
        renderClothes("", selectedStyle, selectedColor);
    });

    styleFilter.addEventListener("change", () => {
        let selectedColor = colorFilter.value;
        let selectedStyle = styleFilter.value;
        renderClothes("", selectedStyle, selectedColor);
    });
})
