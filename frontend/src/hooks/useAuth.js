import api from '../utils/api';

import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useFlashMessage from './useFlashMessage';

export default function useAuth() {
  const { setFlashMessage } = useFlashMessage();
  const [authenticate, setAuthenticate] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if(token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticate(true);
    }
  }, []);

  async function register(user) {
    let msgText = 'Cadastro realizado com sucesso!';
    let msgType = 'success';

    try {
      const data = await api.post('/users/register', user)
      .then((response) => {
        return response.data;
      })

      await authUser(data);
    } catch (error) {
      msgText = error.response.data.message;
      msgType = 'error';
    }

    setFlashMessage(msgText, msgType);
  }

  async function authUser(data) {
    setAuthenticate(true);

    localStorage.setItem('token', JSON.stringify(data.token));

    history.push('/');
  }

  function logout() {
    const msgText = 'Logout realizado com sucesso!';
    const msgType = 'success';

    setAuthenticate(false);
    localStorage.removeItem('token');
    api.defaults.headers.Authorization = undefined;
    history.push('/');

    setFlashMessage(msgText, msgType);
  }

  return { register, authenticate, logout };
}