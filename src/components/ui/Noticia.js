import React, { useContext, useRef, useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { FirebaseContext } from '../../firebase';

import { toast } from "react-toastify";


const Noticias = ({ noticia }) => {



    // Existencia ref para acceder al valor directamente
    const existenciaRef = useRef(noticia.existencia);

    // context de firebase para cambios en la BD
    const { firebase } = useContext(FirebaseContext)
    const { id, titulo, imagen, descripcion, existencia } = noticia;


    // modificar el estado del platillo en firebase
    const actualizarDisponibilidad = () => {
        const existencia = (existenciaRef.current.value === "true");
        try {
            firebase.db.collection('noticias')
                .doc(id)
                .update({
                    existencia
                });
        } catch (error) {
            console.log(error);
        }
    }
    const onDeleteLink = async (id) => {
        if (window.confirm("estas seguro que deseas eliminar?")) {
            await firebase.db.collection("noticias").doc(id).delete();
            toast("Eliminado correctamente", {
                type: "error",
                autoClose: 2000
            });
        }
    };




    return (
        <div className="w-full px-3 mb-4">
            <div className="p-5 shadow-md bg-white">
                <div className="lg:flex">
                    <div className="lg:w-5/12 xl:w-3/12">
                        <img src={imagen} alt=" imagen noticia " />

                        <div className="sm:flex sm:-mx-2 pl-2">
                            <label className="block mt-5 sm:w-2/4">
                                <span className="block text-gray-800 mb-2 " >Mostrar</span>

                                <select
                                    className="bg-white shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline  "
                                    value={existencia}
                                    ref={existenciaRef}
                                    onChange={() => actualizarDisponibilidad()}
                                >
                                    <option value="true">Disponible</option>
                                    <option value="false">No Disponible</option>
                                </select>
                            </label>
                        </div>
                        <div>
                            <button
                                onClick={() => onDeleteLink(noticia.id)}
                                type="button" className=" mt-6 rounded bg-red-800 mb-5 p-2 text-white uppercase text-base "
                            >
                                Eliminar Noticia
                            </button>
                        </div>
                    </div>
                    <div className="lg:w-7/12 xl:w-9/12 pl-5">
                        <p className="font-bold text-2xl text-yellow-600 mb-4">{titulo} </p>
                        <p className="text-gray-600 mb-4">{descripcion} </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Noticias;