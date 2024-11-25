/**
 * Vista que mostrara la lista de prodcutos
 */
import { ActionFunctionArgs, Link, useLoaderData } from 'react-router-dom'
import { actualizarDsiponibilidad, getProductos } from '../Services/ProductosService'
import ProductoDetalles from '../Componentes/Compo_ProductoDetalle'
import { Producto } from '../Types'

// creamos la funcion para mostrar todos los prodcutos
// con louder
export async function loader() {
    try {
        const productos = await getProductos();
        return productos;
    } catch (error) {
        console.error('Error cargando productos:', error);
        return []; // Devuelve un arreglo vacío como fallback
    }
}


/** Acccion para cambiar lo disponible */
export async function action({request}: ActionFunctionArgs){
    // le pasamos el cuerpo del fomrulario de disponible 
    // osea disponible 
    const data = Object.fromEntries( await request.formData())

    await actualizarDsiponibilidad(+data.id)

    return null
}

export default function Productos() {

    // usamos el hook de loader data
    const productos = useLoaderData() as Producto[]

    return (
        <>
            <div className='flex justify-between'>
                <h2 className='text-4xl font-black text-slate-500'>
                    Productos
                </h2>

                <Link
                    to="productos/nuevo"
                    className='rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500'
                >
                    Agregar Producto
                </Link>
            </div>


            {/** TABLA PRODUCTOs */}
            <div className="p-2">
                <table className="w-full mt-5 table-auto">
                    <thead className="bg-slate-800 text-white">
                        <tr>
                            <th className="p-2">Producto</th>
                            <th className="p-2">Precio</th>
                            <th className="p-2">Disponibilidad</th>
                            <th className="p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/** Recorrer productos */}
                        {productos.map(i => (
                            <ProductoDetalles
                                key={i.id}
                                producto={i}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

        </>
    )
}