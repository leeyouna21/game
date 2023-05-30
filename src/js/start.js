function start(){
    $(".icon1").draggable({
        containment: ".icon___box", scroll:false,
        start:function(){
            $(".cursor img").attr("src", "images/game_mouse01.png")
        }, drag:function(){
            $(".info").html("현재 <em style='color:red'>빨간색</em> 폴더를 드래그 하고 있습니다.");
            $("#header").addClass("red");
        }, stop : function(){
            setTimeout(os,3000);
            setTimeout(classRemove, 3000);
        }
    });

    $(".icon2").draggable({
            containment: ".icon___box", scroll:false,

        start:function(){
            $(".cursor img").attr("src", "images/game_mouse02.png")
        },drag:function(){
            $(".info").html("현재 <em style='color:blue'>파란색</em> 폴더를 드래그 하고 있습니다.");
            $("#header").addClass("blue");
        }, stop : function(){
            setTimeout(os,3000);
            setTimeout(classRemove, 3000);
        }
    });

    $(".icon3").draggable({
            containment: ".icon___box", scroll:false,

        start:function(){
            $(".cursor img").attr("src", "images/game_mouse03.png")
        },drag:function(){
            $(".info").html("현재 <em style='color:green'>초록색</em> 폴더를 드래그 하고 있습니다.");
            $("#header").addClass("green");
        }, stop : function(){
            setTimeout(os,3000);
            setTimeout(classRemove, 3000);
        }
    });

    $(".icon4").draggable({
            containment: ".icon___box", scroll:false,

        start:function(){
            $(".cursor img").attr("src", "images/game_mouse04.png")
        },drag:function(){
            $(".info").html("현재 <em style='color:yellow'>노란색</em> 폴더를 드래그 하고 있습니다.");
            $("#header").addClass("yellow");
        }, stop : function(){
            setTimeout(os,3000);
            setTimeout(classRemove, 3000);
        }
    });

    $(".music__wrap").draggable({
        scroll:false,
    });

    window.onload = function(){
        window.addEventListener("mousemove",e => {
            gsap.to(".cursor", {duration: 0, 
                left:e.pageX -5,
                top:e.pageY -10
            });
        });

        // printTime();
        // printAgent();
    }

    let clock = document.querySelector(".time");
    setInterval(function () {
    clock.innerHTML = new Date().toLocaleString();
    }, 1000);


        //운영체제 정보 알아내기
        const os = () => {
        let os = navigator.userAgent.toLowerCase();
        let sw = screen.width;
        let sh = screen.height;
        let info = document.querySelector(".info");

        if (os.indexOf("windows") >= 0) {
            info.innerHTML = "현재 윈도우를 사용하고 있으며, 화면 크기는 " + sw + "x" + sh + " 입니다."
        } else if (os.indexOf("macintosh") >= 0) {
            info.innerHTML = "현재 맥을 사용하고 있으며, 화면 크기는 " + sw + "x" + sh + " 입니다."
        } else if (os.indexOf("iphone") >= 0) {
            info.innerHTML = "현재 아이폰을 사용하고 있으며, 화면 크기는 " + sw + "x" + sh + " 입니다."
        } else if (os.indexOf("android") >= 0) {
            info.innerHTML = "현재 안드로이드 폰을 사용하고 있으며, 화면 크기는 " + sw + "x" + sh + " 입니다."
        }
        }
        os();

}

export default start;