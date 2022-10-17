function filterProduct() {
    var inputFilter = document.getElementsByName('filter');
    var checkedRadio = Array.from(inputFilter).find((radio) => radio.checked);
    var apartChecked = checkedRadio.value.split('-');

    const data = new FormData();
    data.append('typeFilter', apartChecked[1]);
    data.append('dataFilter', apartChecked[0]);
    fetch('https://immense-retreat-18593.herokuapp.com/api/v1/filter/product', {
            method: 'POST',
            body: data
        }).then(data => data.json())
        .then((response) => assembleProduct(response.data))
        .catch(error => console.error('Error:', error))
}
const assembleProduct = (data) => {
    let body = '';
    data.forEach(element => {
        body += `<li class="splide__slide"><div class="card min-vh- mh-75" style="width: 18rem;"><img height='250px' src="${element.url_image}" class="card-img-top" alt="...">
                                <div class="card-body">
                                 <h5 class="card-title">${element.name} - ${element.name_category}</h5>
                                 <p class="card-text">${element.price} - ${element.discount}</p>
                                 <a href="#" class="btn btn-primary">AGREGAR AL CARRITO</a>
                                </div>
                             </div></li>`;

    });
    document.getElementById('productsContainer').innerHTML = body;
    var products = new Splide('#products', {
        perPage: 4,
        gap: 5,
        pagination: false,
    });
    products.mount(window.splide.Extensions);
}