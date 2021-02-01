const products = [
    {id: 1, img: 'img/product1.jpg', title: 'Notebook', price: 20000},
    {id: 2, img: 'img/product2.jpg', title: 'Mouse', price: 1500},
    {id: 3, title: 'Keyboard', price: 5000},
    {id: 4, img: 'img/product4.jpg', title: 'Gamepad', price: 4500},
    {id: 5, img: 'img/product1.jpg', title: 'Notebook', price: 20000},
    {id: 6, img: 'img/product2.jpg', title: 'Mouse', price: 1500},
    {id: 7, title: 'Keyboard', price: 5000},
    {id: 8, title: 'Gamepad', price: 4500},
];

const renderProduct = (title, price, img = 'img/new-product.png') => {
    const productBlock = createElement('div', 'product');
    const productImg = createImg('product-img', img);
    const productTitleBlock = createElement('h3', 'product-title', title);
    const productPriceBlock = createElement('p', 'product-price', 'цена: ' + price + ' руб.');
    const addProductToCartBtn = createElement('button', 'add-product-to-cart-btn', 'добавить в корзину');
    productBlock.appendChild(productImg);
    productBlock.appendChild(productTitleBlock);
    productBlock.appendChild(productPriceBlock);
    productBlock.appendChild(addProductToCartBtn);
    return productBlock;
};

const createElement = (elementTag, elementClass, value) => {
    const element = document.createElement(elementTag);
    element.classList.add(elementClass);
    if(value != null)
        element.innerText = value;
    return element;
};

const createImg = (elementClass, link) => {
    const img = createElement('img', elementClass);
    img.setAttribute('src', link);
    img.setAttribute('alt', 'image');
    return img;
};

const renderProducts = (products) => {
    const productsBlock = document.querySelector('.products');

    for(let product of products)
        productsBlock.appendChild(renderProduct(product.title, product.price, product.img));
};

renderProducts(products);

//1. Добавьте стили для верхнего меню, товара, списка товаров и кнопки вызова корзины.
// 2. Добавьте значения по умолчанию для аргументов функции. Как можно упростить или сократить запись функций?
// 3. *Сейчас после каждого товара на странице выводится запятая. Из-за чего это происходит? Как это исправить?
