// hander header
const $1 = document.querySelector.bind(document)
const $$1 = document.querySelectorAll.bind(document)

const nav_header = $1(".container-nav")
console.log(nav_header)

document.onscroll = function() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    scrollTop > 20 ? nav_header.classList.add("scroll-effect") : nav_header.classList.remove("scroll-effect")
}

// hander music-progress

document.getElementById("input-progress-song").oninput = function() {
    var value = (this.value-this.min)/(this.max-this.min)*100
    this.style.background = 'linear-gradient(to right, #7200a1 0%, #7200a1 ' + value + '%, #9c9a9a ' + value + '%, #9c9a9a 100%)'
};

// hander range volume 

document.getElementById("volume-range").oninput = function() {
    var value = (this.value-this.min)/(this.max-this.min)*100
    this.style.background = 'linear-gradient(to right, #7200a1 0%, #7200a1 ' + value + '%, #9c9a9a ' + value + '%, #9c9a9a 100%)'
};

// friend activity

document.getElementById("exit-friend-container").onclick = function(){
    document.querySelector(".friend-container").style.width = "0"
}

document.getElementById("friend").onclick = function() {
    document.querySelector(".friend-container").style.width = "260px"
}


//  overal render 

const tabs = document.querySelectorAll(".main-content-nav-item")
const overalPages = document.querySelectorAll('.container-main-content-overal')

tabs.forEach((tab, index)=> {
    tab.onclick = function(){
        if(index == 0) {
            document.querySelector('.main-content-nav-item.active').classList.remove('active');
            this.classList.add('active');
            overalPages.forEach((page, index)=>{
                page.classList.remove('show-full-content')
                page.classList.add('active');
            })
        }else {
            overalPages[index-1].classList.add('show-full-content'); 
            const overalPage = overalPages[index-1]
            overalPages.forEach((page, index)=>{
                page.classList.remove('active')
            })
            document.querySelector('.main-content-nav-item.active').classList.remove('active');
            overalPage.classList.add('active')
            this.classList.add('active')
        } 
    }
})

// tabs rendenr

const fulltabs = document.querySelectorAll(".container-content")
const menuItem = document.querySelectorAll(".main-menu-item")

menuItem.forEach((item, index)=> {
    const fulltab = fulltabs[index]
    item.onclick = function (){
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        document.querySelector(".main-menu-item.active").classList.remove('active');
        document.querySelector(".container-content.active").classList.remove('active');
        fulltab.classList.add('active')
        this.classList.add('active')
    }
})
