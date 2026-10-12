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
        <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-md">
            <p className="text-2xl font-semibold text-slate-700">{clima.nombreCiudad}</p>
            <p className="my-2 text-6xl font-bold text-sky-900">{clima.temperatura} °C</p>
            <p className="text-lg text-slate-600">
                {descripcionesClima[clima.codigoClima] || "Clima desconocido"}
            </p>
            <p className="mt-4 text-sm text-slate-500">💨 Viento: {clima.velocidadDeViento} km/h</p>
        </div>
    )
}