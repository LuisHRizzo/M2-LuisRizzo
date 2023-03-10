var data = data;
const fechaActual = data.currentDate;
const events = data.events;
let cardArray = [];

function cardsMain() {   
    for (let i = 0; i < events.length; i++) {
        cardArray.push(events[i])
        /* console.log(cardArray[i]) */
    }
}
cardsMain();
let card = document.getElementById(`tarjetasMain`)

function imprimirCards(){
    for (let i = 0; i < cardArray.length; i++){
        card.innerHTML += `
        <div class="col">
        <div class="card">
        <div class="card-img-frame">
            <img src="${cardArray[i].image}" class="card-img-top" alt="${cardArray[i].name} ">
        </div>
        <div class="card-body">
            <h5 class="card-title">${cardArray[i].name}</h5>
            <p class="card-text">${cardArray[i].description}</p>
            <div class="card-footer">
            <p>U$D ${cardArray[i].price}</p><a href="./details.html" class="btn btn-outline-secondary">Learn More</a>
            </div>
        </div>
        </div>
        </div>

        `
    }
}

imprimirCards();
const nombreFiltrado = [];

const nombresCheckbox = (arr) => {
   
    for(var i = 0; i < arr.length; i++) {
   
      const elemento = arr[i].category;
    
      if (!nombreFiltrado.includes(arr[i].category)) {
        nombreFiltrado.push(elemento);
      }
    }
    
    return nombreFiltrado;
  }
  nombresCheckbox(cardArray)

  /* console.log(nombreFiltrado) */

  let checkboxSearch = document.getElementById('checkboxSearch');
  function imprimirCheckbox(){
    for (let i = 0; i < nombreFiltrado.length; i++){
        checkboxSearch.innerHTML += `
        <div>
            <input type="checkbox" id="category" name="category">
            <label for="category">${nombreFiltrado[i]} </label>
        </div>

        `
    }
}
imprimirCheckbox();
