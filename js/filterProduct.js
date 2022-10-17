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
                                
                                </div>
                             </div></li>`;

    });
    document.getElementById('productsContainer').innerHTML = body;
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
}