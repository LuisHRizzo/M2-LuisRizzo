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
            <p>U$D ${cardArray[i].price}</p><a href="#!" class="btn btn-outline-secondary">Learn More</a>
            </div>
        </div>
        </div>
        </div>

        `
    }
}

imprimirCards();