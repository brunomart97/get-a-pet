import { useState, useEffect } from 'react';
import api from '../../utils/api';

import styles from './styles.module.css';

import PetForm from '../../components/PetForm';

import useFlashMessage from '../../hooks/useFlashMessage';

function EditPet() {
  return(
    <section>
      <h1 className={styles.title}>Editando o pet: 'pet.name'</h1>
      <p>Depois da edição os dados serão atualizados no sistema.</p>
    </section>
  )
}

export default EditPet;