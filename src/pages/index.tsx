import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import PersonasPage from './personas';
import React, { useState } from "react";
import DoctoresPage from './doctores';
import CitasPage from './citaMedica';

export default function Home() {
  const [showPersonasPage, setShowPersonasPage] = useState(false);
  const [showDoctoresPage, setShowDoctoresPage] = useState(false);
  const [showCitasPage, setShowCitasPage] = useState(false);

  // Función para mostrar la página de Personas y ocultar las demás páginas
  const handleShowPersonasPage = () => {
    setShowPersonasPage(true);
    setShowDoctoresPage(false); 
    setShowCitasPage(false);
  };

  // Función para mostrar la página de Doctores y ocultar las demás páginas
  const handleShowDoctoresPage = () => {
    setShowDoctoresPage(true);
    setShowPersonasPage(false);
    setShowCitasPage(false);
  };

  // Función para mostrar la página de Citas y ocultar las demás páginas
  const handleShowCitasPage = () => {
    setShowCitasPage(true);
    setShowDoctoresPage(false);
    setShowPersonasPage(false);
  }

  return (
    <div>
      {/* Barra de navegación */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sistema de Hospitales
          </Typography>
          {/* Botones de navegación */}
          <Button color="inherit" onClick={handleShowPersonasPage}>
            Personas
          </Button>
          <Button color="inherit" onClick={handleShowDoctoresPage}>
            Doctores
          </Button>
          <Button color="inherit" onClick={handleShowCitasPage}>
            Citas Medicas
          </Button>
        </Toolbar>
      </AppBar>
      
      {/* Contenido de las páginas */}
      {showPersonasPage && <PersonasPage />} {/* Mostrar la página de Personas si showPersonasPage es true */}
      {showDoctoresPage && <DoctoresPage />} {/* Mostrar la página de Doctores si showDoctoresPage es true */}
      {showCitasPage && <CitasPage />} {/* Mostrar la página de Citas si showCitasPage es true */}
    </div>
  );
}
