// declaraciones 
let urlAPI = "https://mindhub-xj03.onrender.com/api/amazing"



let getApi = async () => {
    try {
        let respuesta = await fetch(urlAPI);
        let datosCrudos = await respuesta.json();

        let events = datosCrudos.events;
        // Hasta aca recupero los datos de la api y los transformo en un array de objetos manejables

        // eventos
        printfirstTable()

        // funciones 
        function highAttendance(arrayData){
            let mayorPorcentaje = 0;
            let altaAsistencia = "";
            arrayData.forEach(event => {
                const porcentaje = (event.assistance / event.capacity) * 100;
                if (porcentaje > mayorPorcentaje){
                    mayorPorcentaje = porcentaje
                    altaAsistencia = event.name
                }
            });
            return `${altaAsistencia} (${mayorPorcentaje})` ;
        }

        function minAttendance(arrayData){
            let menorPorcentaje = Infinity;
            let bajaAsistencia = "";
            arrayData.forEach(event => {
                const porcentaje = (event.assistance / event.capacity) * 100;
                if (porcentaje < menorPorcentaje){
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
            
            return `${eventoMayorCapacidad.name} (${eventoMayorCapacidad.capacity})` ;
          }
          
        // aca estoy viendo los resultados de los funciones de la primer tabla 
        console.log(`${highAttendance(events)} ${minAttendance(events)} ${maxCapacity(events)}`);
          
        // se imprime la primera tabla

          function printfirstTable(){
            primerTabla.innerHTML =`
            <td>${highAttendance(events)} </td>
            <td>${minAttendance(events)}</td>
            <td> ${maxCapacity(events)}</td>
            `    
        }
          // tratar de hacer los filtrados para la segunda y tercer tablas
        function estadisticasPorCategoria(arrayData, categoriaBuscada) {
            const eventosFiltrados = arrayData.filter(evento => evento.category === categoriaBuscada);
            
            const sumaGanancias = eventosFiltrados.reduce((acumulador, evento) => {
              return acumulador + (evento.estimate * evento.price);
            }, 0);
            
            const promedioAsistencia = eventosFiltrados.reduce((acumulador, evento) => {
              return acumulador + (((evento.estimate/evento.capacity)*100 )/ eventosFiltrados.length);
            }, 0);
            
            return {
              categoria: categoriaBuscada,
              ganancias: sumaGanancias,
              promedioAsistencia: promedioAsistencia              
            };
          }estadisticasPorCategoria(events)

    }
    catch (error) {
        console.log("el error es el siguiente: " + error.message)
    }

}
getApi()

const primerTabla = document.getElementById('primerTabla');
const segundaTabla = document.getElementById('segundaTabla');
const tercerTabla = document.getElementById('tercerTabla');