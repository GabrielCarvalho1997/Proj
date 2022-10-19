import { useState, useEffect } from 'react'

import styles from './Message.module.css'

function Message({ type, msg }) { //Configura a mensagem com base no seu tipo e na seu conteúdo

    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (!msg) {
            setVisible(false)
            return
        }

        setVisible(true)

        const timer = setTimeout(() => {
            setVisible(false)
        }, 3000)
        
        return

        // return () => clearTimeout(timer) //Talvez essa função não precise ser executada

    }, [msg])

    return (<>
        {visible && (
            <div className={`${styles.message} ${styles[type]}`}>{msg}</div>
        )}
    </>)

}

export default Message