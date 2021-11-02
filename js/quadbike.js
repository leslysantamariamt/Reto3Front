$(document).ready(getQuadbike);
$(document).ready(autoInicio);

function getQuadbike() {
    $("#info").removeAttr("style");
    hideForm();
    $.ajax({
        dataType: 'json',
        url: "http://localhost:8080/api/Quadbike/all",
        type: "GET",
        success: function (response) { 
            console.log(response)          
            var misItems = response;
            for (let i = 0; i < misItems.length; i++) {
                $("#allItems").append("<tr>");
                $("#allItems").append("<td>" + misItems[i].name + "</td>");
                $("#allItems").append("<td>" + misItems[i].brand + "</td>");
                $("#allItems").append("<td>" + misItems[i].year + "</td>");
                $("#allItems").append("<td>" + misItems[i].description + "</td>");
                $("#allItems").append("<td>" + misItems[i].category.name==null? "No hay categorias":misItems[i].category.name  + "</td>");
                $("#allItems").append("</tr>");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
function autoInicio() {
    console.log("Se esta ejecutando el autoinicio");
    $.ajax({
        url: "http://localhost:8080/api/Category/all",
        type: "GET",
        dataType: 'json',
        success: function (json) {   
            console.log(json);
            categorias = json;
            show(json);   
        }, 
    }) 
  
}

function show(json){
    var opciones;            
    for (var i = 0; i < json.length; i++) {
        opciones +=`
            <option value="${json[i].id}">${json[i].name}</option>`;               
    };
    $("#categoryname").html(opciones);
}

function postQuadbike() {
    $("#formPost").removeAttr("style");
let var2 = {

        brand:$("#brand").val(),
        name:$("#nameQuadbike").val(),
        year:$("#year").val(),
        description:$("#descriptionQuadbike").val(),
        category: {id:+$("#categoryname").val()},
    };

    console.log(var2.category);

   
    $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"http://localhost:8080/api/Quadbike/save",
    
        
        success:function(json,status,xhr) {
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
    $("#btnGuardarCuatrimoto").removeAttr("style");
    hideTable();
    autoInicio();
}

function hideForm() {
    $("#formPost").attr("style", "display: none");
    $("#btnGuardarCuatrimoto").attr("style", "display: none");
}

function hideTable(){
    $("#info").attr("style", "display: none");
}