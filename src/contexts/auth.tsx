import Router from "next/router";
import React, { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import { api, createSession } from "../services/api";


type User = {
    id: string;
    email: string;
    password: string;
}

type SingIndata = {
    email: string;
    password: string;
}

type AuthContextType = {
    authenticated: boolean;
    user: User | null;
    loading: boolean;
    login: (data: SingIndata) => Promise<void>;
    logout: () => void;
}

// Criando um context
export const AuthContext = createContext({} as AuthContextType);

// Criandoas regras de negocio, conteudo provido e o provider do context
export const AuthProvider = ({ children }: any) => {

    //const navigate = useNavigate();

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Verificando se tem algum usuario salvo localmente (logado)
    useEffect(() => {
        const recoveredUser = localStorage.getItem("user");

        const { ['nextauth.token']: token } = parseCookies();
        //api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        if(recoveredUser) {
            setUser(JSON.parse(recoveredUser));
        }

        setLoading(false);
    }, []);

    const login = async ({email, password}: SingIndata) => {
        
        const response = await createSession(email, password);

        const loggedUser = response.data.user;
        const token = response.data.token;

        // Salvando o user localmente e o token nos cookies
        localStorage.setItem("user", JSON.stringify(loggedUser));

        setCookie(undefined, 'nextauth.token', token, {
            maxAge: 60*60*1,
        });
        
        // Passando o token no header das proximas requisições à api
        //api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        setUser(loggedUser);
        Router.push("/home");
    }

    const logout = () => {

        // Deletando o user localmente e o token nos cookies
        localStorage.removeItem("user");

        destroyCookie(null, 'nextauth.token');

        // Deletando o token do header
        //api.defaults.headers.common['Authorization'] = "";

        setUser(null);
        Router.push("/")
    }

    // Retornando o context provider com os valores-conteudos a serem passados-utilizados adiante
    return (
        <AuthContext.Provider value={{
            authenticated: !!user, user, loading, login, logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}