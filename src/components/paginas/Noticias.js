import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../../firebase';

import Noticia from '../ui/Noticia'

const Noticias = () => {
    // definir el state para los platillos
    const [noticias, guadarNoticias] = useState([]);

    const { firebase } = useContext(FirebaseContext);

    // consultar la base de datos al cargar
    useEffect(() => {
        const guadarNoticias = () => {
            firebase.db.collection('noticias').onSnapshot(manejarSnapshot);
        }
        guadarNoticias();
    }, []);

    // Snapshot nos permite utilizar la base de datos en tiempo real de firestore
    function manejarSnapshot(snapshot) {
        const noticias = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });

        // almacenar los resultados en el state
        guadarNoticias(noticias);
    }


    return (
        <>
            <h1 className="text-3xl font-light mb-4">Noticias</h1>
            <Link to="/nueva-noticia" className=" rounded bg-red-600 hover:bg-blue-700, inline-block mb-5 p-2 text-white uppercase font-bold">
                Agregar Noticia
            </Link>

            {noticias.map(noticia => (
                <Noticia
                    key={noticia.id}
                    noticia={noticia}
                />
            ))}



        </>
    )
}

export default Noticias


