 //   Función getProductsCategory hace llamada al servicio 'get/productCategory', que es el encargado de devolver todos los productos que existen clasificados por su categória al que pertenece
 function getProductsCategory() {
     fetch('https://immense-retreat-18593.herokuapp.com/api/v1/get/productCategory', {
             method: 'GET',
         }).then(data => data.json())
         .then((response) => assembleProductCategory(response.data))
         .catch(error => console.error('Error:', error))
         // start - La data que obtenemos como respuesta lo armamos para poder mostrarle al usuario
     const assembleProductCategory = (data) => {

             var contenedorSlider = '';

             data.forEach((category, index) => {
                 contenedorSlider += "<div class='mt-5 mb-5'> <div class='card mb-2 text-center'><p class='fs-2 text-uppercase fw-semibold mt-2'>" + category.name + "</p></div><div class='splide' aria-label='All Products' id='categoryProducts" + index + "'><div class='splide__track'> <ul class='splide__list'>"

                 category.products.forEach((product) => {


                     contenedorSlider += "<li class='splide__slide'>" +
                         " <div class='card min-vh- mh-75' style='width: 18rem;'><img height='250px' src='" + product.url_image + "' class='card-img-top' alt='...'>" +
                         "<div class='card-body'>" +
                         "<h5 class='card-title'>" + product.name + ' - ' + category.name + "</h5>" +
                         "<p class='card-text'>" + product.price + ' - ' + product.discount + "</p>" +
                         "<button type='button' class='btn btn-primary form-control' onclick='addProduct(" + product.id + ")'>Agregar al carrito</button>" +
                         "</div></div></li>"
                 });
                 contenedorSlider += "</ul></div></div></div>";

             });

             document.getElementById('containerProductCategory').innerHTML = contenedorSlider;
             //Despues de armar las categorias con ss respectivos productos invocamos la funciòn "optionSplide" , para el sldier
             this.optionSplide(data);

         }
         // end - La data que obtenemos como respuesta lo armamos para poder mostrarle al usuario
 }
 //start - El siguiente bucle monta la libreria de slider en su respectico  componente.
 function optionSplide(data) {

     data.forEach((category, index) => {
         var sliderCategoryProduct = new Splide('#categoryProducts' + index, {
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
         sliderCategoryProduct.mount();
     });

 }
 //end - El siguiente bucle monta la libreria de slider en su respectico  componente.