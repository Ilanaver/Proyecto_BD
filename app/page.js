import Image from "next/image";
import './page.module.css';
import Footer from "@/app/components/Footer/Footer";
import Link from "next/link";


export default function Home() {
  return (
   <>
      <Link href="/Gestor.page.js/">Gestor</Link>
      <Footer></Footer>

   </>
  );
}
