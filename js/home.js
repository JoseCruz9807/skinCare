var token = localStorage.getItem('token');
var product=localStorage.getItem('product');
var tipo=localStorage.getItem('tipo');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}

if(tipo!='admin'){
  document.getElementById('barraMenu').children[2].style.display='none'
}


$.ajax(
    {
        url : 'https://skin-care2019.herokuapp.com/products',
        headers: {
            'Content-Type':'application/json',
            'Authorization': 'Bearer ' + token
        },
        type: "GET",
        dataType: "json",
        success: function(data){
          let new_html="";
          for( i=0;i<data.length;i++){
            new_html+=`
            <div class="col-4 col-6-medium col-12-small imagenProducto">
                <section >
                    <div id="imageContainer"><img src=${String(data[i].image)} alt="${String(data[i]._id)}" id="image" onclick="myfunction(this)"/></div>
                    <header>
                        <h3>${String(data[i].name)}</h3>
                    </header>
                    <div class="stars centroProductos">
                        ${getStarsSpans(parseInt(data[i].totalRate))}
                     </div>
                    <p class="centroProductos">Calificación: ${Number((data[i].generalSentiment).toFixed(1))} </br>
                    Tipo: ${String(data[i].typee)}
                    </p>
                    </br>
                </section>
            </div>
            `;
          }
          $("#containerProductos").append(new_html);
      },
  
      error: function (error_msg){
        alert("Algo salió mal, intenta recargar la pagina");
      }
    }
  );
  
  function myfunction(id){
      //console.log(id.id)
      localStorage.setItem('product', String(id.alt))
      window.location = './product.html'
  }

  function editPerfil(id){
    
    window.location = './edituser.html'
}

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
  