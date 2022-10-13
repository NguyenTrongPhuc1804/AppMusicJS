window.addEventListener("load", function () {
  const playBtn = document.querySelector(".play");
  const nextBtn = document.querySelector(".next");
  const backBtn = document.querySelector(".back");
  const bar = document.querySelector("#vol");
  const durationAudio = document.querySelector(".duration");
  const remaning = document.querySelector(".remaning");
  const img = document.querySelector(".img-mp3");
  const audio = document.querySelector("#song");
  let playing = true;
  let index = 0;
  const arraySong = ["song2", "song3", "song4", "song5"];
  playBtn.onclick = () => {
    handleMusicPlay();
  };
  audio.addEventListener("ended", function () {
    changeSong(1);
  });
  function handleMusicPlay() {
    if (playing) {
      audio.play();
      playing = false;
      img.classList.toggle("isplaying");
      playBtn.classList.add("fa-pause");
      playBtn.classList.remove("fa-play");
    } else {
      audio.pause();
      playing = true;
      img.classList.toggle("isplaying");
      playBtn.classList.toggle("fa-pause");
      playBtn.classList.toggle("fa-play");
    }
  }
  nextBtn.onclick = () => {
    changeSong(1);
    log(index);
  };
  backBtn.onclick = () => {
    changeSong(-1);
    log(index);
  };
  function changeSong(e) {
    if (e === 1) {
      index++;
      if (index > arraySong.length - 1) {
        index = 0;
      }
      const nextSong = `./song/${arraySong[index]}.mp3`;
      const setSong = audio.setAttribute("src", nextSong);
      playing = true;
      handleMusicPlay();
    } else if (e === -1) {
      index--;
      if (index <= -1) {
        index = arraySong.length - 1;
      }
      const nextSong = `./song/${arraySong[index]}.mp3`;
      const setSong = audio.setAttribute("src", nextSong);
      playing = true;
      handleMusicPlay();
    }
  }
  bar.addEventListener("change", function (e) {
    song.currentTime = bar.value;
  });
  function dispayTimer() {
    const { duration, currentTime } = audio;
    const remanTime = duration - currentTime;
    bar.max = duration;
    bar.value = currentTime;
    durationAudio.textContent = CalTime(duration);
    remaning.textContent = CalTime(remanTime);
  }
  function CalTime(time) {
    const minute = Math.floor(time / 60);
    const seconds = Math.floor(time - minute * 60);
    return `${minute}:${seconds < 10 ? "0" + seconds : seconds}`;
  }
  const timer1 = setInterval(dispayTimer, 500);
});
