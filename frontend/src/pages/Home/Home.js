import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './Home.css';
import logo from '../../assets/images/logo.svg';
import like from '../../assets/images/like.svg';
import dislike from '../../assets/images/dislike.svg';

export default function Routes({ match }) {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const loadUser = async () => {
            await api.get('/devs', {
                headers: {
                    user: match.params.id
                }
            })
                .then(res => {
                    if (res.status === 200) {
                        setUsers(res.data);
                    }
                });
        }
        loadUser();
    }, [match.params.id]);

    const handleLike = async id => {
        await api.post(`/devs/${id}/likes`, null, {
            headers: { user: match.params.id }
        });

    }

    const handleDislike = async id => {
        await api.post(`/devs/${id}/dislikes`, null, {
            headers: { user: match.params.id }
        });

        setUsers(users.filter(user => user._id !== id));
    }

    return (
        <div className="main-container">
            <Link to='/'>
                <img src={logo} alt='Tindev' />
            </Link>
            {users.length > 0 ?
                <ul>
                    {users.map(user =>
                        <li key={user._id}>
                            <img src={user.avatar} alt='Avatar' />
                            <footer>
                                <strong>{user.name}</strong>
                                <p>{user.bio}</p>
                            </footer>
                            <div className="buttons">
                                <button type='button' onClick={() => handleDislike(user._id)}>
                                    <img src={dislike} alt='Dislike' />
                                </button>
                                <button type='button' onClick={() => handleLike(user._id)}>
                                    <img src={like} alt='Like' />
                                </button>
                            </div>
                        </li>)}
                </ul>
                :
                <div className="empty">Acabou :(</div>}

        </div>
    )
}