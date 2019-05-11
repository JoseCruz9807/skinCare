var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}


var todos = document.querySelectorAll("input[type=checkbox]");

function updateTodo(elemento){//(id, completed) {
  // revisen si completed es booleano o string
  //var ulUn = document.getElementById("unfinished-list");
  //var ulFi = document.getElementById("finished-list");
  var id=elemento.value
  alert(id)
  if(elemento.checked){
    completed=true
    //ulFi.appendChild(elemento)
    //$(elemento).parent().remove();
  }
  else{
    completed=false
    //ulUn.appendChild(elemento)
    //$(elemento).parent().remove();
  }
  json_to_send = {
    "completed" : completed
  };
  json_to_send = JSON.stringify(json_to_send);
  $.ajax({
      //url: 'http://localhost:3000/todos/' + id,
      url: 'https://mini-web-server9807.herokuapp.com/todos/'+id,
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'PATCH',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        console.log("UPDATE!!")
      },
      error: function(error_msg) {
        alert((error_msg['responseText']));
      }
    });
}


function loadTodos() {
  $.ajax({
    //url: 'http://localhost:3000/todos',
    url: 'https://mini-web-server9807.herokuapp.com/todos',
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'GET',
    dataType: 'json',
    success: function(data){
      console.log(data)

      for( let i = 0; i < data.length; i++) {
        // aqui va su código para agregar los elementos de la lista
        console.log(data[i].description)
        // algo asi:
         addTodo(data[i]._id, data[i].description, data[i].completed)
      }
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
    }
  });
}

loadTodos()


// o con jquery
// $('input[name=newitem]').keypress(function(event){
//     var keycode = (event.keyCode ? event.keyCode : event.which);
//     if(keycode == '13'){
//         $.ajax({})
//     }
// });

var input = document.querySelector("input[name=newitem]");

input.addEventListener('keypress', function (event) {
  if (event.charCode === 13) {
    json_to_send = {
      "description" : input.value
    };
    json_to_send = JSON.stringify(json_to_send);
    $.ajax({
      //url: 'http://localhost:3000/todos',
       url: 'https://mini-web-server9807.herokuapp.com/todos',
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'POST',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        console.log(data._id,data.description,false)
        addTodo(data._id,data.description,false)
        
      },
      error: function(error_msg) {
        alert((error_msg['responseText']));
      }
    });
    input.value = '';
  }
})

function addTodo(id, todoText, completed) {
  var valor = id//document.getElementsByTagName("span").length+1;
  var ulUn = document.getElementById("unfinished-list");
  var ulFi = document.getElementById("finished-list");
  var li = document.createElement("LI");
  var span = document.createElement("SPAN");
  var descripcion = document.createTextNode(todoText);
  var input = document.createElement("INPUT");
  span.appendChild(descripcion);
  span.setAttribute("value", valor);
  input.setAttribute("type", "checkbox");
  input.setAttribute("name", "todo");
  input.setAttribute("value", valor);
  input.setAttribute("onclick", "updateTodo(this)");
  li.appendChild(input);
  li.appendChild(span);
  if (completed){
    //ulFi[0].insertAdjacentElement("afterbegin", li);
    ulFi.appendChild(li)
    input.checked=true
  }
  else{
    //ulUn[0].insertAdjacentElement("afterbegin", li);
    ulUn.appendChild(li)
    input.checked=false
  }
}