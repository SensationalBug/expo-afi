const accentColor = "#4285F4"; // Azul vibrante como color principal

export const Colors = {
  default: {
    text: "#030400", // Negro para texto
    whiteText: "#F4F6FA", // Negro para texto
    background: "#f1f5ffff", // Blanco para fondo principal
    gradient: ["#f9f9f9", "#f1f1f1"] as const, // Blanco + gris claro
    tint: accentColor, // ✅ Azul para elementos seleccionados
    icon: accentColor, // ✅ Azul para iconos
    tabIconDefault: "#030400", // Negro para iconos inactivos
    tabIconSelected: accentColor, // ✅ Azul para iconos seleccionados
    cardBackground: "#eaeaeaff", // Gris muy claro para tarjetas
    border: "#f1f1f1", // Gris claro para bordes
    buttonBackground: accentColor, // ✅ Azul para fondo de botones
    buttonText: "#f9f9f9", // Blanco para texto de botones
    mutedText: "#4f4f4fff", // Negro con transparencia para texto secundario
    lightGray: "#e1e0e063", // Gris claro
    boxShadow: "0 8px 6px rgba(0, 0, 0, 0.1)",
    
    // Estados adicionales
    selected: accentColor, // ✅ Azul para elementos seleccionados
    active: accentColor, // ✅ Azul para estado activo
    accent: accentColor, // ✅ Azul para acentos
  },
};
