/**
 * Funciones que se usaran en disttintos programas
 */

export function formatDollar(cantidad: number){
    return new Intl.NumberFormat('es-US', {
        style: 'currency',
        currency: 'USD'
    }).format(cantidad)
}

// generacr funcion que si en el json tiene "true" se convierte en true 
export function aBooleano(str: string){
    return str.toLowerCase() === "true"
}