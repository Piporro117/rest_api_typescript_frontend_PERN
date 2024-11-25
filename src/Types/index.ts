/**
 * Archivo para la creacion de los Schemas
 */
import { object, string, number, boolean, InferOutput,array} from 'valibot'

export const BorradorProductpSchema = object({
    nombre: string(),
    precio: number()
})

// scema de producto para mostrar
export const ProductoSchema = object({
    id: number(),
    nombre: string(),
    precio: number(),
    disponible: boolean()
})

// schema 


export const ProductosSchema = array(ProductoSchema)

// creamos un type del schema
export type Producto = InferOutput<typeof ProductoSchema>