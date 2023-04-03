
var products_arr = JSON.parse(localStorage.getItem('cart')) || []
const qty = document.querySelector(".qty")
var having = false
console.log(products_arr)

function add_to_cart(id , name , price, src){
    for(let i in products_arr){
        var product = products_arr[i]
        if(product[0] == id){
            product[4]++
            having = true
        }
    }
    if(having == false){
        products_arr.push([
            id,
            name,
            price,
            src,
            1
        ])
    }
    qty.innerText = products_arr.length 
    localStorage.setItem('cart' , JSON.stringify(products_arr))
}











