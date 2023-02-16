import React, { FunctionComponent } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

type AccountRequest = {
    account: {
        email: string,
        password: string
    }
}

type AccountResponse = {
    account: {
        firstname: string,
        lastname: string,
        email: string,
        role: number,
        token: string
    }
}



export const Login: FunctionComponent = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    function handleLogin(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        setLoading(true)
        e.preventDefault()
        let request: AccountRequest = {
            account: {
                email: email,
                password: password
            }
        }
        fetch('https://backend-bugtrack.alexgrube.dev/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        })
            .then(res => res.json())
            .then(res => {
                if (res.account) {
                    res = res as AccountResponse
                    document.cookie = `token=${res.account.token}`
                }
            }).finally(() => {
                setLoading(false)
                window.location.reload()
            })
    }

    function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value)
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
                            <input type="text" placeholder="Email" value={email} onChange={handleEmail} />
                        </label>
                        <label>
                            <input type="password" placeholder="Password" value={password} onChange={handlePassword} />
                        </label>
                        <button onClick={handleLogin} aria-busy={loading}>{loading ? "" : "Login"}</button>
                    </form>
                    <footer>timecap</footer>
                </article>
            </div>
        </div>
    )
}

