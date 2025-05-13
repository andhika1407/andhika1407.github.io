let currWindowAxis = 0;
let headerHeight = 200;
let nav = document.querySelector("nav");

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
})