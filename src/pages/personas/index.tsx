import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TableContainer,
  Paper,
} from "@mui/material";
import RegistroForm from "./RegistroForm";

interface Persona {
  id: number;
  nombre: string;
  cedula: string;
  apellido: string;
  edad: number;
  telefono: string;
}

function PersonasPage() {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [showRegistroForm, setShowRegistroForm] = useState(false);

  const handleShowRegistroForm = () => {
    setShowRegistroForm(true);
  };

  const handleCloseRegistroForm = () => {
    setShowRegistroForm(false);
  };

  useEffect(() => {
    obtenerDatosPersonas();

    // Limpia el temporizador al desmontar el componente
    return () => {
      // Limpiar recursos si es necesario
    };
  }, []);

  const handleGuardarRegistro = () => {
    // Aquí puedes agregar la lógica para guardar la información en el API
    // Una vez guardada la información, cierra el formulario y recarga los datos de la tabla
    setShowRegistroForm(false);
    obtenerDatosPersonas();
  };

  const obtenerDatosPersonas = () => {
    fetch("/api/api")
      .then((response) => response.json())
      .then((data) => {
        setPersonas(data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  };

  return (
    <>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleShowRegistroForm}
          style={{ margin: "10px" }}
        >
          Registro personas
        </Button>
        <Dialog
          open={showRegistroForm}
          onClose={handleCloseRegistroForm}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Formulario de Registro</DialogTitle>
          <DialogContent>
            <RegistroForm handleGuardarRegistro={handleGuardarRegistro} />
          </DialogContent>
        </Dialog>
      </div>

      <div>
        <TableContainer component={Paper}>
          <Table
            style={{ backgroundColor: "white" }}
            sx={{ minWidth: 650 }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Cédula</TableCell>
                <TableCell>Apellido</TableCell>
                <TableCell>Edad</TableCell>
                <TableCell>Teléfono</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(personas) &&
                personas.map((persona) => (
                  <TableRow key={persona.id}>
                    <TableCell>{persona.id}</TableCell>
                    <TableCell>{persona.nombre}</TableCell>
                    <TableCell>{persona.cedula}</TableCell>
                    <TableCell>{persona.apellido}</TableCell>
                    <TableCell>{persona.edad}</TableCell>
                    <TableCell>{persona.telefono}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default PersonasPage;
