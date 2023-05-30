function music() {
    const allMusic = [
        {
            name: "1. 바닷가",
            artist: "darin",
            img: "music__view001",
            audio: "music_audio01",
        },
        {
            name: "2. wish you are gay",
            artist: "Billie Eilish",
            img: "music__view002",
            audio: "music_audio02",
        },
        {
            name: "3. 바닷가",
            artist: "darin",
            img: "music__view003",
            audio: "music_audio03",
        },
        {
            name: "4. 바닷가",
            artist: "darin",
            img: "music__view004",
            audio: "music_audio04",
        },
        {
            name: "5. 바닷가",
            artist: "darin",
            img: "music__view005",
            audio: "music_audio05",
        },
        {
            name: "6. 바닷가",
            artist: "darin",
            img: "music__view006",
            audio: "music_audio06",
        },
        {
            name: "7. 바닷가",
            artist: "darin",
            img: "music__view007",
            audio: "music_audio07",
        },
        {
            name: "8. 바닷가",
            artist: "darin",
            img: "music__view008",
            audio: "music_audio08",
        },
        {
            name: "9. 바닷가",
            artist: "darin",
            img: "music__view009",
            audio: "music_audio09",
        },
        {
            name: "10. 바닷가",
            artist: "darin",
            img: "music__view010",
            audio: "music_audio10",
        },
    ];

    const musicWrap = document.querySelector(".music__wrap");
    const musicName = musicWrap.querySelector(".music__control .title h3");
    const musicArtist = musicWrap.querySelector(".music__control .title p");
    const musicView = musicWrap.querySelector(".music__view .image img");
    const musicAudio = musicWrap.querySelector("#main-audio");
    const musicPlay = musicWrap.querySelector("#control-play");
    const musicPrevBtn = musicWrap.querySelector("#control-prev");
    const musicNextBtn = musicWrap.querySelector("#control-next");
    const musicProgress = musicWrap.querySelector(".progress");
    const musicProgressBar = musicWrap.querySelector(".progress .bar");
    const musicProgressCurrent = musicWrap.querySelector(
        ".progress .timer .current"
    );
    const musicProgressduration = musicWrap.querySelector(
        ".progress .timer .duration"
    );
    const musicRepeat = musicWrap.querySelector("#control-repeat");
    const musicListBtn = musicWrap.querySelector("#control-list");
    const musicList = musicWrap.querySelector(".music__list");
    const musicListUl = musicWrap.querySelector(".music__list ul");
    const musicListClose = musicWrap.querySelector(".music__list h3 .close");

    let musicIndex = 2; // 현재 음악 인덱스

    // 음악 재생
    const loadMusic = (num) => {
        musicName.innerHTML = allMusic[num - 1].name; // 재생되고 있는 음악 제목 바꾸기
        musicArtist.innerHTML = allMusic[num - 1].artist; // 재생되고 있는 음악 아티스트 바꾸기
        musicView.src = `images /${allMusic[num - 1].img}.png`; // 재생되고 있는 음악 이미지 바꾸기
        musicView.alt = allMusic[num - 1].name; // 재생되고 있는 음악 이미지(alt) 바꾸기
        musicAudio.src = `audio/${allMusic[num - 1].audio}.mp3`; // 재생되고 있는 음악 바꾸기
    };

    // 재생
    const playMusic = () => {
        musicWrap.classList.add("paused");
        musicPlay.setAttribute("title", "정지");
        musicPlay.setAttribute("class", "stop");
        musicAudio.play();
    };

    // 정지
    const pauseMusic = () => {
        musicWrap.classList.remove("paused");
        musicPlay.setAttribute("title", "재생");
        musicPlay.setAttribute("class", "play");
        musicAudio.pause();
    };

    // 이전 곡 듣기
    const prevMusic = () => {
        musicIndex == 1 ? (musicIndex = allMusic.length) : musicIndex--; //노래를 반복적으로 재생핳기 위한 방법 삼항연산자
        console.log(musicIndex);
        loadMusic(musicIndex);
        playMusic();
        playListMusic();
    };

    // 다음 곡 듣기
    const nextMusic = () => {
        // musicIndex++;
        // if(musicIndex == 9)  musicIndex == 1;       //노래를 반복적으로 재생핳기 위한 방법을 if문으로 사용 그 밑은 if문을 바꾼 것

        musicIndex == allMusic.length ? (musicIndex = 1) : musicIndex++; //노래를 반복적으로 재생핳기 위한 방법 삼항연산자

        loadMusic(musicIndex);
        playMusic();
        playListMusic();
    };

    //뮤직 진행바
    musicAudio.addEventListener("timeupdate", (e) => {
        // console.log(e)
        const currentTime = e.target.currentTime; //재생 되는 시간
        const duration = e.target.duration; //오디오의 총 길이
        let progressWidth = (currentTime / duration) * 100; //전체 길이에서 현재 잔향되는 시간을 백분위 단위로 나누면 됨

        // console.log(progressWidth)

        musicProgressBar.style.width = `${progressWidth}%`;

        //전체 시간
        musicAudio.addEventListener("loadeddata", () => {
            let audioDuration = musicAudio.duration;
            let totalMin = Math.floor(audioDuration / 60);
            let totalSec = Math.floor(audioDuration % 60);
            if (totalSec < 10) totalSec = `0${totalSec}`;
            musicProgressduration.innerText = `${totalMin}:${totalSec}`;
        });

        //진행 시간
        let currentMin = Math.floor(currentTime / 60);
        let currentSec = Math.floor(currentTime % 60);
        if (currentSec < 10) currentSec = `0${currentSec}`;
        musicProgressCurrent.innerText = `${currentMin}:${currentSec}`;
    });

    // 진행 버튼 클릭
    musicProgress.addEventListener("click", (e) => {
        let progressWidth = musicProgress.clientWidth; //진행바 전체 길이
        let clickOffsetX = e.offsetX; //진행바를 기준으로 측정되는 X값 좌펴
        let songDuration = musicAudio.duration; //오디오 전체 길이

        //백분위로 나눈 숫자에 다시 전체 길이를 곱해 현재 재생값으로 바꿈
        musicAudio.currentTime = (clickOffsetX / progressWidth) * songDuration;

        console.log(songDuration);
    });

    //반복 버튼 클릭
    musicRepeat.addEventListener("click", () => {
        let getAttr = musicRepeat.getAttribute("class");

        switch (getAttr) {
            case "repeat":
                musicRepeat.setAttribute("class", "repeat_one");
                musicRepeat.setAttribute("title", "한 곡 반복");
                break;
            case "repeat_one":
                musicRepeat.setAttribute("class", "shuffle");
                musicRepeat.setAttribute("title", "랜덤 반복");
                break;
            case "shuffle":
                musicRepeat.setAttribute("class", "repeat");
                musicRepeat.setAttribute("title", "전체 반복");
                break;
        }
    });

    //오디오가 끝나면
    musicAudio.addEventListener("ended", () => {
        let getAttr = musicRepeat.getAttribute("class");

        switch (getAttr) {
            case "repeat":
                nextMusic();
                break;
            case "repeat_one":
                playMusic();
                break;
            case "shuffle":
                let randomIndex = Math.floor(
                    Math.random() * allMusic.length + 1
                ); //랜덤 인덱스 생성

                do {
                    randomIndex = Math.floor(
                        Math.random() * allMusic.length + 1
                    );
                } while (musicIndex == randomIndex);

                musicIndex = randomIndex; //현재 인덱스를 랸덤 안댁스로 변경
                loadMusic(randomIndex);
                playMusic();
                break;
        }
        playListMusic();
    });

    // 플레이 버튼 클릭
    musicPlay.addEventListener("click", () => {
        const isMusicPaused = musicWrap.classList.contains("paused"); // 음악 재생중
        isMusicPaused ? pauseMusic() : playMusic(); //toggle 사용
    });

    // 이전 곡 버튼 클릭
    musicPrevBtn.addEventListener("click", () => {
        prevMusic();
    });

    // 다음 곡 버튼 클릭
    musicNextBtn.addEventListener("click", () => {
        nextMusic();
    });

    //뮤직 리스트 버튼
    musicListBtn.addEventListener("click", () => {
        musicList.classList.add("show");
    });

    //뮤직 리스트 닫기 버튼
    musicListClose.addEventListener("click", () => {
        musicList.classList.remove("show");
    });

    //뮤직 리스트 구현하기
    for (let i = 0; i < allMusic.length; i++) {
        let li = `
        <li data-index="${i + 1}">
        
            <strong>${allMusic[i].name}</strong>
            <em>${allMusic[i].artist}</em>
            <audio class="${allMusic[i].audio}" src="audio/${
            allMusic[i].audio
        }.mp3"></audio>
            <span class="audio-duration" id="${allMusic[i].audio}">2:55</span>
        </li>
        `;

        // musicListUl.innerHTML += li;
        musicListUl.insertAdjacentHTML("beforeend", li);

        //리스트 음악 시간 불러오기
        let liAudioDuration = musicListUl.querySelector(
            `#${allMusic[i].audio}`
        ); //리스트에서 시간을 표시할 선택자를 가져온 것
        let liAudio = musicListUl.querySelector(`.${allMusic[i].audio}`); //리스트에서 오디오파일을 가져온 것
        liAudio.addEventListener("loadeddata", () => {
            let audioDuration = liAudio.duration;
            // console.log(audioDuration)
            let totalMin = Math.floor(audioDuration / 60);
            let totalSec = Math.floor(audioDuration % 60);
            if (totalSec < 10) totalSec = `0${totalSec}`;
            liAudioDuration.innerText = `${totalMin}:${totalSec}`;
            liAudioDuration.setAttribute(
                "data-duration",
                `${totalMin}:${totalSec}`
            );
        });
    }

    //뮤직 리스트를 클릭하면 재생
    //뮤직리스트를 클릭하면 재생
    function playListMusic() {
        const musicListAll = musicListUl.querySelectorAll("li"); // 뮤직 리스트 목록
        for (let i = 0; i < musicListAll.length; i++) {
            let audioTag = musicListAll[i].querySelector(".audio-duration");
            musicListAll[i].addEventListener("click", function () {
                clicked(this);
            });
            if (musicListAll[i].classList.contains("playing")) {
                musicListAll[i].classList.remove("playing");
                let dataAudioDuration = audioTag.getAttribute("data-duration");
                audioTag.innerText = dataAudioDuration;
            }
            if (musicListAll[i].getAttribute("data-index") == musicIndex) {
                musicListAll[i].classList.add("playing");
                audioTag.innerText = "재생중";
            }
        }
    }
    playListMusic();

    //뮤직 리스트를 클락히면
    function clicked(el) {
        let getIndex = el.getAttribute("data-index");
        // alert(getIndex);
        musicIndex = getIndex;
        loadMusic(musicIndex);
        playMusic();
        playListMusic();
    }

    window.addEventListener("load", () => {
        loadMusic(musicIndex);
        playListMusic();
    });
}

export default music;
