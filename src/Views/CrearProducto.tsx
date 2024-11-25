/**
 * Archivo de crecion de n nuevo producto
 */
import { Link, Form, useActionData, ActionFunctionArgs,redirect } from "react-router-dom";
import ErrorMensaje from "../Componentes/Comp_ErrorMensaje";
import agregarProducto from "../Services/ProductosService";
import ProductoFormulario from "../Componentes/Comp_ProductoFormulario";


// creacion de la funcion 
export async function accion({request}: ActionFunctionArgs){
    // obtenemos los datos del formulario
    const data = Object.fromEntries(await request.formData())

    // validacion
    let error = ''
    if(Object.values(data).includes('')){
        error = 'todos los campos son obligatorios'
    }

    if(error.length){
        return error
    }

    // si no hay errores de validacion se llama a la funcion del service
    await agregarProducto(data)

    // lo llevamos a la pagina principal
    return redirect('/')

}

export default function CrearProducto() {
    
    //hook 
    const error = useActionData() as string
    
    return (
        <>
            <div className='flex justify-between'>
                <h2 className='text-4xl font-black text-slate-500'>
                    Crear producto
                </h2>

                <Link
                    to="/"
                    className='rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500'
                >
                    Volver a Productos
                </Link>
            </div>


            {/** Formulario  */}
            { error && <ErrorMensaje>{error}</ErrorMensaje>}

            <Form
                className="mt-10"
                method="POST"
            >

               <ProductoFormulario 
               
               />


                <input
                    type="submit"
                    className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                    value="Registrar Producto"
                />
            </Form>
        </>
    )
}