/**
 * Arcivo que manejara las rutas de la DATA API
 */

import { createBrowserRouter } from 'react-router-dom'
import Layout from './Layouts/layout'
import Productos, {loader as cargarproductos, action as cambiarDisponibilidadAction } from './Views/Productos'
import CrearProducto, {accion as nuevoProductoAction} from './Views/CrearProducto'
import EditarProducto, { loader as carcarProductoLoader, accion as EditarProductoAction} from './Views/Editarprducto'
import { action as eliminarProductoAction } from './Componentes/Compo_ProductoDetalle' 
// declaramos rutas que vamos a tener en un arreglo de objetos
export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        // los hijos que esten aqui seran hijos del layout 
        children:[
            {
                index:true,
                element: <Productos />,
                loader: cargarproductos,
                action: cambiarDisponibilidadAction
            },
            {
                path: 'productos/nuevo',
                element: <CrearProducto/>,
                action: nuevoProductoAction
            },
            {
                path: 'productos/:id/editar', // No existe un put tal cual 
                element: <EditarProducto/>,
                loader: carcarProductoLoader,
                action: EditarProductoAction
            },
            {
                path:'productos/:id/eliminar',
                action:eliminarProductoAction
            }
        ]
    }
])