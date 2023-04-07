const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const playlist = $('.overal-content-songs-list');
const mainlist = $('.main-music-player-song-list')
const playlistImg = $('.overal-content-songs-img');
const imgPlayer = $('.player-song-img');
const imgMainPlayer = $('.main-music-player-song-img');
const namecurrentsong = $('.player-song-info-title');
const authorcurrentsong = $('.player-song-info-author');
const mainNameCurrentsong = $('.main-music-player-song-name');
const mainAuthorcurrentsong = $('.main-music-player-song-singer');
const audio = $('#audio');
const playbtn = $('.play-btn-control');
const pausebtn = $('.pause-btn-control');
const currentTime = $('.current-time');
const duration = $('.duration');
const progress = $('#input-progress-song');

console.log(progress)


const app = {
    currentIndex: 0,
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

    handleEvent: function() {
        // handle when click play button
        playbtn.onclick = function(e) {
            e.stopPropagation()
            // play
            audio.play()
            // change btn
            playbtn.classList.add('hide')
            pausebtn.classList.remove('hide')

            imgPlayer.classList.add('active')    
            imgMainPlayer.classList.add('active')
        }

        //handle when click pause button
        pausebtn.onclick = function(e) {
            e.stopPropagation()
            // pause
            audio.pause()
            // change btn
            pausebtn.classList.add('hide')
            playbtn.classList.remove('hide')

            imgPlayer.classList.remove('active')    
            imgMainPlayer.classList.remove('active')
        }

        // when progress of song change

        audio.ontimeupdate = function() {
            if(!audio.duration){      //first value of duration is NaN 
                const progressPercent = 0
                progress.value = progressPercent 
            }
            else {
                const progressPercent = audio.currentTime / audio.duration * 100
                progress.value = progressPercent 
                progress.style.background = 'linear-gradient(to right, #7200a1 0%, #7200a1 ' + progressPercent  + '%, #9c9a9a ' + progressPercent  + '%, #9c9a9a 100%)'
            }
        }


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