 function getProductsCategory() {
     fetch('http://localhost:8000/api/v1/get/productCategory', {
             method: 'GET',
         }).then(data => data.json())
         .then((response) => assembleProductCategory(response.data))
         .catch(error => console.error('Error:', error))

     const assembleProductCategory = (data) => {

         var contenedorSlider = '';

         data.forEach((category, index) => {
             contenedorSlider += "<div class='mt-5 mb-5'><p class='fs-2 text-uppercase fw-semibold'>" + category.name + "</p><div class='splide' aria-label='All Products' id='categoryProducts" + index + "'><div class='splide__track'> <ul class='splide__list'>"

             category.products.forEach((product) => {
                 contenedorSlider += "<li class='splide__slide'>" +
                     " <div class='card min-vh- mh-75' style='width: 18rem;'><img height='250px' src='" + product.url_image + "' class='card-img-top' alt='...'>" +
                     "<div class='card-body'>" +
                     "<h5 class='card-title'>" + product.name + ' - ' + category.name + "</h5>" +
                     "<p class='card-text'>" + product.price + ' - ' + product.discount + "</p>" +
                     "<a href='#'' class='btn btn-primary'>AGREGAR AL CARRITO</a>" +
                     "</div></div></li>"
             });
             contenedorSlider += "</ul></div></div></div>";

         });

         document.getElementById('containerProductCategory').innerHTML = contenedorSlider;
         //Despues de armar las categorias con ss respectivos productos invocamos la funciòn "optionSplide" , para el sldier
         this.optionSplide(data);

     }

 }

 function optionSplide(data) {
     //El siguiente bucle monta la libreria de slider en elr espectivo componente.
     data.forEach((category, index) => {
         var sliderCategoryProduct = new Splide('#categoryProducts' + index, {
             perPage: 4,
             gap: 5,
             pagination: false,
         });
         sliderCategoryProduct.mount();
     });
 }