// Funciòn encargado de agregar productos al localstorage, y a la vez realizar el cálculo del total que tiene que pagar
function addProduct(data) {
    // Guardamos en una variable el ID del producto que enviamos
    var idProduct = data;
    // Obtenemos el Array de productos que se almacena en el localstorage
    var localProducts = JSON.parse(localStorage.getItem('products'));
    // Obtenemos el Array del listado de productos que el cliente agrega
    var listCarrito = localStorage.getItem('carrito') === null ? [] : JSON.parse(localStorage.getItem('carrito'));
    // start-  Obtenemos la información del producto según el ID que se manda
    var objProduct = {};
    localProducts.forEach((product) => {
        if (product.id === idProduct) {
            var objProductCarrito = new Object();
            objProductCarrito.id = product.id;
            objProductCarrito.name = product.name;
            objProductCarrito.price = product.price;
            objProductCarrito.cantidad = 1;
            objProduct = objProductCarrito;
        }
    });
    // end-  Obtenemos la información del producto según el ID que se manda
    // start - Lógica para agregar un producto a la lista del carrito y modificar la cantidad que se agrega
    //Si el carrito esta vacio,almacenamos por primera vez el producto que el cliente selecciona en el localStorage
    if (listCarrito.length === 0) {
        listCarrito.push(objProduct);
        localStorage.setItem('carrito', JSON.stringify(listCarrito));
    } else {
        //Si el carrito contiene productos agregados, se procede a buscar el producto, si existe se modifica la cantidad "+1"y si el producto es nuevo se procede ha almacenarlo
        var result = listCarrito.find((value) => value.id === idProduct);
        if (result) {
            listCarrito.forEach((list) => {
                if (list.id === idProduct) {
                    list.cantidad = list.cantidad + 1;
                }
            });
            localStorage.setItem('carrito', JSON.stringify(listCarrito));
        } else {
            listCarrito.push(objProduct)
            localStorage.setItem('carrito', JSON.stringify(listCarrito));
        }
    }
    // end - Lógica para agregar un producto a la lista del carrito y modificar la cantidad que se agrega
    // Invocamos a la función viewListItemCar que es el encargado de imprimir el listado del carrito en el DOM
    this.viewListItemCar();
}

function deleteProduct(data) {
    var idProduct = data;
    var items = JSON.parse(localStorage.getItem('carrito'));
    var result = items.filter((item) => item.id !== idProduct);
    localStorage.setItem('carrito', JSON.stringify(result));
    this.viewListItemCar();
}

function viewListItemCar() {
    var items = JSON.parse(localStorage.getItem('carrito'));
    if (items) {
        let body = '';
        var totalPayment = 0;
        items.forEach(element => {
            var resultPrice = element.price.slice(1);
            var operation = (parseFloat(resultPrice) * element.cantidad) + totalPayment;
            totalPayment = operation;
            body += `<li class="list-group-item text-right mx-2 form-control"> <div class="row"><div class="col-1">${element.cantidad}</div><div class="col-7">${element.name}</div><div class="col-1"> ${element.price}</div><div class="col-3"><button onclick="deleteProduct(${element.id})" class="btn btn-danger mx-5" data-item="3" style="margin-left: 1rem;">X</button></div></div></li>`;
        });
        document.getElementById('carrito').innerHTML = body;
        document.getElementById('total').innerHTML = totalPayment;

    }

}