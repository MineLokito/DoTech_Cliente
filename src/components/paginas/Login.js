import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
import SideBar from '../ui/SideBar';


const Login = () => {
    const [userData, guardarUserData] = useState([])

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Correo Electronico invalido")
                .required('El correo es obligatorio'),
            password: Yup.string()
                .min(8, 'El password debe contener minimo 8 letras')
                .required('la contraseña es obligatoria'),
        }),
        onSubmit: () => {
            try {
                fetch('http://192.168.0.6:3030/auth/login', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "email": formik.values.email,
                        "password": formik.values.password

                    })
                }).then((response) => response.json())
                    .then((res) => {
                        if (typeof (res.message) != "undefined") {
                            window.alert(res.message)
                            //console.log(res)
                        }
                        else {
                            window.alert("Bienvenido accediste con exito");
                            guardarUserData(res)
                        }
                    }).catch((error) => {
                        console.error(error);
                    });
            } catch (error) {
                console.log(error)
            }
        }
    });

    console.log(userData)




    return (
        <>


            <h1 className=" text-3xl font-light mb-4 text-center  "> Bienvenido a DoTech </h1>
            <div className="w-full max-w-3xl ">
                <form
                    onSubmit={formik.handleSubmit}
                >
                    <div className="mb-4  ">
                        <label className=" block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">Correo</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Ejemplo: blablabla@dotech.com"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    {formik.touched.email && formik.errors.email ? (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                            <p className="font-bold">Hubo un error:</p>
                            <p>{formik.errors.email} </p>
                        </div>
                    ) : null}

                    <div className="mb-4 ">
                        <label className=" block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">Contraseña</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type='password'

                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    {formik.touched.password && formik.errors.password ? (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                            <p className="font-bold">Hubo un error:</p>
                            <p>{formik.errors.password} </p>
                        </div>
                    ) : null}

                    <input
                        type="submit"
                        className="bg-red-600 hover:bg-red-800 w-full mt-5 p-2 text-white uppercase font-bold"
                        value="Iniciar Sesion"
                    />
                </form>
            </div>
        </>
    )
}

export default Login