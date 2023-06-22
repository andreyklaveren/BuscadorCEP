import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import './styles.css'
import api from './services/api'

function App() {
  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

  async function handleSearch() {
    if (input === '') {
      alert('preencha algo')
      return
    }

    try {
      const response = await api.get(input + '/json')
      setCep(response.data)
      setInput('')
    } catch {
      alert(
        'Erro ao buscar, verifique se o CEP digitado está correto e use 8 digitos (apenas números)'
      )
      setInput('')
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>
      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu CEP..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={
            e => {
              if (e.key === 'Enter') {
                handleSearch()
              }
            } //adiciona a função de pesquisa pela tecla 'enter'}
          }
        />
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color={'#FFF'} />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          {cep.complemento && <span>Complemento: {cep.complemento}</span>}{' '}
          {/* Verifica se 'cep.complemento existe se não ele não renderiza' */}
          <span>Bairro: {cep.bairro}</span>
          <span>
            {cep.localidade} - {cep.uf}
          </span>
        </main>
      )}
    </div>
  )
}

export default App
