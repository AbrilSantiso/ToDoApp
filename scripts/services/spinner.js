function mostrarSpinner(){
    let spinner = document.getElementById("loading-bar-spinner")
    let btn= document.querySelector(".commonBtn")
    spinner.classList.remove("hidden")
    btn.classList.add("hidden")
    setTimeout(ocultarSpinner, 3000)
  }
  function ocultarSpinner(){
   let spinner = document.getElementById("loading-bar-spinner")
   let btn= document.querySelector(".commonBtn")
   spinner.classList.add("hidden")
   btn.classList.remove("hidden")
 }