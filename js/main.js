window.onload = () => {
    const ipInput = document.querySelector('#ip');//apunto al input
    const btnBusqueda = document.querySelector('#buscar');//apunto al boton
    const info1 = document.querySelector('#info_api_1');//apunto al div con la primera parte de la informacion
    const info2 = document.querySelector('#info_api_2')


    function manejando_nulls(valor){
        return (valor === null || valor === undefined || valor === "") ? 'no disponible' : valor;
    }
    

    btnBusqueda.addEventListener('click', () =>{
        const ip= ipInput.value.toLowerCase().trim();
        const apiKey = '64b1d8e98540414ec5e3b8f2984a3b72'
        document.querySelector('#geolocalizacion').style.display = 'flex';
        

        if (ip === ""){
            info1.innerHTML = '<p style="color: red;">Por favor ingresa una dirección IP.</p>';
            info2.innerHTML = '<p style="color: red;">Por favor ingresa una dirección IP.</p>';
            return;
        }

        const url = `https://www.iplocate.io/api/lookup/${ip}?apikey=${apiKey}`;

        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log('datos recibidos', data)

            info1.innerHTML= `
            <h3>DATOS BASE</h3>
            <p>IP: ${manejando_nulls(data.ip)}</p>
            <p>País: ${manejando_nulls(data.country)}</p>
            <p>Región: ${manejando_nulls(data.subdivision)}</p>
            <p>Ciudad: ${manejando_nulls(data.city)}</p>
            <p>Moneda: ${manejando_nulls(data.currency_code)}</p>
            <p>Codigo: ${manejando_nulls(data.country_code)}</p>
            <p>Continente: ${manejando_nulls(data.continent)}</p>
            
            `

            info2.innerHTML = `
            <h3>Datos de contacto de abuso</h3>
            <p>dirección: ${manejando_nulls(data.abuse?.address)}</p>
            <p>código de país: ${manejando_nulls(data.abuse?.country_code)}</p>
            <p>dirección de correo electrónico: ${manejando_nulls(data.abuse?.email)} </p>
            <p>nombre del contacto: ${manejando_nulls(data.abuse?.name)} </p>
            <p>rango de red: ${manejando_nulls(data.abuse?.network)} </p>
            <p>número de teléfono: ${manejando_nulls(data.abuse?.phone)} </p>
            
            `
        })
        .catch((error) => {
            console.log('hubo un error', error)
        })

    })
}



