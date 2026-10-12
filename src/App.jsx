import { useState, useEffect } from "react";
import { TarjetaClima } from "./componentes/TarjetaClima";
import { Buscador } from "./componentes/Buscador";

function App() {

  const [clima, setClima] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [ciudad, setCiudad] = useState("")
  const [error, setError] = useState("")

  // Receta 1: el molino 🌾 (ciudad → coordenadas)
  const obtenerLocalizacion = async (ciudad) => {
    const respuestaLocalizacion = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${ciudad}&count=1&language=es`)
    const datosLocalizacion = await respuestaLocalizacion.json()

    if (!datosLocalizacion.results) { throw new Error("Ciudad no encontrada") }

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
  const cargarDatos = async (ciudadEscrita) => {
    setCargando(true)
    setError("")

    try {
      const localizacion = await obtenerLocalizacion(ciudadEscrita)
      const datosDelClima = await obtenerClima(localizacion)

      const climaActual = {
        nombreCiudad: localizacion.nombreCiudad,
        temperatura: datosDelClima.temperatura,
        velocidadDeViento: datosDelClima.velocidadDeViento,
        codigoClima: datosDelClima.codigoClima
      }

      setClima(climaActual)
    } catch (err) {
      if (err.message === "Ciudad no encontrada") {
        setError("Ciudad no encontrada")
      } else {
        setError("No se pudo conectar. Revisa tu internet")
      }
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    cargarDatos("Santiago")
  }, [])


  return (
    <main className="min-h-screen bg-sky-50 flex flex-col items-center justify-center gap-6 p-4">
      <h1 className="text-3xl font-bold text-sky-900">Aplicación de clima</h1>

      <Buscador
        ciudad={ciudad}
        setCiudad={setCiudad}
        cargarDatos={cargarDatos}
      />

      {cargando ? (
        <p className="text-slate-500">Cargando...</p>
      ) : error ? (
        <p className="rounded-lg bg-red-50 px-4 py-2 text-red-600">{error}</p>
      ) : (
        <TarjetaClima clima={clima} />
      )}
    </main>
  )
}

export default App