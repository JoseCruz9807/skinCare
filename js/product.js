var token = localStorage.getItem('token');
var product=localStorage.getItem('product');
var tipo=localStorage.getItem('tipo');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}
if (product) {
    product = product.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}
/*if(tipo){
    console.log(tipo)
    tipo=tipo.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}*/
product="5cd89125e2c99892b09d89c0"
/*
1. Función que muestra y esconde la sección para hacer comentarios 
   al hacer click el botón "Escribe una reseña". 
   on click!
   (10 puntos)
*/
$("#escribe_reseña").on('click', function(event){
    let $comentatio = $("#seccion_comentario");
    $comentatio.toggleClass("hidden");
  });
  
  /*
  ```
  2. Cargar los comentarios de el archivo comentarios.xml o bien de 
    https://barbaragabriela.github.io/misc/ 
    (función ajax, 30 puntos)
  ```
  */
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
          let new_html="";
          for( i=0;i<data.comments.length;i++){
            new_html+=`
            <div class="review commentBox">
              <div class="nombre">
                ${data.comments[i].author} </br>
              </div> 
              <div class="stars">
                  ${getStarsSpans(parseInt(data.comments[i].rating))}
              </div>
              ${data.comments[i].description}
            </div>
                
            `;
          }
          $("#seccion_reviews").append(new_html);
          console.log(data.name)
          $("#titulo").append(String(data.name));
          $("#calificacion").append(`<div class='stars'>${getStarsSpans(parseInt(data.totalRate))}</div>`)
          $("#comentarios").append(`${Number((data.generalSentiment).toFixed(1))}`)
          $("#marca").append(String(data.brand));
          $("#tipo").append(String(data.typee));
          $("#precio").append("$"+String(data.price));
          $("#contenido").append(String(data.content)+" ml");
          console.log(data.image)
          document.getElementById("imagen").src=String(data.image);
          if(data.anti_aging){
            $("#anti-aging").append("Si");
          }
          else{
            $("#anti-aging").append("No");
          }
          if(data.hypoallergenic){
            $("#hipoalergenico").append("Si");
          }
          else{
            $("#hipoalergenico").append("No");
          }
          if(data.paraben_free){
            $("#paraben-free").append("Si");
          }
          else{
            $("#paraben-free").append("No");
          }
          if(data.perfume){
            $("#perfume").append("Si");
          }
          else{
            $("#perfume").append("No");
          }
          $("#ingredientes").append(`<div>${data.ingredients.join(', ')}</div>`)
          $("#tipoPiel").append(`<div>${data.skin_type.join(', ')}</div>`)
          if(tipo=='admin'){
              $('#eliminar').removeClass("hidden");
              $('#editar').removeClass("hidden");
          }
          else{
            $('#eliminar').disabled=true;
            $('#editar').disabled=true;
          }
          
      },
  
      error: function (error_msg){
        alert("Algo salió mal, intenta recargar la pagina");
      }
    }
  );
  
  /*
  ```
  3. Funcion que apendiza el nuevo comentario al darle click a PUBLICAR
    on click!
    (función, 35 puntos)
  ```
  */
  $("#btn-publicar").on('click', function(event){
    $.ajax({
        //url: 'http://localhost:3000/users',
         url: 'https://skin-care2019.herokuapp.com/users',
        headers: {
            'Content-Type':'application/json',
            'Authorization': 'Bearer ' + token
        },
        method: 'GET',
        dataType: 'json',
        data: "",
        success: function(data){

            let $comentario = $("#comentario");
            let $error= $("#error_comment");
            
            if($comentario.text()==""){
              $error.removeClass("hidden");
            }
            else{
              let star=0;
              for(let i=0;i<5;i++){
                let $stars = $("#star"+(i+1));
                if($stars.is(':checked')){
                  star=i+1;
                }
              }
              let new_html=`
                         <div class="review commentBox">
                          <div class="nombre">
                            ${data.name} </br>
          
                          </div> 
                          <div class="stars">
                              ${getStarsSpans(parseInt(star))}
                          </div>
                          ${$comentario.text()}
                        </div>
              `
              
              json_to_send = {
                description: $comentario.text(),
                author: data.name,
                rating: parseInt(star),
                createdBy: data._id,
                belongsTo:product,
              }

              $("#seccion_reviews").append(new_html);
              $error.addClass("hidden");
              $comentario.text("");
              let $comentatio = $("#seccion_comentario");
              $comentatio.toggleClass("hidden");

              json_to_send = JSON.stringify(json_to_send);
              console.log(json_to_send)
              $.ajax({
                //url: 'http://localhost:3000/users/login',
                url: 'https://skin-care2019.herokuapp.com/comments/'+product,
                headers: {
                    'Content-Type':'application/json',
                    'Authorization': 'Bearer ' + token
                },
                method: 'POST',
                dataType: 'json',
                data: json_to_send,
                success: function(data){
                  // guardar token en localstorage o cookie
                  
                  //localStorage.setItem('token', data.token)
                  //window.location = './home.html'
                },
                error: function(error_msg) {
                  alert("Error, algo salió mal, verifica que los campos estén correctos o recarga la pagina");
                }
              });

            }

        },
        error: function(error_msg) {
          alert("Algo salió mal, recarga la pagina");
        }
      });
  });

  $("#eliminar").on('click', function(event){
      var confirmacion=confirm("¿Seguro que desea borrar el producto?");
      if (confirmacion == true) {
        $.ajax({
            //url: 'http://localhost:3000/users',
            url: 'https://skin-care2019.herokuapp.com/products/'+producto,
            headers: {
                'Content-Type':'application/json',
                'Authorization': 'Bearer ' + token
            },
            method: 'DELETE',
            dataType: 'json',
            data: "",
            success: function(data){
                window.location = './edituser.html'
            },
            error: function(error_msg) {
            alert("Algo salió mal, recarga la pagina");
            }
        });
    }
  });

  $("#editar").on('click', function(event){
    window.location = './editproduct.html'
 });
  
  /*
  
  ```
  4. Funcion que limpia el nombre, el email y el div "#comentarios" al darle
     click en "btn-limpiar" con leyenda de "CANCELAR"
     on click!
    (5 puntos)
  ```
  */
  $("#btn-limpiar").on('click', function(event){
    let $comentario = $("#comentario");
    let $error= $("#error_comment");
    $error.addClass("hidden");
    $comentario.text("");
  });
  /*
  ```
  Funcion que recibe un numero de stars y regresa los 5 spans 
  que simbolizan las estrellas del rating. por ejemplo:
  let stars = 3;
  let html = getStarsSpans(stars);
  
  html = "
  <span class="fa fa-star checked"></span>
  <span class="fa fa-star checked"></span>
  <span class="fa fa-star checked"></span>
  <span class="fa fa-star"></span>
  <span class="fa fa-star"></span>
  "
  ```
  */
  function getStarsSpans(stars) {
    let new_html = "";
    for( let i = 0; i < stars; i++) {
      new_html += `
        <span class="fa fa-star checked"></span>
      `;
    }
  
    for ( let i = 0; i < 5 - stars; i++ ) {
      new_html += `
        <span class="fa fa-star notchecked"></span>
      `;
    }
  
    return new_html;
  }
  