import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../utils/api';

import styles from './styles.module.css';

import useFlashMessage from '../../hooks/useFlashMessage';

function PetDetails() {
  return(
    <section>
      <h1 className={styles.title}>Detalhes do Pet</h1>
    </section>
  )
}

export default PetDetails;