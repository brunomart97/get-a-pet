import { useState, useEffect } from 'react';
import bus from '../../../utils/bus';

import styles from './styles.module.css';

function Message() {
  const [type, setType] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    bus.addListener('flash', ({message, type}) => {
      setType(type);
      setVisibility(true);
      setMessage(message);

      setTimeout(() => {
        setVisibility(false);
      }, 3000);
    })
  }, []);

  return(
    visibility && (
      <div className={`${styles.message} ${styles[type]}`}>
        {message}
      </div>
    )
  )
}

export default Message;