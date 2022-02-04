import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../utils/api';

import styles from './styles.module.css';

import PetForm from '../../components/PetForm';

import useFlashMessage from '../../hooks/useFlashMessage';

function EditPet() {
  const [pet, setPet] = useState({});
  const [token]= useState(localStorage.getItem('token') || '');
  const {id} = useParams();
  const {setFlashMessage} = useFlashMessage();

  useEffect(() => {
    api.get(`/pets/${id}`, {
      Authorization: `Bearer ${JSON.parse(token)}`
    })
    .then((response) => {
      setPet(response.data.pet)
    })
  }, [token, id]);

  async function updatePet(pet) {
    let msgType = 'success';
    const formData = new FormData();

    await Object.keys(pet).forEach((key) => {
      if(key === 'images') {
        for(let i = 0; i < pet[key].length; i++) {
          formData.append('images', pet[key][i]);
        }
      } else {
        formData.append(key, pet[key])
      }
    });

    const data = await api.patch(`pets/${pet._id}`, formData, {
      headers: {
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
      <h1 className={styles.title}>Editando o pet: <span>{pet.name}</span></h1>
      <p>Depois da edição os dados serão atualizados no sistema.</p>
      {pet.name && (
        <PetForm
          btnText="Atualizar pet"
          handleSubmit={updatePet}
          petData={pet}
        />
      )}
    </section>
  )
}

export default EditPet;