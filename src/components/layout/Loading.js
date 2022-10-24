import styles from './Loading.module.css'
import loading from '../../img/loading.svg'

//Uma tela de carregamento para aguardar o processamento dos dados
function Loading() {
    return (
        <div className={styles.loader_container}>
            <img className={styles.loader} src={loading} alt="Loading" />
        </div>
    )
}

export default Loading