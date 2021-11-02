//  FUNCIONES PARA LOS CLIENTES 
$(document).ready(getClient);
function getClient() {
    $("#info").removeAttr("style");
    hideForm();
    $.ajax({
        dataType: 'json',
        url: "http://localhost:8080/api/Client/all",
        type: "GET",
        success: function (response) {
            var misItems = response;
            for (let i = 0; i < misItems.length; i++) {
                $("#allItems").append("<tr>");
                $("#allItems").append("<td>" + misItems[i].name + "</td>");
                $("#allItems").append("<td>" + misItems[i].email + "</td>");
                $("#allItems").append("<td>" + misItems[i].age + "</td>");
                $("#allItems").append("</tr>");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}



function postClient() {
    let var2 = {
        
        name:$("#nameClient").val(),
        email:$("#email").val(),
        password:$("#password").val(),
        age:$("#age").val(),
     
        };
       
        console.log(var2);
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"http://localhost:8080/api/Client/save",
       
        
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

function getQuadbikes(){
    $('#quadbike').empty().append('<option>Select a Quadbike</option>'); 
    $.ajax({
        dataType: 'json',
        url: "http://localhost:8080/api/Quadbike/all",
        type: "GET",
        success: function (response) {            
            var misItems = response;            
            for (let i = 0; i < misItems.length; i++) {
                $("#quadbike").append("<option>"+misItems[i].name+"</option>");                
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function showForm() {
    $("#formPost").removeAttr("style");
    $("#btnGuardar").removeAttr("style");    
    getQuadbikes();
    hideTable();
  
}

function hideForm() {
    $("#formPost").attr("style", "display: none");
    $("#btnGuardar").attr("style", "display: none");
}

function hideTable(){
    $("#info").attr("style", "display: none");
}