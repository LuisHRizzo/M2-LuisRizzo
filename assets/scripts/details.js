let urlAPI = "https://mindhub-xj03.onrender.com/api/amazing"
let getApi = async () => {
    try {
        let respuesta = await fetch(urlAPI);
        let datosCrudos = await respuesta.json();

        let events = datosCrudos.events;

        // declaracion de variables y constantes capturadas

        const queryString = location.search

        const params = new URLSearchParams(queryString)

        const idParams = params.get("id")

        let evento = events.find(info => info._id == idParams)
        console.log(evento)
        // eventos 

        // llamadas a funciones 

        // funciones 

        const cardDetail = document.querySelector(".card-detail")
        cardDetail.innerHTML += `
<div class="row">
<div class="col-md-6 col-12 img-container">
    <div class="card-img">
        <img src="${evento.image}" class="card-img-detail" alt="">
    </div>

</div>
<div class="col-md-6 col-12 ">
    <div class="card-detail-content">
        <h2>${evento.name}  </h2>
        <span>Date: </span><p>${evento.date}</p>
        <span>Description: </span><p>${evento.description}</p>
        <span>Category: </span><p>${evento.category}</p>
        <span>Place: </span><p>${evento.place}</p>
        <span>Price: </span><p>U$D  ${evento.price}</p>
        <a href="./index.html" class="btn btn-outline-secondary">Exit</a>
    </div>

</div>
</div>
`


    }
    catch (error) {
        console.log("el error es el siguiente: " + error.message)
    }

}
getApi()
