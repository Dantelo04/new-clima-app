import { BsCloudSunFill, BsSunFill } from "react-icons/bs"
import { BsGearFill } from "react-icons/bs"
import { BiWorld } from "react-icons/bi"

export default function Navbar(){
    return(
        <div className="h-full xl:flex hidden px-3 py-4 border border-gray-500 bg-gradient-to-bl from-gray-800 via-slate-800 to-gray-900 rounded-2xl">
            <div className="shadow-xl p-2 w-full h-full flex flex-col space-y-14 items-center bg-gray-700 rounded-2xl">
                <div className="flex items-center justify-center aspect-square w-12 bg-blue-600 rounded-2xl"><BsSunFill></BsSunFill></div>
                <ul className="flex flex-col space-y-9 text-neutral-300">
                    <li className="">
                        <button className="text-xs flex hover:text-white flex-col items-center justify-center space-y-1 h-full w-full">
                            <BsCloudSunFill className="w-5 h-5"></BsCloudSunFill><span>Clima</span>
                        </button>
                    </li>
                    <li className="">
                        <button className="text-xs flex hover:text-white flex-col items-center justify-center space-y-1 h-full w-full">
                            <BiWorld className="w-5 h-5"/><span>Ciudades</span>
                        </button>
                    </li>
                    <li className="">
                        <button className="text-xs flex flex-col hover:text-white items-center justify-center space-y-1 h-full w-full">
                            <BsGearFill className="w-5 h-5"/><span>Settings</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}