window.onload = () => {
    const ipInput = document.querySelector('#ip');//apunto al input
    const btnBusqueda = document.querySelector('#buscar');//apunto al boton
    const info1 = document.querySelector('#info_api_1');//apunto al div con la primera parte de la informacion
    const info2 = document.querySelector('#info_api_2')//apunto al div con la segunda parte de la informacion 


    function manejando_nulls(valor){ //manejamos los valores nulos, indefinidos o vacios
        return (valor === null || valor === undefined || valor === "") ? 'no disponible' : valor;
    }
    

    btnBusqueda.addEventListener('click', () =>{ //escuchamos el click del usuario
        const ip= ipInput.value.toLowerCase().trim();//obetenemos el valor del input y lo convertimos todo a minusculas eliminando espacios
        const apiKey = '64b1d8e98540414ec5e3b8f2984a3b72'
        document.querySelector('#geolocalizacion').style.display = 'flex';//mostramos el div oculto
        

        if (ip === ""){ // por si se le ocurre no escribir nada
            info1.innerHTML = '<p style="color: red;">Por favor ingresa una dirección IP.</p>';
            info2.innerHTML = '<p style="color: red;">Por favor ingresa una dirección IP.</p>';
            return;
        }

        const url = `https://www.iplocate.io/api/lookup/${ip}?apikey=${apiKey}`;

        fetch(url)//hacemos la peticion a la api 
        .then((response) => response.json())//la convertimos a json
        .then((data) => { //mostramos los datos en la consola 
            console.log('datos recibidos', data)
            //agregamos la primera parte de la info al primer div
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
            //agregamos la info faltante al segundo div, hago uso del operador ? para evitar errores por si data.abuse no existe
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



