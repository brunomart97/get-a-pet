import { useState, useContext } from 'react';

import styles from './styles.module.css';

import { Link } from 'react-router-dom';
import Input from '../../../components/Input';

// Context
import { Context } from '../../../context/UserContext';

function Login() {
  function handleChange(e) {
    
  }

  return(
    <section>
      <h1 className={styles.title}>Login</h1>
      <form>
        <Input
          text="E-mail"
          type="email"
          name="email"
          placeholder="Digite o seu e-mail"
          handleOnChange={handleChange}
        />
        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite a sua senha"
          handleOnChange={handleChange}
        />
        <input
          className={styles.buttonSubmit}
          type="submit"
          value="Entrar"
        />
      </form>
      <p className={styles.linkBottom}>
        Não tem uma conta? <Link to="/register">Fazer cadastro</Link>
      </p>
    </section>
  )
}

export default Login;