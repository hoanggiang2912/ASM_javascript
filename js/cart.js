
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
    cartLength = cart.length
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
        }
    }
}
display_cart()

// calculate total quantity
function calculate_total(){
    for(let i = 0 ; i < plusBtns.length ; i++){
        let qtyInTotal = 1
        var localCartItem = cart[i]
        priceInBill.innerText = totalPrice[i].innerText
        priceInBillVAT.innerText = parseInt(totalPrice[i].innerText) + parseInt(totalPrice[i].innerText) * 0.1
        plusBtns[i].addEventListener("click" , () => {
            qtyInTotal++
            totalQty[i].innerText = qtyInTotal
            cartItem_checkbox[i].checked = true
            totalPrice[i].innerText = qtyInTotal * localCartItem[2]
            priceInBill.innerText = qtyInTotal * localCartItem[2]
            priceInBillVAT.innerText = qtyInTotal * localCartItem[2] + (qtyInTotal * localCartItem[2]) * 0.1
        })
        minusBtns[i].addEventListener("click" , () => {
            if(qtyInTotal > 0) {
                qtyInTotal--
                totalQty[i].innerText = qtyInTotal
                totalPrice[i].innerText = qtyInTotal * localCartItem[2]
                priceInBill.innerText = qtyInTotal * localCartItem[2]
                priceInBillVAT.innerText = qtyInTotal * localCartItem[2] + (qtyInTotal * localCartItem[2]) * 0.1
                if(totalPrice[i].innerText == 0){
                    cartItem_checkbox[i].checked = false
                }
            }else{
                qtyInTotal = 0
                totalQty[i].innerText = qtyInTotal
            }
        })
    }
}
calculate_total()

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
            cart.splice(i , 1)
        })
    }
}
//delete
//save the result in local store
//show the cart again
delete_item()

function price_in_bill(){

}
