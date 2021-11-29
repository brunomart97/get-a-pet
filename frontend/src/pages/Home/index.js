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
      <h1 className={styles.title}>Home</h1>
      <p>Veja os detalhes de cada um e conheça o tutor deles.</p>
      <div>
        {pets.length > 0 && (
          pets.map((pet) => (
            <div>
              <p>Imagem do pet</p>
              <h3>{pet.name}</h3>
              <p><span className="bold">Peso:</span> {pet.weight}kg</p>
              {pet.available ? (
                <Link to={`pet/${pet._id}`}>Mais detalhes</Link>
              ) : (
                <p>Adotado</p>
              )}
            </div>
          ))
        )}
        {pets.length === 0 && (
          <p>Não há pets disponíveis para adoção no momento!</p>
        )}
      </div>
    </section>
  )
}

export default Home;