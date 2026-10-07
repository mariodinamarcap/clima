import { useState, useEffect } from "react";
import { TarjetaClima } from "./TarjetaClima";

function App() {

  const [clima, setClima] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {

    // Receta 1: el molino 🌾 (ciudad → coordenadas)
    const obtenerLocalizacion = async (ciudad) => {
      const respuestaLocalizacion = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${ciudad}&count=1&language=es`)
      const datosLocalizacion = await respuestaLocalizacion.json()

      const latitud = datosLocalizacion.results[0].latitude
      const longitud = datosLocalizacion.results[0].longitude
      const nombreCiudad = datosLocalizacion.results[0].name

      const localizacion = {
        latitud: latitud,
        longitud: longitud,
        nombreCiudad: nombreCiudad
      }

      return localizacion
    }

    // Receta 2: la panadería 🍞 (coordenadas → clima)
    const obtenerClima = async ({ latitud, longitud }) => {
      const respuestaClima = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&current=temperature_2m,wind_speed_10m,weather_code`)
      const datosClima = await respuestaClima.json()

      const temperatura = datosClima.current.temperature_2m
      const velocidadDeViento = datosClima.current.wind_speed_10m
      const codigoClima = datosClima.current.weather_code

      const datosDelClima = {
        temperatura: temperatura,
        velocidadDeViento: velocidadDeViento,
        codigoClima: codigoClima
      }

      return datosDelClima
    }

    // Receta 3: el chef 👨‍🍳 (usa las dos recetas en orden)
    const cargarDatos = async () => {
      const localizacion = await obtenerLocalizacion("Santiago")
      const datosDelClima = await obtenerClima(localizacion)

      const climaActual = {
        nombreCiudad: localizacion.nombreCiudad,
        temperatura: datosDelClima.temperatura,
        velocidadDeViento: datosDelClima.velocidadDeViento,
        codigoClima: datosDelClima.codigoClima
      }

      setClima(climaActual)
      setCargando(false)
    }

    cargarDatos()
  }, [])

  return (
    <>
      <h1>aplicación de clima</h1>
      {cargando ? <p>Cargando...</p> : <TarjetaClima clima={clima} />}
    </>
  )
}

export default App