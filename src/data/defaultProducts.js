export const DEFAULT_PRODUCTS = [
  {
    id: 'casco-1',
    name: 'Casco de Seguridad para Emergencias',
    category: 'proteccion',
    stock: 25,
    badge: 'Esencial',
    badgeType: 'bestseller',
    description: 'Casco rígido certificado con correa ajustable. Imprescindible para protegerte durante un sismo o derrumbe.'
  },
  {
    id: 'casco-2',
    name: 'Casco Infantil de Emergencia',
    category: 'proteccion',
    stock: 10,
    badge: 'Familia',
    badgeType: 'new',
    description: 'Talla infantil ajustable, ligero y con espuma acolchada para proteger a los más pequeños.'
  },
  {
    id: 'guantes-1',
    name: 'Guantes de Trabajo Anticorte',
    category: 'proteccion',
    stock: 40,
    badge: 'Protección',
    badgeType: 'featured',
    description: 'Palma reforzada y puño ajustable. Ideales para retirar escombros y cristales con seguridad.'
  },
  {
    id: 'manta-1',
    name: 'Manta Térmica de Emergencia (x2)',
    category: 'proteccion',
    stock: 60,
    badge: '',
    badgeType: '',
    description: 'Retiene hasta el 90% del calor corporal. Compacta y plegable, perfecta para kits 72 horas.'
  },
  {
    id: 'aux-1',
    name: 'Kit de Primeros Auxilios Completo',
    category: 'primeros-auxilios',
    stock: 15,
    badge: 'Más Vendido',
    badgeType: 'bestseller',
    description: 'Incluye vendas, gasas, antiséptico, tijeras, pinzas y guantes estériles para atender heridas.'
  },
  {
    id: 'aux-2',
    name: 'Vendas y Gasas Estériles (Pack)',
    category: 'primeros-auxilios',
    stock: 30,
    badge: '',
    badgeType: '',
    description: 'Vendas elásticas y gasas estériles para curaciones rápidas durante la emergencia.'
  },
  {
    id: 'agua-1',
    name: 'Agua Embotellada 12 x 1L',
    category: 'agua',
    stock: 50,
    badge: 'Esencial',
    badgeType: 'bestseller',
    description: 'Botellas de agua purificada, selladas y listas para tu kit de emergencia familiar.'
  },
  {
    id: 'agua-2',
    name: 'Pastillas Purificadoras de Agua (x20)',
    category: 'agua',
    stock: 35,
    badge: '',
    badgeType: '',
    description: 'Purifican hasta 20 litros de agua de río o lluvia. Caducidad de 5 años y tamaño de bolsillo.'
  },
  {
    id: 'comida-1',
    name: 'Kit de Alimentos No Perecederos 72h',
    category: 'alimentos',
    stock: 12,
    badge: 'Kit 72h',
    badgeType: 'new',
    description: 'Raciones con caducidad de 5+ años para 3 días: galletas, enlatados y bebidas hidratantes.'
  },
  {
    id: 'comida-2',
    name: 'Barras Energéticas (Pack x 24)',
    category: 'alimentos',
    stock: 20,
    badge: 'Energía',
    badgeType: 'featured',
    description: 'Barras de alto contenido calórico y caducidad de 2 años. Perfectas para emergencias.'
  },
  {
    id: 'comida-3',
    name: 'Alimentos Enlatados (Pack x 12)',
    category: 'alimentos',
    stock: 0,
    badge: 'Agotado',
    badgeType: 'sale',
    description: 'Surtido de enlatados con caducidad prolongada y abrelatas manual incluido.'
  },
  {
    id: 'luz-1',
    name: 'Linterna Recargable LED',
    category: 'iluminacion',
    stock: 22,
    badge: 'Esencial',
    badgeType: 'bestseller',
    description: 'Potente luz LED recargable por USB. Resistente al agua y con batería de larga duración.'
  },
  {
    id: 'luz-2',
    name: 'Linterna de Manivela (Sin Baterías)',
    category: 'iluminacion',
    stock: 18,
    badge: 'Sin cortes',
    badgeType: 'new',
    description: 'Se carga girando la manivela. Incluye modo SOS y no depende de la corriente eléctrica.'
  },
  {
    id: 'radio-1',
    name: 'Radio de Emergencia a Manivela',
    category: 'comunicacion',
    stock: 8,
    badge: 'Comunicación',
    badgeType: 'featured',
    description: 'AM/FM con alerta meteorológica. Carga con manivela, luz LED y puerto USB para tu celular.'
  },
  {
    id: 'herramienta-1',
    name: 'Multiherramienta 15 en 1',
    category: 'herramientas',
    stock: 26,
    badge: '',
    badgeType: '',
    description: 'Alicates, cuchillas, destornilladores y más en un solo útil compacto para cualquier tarea.'
  },
  {
    id: 'herramienta-2',
    name: 'Extintor Portátil ABC 2.5kg',
    category: 'herramientas',
    stock: 6,
    badge: 'Seguridad',
    badgeType: 'featured',
    description: 'Extintor multiusos clase ABC, revisado y listo para tu hogar o negocio durante la contingencia.'
  }
];

export const DEFAULT_CONFIG = {
  shopName: "XiMovil",
  whatsappNumber: "5215512345678",
  storeEmail: "n/a",
  storeAddress: "Centro",
  announcementText: "🚨 Tras el sismo, estamos contigo: suministros de emergencia con envío prioritario y sin aumento de precios.",
  messageTemplate: "🚨 *PEDIDO POST-SISMO - {shopName}*\n----------------------------------\n👤 *Cliente:* {customerName}\n📱 *Teléfono:* {customerPhone}\n📦 *Tipo de Pedido:* {orderType}\n📍 *Dirección:* {deliveryAddress}\n💳 *Método de Pago:* {paymentMethod}\n----------------------------------\n\n📦 *ARTÍCULOS SOLICITADOS:*\n{itemList}\n\n----------------------------------\n🎁 *TODOS LOS ARTÍCULOS SON DONADOS - SIN COSTO*\n----------------------------------\n📝 *Notas:* {orderNotes}\n\n¡Gracias! Quedo a la espera de la confirmación de mi pedido."
};
