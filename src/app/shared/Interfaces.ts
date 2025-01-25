export interface Marca {
    id: number;
    nombre: string;
}

export interface Modelo {
    id: number;
    nombre: string;
    marca: Marca;
    variante: string;
    imagen: string;
    precioVenta: number;
    precioCosto: number;
    talles: number[] | undefined;
    productos?: Producto[];	
}

export interface Producto {
    categoria: string;
    modelo: Modelo;
    talle: number | undefined;
    stock: number;
    id: number;
}

// TODO: Revisar la definición de Pedido, ajustar modelos-page y store
export interface DetallePedido {
    producto: Producto;
    cantidad: number;
    precioDeCosto: number;
    precioDeVenta: number;
}
export interface Cliente {
    nombre: string;
    telefono: string;
}

export interface newPedido {
    cliente: Cliente;
    fechaCreacion: string;
    fechaDespacho: string;
    metodoDePago: string;
    estado: string;
    detallePedido: DetallePedido[];
    precioFinal: number;
    costoTotal: number;
    isEnvio: boolean;
    direccion: string;
}
