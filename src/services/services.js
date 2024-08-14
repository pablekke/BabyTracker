import { URL_API } from "./consts";

export const get = async ({ url, user }) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    if (user) {
        myHeaders.append("apikey", user.apiKey)
        myHeaders.append("iduser", user.iduser)
    }
    
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };
    try {
        const response = await fetch(`${URL_API}${url}`, requestOptions);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.mensaje || `Error: ${response.status}`);
        }
        
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const post = async ({ body, url, user }) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    if (user) {
        myHeaders.append("apikey", user.apiKey)
        myHeaders.append("iduser", user.iduser)
    }
    
    
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: body,
        redirect: "follow",
    };
    
    try {
        const response = await fetch(`${URL_API}${url}`, requestOptions);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.mensaje || `Error: ${response.status}`);
        }
        
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const remove = async ({ url, user }) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    if (user) {
        myHeaders.append("apikey", user.apiKey)
        myHeaders.append("iduser", user.iduser)
    }
    
    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
    };

    try {
        const response = await fetch(`${URL_API}${url}`, requestOptions);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.mensaje || `Error: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getUrlImg = (id) => {
    return `${URL_API}/imgs/${id}.png`
}