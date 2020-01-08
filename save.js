
var lastClicked;

function init() {



    $('.item').click(function (event) {
        lastClicked = event.currentTarget;

        console.log(lastClicked)

    })




    const options = [
        // animation 1


        // animation 2
        {
            from: '/index.html', to: '/page3.html', in: (next) => {
                next();

            },
            out: (next) => {
                let tl = new TimelineMax();
                tl.to('#swup', 1, {
                    opacity: 0, onComplete: next
                })


            }
        },

        // animation 3
        {
            from: '/page2.html', to: '/index.html', in: (next) => {
                next();

            },
            out: (next) => {
                let tl = new TimelineMax();
                tl.to('#swup', 1, {
                    x: 500,
                    opacity: 0, onComplete: next
                })


            }
        },

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

    if (prevAll.length) {
        let prevAllLeft = prevAll[0].getBoundingClientRect().left;
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

                    clearProps: 'all'

                },
                0
            );
        }
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
        x: 0, width: screenWidth
    }, 0),
        tl.to('.is-cloned .bg', time, {
            x: 0, backgroundSize: "150% auto",
        }, 0)
}


function cloneClickedItem(tl) {



}