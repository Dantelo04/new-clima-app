"use client"

import { BsCloudSunFill } from "react-icons/bs"
import { BsGearFill } from "react-icons/bs"
import { BiWorld } from "react-icons/bi"
import { BsPersonFill } from "react-icons/bs"
import { BsSunFill } from "react-icons/bs"

export default function Appbar(){
    return(
        <div className="xl:h-full xl:hidden h-fit w-full fixed bottom-0 backdrop-blur-2xl z-40">
            <div className="px-4 py-3 w-full xl:h-full flex flex-row items-center justify-between bg-gray-800 ">
                <ul className="flex flex-row w-full justify-between px-14 text-neutral-300 py-1">
                    <li className="">
                        <button onClick={() => alert("Proximamente...")} className="text-xs flex hover:text-white flex-col items-center justify-center space-y-1 h-full w-full">
                            <BsCloudSunFill className="w-6 h-6"></BsCloudSunFill>
                        </button>
                    </li>
                    <li className="">
                        <button onClick={() => alert("Proximamente...")} className="text-xs flex hover:text-white flex-col items-center justify-center space-y-1 h-full w-full">
                            <BiWorld className="w-6 h-6"/>
                        </button>
                    </li>
                    <li className="">
                        <button onClick={() => alert("Proximamente...")}className="text-xs flex flex-col glow-hover hover:text-white items-center justify-center space-y-1 h-full w-full">
                            <BsGearFill className="w-6 h-6 glow-icon-hover"/>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}