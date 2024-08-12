import style from './contenidoaudiovisual.module.css';
import Titulo from '../components/Titulo/Titulo';
const video = () => {
    return(
    <body>
        <Titulo texto={"Contenido Audiovisual"}/>
        <Agregar/>
        <div className={style.contenedorContenido}>
            <div classname={style.contenido}>
                <div className={style.tituloContenido}>
                    <h2>Ahorro</h2>
                    <a href="">Ver mas</a>
                </div>
                <div className={style.imagenesContenido}>
                    <img src="/audiovisual.png" alt=""/>
                    <img src="/audiovisual.png" alt=""/>
                    <img src="/audiovisual.png" alt=""/>
                    <img src="/audiovisual.png" alt=""/>
                </div>
            </div>
            <div className={style.contenido}>
                <div className={style.tituloContenido}>
                    <h2>Invertir</h2>
                    <a href="">Ver mas</a>
                </div> 
                <div className={style.imagenesContenido}>
                    <img src="/audiovisual.png" alt=""/>
                    <img src="/audiovisual.png" alt=""/>
                    <img src="/audiovisual.png" alt=""/>
                    <img src="/audiovisual.png" alt=""/>
                </div>
            </div>
            <div className={style.contenido}>
                <div  className={style.tituloContenido}>
                    <h2>Impuestos</h2>
                    <a href="">Ver mas</a>
                </div>
                <div className={style.imagenesContenido}>
                    <img src="/audiovisual.png" alt=""/>
                    <img src="/audiovisual.png" alt=""/>
                    <img src="/audiovisual.png" alt=""/>
                    <img src="/audiovisual.png" alt=""/>
            </div>
        </div>
        <div className={style.contenido}>
            <div className={style.tituloContenido}>
                <h2>Ahorro</h2>
                <a href="">Ver mas</a>
            </div>
            <div className={style.imagenesContenido}>
                <img src="/audiovisual.png" alt=""/>
                <img src="/audiovisual.png" alt=""/>
                <img src="/audiovisual.png" alt=""/>
                <img src="/audiovisual.png" alt=""/>
            </div>
            
        </div>
        
    </div>
</body>
);
}
export default video;