/**
 * Archivo donde esta la logica de la conexion entre la api y react
 */

import { number, parse, pipe, safeParse, string, transform } from 'valibot'
import { BorradorProductpSchema, Producto, ProductoSchema, ProductosSchema } from '../Types'
import axios from 'axios'
import { aBooleano } from '../Utils'

// creacion de los types
type ProductoData = {
    [k: string]: FormDataEntryValue
}


// agregar un prodycto
export default  async function agregarProducto(data: ProductoData){
    try {
        const resultado  = safeParse(BorradorProductpSchema, {
            nombre: data.nombre,
            precio: +data.precio 
        })
        
        // si losd atos enviados son correctos
        if(resultado.success){
            // se hace la peticion a la APi
            const url = `${import.meta.env.VITE_API_URL}/api/productos`

            // hacemos post
             await axios.post(url, {
                nombre: resultado.output.nombre,
                precio: resultado.output.precio
            })
            
        }else{
            throw new Error('Datos no validos')
        }
    } catch (error) {
        console.log(error)
    }
}


// obtener todos los productos
export async function getProductos(){
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/productos`

        const {data} = await axios(url)

        const resultado = safeParse(ProductosSchema, data.data)
        
        if(resultado.success){
            return resultado.output
        }else{
            throw new Error('Hubo un error')
        }

    } catch (error) {
        console.log(error)
    }
}


// Para la peticion de obtener un producto por id
export async function getProductoPorId(id: Producto['id']){
    try {
        // le pasamos la url con el ide
        const url = `${import.meta.env.VITE_API_URL}/api/productos/${id}`
        const { data } = await axios(url)
        const resulatado = safeParse(ProductoSchema, data.data)

        console.log(resulatado)

        if(resulatado.success){
            return resulatado.output
        }else{
            throw new Error('Hubo un error ')
        }
    } catch (error) {
        console.log(error)
    }
}

// funcion para editar a un producto con el ID
export async function actualizarProducto(data: ProductoData, id: Producto['id']){

    // convertir de string a numero del data
    const NumeroSchema = pipe(string(), transform(Number), number())

    try {

        // convertirmos el data en un objeto que se traduce a nuestro Schema de producto
        const resultado = safeParse(ProductoSchema, {
            id: id,
            nombre: data.nombre,
            precio: parse(NumeroSchema, data.precio),
            disponible: aBooleano(data.disponible.toString())
        })

        // si es exitosa hacemos la actualizacion a la api
        if(resultado.success){
            const url = `${import.meta.env.VITE_API_URL}/api/productos/${id}`

            // hacemos la peticion put
            await axios.put(url, resultado.output )
        }



    } catch (error) {
        console.log(error)   
    }
}

// funcion para elimianr producto
export async function eliminarProducto(id: Producto['id']){
    
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/productos/${id}`
        // llamamos a la api
        await axios.delete(url)


    } catch (error) {
        console.log(error)
    }
}

// funcion para editar la disponibilidad
export async function actualizarDsiponibilidad(id: Producto['id']){
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/productos/${id}`

        await axios.patch(url)


    } catch (error) {
        console.log(error)
    }
}