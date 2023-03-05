let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let moodBtn = 'create';
let temp;



// Function To Get Total 


function getTotal() {
    
    if(price.value != '') {
        let reslut =  (+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML  = reslut 
        total.style.background = '#040'
    }else {
        total.innerHTML  = '' 
        total.style.background = '#a00d02'
    }
}


// Function To Create Products

let dataProduct;

if (localStorage.product != null) {
    dataProduct = JSON.parse(localStorage.product)
}else{
    dataProduct = [];
}

submit.onclick = function () {
    let newProduct = {
        title : title.value.toLowerCase(),
        price : price.value,
        taxes : taxes.value,
        ads : ads.value,
        discount : discount.value,
        total : total.innerHTML,
        count : count.value,
        category : category.value.toLowerCase(),
         
    }

    if (title.value != '' && price.value != '' && category != ''){
        if (moodBtn === 'create') {
            // Add Count Data
            
            if (newProduct.count > 1 ){
               for(let i = 0 ; i < newProduct.count ; i++) {
                   dataProduct.push(newProduct)
               }
           }else{
               dataProduct.push(newProduct)
           }
       }else {
           dataProduct[ temp ] = newProduct
           moodBtn = 'create';
           count.style.display = 'block';
           submit.innerHTML = 'Create'
   
       }
    }else {
        clearinputData ()
    }

   
       

    

    // Function  Save To LocalStorage
    localStorage.setItem('product' , JSON.stringify(dataProduct))

    showData () 
   
}




// Function To Clear Data After Press Create Button 

function clearinputData () {
    title.value = '',
    price.value = '',
    taxes.value = '',
    ads.value = '',
    discount.value = '',
    total.innerHTML = '',
    count.value = '',
    category.value = ''
}


// Function To  Read Data After Create 

function showData () {
    getTotal()
    let table ='';

    for(let i = 0 ; i < dataProduct.length ; i++) {
        table  += `
                <tr>
                    <td>${i}</td>
                    <td>${dataProduct[i].title}</td>
                    <td>$${dataProduct[i].price}</td>
                    <td>${dataProduct[i].taxes}</td>
                    <td>${dataProduct[i].ads}</td>
                    <td>${dataProduct[i].discount}</td>
                    <td>${dataProduct[i].total}</td>
                    <td>${dataProduct[i].count}</td>
                    <td>${dataProduct[i].category}</td>
                    <td> <button onclick = "updateData(${i}) " id="btnUpdate">Update</button></td>
                    <td><button onclick = "deleteData(${i})" id="btnDelete">Delete</button></td>
                </tr>  
                `
            }
            
                   
        document.getElementById('tbody').innerHTML = table;

        let deleteAll = document.getElementById('deleteAll');
        if (dataProduct.length > 0) {
        deleteAll.innerHTML = `<button onclick = 'deleteAll()'>Delete All (${dataProduct.length})</button>`
            
        } else {
            deleteAll.innerHTML = '';
        } 
}
showData () 


// Function  Delet Single Data With delete button


function deleteData(i) {

    dataProduct.splice(i,1);
    localStorage.product = JSON.stringify(dataProduct);
    showData () 
    

}



// function To Delete All Data 

function deleteAll() {
    localStorage.clear();
    dataProduct.splice(0)
    showData()
}




// Function  Update Single Data With Update button
function updateData(i) {
    title.value = dataProduct[i].title;
    price.value =dataProduct[i].price;
    taxes.value =dataProduct[i].taxes;
    ads.value =dataProduct[i].ads;
    discount.value =dataProduct[i].discount   ;
    getTotal()
    count.style.display = 'none'
    category.value =dataProduct[i].category   ;
    submit.innerHTML = 'Update';
    moodBtn = 'update';
    temp = i;
    scroll ({
        top:0,
        behavior :'smooth'
    })
}



// Function  Search input To Get Data
let searchMood = 'title';
function getsearchMood(id) {
    let search = document.getElementById('search');

    if(id === 'searchTitle') {
        searchMood = 'title';
        
    }else {
        searchMood = 'category';
        
    }

    search.placeholder = 'Search By ' + searchMood ;
    search.focus()
  search.value  = '';
  showData()
}

function searchData(value) {
 
    let table ='';
    for(let i = 0 ; i < dataProduct.length ; i++) {
    if(searchMood == 'title') {
        
            if(dataProduct[i].title.includes(value.toLowerCase())){
                        
                table  += `
                        <tr>
                            <td>${i}</td>
                            <td>${dataProduct[i].title}</td>
                            <td>$${dataProduct[i].price}</td>
                            <td>${dataProduct[i].taxes}</td>
                            <td>${dataProduct[i].ads}</td>
                            <td>${dataProduct[i].discount}</td>
                            <td>${dataProduct[i].total}</td>
                            <td>${dataProduct[i].count}</td>
                            <td>${dataProduct[i].category}</td>
                            <td> <button onclick = "updateData(${i}) " id="btnUpdate">Update</button></td>
                            <td><button onclick = "deleteData(${i})" id="btnDelete">Delete</button></td>
                        </tr>  
                `
        
            
            
            
        }
             }else {
        
            if(dataProduct[i].category.includes(value.toLowerCase())){
                        
                table  += `
                        <tr>
                            <td>${i}</td>
                            <td>${dataProduct[i].title}</td>
                            <td>$${dataProduct[i].price}</td>
                            <td>${dataProduct[i].taxes}</td>
                            <td>${dataProduct[i].ads}</td>
                            <td>${dataProduct[i].discount}</td>
                            <td>${dataProduct[i].total}</td>
                            <td>${dataProduct[i].count}</td>
                            <td>${dataProduct[i].category}</td>
                            <td> <button onclick = "updateData(${i}) " id="btnUpdate">Update</button></td>
                            <td><button onclick = "deleteData(${i})" id="btnDelete">Delete</button></td>
                        </tr>  
                `
       
            
            
            
        }
    }
}
    document.getElementById('tbody').innerHTML = table;
}



// Function  To Clean Data





 