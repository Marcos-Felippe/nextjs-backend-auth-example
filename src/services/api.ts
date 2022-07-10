import axios from 'axios';

export const api = axios.create({
    baseURL: "http://localhost:3300",
});

export const createSession = async (email: string, password: string) => {
    return api.post("/auth/authenticate", { email, password });
}

export const getProjects = async () =>{
    return api.get("/projects");
}