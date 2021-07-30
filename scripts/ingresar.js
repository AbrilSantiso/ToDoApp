window.onload = () => {

  const form = document.forms.formLogin;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const email = form.email.value;
    const password = form.contrasenia.value;

    console.log(form)
    console.log(email)
    console.log(password)
    
    RequestManager.post("/users/login",{email, password} )
    .then(datos => {
      localStorage.setItem('token', datos.jwt);
      location.href = './lista-tareas.html'
    })
  })

}