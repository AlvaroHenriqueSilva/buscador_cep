import { FiSearch } from 'react-icons/fi';
import './styles.css';
import { useState } from 'react';
import axios from 'axios';

export default function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

  async function handleSearch() {
    if (input === '') return alert('Preencha um cep válido')

    try {
      const response = await axios.get(`http://viacep.com.br/ws/${input}/json`)
        setCep(response.data)
        setInput('')
    } catch (error) {
      alert('Ops erro ao buscar o cep')
      setInput('')
    }

  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu cep"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color='#FFF' />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className='main'>
        <h2>CEP: {cep.cep}</h2>

        <span>Rua: {cep.logradouro}</span>
        <span>Complemento: {cep.complemento}</span>
        <span>{cep.bairro}</span>
        <span>{cep.localidade} - {cep.uf}</span>
      </main>
      )}
    </div>
  );
}

