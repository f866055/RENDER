/**
 * Controlador de Productos de ejemplo
 */
const PRODUCTOS_DATA = [
  {
    id: 1,
    nombre: "Teclado Mecánico RGB Pro",
    categoria: "Periféricos",
    precio: 89.99,
    stock: 15,
    descripcion: "Interruptores ópticos lineales, retroiluminación RGB por tecla y chasis de aluminio aeroespacial.",
    rating: 4.8,
    icono: "⌨️",
    destacado: true
  },
  {
    id: 2,
    nombre: "Ratón Inalámbrico Ultra Ligero",
    categoria: "Periféricos",
    precio: 59.50,
    stock: 24,
    descripcion: "Sensor óptico de 26,000 DPI, peso ultraligero de 58g y batería de 80 horas de duración continua.",
    rating: 4.9,
    icono: "🖱️",
    destacado: true
  },
  {
    id: 3,
    nombre: "Monitor Gamer 27\" 165Hz QHD",
    categoria: "Monitores",
    precio: 279.00,
    stock: 8,
    descripcion: "Panel IPS con resolución 2560x1440, 1ms de respuesta GtG y compatibilidad AMD FreeSync Premium.",
    rating: 4.7,
    icono: "🖥️",
    destacado: false
  },
  {
    id: 4,
    nombre: "Auriculares Inalámbricos Studio ANC",
    categoria: "Audio",
    precio: 149.90,
    stock: 12,
    descripcion: "Cancelación activa de ruido híbrida, drivers de neodimio de 40mm y micrófonos con IA.",
    rating: 4.6,
    icono: "🎧",
    destacado: true
  },
  {
    id: 5,
    nombre: "Micrófono USB Cardioide Podcast",
    categoria: "Audio",
    precio: 74.99,
    stock: 19,
    descripcion: "Captura de 24-bit/96kHz, filtro antipop integrado y botón de silenciamiento táctil con LED.",
    rating: 4.5,
    icono: "🎙️",
    destacado: false
  },
  {
    id: 6,
    nombre: "Silla Ergonómica Pro Mesh",
    categoria: "Mobiliario",
    precio: 219.00,
    stock: 5,
    descripcion: "Malla transpirable de alta resistencia, soporte lumbar dinámico y reposabrazos 4D ajustables.",
    rating: 4.9,
    icono: "💺",
    destacado: false
  }
];

export const getProductos = (req, res) => {
  try {
    const { categoria } = req.query;
    let resultados = PRODUCTOS_DATA;

    if (categoria && categoria !== 'todos') {
      resultados = resultados.filter(
        p => p.categoria.toLowerCase() === categoria.toLowerCase()
      );
    }

    res.status(200).json({
      ok: true,
      total: resultados.length,
      productos: resultados
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Error al obtener los productos",
      error: error.message
    });
  }
};
