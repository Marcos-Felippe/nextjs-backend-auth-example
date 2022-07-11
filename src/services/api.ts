import axios from 'axios';
import { parseCookies } from "nookies";

export const api = axios.create({
    baseURL: "http://localhost:3300",
});

export const createSession = async (email: string, password: string) => {
    return api.post("/auth/authenticate", { email, password });
}

export const getProjects = async () =>{

    const { 'nextauth.token': token } = parseCookies();

    return api.get("/projects", {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
    });
}