let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volume = document.querySelector('#volume');
let volume_show = document.querySelector('#volume_show');
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let track_image = document.querySelector('#track_image');
let auto_play = document.querySelector('#auto');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let artist = document.querySelector('#artist');
let volume_icon = document.querySelector('#volume_icon')

let timer;
let autoplay = 0;

let index_no = 0;
let Playing_song = false;

//create a audio Element
let track = document.createElement('audio');

//All songs list
let All_song = [{
    name: "Lối nhỏ",
    path: "musics/song1.mp3",
    img: "img/img1.jpg",
    singer: "Đen Vâu"
},
{
    name: "Bài này chill phết",
    path: "musics/song2.mp3",
    img: "img/img2.jpg",
    singer: "Đen Vâu"
},
{
    name: "Đi về nhà",
    path: "musics/song3.mp3",
    img: "img/img3.jpg",
    singer: "Đen Vâu"
},
{
    name: "Mang tiền cho mẹ",
    path: "musics/song4.mp3",
    img: "img/img4.jpg",
    singer: "Đen Vâu"
},
{
    name: "Mười Năm",
    path: "musics/song5.mp3",
    img: "img/img5.jpg",
    singer: "Đen Vâu"
}
];
// Reset song slider
const resetSlider = () => {
    slider.value = 0;
}
// Mute sound 
volume_icon.onclick = () => {
    track.volume = 0
    recent_volume.value = 0
    volume_show.innerHTML = 0
}
// Function load the track
const load_track = (index_no) => {
    clearInterval(timer)
    resetSlider()
    track.src = All_song[index_no].path
    title.innerHTML = All_song[index_no].name
    track_image.src = All_song[index_no].img
    artist.innerHTML = All_song[index_no].singer
    track.load()

    total.innerHTML = All_song.length
    present.innerHTML = index_no + 1
    timer = setInterval(() => { range_slider() }, 1000)
}
load_track(index_no)

// checking the song is playing or not
const playsong = () => {
    track.play()
    Playing_song = true
    play.innerHTML = '<i class="bi bi-pause-circle-fill"></i>'
}

const pausesong = () => {
    track.pause()
    Playing_song = false
    play.innerHTML = '<i class="bi bi-play-fill"></i>'
}
play.onclick = () => {
    if (Playing_song === false) {
        playsong()
    }
    else {
        pausesong()
    }
}
// Next song
next.onclick = () => {
    if (index_no < All_song.length - 1) {
        index_no += 1
        load_track(index_no)
        playsong()
    }
    else {
        index_no = 0
        load_track(index_no)
        playsong()
    }
}
// Previous song
previous.onclick = () => {
    if (index_no > 0) {
        index_no -= 1
        load_track(index_no)
        playsong()
    }
    else {
        index_no = All_song.length
        load_track(index_no)
        playsong()
    }
}
// Change volume
recent_volume.onchange = () => {
    volume_show.innerHTML = recent_volume.value
    track.volume = recent_volume.value / 100
}
// Change slider position
slider.onchange = () => {
    let slider_position = track.duration * (slider.value / 100)
    track.currentTime = slider_position
}
// Auto play function
auto_play.onclick = () => {
    if (autoplay == 1) {
        autoplay = 0
        auto_play.style.background = 'rgba(255, 255, 255, 0.2)'
    }
    else {
        autoplay = 1
        auto_play.style.background = '#FF8A65'
    }
}
const range_slider = () => {
    let position = 0
    // update slider position
    if (!isNaN(track.duration)) {
        position = track.currentTime * (100 / track.duration)
        slider.value = position
    }
    if (track.ended) {
        play.innerHTML = '<i class="bi bi-play-fill"></i>'
        if (autoplay == 1) {
            index_no += 1
            load_track(index_no)
            playsong()
        }
    }
}