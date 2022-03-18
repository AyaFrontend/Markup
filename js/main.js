// global variables
let productName = document.getElementById("pname")
, productCategory = document.getElementById("pcategory")
, productPrice = document.getElementById('price')
, productDesc = document.getElementById('pdesc')
, textSearch = document.getElementById('search');

let Products = [];

let rows ='';

if(localStorage.getItem("allProducts") == null)
{
    Products=[];
}
else
{
    let pro =[];
    Products = JSON.parse(localStorage.getItem("allProducts"));
    
    
    for(const i =0 ; i<Products.length; i++)
    {
        pro.push(Products[i]);
        displayData(pro , pro.length - 1);
    }
    

//FUNC TO ADD A NEW PRODUCT
function addProduct()
{
    

    Products.push({
        Name: productName.value,
        Category: productCategory.value,
        Price: Number(productPrice.value),
        Description: productDesc.value
    });
   
   Clear(); //Call TO DELETE AFTER ADDING DATA

   displayData(Products , (Products.length - 1))//CALL TO DISPLAY DATA INTO THE TABLE
   uptadeLocaclStorage();
}

function uptadeLocaclStorage()
{
    localStorage.setItem("allProducts",JSON.stringify(Products));
}
//FUNC TO DELETE A PRODUCT BY INDEX
function removeProduct(index)
{
    Products.splice(index,1);
    
    document.getElementById(index).remove();
    uptadeLocaclStorage();
}

//FUNC TO DISPLAY DATA INTO THE TABLE
function displayData(arr , trId)
{
    
    let index = arr.length - 1;
    let id = trId;
     rows = `<tr id="${id}">
               <td>${index + 1}</td>
               <td>${arr[index].Name}</td>
               <td>${arr[index].Category}</td>
               <td>${arr[index].Price}</td>
               <td>${arr[index].Description}</td>
               <td>
               <button class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="getData(${index})">
                 <span class="fa fa-edit" aria-hidden="true"></span>
               </button>
               <button class="btn btn-outline-danger" onclick="removeProduct(${index})">
                 <span class="fa fa-remove-format" aria-hidden="true"></span>
               </button>
             </td>
            </tr> `;
    document.getElementById('table-body').innerHTML += rows;   
    
 
}

//FUNC TO GET DATA INTO INPUTS
function getData(index)
{
    
   
    updateBtn(index);
    

    productName.value = Products[index].Name;
    productCategory.value = Products[index].Category;
    productPrice.value = Products[index].Price;
    productDesc.value = Products[index].Description;

    
}

//FUNC TO UPDATE PRODUCT
function updateProduct(index)
{
    Products[index] = {
        Name: productName.value,
        Category: productCategory.value,
        Price: Number(productPrice.value),
        Description: productDesc.value
    };
    //TO UPDATE ROW
   let tds= document.getElementById(index).children;
   tds[1].innerHTML = Products[index].Name;
   tds[2].innerHTML = Products[index].Category;
   tds[3].innerHTML = Products[index].Price;
   tds[4].innerHTML = Products[index].Description;
  
}

//FUNC TO SEARCH
function search()
{
    let name =''
    searchResult=[];
    document.getElementById('table-body').innerHTML = '';   
       for(const i = 0; i<Products.length; i++)
       {
           name = Products[i].Name;
           if(name.includes('textSearch.value'))
           {
           
               searchResult.push(
                   { 
                       Name: Products[i].Name,
                       Category: Products[i].Category,
                       Price: Products[i].Price,
                       Description: Products[i].Description
                    } );
                   
              displayData(searchResult , i)
             let t = document.getElementById(i).children[1].innerHTML ;
             
             document.getElementById(i).children[1].innerHTML = t.replace(textSearch.value,`<span style="background-color:yellow">${textSearch.value}</span>`);
           }
        }
 if(searchResult.length == 0)
 {
    document.getElementById('table-body').innerHTML = 'Not Found';
 }

}

//FUNC TO DELETE DATA FROM INPUTS
function Clear()
{
    productName.value = "";
    productCategory.value = "";
    productPrice.value = "";
    productDesc.value = "";

}


//FUNC TO ADD UPDATE BUTTON
function updateBtn(index)
{
    var updateBtn = `<button type="button" class="btn bg-yellow text-green" onclick="updateProduct(${index})" id="btn-up" >Update Product</button>`;
    if(document.getElementById('btn-add') !=null)
    {
        document.getElementById('btn-add').remove();
    }
   
    document.getElementById('modal-foo').innerHTML = updateBtn;
}

// FUNC TO ADD Add BUTTON
function addBtn()
{
    var addBtn = `<button type="button" class="btn bg-yellow text-green" onclick="addProduct()" id="btn-add">Add Product</button>`;
    if( document.getElementById('btn-up') != null)
    {
       document.getElementById('btn-up').remove();
    }
    document.getElementById('modal-foo').innerHTML = addBtn;
};


function validation()
{
    var regex = /^[A-Z][a-z0-9]{3,8}/;
    if(/^[A-Z]/.test(productName.value))
    {
        if(/[a-z0-9]{3,8}$/.test(productName.value))
        {
            if( document.getElementById('alert-id').style.display=='block')
            {
                document.getElementById('alert-id').style.display='none';
            }
             return true;
        }
        else{
            document.getElementById('alert-id').style.display='block';
            document.getElementById('alert-content').innerHTML =`Should insert from 3 to 8 
            small letters or digits only`;
        }
    }
    else{
        document.getElementById('alert-id').style.display='block';
        document.getElementById('alert-content').innerHTML ='Should start with capital letter';
    }
}
}
productName.addEventListener('blur',validation);