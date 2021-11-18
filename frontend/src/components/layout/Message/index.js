import { useState } from 'react';

import styles from './styles.module.css';

function Message() {
  const [type, setType] = useState("");

  return(
    <div className={`${styles.message} ${styles[type]} "success"`}>
      Message
    </div>
  )
}

export default Message;