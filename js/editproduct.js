var token = localStorage.getItem('token');
var product=localStorage.getItem('product');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}
/*if (product) {
    product = product.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}*/
//product="5cd89125e2c99892b09d89c0"



$.ajax(
  {
      url : 'https://skin-care2019.herokuapp.com/products/'+product,
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      type: "GET",
      dataType: "json",
      success: function(data){
        $("#nombre").append(String(data.name));
       
        $("#imagen").val((String(data.image)));
        $("#price").val(String(data.price));
        $("#content").val(String(data.content));

        document.getElementById("anti-aging").checked=data.anti_aging;
        document.getElementById("hipoalergenico").checked=data.hypoallergenic;
        document.getElementById("paraben-free").checked=data.paraben_free;
        document.getElementById("perfume").checked=data.perfume;
        
        $("#ingredientes").val(`${data.ingredients.join(', ')}`)
        $("#skin_type").val(`${data.skin_type.join(', ')}`)
        
    },

    error: function (error_msg){
      alert("Algo salió mal, intenta recargar la pagina");
    }
  }
);



$('#add_button').on('click', function(){
    var ingredients=document.getElementById("ingredientes").value;
    ingredients=ingredients.split(',');
    var skin_type=document.getElementById("skin_type").value;
    skin_type=skin_type.split(',');
    var typee=document.getElementById("tipo").options[document.getElementById("tipo").selectedIndex].text;

    var anti_aging=document.getElementById("anti-aging").checked;
    var hypoallergenic=document.getElementById("hipoalergenico").checked;
    var paraben_free=document.getElementById("paraben-free").checked;
    var perfume=document.getElementById("perfume").checked;

    var content=parseFloat(document.getElementById("content").value);
    var price=parseFloat(document.getElementById("price").value);
    json_to_send = {
      "ingredients": ingredients,
      "skin_type":skin_type,

      "typee":typee,
      "anti_aging":anti_aging,
      "hypoallergenic":hypoallergenic,
      "paraben_free":paraben_free,
      "perfume":perfume,
      "content":content,
      "price":price,
    };
    json_to_send = JSON.stringify(json_to_send);
    console.log(json_to_send)
  
    $.ajax({
      //url: 'http://localhost:3000/users/login',
      url: 'https://skin-care2019.herokuapp.com/products/'+product,
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'PATCH',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        // guardar token en localstorage o cookie
        
        //localStorage.setItem('token', data.token)
        window.location = './home.html'
      },
      error: function(error_msg) {
        alert("Error, algo salió mal, verifica que los campos estén correctos");
      }
    });
    
  })