import { useState, useEffect } from 'react';
import api from '../../utils/api';

import styles from './styles.module.css';

import RoundedImage from '../../components/RoundedImage';

function MyAdoptions() {
  const [pets, setPets] = useState([]);
  const [token] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
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
    <section>
      <h1 className={styles.title}>Minhas Adoções</h1>
      <div className={styles.petListContainer}>
        {pets.length > 0 && (
          pets.map((pet) => (
            <div key={pet.id} className={styles.petListRow}>
              <RoundedImage
                src={`${process.env.REACT_APP_API}/images/pets/${pet.images[0]}`}
                alt={pet.name}
                width="px75"
              />
              <div>
                <span className={`bold ${styles.petName}`}>{pet.name}</span>
                <p><span className="bold">Ligue para:</span> {pet.user.phone}</p>
                <p><span className="bold">Fale com:</span> {pet.user.name}</p>
              </div>
              <div className={styles.actions}>
                {pet.available ? (
                  <p>Adoção em processo</p>
                ) : (
                  <p>Parabéns por concluir a adoção!</p>
                )}
              </div>
            </div>
          ))
        )}
        {pets.length === 0 && (
          <p>Ainda não há adoções de pets.</p>
        )}
      </div>
    </section>
  )
}

export default MyAdoptions;