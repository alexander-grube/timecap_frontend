import { FunctionComponent, useState, useEffect } from "react";
import { Account, mapAccountRole } from "../../models/Account";

export const MyAccount: FunctionComponent = () => {
    const [account, setAccount] = useState<Account>({} as Account);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch('https://backend-bugtrack.alexgrube.dev/api/account', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${document.cookie.split('=')[1]}`
            }
        }).then(res => res.json()).then(res => {
            setAccount(res.account);
        }).catch(err => {
            console.log(err);
        }
        ).finally(() => {
            setLoading(false);
        }
        );
    }, []);

    return (
        <div className='container'>
            {loading ? <article aria-busy="true"></article> : (
                <article>
                    <header>
                        <nav>
                            <ul>
                                <li><strong>My Account</strong></li>
                            </ul>
                        </nav>
                    </header>
                    <div className='grid'>
                        <div className='col-1-2'>
                            <div className='form-group'>
                                <label htmlFor='firstname'>Firstname</label>
                                <input type='text' id='firstname' name='firstname' value={account.firstname} readOnly />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='email'>Email</label>
                                <input type='text' id='email' name='email' value={account.email} readOnly />
                            </div>
                        </div>
                        <div className='col-1-2'>
                            <div className='form-group'>
                                <label htmlFor='lastname'>Lastname</label>
                                <input type='text' id='lastname' name='lastname' value={account.lastname} readOnly />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='role'>Role</label>
                                <input type='text' id='role' name='role' value={mapAccountRole(account.role)} readOnly />
                            </div>
                        </div>
                    </div>
                </article>)}
        </div>
    );
}