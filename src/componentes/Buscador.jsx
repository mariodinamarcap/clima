
export const Buscador = ({ ciudad, setCiudad, cargarDatos }) => {
    return (
        <>
            <input
                type="text"
                value={ciudad}
                placeholder="Busca una ciudad"
                onChange={(e) => setCiudad(e.target.value)} />
            <button onClick={() => cargarDatos(ciudad)}>Buscar</button>
        </>
    )
}