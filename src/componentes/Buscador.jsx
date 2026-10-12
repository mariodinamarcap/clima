
export const Buscador = ({ ciudad, setCiudad, cargarDatos }) => {
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                cargarDatos(ciudad)
            }}
            className="flex w-full max-w-sm gap-2"
        >
            <input
                type="text"
                value={ciudad}
                placeholder="Busca una ciudad"
                onChange={(e) => setCiudad(e.target.value)}
                className="flex-1 rounded-lg border border-sky-200 bg-white px-4 py-2 outline-none focus:ring-2 focus:ring-sky-300"
            />
            <button
                type="submit"
                className="rounded-lg bg-sky-500 px-4 py-2 font-medium text-white hover:bg-sky-600"
            >
                Buscar
            </button>
        </form>
    )
}