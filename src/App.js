import React from 'react';
import { Routes, Route } from 'react-router';
//Firebase
import firebase, { FirebaseContext } from './firebase';
//importar las paginas
import Inicio from './components/paginas/Inicio'
import Login from './components/paginas/Login'
import Noticias from './components/paginas/Noticias';
import NuevaNoticia from './components/paginas/NuevaNoticia'
import DetalleNoticia from './components/paginas/DetalleNoticia'
import SideBar from './components/ui/SideBar'

function App() {
  return (
    <FirebaseContext.Provider
      value={{
        firebase
      }}
    >
      <div className="md:flex min-h-screen">
        <SideBar />
        <div className=" md:w-2/5 xl:w-4/5 p-6">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/login" element={<Login />} />
            <Route path="/nueva-noticia" element={<NuevaNoticia />} />
            <Route path="/noticias" element={<Noticias />} />
            <Route path="/detalle-noticia" element={<DetalleNoticia />} />
          </Routes>
        </div>
      </div>
    </FirebaseContext.Provider>
  );
}

export default App;
