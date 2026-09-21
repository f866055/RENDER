/**
 * Controlador de comprobación de salud del servidor (Health Check)
 */
export const getHealth = (req, res) => {
  res.status(200).json({
    ok: true,
    message: "Backend funcionando correctamente",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development"
  });
};
