const descripcionesClima = {
    0: "☀️ Despejado",
    1: "🌤️ Mayormente despejado",
    2: "⛅ Parcialmente nublado",
    3: "☁️ Nublado",
    45: "🌫️ Niebla",
    61: "🌧️ Lluvia",
    71: "🌨️ Nieve",
    95: "⛈️ Tormenta",
}

export const TarjetaClima = ({ clima }) => {
    return (
        <div>
            <p>{clima.nombreCiudad}</p>
            <p>{clima.temperatura} °C</p>
            <p>{clima.velocidadDeViento} km/h</p>
            <p>{descripcionesClima[clima.codigoClima] || "Clima desconocido"}</p>
        </div>
    )
}