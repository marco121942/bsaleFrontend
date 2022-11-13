// Función filterProduct es el encargado de recibir el parámetro por el cuál se va realziar el filtrado y con ayuda del  BACK-END,se obtiene el resultado deseado
function filterProduct() {
    // start - Obtenemos y trasformamos información con respecto al input radio que se seleccionó
    var inputFilter = document.getElementsByName('filter');
    var checkedRadio = Array.from(inputFilter).find((radio) => radio.checked);
    var apartChecked = checkedRadio.value.split('-');
    // end - Obtenemos y trasformamos información con respecto al input radio que se seleccionó
    // start - Utilizamos el Servicio de  'filter/product' , que es el encargado de traernos los productos filtrados según los parámetros que se le envía
    const data = new FormData();
    data.append('typeFilter', apartChecked[1]);
    data.append('dataFilter', apartChecked[0]);
    fetch('https://immense-retreat-18593.herokuapp.com/api/v1/filter/product', {
            method: 'POST',
            body: data
        }).then(data => data.json())
        .then((response) => assembleProduct(response.data))
        .catch(error => console.error('Error:', error))
        // end - Utilizamos el Servicio de  'filter/product' , que es el encargado de traernos los productos filtrados según los parámetros que se le envía
}
// start - Una vez obtengamos respuesta del BAACK procedemos a transformar la data para poder mostrarle al cliente
const assembleProduct = (data) => {
        // start - La data que obtenemos como respuesta lo armamos para poder mostrarle al usuario
        let body = '';
        data.forEach(element => {
            body += `<li class="splide__slide"><div class="card min-vh- mh-75" style="width: 18rem;"><img height='250px' src="${element.url_image}" class="card-img-top" alt="...">
                                <div class="card-body">
                                 <h5 class="card-title">${element.name} - ${element.name_category}</h5>
                                 <p class="card-text">${element.price} - ${element.discount}</p>
                                  <button type='button' class='btn btn-primary form-control' onclick='addProduct(${element.id})'>Agregar al carrito</button>
                                </div>
                             </div></li>`;

        });
        document.getElementById('productsContainer').innerHTML = body;
        // end - La data que obtenemos como respuesta lo armamos para poder mostrarle al usuario
        // start - Invocamos a la instancia de la librería de Splide ,para que pueda cargarse con la nueva data que se le va mostrar al usuario
        var products = new Splide('#products', {
            perPage: 4,
            gap: 5,
            pagination: false,
            breakpoints: {
                1412: { perPage: 3, gap: 4 },
                1018: { perPage: 2, gap: 3 },
                770: { perPage: 1, gap: 2 },

            },
            classes: {
                prev: "splide__arrow--prev arrow-slider-product arrow-product-slider-prev ",
                next: "splide__arrow--next arrow-slider-product arrow-product-slider-next ",
            },
        });
        products.mount(window.splide.Extensions);
        // end - Invocamos a la instancia de la librería de Splide ,para que pueda cargarse con la nueva data que se le va mostrar al usuario
    }
    // end - Una vez obtengamos respuesta del BAACK procedemos a transformar la data para poder mostrarle al cliente