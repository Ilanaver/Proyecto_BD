'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer/Footer";
import style from './Gestor.module.css';
import Titulo from "../components/Titulo/Titulo";
const Academia = () => {
    return(
    <main>
        <section  class="contenedorAcademia">
            <Titulo texto={"Academia"} />
            <div class="contenedorCards">
                <div class="card">
                    <div class="card-icon">
                        <img src="../assets/img/definicionTerminos.jpg" alt="Definición de términos"/>
                    </div>
                    <div class="card-content">
                        <h3>Definición de términos</h3>
                        <p>Simple y sin vueltas</p>
                    </div>
                    <div class="card-arrow">
                        <img src="../assets/img/flecha (2).png" alt="Flecha"/>
                    </div>
                </div>
                <div class="card">
                    <div class="card-icon">
                        <img src="../assets/img/contenidoAudiovizual.png" alt="Contenido Audiovisual"/>
                    </div>
                    <div class="card-content">
                        <h3>Contenido Audiovisual</h3>
                        <p>Con tus influencers favoritos</p>
                    </div>
                    <div class="card-arrow">
                        <img src="../assets/img/flecha (2).png" alt="Flecha"/>
                    </div>
                </div>
                <div class="card">
                    <div class="card-icon">
                        <img src="../assets/img/leccionDiaria.png" alt="Lección diaria"/>
                    </div>
                    <div class="card-content">
                        <h3>Lección diaria</h3>
                        <p>Aprendé algo nuevo todos los días</p>
                    </div>
                    <div class="card-arrow">
                        <img src="../assets/img/flecha (2).png" alt="Flecha"/>
                    </div>
                </div>
                <div class="card">
                    <div class="card-icon">
                        <img src="../assets/img/tuAsesor.png" alt="Tu asesor"/>
                    </div>
                    <div class="card-content">
                        <h3>Tu asesor</h3>
                        <p>Resolvé todas tus inquietudes</p>
                    </div>
                    <div class="card-arrow">
                        <img src="../assets/img/flecha (2).png" alt="Flecha"/>
                    </div>
                </div>
                <div class="card">
                    <div class="card-icon">
                        <img src="../assets/img/chatbot.png" alt="ChatBot inversor"/>
                    </div>
                    <div class="card-content">
                        <h3>ChatBot inversor</h3>
                        <p>Posibles inversiones</p>
                    </div>
                    <div class="card-arrow">
                        <img src="../assets/img/flecha (2).png" alt="Flecha"/>
                    </div>
                </div>
            </div>
    
        </section>
        <Footer></Footer>
    </main>
    );
}
export default  Academia;
