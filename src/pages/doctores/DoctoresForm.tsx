import React, { useState, useEffect, FormEvent } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from "@mui/material";

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

  const handleChange = (event: any) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
  
    setFormData({ ...formData, [name]: value });
  };
   

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
        <FormControl fullWidth margin="normal">
          <InputLabel id="idespecialidad-label">Especialidad</InputLabel>
          <Select
            labelId="idespecialidad-label"
            id="idespecialidad"
            name="idespecialidad"
            value={formData.idespecialidad}
            onChange={handleChange}
            fullWidth
            margin="dense"
            required
          >
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