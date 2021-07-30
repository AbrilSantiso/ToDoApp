window.onload = () => {
  const formLogin = document.forms.formLogin;

  const nombre = formLogin.nombre;
  const contrasenia = formLogin.contrasenia;
  const repetirContrasenia = formLogin.repetirContrasenia;
  const email = formLogin.email;

  formLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombreValido = validarNombre(nombre.value);
    const contrValido = validarContrasenia(contrasenia.value, repetirContrasenia.value);
    const emailValido = validarEmail(email.value)

    if (nombreValido && contrValido && emailValido) {
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
    }
  })
}

function validarNombre(valor) {
  const expresion = /[0-9]/;
  const test = expresion.test(valor);
  const logitudCorrecta = valor.length > 2;

  return !test && logitudCorrecta;
}

function validarContrasenia(contrasenia, repetirContrasenia) {
  const coincidentes = contrasenia == repetirContrasenia;
  const logitudCorrecta = contrasenia.length > 7;

  return coincidentes && logitudCorrecta;
}

function validarEmail(email) {
  const expresion = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  const test = expresion.test(email);
  return test;
}

