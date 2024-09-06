import Image from "next/image";
import './page.module.css';
import Footer from "@/app/components/Footer/Footer";
import Link from "next/link";


export default function Home() {
  return (
   <>
      <Link href="/gestor">Gestor</Link>
      <Link href="/definiciones">Definiciones</Link>
      <Footer></Footer>
      <Link href="/contenido">Contenido audiovisual</Link>
      <Link href="/academia">Academia</Link>
      
      
      <Link href="/perfil">Perfil</Link>
      <Link href="/registro">registro</Link>

   </>
  );
}
