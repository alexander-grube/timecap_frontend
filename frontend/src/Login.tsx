import React , { FunctionComponent } from 'react'
import { useState } from 'react'


export const Login: FunctionComponent = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function handleLogin(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault()
        console.log(username, password)
        console.log('login')
    }

    function handleUsername(e: React.ChangeEvent<HTMLInputElement>) {
        setUsername(e.target.value)
    }

    function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value)
    }

    return (
        <div className="App">
            <div className='container'>
                <article>
                    <header>Login</header>
                    <form>
                        <label>
                            <input type="text" placeholder="Username" value={username} onChange={handleUsername} />
                        </label>
                        <label>
                            <input type="password" placeholder="Password" value={password} onChange={handlePassword} />
                        </label>
                        <button onClick={handleLogin}>Login</button>
                    </form>
                    <footer>timecap</footer>
                </article>
            </div>
        </div>
    )
}

