import { useState, useEffect } from 'react';

import styles from './styles.module.css';

import Input from '../../components/Input';

function Profile() {
  const [user, setUser] = useState({});

  function onFileChange(e) {

  }

  function handleChange(e) {
    
  }
  
  return(
    <section>
      <h1 className={styles.title}>Perfil</h1>
      <p>Preview imagem</p>
      <form>
        <Input
          text="Imagem"
          type="file"
          name="image"
          handleOnChange={onFileChange}
        />
        <Input
          text="Nome"
          type="text"
          name="name"
          placeholder="Digite o seu nome"
          handleOnChange={handleChange}
          value={user.name || ''}
        />
        <Input
          text="E-mail"
          type="email"
          name="email"
          placeholder="Digite o seu e-mail"
          handleOnChange={handleChange}
          value={user.email || ''}
        />
        <Input
          text="Telefone"
          type="text"
          name="phone"
          placeholder="Digite o seu telefone"
          handleOnChange={handleChange}
          value={user.phone || ''}
          />
        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite a sua senha"
          handleOnChange={handleChange}
        />
        <Input
          text="Confirmação de senha"
          type="confirmPassword"
          name="confirmPassword"
          placeholder="Confirme a sua senha"
          handleOnChange={handleChange}
        />
        <input
          className={styles.buttonSubmit}
          type="submit"
          value="Editar"
        />
      </form>
    </section>
  )
}

export default Profile;