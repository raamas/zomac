export const DEFAULT_PRODUCTS = [
  {
    id: "alimentos-1",
    name: "Alimentos",
    category: "alimentos",
    stock: 40,
    badge: "Esencial",
    badgeType: "bestseller",
    description:
      "Alimentos no perecederos: arroz, frijoles, atún, sardinas, harina y galletas.",
  },
  {
    id: "agua-1",
    name: "Agua",
    category: "agua",
    stock: 40,
    badge: "Esencial",
    badgeType: "bestseller",
    description:
      "Agua embotellada para beber y pastillas purificadoras de agua de río o lluvia.",
  },
  {
    id: "aux-1",
    name: "Kit de Primeros Auxilios",
    category: "primeros-auxilios",
    stock: 30,
    badge: "",
    badgeType: "",
    description:
      "Kit completo con vendas, gasas, antiséptico, tijeras, pinzas y guantes estériles.",
  },
  {
    id: "proteccion-1",
    name: "Casco y Equipo de Protección",
    category: "proteccion",
    stock: 40,
    badge: "Esencial",
    badgeType: "bestseller",
    description:
      "Casco de seguridad, guantes anticorte y manta térmica para emergencias.",
  },
  {
    id: "luz-1",
    name: "Linterna LED Recargable",
    category: "iluminacion",
    stock: 25,
    badge: "",
    badgeType: "",
    description:
      "Linterna potente recargable por USB, resistente al agua y con batería de larga duración.",
  },
  {
    id: "radio-1",
    name: "Radio de Emergencia",
    category: "comunicacion",
    stock: 12,
    badge: "",
    badgeType: "",
    description:
      "Radio AM/FM a manivela con luz LED y puerto USB para cargar tu celular.",
  },
  {
    id: "herramientas-1",
    name: "Herramientas y Extintor",
    category: "herramientas",
    stock: 15,
    badge: "",
    badgeType: "",
    description:
      "Multiherramienta 15 en 1 y extintor portátil para tareas y seguridad durante la emergencia.",
  },
  {
    id: "serv-med1",
    name: "Asistencia Médica y Psicológica",
    category: "servicios",
    stock: 15,
    badge: "",
    badgeType: "",
    description:
      "Atención médica, primeros auxilios y apoyo psicológico para adultos y niños.",
  },
  {
    id: "serv-casa1",
    name: "Ayuda en Casa",
    category: "servicios",
    stock: 10,
    badge: "",
    badgeType: "",
    description:
      "Revisión estructural, de gas y eléctrica, y retiro de escombros de tu vivienda.",
  },
  {
    id: "serv-traslado1",
    name: "Traslado y Rescate",
    category: "servicios",
    stock: 8,
    badge: "",
    badgeType: "",
    description:
      "Transporte y evacuación de personas, y rescate de mascotas extraviadas.",
  },
];

export const DEFAULT_CONFIG = {
  shopName: "XiMovil",
  whatsappNumber: "5215512345678",
  storeEmail: "n/a",
  storeAddress: "Centro",
  fulfillingOrganization: "FULL",
  announcementText:
    "🚨 ¿Necesitas ayuda? Cuéntanos qué necesitas en este momento y nuestro equipo te contactará para apoyarte.",
  messageTemplate:
    "🛟 *SOLICITUD DE AYUDA - {shopName}*\n----------------------------------\n👤 *Nombre:* {customerName}\n📱 *Teléfono:* {customerPhone}\n📍 *Ubicación:* {location}\n----------------------------------\n\n📦 *LO QUE NECESITO:*\n{itemList}\n\n----------------------------------\n🤝 *¡Espero su apoyo!*\n----------------------------------\n📝 *Notas:* {orderNotes}",
};
