$(document).ready(getReservation);
function getReservation() {
    $("#info").removeAttr("style");
    hideForm();

    $.ajax({
        url: "http://localhost:8080/api/Client/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            clientes = respuesta
            cargarClientes(clientes);
            
        }
    });
    $.ajax({
        url:"http://localhost:8080/api/Quadbike/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            cuatrimotos = respuesta
            cargarQuadbike(cuatrimotos);
        }
    });


    $.ajax({
        dataType: 'json',
        url: "http://localhost:8080/api/Reservation/all",
        type: "GET",
        success: function (response) {            
            var misItems = response;
            for (let i = 0; i < misItems.length; i++) {
                $("#allItems").append("<tr>");
                $("#allItems").append("<td>" + misItems[i].idReservation + "</td>");
                $("#allItems").append("<td>" + misItems[i].quadbike.name+ "</td>");
                $("#allItems").append("<td>" + misItems[i].status+ "</td>");
                $("#allItems").append("<td>" + misItems[i].client.idClient + ' '+ misItems[i].client.name + ' ' + misItems[i].client.email + "</td>");
                $("#allItems").append("<td>"+'<button class="btn btn-link" onclick="score(' + misItems[i].score + ')">'+ (misItems[i].score==null)? "0" :misItems[i].score +'</button>'+"</td>");
                $("#allItems").append("</tr>");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}


function cargarClientes(clientes) {
    var opciones;
    for (var i = 0; i < clientes.length; i++) {
        opciones += `
            <option value="${clientes[i].idClient}">${clientes[i].name}</option>`;
    }
    $("#client").html(opciones);
}

function cargarQuadbike(cuatrimotos) {
    var opciones;
    for (var i = 0; i < cuatrimotos.length; i++) {
        opciones += `
            <option value="${cuatrimotos[i].id}">${cuatrimotos[i].name}</option>`;
    }
    $("#quadbike").html(opciones);
}


function postReservation() {
    var elemento = {
        startDate: $("#startDate").val(),
        devolutionDate: $("#devolutionDate").val(),
        quadbike:{ id: +$("#quadbike").val() },
        client:{ idClient: +$("#client").val() },

    }

    console.log(elemento)
    $.ajax({
        dataType: "json",
        data: elemento,
        url: "http://localhost:8080/api/Reservation/save",
        type: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(elemento),
        statusCode: {
            201: function () {
                alert('Se ha registrado la reserva');
                window.location.reload()
            }
        }
    });
}

function showForm() {
    $("#formPost").removeAttr("style");
    $("#btnGuardar").removeAttr("style");
    getReservation();
    hideTable();
}

function hideForm() {
    $("#formPost").attr("style", "display: none");
    $("#btnGuardar").attr("style", "display: none");
}

function hideTable(){
    $("#info").attr("style", "display: none");
}
