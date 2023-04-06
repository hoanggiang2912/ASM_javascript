
const qty = document.querySelector(".qty_in_cart")
const cart_items = document.querySelectorAll(".cart-item")
const cartItem_checkbox = document.querySelectorAll(".cart-item > input")
const selectAll = document.querySelector("#select-all")
const cartItemImgs = document.querySelectorAll(".cart-item-img")
const cartItemNames = document.querySelectorAll(".cart-item-name")
const saveBtns = document.querySelectorAll(".save-btn")
const deleteBtns = document.querySelectorAll(".delete-btn")
const minusBtns = document.querySelectorAll(".minus")
const plusBtns = document.querySelectorAll(".plus")
const totalQty = document.querySelectorAll(".total_qty")
const totalPrice = document.querySelectorAll(".total-price")
const priceInBill = document.querySelector(".price-in-bill")
const priceInBillVAT = document.querySelector(".price-in-bill-vat")

var cart = []
function display_cart (){
    //get data from local storage
    cart = JSON.parse(localStorage.getItem("cart"))
    //show and hide quantity
    if(cart == null){
        qty.style.display = "none"
    }
    //display item
    var cartLength = cart.length
    qty.innerText = cartLength
    for(let i = 0 ; i < cart_items.length ; i++){
        var cart_item = cart_items[i]
        cart_item.setAttribute("index-data" , i)
        var cartItemIndex = cart_item.getAttribute("index-data")
        if(cartItemIndex < cartLength){
            cart_item.style.opacity = 1
            cart_item.style.visibility = "visible"
        }else{
            cart_item.style.opacity = 0
            cart_item.style.visibility = "hidden"
        }
        //change infomations of products
        for(let i = 0 ; i < cartLength ; i++){
            var localCartItem = cart[i]
            cartItemImgs[i].src = localCartItem[3]
            cartItemNames[i].innerText = localCartItem[1]
            totalQty[i].innerText = localCartItem[4]
            totalPrice[i].innerText = localCartItem[4] * localCartItem[2]
        }
    }
}
display_cart()

// calculate total quantity
function minus (){
    // for(let i = 0 ; i < minusBtns.length ; i++){
        for(let index in cart){
            var cart_item  = cart[index]
            minusBtns[index].addEventListener("click" , () => {
                if(cart_item[4] != 0){
                    cart_item[4]--
                    localStorage.setItem('cart' , JSON.stringify(cart))
                    cartItem_checkbox[index].checked = true;
                }else{
                    cartItem_checkbox[index].checked = false;
                }
                totalQty[index].innerText = cart_item[4]
                calculator_each_product()
                price_in_bill()
            })
        }
    // }
}
minus()
function plus(){
    // for(let i = 0 ; i < plusBtns.length ; i++){
        for(let index in cart){
            var cart_item = cart[index]
            plusBtns[index].addEventListener("click" , () => {
                cart_item[4]++
                localStorage.setItem('cart' , JSON.stringify(cart))
                totalQty[index].innerText = cart_item[4]
                calculator_each_product()
                price_in_bill()
            })
        }
    // }
}
plus()
//for each product
var inTotal = 0
function calculator_each_product(){
    for(let i in cart){
        var cart_item = cart[i]
        inTotal = cart_item[2] * totalQty[i].innerText
        totalPrice[i].innerText = inTotal
    }
}
//for all products that displayed
var final_price = 0
function calculator_all_products(){
    for(let i in cart){
        final_price += Number(totalPrice[i].innerText)
        priceInBill.innerText = final_price
        priceInBillVAT.innerText = final_price + final_price*0.1
    }
}
// calculator_all_products()
//select all 
function select_all (){
    selectAll.checked = true;
    selectAll.addEventListener("click" , () => {
        for(let i = 0 ; i < cartItem_checkbox.length ; i++){
            if(selectAll.checked){
                cartItem_checkbox[i].checked = true
            }else{
                cartItem_checkbox[i].checked = false
                selectAll.checked = false
            }
        }
    })
}
select_all()

function delete_item(){
    for(let i = 0 ; i < cart.length ; i++){
        deleteBtns[i].addEventListener("click" , () => {
            var new_cart = cart.splice(i , 1)
            localStorage.setItem("cart" , JSON.stringify(new_cart))
            display_item_after_delete (i)
            price_in_bill()
        })
    }
}
//delete
//save the result in local storage
//show the cart again
delete_item()

function display_item_after_delete (btn_index) {
    var cartLength = cart.length
    qty.innerText = cartLength
    for(let i = 0 ; i < cart_items.length ; i++){
        var cart_item = cart_items[i]
        cart_item.setAttribute("index-data" , i)
        var cartItemIndex = cart_item.getAttribute("index-data")
        if(cartItemIndex  == btn_index){
            cart_item.style.display = "none"
        }
    }
}

function price_in_bill(){
    var each_item = 0
    var total = 0 
    for(let i in cart){
        var cart_item = cart[i]
        each_item = cart_item[2] * cart_item[4]
        total += each_item
        priceInBill.innerText = total
        priceInBillVAT.innerText = total + total * 0.1
    }
}
price_in_bill()
