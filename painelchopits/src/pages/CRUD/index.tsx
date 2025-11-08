import axios from "axios";
import { number } from "json-decode";
import { useCallback, useEffect, useRef, useState, type SyntheticEvent } from "react";
import { data, useNavigate, useParams } from "react-router-dom";

export default function Crud () {
    const navigate =useNavigate();
    const { id } = useParams();
    const refForm = useRef<any>(null);
    const [isEditar, setIsEditar] = useState(false);

    useEffect(() => {
        const idClient = number (id);
        console.log(idClient);

        if(!isNaN(idClient)){
            setIsEditar(true)

            axios.get(`http://localhost:3001/users?id=${idClient}`)
                .then(({ data }) => {
                    refForm.current['nome'].value = data[0].nome
                    refForm.current['email'].value = data[0].email

                })
                .catch((erro) => {
                    console.log(erro)
                })
        }
    }, [id])

    const submitForm = useCallback((event: SyntheticEvent) => {
        event.preventDefault();

        if(refForm.current.checkValidity()) {
            
            const target = event.target as typeof event.target & {
                nomeCompleto: { value: string },
                cpf: {value: string },
                dataNascimento: {value: },
                email: {value: string},
                telefone: {value: string},
                logradouro: {value: string},
                numero: {value: string},
                complemento: {value: string},
                bairro: {value: string},
                cidade: {value: string},
                estado: {value: string}
            }
        }
    })

}