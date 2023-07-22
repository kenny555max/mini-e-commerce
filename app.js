const products_element = document.querySelector('.all_products');
const carts_element = document.querySelector('.all_carts');

//dummy data
//const products_array = [
    //{ product_id: 1, product_image: './assets/img1', product_name: 'Product1', product_price: 20 },
    //{ product_id: 2, product_image: './assets/img2', product_name: 'Product2', product_price: 25 },
    //{ product_id: 3, product_image: './assets/img3', product_name: 'Product3', product_price: 20 },
    //{ product_id: 4, product_image: './assets/img4', product_name: 'Product4', product_price: 20 },
    //{ product_id: 5, product_image: './assets/img5', product_name: 'Product5', product_price: 20 },
    //{ product_id: 6, product_image: './assets/img6', product_name: 'Product6', product_price: 20 },
   // { product_id: 7, product_image: './assets/img7', product_name: 'Product7', product_price: 20 },
//];

//localStorage.setItem('products', JSON.stringify(products_array));


function display_products() {
    //grab data from localStorage
    const products = JSON.parse(localStorage.getItem('products'));

    if (products === null) {
        return;
    }

    products_element.innerHTML = '';

    products.forEach(
        function (product) {
            //destructure
            const { product_image, product_price, product_name, product_id } = product;

            //append
            products_element.innerHTML += `<div class="product">
                                            <div class="product_image">
                                                <img src="${product_image}.jpg" alt="product_image">
                                            </div>
                                            <div class='product_action'>
                                                <div class="product_desc">
                                                    <p class='product_name'>${product_name}</p>
                                                    <p class='product_price'>${product_price}</p>
                                                </div>
                                                <div class="add_to_cart">
                                                    <button class='add_to_cart' id='${product_id}' type='button'>Add To Cart</button>
                                                </div>
                                            </div>
                                        </div>`
        }
    );
}

function display_carts() {
    //grab data from localStorage
    const carts = JSON.parse(localStorage.getItem('carts'));

    if (carts === null) {
        return;
    }

    carts_element.innerHTML = '';

    carts.forEach(
        function (cart) {
            //destructure
            const { product_image, product_price, product_name, product_id } = cart;

            //append
            carts_element.innerHTML += `<div class="cart">
                                            <div class="cart_image">
                                                <img src="${product_image}.jpg" alt="cart_image">
                                            </div>
                                            <div class='cart_action'>
                                                <div class="cart_desc">
                                                    <p class='cart_name'>${product_name}</p>
                                                    <p class='cart_price'>${product_price}</p>
                                                </div>
                                                <div class="delete_from_cart">
                                                    <button class='delete_from_cart' id='${product_id}' type='button'>Delet From Cart</button>
                                                </div>
                                            </div>
                                        </div>`
        }
    );
}

products_element.addEventListener('click', function (event) {
    let element = event.target;

    if (element.classList.contains('add_to_cart')) {
        const product_id = parseInt(element.id);

        //grab all data from the localStorage
        let products = JSON.parse(localStorage.getItem('products'));
        
        if (products === null) {
            return;
        }

        //return the single product
        let product = products.filter((product) => product.product_id === product_id);

        //re-initialize
        //return all products except where the product_id = product_id that is coming from the DOM
        products = products.filter((product) => product.product_id !== product_id);

        localStorage.setItem('products', JSON.stringify(products));

        const data = JSON.parse(localStorage.getItem('carts')); // array
        let carts = [];

        if (data !== null) {
            carts = data;
        }

        carts = [...carts, ...product];

        localStorage.setItem('carts', JSON.stringify(carts));

        display_products();
        display_carts();
    }
});


display_products();
display_carts();