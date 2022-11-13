// start -Función searchProduct se encargada de llamar al servicio de 'search/product', que es el encargado de devolver información según las palabras claves que ingreso el cliente en el input
function searchProduct() {
    let inputValue = document.getElementById("query").value;
    let input = document.getElementById("content-result");
    if (inputValue.length > 2) {
        const data = new FormData();
        data.append('keyword', inputValue);
        fetch('https://immense-retreat-18593.herokuapp.com/api/v1/search/product', {
                method: 'POST',
                body: data
            }).then(data => data.json())
            .then((response) => dataManagement(response.data))
            .catch(error => console.error('Error:', error))
    } else {
        input.classList.remove('show');
        input.classList.add('hide');
    }
}
// end -Función searchProduct se encargada de llamar al servicio de 'search/product', que es el encargado de devolver información según las palabras claves que ingreso el cliente en el input
// start - Una vez obtengamos respuesta del BAACK procedemos a transformar la data para poder mostrarle al cliente
function dataManagement(data) {
    // start -  Controlamos el estado del listado de resultados que realizo el cliente
    let input = document.getElementById("content-result");
    if (data.length !== 0) {
        input.classList.remove('hide');
        input.classList.add('show');

        let bodyResult = '';
        data.forEach(element => {
            bodyResult += ` <li class="result-item">
             <div class="d-flex flex-row" >
                    <a href="#" class="result-link">
                      <div class="p-2 text-center divimg" >
                    <img src="${element.url_image}" class="img-thumbnail" width="50" height="50" >
                </div>
                  <div class="p-2">
                        <div class="result-title">
                            ${element.name}
                        </div>
                        <div class="result-content">
                             ${element.price} -   ${element.discount}
                        </div>
                    </a>
                    </div>
                      <div class="pt-4 float-left" >
                     <p class="text-primary"  style="cursor: pointer;" onclick='addProduct(${element.id})'>Agregar al carrito</p>
                </div>
                    </div>
                </li>`;

        });
        document.getElementById('content-result').innerHTML = bodyResult;

    } else {
        input.classList.remove('show');
        input.classList.add('hide');

    }
    // end -  Controlamos el estado del listado de resultados que realizo el cliente
}
// end - Una vez obtengamos respuesta del BAACK procedemos a transformar la data para poder mostrarle al cliente