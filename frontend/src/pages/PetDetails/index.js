import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../utils/api';

import styles from './styles.module.css';

import useFlashMessage from '../../hooks/useFlashMessage';

function PetDetails() {
  const [pet, setPet] = useState({});
  const {id} = useParams();
  const {setFlashMessage} = useFlashMessage();
  const [token] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    api.get(`/pets/${id}`)
    .then((response) => {
      setPet(response.data.pet);
    })
  }, [id]);

  return(
    <>
      {pet.name && (
        <section className={styles.petDetailsContainer}>
          <h1 className={styles.title}>Conhecendo o pet: <span>{pet.name}</span></h1>
          <p>Se tiver interesse, marque uma visita para conhecê-lo.</p>
          <div className={styles.petImages}>
            {pet.images.map((image, index) => (
              <img
                src={`${process.env.REACT_APP_API}/images/pets/${image}`}
                alt={pet.name}
                key={index}
              />
            ))}
          </div>
          <p><span className="bold">Peso:</span> {pet.weight}</p>
          <p><span className="bold">Idade:</span> {pet.age} anos</p>
          {token ? (
            <button className={styles.buttonVisit}>Solicitar visita</button>
          ) : (
            <p>Você precisa <Link to="/register">criar uma conta</Link> ou logar no sistema para solicitar uma visita.</p>
          )}
        </section>
      )}
    </>
  )
}

export default PetDetails;