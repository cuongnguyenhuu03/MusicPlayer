const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const playlist = $('.overal-content-songs-list');
const mainlist = $('.main-music-player-song-list')
const playlistImg = $('.overal-content-songs-img');
const imgPlayer= $('.player-song-img');
const imgMainPlayer = $('.main-music-player-song-img');
const namecurrentsong = $('.player-song-info-title');
const authorcurrentsong = $('.player-song-info-author');
const mainNameCurrentsong = $('.main-music-player-song-name');
const mainAuthorcurrentsong = $('.main-music-player-song-singer');
const audio = $('#audio');
const playbtns = $$('.play-btn-control');
const pausebtns = $$('.pause-btn-control');
const currentTime = $('.current-time');
const duration = $('.duration');
const progresses = $$('#input-progress-song');
const nextSongs = $$('.next-song');
const prevSongs = $$('.previous-song');
const songRanges = $$('.input-progress-range')


console.log(progresses)

var imgAnimation = [
    {
        transform: 'rotate(0)'
    },
    {
        transform: 'rotate(180deg)'
    },
    {
        transform: 'rotate(360deg)'
    }
]

const animations = imgPlayer.animate(imgAnimation, {
        duration: 7000,
        iterations: Infinity
})

// console.log(animations)

const animationsMainImg = imgMainPlayer.animate(imgAnimation, {
    duration: 7000,
    iterations: Infinity
})
animations.pause();
animationsMainImg.pause();

