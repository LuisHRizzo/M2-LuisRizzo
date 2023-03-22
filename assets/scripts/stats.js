// declaraciones 
let urlAPI = "https://mindhub-xj03.onrender.com/api/amazing"
let getApi = async () => {
  try {
    let respuesta = await fetch(urlAPI);
    let datosCrudos = await respuesta.json();
    const fechaActual = datosCrudos.currentDate;
    let events = datosCrudos.events;
    // tengo que crear arrays para eventos pasados y futuros 
    const pasados = events.filter(event => event.date < fechaActual);
    const futuros = events.filter(event => event.date > fechaActual);

    // Hasta aca recupero los datos de la api y los transformo en un array de objetos manejables

    // eventos
    printfirstTable()
   

    // funciones 
    function highAttendance(arrayData) {
      let mayorPorcentaje = 0;
      let altaAsistencia = "";
      arrayData.forEach(event => {
        const porcentaje = (event.assistance / event.capacity) * 100;
        if (porcentaje > mayorPorcentaje) {
          mayorPorcentaje = porcentaje
          altaAsistencia = event.name
        }
      });
      return `${altaAsistencia} (${mayorPorcentaje})`;
    }

    function minAttendance(arrayData) {
      let menorPorcentaje = Infinity;
      let bajaAsistencia = "";
      arrayData.forEach(event => {
        const porcentaje = (event.assistance / event.capacity) * 100;
        if (porcentaje < menorPorcentaje) {
          menorPorcentaje = porcentaje
          bajaAsistencia = event.name
        }
      });
      return `${bajaAsistencia} (${menorPorcentaje})`;
    }

    function maxCapacity(arrayData) {
      const eventoMayorCapacidad = arrayData.reduce((anterior, actual) => {
        if (actual.capacity > anterior.capacity) {
          return actual;
        } else {
          return anterior;
        }
      });

      return `${eventoMayorCapacidad.name} (${eventoMayorCapacidad.capacity})`;
    }

    // aca estoy viendo los resultados de los funciones de la primer tabla 
    console.log(`${highAttendance(events)} ${minAttendance(events)} ${maxCapacity(events)}`);

    // se imprime la primera tabla

    function printfirstTable() {
      primerTabla.innerHTML = `
            <td>${highAttendance(events)} </td>
            <td>${minAttendance(events)}</td>
            <td> ${maxCapacity(events)}</td>
            `
    }

    function printSecondTable() {
        let productHtml = ''
        arrayTablaFut.forEach(event => {
          productHtml += `
        <tr>
          <td>${event.categoria} </td>
        <td>${event.ganancias}</td>
        <td> ${event.promedio.toFixed(2)}</td>
        </tr>
        `
        })
        segundaTabla.innerHTML = productHtml
      }
    




    function printThirdTable() {
      let productHtml = ''
        arrayTablaPas.forEach(event => {
          productHtml += `
        <tr>
          <td>${event.categoria} </td>
        <td>${event.ganancias}</td>
        <td> ${event.promedio.toFixed(2)}</td>
        </tr>
        `
        })
        tercerTabla.innerHTML = productHtml
      }

    // vamos con la segunda y tercer tabla. ya separamos los arrays en pasados y futuros. 
    const gananciasPorCategoriaFut = {};
    const promediosPorCategoriaFut = {};
    const gananciasPorCategoriaPas = {};
    const promediosPorCategoriaPas = {};


    futuros.forEach(obj => {
      const categoria = obj.category;
      const ganancia = obj.price * obj.estimate;

      if (!gananciasPorCategoriaFut[categoria]) {
        gananciasPorCategoriaFut[categoria] = 0;
      }

      gananciasPorCategoriaFut[categoria] += ganancia;

      const promedio = (obj.estimate / obj.capacity) * 100;

      if (!promediosPorCategoriaFut[categoria]) {
        promediosPorCategoriaFut[categoria] = {
          suma: 0,
          cantidad: 0
        };
      }

      promediosPorCategoriaFut[categoria].suma += promedio;
      promediosPorCategoriaFut[categoria].cantidad++;
    });

    pasados.forEach(obj => {
      const categoria = obj.category;
      const ganancia = obj.price * obj.assistance;

      if (!gananciasPorCategoriaPas[categoria]) {
        gananciasPorCategoriaPas[categoria] = 0;
      }

      gananciasPorCategoriaPas[categoria] += ganancia;

      const promedio = (obj.assistance / obj.capacity) * 100;

      if (!promediosPorCategoriaPas[categoria]) {
        promediosPorCategoriaPas[categoria] = {
          suma: 0,
          cantidad: 0
        };
      }

      promediosPorCategoriaPas[categoria].suma += promedio;
      promediosPorCategoriaPas[categoria].cantidad++;
    });

    // convertir los objetos en arrays: 
    let arrayPasados = Object.values(pasados);
    let arrayFuturos = Object.values(futuros);
    let arrayGananciasPorCategoriaFut = Object.values(gananciasPorCategoriaFut);
    let arrayPromediosPorCategoriaFut = Object.values(promediosPorCategoriaFut);
    let arrayGananciasPorCategoriaPas = Object.values(gananciasPorCategoriaPas);
    let arrayPromediosPorCategoriaPas = Object.values(promediosPorCategoriaPas);
    let subCategoriasPas = Object.entries(gananciasPorCategoriaPas);
    let subCategoriasFut = Object.entries(gananciasPorCategoriaFut);
    let categoriasPas = [];
    let categoriasFut = [];
    let arrayTablaPas = [];
    let arrayTablaFut = [];

    for (let i = 0; i < subCategoriasPas.length; i++) {
      categoriasPas.push(subCategoriasPas[i][0]);
    }
    for (let i = 0; i < subCategoriasFut.length; i++) {
      categoriasFut.push(subCategoriasFut[i][0]);
    }
    for (let i = 0; i < categoriasPas.length; i++) {
      let promedio = arrayPromediosPorCategoriaPas[i].suma / arrayPromediosPorCategoriaPas[i].cantidad;
      let objetoNuevo = {
        categoria: categoriasPas[i],
        ganancias: arrayGananciasPorCategoriaPas[i],
        suma: arrayPromediosPorCategoriaPas[i].suma,
        cantidad: arrayPromediosPorCategoriaPas[i].cantidad,
        promedio: promedio
      };
      arrayTablaPas.push(objetoNuevo);
    }
    for (let i = 0; i < categoriasFut.length; i++) {
      let promedio = arrayPromediosPorCategoriaFut[i].suma / arrayPromediosPorCategoriaFut[i].cantidad;
      let objetoNuevo = {
        categoria: categoriasFut[i],
        ganancias: arrayGananciasPorCategoriaFut[i],
        suma: arrayPromediosPorCategoriaFut[i].suma,
        cantidad: arrayPromediosPorCategoriaFut[i].cantidad,
        promedio: promedio
      };
      arrayTablaFut.push(objetoNuevo);
    }


      // const promedioPromediosPorCategoria = promedios / Object.keys(promediosPorCategoriaFut).length;
      // consologueo todo lo que consegui hasta ahora: 
      console.log('Pasados:', pasados);
      console.log('Futuros:', futuros);
      console.log('Ganancias por categoría futura:', gananciasPorCategoriaFut);
      console.log('Promedios por categoría futura:', promediosPorCategoriaFut);
      console.log('Ganancias por categoría pasada:', gananciasPorCategoriaPas);
      console.log('Promedios por categoría pasada:', promediosPorCategoriaPas);
      console.log('Array de pasados', arrayPasados);
      console.log('Array de futuros', arrayFuturos);
      console.log('Ganancias por categoría futura:', arrayGananciasPorCategoriaFut);
      console.log('Promedios por categoría futura:', arrayPromediosPorCategoriaFut);
      console.log('Ganancias por categoría pasada:', arrayGananciasPorCategoriaPas);
      console.log('Promedios por categoría pasada:', arrayPromediosPorCategoriaPas);
      console.log('sub array fut', subCategoriasFut);
      console.log('sub array pas', subCategoriasPas);
      console.log('arrays con arrays de categorias pasadas',categoriasPas);
      console.log('arrays con arrays de categorias futuros',categoriasFut);
      console.log('array posta y definitivo de lo que necesito pasado',arrayTablaPas);
      console.log('array posta y definitivo de lo que necesito futuro',arrayTablaFut);

      printSecondTable()
      printThirdTable()


    }
  catch (error) {
      console.log("el error es el siguiente: " + error.message)
    }

  }
getApi()

  const primerTabla = document.getElementById('primerTabla');
  const segundaTabla = document.getElementById('segundaTabla');
  const tercerTabla = document.getElementById('tercerTabla');