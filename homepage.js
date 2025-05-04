document.getElementById('btn').addEventListener('click',()=>{
    let confm = confirm('are you sure you want to logout')
    if(confm){
        location.href='../Login Page/login.html'
    }
})

let currentuser=localStorage.getItem('currentuser')
console.log(currentuser);
let username = document.getElementById('username')
username.innerText = `${currentuser}`

let maincon = document.getElementById('maincon')
maincon.innerHTML='<article></article>'
maincon.style.height='53vh'

fetch('https://fakestoreapi.com/products')
.then(res=>res.json())
.then(result=>displaydata(result))
.catch(()=>console.log('failed to fetch'));

let displaydata = (data)=>{
    if(data){
        maincon.innerHTML=''
        maincon.style.height='auto'
    data.forEach(ele => {
        let cartdata=JSON.parse(localStorage.getItem('cartdata')) || []
        let isincart=cartdata.find(item=>item.id==ele.id)

        let div = document.createElement('div')
        div.innerHTML = `<img src=${ele.image} height='130px' width='100px'>
        <h3>${ele.title}</h3>
        <h4>Price : ${ele.price}</h4>
        <span>
        <button id='cartbtn${ele.id}' ${isincart?'disable':''} style='background-color:${isincart ?'gray':''}'>Add to <i class="fa-regular fa-cart-shopping"></i></button>
        <button id='wishbtn${ele.id}'>Add to <i class="fa-light fa-heart"></i></button>
        </span> `
        maincon.appendChild(div)

        // toggle popup function
        div.addEventListener('click',()=>{
            popup(ele)
        })

        // toggle cartbtn function
        document.getElementById(`cartbtn${ele.id}`).addEventListener('click',(e)=>{
            e.stopPropagation()
            if(isincart){
                alert('already added to the cart')
            }
            else{
                addtocart(ele)
            }
        })

    });
}
}

let popupdiv = document.getElementById('popupdiv')
function popup(product){
    console.log(product);
    popupdiv.style.display='flex'
    popupdiv.innerHTML=
    `<div>
        <img src=${product.image} height='130px' width='100px' >
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <strong>Price : ${product.price}</strong>
        <p>Rating : ${product.rating.rate}/5</p>
        <button id='closepopup'>close</button>
    </div>`    

    let popbtn=document.getElementById('closepopup')
    popbtn.addEventListener('click',()=>{
        popupdiv.style.display='none'
    })
    
    popupdiv.addEventListener('click',()=>{
        popupdiv.style.display='none'
    })
}

// add to cart function
function addtocart(product){
    let cartdata=JSON.parse(localStorage.getItem('cartdata')) || []
    cartdata.push(product)
    localStorage.setItem('cartdata',JSON.stringify(cartdata))
    document.getElementById(`cartbtn${product.id}`).disabled=true;
    document.getElementById(`cartbtn${product.id}`).style.backgroundColor='grey'
}