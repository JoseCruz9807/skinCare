localStorage.setItem('token', "")
$('#login_button').on('click', function(){
  // cargar email y password
  var email=document.getElementById("email").value;
  var password=document.getElementById("password").value;
  console.log(email)
  json_to_send = {
    "email": email,
    "password" : password
  };

  json_to_send = JSON.stringify(json_to_send);

  $.ajax({
    //url: 'http://localhost:3000/users/login',
    url: 'https://skin-care2019.herokuapp.com/users/login',
    headers: {
        'Content-Type':'application/json'
    },
    method: 'POST',
    dataType: 'json',
    data: json_to_send,
    success: function(data){
      // guardar token en localstorage o cookie
      
      localStorage.setItem('token', data.token)
      localStorage.setItem('tipo', data.user.typee)
      window.location = './home.html'
    },
    error: function(error_msg) {
      alert("Error, contraseña o correo inválido");
    }
  });
})