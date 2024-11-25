/**
 * Archivo de EDicion de un producto
 */
import { Link, Form, useActionData, ActionFunctionArgs, redirect, LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import ErrorMensaje from "../Componentes/Comp_ErrorMensaje";
import { actualizarProducto, getProductoPorId } from "../Services/ProductosService";
import { Producto } from "../Types";
import ProductoFormulario from "../Componentes/Comp_ProductoFormulario";


// creacion de la funcion 
export async function accion({ request, params }: ActionFunctionArgs) {

    // obtenemos los datos del formulario
    const data = Object.fromEntries(await request.formData())

    // validacion
    let error = ''
    if (Object.values(data).includes('')) {
        error = 'todos los campos son obligatorios'
    }

    if (error.length) {
        return error
    }

    // verificamos que no sea undefined
    if (params.id !== undefined) {
        // si no hay errores de validacion se llama a la funcion del service
        await actualizarProducto(data, +params.id)
    }

    // lo llevamos a la pagina principal
    return redirect('/')

}

// opciones de disponible
const disponibildadOpciones = [
    { nombre: 'Disponible', valor: true },
    { nombre: 'No Disponible', valor: false }
]


// creamos un loader para obtener los datos del producto pro su id
// le pasamos el parametro de la url con esto
export async function loader({ params }: LoaderFunctionArgs) {

    // checamos que no sea undefined
    if (params.id !== undefined) {
        const producto = await getProductoPorId(+params.id)

        if (!producto) {
            return redirect('/')
        }

        return producto
    }
}


export default function EditarProducto() {

    // obtenemos el producto del useLoader
    const producto = useLoaderData() as Producto

    //hook 
    const error = useActionData() as string


    return (
        <>
            <div className='flex justify-between'>
                <h2 className='text-4xl font-black text-slate-500'>
                    Editar producto
                </h2>

                <Link
                    to="/"
                    className='rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500'
                >
                    Volver a Productos
                </Link>
            </div>


            {/** Formulario  */}
            {error && <ErrorMensaje>{error}</ErrorMensaje>}

            <Form
                className="mt-10"
                method="POST"
            >
                
                <ProductoFormulario 
                    producto={producto}
                />

                {/** campo disponible */}
                <div className="mb-4">
                    <label
                        className="text-gray-800"
                        htmlFor="availability"
                    >Disponibilidad:</label>
                    <select
                        id="disponible"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        name="disponible"
                        defaultValue={producto?.disponible.toString()}
                    >
                        {disponibildadOpciones.map(option => (
                            <option key={option.nombre} value={option.valor.toString()}>{option.nombre}</option>
                        ))}
                    </select>
                </div>

                <input
                    type="submit"
                    className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                    value="Guardar Cambios"
                />
            </Form>
        </>
    )
}