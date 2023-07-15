// Función para validar el campo "nombre"
export const validateNombre = (nombre: string): string => {
  const regex = /^[a-zA-Z\s]+$/; // Expresión regular para permitir letras y espacios
  if (!nombre.trim()) {
    // Verificar si el nombre está vacío
    return "El nombre es requerido";
  } else if (!regex.test(nombre)) {
    // Verificar si el nombre contiene caracteres especiales o números
    return "El nombre no debe contener caracteres especiales ni números";
  }
  return ""; // Si no hay errores, retornar una cadena vacía
};

// Función para validar el campo "apellido"
export const validateApellido = (apellido: string): string => {
  const regex = /^[a-zA-Z\s]+$/; // Expresión regular para permitir letras y espacios
  if (!apellido.trim()) {
    // Verificar si el apellido está vacío
    return "El apellido es requerido";
  } else if (!regex.test(apellido)) {
    // Verificar si el apellido contiene caracteres especiales o números
    return "El apellido no debe contener caracteres especiales ni números";
  }
  return ""; // Si no hay errores, retornar una cadena vacía
};

// Función para validar el campo "correo"
export const validateCorreo = (correo: string): string => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar el formato del correo electrónico
  if (!correo.trim()) {
    // Verificar si el correo está vacío
    return "El correo es requerido";
  } else if (!regex.test(correo)) {
    // Verificar si el correo no cumple con el formato esperado
    return "El correo no es válido";
  }
  return ""; // Si no hay errores, retornar una cadena vacía
};

// Función para validar el campo "consultorio"
export const validateConsultorio = (consultorio: string): string => {
  const regex = /^\d+$/; // Expresión regular para permitir solo caracteres numéricos
  if (!consultorio.trim()) {
    // Verificar si el consultorio está vacío
    return "El consultorio es requerido";
  } else if (!regex.test(consultorio)) {
    // Verificar si el consultorio contiene caracteres no numéricos
    return "El consultorio solo debe contener caracteres numéricos";
  }
  return ""; // Si no hay errores, retornar una cadena vacía
};

// Función para validar el campo "idEspecialidad"
export const validateIdEspecialidad = (idEspecialidad: string): string => {
  if (!idEspecialidad) {
    // Verificar si no se ha seleccionado una especialidad
    return "Debe seleccionar una especialidad";
  }
  return ""; // Si no hay errores, retornar una cadena vacía
};
