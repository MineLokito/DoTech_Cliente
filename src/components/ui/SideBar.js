import React from 'react';
import { NavLink } from 'react-router-dom';
import logodotech from '../../assets/image/logodotech.jpg';

const selectedSrtyle = {

}
const SideBar = () => {

    return (
        <div className="  border-2 border-black md:w-2/6 xl:w-1/5 bg-white">
            <div className="p-6">
                <img className="rounded-lg" src={logodotech} />
                <p className="mt-3 text-white">Administracion:</p>
                <nav className="mt-10">
                    <NavLink className="p-1 text-black block hover:bg-red-600 hover:text-gray-900" activeStyle={{
                        fontWeight: "bold", color: "white", backgroundColor: "red"
                    }} exact="true" to="/inicio" end={true}>Inicio</NavLink>
                    <NavLink className="p-1 text-black block hover:bg-red-600 hover:text-gray-900" activeStyle={{
                        fontWeight: "bold", color: "white", backgroundColor: "red"
                    }} exact="true" to="/noticias" end={true}>Noticias</NavLink>
                </nav>
            </div>
        </div>
    );
}

export default SideBar;