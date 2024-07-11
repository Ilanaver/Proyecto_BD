import Image from "next/image";
import './page.module.css';
import Gestor from "@/app/gestor/page";
import Footer from "@/app/components/Footer/Footer";
import Link from "next/link";


export default function Home() {
  return (
   <>
      <Link href="/gestor">Gestor</Link>
      <Footer></Footer>

   </>
  );
}
