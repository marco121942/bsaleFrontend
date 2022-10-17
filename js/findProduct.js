function searchProduct() {
    let inputValue = document.getElementById("query").value;
    let input = document.getElementById("content-result");
    if (inputValue.length > 2) {
        const data = new FormData();
        data.append('keyword', inputValue);
        fetch('http://localhost:8000/api/v1/search/product', {
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
                    <a href="#" class="result-link">
                        <div class="result-title">
                            ${element.name}
                        </div>
                        <div class="result-content">
                             ${element.price} -   ${element.discount}
                        </div>
                    </a>
                </li>`;

        });
        document.getElementById('content-result').innerHTML = bodyResult;

    } else {
        input.classList.remove('show');
        input.classList.add('hide');

    }
    console.log(data)

}