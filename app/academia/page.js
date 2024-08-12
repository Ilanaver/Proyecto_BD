import Image from "next/image";
import Footer from "@/app/components/Footer/Footer";
import Link from "next/link";


export default function Home() {
  return (
   <>
      <Link href="/definiciones">Definiciones</Link>
      <Link href="/contenido">Contenido</Link>
      <Footer></Footer>

   </>
  );
}
