var data = data;
const fechaActual = data.currentDate;
const events = data.events;
let eventCardArray = [];
let pastCardArray = [];

function eventCardsMain() {
    for (let i = 0; i < events.length; i++) {
        if (events[i].date > fechaActual) {
            eventCardArray.push(events[i])
        }else{
            pastCardArray.push(events[i])
        }
    }
}
eventCardsMain();
/* console.log(pastCardArray) */


let cardPast = document.getElementById(`tarjetasPast`)

function imprimirCards(){
    for (let i = 0; i < pastCardArray.length; i++){
        cardPast.innerHTML += `
        <div class="col">
        <div class="card">
        <div class="card-img-frame">
            <img src="${pastCardArray[i].image}" class="card-img-top" alt="${pastCardArray[i].name} ">
        </div>
        <div class="card-body">
            <h5 class="card-title">${pastCardArray[i].name}</h5>
            <p class="card-text">${pastCardArray[i].description}</p>
            <div class="card-footer">
            <p>U$D ${pastCardArray[i].price}</p><a href="#!" class="btn btn-outline-secondary">Learn More</a>
            </div>
        </div>
        </div>
        </div>

        `
    }
}

imprimirCards();
