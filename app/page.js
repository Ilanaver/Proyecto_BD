import Image from "next/image";
import styles from "./page.module.css";
import Gestor from "@/src/components/Gestor/Gestor";
import Footer from "@/src/components/Footer/Footer";


export default function Home() {
  return (
   <>
      <Gestor></Gestor>
      <Footer></Footer>

   </>
  );
}
