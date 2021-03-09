import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { FirebaseContext } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import FileUploader from 'react-firebase-file-uploader';
const NuevaNoticia = () => {

    // state para las imagenes
    const [subiendo, guardarSubiendo] = useState(false);
    const [progreso, guardarProgreso] = useState(0);
    const [urlimagen, guardarUrlimagen] = useState('');


    // Context con las operaciones de firebase
    const { firebase } = useContext(FirebaseContext);

    // console.log(firebase);

    // Hook para redireccionar
    const navigate = useNavigate();


    // validación y leer los datos del formulario
    const formik = useFormik({
        initialValues: {
            titulo: '',
            imagen: '',
            descripcion: '',
        },
        validationSchema: Yup.object({
            titulo: Yup.string()
                .min(3, 'Los Platillos deben tener al menos 3 caracteres')
                .required('El Nombre del platillo es obligatorio'),
            descripcion: Yup.string()
                .min(10, 'La descripción debe ser más larga')
                .required('La descripción es obligatoria'),

        }),
        onSubmit: noticia => {
            try {
                noticia.existencia = true;
                noticia.imagen = urlimagen;
                firebase.db.collection('noticias').add(noticia);
                // Redireccionar
                navigate('/noticias');
            } catch (error) {
                console.log(error);
            }
        }
    });

    // Todo sobre las imagenes
    const handleUploadStart = () => {
        guardarProgreso(0);
        guardarSubiendo(true);
    }
    const handleUploadError = error => {
        guardarSubiendo(false);
        console.log(error);
    }
    const handleUploadSuccess = async nombre => {
        guardarProgreso(100);
        guardarSubiendo(false);

        // Almacenar la URL de destino
        const url = await firebase
            .storage
            .ref("noticias")
            .child(nombre)
            .getDownloadURL();

        console.log(url);
        guardarUrlimagen(url);
    }
    const handleProgress = progreso => {
        guardarProgreso(progreso);

        console.log(progreso);
    }
    return (
        <>
            <h1 className="text-3xl font-light mb-4">Agregar Noticia</h1>

            <div className="flex justify-center mt-10">
                <div className="w-full max-w-3xl">
                    <form
                        onSubmit={formik.handleSubmit}
                    >
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">Titulo</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="titulo"
                                type="text"
                                placeholder="Titulo de la Noticia"
                                value={formik.values.titulo}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.touched.titulo && formik.errors.titulo ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                                <p className="font-bold">Hubo un error:</p>
                                <p>{formik.errors.titulo} </p>
                            </div>
                        ) : null}

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imagen">Imagen</label>
                            <FileUploader
                                accept="image/*"
                                id="imagen"
                                name="imagen"
                                randomizeFilename
                                storageRef={firebase.storage.ref("noticias")}
                                onUploadStart={handleUploadStart}
                                onUploadError={handleUploadError}
                                onUploadSuccess={handleUploadSuccess}
                                onProgress={handleProgress}
                            />
                        </div>

                        {subiendo && (
                            <div className="h-12 relative w-full border">
                                <div className="bg-green-500 absolute left-0 top-0 text-white px-2 text-sm h-12 flex items-center" style={{ width: `${progreso}%` }}>
                                    {progreso} %
                    </div>
                            </div>
                        )}
                        {urlimagen && (
                            <p className="bg-green-500 text-white p-3 text-center my-5">
                                La imagen se subió correctamente
                            </p>
                        )}

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">Descripción</label>
                            <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40"
                                id="descripcion"
                                placeholder="Descripción de la noticia"
                                value={formik.values.descripcion}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            ></textarea>
                        </div>

                        {formik.touched.descripcion && formik.errors.descripcion ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                                <p className="font-bold">Hubo un error:</p>
                                <p>{formik.errors.descripcion} </p>
                            </div>
                        ) : null}

                        <input
                            type="submit"
                            className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold"
                            value="Agregar Evento"
                        />
                    </form>
                </div>
            </div>
        </>
    )
}

export default NuevaNoticia