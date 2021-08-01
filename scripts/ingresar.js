window.onload = () => {

  const form = document.forms.formLogin;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const email = form.email.value;
    const password = form.contrasenia.value;

    mostrarSpinner()

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

   function mostrarSpinner(){
     let spinner = document.getElementById("loading-bar-spinner")
     let loginBtn= document.getElementById("login-btn")
     spinner.classList.remove("hidden")
     loginBtn.classList.add("hidden")
     setTimeout(ocultarSpinner, 5000)
   }
   function ocultarSpinner(){
    let spinner = document.getElementById("loading-bar-spinner")
    let loginBtn= document.getElementById("login-btn")
    spinner.classList.add("hidden")
    loginBtn.classList.remove("hidden")
  }