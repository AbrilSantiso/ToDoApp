window.onload = () => {
  const form = document.forms.formLogin;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const email = form.email.value;
    const password = form.contrasenia.value;

    mostrarSpinner();

    RequestManager.post("/users/login",{email, password} )
    .then(datos => {
      if (datos.jwt !== undefined){
        localStorage.setItem('token', datos.jwt);
        location.href = './lista-tareas.html'
      }else{
        mostrarErrorLogin()
      }
    })
  })

}

function mostrarErrorLogin(){
  let div = document.getElementById("login-error")
   div.innerHTML = `
   <p>El email o contraseña son incorrectos.</p>
 `
   }


