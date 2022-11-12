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

function dataManagement(data) {
    let input = document.getElementById("content-result");

    if (data.length !== 0) {
        input.classList.remove('hide');
        input.classList.add('show');
        //Manejamos la para para poder insertarla en el HTML

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
                     <button type='button' class='btn btn-primary form-control' onclick='addProduct(${element.id})'>Agregar</button>
                </div>
                    </div>
                </li>`;

        });
        document.getElementById('content-result').innerHTML = bodyResult;

    } else {
        input.classList.remove('show');
        input.classList.add('hide');

    }
}