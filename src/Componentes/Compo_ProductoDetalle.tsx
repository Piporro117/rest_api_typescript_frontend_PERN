import { ActionFunctionArgs, Form, redirect, useFetcher, useNavigate } from "react-router-dom"
import { Producto } from "../Types"
import { formatDollar } from "../Utils"
import { eliminarProducto } from "../Services/ProductosService"

/**
 * Componente visual para los detalles del prdocuto
 */
type ProductoDetallesProps = {
    producto: Producto
}


// cremaos la funcion action que activara el formulario de eliminar
export async function action ({params}: ActionFunctionArgs){
    if(params.id !== undefined){
        await eliminarProducto(+params.id)

        // redirigimos a la pagina principal
        return redirect('/')
    }
}

export default function ProductoDetalles({ producto }: ProductoDetallesProps) {

    // creamos una variable para la disponibilidad
    const esDsiponible = producto.disponible

    // utilizaemos el useNavigate
    const navegar = useNavigate()

    // utilizar fetcher
    const fetcher = useFetcher()

    return (
        
            <tr className="border-b ">
                <td className="p-3 text-lg text-gray-800">
                    {producto.nombre}
                </td>
                <td className="p-3 text-lg text-gray-800">
                    {formatDollar(producto.precio)}
                </td>
                <td className="p-3 text-lg text-gray-800">
                    {/** formulario comida */}
                    <fetcher.Form method="POST">
                        <button 
                            type="submit"
                            name="id"
                            value={producto.id}
                            className={`${esDsiponible ? 'text-black' : 'text-red-600'} rounded-lg p-2 text-xs uppercase font-bold w-full
                                        border-black-100 hover:cursor-pointer`}          
                        >
                            { esDsiponible ? 'Es disponible' : 'No esta disponible'}
                        </button>
                    </fetcher.Form>

                    
                </td>
                <td className="p-3 text-lg text-gray-800 ">
                    {/** boton editar */}
                    <div className="flex gap-2 items-center">
                        <button
                        onClick={() => navegar(`productos/${producto.id}/editar`, {
                            state:{ // se pasa a la otra pagina
                                producto: producto
                            }
                        })}
                        className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
                        >
                            Editar
                        </button>

                        {/** tenemos que poner en accion el link de eliminar */}
                        <Form
                            className="w-full"
                            method="POST"
                            action={`productos/${producto.id}/eliminar`}
                            onSubmit={(e) => {
                                if(!confirm('¿Eliminar?')){
                                    e.preventDefault()
                                }
                            }}// mensaje de confirmacion
                        >
                            <input 
                                type="submit"
                                value='Eliminar'
                                className="bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
                            />
                        </Form>
                    </div>

                </td>
            </tr>
        
    )
}