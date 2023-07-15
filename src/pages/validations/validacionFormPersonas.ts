// Función para validar el campo "nombre"
export const validateNombre = (nombre: string): string => {
  if (!nombre.trim()) {
    // Verificar si el nombre está vacío
    return "El nombre es requerido";
  } else if (/\d/.test(nombre)) {
    // Verificar si el nombre contiene números
    return "El nombre no debe contener números";
  }
  return ""; // Si no hay errores, retornar una cadena vacía
}

// Función para validar el campo "cedula"
export const validateCedula = (cedula: string): string => {
  if (!cedula.trim()) {
    // Verificar si la cédula está vacía
    return "La cédula es requerida";
  } else if (!/^\d+$/.test(cedula)) {
    // Verificar si la cédula contiene solo números
    return "La cédula debe contener solo números";
  }
  return ""; // Si no hay errores, retornar una cadena vacía
};

// Función para validar el campo "apellido"
export const validateApellido = (apellido: string): string => {
  if (!apellido.trim()) {
    // Verificar si el apellido está vacío
    return "El apellido es requerido";
  } else if (/\d/.test(apellido)) {
    // Verificar si el apellido contiene números
    return "El apellido no debe contener números";
  }
  return ""; // Si no hay errores, retornar una cadena vacía
}

// Función para validar el campo "edad"
export function validateEdad(edad: string): string {
  if (!edad.trim()) {
    // Verificar si la edad está vacía
    return "La edad es requerida";
  }

  const edadRegex = /^[0-9]{1,2}$/; // Expresión regular para validar la edad
  if (!edadRegex.test(edad)) {
    // Verificar si la edad no cumple con el formato esperado
    return "La edad debe ser un número entre 1 y 99";
  }

  return ""; // Si no hay errores, retornar una cadena vacía
}

// Función para validar el campo "telefono"
export const validateTelefono = (telefono: string): string => {
  if (!telefono.trim()) {
    // Verificar si el teléfono está vacío
    return "El teléfono es requerido";
  } else if (!/^\d+$/.test(telefono)) {
    // Verificar si el teléfono contiene solo números
    return "El teléfono debe contener solo números";
  }
  return ""; // Si no hay errores, retornar una cadena vacía
};
