"use server"

export interface Location {
    "ip": string,
    "network": string,
    "version": string,
    "city": string,
    "region": string,
    "region_code": string,
    "country": string,
    "country_name": string,
    "country_code": string,
    "country_code_iso3": string,
    "country_capital": string,
    "country_tld": string,
    "continent_code": string,
    "in_eu": boolean,
    "postal": string,
    "latitude": number,
    "longitude": number,
    "timezone": string,
    "utc_offset": string,
    "country_calling_code": string,
    "currency": string,
    "currency_name": string,
    "languages": string,
    "country_area": number,
    "country_population": number,
    "asn": string,
    "org": string
}

export const getLocation = async () => {
    try  {
        const response = await fetch(`https://ipapi.co/json`)
        const data = await response.json()
        console.log(data)
        return data
    } catch(error) {
        console.log(error)
        return null
    }
}

export const getLocationByCity = async (city:string) => {
    try  {
        const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?key=${process.env.GEO_KEY}&q=${city}`)
        const data = await response.json()
        return data
    } catch(error) {
        console.log(error)
        return null
    }
}