/**
 * Controlador de Apartamentos / Propiedades en Venta
 * Incluye galerías fotográficas completas con vista previa de habitaciones y espacios interiores
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
    estado: "Disponible",
    habitacionesDetalle: [
      {
        nombre: "Máster Suite Principal",
        tipo: "Dormitorio Principal",
        area: "32 m²",
        camas: "King Size",
        caracteristicas: "Cama King, vestidor walk-in de roble, ventanales de piso a techo con blackout motorizado y baño privado.",
        imagen: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=80"
      },
      {
        nombre: "Habitación Junior Suite",
        tipo: "Dormitorio 2",
        area: "22 m²",
        camas: "Queen Size",
        caracteristicas: "Baño en suite, clóset empotrado, escritorio de diseño y vistas al skyline de la ciudad.",
        imagen: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=900&q=80"
      },
      {
        nombre: "Habitación de Invitados / Estudio",
        tipo: "Dormitorio 3",
        area: "18 m²",
        camas: "2 Camas Individuales",
        caracteristicas: "Camas twin convertibles, aislamiento acústico total y biblioteca de pared.",
        imagen: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=900&q=80"
      },
      {
        nombre: "Gran Salón Living & Comedor",
        tipo: "Área Social",
        area: "65 m²",
        camas: "Zona Social",
        caracteristicas: "Doble altura de 4.5 metros, chimenea ecológica, pisos de mármol y acceso a la terraza privada.",
        imagen: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80"
      },
      {
        nombre: "Baño Principal Spa",
        tipo: "Baño Suite",
        area: "14 m²",
        camas: "Spa Privado",
        caracteristicas: "Tina de inmersión con vistas panorámicas, grifería italiana dorado mate y ducha hidromasaje.",
        imagen: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=80"
      }
    ]
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
    estado: "Disponible",
    habitacionesDetalle: [
      {
        nombre: "Dormitorio Loft en Mezzanine",
        tipo: "Dormitorio Principal",
        area: "28 m²",
        camas: "King Size",
        caracteristicas: "Elevado sobre la sala de estar con baranda de cristal templado, vestidor abierto y luz cenital.",
        imagen: "https://images.unsplash.com/photo-1540518614846-7ede433c4550?auto=format&fit=crop&w=900&q=80"
      },
      {
        nombre: "Sala Lounge & Espacio Creativo",
        tipo: "Área Social",
        area: "40 m²",
        camas: "Zona Social",
        caracteristicas: "Pared de ladrillo rústico original, proyector cinematográfico y ventanal de 5 metros.",
        imagen: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=900&q=80"
      },
      {
        nombre: "Cocina Gourmet Abierta",
        tipo: "Cocina",
        area: "15 m²",
        camas: "Cocina Chef",
        caracteristicas: "Mesada de concreto pulido e isla con campana extractora suspendida y lavavajillas panelable.",
        imagen: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=900&q=80"
      }
    ]
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
    estado: "Disponible",
    habitacionesDetalle: [
      {
        nombre: "Dormitorio Máster con Balcón",
        tipo: "Dormitorio 1",
        area: "30 m²",
        camas: "King Size",
        caracteristicas: "Cama King con respaldo tapizado, balcón privado al jardín interior, vestidor doble y baño privado.",
        imagen: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=900&q=80"
      },
      {
        nombre: "Dormitorio Juvenil Este",
        tipo: "Dormitorio 2",
        area: "20 m²",
        camas: "Queen Size",
        caracteristicas: "Zona de estudio integrada con repisas flotantes, clóset amplio y mucha iluminación matutina.",
        imagen: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=900&q=80"
      },
      {
        nombre: "Habitación Infantil / Lúdica",
        tipo: "Dormitorio 3",
        area: "18 m²",
        camas: "2 Camas Twin",
        caracteristicas: "Espacio lúdico, piso de madera natural hipoalergénico y amplias gavetas organizadoras.",
        imagen: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80"
      },
      {
        nombre: "Dormitorio de Servicio / Visitas",
        tipo: "Dormitorio 4",
        area: "14 m²",
        camas: "1 Cama Individual",
        caracteristicas: "Baño independiente completo y acceso discreto al área de lavandería.",
        imagen: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=900&q=80"
      },
      {
        nombre: "Family Room & Sala de Juegos",
        tipo: "Área Familiar",
        area: "35 m²",
        camas: "Estar Familiar",
        caracteristicas: "Sofá seccional de 6 plazas, centro de entretenimiento 4K y salida al balcón BBQ.",
        imagen: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80"
      }
    ]
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
    estado: "Disponible",
    habitacionesDetalle: [
      {
        nombre: "Suite Principal Piso Superior",
        tipo: "Dormitorio Principal",
        area: "34 m²",
        camas: "King Size",
        caracteristicas: "Ubicada en el nivel superior para total privacidad, con terraza íntima, vestidor y jacuzzi en suite.",
        imagen: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=80"
      },
      {
        nombre: "Dormitorio 2 con Vista al Valle",
        tipo: "Dormitorio 2",
        area: "21 m²",
        camas: "Queen Size",
        caracteristicas: "Ventanal panorámico, pisos de parquet pulido y baño privado con mármol.",
        imagen: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=900&q=80"
      },
      {
        nombre: "Dormitorio 3 / Home Office",
        tipo: "Dormitorio 3",
        area: "17 m²",
        camas: "Sofá Cama Premium",
        caracteristicas: "Configurado como oficina ejecutiva con sofá cama de lujo y conexión de fibra óptica dedicada.",
        imagen: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80"
      },
      {
        nombre: "Sala Principal con Escalera Flotante",
        tipo: "Área Social",
        area: "48 m²",
        camas: "Zona Social",
        caracteristicas: "Escalera escultórica de roble y acero, iluminación ambiental LED y ventanales esquineros.",
        imagen: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80"
      }
    ]
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
    estado: "Disponible",
    habitacionesDetalle: [
      {
        nombre: "Suite Integrada Smart",
        tipo: "Dormitorio / Estudio",
        area: "32 m²",
        camas: "Queen Murphy Bed",
        caracteristicas: "Cama abatible motorizada que se transforma en escritorio de juntas, panel acústico y proyector.",
        imagen: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80"
      },
      {
        nombre: "Cocina Compacta Europea",
        tipo: "Kitchenette",
        area: "10 m²",
        camas: "Kitchenette",
        caracteristicas: "Horno combinado microondas, refrigerador oculto bajo mesada y cafetera espresso empotrada.",
        imagen: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=900&q=80"
      },
      {
        nombre: "Baño Estilo Hotel Boutique",
        tipo: "Baño",
        area: "10 m²",
        camas: "Baño",
        caracteristicas: "Espejo retroiluminado anti-vaho, ducha de lluvia y acabados en porcelanato gris grafito.",
        imagen: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=80"
      }
    ]
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
    estado: "Disponible",
    habitacionesDetalle: [
      {
        nombre: "Master Ocean Suite",
        tipo: "Dormitorio Principal",
        area: "38 m²",
        camas: "Super King Size",
        caracteristicas: "Despierta con vista directa al mar. Terraza privada, vestidor doble de 12 m² y cortinas automatizadas.",
        imagen: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=900&q=80"
      },
      {
        nombre: "Dormitorio Sunset Bay",
        tipo: "Dormitorio 2",
        area: "24 m²",
        camas: "King Size",
        caracteristicas: "Orientación poniente con atardeceres dorados, baño con tina de hidromasaje y balcón perimetral.",
        imagen: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=80"
      },
      {
        nombre: "Habitación Náutica",
        tipo: "Dormitorio 3",
        area: "20 m²",
        camas: "Queen Size",
        caracteristicas: "Diseño costero contemporáneo, baño completo en suite y acabados en teca marina.",
        imagen: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=900&q=80"
      },
      {
        nombre: "Terraza Superior & Jacuzzi Privado",
        tipo: "Terraza Privada",
        area: "55 m²",
        camas: "Terraza Lounge",
        caracteristicas: "Jacuzzi exterior climatizado para 6 personas, bar húmedo, zona de tumbonas y vista de 180° al océano.",
        imagen: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80"
      }
    ]
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
