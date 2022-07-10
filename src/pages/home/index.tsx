import { GetServerSideProps } from "next";
import Head from 'next/head';
import React, { useContext, useEffect, useState } from "react";
import { parseCookies } from 'nookies';
import { AuthContext } from "../../contexts/auth";
import { getProjects } from "../../services/api";

import styles from "./Home.module.css";

type Project = {
    id: string;
    name: string;
}

export default function HomePage({ props }: any) {

    const { logout } = useContext(AuthContext);

    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    // Pegando os dados e passando para o state
    useEffect(() => {
        (async () => {
            const response = await getProjects();
            setProjects(response.data);
            setLoading(false);
        })();
    }, []);

    const handleLogout = () => {
        logout();
    }

    if(loading) {
        return <div className="loading">Carregando dados...</div>;
    }

    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <div className={styles.main}>
                <div className={styles.header}>
                    <h1>HomePage</h1>
                    <button className={styles.button} onClick={ handleLogout }>Logout</button>
                </div>
                
                <div className={styles.content}>
                    <ul>
                        {projects.map((project) => (
                            <li key={project.id}>
                                {project.id} - {project.name}
                            </li>
                        ))}
                    </ul>
                </div>
                
            </div>
        </>
        
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    // Verificando se o token está nos cookies
    const { ['nextauth.token']: token } = parseCookies(ctx);
    
    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        }
      }
    }
  
    return {
      props: {}
    }
  }