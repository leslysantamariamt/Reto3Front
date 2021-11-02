$(document).ready(getMessage);
function getMessage() {
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
        url: "http://localhost:8080/api/Message/all",
        type: "GET",
        success: function (response) {
            var misItems = response;
            for (let i = 0; i < misItems.length; i++) {
                $("#allItems").append("<tr>");
                $("#allItems").append("<td>" + misItems[i].messageText + "</td>");
                $("#allItems").append("<td>" + misItems[i].quadbike.name + "</td>");
               $("#allItems").append("<td>" + misItems[i].client.name + "</td>");
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

function postMessage() {
    let var2 = {
        
        messageText:$("#messageText").val(),
        quadbike:{ id: +$("#quadbike").val() },
        client:{ idClient: +$("#client").val() },

        };
       
        console.log(var2);
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"http://localhost:8080/api/Message/save",
       
        
        success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            window.location.reload()
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("No se guardo correctamente");
    
    
        }
        });  

}


function showForm() {
    $("#formPost").removeAttr("style");
    $("#btnGuardar").removeAttr("style");    
    hideTable();
    
    
}

function hideForm() {
    $("#formPost").attr("style", "display: none");
    $("#btnGuardar").attr("style", "display: none");
}

function hideTable(){
    $("#info").attr("style", "display: none");
}



