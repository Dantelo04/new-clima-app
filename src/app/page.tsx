import Appbar from "@/components/Appbar";
import Dashboard from "@/components/Dashboard";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex over flex-col max-w-screen items-center xl:p-5 xl:h-screen w-screen bg-gradient-to-br from-gray-500 to-gray-700">
      <div className="flex xl:flex-row flex-col min-h-full xl:h-full xl:space-x-2 xl:w-10/12 w-full overflow-x-hidden ">
        <Navbar></Navbar>
        <Appbar></Appbar>
        <Dashboard></Dashboard>
      </div>
    </main>
  );
}
