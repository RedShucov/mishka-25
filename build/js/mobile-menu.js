const hamburger=document.querySelector(".header__hamburger"),navigation=document.querySelector(".navigation"),bodyOverflow=document.querySelector("body");hamburger.addEventListener("click",(()=>{hamburger.classList.toggle("header__hamburger--open"),navigation.classList.toggle("navigation--open"),bodyOverflow.classList.toggle("show-main-nav")})),window.addEventListener("resize",(function(){window.matchMedia("(min-width: 768px)").matches&&navigation.classList.remove("navigation--open")})),window.addEventListener("resize",(function(){window.matchMedia("(min-width: 320px)").matches&&navigation.classList.add("navigation--mobile"),window.matchMedia("(min-width: 768px)").matches&&navigation.classList.remove("navigation--mobile")}));