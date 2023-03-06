class Product {
    constructor(id, image, name, quantity, weight, price) {
        this.id = id;
        this.image = image
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.weight = weight;
    }
}

var checked_list = [];

var products = [];

const products_tbl = 'products_tbl';
function init() {
    if (localStorage.getItem(products_tbl) == null) {
        products = [
            new Product(1, "https://www.tofucute.com/images/10NL115-53_kitkat_bakable_custard_pudding_large.jpg", "Kit Kat Baked Custard Pudding", 12, 11.6, 4),
            new Product(2, "https://www.tofucute.com/images/10NL115-57_kitkat_strawberry_mochi_large.jpg", "Kit Kat Strawberry Daifuku Mochi", 25, 9.9, 3),
            new Product(3, "https://www.tofucute.com/images/10NL110-67_kitkat_setof2_strawberry_milk_large.jpg", "Kit Kat Strawberry Milk", 10, 9.9, 3),
            new Product(4, "https://www.tofucute.com/images/10NL110-78_kitkat_banana_caramel_2022update_large.jpg", "Kit Kat Banana Caramel", 19, 9.9, 3),
            new Product(5, "https://www.tofucute.com/images/10NL115-76_kit_kat_saveblueocean_large.jpg", "Kit Kat Save the Blue Ocean", 22, 11.6, 5),
        ];
        localStorage.setItem(products_tbl, JSON.stringify(products));
    }
    else {
        products = JSON.parse(localStorage.getItem(products_tbl));
    }
}
function renderTable() {
    let tbProduct = '';
    products.forEach(function (product) {
        tbProduct += 
        `<tr>
            <td><input class='check-box' id="checkbox_${product.id}" name='checkbox_${product.id}' type="checkbox" onchange='selectProducts(${product.id})'></td>
            <td id='img_${product.id}'  class="product-image-right"><img src="${product.image}" alt="" width="70"
            </td>
            <td id='name_${product.id}'>${product.name}</td>
            <td id='quantity_${product.id}'>${product.quantity}</td>
            <td id='weight_${product.id}'>${product.weight} g</td>
            <td id='price_${product.id}'>$ ${product.price}.00</td>
            <td>
            <i class="fa-solid fa-pen-to-square" onclick="edit(${product.id})"></i>
            </td>
        </tr>`
    })
    document.querySelector('.table>tbody').innerHTML = tbProduct;
}


function renderSearchList(productIdArray) {
    let tbSearchResult = '';
    for (let i = 0; i < products.length; i++) {
        for (let j = 0; j < productIdArray.length; j++) {
            if (productIdArray[j] === products[i].id) {
                tbSearchResult += `<tr>
                    <td><input class='check-box' id="checkbox_${products[i].id}" name='checkbox_${products[i].id}' type="checkbox" onchange='selectProducts(${products[i].id})'></td>
                    <td id='img_${products[i].id}'  class="product-image-right"><img src="${products[i].image}" alt="" width="70"
                    </td>
                    <td id='name_${products[i].id}'>${products[i].name}</td>
                    <td id='quantity_${products[i].id}'>${products[i].quantity}</td>
                    <td id='weight_${products[i].id}'>${products[i].weight} g</td>
                    <td id='price_${products[i].id}'>$ ${products[i].price}.00</td>
                    <td>
                    <i class="fa-solid fa-pen-to-square" onclick="edit(${products[i].id})"></i>
                    </td>
                </tr>`
            }
        }
    }
    document.querySelector('.table>tbody').innerHTML = tbSearchResult;
}

function searchByName() {
    let searchWord = document.getElementById('search').value;
    searchWord = searchWord.trim().toLowerCase();
    let resultSearch = [];
    for (let i = 0; i < products.length; i++) {
        if (products[i].name.toLowerCase().includes(searchWord)) {
            resultSearch.push(products[i].id);
        }
    }
    if (searchWord == null || searchWord == '') {
        renderTable();
        return;
    } else {
        renderSearchList(resultSearch);
        document.getElementById('search').value = '';
    }

}

function selectProducts(productId) {
    if (checked_list.includes(productId)) {
        checked_list = checked_list.filter(function (id) {
            return id != productId;
        })
    }
    else {
        checked_list.push(productId);
    }
    document.querySelector('#selectAllProducts').checked = false;

    let n = checked_list.length;
    if (n === products.length) {
        document.querySelector('#selectAllProducts').checked = true;
        selectAllProducts();
    }

    console.log(checked_list);
}

