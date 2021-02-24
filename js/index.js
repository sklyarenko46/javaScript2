'use strict'
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';

// переделать в ДЗ на промисы. НЕ ИСПОЛЬЗОВАТЬ fetch!!!
const getRequest = (url, cb) => {
     new Promise(
        (resolve, reject) =>
        { // resolve -> then; rejected -> catch
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status !== 200) {
                        console.log('Error');
                    } else {
                        cb(xhr.responseText);
                    }
                }
            };
            xhr.send();
        }
    );
}

class ProductsHolder {
    #dataOfProducts;
    #productObjects;

    constructor() {
        this.productsBlock = document.querySelector('.products');
        this.cart = new Cart();
        this.#dataOfProducts = [];
        this.#productObjects = [];

        //вариант с getRequest();
        // this.#getDataOfProducts();

        this.#getDataOfProducts().then(
            (data) =>
            {
                this.#dataOfProducts = [...data];
                this.#fillProductsBlock();
            }
        );
    }

    #getDataOfProducts() {
        //вариант с getRequest();
        // getRequest(`${API}catalogData.json`, (data) => {
        //
        //         this.#dataOfProducts = JSON.parse(data);
        //         this.#fillProductsBlock();
        //
        //       });
        return fetch(`${API}catalogData.json`)
            .then((response) => response.json())
            .catch((error) => { console.log(error); });
    }

    #fillProductsBlock() {
        let productObject;
        let addProductToCartBtn;
        for (let dataOfProduct of this.#dataOfProducts) {
            productObject = new Product(dataOfProduct);
            this.#productObjects.push(productObject);
            this.productsBlock.insertAdjacentHTML('beforeend', productObject.getProductBlock());
            addProductToCartBtn = document.getElementById(productObject.addProductToCartBtnId);
            addProductToCartBtn.addEventListener('click', this.cart.addItem.bind(this.cart, productObject));
        }
    }
}

class Product {
    constructor(dataOfProduct) {
        this.id = dataOfProduct.id_product;
        this.addProductToCartBtnId = 'add-product-to-cart-btn' + this.id;
        this.img = dataOfProduct.img == null ? 'img/new-product.png' : dataOfProduct.img;
        this.productName = dataOfProduct.product_name;
        this.price = dataOfProduct.price;
    }

    getProductBlock() {
        return `<div class="product" id="${this.id}">
                      <img class="product-img" src="${this.img}" alt="image">
                      <h3 class="product-title">${this.productName}</h3>
                      <p class="product-price">${this.price} \u20bd</p>
                      <button id="${this.addProductToCartBtnId}" class="add-product-to-cart-btn">добавить в корзину</button>
               </div>`;
    }
}

// ДЗ 2
// 1. Добавьте пустые классы для корзины товаров и элемента корзины товаров. Продумайте, какие методы понадобятся для работы с этими сущностями.
// 2. Добавьте для GoodsList метод, определяющий суммарную стоимость всех товаров.
// ДЗ 3
//  Добавьте в соответствующие классы методы добавления товара в корзину, удаления товара из корзины и получения списка товаров корзины.
class Cart {
    constructor() {
        this.cartBlock = document.querySelector('.cart');
        this.itemObjects = [];
        this.cartBtn = document.querySelector('.cart-btn');
        this.cartBtn.addEventListener('click', this.swapDisplayMode.bind(this));
    }

    swapDisplayMode() {
        const classList = this.cartBlock.classList;
        if(classList.contains('cart-not-visible'))
        {
            classList.remove('cart-not-visible');
            classList.add('cart-visible');
        }
        else if(classList.contains('cart-visible'))
        {
            classList.remove('cart-visible');
            classList.add('cart-not-visible');
        }
    }
    redraw() {
        document.querySelectorAll('.cart-item').forEach((element) => {
            element.remove();
        });
        let addedProductCount = 0;
        this.itemObjects.forEach((item)=>{
            this.cartBlock.firstElementChild.insertAdjacentElement('afterend', item.getCartItemBlock());
            addedProductCount += item.count;
        });
        document.querySelector('.cart-total-price').textContent = this.calculateTotal();

        this.cartBtn.firstElementChild.innerHTML = `${addedProductCount}`;

    }

    addItem(product) {
        let newProduct = true;
        this.itemObjects.forEach((item)=>{
            if(item.id === product.id)
            {
                item.increaseCount();
                newProduct = false;
                return;
            }
        });

        if(newProduct)
            this.itemObjects.push(new CartItem(product, this));

        this.redraw();
    }
    removeItem(product) {
        this.itemObjects.splice(this.itemObjects.indexOf(product), 1);
        this.redraw();
    }
    clearAll() {
        this.itemObjects = [];
        this.redraw();
    }

    calculateTotal() {
        let total = 0;
        this.itemObjects.forEach((itemObject) => {
            total += itemObject.totalPrice;
        });
        return total;
    }
}

class CartItem {
    constructor(product, cart,  count = 1) {
        this.cart = cart;
        this.id = product.id;
        this.img = product.img;
        this.title = product.productName;
        this.pricePerUnit = product.price;
        this.count = count;
        this.#recalculateTotalPrice();
    }

    increaseCount(count = 1) {
        this.count += count;
        this.#recalculateTotalPrice();
    }
    decreaseCount(count = 1) {
        this.count -= count;
        this.#recalculateTotalPrice();
    }
    setCount(count) {
        this.count = count;
        this.#recalculateTotalPrice();
    }
    #recalculateTotalPrice() {
        this.totalPrice = this.pricePerUnit * this.count;
    }
    getCartItemBlock() {
        const cartItemBlock = this.createElement('div', 'cart-item');
        const cartItemImg = this.createImg('cart-item-img', 'img/new-product.png');
        const cartItemTitleBlock = this.createElement('div', 'cart-item-title', this.title);
        const cartItemCountBlock = this.createElement('div', 'cart-item-count', this.count);
        const cartItemTotalPriceBlock = this.createElement('div', 'cart-item-total-price', this.totalPrice);
        const cartItemRemoveBtn = this.createRemoveBtn();
        cartItemBlock.appendChild(cartItemImg);
        cartItemBlock.appendChild(cartItemTitleBlock);
        cartItemBlock.appendChild(cartItemCountBlock);
        cartItemBlock.appendChild(cartItemTotalPriceBlock);
        cartItemBlock.appendChild(cartItemRemoveBtn);
        return cartItemBlock;
    }

    createElement(elementTag, elementClass, value) {
        const element = document.createElement(elementTag);
        element.classList.add(elementClass);
        if(value != null)
            element.innerText = value;
        return element;
    };

    createImg(elementClass, link) {
        const img = this.createElement('img', elementClass);
        img.setAttribute('src', link);
        img.setAttribute('alt', 'image');
        return img;
    };
    createRemoveBtn() {
        const btn = this.createElement('button', 'cart-item-remove-btn', "X");
        btn.setAttribute('type', 'button');
        btn.addEventListener('click', this.cart.removeItem.bind(this.cart, this));
        return btn;
    };
}

const productsHolder = new ProductsHolder();


