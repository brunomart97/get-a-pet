import { useState } from 'react';

import styles from './styles.module.css';

// Components
import Input from '../../components/Input';
import Select from '../../components/Select';

function PetForm({
  handleSubmit,
  petData,
  btnText
}) {
  const [pet, setPet] = useState(petData || {});
  const [preview, setPreview] = useState([]);
  const colors = ["Branco", "Preto", "Cinza", "Caramelo", "Mesclado"];

  function onFileChange(e) {
    
  }

  function handleChange(e) {
    
  }

  function handleColor(e) {
    
  }

  return(
    <section>
      <form>
        <Input
          text="Imagem do pet"
          type="file"
          name="images"
          handleOnChange={onFileChange}
          multiple={true}
        />
        <Input
          text="Nome do pet"
          type="text"
          name="name"
          placeholder="Digite o seu nome"
          handleOnChange={handleChange}
          value={pet.name || ''}
        />
        <Input
          text="Idade do pet"
          type="text"
          name="age"
          placeholder="Digite a idade"
          handleOnChange={handleChange}
          value={pet.age || ''}
        />
        <Input
          text="Peso do pet"
          type="number"
          name="weight"
          placeholder="Digite o peso"
          handleOnChange={handleChange}
          value={pet.weight || ''}
        />
        <Select
          name="Color"
          text="Selecione a cor"
          options={colors}
          handleOnChange={handleColor}
          value={pet.color || ''}
        />
        <input
          className={styles.buttonSubmit}
          type="submit"
          value={btnText}
        />
      </form>
    </section>
  )
}

export default PetForm;