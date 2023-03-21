let urlAPI = "https://mindhub-xj03.onrender.com/api/amazing"
let getApi = async () => {
    try {
        let respuesta = await fetch(urlAPI);
        let datosCrudos = await respuesta.json();

        let events = datosCrudos.events;


        // Constantes capturadas y variables
        const fechaActual = datosCrudos.currentDate;
        const checkboxSearch = document.getElementById('checkboxSearch');
        const card = document.getElementById(`tarjetasMain`)
        const input = document.querySelector('input')


        let eventCardArray = events.filter(event => event.date > fechaActual)
        // Eventos

        input.addEventListener('input', superFiltro)

        checkboxSearch.addEventListener('change', superFiltro)

        // Llamadas de funciones
        pintarCards(eventCardArray);
        crearCheckboxes(eventCardArray);

        // Funciones

        function pintarCards(arrayDatos) {
            if (arrayDatos.length == 0) {
                card.innerHTML = `<h2 class="display-1 fw-bold">No se encontró una tarjeta</h2>`
                return
            }
            let productHtml = ''
            arrayDatos.forEach(event => {
                productHtml += `
        <div class="col">
            <div class="card">
            <div class="card-img-frame">
                <img src="${event.image}" class="card-img-top" alt=" ${event.name} ">
            </div>
            <div class="card-body">
                <h5 class="card-title">${event.name}</h5>
                <p class="card-text">${event.description}</p>
                <div class="card-footer">
                <p>U$D ${event.price}</p><a href="./details.html?id=${event._id}" class="btn btn-outline-secondary">Learn More</a>
                </div>
            </div>
            </div>
            </div>
    
        `
            })
            card.innerHTML = productHtml
        }

        function crearCheckboxes(arrayInfo) {
            let checks = ''
            let categoriaRepetida = arrayInfo.map(elemento => elemento.category)
            let categorias = new Set(categoriaRepetida.sort((a, b) => {
                if (a > b) { return 1 }
                if (a < b) { return -1 }
                return 0
            }))
            categorias.forEach(elemento => {
                checks += `<div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" role="switch" id="${elemento}" value="${elemento}">
        <label class="form-check-label" for="${elemento}">${elemento}</label>
      </div>`
            })
            checkboxSearch.innerHTML = checks
        }


        function superFiltro() {
            let arrayFiltrado1 = filtrarPorTexto(eventCardArray, input.value)
            let arrayFiltrado2 = filtrarPorCategoria(arrayFiltrado1)
            pintarCards(arrayFiltrado2)
        }


        function filtrarPorTexto(arrayDatos, texto) {
            let arrayFiltrado = arrayDatos.filter(elemento => elemento.name.toLowerCase().includes(texto.toLowerCase()))
            /*     console.log(arrayFiltrado) */
            return arrayFiltrado
        }

        function filtrarPorCategoria(arrayInfo) {
            let checkboxes = document.querySelectorAll("input[type='checkbox']")
            /* console.log(checkboxes); */
            let arrayChecks = Array.from(checkboxes)
            /*     console.log(arrayChecks); */
            let checksChecked = arrayChecks.filter(check => check.checked)
            /*     console.log(checksChecked); */
            if (checksChecked.length == 0) {
                return arrayInfo
            }
            let checkValues = checksChecked.map(check => check.value)
            /*     console.log(checkValues); */
            let arrayFiltrado = arrayInfo.filter(elemento => checkValues.includes(elemento.category))
            /*     console.log(arrayFiltrado); */
            return arrayFiltrado
        }


        let cardEvents = document.getElementById(`tarjetasEvents`)




    }
    catch (error) {
        console.log("el error es el siguiente: " + error.message)
    }

}
getApi()

