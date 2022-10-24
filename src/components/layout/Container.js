import styles from './Container.module.css'

//Cria a parte do contéudo da página
function Container(props) {
    return (
        <div className={`${styles.container} ${styles[props.customClass]}`}>
            {props.children}
        </div>
    )
}

export default Container