function selectAllProducts() {
    if (document.querySelector('#selectAllProducts').checked) {
        checked_list = [];
        for (let i = 0; i < products.length; i++) {
            checked_list.push(products[i].id);
            document.getElementById(`checkbox_${products[i].id}`).checked = true;
        }
    }
    else {
        for (let i = 0; i < products.length; i++) {
            checked_list = [];
            document.getElementById(`checkbox_${products[i].id}`).checked = false;
        }
    }
    console.log(checked_list);
}

function add() {
    let name = document.getElementById('name').value;
    if (isEmpty(name)) {
        alert('Please enter information');
        return;
    }
    let id = getMaxId() + 1;
    let image = document.getElementById('image').value;
    if (isEmpty(image)) {
        alert('Please enter information');
        return;
    }
    let quantity = document.getElementById('quantity').value;
    if (isEmpty(quantity)) {
        alert('Please enter information');
        return;
    }
    let weight = document.getElementById('weight').value;
    if (isEmpty(weight)) {
        alert('Please enter information');
        return;
    }
    let price = document.getElementById('price').value;
    if (isEmpty(price)) {
        alert('Please enter information');
        return;
    }
    products.push(new Product(id, image, name, quantity, weight, price));

    renderTable();
    localStorage.setItem(products_tbl, JSON.stringify(products))
    resetAddForm();
}

function getMaxId() {
    let max = 0;
    for (let i = 0; i < products.length; i++) {
        if (products[i].id > max) {
            max = products[i].id;
        }
    }
    return max;
}

function isEmpty(value) {
    return value == null || value.trim() == '';
}

function remove() {
    if (checked_list.length == 0) {
        alert('Please choose one to remove');
    }
    else {
        let confirmed = confirm('Are your sure to delete this?');
        if (confirmed) {
            for (let id of checked_list) {
                products = products.filter(function (product) {
                    return product.id != id;
                })
                localStorage.setItem(products_tbl, JSON.stringify(products));
                renderTable();
                checked_list = [];
                document.querySelector('#selectAllProducts').checked = false;
            }
        } else {
            document.querySelectorAll('.check-box').checked = false;
        }
    }
}

function changeImage() {
    let imageUrl = document.querySelector('#image').value;
    if (imageUrl != null && imageUrl != "") {
        document.querySelector('#reviewImage').src = imageUrl;
    }
    else {
        document.querySelector('#reviewImage').src = "https://toppng.com/uploads/preview/and-blank-effect-transparent-11546868080xgtiz6hxid.png"
    }
}

function edit(productId) {
    let product = products.find(function (product) {
        return product.id == productId;
    })

    document.querySelector('#id').value = product.id;
    document.querySelector('#name').value = product.name;
    document.querySelector('#image').value = product.image;
    document.querySelector('#quantity').value = product.quantity;
    document.querySelector('#weight').value = product.weight;
    document.querySelector('#price').value = product.price;

    document.querySelector('.btn-success').classList.add('d-none');
    document.querySelector('.btn-warning').classList.remove('d-none');
}


function updateProduct() {
    let productId = document.querySelector('#id').value;
    let product = products.find(function (product) {
        return product.id == productId;
    }
    )
    product.name = document.querySelector('#name').value;
    product.image = document.querySelector('#image').value;
    product.quantity = document.querySelector('#quantity').value;
    product.weight = document.querySelector('#weight').value;
    product.price = document.querySelector('#price').value;
    
    localStorage.setItem(products_tbl, JSON.stringify(products));
    renderTable(false);
    resetAddForm();
}

function resetAddForm() {
    document.querySelector('#id').value = 0;
    document.querySelector('#name').value = "";
    document.querySelector('#image').value = "";
    document.querySelector('#quantity').value = "";
    document.querySelector('#weight').value = "";
    document.querySelector('#price').value = "";
    document.querySelector('#reviewImage').src = "https://toppng.com/uploads/preview/and-blank-effect-transparent-11546868080xgtiz6hxid.png";

    document.querySelector('.btn-success').classList.remove('d-none');
    document.querySelector('.btn-warning').classList.add('d-none');
}


function sort(direction) {
    if (direction == 'asc') {
        products.sort(function (product_1, product_2) {
            return product_1.id - product_2.id;
        })
        document.querySelector('#sort_asc').classList.add('sort-active');
        document.querySelector('#sort_desc').classList.remove('sort-active');
    }
    else {
        products.sort(function (product_1, product_2) {
            return product_2.id - product_1.id;
        })
        document.querySelector('#sort_asc').classList.remove('sort-active');
        document.querySelector('#sort_desc').classList.add('sort-active');
    }
    renderTable(false);
}

function start() {
    init();
    renderTable();
}
start();