import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";

import {
  validateNombre,
  validateApellido,
  validateConsultorio,
  validateCorreo,
} from "../validations/validationsFormDoctores";

interface Especialidad {
  id: number;
  nombreEspecialidad: string;
}

interface FormData {
  nombre: string;
  apellido: string;
  idespecialidad: string;
  consultorio: string;
  correo: string;
}

interface DoctoresFormProps {
  handleGuardarRegistro: () => void;
}

function DoctoresForm({ handleGuardarRegistro }: DoctoresFormProps) {
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    apellido: "",
    idespecialidad: "",
    consultorio: "",
    correo: "",
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const erroresFormulario = {
      nombre: validateNombre(formData.nombre),
      apellido: validateApellido(formData.apellido),
      consultorio: validateConsultorio(formData.consultorio),
      correo: validateCorreo(formData.correo),
    };

    if (Object.values(erroresFormulario).every((error) => !error)) {
      fetch("http://localhost:3000/api/doctores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Respuesta del API:", data);
          handleGuardarRegistro();
        })
        .catch((error) => {
          console.error("Error al enviar los datos:", error);
        });
    }
  };

  const handleChange = (event: ChangeEvent<{ name?: string; value: unknown }>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name as keyof FormData]: value as string });
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name!]: value });
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/especialidades")
      .then((response) => response.json())
      .then((data) => {
        setEspecialidades(data);
      })
      .catch((error) => {
        console.error("Error al obtener las especialidades:", error);
      });
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          name="nombre"
          label="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          fullWidth
          margin="dense"
          required
        />
        <TextField
          name="apellido"
          label="Apellido"
          value={formData.apellido}
          onChange={handleChange}
          fullWidth
          margin="dense"
          required
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel id="idespecialidad-label">Especialidad</InputLabel>
          <Select
            labelId="idespecialidad-label"
            id="idespecialidad"
            name="idespecialidad"
            value={formData.idespecialidad}
            onChange={handleSelectChange}
            fullWidth
            margin="dense"
          >
            <MenuItem value="">Seleccionar</MenuItem>
            {especialidades.map((especialidad) => (
              <MenuItem key={especialidad.id} value={especialidad.id}>
                {especialidad.nombreEspecialidad}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          name="consultorio"
          label="Consultorio"
          value={formData.consultorio}
          onChange={handleChange}
          fullWidth
          margin="dense"
          required
        />
        <TextField
          name="correo"
          label="Correo"
          value={formData.correo}
          onChange={handleChange}
          fullWidth
          required
          type="email"
          margin="dense"
        />
        <Button variant="contained" color="primary" type="submit">
          Registrar
        </Button>
      </form>
    </div>
  );
}

export default DoctoresForm;
