import { Producto } from "../Types"

/**
 * Componente de fromulario
 */
type ProductoFormularioProps = {
    producto?: Producto
}


export default function ProductoFormulario({producto}: ProductoFormularioProps) {
    return (
        <>
            <div className="mb-4">
                <label
                    className="text-gray-800"
                    htmlFor="name"
                >Nombre Producto:</label>
                <input
                    id="name"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Nombre del Producto"
                    name="nombre"
                    defaultValue={producto?.nombre}
                />
            </div>
            <div className="mb-4">
                <label
                    className="text-gray-800"
                    htmlFor="price"
                >Precio:</label>
                <input
                    id="price"
                    type="number"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Precio Producto. ej. 200, 300"
                    name="precio"
                    defaultValue={producto?.precio}
                />
            </div>
        </>
    )
}