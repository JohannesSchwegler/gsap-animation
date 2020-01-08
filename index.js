
var lastClicked;
var sliderNumber
function init() {


    let elements = document.querySelectorAll(".text-lp");

    elements.forEach(element => {
        // save the innerHTML so it can be cleared
        let word = element.innerHTML;
        // Empty the h1`s
        element.innerHTML = "";
        // Split word into letters and add <span> for each letter to the h1
        word.split(/(?!$)/u).forEach(item => {
            element.innerHTML += `<span class="animation"><span class="inner">${item}<span></span>`;
        });


    });
    // Timeline
    const tl = new TimelineMax();
    tl.staggerFromTo(
        ".animation",
        1,
        {
            y: "300px"
        },
        {
            y: "0px",
            ease: Power2.easeOut
        },
        0.02, 0, done
    ).to('.inner', .75, { x: '100%' }).to('.is-over', 1, { x: '100%', ease: Power2.easeInOut }, "-=1");
    function done() {
        console.log(tl);
        tl
    }


    $('a').on("click", function () {
        sliderNumber = ($('.big-bg').attr('data'))
    })

    $('.item').click(function (event) {
        lastClicked = event.currentTarget;


    })


    const options = [


        // animation 2
        {
            from: '/index.html', to: '*', in: (next) => {
                next();

            },
            out: (next) => {
                const time = 1;
                moveToSide(time)
                setTimeout(() => {
                    next();
                }, time * 1000);


            }
        },

        // animation 3
        {
            from: '/page2.html', to: '/index.html',
            in: (next) => {

                setImageFull(1).then(() => {
                    next()
                    console.log("done")
                })


            },
            out: (next) => {
                $("html, body").animate({ scrollTop: 0 }, {
                    duration: 500,
                    complete: function () {
                        let tl = new TimelineMax();
                        tl.to('#swup', .5, {

                            onComplete: next
                        })



                    }
                })


            }
        },

        // animation 3
        { from: '/', to: '/post/:id' },

        // animation 4
        { from: '/', to: '/post' },

        // animation 5
        { from: '/', to: 'custom-transition' }
    ];

















    const swup = new Swup({
        plugins: [new SwupJsPlugin(options)]
    });





}


window.addEventListener('load', init);
document.addEventListener('swup:contentReplaced', init);




function setImageFull(time) {
    return new Promise((resolve, reject) => {



        let items = $('.item');
        let slide = items[sliderNumber]
        let tl = new TimelineMax();
        let screenWidth = $(window).width();

        let nextAll = items.eq(sliderNumber).nextAll();
        let prevAll = items.eq(sliderNumber).prevAll();

        cloneItem().then(() => {

            if (prevAll.length) {
                let prevAllLeft = prevAll[0].getBoundingClientRect().left;

                tl.fromTo(
                    prevAll,
                    time,
                    {
                        x: -(screenWidth / 3 + prevAllLeft),
                    },
                    {

                        x: 0,
                        clearProps: 'all'

                    },
                    0
                );

            }

            var left = (screenWidth / 3) * (sliderNumber)
            if (nextAll.length) {
                let nextAllLeft = screenWidth - nextAll[0].getBoundingClientRect().left;
                tl.fromTo(
                    nextAll,
                    time,
                    {
                        x: nextAllLeft,
                    },
                    {

                        x: 0,
                        onComplete: () => {

                        }

                    },
                    0
                );
            }
            tl.fromTo('.is-cloned', time, {
                width: '100%', x: 0
            }, {
                x: left,
                width: '33.3%'
            },
                0).fromTo('.is-cloned .bg', time, {
                    x: '0%', 'background-size': '150%'
                }, {
                    x: '-33.3%', 'background-size': '100%',
                    onComplete: () => {
                        $('.is-cloned').remove();
                        resolve();
                    }
                }, 0);
        })

    });
}

function cloneItem() {
    return new Promise(function (resolve, reject) {

        let tl = new TimelineMax();
        let screenWidth = $(window).width();

        let cloned = lastClicked.cloneNode(true);
        cloned.classList.add('is-cloned', 'full-width', 'tx')
        cloned.firstElementChild.style.transform = "translateX(0)";
        var left = (screenWidth / 3) * (sliderNumber)

        $('.container').append(cloned);

        tl.set(cloned, { x: left });
        $('is-cloned').removeClass('tx')
        console.log(left)
        resolve();
    })

}



function moveToSide(time) {
    let tl = new TimelineMax();
    let screenWidth = $(window).width();

    let nextAll = $(lastClicked).nextAll();
    let prevAll = $(lastClicked).prevAll();
    let left = lastClicked.getBoundingClientRect().left;
    let cloned = lastClicked.cloneNode(true);
    cloned.classList.add('is-cloned');

    $('.container').append(cloned);
    tl.set(cloned, { x: left });

    console.log(left)

    if (prevAll.length) {
        let prevAllLeft = prevAll[0].getBoundingClientRect().left;

        tl.fromTo(
            prevAll,
            time,
            {
                x: 0
            },
            {
                x: -(screenWidth / 3 + prevAllLeft),
                clearProps: 'all',


            },
            0
        );

    }

    if (nextAll.length) {
        let nextAllLeft = screenWidth - nextAll[0].getBoundingClientRect().left;
        tl.fromTo(
            nextAll,
            time,
            {
                x: 0
            },
            {
                x: nextAllLeft,
                onComplete: () => {

                }

            },
            0
        );
    }
    tl.to('.is-cloned', time, {
        x: 0
    }, 0),
        tl.to('.is-cloned .bg', time, {
            x: 0, 'background-size': '150%'
        }, 0), tl.to('.is-cloned', time, {
            width: screenWidth
        }, 0)
}


function cloneClickedItem(tl) {



}