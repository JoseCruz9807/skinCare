var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}

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
        var email=document.getElementById("email");
        var age=document.getElementById("age");
        var name=document.getElementById("name");
        email.value=data.email;
        age.value=data.age;
        name.value=data.name;
    },
    error: function(error_msg) {
      alert("Algo salió mal, recarga la pagina");
    }
  });

$('#signup_button').on('click', function(){
    // cargar los valores de password, email, name, age
    var email=document.getElementById("email").value;
    var password=document.getElementById("password").value;
    var age=document.getElementById("age").value;
    var name=document.getElementById("name").value;
    if(password=="" || password==null){
        var json_to_send = {
            "email": email,
            "name": name,
            "age": age
          };
    }
    else{
        var json_to_send = {
          "password" : password,
            "email": email,
            "name": name,
            "age": age
          };
    }

    console.log(json_to_send)
    json_to_send = JSON.stringify(json_to_send);
  
    $.ajax({
      //url: 'http://localhost:3000/users',
       url: 'https://skin-care2019.herokuapp.com/users',
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'PATCH',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        alert("Información actualizada con exito");
        //console.log('success: '+ data);
        window.location = './index.html'
      },
      error: function(error_msg) {
        alert((error_msg['responseText']));//"Algo salió mal, verifica que todos los campos hayan sido llenados de forma correcta y vuelve a intentar");
      }
    });
  
  });