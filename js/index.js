const products = [
    {id: 1, title: 'Notebook', price: 20000},
    {id: 2, title: 'Mouse', price: 1500},
    {id: 3, title: 'Keyboard', price: 5000},
    {id: 4, title: 'Gamepad', price: 4500},
];

const renderProduct = (title, price, img = '') => {
    return `<div class="product-item">
                <h3>${title}</h3>
                <p>${price}</p>
                <button class="by-btn">Добавить в корзину</button>
              </div>`;
};

const renderProducts = (list) => {
    const productList = list.map(function (product) {
        return renderProduct(product.title, product.price);
    });
    console.log(productList);
    document.querySelector('.products').innerHTML = productList;
    // insertAdjacentHTML();
};

renderProducts(products);

//1. Добавьте стили для верхнего меню, товара, списка товаров и кнопки вызова корзины.
// 2. Добавьте значения по умолчанию для аргументов функции. Как можно упростить или сократить запись функций?
// 3. *Сейчас после каждого товара на странице выводится запятая. Из-за чего это происходит? Как это исправить?
