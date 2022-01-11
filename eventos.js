// TITULO
let tituloS= document.getElementById('titulo')
tituloS.style.color="black"
tituloS.style.textAlign ="center"

const arrayTasas = new Array();
const URLJSON = "plazos.json"


async function getElements() {
    await $.getJSON ( URLJSON, function (respuesta, estado) {
        if (estado == "success") {
            let misDatos = respuesta.tasas1;
            for (const dato of misDatos) {

                let tad = new Tasa(dato);
                arrayTasas.push(tad);

            }
        } else {
            console.log(estado);
        }

    })
    mostrarTasas();
}

//funcion para mostrar tasas en index
function mostrarTasas(){
arrayTasas.forEach((item) => {
    $("#tasasTodos").prepend(`<div class="padreTasa"> 
                                <div> 
                                    <h3> ${item.plazo}</h3> 
                                </div> 
                                <div> 
                                    <h3> ${item.tiempo} días </h3> 
                                        </div>  <div> 
                                    <h3> ${item.teaS} </h3> 
                                </div> 
                                <div> 
                                    <h3> ${item.teaD} </h3> 
                                </div> 
                            </div>`);
})
$("#botonesTasa").prepend(`<div> </div> <div> </div> <div>  </div><div> <button id="simuSoles">Simular</button> </div> <div> <button id="simuDolar">Simular</button></div>`);
}


const arrayCliente = []
let nombre
let importe 
let moneda



//funcion para calcular los intereses del plazo fijo
function calculoInteres() {

    if (moneda == "Soles") {
        for (let i = 0; i < arrayTasas.length; i++) {
            let tasa = (arrayTasas[i])
            let interes = parseFloat((importe * (tasa.teaS * tasa.tiempo / 365)).toFixed(2))
            let totalaPagar = importe + interes
            let plazoI = 0 + tasa.plazo
            let plazos = { nombre, importe, moneda, plazoI, interes, totalaPagar }
            arrayCliente.push(plazos)
        }
    } else if (moneda == "Dolares") {
        for (let i = 0; i < arrayTasas.length; i++) {
            let tasa = (arrayTasas[i])
            let interes = parseFloat((importe * (tasa.teaD * tasa.tiempo / 365)).toFixed(2))
            let totalaPagar = importe + interes
            let plazoI = 0 + tasa.plazo
            let plazos = { nombre, importe, moneda, plazoI, interes, totalaPagar }
            arrayCliente.push(plazos)
        }
    }
    localStorage.setItem('listaCliente',JSON.stringify(arrayCliente));
}




//var guardado = localStorage.getItem('listaCliente');
//console.log('Lista Cliente: ', JSON.parse(guardado));


// funcion para mostrar resultados de calculo de plazo fijo
function mostrarResultado() {
    let padre = document.getElementById("resultadoPlazos");

    //Colocamos como cabezera el nombre del cliente
    let nombre = document.createElement("h3");
    //le asigno el nombre del objeo   
    nombre.textContent = (arrayCliente[0].nombre).toUpperCase();

       //Iteramos el array con for

    //creo una nueva ol
    let newList = document.createElement("ol");
    for (let i = 0; i < arrayCliente.length; i++) {


        //guardo el objeto que esta en la posicion i del arreglo
        let objeto = arrayCliente[i];

        //creo un nuevo li
        let newSubList = document.createElement("li");

        //creo un h3
        let plazo = document.createElement("h3");
        //le asigno el nombre del objeo   
        plazo.textContent = `Plazo: ${objeto.plazoI} meses `

        //creo una nueva ul
        let newUl = document.createElement("ul");

        //creo los diferentes items
        let li_importe = document.createElement("li");
        li_importe.textContent = `Importe: ${objeto.importe}`;

        let li_moneda = document.createElement("li");
        li_moneda.textContent = `Moneda: ${objeto.moneda}`;

        let li_interes = document.createElement("li");
        li_interes.textContent = `Interes: ${objeto.interes}`

        let li_total = document.createElement("li");
        li_total.textContent = `Total a Pagar: ${objeto.totalaPagar}`;

        //agrego los items a la ul
        newUl.appendChild(li_importe);
        newUl.appendChild(li_moneda);
        newUl.appendChild(li_interes);
        newUl.appendChild(li_total);

        //agrego el h3 y la ul 
        newSubList.appendChild(plazo);
        newSubList.appendChild(newUl);

        //agrego todo a la nueva lista
        newList.appendChild(newSubList);

    }

    //agrego la lista completa a div

    padre.appendChild(nombre)
    padre.appendChild(newList)

    $("#padreFinal").show();


}
