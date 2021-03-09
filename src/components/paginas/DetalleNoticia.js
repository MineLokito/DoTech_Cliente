import React, { useContext, useState } from 'react';
import { FirebaseContext } from '../../firebase';

const DetalleNoticia = ({ noticia }) => {
    const { firebase } = useContext(FirebaseContext)
    console.log(noticia)


    // const { id, titulo, imagen, descripcion, existencia } = props;

    return (
        <div>
            <span></span>
        </div>
    )
}

export default DetalleNoticia
