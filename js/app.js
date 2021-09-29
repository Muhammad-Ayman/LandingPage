const build =
{
    init: function ()
    {
        this.initNav();
        this.ScrollHandlers(100);
        this.scrollUp();
        this.ActiveState();
    },

    initNav: () =>
    {
        const nav = document.querySelector('#navbarList'),
              sections = document.querySelectorAll('section');
        let frstLnk = true;
        for (let sec of sections)
        {
            const navLnk = document.createElement('li');
            navLnk.innerHTML =
                `<a href="#${sec.id}" class="menu__link ${frstLnk ? "link__active" : ""}" data-link="${sec.dataset.nav}">
                    ${sec.dataset.nav}
                </a>`
            nav.appendChild(navLnk);
            frstLnk = false;
        }
    },

    ActiveState: () =>
    {
        const sections = document.getElementsByTagName('section');
        for (let sec of sections)
        {
            sec.addEventListener('active', function ()
            {
                const isOnScreen = build.OnScreen(this, -300);
                const navLnk = document.querySelectorAll(`[data-link="${this.dataset.nav}"]`)[0];
                if (isOnScreen) {
                    this.classList.add('actv');
                    navLnk.classList.add('link__actv');
                } else {
                    this.classList.remove('actv');
                    navLnk.classList.remove('link__actv');
                }
            })
        }
    },

    OnScreen: (elm, bfr) =>
    {
        if(bfr === 'undefined')
           bfr = 0;

        const boundng = elm.getBoundingClientRect();
        if (boundng.top >= bfr && boundng.left >= bfr &&
            boundng.right <=
            ((document.documentElement.clientWidth) - bfr) &&
            boundng.bottom <=
            ((document.documentElement.clientHeight) - bfr))
            return true;
         else
            return false;
    },

    ScrollHandlers: (bfr) =>
    {
        const nav = document.getElementsByClassName('page__header')[0];
        let PrevPos = window.scrollY,
            frstScrl = true;
        const sections = document.getElementsByTagName('section'),
              actvEvent = new Event('active');
        window.onscroll = function ()
        {
            const curPos = window.scrollY,
                  button = document.getElementById('scrollUp');
            if (curPos > bfr)
                button.classList.remove('hide');
            else
                button.classList.add('hide');

            if (frstScrl)
            {
                if (curPos - PrevPos >= 40)
                {
                    nav.style.top = '-55px';
                    PrevPos = curPos;
                    frstScrl = false;
                }
                else if (PrevPos - curPos >= 50)
                        PrevPos = curPos;
            } else
            {
                if (PrevPos < curPos)
                    PrevPos = curPos;
                else
                {
                    if (PrevPos - curPos >= 50)
                    {
                        nav.style.top = '0';
                        frstScrl = true;
                        PrevPos = curPos;
                    }
                }
            }
            setTimeout(function () {
                for (let sec of sections) {
                    sec.dispatchEvent(actvEvent);
                }
            });
        }
    },

    scrollUp: () =>
    {
        const button = document.getElementById('scrollUp');
        button.addEventListener('click', (event) =>
        {
            const animScrlng = () =>
            {
                const y = window.scrollY;
                if (y > 0) {
                    window.requestAnimationFrame(animScrlng);
                    window.scrollTo(0, y - y / 8);
                }
            }
            window.requestAnimationFrame(animScrlng);
        });
    }
}

build.init();
