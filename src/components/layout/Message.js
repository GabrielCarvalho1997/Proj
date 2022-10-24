import { useState, useEffect } from 'react'

import styles from './Message.module.css'

//Configura a mensagem com base no seu tipo e na seu conteúdo
function Message({ type, msg }) {

    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (!msg) {
            setVisible(false)
            return
        }

        setVisible(true)

        const timer = setTimeout(() => {
            setVisible(false)
        }, 2000)

        return () => clearTimeout(timer)

    }, [msg])

    return (<>
        {visible && (
            <div className={`${styles.message} ${styles[type]}`}>{msg}</div>
        )}
    </>)

}

export default Message