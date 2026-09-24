/**
 * Controlador de Vehículos / Superdeportivos y Autos de Lujo en Venta
 * Incluye especificaciones técnicas completas y galerías de inspección fotográfica
 */
const VEHICULOS_DATA = [
  {
    id: 1,
    nombre: "Ferrari SF90 Stradale Assetto Fiorano",
    marca: "Ferrari",
    categoria: "Superdeportivos",
    precio: 625000,
    ubicacion: "Showroom Central • Entrega Inmediata",
    potencia: "1,000 HP",
    aceleracion: "2.5s (0-100 km/h)",
    velocidadMax: "340 km/h",
    motor: "4.0L V8 Twin-Turbo + 3 Motores Eléctricos PHEV",
    transmision: "F1 Doble Embrague 8 vel.",
    traccion: "e-AWD Tracción Total",
    kilometraje: "150 km",
    ano: 2024,
    descripcion: "El hiperhíbrido insignia de Maranello con paquete Assetto Fiorano: suspensión de competición Multimatic, escape de titanio y carga aerodinámica de 390 kg.",
    rating: 5.0,
    imagen: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1000&q=80",
    destacado: true,
    estado: "Disponible",
    galeriaDetalle: [
      {
        nombre: "Vista Exterior Frontal Aerodinámica",
        tipo: "Carrocería Exterior",
        especificacion: "Fibra de Carbono & Rosso Corsa",
        caracteristicas: "Tomas de aire frontales activas para refrigeración de los motores eléctricos y splitter de competición.",
        imagen: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1000&q=80"
      },
      {
        nombre: "Cockpit F1 con Volante Háptico",
        tipo: "Interior & Conducción",
        especificacion: "Cuero Nero & Alcantara",
        caracteristicas: "Instrumentación digital curva de 16 pulgadas, Head-Up Display y manettino táctil con modos eDrive y Qualify.",
        imagen: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80"
      },
      {
        nombre: "Bahía del Motor V8 Twin-Turbo",
        tipo: "Tren Motriz",
        especificacion: "1,000 HP Combinados",
        caracteristicas: "Motor térmico central V8 biturbo de 780 HP acoplado a 3 motores eléctricos generadores de 220 HP adicionales.",
        imagen: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1000&q=80"
      },
      {
        nombre: "Rines de Fibra de Carbono y Frenos Brembo",
        tipo: "Ruedas & Frenado",
        especificacion: "Discos Carbocerámicos",
        caracteristicas: "Rines aligerados de carbono con neumáticos Michelin Pilot Sport Cup 2R y frenos carbocerámicos de 398 mm.",
        imagen: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1000&q=80"
      }
    ]
  },
  {
    id: 2,
    nombre: "Porsche 911 GT3 RS (992)",
    marca: "Porsche",
    categoria: "Superdeportivos",
    precio: 385000,
    ubicacion: "Paddock Track Division",
    potencia: "525 HP",
    aceleracion: "3.2s (0-100 km/h)",
    velocidadMax: "296 km/h",
    motor: "4.0L Boxer 6 Atmosférico 9,000 RPM",
    transmision: "PDK 7 vel. Calibración Motorsport",
    traccion: "RWD Trasera",
    kilometraje: "0 km",
    ano: 2024,
    descripcion: "Arma definitiva para circuito homologada para calle. Aerodinámica activa DRS con alerón trasero 'cuello de cisne' y paquete Weissach ligero.",
    rating: 4.9,
    imagen: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1000&q=80",
    destacado: true,
    estado: "Disponible",
    galeriaDetalle: [
      {
        nombre: "Diseño Exterior Aerodinámico DRS",
        tipo: "Carrocería Exterior",
        especificacion: "Paquete Weissach",
        caracteristicas: "Alerón trasero activo con función de reducción de resistencia DRS accionable desde el volante de carreras.",
        imagen: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1000&q=80"
      },
      {
        nombre: "Cabina de Piloto con Jaula de Titanio",
        tipo: "Interior & Conducción",
        especificacion: "Asientos Bucket de Carbono",
        caracteristicas: "Mandos rotativos para control de rebote/compresión de suspensión independiente, diferencial PTV Plus y jaula antivuelco.",
        imagen: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1000&q=80"
      },
      {
        nombre: "Motor Bóxer de 9,000 RPM",
        tipo: "Tren Motriz",
        especificacion: "Atmosférico Puro",
        caracteristicas: "Respiración natural con sistema de acelerador individual por cilindro y radiador central derivado de Le Mans.",
        imagen: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1000&q=80"
      }
    ]
  },
  {
    id: 3,
    nombre: "Lamborghini Revuelto V12 HPEV",
    marca: "Lamborghini",
    categoria: "Hiperdeportivos",
    precio: 720000,
    ubicacion: "Bóveda VIP Sant'Agata",
    potencia: "1,015 HP",
    aceleracion: "2.5s (0-100 km/h)",
    velocidadMax: "350 km/h",
    motor: "6.5L V12 Atmosférico + 3 Motores Eléctricos",
    transmision: "Doble Embrague 8 vel. Transversal",
    traccion: "AWD Eléctrica con Torque Vectoring",
    kilometraje: "80 km",
    ano: 2025,
    descripcion: "El primer superdeportivo híbrido enchufable V12 HPEV. Monofuselaje completo de fibra de carbono, diseño aeroespacial 'Y-shape' y 1,015 caballos.",
    rating: 5.0,
    imagen: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1000&q=80",
    destacado: true,
    estado: "Edición Limitada",
    galeriaDetalle: [
      {
        nombre: "Silueta Exótica con Puertas Tijera",
        tipo: "Carrocería Exterior",
        especificacion: "Diseño Hexagonal Stealth",
        caracteristicas: "Líneas afiladas inspiradas en cazas de combate de quinta generación y escape hexagonal de salida superior.",
        imagen: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1000&q=80"
      },
      {
        nombre: "Cabina de Vuelo Espacial",
        tipo: "Interior & Conducción",
        especificacion: "Triple Pantalla Interactiva",
        caracteristicas: "Pantalla del conductor de 12.3', pantalla central táctil de 8.4' y pantalla acompañante de 9.1'.",
        imagen: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80"
      },
      {
        nombre: "Corazón V12 Atmosférico de 825 CV",
        tipo: "Tren Motriz",
        especificacion: "Régimen Máximo 9,500 RPM",
        caracteristicas: "El V12 más ligero y potente en la historia de Lamborghini con sonido de alta fidelidad inconfundible.",
        imagen: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1000&q=80"
      }
    ]
  },
  {
    id: 4,
    nombre: "Aston Martin DBS 770 Ultimate",
    marca: "Aston Martin",
    categoria: "Gran Turismo",
    precio: 440000,
    ubicacion: "Colección Privada Gaydon",
    potencia: "770 HP",
    aceleracion: "3.4s (0-100 km/h)",
    velocidadMax: "340 km/h",
    motor: "5.2L Twin-Turbo V12",
    transmision: "ZF Automática Deportiva 8 vel.",
    traccion: "RWD con Diferencial Autoblocante Mecánico",
    kilometraje: "420 km",
    ano: 2024,
    descripcion: "La máxima expresión del Gran Turismo británico. Una despedida magistral para la saga DBS con chasis reforzado y 900 Nm de par motor.",
    rating: 4.8,
    imagen: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1000&q=80",
    destacado: false,
    estado: "Disponible",
    galeriaDetalle: [
      {
        nombre: "Elegancia Escultural Británica",
        tipo: "Carrocería Exterior",
        especificacion: "Capó Clamshell con Salidas Herradura",
        caracteristicas: "Diseño imponente con divisor de fibra de carbono macizo y perfil aerodinámico de alta velocidad.",
        imagen: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1000&q=80"
      },
      {
        nombre: "Interior Artesanal en Piel Bridge of Weir",
        tipo: "Interior & Conducción",
        especificacion: "Costuras a Mano & Fibra de Carbono Twill",
        caracteristicas: "Asientos Performance acolchados con ribetes de contraste y sistema de audio Bowers & Wilkins Halo.",
        imagen: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1000&q=80"
      }
    ]
  },
  {
    id: 5,
    nombre: "Mercedes-AMG G 63 4x4² Carbon",
    marca: "Mercedes-AMG",
    categoria: "SUVs de Rendimiento",
    precio: 360000,
    ubicacion: "División Todo Terreno VIP",
    potencia: "585 HP",
    aceleracion: "4.5s (0-100 km/h)",
    velocidadMax: "240 km/h",
    motor: "4.0L V8 Biturbo Handcrafted AMG",
    transmision: "AMG SPEEDSHIFT TCT 9G",
    traccion: "4MATIC con 3 Bloqueos de Diferencial y Ejes Portales",
    kilometraje: "1,200 km",
    ano: 2024,
    descripcion: "Monstruo todoterreno con altura libre al suelo de 351 mm, vadeo de hasta 91 cm y todo el lujo opulento del interior AMG Exclusive Manufaktur.",
    rating: 4.9,
    imagen: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=1000&q=80",
    destacado: false,
    estado: "Disponible",
    galeriaDetalle: [
      {
        nombre: "Imponencia Todoterreno Extrema",
        tipo: "Carrocería Exterior",
        especificacion: "Ejes Portales & Molduras de Carbono",
        caracteristicas: "Pasos de rueda ensanchados en fibra de carbono vista y barra de iluminación LED en techo.",
        imagen: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=1000&q=80"
      },
      {
        nombre: "Salón de Lujo Blindado y Conectado",
        tipo: "Interior & Conducción",
        especificacion: "Cuero Nappa Bicolor & Fibra de Carbono Mate",
        caracteristicas: "Doble pantalla panorámica Widescreen Cockpit, asientos multicontorno con masaje e iluminación ambiental de 64 colores.",
        imagen: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1000&q=80"
      }
    ]
  },
  {
    id: 6,
    nombre: "Rimac Nevera Time Attack Edition",
    marca: "Rimac",
    categoria: "Eléctricos & Híbridos",
    precio: 2200000,
    ubicacion: "Bóveda Exclusiva • Reserva Especial",
    potencia: "1,914 HP",
    aceleracion: "1.81s (0-100 km/h)",
    velocidadMax: "412 km/h",
    motor: "4 Motores Magnéticos Independientes (Quad-Motor)",
    transmision: "Transmisiones de Relación Única por Rueda",
    traccion: "All-Wheel Torque Vectoring 2 (R-AWTV)",
    kilometraje: "50 km",
    ano: 2024,
    descripcion: "El automóvil de aceleración más rápida del planeta. Rompedor de más de 20 récords mundiales en Nürburgring con batería de 120 kWh a 800V.",
    rating: 5.0,
    imagen: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1000&q=80",
    destacado: true,
    estado: "Edición Limitada",
    galeriaDetalle: [
      {
        nombre: "Monocasco de Carbono Integral",
        tipo: "Carrocería Exterior",
        especificacion: "Pintura Squadron Black con Rayas Eléctricas",
        caracteristicas: "Estructura de monocasco de una sola pieza de fibra de carbono más rígida jamás montada en un vehículo de calle.",
        imagen: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1000&q=80"
      },
      {
        nombre: "Telemetría de Competición en Tiempo Real",
        tipo: "Interior & Conducción",
        especificacion: "Cockpit Minimalista Digital",
        caracteristicas: "Sistema de telemetría por satélite con análisis de fuerzas G, frenada regenerativa y ajuste milimétrico de par por rueda.",
        imagen: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80"
      }
    ]
  }
];

export const getProductos = (req, res) => {
  try {
    const { categoria, maxPrecio } = req.query;
    let resultados = VEHICULOS_DATA;

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
      message: "Error al obtener el catálogo de vehículos",
      error: error.message
    });
  }
};
