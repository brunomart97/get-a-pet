import { useState, useEffect } from 'react';
import api from '../../utils/api';

import styles from './styles.module.css';

import Input from '../../components/Input';

import useFlashMessage from '../../hooks/useFlashMessage';

function Profile() {
  const [user, setUser] = useState({});
  const [token] = useState(localStorage.getItem('token') || '');
  const {setFlashMessage} = useFlashMessage();

  useEffect(() => {
    api.get('/users/checkuser', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    })
    .then((response) => {
      setUser(response.data);
    });
  }, [token]);

  function onFileChange(e) {
    setUser({ ...user, [e.target.name]: e.target.files[0] });
  }

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    let msgType = 'success';

    const formData = new FormData();

    await Object.keys(user).forEach((key) => {
      formData.append(key, user[key]);
    });

    const data = await api.patch(`users/edit/${user._id}`, formData, {
      header: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      return response.data;
    }).catch((error) => {
      msgType = 'error';
      return error.response.data;
    });

    setFlashMessage(data.message, msgType);
  }
  
  return(
    <section>
      <h1 className={styles.title}>Perfil</h1>
      <p>Preview imagem</p>
      <form onSubmit={handleSubmit}>
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