var token = localStorage.getItem('token');
var product=localStorage.getItem('product');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
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
            <div class="col-4 col-6-medium col-12-small">
                <section>
                    <a id="imageContainer "class="image featured"><div id="imageContainer"><img src=${String(data[i].image)} alt="${String(data[i]._id)}" id="image" onclick="myfunction(this)"/></div></a>
                    <header>
                        <h3>${String(data[i].name)}</h3>
                    </header>
                    <div class="stars">
                        ${getStarsSpans(parseInt(data[i].totalRate))}
                     </div>
                    <p>Comentarios: ${Number((data[i].generalSentiment).toFixed(1))} </br>
                    Tipo: ${String(data[i].typee)}
                    </p>
                    </br>
                </section>
            </div>
            `;
          }
          $("#container").append(new_html);
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
  