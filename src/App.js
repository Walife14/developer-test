import { useState, useEffect } from 'react'

// components
import Header  from './components/Header'
import Banner from './components/Banner'

// styles
import './App.css';

function App() {
  const [searchInput, setSearchInput] = useState('')
  const [name, setName] = useState('')
  const [login, setLogin] = useState('')
  const [avatarURL, setAvatarURL] = useState('')
  const [description, setDescription] = useState('')
  const [repos, setRepos] = useState(null)
  const [error, setError] = useState(null)
  const [toggle, setToggle] = useState(null)

  const setData = ({ name, avatar_url, description, public_repos, login }) => {
    setName(name)
    setAvatarURL(avatar_url)
    setDescription(description)
    setRepos(public_repos)
    setLogin(login)
  }

  const handleSearch = (e) => {
      setSearchInput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setToggle(null)

    fetch(`https://api.github.com/orgs/${searchInput}`)
      .then(res => res.json())
      .then(data => {
        if (data.message)  {
          setError(data.message)
        }
        else {
          setData(data)
          setError(null)
        }
      })
  }

  return (
    <div className="App">
      <Header handleSubmit={handleSubmit} />
      <form onSubmit={handleSubmit} className="search-form">
        <label>
            <span>Organization Name </span>
            <input type="text" onChange={handleSearch} required/>
        </label>
        <button>Search</button>
        {error ? (<span>Organization {error}</span>) : (<></>)}
      </form>
      <Banner name={name} avatar_url={avatarURL} description={description} repos={repos} searchInput={searchInput} login={login} setToggle={setToggle} toggle={toggle} />
    </div>
  );
}

export default App;
