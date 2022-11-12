function addProduct(data) {
    var idProduct = data;
    var localProducts = JSON.parse(localStorage.getItem('products'));
    var listCarrito = localStorage.getItem('carrito') === null ? [] : JSON.parse(localStorage.getItem('carrito'));
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

    if (listCarrito.length === 0) {
        listCarrito.push(objProduct);
        localStorage.setItem('carrito', JSON.stringify(listCarrito));
    } else {
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