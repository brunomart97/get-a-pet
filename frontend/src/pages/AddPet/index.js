import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../utils/api';

import styles from './styles.module.css';

import useFlashMessage from '../../hooks/useFlashMessage';

// Components
import PetForm from '../../components/PetForm';

function AddPet() {
  const [token] = useState(localStorage.getItem('token') || '');
  const {setFlashMessage} = useFlashMessage();
  const history = useHistory();

  async function registerPet(pet) {
    let msgType = 'success';

    const formData = new FormData;

    await Object.keys(pet).forEach((key) => {
      if(key === 'images') {
        for(let i = 0; i < pet[key].length; i++) {
          formData.append('images', pet[key][i]);
        }
      } else {
        formData.append(key, pet[key]);
      }
    });

    const data = await api.post('pets/create', formData, {
      Authorization: `Bearer ${JSON.parse(token)}`,
      'Content-Type': 'multipart/form-data'
    })
    .then((response) => {
      return response.data;
    }).catch((error) => {
      msgType = 'error';
      return error.response.data;
    });

    setFlashMessage(data.message, msgType);
    
    if(msgType !== 'error') {
      history.push('/pets/mypets');
    }
  }

  return(
    <section>
      <h1 className={styles.title}>Cadastre um pet</h1>
      <p>E ele ficará disponível para adoção.</p>
      <PetForm
        btnText="Cadastrar pet"
        handleSubmit={registerPet}
      />
    </section>
  )
}

export default AddPet;