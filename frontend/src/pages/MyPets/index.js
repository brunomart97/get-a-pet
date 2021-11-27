import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

import styles from './styles.module.css';

import RoundedImage from '../../components/RoundedImage';

import useFlashMessage from '../../hooks/useFlashMessage';

function MyPets() {
  const [pets, setPets] = useState([]);
  const [token] = useState(localStorage.getItem('token') || '');
  const {setFlashMessage} = useState();

  useEffect(() => {
    api.get('/pets/mypets', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    })
    .then((response) => {
      setPets(response.data.pets);
    })
  }, [token]);

  return(
    <section>
      <h1>MyPets</h1>
      <Link to="/pet/add">Cadastrar Pet</Link>
      <div>
        {pets.length > 0 && (
          <p>Meus pets cadastrados</p>
        )}
        {pets.length === 0 && (
          <p>Não há pets cadastrados!</p>
        )}
      </div>
    </section>
  )
}

export default MyPets;