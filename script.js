//-----------PÁGINA 1---------------------

if (document.querySelector("#list")) {
  // Cargamos el LocalStorage a un array

  function addMain() {
    let completoFav = [];
    let localStorageFav = localStorage.getItem("country");
    completoFav = JSON.parse(localStorageFav);
    console.log(completoFav);
    completoFav.forEach((countryFav) => {
      // Pinto los elementos en la página principal
      console.log(countryFav);
      document.querySelector("#pais1").innerHTML = `
        <h1>${countryFav.paisSpa}</h1>
    `;

      document.querySelector("#informacion1-1").innerHTML = `
    <img src="${countryFav.paisFlag}">
    <h6 id="subt2">Bandera de ${countryFav.paisSpa}}</h6>
    `;

      document.querySelector("#informacion1-2").innerHTML = `
    <h4>Capital: ${countryFav.paisCapital}</h4>
    <h4>Continente: ${countryFav.paisContinent}</h4>
    <h4>Número de habitantes: ${countryFav.paisSpa}</h4>
    `;

      document.querySelector("#informacion1-3").innerHTML = `
    <img id="coat-of-arms" src="${countryFav.paisSpa}">
    <h6 id="subt2">Escudo de ${countryFav.paisCoat}</h6>
    `;
    });
  }

  addMain();
}

//-----------PÁGINA 2---------------------
localStorage.clear();

if (document.querySelector("#seleccionar")) {
  // Creamos el elemento select del formulario

  function createSelect() {
    let select = document.createElement("select");
    let option = document.createElement("option");

    option.disabled = true;
    option.selected = true;
    option.innerText = "Selecciona un País";

    select.id = "countries";

    select.addEventListener("change", function () {
      getCountryByName(this.value);
    });

    select.appendChild(option);

    document.querySelector("#seleccionar").appendChild(select);

    getCountry();
  }

  // Cargamos la información de la Api y pasamos a select
  // los nombres de los paises

  async function getCountry() {
    let response = await fetch("https://restcountries.com/v3.1/independent");
    let data = await response.json();
    let array = [];
    data.forEach((country) => {
      let option = document.createElement("option");

      option.innerText = country.name.common;

      array.push(option);
    });

    document.querySelector("#countries").append(...array);
  }

  // Localizamos la información que queremos y la sacamos
  // en pantalla.

  async function getCountryByName(answer) {
    let response = await fetch(`https://restcountries.com/v3.1/name/${answer}`);
    let newData = await response.json();

    document.querySelector("#todo2").style.display = "block";

    document.querySelector("#pais2").innerHTML = `
        <h1>${newData[0].translations.spa.common}</h1>
    `;

    document.querySelector("#informacion2-1").innerHTML = `
    <img src="${newData[0].flags.png}">
    <h6 id="subt2">Bandera de ${newData[0].translations.spa.common}</h6>
    `;
    document.querySelector("#informacion2-2").innerHTML = `
    <h4>Capital: ${newData[0].capital}</h4>
    <h4>Continente: ${newData[0].continents}</h4>
    <h4>Número de habitantes: ${newData[0].population}</h4>
    `;

    document.querySelector("#informacion2-3").innerHTML = `
    <img id="coat-of-arms" src="${newData[0].coatOfArms.svg}">
    <h6 id="subt2">Escudo de ${newData[0].translations.spa.common}</h6>
    `;

    // Añadimos el botón de favorito

    button = document.querySelector("#btn2");
    button.addEventListener("click", function () {
      addLocalStg(newData);
    });
  }

  // Lo incorporamos al localStorage

  function addLocalStg(newData) {
    let completo = [];
    // if (localStorage.getItem("paisSpa")) {
    let data = {
      paisSpa: newData[0].translations.spa.common,
      paisFlag: newData[0].flags.png,
      paisCapital: newData[0].capital,
      paisPopulation: newData[0].population,
      paisContinent: newData[0].continents,
      paisCoat: newData[0].coatOfArms.svg,
      paisTrans: newData[0].translations.spa.common,
    };

    completo.push(data);
    // completo = JSON.stringify(completo);
    localStorage.setItem("country", JSON.stringify(completo));
  }

  createSelect();
  // }
}
