import React, { useContext, useState } from "react";
import Head from 'next/head';
import { AuthContext } from "../../contexts/auth";
import styles from "./Login.module.css";

type SingIndata = {
    email: string;
    password: string;
}

const LoginPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);

    const handleSubmit = (e: any) => {
        e.preventDefault();

        // Chamando a função contida no context
        login({email, password});
    }

    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <div id={styles.login}>
                <h1 className={styles.title}>Login</h1>
                <form className={styles.form} onSubmit={ handleSubmit }>
                    <div className={styles.field}>
                        <label htmlFor="email" className={styles.label}>Email</label>
                        <input type="email" name="email" id="email" className={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="password" className={styles.label}>Password</label>
                        <input type="password" name="password" id="password" className={styles.input} value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className={styles.actions}>
                        <button type="submit">Entrar</button>
                    </div>
                </form>
            </div>
        </>
        
    );
};

export default LoginPage;