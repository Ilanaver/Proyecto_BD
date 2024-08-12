import Image from "next/image";
import './page.module.css';
import Footer from "@/app/components/Footer/Footer";
import Link from "next/link";


export default function Home() {
  return (
   <>
      <Link href="/gestor">Gestor</Link>
      <Link href="/definiciones">Definiciones</Link>
      <Link href="/contenido">Contenido</Link>
      <Link href="/vermas">vermas</Link>
      <Footer></Footer>
      <Link href="/contenido">Contenido audiovisual</Link>
      <Link href="/academia">Academia</Link>

   </>
  );
}
