import axios from "axios"

export const baseUrl = 'https://bayut.p.rapidapi.com'


export const fetchApi = async(url) => {
    const { data } = await axios.get((url), {
        headers: {
            'X-RapidAPI-Key': '5aa15d6abbmsh25a1b43e1b12dd1p1aa2e8jsn16bf32548bcc',
            'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
        }
    });

    return data;
}