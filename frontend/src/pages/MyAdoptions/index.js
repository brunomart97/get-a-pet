import { useState, useEffect } from 'react';
import api from '../../utils/api';

import styles from './styles.module.css';

import RoundedImage from '../../components/RoundedImage';

function MyAdoptions() {
  const [pets, SetPets] = useState([]);
  const [token] = useState(localStorage.getItem('token') || '');

  useeffects(() => {
    api.get('/pets/myadoptions', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    })
    .then((response) => {
      setPets(response.data.pets);
    })
  }, [token]);

  return(
    <h1>Minhas Adoções</h1>
  )
}

export default MyAdoptions;