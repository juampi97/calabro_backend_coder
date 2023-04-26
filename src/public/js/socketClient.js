const socket = io();

const btnCrear = document.querySelector('#btnCrear');
const title = document.querySelector('#title');
const description = document.querySelector('#description');
const price = document.querySelector('#price');
const thumbnail = document.querySelector('#thumbnail');
const code = document.querySelector('#code');
const stock = document.querySelector('#stock');

btnCrear.addEventListener('click', () => {
    if (!title.value || !description.value || !price.value || !thumbnail.value || !code.value || !stock.value) {
        alert('Todos los campos son obligatorios');
        return;
    }
    let product = {
        title: title.value,
        description: description.value,
        price: price.value,
        thumbnail: thumbnail.value,
        code: code.value,
        stock: stock.value
    }
    socket.emit('new-product', product);
})