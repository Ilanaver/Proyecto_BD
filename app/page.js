import Image from "next/image";
import './page.module.css';
import Link from "next/link";
import InicioSesion from "@/app/iniciosesion/page.js";


export default function Home() {
  return (
   <>
      <InicioSesion></InicioSesion>
   </>
  );
}
