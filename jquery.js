
$(document).ready(() => {
    
    const URLGET = "https://jsonplaceholder.typicode.com/posts";

    //Desactivar formularios que no deben verse al cargar la pagina
    $("#soliDatosSol").hide();
    $("#soliDatosDol").hide();
    $(".padreFlex3").hide();
    $(".padreFlex4").hide();
    $(".cajas").hide();


    //BOTON simular soles
    $("#simuSoles").on("click", () => {

        $("#soliDatosSol").show();
        moneda = "Soles"
        $("#simuSoles").prop('disabled', true);  // desactivar boton simulacion soles
        $("#simuDolar").prop('disabled', true); // desactivar boton simulacion dolares

        $("#clickLimpiarSoles").on("click", () => {
            location.reload();

        })

        // calcular plazo en soles
        $("#clickCalcularSoles").on("click", () => {
            nombre = $("#nombreSol").val();
            importe = 0 + parseFloat($("#importeSol").val());
            calculoInteres();
            mostrarResultado();
            $("#soliDatosSol").hide();
        })

    })

    //BOTON simular dolares
    $("#simuDolar").on("click", () => {

        $("#soliDatosDol").show();
        moneda = "Dolares"
        $("#simuSoles").prop('disabled', true) // desactivar boton simulacion soles
        $("#simuDolar").prop('disabled', true); // desactivar boton simulacion dolares

        $("#clickLimpiarDolar").on("click", () => {
            location.reload();
        })

        //calcular plazo en dolares
        $("#clickCalcularDolar").on("click", () => {
            nombre = $("#nombreDol").val();
            importe = 0 + parseFloat($("#importeDol").val());
            calculoInteres();
            mostrarResultado();
            $("#soliDatosDol").hide();
        })

    })

    // DIV padreFinal 2 botones
    $("#nuevaConsulta").on("click", () => { location.reload(); })
    $("#enviarDatos").on("click", () => { $("#formEnviarDatos").show(); })

    // BOTON enviarforDatos que esta dentro del DIV formEnviarDatos
    $("#enviarformDatos").on("click", () => {

        nombre = $("#nombreSol1").val();
        correo = $("#correoElec").val();
        telefono = $("#telefono").val();

        const datCliente = {
            nombre: nombre,
            correo: correo,
            telefono: telefono,
        }
        localStorage.setItem('InfoCliente', JSON.stringify(datCliente));

        $.post(URLGET, datCliente, (respuesta, estado) => {
            console.log(respuesta);
            $("#formEnviarDatos").hide();

            if (estado == "success") {
                $("#respuestaFinal").show();
                $("#respuestaFinal").prepend(` <h3> Sus datos se enviaron satisfactoriamente ${respuesta.nombre}</h3>`);
                $("#respuestaFinal").prepend(`<input type="button" value="Aceptar" id="regresar">`);

                $("#regresar").on("click", () => {
                    $("#respuestaFinal").hide();
                    $("#enviarDatos").prop('disabled', true);
                })
            }
        })
    })
})
