import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CrearCitaForm from "./CrearCitaForm";

interface Cita {
  id: number;
  cedulaPaciente: string;
  idEspecialidad: number;
  idDoctor: number;
}

interface Especialidad {
  id: number;
  nombreEspecialidad: string;
}

interface Doctor {
  id: number;
  nombre: string;
  apellido: string;
}

function CitasPage() {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);
  const [doctores, setDoctores] = useState<Doctor[]>([]);
  const [showRegistroForm, setShowRegistroForm] = useState(false);

  /**
   * Muestra el formulario de registro de citas
   */
  const handleShowRegistroForm = () => {
    setShowRegistroForm(true);
  };

  /**
   * Cierra el formulario de registro de citas
   */
  const handleCloseRegistroForm = () => {
    setShowRegistroForm(false);
  };

  useEffect(() => {
    obtenerCitas();
    obtenerEspecialidades();
    obtenerDoctores();
  }, []);

  /**
   * Maneja el guardado del registro de citas
   */
  const handleGuardarRegistro = () => {
    setShowRegistroForm(false);
    obtenerDoctores();
    obtenerCitas();
  };

  /**
   * Obtiene las citas desde la API
   */
  const obtenerCitas = () => {
    fetch("http://localhost:3000/api/citas")
      .then((response) => response.json())
      .then((data) => {
        setCitas(data);
      })
      .catch((error) => {
        console.error("Error al obtener las citas:", error);
      });
  };

  /**
   * Obtiene las especialidades desde la API
   */
  const obtenerEspecialidades = () => {
    fetch("http://localhost:3000/api/especialidades")
      .then((response) => response.json())
      .then((data) => {
        setEspecialidades(data);
      })
      .catch((error) => {
        console.error("Error al obtener las especialidades:", error);
      });
  };

  /**
   * Obtiene los doctores desde la API
   */
  const obtenerDoctores = () => {
    fetch("http://localhost:3000/api/doctores")
      .then((response) => response.json())
      .then((data) => {
        setDoctores(data);
      })
      .catch((error) => {
        console.error("Error al obtener los doctores:", error);
      });
  };

  /**
   * Obtiene el nombre de la especialidad en base a su ID
   * @param {number} idEspecialidad - ID de la especialidad
   * @returns {string} - Nombre de la especialidad
   */
  const getNombreEspecialidad = (idEspecialidad: number) => {
    const especialidad = especialidades.find(
      (especialidad) => especialidad.id === idEspecialidad
    );
    return especialidad ? especialidad.nombreEspecialidad : "";
  };

  /**
   * Obtiene el nombre completo del doctor en base a su ID
   * @param {number} idDoctor - ID del doctor
   * @returns {string} - Nombre completo del doctor
   */
  const getNombreDoctor = (idDoctor: number) => {
    const doctor = doctores.find((doctor) => doctor.id === idDoctor);
    return doctor ? `${doctor.nombre} ${doctor.apellido}` : "";
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
          Asignar Cita
        </Button>
        <Dialog
          open={showRegistroForm}
          onClose={handleCloseRegistroForm}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Formulario de Registro de citas</DialogTitle>
          <DialogContent>
            <CrearCitaForm handleGuardarRegistro={handleGuardarRegistro} />
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
                <TableCell>Cédula del Paciente</TableCell>
                <TableCell>Especialidad</TableCell>
                <TableCell>Doctor</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(citas) &&
                citas.map((cita) => (
                  <TableRow key={cita.id}>
                    <TableCell>{cita.id}</TableCell>
                    <TableCell>{cita.cedulaPaciente}</TableCell>
                    <TableCell>
                      {getNombreEspecialidad(cita.idEspecialidad)}
                    </TableCell>
                    <TableCell>{getNombreDoctor(cita.idDoctor)}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default CitasPage;
