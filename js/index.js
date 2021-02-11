class ProductsHolder {
    #dataOfProducts;
    #productObjects;

    constructor() {
        this.productsBlock = document.querySelector('.products');
        this.#dataOfProducts = [];
        this.#productObjects = [];

        this.#fillDataOfProducts();
        this.#fillProductsBlock();
    }

    #fillDataOfProducts() {
        this.#dataOfProducts = [
            {id: 1, img: 'img/product1.jpg', title: 'Notebook', price: 20000},
            {id: 2, img: 'img/product2.jpg', title: 'Mouse', price: 1500},
            {id: 3, title: 'Keyboard', price: 5000},
            {id: 4, img: 'img/product4.jpg', title: 'Gamepad', price: 4500},
            {id: 5, img: 'img/product1.jpg', title: 'Notebook', price: 20000},
            {id: 6, img: 'img/product2.jpg', title: 'Mouse', price: 1500},
            {id: 7, title: 'Keyboard', price: 5000},
            {id: 8, title: 'Gamepad', price: 4500},
        ];
    }

    #fillProductsBlock() {
        let productObject;
        for (let dataOfProduct of this.#dataOfProducts) {
            productObject = new Product(dataOfProduct);
            this.#productObjects.push(productObject);
            this.productsBlock.insertAdjacentHTML('beforeend', productObject.getProductBlock());
        }
    }
}

class Product {
    constructor(dataOfProduct) {
        this.id = dataOfProduct.id;
        this.img = dataOfProduct.img == null ? 'img/new-product.png' : dataOfProduct.img;
        this.title = dataOfProduct.title;
        this.price = dataOfProduct.price;
    }

    getProductBlock() {
        return `<div class="product" id="${this.id}">
                      <img class="product-img" src="${this.img}" alt="image">
                      <h3 class="product-title">${this.title}</h3>
                      <p class="product-price">${this.price} \u20bd</p>
                      <button class="add-product-to-cart-btn">добавить в корзину</button>
               </div>`;
    }
}

// ДЗ 2
// 1. Добавьте пустые классы для корзины товаров и элемента корзины товаров. Продумайте, какие методы понадобятся для работы с этими сущностями.
// 2. Добавьте для GoodsList метод, определяющий суммарную стоимость всех товаров.

class Cart {
    constructor() {
        this.cartBlock = document.querySelector('.cart');
        this.itemObjects = [];

        this.printEmptyCart();
    }

    printEmptyCart() {
        // метод прорисовывающий шаблон пустой корзины
    }
    redraw() {
        // метод перерисовывающий корзину в зависимости от изменения списка покупок
    }
    addItem(product) {
        this.itemObjects.push(new CartItem(product));
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
    constructor(product, count = 1) {
        this.id = product.id;
        this.img = product.img;
        this.title = product.title;
        this.pricePerUnit = product.price;
        this.count = count;
        this.totalPrice = this.#recalculateTotalPrice();
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
        return ``; // меод возвращает html разметку елемента корзины
    }

}

const productsHolder = new ProductsHolder();

// ДЗ 1
//1. Добавьте стили для верхнего меню, товара, списка товаров и кнопки вызова корзины.
// 2. Добавьте значения по умолчанию для аргументов функции. Как можно упростить или сократить запись функций?
// 3. *Сейчас после каждого товара на странице выводится запятая. Из-за чего это происходит? Как это исправить?

// const products = [
//     {id: 1, img: 'img/product1.jpg', title: 'Notebook', price: 20000},
//     {id: 2, img: 'img/product2.jpg', title: 'Mouse', price: 1500},
//     {id: 3, title: 'Keyboard', price: 5000},
//     {id: 4, img: 'img/product4.jpg', title: 'Gamepad', price: 4500},
//     {id: 5, img: 'img/product1.jpg', title: 'Notebook', price: 20000},
//     {id: 6, img: 'img/product2.jpg', title: 'Mouse', price: 1500},
//     {id: 7, title: 'Keyboard', price: 5000},
//     {id: 8, title: 'Gamepad', price: 4500},
// ];
// const renderProduct = (title, price, img = 'img/new-product.png') => {
//     const productBlock = createElement('div', 'product');
//     const productImg = createImg('product-img', img);
//     const productTitleBlock = createElement('h3', 'product-title', title);
//     const productPriceBlock = createElement('p', 'product-price', 'цена: ' + price + ' руб.');
//     const addProductToCartBtn = createElement('button', 'add-product-to-cart-btn', 'добавить в корзину');
//     productBlock.appendChild(productImg);
//     productBlock.appendChild(productTitleBlock);
//     productBlock.appendChild(productPriceBlock);
//     productBlock.appendChild(addProductToCartBtn);
//     return productBlock;
// };
//
// const createElement = (elementTag, elementClass, value) => {
//     const element = document.createElement(elementTag);
//     element.classList.add(elementClass);
//     if(value != null)
//         element.innerText = value;
//     return element;
// };
//
// const createImg = (elementClass, link) => {
//     const img = createElement('img', elementClass);
//     img.setAttribute('src', link);
//     img.setAttribute('alt', 'image');
//     return img;
// };
//
// const renderProducts = (products) => {
//     const productsBlock = document.querySelector('.products');
//
//     for(let product of products)
//         productsBlock.appendChild(renderProduct(product.title, product.price, product.img));
// };
//
// renderProducts(products);

