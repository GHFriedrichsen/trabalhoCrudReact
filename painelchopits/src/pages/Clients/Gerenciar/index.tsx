import axios from "axios";
import { useCallback, useEffect, useRef, useState, type SyntheticEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function GerenciarClients() {
    const navigate = useNavigate();
    const { id } = useParams();
    const refForm = useRef<any>(null);
    const [isEditar, setIsEditar] = useState(false);

    useEffect(() => {
        const idClient = Number(id);
        console.log(idClient);

        if (!isNaN(idClient)) {
            setIsEditar(true)

            axios.get(`http://localhost:3001/clients?id=${idClient}`)
                .then(({ data }) => {
                    refForm.current['nomeCompleto'].value = data[0].nomeCompleto 
                    refForm.current['email'].value = data[0].email 
                    refForm.current['cpf'].value = data[0].cpf 
                    refForm.current['dataNascimento'].value = data[0].dataNascimento 
                    refForm.current['telefone'].value = data[0].telefone 
                    refForm.current['logradouro'].value = data[0].logradouro 
                    refForm.current['numero'].value = data[0].numero 
                    refForm.current['complemento'].value = data[0].complemento 
                    refForm.current['bairro'].value = data[0].bairro 
                    refForm.current['cidade'].value = data[0].cidade 
                    refForm.current['estado'].value = data[0].estado 

                })
                .catch((erro) => {
                    console.log(erro)
                })
        }
    }, [id])

    const submitForm = useCallback((event: SyntheticEvent) => {
        event.preventDefault();

        if (refForm.current.checkValidity()) {

            const target = event.target as typeof event.target & {
                nomeCompleto: { value: string },
                cpf: { value: string },
                dataNascimento: { value: string },
                email: { value: string },
                telefone: { value: string },
                logradouro: { value: string },
                numero: { value: string },
                complemento: { value: string },
                bairro: { value: string },
                cidade: { value: string },
                estado: { value: string }
            }
            let objSalvar = {
                nomeCompleto: target.nomeCompleto.value,
                cpf: target.cpf.value,
                dataNascimento: target.dataNascimento.value,
                email: target.email.value,
                telefone: target.telefone.value,
                logradouro: target.logradouro.value,
                numero: target.numero.value,
                complemento: target.complemento.value,
                bairro: target.bairro.value,
                cidade: target.cidade.value,
                estado: target.estado.value,

            }

            if (isEditar) {
                console.log('editando');

                axios.put('http://localhost:3001/clients/' + id, objSalvar)
                    .then(() => {
                        alert('Editado com sucesso.')
                        navigate('/clients')
                    })
                    .catch((erro) => {
                        console.log(erro)
                    })
            } else {
                console.log('esta criando');
                axios.post('http://localhost:3001/clients', objSalvar)
                    .then(() => {
                        alert('salvou')
                        navigate('/clients')
                    })
                    .catch((erro) => {
                        console.log(erro)
                    })
            }

        }


    }, [isEditar, id])

    return (
        <>
            <h1>Clientes CRUD</h1>

            <form
                noValidate
                className="needs-validation g-3 row"
                ref={refForm}
                onSubmit={submitForm}
            >

                <div className="col-12">
                    <h2>Dados Cliente</h2>
                </div>


                <div className="col-md-6">
                    <label htmlFor="nomeCompleto" className="form-label">
                        Nome Completo
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Digite o nome completo"
                        id="nomeCompleto"
                        name="nomeCompleto"
                        required
                    />
                    <div className="invalid-feedback">
                        Por favor, digite o nome completo.
                    </div>
                </div>


                <div className="col-md-3">
                    <label htmlFor="cpf" className="form-label">
                        CPF
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="000.000.000-00"
                        id="cpf"
                        name="cpf"
                        required
                    />
                    <div className="invalid-feedback">
                        Por favor, digite o CPF.
                    </div>
                </div>


                <div className="col-md-3">
                    <label htmlFor="dataNascimento" className="form-label">
                        Data de Nascimento
                    </label>
                    <input
                        type="date"
                        className="form-control"
                        id="dataNascimento"
                        name="dataNascimento"
                        required
                    />
                    <div className="invalid-feedback">
                        Por favor, digite a data de nascimento.
                    </div>
                </div>

                <div className="col-md-6">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="exemplo@dominio.com"
                        id="email"
                        name="email"
                        required
                    />
                    <div className="invalid-feedback">
                        Por favor, digite um email válido.
                    </div>
                </div>


                <div className="col-md-6">
                    <label htmlFor="telefone" className="form-label">
                        Telefone
                    </label>
                    <input
                        type="tel"
                        className="form-control"
                        placeholder="(99) 99999-9999"
                        id="telefone"
                        name="telefone"
                        required
                    />
                    <div className="invalid-feedback">
                        Por favor, digite o telefone.
                    </div>
                </div>


                <div className="col-12 mt-4">
                    <h2>Endereço</h2>
                </div>


                <div className="col-md-6">
                    <label htmlFor="logradouro" className="form-label">
                        Logradouro
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Rua, Avenida, etc."
                        id="logradouro"
                        name="logradouro"
                        required
                    />
                    <div className="invalid-feedback">
                        Por favor, digite o logradouro.
                    </div>
                </div>


                <div className="col-md-2">
                    <label htmlFor="numero" className="form-label">
                        Número
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="123"
                        id="numero"
                        name="numero"
                        required
                    />
                    <div className="invalid-feedback">
                        Por favor, digite o número.
                    </div>
                </div>

                <div className="col-md-4">
                    <label htmlFor="complemento" className="form-label">
                        Complemento (Opcional)
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Ap 101, Bloco B"
                        id="complemento"
                        name="complemento"
                    />
                </div>

                <div className="col-md-4">
                    <label htmlFor="bairro" className="form-label">
                        Bairro
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Bairro"
                        id="bairro"
                        name="bairro"
                        required
                    />
                    <div className="invalid-feedback">
                        Por favor, digite o bairro.
                    </div>
                </div>

                <div className="col-md-4">
                    <label htmlFor="cidade" className="form-label">
                        Cidade
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Cidade"
                        id="cidade"
                        name="cidade"
                        required
                    />
                    <div className="invalid-feedback">
                        Por favor, digite a cidade.
                    </div>
                </div>

                <div className="col-md-4">
                    <label htmlFor="estado" className="form-label">
                        Estado (UF)
                    </label>
                    <select
                        className="form-select"
                        id="estado"
                        name="estado"
                        defaultValue={""}
                        required
                    >
                        <option value={""} disabled>Selecione a UF</option>

                        <option value="AC">Acre</option>
                        <option value="AP">Amapá</option>
                        <option value="AM">Amazonas</option>
                        <option value="PA">Pará</option>
                        <option value="RO">Rondônia</option>
                        <option value="RR">Roraima</option>
                        <option value="TO">Tocantins</option>

                        <option value="AL">Alagoas</option>
                        <option value="BA">Bahia</option>
                        <option value="CE">Ceará</option>
                        <option value="MA">Maranhão</option>
                        <option value="PB">Paraíba</option>
                        <option value="PE">Pernambuco</option>
                        <option value="PI">Piauí</option>
                        <option value="RN">Rio Grande do Norte</option>
                        <option value="SE">Sergipe</option>

                        <option value="DF">Distrito Federal</option>
                        <option value="GO">Goiás</option>
                        <option value="MT">Mato Grosso</option>
                        <option value="MS">Mato Grosso do Sul</option>

                        <option value="ES">Espírito Santo</option>
                        <option value="MG">Minas Gerais</option>
                        <option value="RJ">Rio de Janeiro</option>
                        <option value="SP">São Paulo</option>

                        <option value="PR">Paraná</option>
                        <option value="RS">Rio Grande do Sul</option>
                        <option value="SC">Santa Catarina</option>
                    </select>
                    <div className="invalid-feedback">
                        Por favor, selecione o estado.
                    </div>
                </div>
                <div className="invalid-feedback">
                    Por favor, selecione o estado.
                </div>



                <div className="col-12 mt-4">
                    <button
                        className="btn btn-secondary me-2"
                        type="button"
                    >
                        Voltar
                    </button>

                    <button
                        className="btn btn-primary"
                        type="submit"
                    >
                        {isEditar ? "Salvar Alterações" : "Salvar"}
                    </button>
                </div>

            </form>
        </>
    );
}