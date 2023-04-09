// hander header

const nav_header = document.querySelector(".container-nav")

document.onscroll = function() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    scrollTop > 20 ? nav_header.classList.add("scroll-effect") : nav_header.classList.remove("scroll-effect")
}

// friend activity

document.getElementById("exit-friend-container").onclick = function(){
    document.querySelector(".friend-container").style.right = "-260px"
    document.querySelector('.overlay').style.display = "none"
}

document.querySelector('.overlay').onclick = function() {
    this.style.display = "none"
    document.querySelector(".friend-container").style.right = "-260px"
}

document.getElementById("friend").onclick = function() {
    document.querySelector(".friend-container").style.right = "0"
    document.querySelector('.overlay').style.display = "block"
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

// main player

const exitplayer = document.getElementById('exit-main-player');
exitplayer.onclick = function() {
    document.querySelector('.main-music-player ').style.top = ('100vh')
}

document.querySelector('.player-song').onclick =function() {
    document.querySelector('.main-music-player ').style.top = ('0')
}

// animation song img 


var i = 0


setInterval(function(){
    const listimg = document.querySelectorAll('.img-item')
    var l = listimg.length;

    listimg[i].classList.replace('first-img', 'fourth-img')
    i++;
    if(i <= l-3){
        
        listimg[i].classList.replace('second-img', 'first-img')
        listimg[i+1].classList.replace('third-img', 'second-img')
        listimg[i+2].classList.replace('fourth-img','third-img')
    }
    else if(i === l-2){
        listimg[i].classList.replace('second-img', 'first-img')
        listimg[i+1].classList.replace('third-img', 'second-img')
        listimg[0].classList.replace('fourth-img','third-img')
    }
    else if(i === l-1){
        listimg[i].classList.replace('second-img', 'first-img')
        listimg[0].classList.replace('third-img', 'second-img')
        listimg[1].classList.replace('fourth-img','third-img')
    }
    else if(i === l){
        listimg[0].classList.replace('second-img', 'first-img')
        listimg[1].classList.replace('third-img', 'second-img')
        listimg[2].classList.replace('fourth-img','third-img')
        i = 0;
    }
},3000)


// stop Propagation in control btn 

document.querySelector('.player-control').onclick = function(e) {
    e.stopPropagation()
}

document.querySelector('#volume-range').onclick = function(e) {
    e.stopPropagation()
}