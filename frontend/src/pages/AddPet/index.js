import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../utils/api';

import styles from './styles.module.css';

import useFlashMessage from '../../hooks/useFlashMessage';

function AddPet() {
  return(
    <section>
      <h1 className={styles.title}>Cadastre um pet</h1>
      <p>E ele ficará disponível para adoção.</p>
    </section>
  )
}

export default AddPet;