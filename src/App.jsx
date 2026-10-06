import { useState, useEffect } from "react";
import { TarjetaClima } from "./TarjetaClima";

function App() {

  const [clima, setClima] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const obtenerClima = async () => {
      const respuestaLocalizacion = await fetch("https://geocoding-api.open-meteo.com/v1/search?name=Santiago&count=1&language=es")
      const datosLocalizacion = await respuestaLocalizacion.json()


      const latitud = datosLocalizacion.results[0].latitude
      const longitud = datosLocalizacion.results[0].longitude
      const nombreCiudad = datosLocalizacion.results[0].name



      const respuestaClima = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&current=temperature_2m,wind_speed_10m,weather_code`)
      const datosClima = await respuestaClima.json()


      const temperatura = datosClima.current.temperature_2m
      const velocidadDeViento = datosClima.current.wind_speed_10m
      const codigoClima = datosClima.current.weather_code



      const climaActual = {
        nombreCiudad: nombreCiudad,
        temperatura: temperatura,
        velocidadDeViento: velocidadDeViento,
        codigoClima: codigoClima
      }
      setClima(climaActual)
      setCargando(false)

    }
    obtenerClima()
  }, [])


  return (
    <>
      <h1>aplicación de clima</h1>
      {cargando ? <p>Cargando...</p> : <TarjetaClima clima={clima} />}
    </>
  )
}

export default App
