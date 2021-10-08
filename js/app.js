// get Elements from page
const sections = document.getElementsByTagName("section"),
	nav = document.querySelector("#navbarList"),
	up = document.getElementById("scrollUp"),
  head = document.getElementsByClassName('page__header')[0],
  main = document.getElementsByTagName('main')[0];

//Initializing Navigation bar
function initial() {
	for (sec of sections) {
		const button = document.createElement("li");
		button.innerHTML = `<but class="menu__link" id="${sec.dataset.nav}Button">
                        ${sec.dataset.nav}
                        </but>`;
		nav.appendChild(button);
	}
}

//controll navbar buttons
function buttons() {
	for (let sec of sections) {
		const button = document.getElementById(`${sec.dataset.nav}Button`);
		button.addEventListener("click", (event) => {
			event.preventDefault();
			sec.scrollIntoView({
				behavior: "smooth"
			});
		});
	}
}

//Controll ScrollUp button & hide/Show Navigation bar
function Scrolling()
{
  let FP =window.scrollY;
  const act = new Event('active');
	//Show & Hide ScrollUp Button
	window.onscroll = function ()
  {
		let SP = window.scrollY;
		if (SP < 188) up.classList.add("hide");
		else up.classList.remove("hide");

        if(SP - FP >= 200 )
        {
          head.style.top = `${nav.offsetHeight * -1}`;
          FP = SP;
        }else if (SP < FP)
         {
           head.style.top = '0px';
           FP = SP
        }

        setTimeout(function () {
                        for (let sec of sections) {
                            sec.dispatchEvent(act);
                        }
                    });
	},
	//Scroll to the top of the page if the button clicked
	up.addEventListener("click", (event) => {
		let ny = window.scrollY;
			const y = window.scrollY;
      window.scrollTo({ top: 0, behavior: 'smooth' });
	});
}

//check if section is on screen
function OnScreen(elm) {
	const boundng = elm.getBoundingClientRect();
	if (
		boundng.top <= 430 &&
		boundng.left >= 0 &&
		boundng.bottom >= 200 &&
		boundng.right <= (window.innerWidth || document.documentElement.clintWidth)
	)
		return true;
	else return false;
}

//set current section active
function view() {
	for (let sec of sections) {
    const but = document.getElementById(`${sec.dataset.nav}Button`)
		window.addEventListener("scroll", function (event)
    {
			if (OnScreen(sec))
      {
         sec.classList.add("actv");
         but.classList.add('link__actv');
      }
			else
      {
       sec.classList.remove("actv");
       but.classList.remove('link__actv');
      }
		});

	}
}

function scrollup()
{

}



initial();
buttons();
Scrolling();
view();
