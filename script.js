/* =========================
   GLOBAL DOM GRABS
========================= */
const topNavbar   = document.querySelector("#topNavbar");
const navSpacer   = document.querySelector("#nav-spacer");
const mainNav     = document.querySelector(".main-nav");
const pages       = document.querySelectorAll(".page");
const links       = document.querySelectorAll(".main-link");
const dropBtns    = document.querySelectorAll(".drop-btn");


/* =========================
   PAGE SWITCH SYSTEM (SPA)
========================= */
function showPage(hash){
  const pageId = hash.replace("#","") || "home";

  pages.forEach(p => p.style.display = "none");

  const pageToShow = document.querySelector(`#page-${pageId}`);
  if(pageToShow){
    pageToShow.style.display = "block";
  }

  /* if NOT home page, remove hero */
  const hero = document.querySelector(".hero-container");
  const heroSec = document.querySelector("#heroSection");

  if(pageId === "home"){
    hero.style.display = "";
    heroSec.style.display = "";
    window.scrollTo({top:0});
  } else {
    hero.style.display = "none";
    heroSec.style.display = "none";
    window.scrollTo({top:0});
  }
}

/* click nav text = open first sub-item OR page directly */
links.forEach(link=>{
  link.addEventListener("click", e=>{
    const hash = e.target.getAttribute("href");
    showPage(hash);
  });
});

/* caret button toggles dropdown (mobile-friendly) */
dropBtns.forEach(btn=>{
  btn.addEventListener("click", e=>{
    e.stopPropagation();
    const menu = btn.nextElementSibling;
    const state = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", !state);
    menu.style.display = state ? "none" : "flex";
  });
});


/* =========================
   REVEAL SCROLL ANIMATION
========================= */
const revealEls = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
},{threshold:0.12});

revealEls.forEach(el => observer.observe(el));


/* =========================
   TOP BAR HIDE ON SCROLL
   & NAV TAKEOVER
========================= */
let lastY = 0;
window.addEventListener("scroll", ()=>{
  const y = window.scrollY;

  /* hide topbar when scrolling down */
  if(y > lastY){
    topNavbar.classList.add("hidden");
  } else {
    topNavbar.classList.remove("hidden");
  }
  lastY = y;

  /* push page when nav sticks */
  if(mainNav.classList.contains("fixed")){
    navSpacer.style.height = getComputedStyle(mainNav).height;
  } else {
    navSpacer.style.height = 0;
  }

  /* fix nav when topbar is gone */
  if(y > 200){
    mainNav.classList.add("fixed");
  } else {
    mainNav.classList.remove("fixed");
  }
});


/* =========================
   TOP BAR REVEAL ON MOUSE TOP EDGE
========================= */
document.addEventListener("mousemove", e=>{
  if(e.clientY < 12){
    topNavbar.classList.remove("hidden");
  }
});


/* =========================
   LOAD FIRST PAGE
========================= */
showPage(location.hash || "#home");
