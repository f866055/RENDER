/**
 * Controlador de Apartamentos / Propiedades en Venta
 * Mantiene compatibilidad con el endpoint GET /api/productos y GET /api/apartamentos
 */
const APARTAMENTOS_DATA = [
  {
    id: 1,
    nombre: "Penthouse SkyView 360°",
    categoria: "Penthouse",
    precio: 485000,
    ubicacion: "Distrito Financiero, Torre Titanium",
    habitaciones: 3,
    banos: 3.5,
    area: 220, // m²
    estacionamientos: 2,
    piso: "Piso 24",
    descripcion: "Exclusivo penthouse de lujo con terraza privada panorámica, acabados en mármol italiano, domótica integral y doble altura.",
    rating: 4.9,
    imagen: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80",
    destacado: true,
    estado: "Disponible"
  },
  {
    id: 2,
    nombre: "Loft Moderno Industrial",
    categoria: "Loft",
    precio: 195000,
    ubicacion: "Barrio Soho / Distrito Creativo",
    habitaciones: 1,
    banos: 1.5,
    area: 88,
    estacionamientos: 1,
    piso: "Piso 5",
    descripcion: "Concepto abierto con vigas a la vista, amplios ventanales termoacústicos de piso a techo y cocina gourmet con isla de cuarzo.",
    rating: 4.8,
    imagen: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80",
    destacado: true,
    estado: "Disponible"
  },
  {
    id: 3,
    nombre: "Residencia Familiar Los Cedros",
    categoria: "Familiar",
    precio: 360000,
    ubicacion: "Sector Residencial Campestre",
    habitaciones: 4,
    banos: 3.5,
    area: 210,
    estacionamientos: 2,
    piso: "Piso 8",
    descripcion: "Ideal para familias. Amplia sala de estar, balcón con zona BBQ, cuarto de servicio y acceso a club house privado con piscina.",
    rating: 4.7,
    imagen: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
    destacado: false,
    estado: "Disponible"
  },
  {
    id: 4,
    nombre: "Apartamento Dúplex Alta Vista",
    categoria: "Dúplex",
    precio: 320000,
    ubicacion: "Mirador de las Palmas",
    habitaciones: 3,
    banos: 3,
    area: 165,
    estacionamientos: 2,
    piso: "Piso 14-15",
    descripcion: "Distribución en dos plantas con escalera flotante de madera, sala de cine, walk-in closet y vistas espectaculares al valle.",
    rating: 4.9,
    imagen: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
    destacado: true,
    estado: "Disponible"
  },
  {
    id: 5,
    nombre: "Studio Smart Executive",
    categoria: "Estudio",
    precio: 135000,
    ubicacion: "Corredor Corporativo Centro",
    habitaciones: 1,
    banos: 1,
    area: 52,
    estacionamientos: 1,
    piso: "Piso 11",
    descripcion: "Diseñado para nómadas digitales y ejecutivos. Alta rentabilidad en plataformas turísticas. Amoblado con mobiliario convertible.",
    rating: 4.6,
    imagen: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80",
    destacado: false,
    estado: "Disponible"
  },
  {
    id: 6,
    nombre: "Ocean View Luxury Suite",
    categoria: "Penthouse",
    precio: 540000,
    ubicacion: "Primera Línea del Malecón",
    habitaciones: 3,
    banos: 4,
    area: 245,
    estacionamientos: 3,
    piso: "Piso 18",
    descripcion: "Frente al mar con acceso por ascensor directo al apartamento. Terraza privada con jacuzzi climatizado y vista al horizonte.",
    rating: 5.0,
    imagen: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80",
    destacado: true,
    estado: "Disponible"
  }
];

export const getProductos = (req, res) => {
  try {
    const { categoria, maxPrecio } = req.query;
    let resultados = APARTAMENTOS_DATA;

    if (categoria && categoria.toLowerCase() !== 'todos') {
      resultados = resultados.filter(
        p => p.categoria.toLowerCase() === categoria.toLowerCase()
      );
    }

    if (maxPrecio) {
      resultados = resultados.filter(p => p.precio <= Number(maxPrecio));
    }

    res.status(200).json({
      ok: true,
      total: resultados.length,
      categoriaActiva: categoria || 'todos',
      productos: resultados
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Error al obtener el catálogo de apartamentos",
      error: error.message
    });
  }
};
