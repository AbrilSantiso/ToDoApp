function mostrarErrorLogin(){
    let div = document.getElementById("login-error");
     div.innerHTML = `
     <p>El email o contraseña son incorrectos.</p>
   `
     }

function mostrarErrorNombre(nombreValido){
    let div = document.getElementById("name-error");
    if (!nombreValido){
     div.innerHTML = `
     El nombre debe tener más de 2 caracteres.
   `
     }
  }
  function mostrarErrorContr(contrValido){
    let div = document.getElementById("pass-error");
    if (!contrValido){
     div.innerText = `
     La contraseña debe tener más de 7 caracteres.
   `
     }
  }
  
  function mostrarErrorContrIguales(contrIguales){
    let div = document.getElementById("pass2-error");
    if (!contrIguales){
     div.innerHTML = `
     Las contraseñas no coinciden.
   `
     }
  }
  
  function mostrarErrorEmail(emailValido){
    let div = document.getElementById("email-error");
    if (!emailValido){
     div.innerHTML = `
     El email no es valido.
   `
     }
  }