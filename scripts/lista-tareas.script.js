window.onload = () => {
  getTareas();
  cargarUserName();
  darkMode()
  document.forms.agregarTarea.addEventListener( 'submit', event => {
    event.preventDefault();
    agregarTarea();
    document.forms.agregarTarea.descripcionNuevaTarea.value = "";
    
  });
}

comprobarToken();
setInterval(() => {
  comprobarToken();
}, 100000)

function comprobarToken() {
  const token = RequestManager.getToken();
  if (!token) {
    location.href = './login.html'
  }
}

function crearTareas(tareas) {
  document.querySelector('ul.tareas-pendientes').innerHTML = '';
  document.querySelector('ul.tareas-terminadas').innerHTML = '';
  
  tareas.forEach(tarea => {
    renderizarTarea(tarea)
  })
}

function renderizarTarea(tarea) {
  const template = `
    <li class="tarea nueva animar-entrada">
      <div class="not-done" onclick='completarTarea(${tarea.id}, ${tarea.completed})'></div>
      <div class="descripcion">
        <p class="nombre">${tarea.description}</p>
        <p class="timestamp">Creada el: ${dayjs(tarea.createdAt).format('DD/MM/YYYY')}</p>
        <button class="eliminar"  onclick='eliminarTarea(${tarea.id})'><i class="fas fa-trash"></i></button>
      </div>
    </li>
  `;

  const contenedorTareas = document.querySelector('ul.tareas-pendientes');
  const contenedorTareasCompletas = document.querySelector('ul.tareas-terminadas');
  if (!tarea.completed) {
    contenedorTareas.innerHTML += template;
  } else {
    contenedorTareasCompletas.innerHTML += template;
  }
}

function agregarTarea() {
  const descripcion = document.forms.agregarTarea.descripcionNuevaTarea.value;
  const body = {
    description: descripcion,
    completed: false
  }

  RequestManager.post('/tasks', body)
  .then( tarea => {
    renderizarTarea(tarea);
  }).catch( err => {
    console.log(err);
  })
}


function getTareas() {
  RequestManager.get('/tasks')
  .then(tareas => {
    crearTareas(tareas);
  })
}

function completarTarea(id, completed) {
  let body = {completed:  !completed }; 
  RequestManager.put(`/tasks/${id}`, body)
  .then(tarea => {
    getTareas();
  }).catch(err => {
    console.log(err)
  })
}

function eliminarTarea(id) {
  Swal.fire({
    title: '¿Estás seguro de eliminar esta tarea?',
    text: "Ojota: no se puede revertir!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: 'A54BFF',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, quiero borrar esta tarea!',
    cancelButtonText: "Cancelar"
  }).then((result) => {
    // Validamos si el usuario confirma la acción
    if (result.isConfirmed) {
      RequestManager.delete(`/tasks/${id}`)
      .then(tarea => {
        document.querySelector('ul.tareas-pendientes').innerHTML = '';
        document.querySelector('ul.tareas-terminadas').innerHTML = '';
        getTareas();
      }).catch(err => {
        console.log(err)
      })
      Swal.fire(
        'Tarea eliminada!',
        " ",
        'success'
      )
    }else{
      return;
    }
  })
  

}

function cargarUserName(){
  let userInfo = document.getElementById("user-name");
  RequestManager.get("/users/getMe")
  .then(user => {
     userInfo.innerText += `Tareas de ${user.firstName}`;
  });
}
function darkMode(){
  const btnSwitch = document.querySelector(".switch");
  const header = document.querySelector("header");
  const btnsTrash = document.querySelector(".eliminar")
  btnSwitch.addEventListener("click", ()=>{
    document.body.classList.toggle("dark");
    btnSwitch.classList.toggle("active");
    header.classList.toggle("dark");
   /* btnsTrash.forEach(btnTrash => {
      btnTrash.classList.toggle("dark");
    });*/
    console.log(btnsTrash)
    
  })
}

