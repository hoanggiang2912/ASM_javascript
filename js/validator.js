// Validator Object
function Validator(Option){

    function validate (inputElement , rule) {
        var errorMessage = rule.test(inputElement.value)
        var errorElement = inputElement.parentElement.querySelector(Option.errorSelector)
        if(errorMessage){
            errorElement.innerText = errorMessage
            var messageElement = inputElement.parentElement.querySelector(Option.errorSelector)
            messageElement.classList.add('invalid')
            inputElement.classList.add('invalid-input')
        }else{
            errorElement.innerText = ''
            var messageElement = inputElement.parentElement.querySelector(Option.errorSelector)
            messageElement.classList.remove('invalid')
            inputElement.classList.remove('invalid-input')
        }
    }

    var formElement = document.querySelector(Option.form) 
    if(formElement){
        Option.rules.forEach((rule) => {
            var inputElement = formElement.querySelector(rule.selector)
            if(inputElement){
                // xử lý trường hợp blur ra khỏi input
                inputElement.onblur = function () {
                    validate(inputElement , rule)
                }
                // xử lý trường hợp khi người dùng nhập vào input
                inputElement.oninput  = function () {
                    var errorElement = inputElement.parentElement.querySelector(Option.errorSelector)
                    errorElement.innerText = ''
                    var messageElement = inputElement.parentElement.querySelector(Option.errorSelector)
                    messageElement.classList.remove('invalid')
                    inputElement.classList.remove('invalid-input')
                }
            }
        })
    }
}   

// nguyên tắc:
// 1. khi có lỗi => trả ra message
// 2. khi hợp lệ => không trả giá trị
Validator.isRequired = function (selector) {
    return {
        selector: selector,
        test : function (value) {
            return value.trim() ? undefined : 'Vui lòng nhập trường này'
        }
    }
}

Validator.isEmail = function (selector) {
    return {
        selector: selector,
        test : function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value) ? undefined : 'Trường này phải là email'
        }
    }
}

Validator.isPassword = function (selector) {
    return {
        selector: selector,
        test : function (value) {
            var password_regex = /^(?=.*\d)(?=.*[A-Z]).{8,}$/
            return password_regex.test(value) ? undefined : 'Mật khẩu có ít nhất 8 kí tự gồm 1 chữ in hoa và 1 số'
        }
    }
}