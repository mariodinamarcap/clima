


export const TarjetaClima = ({ clima }) => {

    return (

        <div>
            <p>{clima.nombreCiudad}</p>
            <p>{clima.temperatura}</p>
            <p>{clima.velocidadDeViento}</p>
            <p>{clima.codigoClima}</p>
        </div>

    )
}