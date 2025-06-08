window.onload = () => {
    const ipInput = document.querySelector('#ip');//apunto al input
    const btnBusqueda = document.querySelector('#buscar');//apunto al boton
    const info1 = document.querySelector('#info_api_1');//apunto al div con la primera parte de la informacion
    const info2 = document.querySelector('#info_api_2')
    

    btnBusqueda.addEventListener('click', () =>{
        const ip= ipInput.value.toLowerCase().trim();
        const apiKey = '64b1d8e98540414ec5e3b8f2984a3b72'
        document.querySelector('#geolocalizacion').style.display = 'flex';
        

        if (ip === ""){
            info1.innerHTML = '<p style="color: red;">Por favor ingresa una dirección IP.</p>';
            return;
        }

        const url = `https://www.iplocate.io/api/lookup/${ip}?apikey=${apiKey}`;

        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log('datos recibidos', data)

            info1.innerHTML= `
            <h3>DATOS BASE</h3>
            <p>IP: ${data.ip}</p>
            <p>País: ${data.country}</p>
            <p>Región: ${data.subdivision}</p>
            <p>Ciudad: ${data.city}</p>
            <p>Moneda: ${data.currency_code}</p>
            <p>Codigo: ${data.country_code}</p>
            <p>Continente: ${data.continent}</p>
            
            `

            info2.innerHTML = `
            <h3>Datos de contacto de abuso</h3>
            <p>dirección: ${data.abuse.address}</p>
            <p>código de país: ${data.abuse.country_code}</p>
            <p>dirección de correo electrónico: ${data.abuse.email} </p>
            <p>nombre del contacto: ${data.abuse.name} </p>
            <p>rango de red: ${data.abuse.network} </p>
            <p>número de teléfono: ${data.abuse.phone} </p>
            
            `
        })
        .catch((error) => {
            console.log('hubo un error', error)
        })

    })
}



