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
    
    if (!data.results || data.results.length === 0) {
      console.log("No more people");
      return;
    }
  
    console.log('people:', data);
    renderPeople(data.results);
}
async function fetchPlanets(page = 1) {
    const res = await fetch(`https://www.swapi.tech/api/planets?page=${page}&limit=10`);
    const data = await res.json();

    if (!data.results || data.results.length === 0) {
      console.log("No more planets");
      return;
    }
  
    console.log('planets:', data);
    renderPlanets(data.results);
}

// Render Functions
function getCharacterImage(name) {
    const imgMap = {
      "Anakin Skywalker": "/images/anakin.jpg",
      "Luke Skywalker": "/images/luke.jpeg",
      "Leia Organa": "/images/leia.jpg",
      "Han Solo": "/images/han.webp",
      "Darth Vader": "/images/darth_vader.png",
      "Padmé Amidala": "/images/padme.jpg",
      "Jabba Desilijic Tiure": "/images/jabba.webp",
      "Wilhuff Tarkin": "/images/wilhuff.png",
      "Chewbacca": "/images/chewy.avif",
      "Yoda": "/images/yoda.webp",
      "IG-88": "/images/IG-88.webp",
      "Greedo": "/images/greedo.png",
      "C-3PO": "/images/c3po.jpeg",
      "Owen Lars": "/images/owen.webp",
      "Palpatine": "/images/palpatine.webp",
      "Greedo": "/images/greedo.webp",
      "Wedge Antilles": "/images/Wedge_Antilles.webp",
      "Wilhuff Tarkin": "/images/wilhuff.webp",
      "Jek Tono Porkins": "/images/JekPorkins.webp",
      "Arvel Crynyd": "/images/arvel_crynyd.webp",
      "Nien Nunb": "/images/Nien_Nunb.jpeg",
      "Boba Fett": "/images/boba.jpeg",
      "Lobot": "/images/lobot.jpeg",
      "Bossk": "/images/bossk.webp",
      "Wicket Systri Warrick": "/images/Wicket.webp",
      "Lando Calrissian": "/images/Lando.webp",
      "Ackbar": "/images/ackbar.jpg",
      "Mon Mothma": "/images/mon_mothma.jpeg",
      "Nute Gunray": "/images/nute-gunray.jpg",
      "Qui-Gon Jinn": "/images/qui_gon.webp",
      "Finis Valorum": "/images/finis_valorum.jpg",
      "Rugor Nass": "/images/rugor_nass.jpeg",
      "Jar Jar Binks": "/images/jarjar.jpg",
      "Roos Tarpals": "/images/roos.webp",
      "Watto": "/images/watto.webp",
      "Ric Olié": "/images/ric_ollie.webp",
      "Sebulba": "/images/sebulba.webp",
      "Quarsh Panaka": "/images/panaka.webp",
      "Darth Maul": "/images/darth_maul.png",
      "Bib Fortuna": "/images/bib_fortuna.webp",
      "Dud Bolt": "/images/dud_bolt.webp",
      "Gasgano": "/images/gasgano.jpeg",
      "Shmi Skywalker": "/images/shmi_skywalker.jpeg",
      "Ayla Secura": "/images/ayla_secura.webp",
      "Ratts Tyerel": "/images/ratts_tyerel.jpg",
      "Ben Quadinaros": "/images/ben_quadinaros.png",
      "Mace Windu": "/images/mace_windu.webp",
      "Ki-Adi-Mundi": "/images/ki-adi-mundi.jpg",
      "Saesee Tiin": "/images/saesee.jpg",
      "Kit Fisto": "/images/kit_fisto.jpeg",
      "Eeth Koth": "/images/eeth.webp",
      "Adi Gallia": "/images/adi_gallia.webp",
      "Plo Koon": "/images/plo_koon.webp",
      "Cordé": "/images/corde.webp",
      "Mas Amedda": "/images/Mas_Amedda.webp",
      "Yarael Poof": "/images/yarael_proof.webp",
      "Gregar Typho": "/images/gregar.jpeg",
      "Cliegg Lars": "/images/cliegg_lars.webp",
      "Poggle the Lesser": "/images/poggle.jpg",
      "Barriss Offee": "/images/barriss.webp",
      "Luminara Unduli": "/images/luminarafull.webp",
      "Dooku": "/images/dooku.jpg",
      "Dormé": "/images/dormé.webp",
      "Zam Wesell": "/images/zam_wesell.webp",
      "Bail Prestor Organa": "/images/bail_prestor.webp",
      "Jango Fett": "/images/jango.webp",
      "Dexter Jettster": "/images/dexter_jettster.jpg",
      "Taun We": "/images/taun_we.jpeg",
      "Jocasta Nu": "/images/jocasta_nu.jpg",
      "San Hill": "/images/san_hill.jpg",
      "Lama Su": "/images/lama_su.webp",
      "Tarfful": "/images/tarfful.webp",
      "Raymus Antilles": "/images/raymus_antilles.jpg",
      "Grievous": "/images/grievous.webp",
      "Shaak Ti": "/images/shaak_ti.jpeg",
      "R4-P17": "/images/R4-P17.jpg",
      "Wat Tambor": "/images/wat_tambor.jpeg",
      "Tion Medon": "/images/tion_medon.jpeg",
      "Sly Moore": "/images/sly_moore.webp",
      "Obi-Wan Kenobi": "/images/obi.webp",
      "R5-D4": "/images/R5-D4.jpeg",
      "Beru Whitesun lars": "/images/beru_lars.jpeg",
      "R2-D2": "/images/R2-D2.jpg",
      "Biggs Darklighter": "/images/biggs.jpeg"
    };
    return imgMap[name] || "images/placeholder.png";
}