const app = {
    currentIndex: 0,
    isPlaying: false,
    songs : [
        {
            audio: './assets/audio/To_The_Moon.mp3',
            author: 'Hooligan',
            title: 'To The Moon',
            pic: './assets/img/songs/to_the_moon.png',
            duratime: '04:45'
        }
        ,{
            audio: './assets/audio/We_Dont_talk_Anynore.mp3',
            author: 'Charlie Puth',
            title: 'We Dont Talk Anymore',
            pic: './assets/img/songs/we_dont_talk_anymore.jpg',
            duratime: '04:45'
        }
        ,{
            audio: './assets/audio/When_I_Was_Your_Man.mp3',
            author: 'Bruno Mars',
            title: 'When I Was Your Man',
            pic: './assets/img/songs/when_i_was_your_man.png',
            duratime: '04:45'
        },
        {
            audio: './assets/audio/A_Thousand_Years.mp3',
            author: 'Christina Perri',
            title: 'A Thousand Years',
            pic: './assets/img/songs/a_thousand_years.png',
            duratime: '04:45'
        },
        {
            audio: './assets/audio/All_Of_Me.mp3',
            author: 'John Legend',
            title: 'All Of Me',
            pic: './assets/img/songs/all_of_me.png',
            duratime: '04:29'
        },
        {
            audio: './assets/audio/Fire_On_Fire.mp3',
            author: 'Sam Smith',
            title: 'A Thousand Years',
            pic: './assets/img/songs/Fire_on_fire.jpg',
            duratime: '04:45'
        },
        {
            audio: './assets/audio/Fly_Me_To_The_Moon.mp3',
            author: 'Frank Sinatra',
            title: 'Fly Me To The Moon',
            pic: './assets/img/songs/fly_me_to_the_moon.jpg',
            duratime: '04:45'
        },
        {
            audio: './assets/audio/Havana.mp3',
            author: 'Camila Cabello',
            title: 'Havana',
            pic: './assets/img/songs/havana.png',
            duratime: '04:45'
        }
        ,{
            audio: './assets/audio/Im_Not_The_Only_One.mp3',
            author: 'Sam Smith',
            title: 'Im Not The Only One',
            pic: './assets/img/songs/im_not_the_only_one.png',
            duratime: '04:45'
        }
        ,{
            audio: './assets/audio/Love_In_The_Dark.mp3',
            author: 'Adele',
            title: 'Love In The Dark',
            pic: './assets/img/songs/love_in_the_dark.jpg',
            duratime: '04:45'
        }
        ,{
            audio: './assets/audio/Love_You_Like_A_Love_Song.mp3',
            author: 'Selena Gomez & the Scene',
            title: 'Love You Like A Love Song',
            pic: './assets/img/songs/Love_you_like_a_love_song.jpg',
            duratime: '04:45'
        }
        ,{
            audio: './assets/audio/One_Call_Away.mp3',
            author: 'Charlie Puth',
            title: 'One Call Away',
            pic: './assets/img/songs/One_Call_Away.jpg',
            duratime: '04:45'
        }
        ,{
            audio: './assets/audio/Talking_To_The_Moon.mp3',
            author: 'Bruno Mars',
            title: 'Talking To The Moon',
            pic: './assets/img/songs/talking_to_the_moon.jpg',
            duratime: '04:45'
        }
        ,{
            audio: './assets/audio/Too_Good_At_Goodbyes.mp3',
            author: 'Sam Smith',
            title: 'To Good At Goodbye',
            pic: './assets/img/songs/to_good_at_goodbye.png',
            duratime: '04:45'
        }
    ],

    definePropertys: function() {
        Object.defineProperty(this, "currentSong", {
            get: function(){
                return this.songs[this.currentIndex]
            }
        })
    },

    renderSongs: function() {
        const htmls = this.songs.map(song => {
            return `
                <li class="overal-content-songs-item">
                    <div class="overal-content-songs-item-img" style="background-image:url(${song.pic}) ;">
                        <i id="play-btn"class="fa-solid fa-play"></i>
                        <div class="blur-backgound"></div>
                        <img class="active-song-img" src="./assets/img/icon/icon-playing.gif" alt="">
                    </div>
                    <div class="overal-content-songs-item-infor">
                        <span class="overal-content-songs-item-tite">${song.title}</span>
                        <span class="overal-content-songs-item-author">${song.author}</span>
                    </div>
                    <div class="overal-content-songs-item-stt">
                        <span class="hide-on-moblie">${song.duratime}</span>
                        <i class="fa-solid fa-microphone hide-on-pcls hide-on-moblie"></i>
                        <i class="fa-solid fa-heart like-btn active"></i>
                    </div>
                </li>
            `
        })

        playlist.innerHTML  = htmls.join('\n')
        mainlist.innerHTML  = htmls.join('\n')
    },

    renderSongsImg: function() {
        const htmls = this.songs.map((song, index, arr) =>{
            if(index === 0) {
                return `
                <div class="img-item first-img" style="background-image: 
                url(${song.pic})"></div>
                `
            }
            else if(index === 1) {
                return `
                <div class="img-item second-img" style="background-image: 
                url(${song.pic})"></div>
                `
            }
            else if(index === 2) {
                return `
                <div class="img-item third-img" style="background-image: 
                url(${song.pic})"></div>
                `
            }
            else {
                return `
                <div class="img-item fourth-img" style="background-image: 
                url(${song.pic})"></div>
                `
            }
        })
        playlistImg.innerHTML = htmls.join('\n')
    },

    renderCurentSong: function() {
        namecurrentsong.textContent = this.currentSong.title
        imgPlayer.style.backgroundImage = `url(${this.currentSong.pic})`
        authorcurrentsong.textContent = this.currentSong.author

        mainNameCurrentsong.textContent = this.currentSong.title
        mainAuthorcurrentsong.textContent = this.currentSong.author
        imgMainPlayer.style.backgroundImage = `url(${this.currentSong.pic})`

        audio.src = this.currentSong.audio
        progresses.forEach((progress)=>{
            progress.value = 0
        })
    },

    handleEvent: function() {
        const _this = this

        playbtns.forEach((playbtn, index) => {
            playbtn.onclick = function(e) {
            e.stopPropagation()
            audio.play()  
        }
        });

        pausebtns.forEach((pausebtn, index)=> {
            pausebtn.onclick = function(e) {
            console.log(123)
            
            e.stopPropagation()
            audio.pause()
            }
        })

        audio.onplay = function() {
            playbtns.forEach((playbtn,index)=> {
                playbtn.classList.add('hide')
            })

            pausebtns.forEach((pausebtn, index)=>{
                pausebtn.classList.remove('hide')
            })
            animations.play()
            animationsMainImg.play();
        }

        audio.onpause = function() {
            playbtns.forEach((playbtn,index)=> {
                playbtn.classList.remove('hide')
            })

            pausebtns.forEach((pausebtn, index)=>{
                pausebtn.classList.add('hide')
            })
            animations.pause();
            animationsMainImg.pause();
        }

        // when progress of song change

        audio.ontimeupdate = function() {
            // progress bar 

            if(!audio.duration){      //first value of duration is NaN 
                const progressPercent = 0
                progresses.forEach((progress) => {
                    progress.value = progressPercent 
                })

                songRanges.forEach((songRange,index)=> {
                    songRange.style.width = '0'
                })
            }
            else {
                const progressPercent = audio.currentTime / audio.duration * 100
                songRanges.forEach((songRange,index)=> {
                    songRange.style.width = progressPercent + '%' 
                })
                progresses.forEach((progress) => {
                    progress.value = progressPercent 
                })
            }
        }

        // handle change value of progress bar 
        progresses.forEach((progress)=>{
            progress.onchange = function() {
                var timeChange = audio.duration * this.value /100;
                audio.currentTime = timeChange
                audio.play()
                audio.ontimeupdate = function() {
                    // progress bar 
        
                    if(!audio.duration){      //first value of duration is NaN 
                        const progressPercent = 0
                        progresses.forEach((progress) => {
                            progress.value = progressPercent 
                        })
                        songRanges.forEach((songRange,index)=> {
                            songRange.style.width = '0'
                        }) 
                    }
                    else {
                        const progressPercent = audio.currentTime / audio.duration * 100
                        songRanges.forEach((songRange,index)=> {
                            songRange.style.width = progressPercent + '%' 
                        }) 
                        progresses.forEach((progress) => {
                            progress.value = progressPercent 
                        })
                    }
                }
            }
        })
        // 
        progresses.forEach((progress)=>{
            progress.oninput = function() {
                songRanges.forEach((songRange,index)=> {
                    songRange.style.width = this.value + '%' 
                })
                audio.ontimeupdate = function() {}
            }  
        })

        // handle next/prev song 

        nextSongs.forEach((nextSong, index)=> {
            nextSong.onclick = function() {
                _this.playNextSong()
                audio.play()
            }
        })

        prevSongs.forEach((prevSong, index)=>{
            prevSong.onclick = function() {
                console.log(9)
                _this.playPrevSong()
                audio.play()
            }
        })

        audio.onended = function() {
            nextSongs.forEach(nextsong => {
                nextsong.click()
            })
        }     
    },

    // handle next/previous song 
    playNextSong : function() {
        this.currentIndex++
        if(this.currentIndex === this.songs.length){
            this.currentIndex = 0;
        }
        this.renderCurentSong();          
    },

    playPrevSong : function() {
        this.currentIndex--
        if(this.currentIndex < 0){
            this.currentIndex = this.songs.length - 1;
        }
        this.renderCurentSong();          
    },

    start : function() {
        this.definePropertys()
        this.handleEvent()
        this.renderSongs()
        this.renderSongsImg()
        this.renderCurentSong()
    }
}

app.start();

