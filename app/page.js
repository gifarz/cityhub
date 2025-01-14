import Image from "next/image";
import ModalHome from "./components/ModalHome";
import HomePage from "./components/HomePage";
import Sidebar from "./components/Sidebar";
import BackgroundVideo from "./components/BackgroundVideo";

export default function Home() {
  return (
    <div className="min-h-screen">
      <ModalHome/>
      <Sidebar>
        <HomePage />
      </Sidebar>
    </div>
  );
}