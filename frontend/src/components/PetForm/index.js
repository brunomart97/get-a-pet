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
    setPreview(Array.from(e.target.files));
    setPet({...pet, images: [...e.target.files]});
  }
  
  function handleChange(e) {
    setPet({...pet, [e.target.name]: e.target.value});
  }
  
  function handleColor(e) {
    setPet({...pet, color: e.target.options[e.target.selectedIndex].text});
  }

  function submit(e) {
    e.preventDefault();
    handleSubmit(pet);
  }

  return(
    <section>
      <form onSubmit={submit}>
        <div className={styles.previewPet}>
          {preview.length > 0 ?
            preview.map((image, index) => (
              <img
                src={URL.createObjectURL(image)}
                alt={pet.name}
                key={`${pet.name}+${index}`}
              />
            )) : pet.images && pet.images.map((image, index) => (
              <img
                src={`${process.env.REACT_APP_API}/images/pets/${image}`}
                alt={pet.name}
                key={`${pet.name}+${index}`}
              />
            ))
          }
        </div>
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