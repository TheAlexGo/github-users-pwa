import React, { FC, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export const Header: FC = () => {
    const [searchValue, setSearchValue] = useState('');
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!searchValue.trim().length) {
            return;
        }

        console.log(searchValue);
    };

    return (
        <header className="header">
            <div className="container header__container">
                <nav className="header__navigation">
                    <ul className="header__navigation-list">
                        <li className="header__navigation-list-item">
                            <Link to="/" className="header__navigation-link">
                                Пользователи гитхаба
                            </Link>
                        </li>
                        <li className="header__navigation-list-item">
                            <a className="header__navigation-link header__navigation-link--user">defunct</a>
                        </li>
                    </ul>
                </nav>

                <div className="header__search">
                    <form className="header__search-form" onSubmit={onSubmit}>
                        <input
                            type="search"
                            className="header__search-input"
                            placeholder="Поиск пользователя"
                            value={searchValue}
                            onChange={(event) => setSearchValue(event.currentTarget.value)}
                        />
                        <button type="submit" className="header__search-button">
                            Найти
                        </button>
                    </form>
                </div>
            </div>
        </header>
    );
};
