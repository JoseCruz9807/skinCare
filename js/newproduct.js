var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}

$('#add_button').on('click', function(){
    // cargar email y password
    var name=document.getElementById("nombre").value;
    var brand=document.getElementById("marca").value;
    var ingredients=document.getElementById("ingredientes").value;
    ingredients=ingredients.split(',');
    var skin_type=document.getElementById("skin_type").value;
    skin_type=skin_type.split(',');
    var typee=document.getElementById("tipo").value;

    var anti_aging=document.getElementById("anti-aging").checked;
    var hypoallergenic=document.getElementById("hypoallergenic").checked;
    var paraben_free=document.getElementById("paraben-free").checked;
    var perfume=document.getElementById("perfume").checked;
    var image=document.getElementById("imagen").value;
    var content=parseFloat(document.getElementById("content").value);
    var price=parseFloat(document.getElementById("price").value);
    json_to_send = {
      "name": name,
      "brand" : brand,
      "ingredients": ingredients,
      "skin_type":skin_type,

      "typee":typee,
      "anti_aging":anti_aging,
      "hypoallergenic":hypoallergenic,
      "paraben_free":paraben_free,
      "perfume":perfume,
      "content":content,
      "price":price,
      "image":image
    };
    json_to_send = JSON.stringify(json_to_send);
    console.log(json_to_send)
  
    $.ajax({
      //url: 'http://localhost:3000/users/login',
      url: 'https://skin-care2019.herokuapp.com/products',
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'POST',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        // guardar token en localstorage o cookie
        console.log("SUCCESS")
        alert("Producto agregado correctamente");
        //localStorage.setItem('token', data.token)
        //window.location = './home.html'
      },
      error: function(error_msg) {
        alert("Algo salió mal, verifica que todos los campos sean llenados correctamente");
      }
    });
    
  })