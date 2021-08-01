window.onload = () => {
  const formLogin = document.forms.formLogin;

  const nombre = formLogin.nombre;
  const contrasenia = formLogin.contrasenia;
  const repetirContrasenia = formLogin.repetirContrasenia;
  const email = formLogin.email;

  formLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombreValido = validarNombre(nombre.value);
    const contrValido = validarContrasenia(contrasenia.value);
    const contrIguales = validarIgualdadContr(contrasenia.value, repetirContrasenia.value)
    const emailValido = validarEmail(email.value)

    if (nombreValido && contrValido && emailValido && contrIguales) {
      const datosUsuario = new DatosUsuario(); 
      datosUsuario.setFirstname(nombre.value);
      datosUsuario.setLastname('DH');
      datosUsuario.setPassword(contrasenia.value);
      datosUsuario.setEmail(email.value);

      RequestManager.post("/users", datosUsuario)
      .then(datos => {
        localStorage.setItem('token', datos.jwt);
        location.href = './lista-tareas.html';
      }).catch( err => {
        console.log(err)
      })
    }else{
      mostrarErrorNombre(nombreValido);
      mostrarErrorContr(contrValido);
      mostrarErrorContrIguales(contrIguales);
      mostrarErrorEmail(emailValido)
    }
  })
}

function validarNombre(valor) {
  const expresion = /[0-9]/;
  const test = expresion.test(valor);
  const logitudCorrecta = valor.length > 2;

  return !test && logitudCorrecta;
}

function validarContrasenia(contrasenia) {
  return contrasenia.length > 7;
}

function validarIgualdadContr(contrasenia, repetirContrasenia){
  return contrasenia == repetirContrasenia;
}

function validarEmail(email) {
  const expresion = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  const test = expresion.test(email);
  return test;
}

function mostrarErrorNombre(nombreValido){
  let div = document.getElementById("name-error")
  if (!nombreValido){
   div.innerHTML = `
   <p>El nombre debe tener más de 2 caracteres.</p>
 `
   }
}
function mostrarErrorContr(contrValido){
  let div = document.getElementById("pass-error")
  if (!contrValido){
   div.innerHTML = `
   <p>La contraseña debe tener más de 7 caracteres.</p>
 `
   }
}

function mostrarErrorContrIguales(contrIguales){
  let div = document.getElementById("pass2-error")
  if (!contrIguales){
   div.innerHTML = `
   <p>Las contraseñas no coinciden.</p>
 `
   }
}

function mostrarErrorEmail(emailValido){
  let div = document.getElementById("email-error")
  if (!emailValido){
   div.innerHTML = `
   <p>El email no es valido.</p>
 `
   }
}