function renderPeople(people) {
    people.forEach(async (person) => {
      const res = await fetch(person.url);
      const data = await res.json();
      const p = data.result.properties;
  
      const card = document.createElement("div");
      card.classList.add("card");
      card.style.backgroundImage = `url(${getCharacterImage(p.name)})`;
      card.style.backgroundSize = "cover";
      card.style.backgroundPosition = "center";
      
      const overlay = document.createElement("div");
      overlay.classList.add("overlay");

      overlay.innerHTML = `
        <div class="card-details">
          <h3>${p.name}</h3>
          <div class="details-row">
            <p><strong>DOB: </strong> ${p.birth_year}</p>
            <p><strong>Gender: </strong> ${p.gender}</p>
          </div>
          <div class="btn_style">
            <button class="see-more">See More ↑</button>
          </div>
        </div>
      `;
      card.appendChild(overlay);
      peopleContainer.appendChild(card);
    });
  }
  
  function getPlanetImage(name) {
  const imgMap = {
    "Alderaan": "/images/alderaan.jpeg",
    "Yavin IV": "/images/yavin4.avif",
    "Hoth": "/images/hoth.webp",
    "Dagobah": "/images/dagobah.jpeg",
    "Bespin": "/images/bespin.jpeg",
    "Endor": "/images/endor.jpg",
    "Naboo": "/images/naboo.jpeg",
    "Coruscant": "/images/coruscant.jpeg",
    "Kamino": "/images/kamino.jpeg",
    "Tatooine": "/images/tatooine.webp",
    "Utapau": "/images/utapau.jpeg",
    "Stewjon": "/images/stewjon.jpg",
    "Geonosis": "/images/geonosis.jpeg",
    "Kashyyyk": "/images/kashyyk.jpeg",
    "Mustafar": "/images/mustafar.jpeg",
    "Polis Massa": "/images/polis_massa.jpg",
    "Mygeeto": "/images/mygeeto.webp",
    "Saleucami": "/images/saleucami.jpg",
    "Felucia": "/images/felucia.jpeg",
    "Cato Neimoidia": "/images/cato_neimoidia.jpeg",
    "Rodia": "/images/rodia.webp",
    "Trandosha": "/images/trandosha.jpeg",
    "Socorro": "/images/socorro.jpg",
    "Ord Mantell": "/images/ord_mantell.jpeg",
    "Bestine IV": "/images/bestine.webp",
    "Eriadu": "/images/eriadu.jpeg",
    "Corellia": "/images/corellia.webp",
    "Dantooine": "/images/dantooine.jpeg",
    "Nal Hutta": "/images/nal_hutta.jpeg",
    "Malastare": "/images/malastare.jpeg",
    "Dathomir": "/images/dathomir.jpeg",
    "Sullust": "/images/sullust.jpeg",
    "Mon Cala": "/images/mon_cala.jpeg",
    "Chandrila": "/images/chandrila.jpg",
    "Ryloth": "/images/ryloth.webp",
    "Aleen Minor": "/images/aleen.jpeg",
    "Vulpter": "/images/vulpter.jpeg",
    "Troiken": "/images/troiken.jpeg",
    "Toydaria": "/images/toydaria.jpeg",
    "Haruun Kal": "/images/haruun_kal.webp",
    "Cerea": "/images/cerea.jpeg",
    "Tholoth": "/images/tholoth.jpeg",
    "Iridonia": "/images/iridonia.jpeg",
    "Iktotch": "/images/iktotch.jpeg",
    "Champala": "/images/champala.jpeg",
    "Tund": "/images/tund.jpeg",
    "Glee Anselm": "/images/glee_anselm.jpeg",
    "Quermia": "/images/quermia.jpeg",
    "Dorin": "/images/dorin.jpeg",
    "Mirial": "/images/mirial.jpeg",
    "Zolan": "/images/zolan.jpeg",
    "Ojom": "/images/ojom.jpeg",
    "Skako": "/images/skako.jpeg",
    "Concord Dawn": "/images/concord_dawn.jpeg",
    "Serenno": "/images/serenno.jpeg",
    "Umbara": "/images/umbara.jpeg",
    "Shili": "/images/shili.jpeg",
    "Muunilinst": "/images/muunilinst.jpeg",
    "Kalee": "/images/kalee.webp"
  };
  return imgMap[name] || "images/placeholder.png";
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
    
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");

    overlay.innerHTML = `
      <div class="card-details">
        <h3>${p.name}</h3>
        <div class="details-row">
          <p><strong>Climate: </strong>${p.climate}</p>
          <p><strong>Population: </strong>${p.population}</p>
        </div>
        <div class="btn_style">
            <button class="see-more">See More ↑</button>
        </div>
      </div>
    `;
    card.appendChild(overlay);
    planetContainer.appendChild(card);
  });
}

// Event Listners
peopleBtn.addEventListener("click", () => {
  peopleContainer.innerHTML = "";
  planetContainer.innerHTML = "";
  peoplePage = 1;

  peopleContainer.style.display = "flex";   // show people
  planetContainer.style.display = "none";   // hide planets

  fetchPeople(peoplePage);
});

planetBtn.addEventListener("click", () => {
  peopleContainer.innerHTML = "";
  planetContainer.innerHTML = "";
  planetPage = 1;

  planetContainer.style.display = "flex";   // show planets
  peopleContainer.style.display = "none";   // hide people

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
