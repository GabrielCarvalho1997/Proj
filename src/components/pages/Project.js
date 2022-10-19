import styles from './Project.module.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Loading from '../layout/Loading'
import Container from '../layout/Container'
import ProjectForm from '../project/ProjectForm'
import Message from '../layout/Message'

function Project() { // Cria nova uma nova página para edição do projeto
    const { id } = useParams() // "Pega" o id que está vindo pela URL

    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    useEffect(() => {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                setProject(data)
            })
            .catch(err => console.log(err))
    }, [id])

    function editPost(project) { //Irá editar os valores do projeto
        setMessage('') // Evita o bug de atualizar o projeto mais de 1 vez seguida

        //Validação do orçamento
        if (project.budget < project.cost) {
            setMessage('O orçamento não pode ser menor que o custo do projeto!')
            setType('error')

            return false //Parar o projeto, pois o budget não pode ser menor que o cost
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project),
        })
            .then((resp) => resp.json())
            .then((data) => {

                setProject(data)
                setShowProjectForm(false)
                setMessage('Projeto atualizado com sucesso!')
                setType('success')

            })
            .catch(err => console.log(err))
    }

    function toggleProjectForm() { // Irá mostrar as info do projeto
        setShowProjectForm(!showProjectForm) //Inverte -- se tiver true fica false e vice-versa
    }

    function toggleServiceForm() { // Irá mostrar o formulário de serviços do projeto
        setShowServiceForm(!showServiceForm) //Inverte -- se tiver true fica false e vice-versa
    }

    return (
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass="column">
                        {message && <Message type={type} msg={message} />}
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>
                                {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria:</span> {project.category.name}
                                    </p>
                                    <p>
                                        <span>Total de orçamento:</span> R${project.budget}
                                    </p>
                                    <p>
                                        <span>Total utilizado:</span> R${project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <ProjectForm
                                        handleSubmit={editPost}
                                        btnText="Concluir edição"
                                        projectData={project}
                                    />
                                </div>
                            )}
                        </div>
                        <div className={styles.service_form_container}>
                            <h2>Adicione um serviços:</h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>
                                {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                            </button>
                            <div className={styles.project_info}>
                                {showServiceForm && <div>Formulário do serviço</div>}
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass = "start" >
                            <p>Itens de serviço</p>
                        </Container>
                    </Container>
                </div>
            ) : (
                <Loading />
            )}
        </>
    )
}

export default Project