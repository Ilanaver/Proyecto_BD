import react from "react";
import styles from './personaliza:module.css'



const personaliza = () =>{


    return (
        <section>
        <div class="titulo">
            <h1>Personaliza tu experiencia</h1>
        </div>
        <div class="contenedorFoto">
            <img src="../assets/img/Encuestado1.png" alt=""/>
            <p>Completa los siguientes datos para que</p>
            <p>podamos hacer tu experiencia unica</p>
        </div>
        <div class="contenedorBoton">
            <button>Continuar</button>
            <p>Omitir</p>
        </div>

    </section>
    );
}
export default personaliza;
