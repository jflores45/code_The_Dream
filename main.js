// Global Varibles
let peoplePage = 1;
let planetPage = 1;
let isLoading = false;

// DOM selectors
const peopleContainer = document.querySelector('.container_people');
const planetContainer = document.querySelector('.container_planets');
const peopleBtn = document.querySelector("#btn-people");
const planetBtn = document.querySelector("#btn-planets");

// fetch functions
async function fetchPeople(page = 1) {
    const res = await fetch(`https://www.swapi.tech/api/people?page=${page}&limit=10`);
    const data = await res.json();
    console.log(data);
    renderPeople(data.results);
}
async function fetchPlanets(page = 1) {
    const res = await fetch(`https://www.swapi.tech/api/planets?page=${page}&limit=10`);
    const data = await res.json();
    console.log(data);
    renderPlanets(data.results);
}

// Render Functions
function getCharacterImage(name) {
    const imgMap = {
      "Luke Skywalker": "/images/luke.png",
      "Leia Organa": "/images/leia.png",
      "Han Solo": "/images/han.png",
      "Darth Vader": "/images/darth_vader.png",
    };
    return imgMap[name] || "images/placeholder.png";
}

function renderPeople(people) {
    people.forEach(async (person) => {
      const res = await fetch(person.url);
      const data = await res.json();
      const p = data.result.properties;
  
      const card = document.createElement("div");
      card.className = "card";
      card,style.backgroundImage = `url(${getCharacterImage(p.name)})`;
      card.style.backgroundSize = "cover";
      card.style.backgroundPosition = "center";
      card.innerHTML = `
        <h3>${p.name}</h3>
        <p>Birth Year: ${p.birth_year}</p>
        <p>Gender: ${p.gender}</p>
      `;
      peopleContainer.appendChild(card);
    });
  }
  
  function getPlanetImage(name) {
  const imgMap = {
    "Tatooine": "images/tatooine.png",
    "Alderaan": "images/alderaan.png",
    // ... add more as needed
  };
  return imgMap[name] || "images/planet_placeholder.png";
}

function renderPlanets(planets) {
  planets.forEach(async (planet) => {
    const res = await fetch(planet.url);
    const data = await res.json();
    const p = data.result.properties;

    const card = document.createElement("div");
    card.className = "card";
    card.style.backgroundImage = `url('${getPlanetImage(p.name)}')`;
    card.style.backgroundSize = "cover";
    card.style.backgroundPosition = "center";
    card.innerHTML = `
      <h3>${p.name}</h3>
      <p>Climate: ${p.climate}</p>
      <p>Population: ${p.population}</p>
    `;
    planetContainer.appendChild(card);
  });
}

// Event Listners
peopleBtn.addEventListener("click", () => {
    peopleContainer.innerHTML = "";
    planetContainer.innerHTML = "";
    peoplePage = 1;
    fetchPeople(peoplePage);
});

planetBtn.addEventListener("click", () => {
    peopleContainer.innerHTML = ""; 
    planetContainer.innerHTML = "";
    planetPage = 1;
    fetchPlanets(planetPage);
});

  
window.addEventListener("scroll", () => {
  const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

  if (nearBottom && !isLoading) {
    isLoading = true; // lock so we don't fetch again while loading

    if (peopleContainer.style.display !== "none") {
      fetchPeople(++peoplePage).finally(() => {
        isLoading = false;
      });
    } else {
      fetchPlanets(++planetPage).finally(() => {
        isLoading = false;
      });
    }
  }
});
