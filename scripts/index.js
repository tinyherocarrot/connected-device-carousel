import Slide from "./Slide.js";

const getTodayDate = () => {
  const today = new Date();
  const dd = addZero(today.getDate().toString());
  const mm = addZero((today.getMonth() + 1).toString()); //January is 0!
  const yyyy = today.getFullYear().toString();
  const currentDate = `${yyyy}-${mm}-${dd}`;
  return currentDate;
};

const addZero = dayOrMonth => {
  if (dayOrMonth.length === 1) {
    dayOrMonth = "0" + dayOrMonth;
  }
  return dayOrMonth;
};

const handleArrowKeyPress = e => {
  e.preventDefault();

  const allSlides = document.getElementsByClassName("slide__item");
  const focusedSlide = document.getElementsByClassName("slide__item--focus")[0];
  const focusedIndex = Array.from(allSlides).indexOf(focusedSlide);
  const slideContainer = document.getElementById("slide__container");
  const { left } = slideContainer.getBoundingClientRect();
  let imageOffset = left;

  let nextIndex;
  switch (e.keyCode) {
    // left
    case 37:
      nextIndex = (focusedIndex - 1 + allSlides.length) % allSlides.length;
      allSlides[nextIndex].classList.toggle("slide__item--focus");
      focusedSlide.classList.toggle("slide__item--focus");
      imageOffset += 300;
      slideContainer.style.left = imageOffset + "px";
      break;
    // right
    case 39:
      nextIndex = (focusedIndex + 1) % allSlides.length;
      allSlides[nextIndex].classList.toggle("slide__item--focus");
      focusedSlide.classList.toggle("slide__item--focus");
      imageOffset -= 300;
      slideContainer.style.left = imageOffset + "px";
      break;
    default:
      break;
  }
};

const handleErrors = response => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

const processGameJson = json => {
  return json.dates[0].games
    .map(game => {
      const { recap } = game.content.editorial;
      return recap.hasOwnProperty("mlb")
        ? {
            headline: recap.mlb.headline,
            description: recap.mlb.blurb,
            img: recap.mlb.image.cuts[14].src,
            altText: recap.mlb.image.altText
          }
        : null;
    })
    .filter(game => game !== null);
};

const renderSlides = games => {
  const slideContainer = document.getElementById("slide__container");
  if (games.length === 0) {
    const noGames = document.createElement("h1");
    noGames.innerText = "NO DATA";
    slideContainer.appendChild(noGames);
  } else {
    games.forEach(game => {
      const newSlide = new Slide(game);
      slideContainer.append(newSlide.html);
    });
    const firstSlide = document.getElementsByClassName("slide__item")[0];
    // console.log(firstSlide);
    firstSlide.classList.toggle("slide__item--focus");

    slideContainer.style.left = window.innerWidth/2 - 150 + "px";

  }
};

document.addEventListener("DOMContentLoaded", function() {
  document.onkeydown = handleArrowKeyPress;

  const currentDate = getTodayDate();
  const req = `http://statsapi.mlb.com/api/v1/schedule?hydrate=game(content(editorial(recap))),decisions&date=2019-06-19&sportId=1`;
  // const req = `http://statsapi.mlb.com/api/v1/schedule?hydrate=game(content(editorial(recap))),decisions&date=${currentDate}&sportId=1`;

  fetch(req)
    .then(handleErrors)
    .then(function(res) {
      return res.json();
    })
    .then(function(json) {
      const data = processGameJson(json);
      renderSlides(data);
    })
    .catch(function(error) {
      console.log(error);
    });
});
