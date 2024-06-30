import Image from "next/image";
import './page.module.css';
import Gestor from "@/app/Gestor/Gestor";
import Footer from "@/app/components/Footer/Footer";


export default function Home() {
  return (
   <>
      <Gestor></Gestor>
      <Footer></Footer>

   </>
  );
}
