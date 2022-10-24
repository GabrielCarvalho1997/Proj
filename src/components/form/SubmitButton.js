import styles from './SubmitButton.module.css'

//Um modelo de botão de envio para ser usado em qualquer parte da aplicação
function SubmitButton({ text }) {
    return (
        <div >
           <button className={styles.btn}>{text}</button>
        </div>
    )
}

export default SubmitButton