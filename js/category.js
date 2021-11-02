$(document).ready(getCategory);
function getCategory() {
    $("#info").removeAttr("style");
    hideForm();
    $.ajax({
        dataType: 'json',
        url: "http://localhost:8080/api/Category/all",
        type: "GET",
        success: function (response) {
            console.log(response)
            var misItems = response;
            for (let i = 0; i < misItems.length; i++) {
                $("#allItems").append("<tr>");
                $("#allItems").append("<td>" + misItems[i].name + "</td>");
                $("#allItems").append("<td>" + misItems[i].description + "</td>");
             //   $("#allItems").append("<td>" + (misItems[i].quadbikes[i].name==null)?"No hay Cuatrimotos": misItems[i].quadbikes[i].name + "</td>");
                $("#allItems").append("</tr>");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}



function postCategory() {
    let var2 = {
        
        name:$("#nameCategory").val(),
        description:$("#descriptionCategory").val(),
     
        };
       
        console.log(var2);
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"http://localhost:8080/api/Category/save",
       
        
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