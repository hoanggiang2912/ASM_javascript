const eyeBtn = document.querySelector(".eye")
const passwordInput = document.getElementById("password")

eyeBtn.addEventListener( "click" , () => {
    if (passwordInput.type === "password") {
        passwordInput.type = "text"
        eyeBtn.style.color = "lightblue"
    } else {
        passwordInput.type = "password"
        eyeBtn.style.color = "gray"
    }
})