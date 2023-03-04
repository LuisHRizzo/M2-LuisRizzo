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
/* console.log(eventCardArray) */

let cardEvents = document.getElementById(`tarjetasEvents`)

function imprimirCards(){
    for (let i = 0; i < eventCardArray.length; i++){
        cardEvents.innerHTML += `
        <div class="col">
        <div class="card">
        <div class="card-img-frame">
            <img src="${eventCardArray[i].image}" class="card-img-top" alt="${eventCardArray[i].name} ">
        </div>
        <div class="card-body">
            <h5 class="card-title">${eventCardArray[i].name}</h5>
            <p class="card-text">${eventCardArray[i].description}</p>
            <div class="card-footer">
            <p>U$D ${eventCardArray[i].price}</p><a href="#!" class="btn btn-outline-secondary">Learn More</a>
            </div>
        </div>
        </div>
        </div>

        `
    }
}

imprimirCards();

