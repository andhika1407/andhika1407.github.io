let currWindowAxis = 0;
let headerHeight = 200;
let nav = document.querySelector("nav");

function filterItems(type, style, color){
  const filtered = allItems.filter(item => {
    const matchType = !type || item.Kategori.includes(type);
    const matchColor = !color || item.Warna.includes(color);
    const matchStyle = !style || item.Style.includes(style);
    return matchType && matchColor && matchStyle;
  });

  return filtered;
}

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

function showModal(){
  document.getElementById('notifModal').style.display = 'block';
}

function hideModal(){
  document.getElementById('notifModal').style.display = 'none';
}

window.addEventListener("scroll", () => {
  let scrollTop = window.scrollY;
  
  if (scrollTop < currWindowAxis) {
    if (scrollTop > headerHeight) {
      nav.classList.add("fixed");
    }
    else{
      nav.classList.remove("fixed");
    }
  }
  else{
    nav.classList.remove("fixed");
  }
  currWindowAxis = scrollTop;

  if (document.hidden) {
    alert("WOIIIII");
  }
})