"use client"

import Link from "next/link";
import { BsSunFill } from "react-icons/bs";
import { BsThermometer } from "react-icons/bs";
import { BiDroplet } from "react-icons/bi";
import { BiWind } from "react-icons/bi";
import { BiCloudRain } from "react-icons/bi";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import { getLocation, getLocationByCity } from "@/api/location";
import { CgSpinner } from "react-icons/cg";
import { getWeather, getDaily, Hourly } from "@/api/weather";
import Image from "next/image";
import clsx from "clsx";

export default function Dashboard(){
    const dias = [0, 1, 2, 3, 4, 5]
    const [city, setCity] = useState<string | undefined>("")
    const [weather, setWeather] = useState<Hourly | undefined>(undefined)
    const [location, setLocation] = useState("")
    const [loading, setLoading] = useState("")
    const now = new Date()
    
    useEffect(()=>{
        async function getClima(){
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(
                    async function(position) {
                        const lat = position.coords.latitude;
                        const lon = position.coords.longitude;
                        const res2 = await getDaily(lat.toString(), lon.toString(), "3")
                        setCity(res2.location.name)
                        setWeather(res2)
                    },
                    async function(error) {
                        const res = await getLocationByCity("CDMX")
                        const res2 = await getDaily(res.results[0].geometry.lat.toString(), res.results[0].geometry.lng.toString(), "5")
                        setCity(res2.location.name)
                        setWeather(res2)
                    }
                );
            } 
        }

        if(city === ""){
            getClima()
        }
        
    }, [city])

    async function clickHandler(){
        setLoading("...")
        const res = await getLocationByCity(location)
        const res2 = await getDaily(res.results[0].geometry.lat.toString(), res.results[0].geometry.lng.toString(), "3")
        setCity(res2.location.name)
        setWeather(res2)
        setLoading("")
    }

    if(weather !== undefined){
        return(
            <div className="flex xl:flex-row flex-col xl:static absolute p-5 xl:space-x-4 space-y-3 xl:space-y-0 xl:grow xl:rounded-2xl xl:shadow-xl xl:border border-gray-500 xl:w-full w-full bg-gradient-to-bl from-gray-800 via-slate-800 to-gray-900 overflow-x-hidden custom-scrollbar overflow-hidden">
                <div className="h-full flex flex-col xl:w-7/12 w-full">
                    <div className="flex flex-row space-x-2">
                        <input type="text" onChange={(event:ChangeEvent<HTMLInputElement>)=> setLocation(event.target.value)} placeholder="Buscar ciudades..." className="w-full py-2 outline-none px-2 rounded-md uppercase text-xs font-bold bg-gray-700 "/>
                        {loading === "" ? 
                        (
                            <button onClick={clickHandler} className="py-1 border border-gray-400 rounded font-semibold duration-200 ease-in px-2 text-xs uppercase text-gray-400 hover:bg-gray-400 hover:text-gray-800">Buscar</button>
                        )
                        :
                        (
                            <button onClick={clickHandler} className="py-1 border border-gray-400 rounded font-semibold duration-200 px-2 text-xs uppercase text-gray-200 hover:bg-gray-400 hover:text-gray-800"><CgSpinner className="animate-spin w-5 h-5"></CgSpinner></button>
                        )
                        }
                    </div>
                    <div className="flex grow flex-col h-full space-y-3 w-auto">
                        <div className="h-full w-auto flex flex-row items-center ">
                            <div className="grow h-full p-5 flex flex-col justify-between xl:pl-10 xl:space-y-0 space-y-3">
                                <div className="h-full ">
                                    <h1 className="text-3xl font-bold w-auto ">{city}</h1>
                                    <p className="text-sm text-neutral-400">Probabilidad de lluvia {weather?.forecast.forecastday[0].hour[0].chance_of_rain}%</p>
                                </div>
                                <div className="h-full flex items-end">
                                    <h1 className="text-6xl font-extrabold glow">{weather?.current.temp_c!}°</h1>
                                </div>
                            </div>
                            <div className="flex h-full w-auto items-center p-5 xl:pr-10">
                                    <Image
                                        width={900}
                                        height={900}
                                        src={"https:" + weather.current.condition.icon}
                                        quality={100}
                                        alt="clima icono"
                                        className="w-44 glow-icon"
                                    />
                            </div>
                        </div>
                        <div className="flex flex-col min-h-32 h-full w-full bg-gray-700 rounded-xl p-4 overflow-x-hidden">
                            <div className="text-xs uppercase text-neutral-300 font-bold">Pronostico de hoy</div>
                            <div className="flex flex-row w-full h-full pt-4 pb-2 overflow-x-auto custom-scrollbar xl:justify-center">
                                {weather?.forecast.forecastday[0].hour.map((dia, index) => (
                                        <div key={index} className={clsx("flex w-full h-full text-neutral-400", {"hidden":index<now.getHours()})}>
                                            <div className={clsx("flex flex-col min-w-20 w-full justify-between items-center px-1 min-h-20 h-full border-gray-600", {"border-r":index < weather.forecast.forecastday[0].hour.length-1})}>
                                                <div className="text-xs font-bold text-center">
                                                    {dia.time.substring(10)}
                                                </div>
                                                <Image
                                                    width={200}
                                                    height={200}
                                                    src={"https:" + dia.condition.icon}
                                                    alt="clima icono"
                                                    className="w-16 py-2 glow-icon"
                                                />
                                                <div className="font-extrabold text-neutral-200 text-center text-xl glow">{Math.ceil(dia.temp_c)}°</div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="flex flex-col space-y-3 min-h-32 h-full w-full bg-gray-700 rounded-xl p-4">
                            <div className="flex flex-row justify-between items-center">
                                <div className="text-xs uppercase text-neutral-300 font-bold">Condiciones del aire</div>
                                <Link className="text-xs uppercase font-bold rounded-full px-4 py-1 bg-gradient-to-r from-blue-400 to-blue-500" href="https://www.linkedin.com/in/dante-rivarola-dinatale-264a82289/">Ver más</Link>
                            </div>
                            <div className="flex flex-row text-sm text-neutral-300 h-full w-full">
                                <div className="flex h-full w-full flex-col">
                                    <div className="flex flex-row space-x-2 h-full items-start w-fit">
                                        <BsThermometer className="w-5 h-5"></BsThermometer>
                                        <div className="flex flex-col">
                                            <span>Sensacion termica</span>
                                            <h1 className="text-2xl font-extrabold text-white">{weather?.current.feelslike_c}°</h1>
                                        </div>
                                    </div>
                                    <div className="flex flex-row space-x-2 h-full items-start w-fit">
                                        <BiDroplet className="w-5 h-5"></BiDroplet>
                                        <div className="flex flex-col">
                                            <span>Probabilidad de lluvia</span>
                                            <h1 className="text-2xl font-extrabold text-white">{weather?.forecast.forecastday[0].hour[0].chance_of_rain}%</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex h-auto w-full flex-col">
                                    <div className="flex flex-row space-x-2 h-full items-start w-fit">
                                        <BiWind className="w-5 h-5"></BiWind>
                                        <div className="flex flex-col">
                                            <span>Viento</span>
                                            <h1 className="text-2xl font-extrabold text-white">{weather?.current.wind_kph} km/h</h1>
                                        </div>
                                    </div>
                                    <div className="flex flex-row space-x-2 h-full items-start w-fit">
                                        <BsSunFill className="w-5 h-5"></BsSunFill>
                                        <div className="flex flex-col">
                                            <span>Indice UV</span>
                                            <h1 className="text-2xl font-extrabold text-white">{weather?.current.uv}</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:w-5/12 h-full w-full flex flex-col space-y-3">
                    <div className="h-fit min-h-32 w-full rounded-xl bg-gray-700">
                        <div className="flex flex-col h-fit w-full p-4">
                            <div className="text-xs uppercase text-neutral-300 font-bold">Pronostico de 3 dias</div>
                            <div className="flex flex-col w-full h-full pt-3">
                            {weather.forecast.forecastday.map((dia, index)=>
                            (
                                <div key={index} className={clsx("flex flex-row items-center justify-between h-full px-3 border-gray-600 xl:py-0 py-3", {"border-b":index<2})}>
                                    <div className="text-sm text-gray-300">
                                        {dia.date.substring(5)}
                                    </div>
                                    <div className="flex flex-row space-x-2 items-center justify-center">
                                        <Image
                                            width={200}
                                            height={200}
                                            src={"https:" + dia.day.condition.icon}
                                            alt="clima icono"
                                            className="w-16 glow-icon"
                                        />
                                        <div className="text-sm xl:flex hidden">{dia.day.condition.text}</div>
                                    </div>
                                    <div>
                                        <span className="text-gray-300 glow">{Math.ceil(dia.day.maxtemp_c)}°</span><span className="text-gray-500">/{Math.ceil(dia.day.mintemp_c)}°</span>
                                    </div>
                                </div>
                            ))}
                            </div>
                        </div>
                        
                    </div>
                    <div className="flex flex-col items-center justify-center h-auto min-h-32 w-full rounded-xl bg-gray-700 backdrop-blur-sm">
                        <span className="text-gray-500">Proximamente...</span>
                    </div>
                </div>
                <div className="py-5 xl:hidden flex">
                            
                </div>
            </div>
        )
        }
        else {
            return(
                <div className="flex h-screen xl:h-full xl:grow xl:rounded-2xl xl:shadow-xl xl:border border-gray-500 xl:w-full w-full bg-gradient-to-bl from-gray-700 via-slate-800 to-gray-900">
                    <div className="flex justify-center items-center w-full h-5/6 xl:h-full">
                        <CgSpinner className="w-12 h-12 animate-spin text-gray-300"></CgSpinner>
                    </div>
                </div>
            )
        }
    }
    