import { useState, useEffect } from 'react';
import api from '../../utils/api';

import styles from './styles.module.css';

import { Link } from 'react-router-dom';

function Home() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    api.get('/pets')
    .then((response) => {
      setPets(response.data.pets);
    })
  }, []);

  return(
    <section>
      <h1>Home</h1>
    </section>
  )
}

export default Home;