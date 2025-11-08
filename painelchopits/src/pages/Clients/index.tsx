import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { FaPen, FaTrash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { Loading } from '../../components/Loading';
import { Toast } from '../../components/Toast';
//import { verificaTokenExpirado } from '../../service/token';

interface IClients {
    id: number;
    nomeCompleto: string;
    cpf: string;
    dataNascimento: string;
    email: string;
    telefone: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;

}

export const Clients = () => {

    const navigate = useNavigate();

    const [clients, setClients] = useState<IClients[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const [showToast, setShowToast] = useState(false);
    const [messageToast, setMessageToast] = useState('');
    const [corToast, setCorToast] = useState('success');

    useEffect(() => {
        console.log('inicio');

        let lsToken = localStorage.getItem('chopts:token');

        let token: any = null;

        if(typeof lsToken === 'string') {
            token = JSON.parse(lsToken);
        }

        if(!token){
            navigate('/')
        }

        setIsLoading(true)
        axios.get('http://localhost:3001/clients')
            .then((resposta) => {
                console.log(resposta.data)

                setClients(resposta.data)
            })
            .catch((erro) => {
                console.log(erro)
            })
            .finally(() => {
                setIsLoading(false)
            })

    }, [])

    const excluirClientes = useCallback(async (id: number) => {
        try {

            await axios.delete(`http://localhost:3001/clients/${id}`)

            const { data } = await axios.get('http://localhost:3001/clients')

            setClients(data)
            setShowToast(true)
            setMessageToast('Cliente deletado com sucesso :D')
            setCorToast('success')
        } catch (erro) {
            setShowToast(true)
            setMessageToast('Erro ao deletar cliente ;(')
            setCorToast(`danger`)
            console.log(erro)
        }
    }, [])

    return(
        <>
            <Toast
                color={corToast}
                show={showToast}
                message={messageToast}
                onClose={ () => { setShowToast(false) } }
            />
            <Loading visible={isLoading} />

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: 10
                }}
            >
                <h1>Clientes</h1>
                <button
                    type='button'
                    className='btn btn-success'
                    onClick={() => {
                        navigate('/clients/cadastrar')
                    }}
                >
                    Adicionar
                </button>
            </div>
            <table className='table'>
                    <thead>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Nome</th>
                            <th scope='col'>cpf</th>
                            <th scope='col'>data nascimento</th>
                            <th scope='col'>email</th>
                            <th scope='col'>telefone</th>
                            <th scope='col'>logradouro</th>
                            <th scope='col'>numero</th>
                            <th scope='col'>complemento</th>
                            <th scope='col'>bairro</th>
                            <th scope='col'>cidade</th>
                            <th scope='col'>estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            clients.map((client, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope='row'>{client.id}</th>
                                        <td>{client.nomeCompleto}</td>
                                        <td>{client.cpf}</td>
                                        <td>{client.dataNascimento}</td>
                                        <td>{client.email}</td>
                                        <td>{client.telefone}</td>
                                        <td>{client.logradouro}</td>
                                        <td>{client.numero}</td>
                                        <td>{client.complemento}</td>
                                        <td>{client.bairro}</td>
                                        <td>{client.cidade}</td>
                                        <td>{client.estado}</td>
                                        <td>
                                            <button
                                                className='btn btn-primary'
                                                type="button"
                                                style={{ marginRight: 5 }}
                                                onClick={() => {
                                                    navigate(`/clients/${client.id}`)
                                                }}
                                            >
                                                <FaPen/>
                                            </button>
                                            <button
                                                className='btn btn-danger'
                                                type="button"
                                                onClick={() => {
                                                    excluirClientes(client.id)
                                                }}
                                            >
                                                <FaTrash/>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
            </table>
        </>
    )

}