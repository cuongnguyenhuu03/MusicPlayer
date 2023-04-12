const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const PLAYER_STORAGE_KEY = 'user'

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
const currentTimeSong = $('.current-time');
const duration = $$('.duration');
const progresses = $$('#input-progress-song');
const nextSongs = $$('.next-song');
const prevSongs = $$('.previous-song');
const songRanges = $$('.input-progress-range');
const randomBtns = $$('.random-btn')
const repeatBtns = $$('.repeat-btn');
const volumeRange = $('#volume-range')
const progressVolume = $('.progress-volume');

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
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    minuteTime: 0,
    secondTime: 0,

    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    setConfig: function(key,value) {
        this.config[key] = value
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },

    currentIndex: 0,

    count: 0, // count song 
    playedIndex: [],
    songs : [
        {
            audio: './assets/audio/SnapSave.io - Adele - Someone Like You (Official Music Video) (320 kbps).mp3',
            author: 'Adele',
            title: 'Some One Like You',
            pic: './assets/img/songs/someonelikeyou.jpg',
            duratime: '04:45'
        },
        {
            audio: './assets/audio/SnapSave.io - Alan Walker - All Falls Down (feat. Noah Cyrus with Digital Farm Animals) (320 kbps).mp3',
            author: 'Alan Walker',
            title: 'All Falls Down',
            pic: './assets/img/songs/allfaldown.jpg',
            duratime: '03:40'
        },
        {
            audio: './assets/audio/SnapSave.io - Alan Walker - Faded (320 kbps).mp3',
            author: 'Alan Walker',
            title: 'Faded',
            pic: './assets/img/songs/faded.jpg',
            duratime: '03:32'
        },
        {
            audio: './assets/audio/SnapSave.io - AURORA - Runaway (320 kbps).mp3',
            author: 'Aurora',
            title: 'RunaWay',
            pic: './assets/img/songs/runaway.jpg',
            duratime: '04:10'
        },
        {
            audio: './assets/audio/SnapSave.io - Avicii - Waiting For Love (320 kbps).mp3',
            author: 'Avicii',
            title: 'Waiting For Love',
            pic: './assets/img/songs/waitingforlove.webp',
            duratime: '03:50'
        },
        {
            audio: './assets/audio/SnapSave.io - d4vd - Here With Me [Official Music Video] (320 kbps).mp3',
            author: 'D4vd',
            title: 'Here With Me',
            pic: './assets/img/songs/herewwithme.jpg',
            duratime: '03:41'
        },
        {
            audio: './assets/audio/SnapSave.io - Gotye - Somebody That I Used To Know (feat. Kimbra) [Official Music Video] (320 kbps).mp3',
            author: 'Gotye',
            title: 'Somebody That I Used To Know',
            pic: './assets/img/songs/somebodythatiussetokonw.jpg',
            duratime: '04:04'
        },
        {
            audio: './assets/audio/SnapSave.io - James Arthur - Say You Wont Let Go (320 kbps).mp3',
            author: 'James Arthur',
            title: 'Say You Wont Let Go',
            pic: './assets/img/songs/sayyouwontletgo.jpg',
            duratime: '03:30'
        },
        {
            audio: './assets/audio/SnapSave.io - Lewis Capaldi - Someone You Loved (320 kbps).mp3',
            author: 'Lewis Capaldi',
            title: ' Someone You Loved',
            pic: './assets/img/songs/someoneyoulove.jpg',
            duratime: '03:06'
        },
        {
            audio: './assets/audio/SnapSave.io - Maroon 5 - Memories (Official Video) (320 kbps).mp3',
            author: 'Maroon 5',
            title: 'Memories',
            pic: './assets/img/songs/memories.jpg',
            duratime: '03:15'
        },
        {
            audio: './assets/audio/SnapSave.io - P!nk - Just Give Me A Reason ft. Nate Ruess (320 kbps).mp3',
            author: 'P!nk',
            title: 'Just Give Me A Reason',
            pic: './assets/img/songs/justgivemeareason.jpg',
            duratime: '04:02'
        },
        {
            audio: './assets/audio/SnapSave.io - Shawn Mendes, Camila Cabello - Señorita (320 kbps).mp3',
            author: 'Shawn Mendes, Camila Cabello',
            title: 'Señorita',
            pic: './assets/img/songs/senorita.jpg',
            duratime: '03:25'
        },
        {
            audio: './assets/audio/To_The_Moon.mp3',
            author: 'Hooligan',
            title: 'To The Moon',
            pic: './assets/img/songs/to_the_moon.png',
            duratime: '03:37'
        }
        ,{
            audio: './assets/audio/We_Dont_talk_Anynore.mp3',
            author: 'Charlie Puth',
            title: 'We Dont Talk Anymore',
            pic: './assets/img/songs/we_dont_talk_anymore.jpg',
            duratime: '03:21'
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
            duratime: '04:06'
        },
        {
            audio: './assets/audio/Fly_Me_To_The_Moon.mp3',
            author: 'Frank Sinatra',
            title: 'Fly Me To The Moon',
            pic: './assets/img/songs/fly_me_to_the_moon.jpg',
            duratime: '03:15'
        },
        {
            audio: './assets/audio/Havana.mp3',
            author: 'Camila Cabello',
            title: 'Havana',
            pic: './assets/img/songs/havana.png',
            duratime: '03:38'
        }
        ,{
            audio: './assets/audio/Im_Not_The_Only_One.mp3',
            author: 'Sam Smith',
            title: 'Im Not The Only One',
            pic: './assets/img/songs/im_not_the_only_one.png',
            duratime: '03:59'
        }
        ,{
            audio: './assets/audio/Love_In_The_Dark.mp3',
            author: 'Adele',
            title: 'Love In The Dark',
            pic: './assets/img/songs/love_in_the_dark.jpg',
            duratime: '04:46'
        }
        ,{
            audio: './assets/audio/Love_You_Like_A_Love_Song.mp3',
            author: 'Selena Gomez & the Scene',
            title: 'Love You Like A Love Song',
            pic: './assets/img/songs/Love_you_like_a_love_song.jpg',
            duratime: '03:08'
        }
        ,{
            audio: './assets/audio/One_Call_Away.mp3',
            author: 'Charlie Puth',
            title: 'One Call Away',
            pic: './assets/img/songs/One_Call_Away.jpg',
            duratime: '03:14'
        }
        ,{
            audio: './assets/audio/Talking_To_The_Moon.mp3',
            author: 'Bruno Mars',
            title: 'Talking To The Moon',
            pic: './assets/img/songs/talking_to_the_moon.jpg',
            duratime: '03:37'
        }
        ,{
            audio: './assets/audio/Too_Good_At_Goodbyes.mp3',
            author: 'Sam Smith',
            title: 'To Good At Goodbye',
            pic: './assets/img/songs/to_good_at_goodbye.png',
            duratime: '03:21'
        }
    ],

    definePropertys: function() {
        Object.defineProperty(this, "currentSong", {
            get: function(){
                return this.songs[this.currentIndex]
            }
        })
    },

    // render songs to front end
    renderSongs: function() {
        const htmls = this.songs.map((song,index) => {
            return `
                <li class="overal-content-songs-item" data-index = "${index}">
                    <div class="overal-content-songs-item-img" style="background-image:url(${song.pic})">
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

    // render IMG to slide
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

    // render current song
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
        duration.forEach((duration)=> {
            duration.textContent = this.currentSong.duratime
        })
    },

    // handle event (repeat, random, next, prev ...)
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
            e.stopPropagation()
            audio.pause()
            }
        })

        audio.onplay = function() {
            _this.setConfig('currenIndex', _this.currentIndex)
            playbtns.forEach((playbtn,index)=> {
                playbtn.classList.add('hide')
            })

            pausebtns.forEach((pausebtn, index)=>{
                pausebtn.classList.remove('hide')
            })
            animations.play()
            animationsMainImg.play();

            if($$('.overal-content-songs-item.active')){
                $$('.overal-content-songs-item.active').forEach((a)=> {
                    a.classList.remove('active');
                })
            }

            let listSongs = $$('.overal-content-songs-item');
            listSongs[_this.currentIndex].classList.add('active');
            console.log(listSongs[_this.currentIndex + _this.songs.length]);
            listSongs[_this.currentIndex + _this.songs.length].classList.add('active');
        console.log(audio.volume);

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

            if($$('.overal-content-songs-item.active')){
                $$('.overal-content-songs-item.active').forEach((e)=> {
                    e.classList.remove('active');
                })
            }

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
                currentTimeSong.textContent = ('00:00')
            }
            else {
                const progressPercent = audio.currentTime / audio.duration * 100
                songRanges.forEach((songRange,index)=> {
                    songRange.style.width = progressPercent + '%' 
                })
                progresses.forEach((progress) => {
                    progress.value = progressPercent 
                })

                var currentMinute = Math.floor(audio.duration * progressPercent /100 /60);
                var currentSecond = Math.floor((audio.duration * progressPercent /100) %60);

                if(currentMinute < 1) {
                    currentTimeSong.textContent = (currentSecond < 10? '00' + ':' + '0' +currentSecond : '00' + ':' +currentSecond )
                }else {
                    currentTimeSong.textContent = (currentSecond < 10? '0' + currentMinute + ':' + '0' +currentSecond : '0' + currentMinute + ':' +currentSecond )

                }

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

                        var currentMinute = Math.floor(audio.duration * progressPercent /100 /60);
                        var currentSecond = Math.floor((audio.duration * progressPercent /100) %60);

                        console.log(currentSecond)
                        console.log(currentMinute)

                        if(currentMinute < 1) {
                            currentTimeSong.textContent = (currentSecond < 10? '00' + ':' + '0' +currentSecond : '00' + ':' +currentSecond )
                        }else {
                            currentTimeSong.textContent = (currentSecond < 10? '0' + currentMinute + ':' + '0' +currentSecond : '0' + currentMinute + ':' +currentSecond )
                        }
                    }
                }
            }
        })

        // seek
        progresses.forEach((progress)=>{
            progress.oninput = function(e) {
                e.stopPropagation()
                songRanges.forEach((songRange,index)=> {
                    songRange.style.width = this.value + '%' 
                })
                audio.ontimeupdate = function() {

                    const progressPercent = audio.currentTime / audio.duration * 100
                    var currentMinute = Math.floor(audio.duration * progressPercent /100 /60);
                    var currentSecond = Math.floor((audio.duration * progressPercent /100) %60);
                    if(currentMinute < 1) {
                        currentTimeSong.textContent = (currentSecond < 10? '00' + ':' + '0' +currentSecond : '00' + ':' +currentSecond )
                    }else {
                        currentTimeSong.textContent = (currentSecond < 10? '0' + currentMinute + ':' + '0' +currentSecond : '0' + currentMinute + ':' +currentSecond )
                    }
                }
            }  
        })

        // handle volume

        volumeRange.oninput = function(e){
            e.stopPropagation()
            const progressPercentVolume  = this.value
            console.log(progressPercentVolume);

            progressVolume.style.width = progressPercentVolume + 'px';
            audio.volume = progressPercentVolume / 100;
        }

        //handle next/prev song 

        nextSongs.forEach((nextSong, index)=> {
            nextSong.onclick = function(e) {
                e.stopPropagation()
                if(_this.isRandom){
                    _this.currentIndex = _this.playRandom()
                    _this.renderCurentSong()
                    console.log(_this.currentIndex)
                } 
                else {
                    _this.playNextSong()
                }
                audio.play()
                _this.scrollToActiveSong()
            }
        })

        prevSongs.forEach((prevSong, index)=>{
            prevSong.onclick = function(e) {
                e.stopPropagation()
                if(_this.isRandom){
                    _this.currentIndex = _this.playRandom()
                    _this.renderCurentSong()
                } 
                else {
                    _this.playPrevSong()
                }
                audio.play()
                _this.scrollToActiveSong()

            }
        })

        // handle when audio end 
        audio.onended = function() {
            console.log(_this.isRepeat)
            if(_this.isRepeat){
                _this.renderCurentSong()
                audio.play();
                console.log('end')
            } else {
                nextSongs[1].click()
            }
            
        }  
        
        // random song:
        randomBtns.forEach((randomBtn, index) => {
            randomBtn.onclick = function(e) {
                _this.isRandom = !_this.isRandom
                _this.setConfig('isRandom', _this.isRandom)
                e.stopPropagation()
                randomBtns.forEach((randomBtn, index) => {
                    randomBtn.classList.toggle('active',this.isRandom)
                })
            }
        })

        // repeat song: 
        repeatBtns.forEach((repeatBtn, index)=> {
            repeatBtn.onclick = function(e) {
                _this.isRepeat = !_this.isRepeat
                _this.setConfig('isRepeat', _this.isRepeat)
                e.stopPropagation()
                repeatBtns.forEach((repeatbtn, index)=> {
                    repeatbtn.classList.toggle('active',this.isRepeat)
                })
            }
        })

        // handle click to song item on playlist 
        playlist.onclick = function(e) {
            const songElement = e.target.closest('.overal-content-songs-item:not(.active)')

            // click to song that we want to listen
            if( songElement || e.target.closest('.like-btn')){
                  if(songElement) {
                    _this.currentIndex = songElement.getAttribute("data-index")
                    _this.renderCurentSong()
                    audio.play()
                  }
                  else if(e.target.closest('.like-btn')){
                    // click into like btn  
                  }
            }
        }

        mainlist.onclick = function(e) {
            const songElement = e.target.closest('.overal-content-songs-item:not(.active)')

            // click to song that we want to listen
            if( songElement || e.target.closest('.like-btn')){
                  if(songElement) {
                    _this.currentIndex = Number(songElement.getAttribute("data-index"))
                    _this.renderCurentSong()
                    audio.play()
                  }
                  else if(e.target.closest('.like-btn')){
                    // click into like btn  
                  }
            }
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

    // handle random song
    playRandom: function() {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex || this.checkRandomSongs(newIndex))

        console.log(this.checkRandomSongs(newIndex))
        this.playedIndex.push(newIndex)

        this.playedIndex.sort()
        console.log(this.playedIndex)

        this.count ++;
        if(this.count === this.songs.length) {
            this.count = 0;
            this.playedIndex = [];
        }
        return newIndex;
    },

    // check if the song is played or not
    checkRandomSongs: function(newIndex){
        for(let i = 0; i <this.playedIndex.length; i++){
            if( newIndex === this.playedIndex[i] ){
                return true 
            }     
        }
        return false
    },

    scrollToActiveSong:  function () {
        setTimeout(() => {
            $$(".overal-content-songs-item.active").forEach((e)=> {
                e.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: 'start'
                });
            }, 400);
            })
    },

    loadConfig: function() {
        // load index 
        if(!Number(app.config.currenIndex)){
            this.currentIndex = 0
        }else{
            this.currentIndex = (Number(app.config.currenIndex))
        }

        // load option
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat

        if(this.isRandom) {
            randomBtns.forEach((e)=> {
                e.classList.toggle('active',this.isRandom)
            })
        }  
        
        if(this.isRepeat){
            repeatBtns.forEach((e)=> {
                e.classList.toggle('active',this.isRepeat)
            })
        }    
    },

    start : function() {
        this.currentIndex = (Number(app.config.currenIndex))
        this.loadConfig()
        this.definePropertys()
        this.handleEvent()
        this.renderSongs()
        this.renderSongsImg()
        this.renderCurentSong()
    }
}

app.start();


