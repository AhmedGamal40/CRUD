// call inputs

let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discound = document.getElementById('discound');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let trData = document.getElementById('trData');
let btnDelete = document.getElementById('deleteAll');

let temp ;

let moodBtn = 'create' ;

// 1- get total price
// 2 - create product
// 3 - save data in local storage
// 4 - clear inputs
// 5 - read data
// 8 - deleate
// 9 - ubdate
// 11- clean data
// 6 - count
// 10 - search

////////////////////////////////////////////////////////

// 1- get total price
function getTotal() {
    if (price.value != '' && taxes.value != '' && ads.value != '') {
        let sum = (+price.value + +taxes.value + +ads.value) - +discound.value;
        total.innerHTML = sum ;
    } else {
        total.innerHTML = 0;
    }
}

// 2 - create product
// save data in array
let data;
// check data in locl storage
if (localStorage.product != null ) {
    data = JSON.parse(localStorage.product);
} else {
     data = [] ;
}
// create data onClick submit
submit.onclick = function() {
    let newProduct = {
        title :title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discound:discound.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()
    }
    // valiedation
    if(title.value != '' && price.value != '' && taxes.value != '' && category.value != '' && count.value <= 100) {
        if (moodBtn === 'create') {
            if(newProduct.count > 1) {
                for(let i = 0; i < newProduct.count; i++){
                    data.push(newProduct);
                }
            }else{
                data.push(newProduct);
            }
        }else {
            data[temp] = newProduct
            moodBtn = 'create'
            count.style.display = 'block'
            submit.innerHTML = 'Create'
        }
        // call back clearInputs()
        clearInputs();
    }
    // 3 save data in local storage
    localStorage.setItem('product', JSON.stringify(data) );

    showData();
};

// 4 - clear inputs
function clearInputs() {
    title.value ='';
    price.value ='';
    taxes.value = '';
    ads.value = '';
    discound.value = '';
    total.innerHTML = 0;
    count.value = '';
    category.value = '';
};

// 5 - read data
function showData() {
    let show = '';
    for (let i = 0; i < data.length; i++) {
       show += 
       `
          <tr> 
             <td>${i + 1}</td>
            <td>${data[i].title}</td>
            <td>${data[i].price}</td>
            <td class='dis'>${data[i].taxes}</td>
            <td class='dis'>${data[i].ads}</td>
            <td class='dis'>${data[i].discound}</td>
            <td>${data[i].total}</td>
            <td>${data[i].category}</td>
            <td>${data[i].count}</td>
            <td><button onClick="updateProduct(${i})" id="update">Update</button></td>
            <td><button onClick="DeleteOne(${i})" id="delete">Delete</button></td>
        </tr>
       `
    }
    document.getElementById('trData') .innerHTML = show;

    // Delete All Button
    if (data.length > 0 ) {
        btnDelete.style.display = 'flex';
        btnDelete.innerHTML = `Delete All Data (${  data.length})`
    } else {
         btnDelete.style.display = 'none';
    }
}
showData()

// Delete One Product
function DeleteOne(val) {
    // delete data in array 
    data.splice(val,1);
    // update data in local storage
    localStorage.product = JSON.stringify(data);
    showData()
    clearInputs()
    moodBtn = 'create';
    count.style.display = 'block';
    submit.innerHTML = 'Create';
}

// // Delete All
btnDelete.onclick = () => {
        window.localStorage.clear()
        data.splice(0);
        showData();
        clearInputs();
        moodBtn = 'create';
        count.style.display = 'block';
        submit.innerHTML = 'Create';
    }

    // // Update
function updateProduct(val) {
    title.value =data[val].title;
    // console.log(data[val].title)
    price.value =data[val].price;
    taxes.value = data[val].taxes;
    ads.value = data[val].ads;
    discound.value = data[val].discound;
    getTotal();
    count.style.display= 'none'
    category.value = data[val].category;
    submit.innerHTML = 'Update'
    moodBtn = 'update' ;
    temp = val ;
    scroll( {top:0 ,behavior:'smooth' })
}

 // // Get Button Search
 let searchMoode = 'title';
 function getSearchMoode(id) {
    let search = document.getElementById('search')
    if (id === 'titleSearsh') {
        searchMoode = 'title';
        search.placeholder = 'Search By Title';
    } else {
        searchMoode = 'category';
        search.placeholder = 'Search By Category';
    }
    search.focus()
    search.value = ''
    showData()
 };

  // // Get Input Search
  function inputSearch(val) {
    let show = '';
    if (searchMoode === 'title') {
        for (let i = 0 ;  i < data.length ; i++) {
            if (data[i].title.includes(val.toLowerCase())) {
                show += 
                `
                    <tr> 
                        <td>${i + 1}</td>
                        <td>${data[i].title}</td>
                        <td>${data[i].price}</td>
                        <td class='dis'>${data[i].taxes}</td>
                        <td class='dis'>${data[i].ads}</td>
                        <td>${data[i].discound}</td>
                        <td>${data[i].total}</td>
                        <td>${data[i].category}</td>
                        <td>${data[i].count}</td>
                        <td><button onClick="updateProduct(${i})" id="update">Update</button></td>
                        <td><button onClick="DeleteOne(${i})" id="delete">Delete</button></td>
                    </tr>
                `
            } else {
                // show = `<h2 style="color: red ; margin: 10px">No Title </h2>`
            }
        }
    } else {
        for (let i = 0 ;  i < data.length ; i++) {
            if (data[i].category.includes(val.toLowerCase())) {
                show += 
                `
                    <tr> 
                        <td>${i + 1}</td>
                        <td>${data[i].title}</td>
                        <td>${data[i].price}</td>
                        <td>${data[i].taxes}</td>
                        <td>${data[i].ads}</td>
                        <td>${data[i].discound}</td>
                        <td>${data[i].total}</td>
                        <td>${data[i].category}</td>
                        <td>${data[i].count}</td>
                        <td><button onClick="updateProduct(${i})" id="update">Update</button></td>
                        <td><button onClick="DeleteOne(${i})" id="delete">Delete</button></td>
                    </tr>
                `
            } else {
                // show =  `<h2 style="color: red ;margin-top: 20px">No Category </h2>`
            }
        }
    }
    document.getElementById('trData') .innerHTML = show;
  }