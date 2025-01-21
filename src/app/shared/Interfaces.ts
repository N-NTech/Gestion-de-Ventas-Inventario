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
    id: number;
    producto: Producto;
    cantidad: number;
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
    productos: any[];
    precioVenta: number;
    precioCosto: number;
    isEnvio: boolean;
    direccion: string;
}
