import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { getSearchLink } from '../../utils/routes';

import './Header.css';

export const Header: FC = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { username } = useParams();
    const [searchParams] = useSearchParams();
    const [searchValue, setSearchValue] = useState(searchParams.get('query') || '');

    const changeHandler = ({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(currentTarget.value);
    };
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!searchValue.trim().length) {
            return;
        }

        navigate({
            pathname: getSearchLink(),
            search: `?query=${searchValue}`,
        });
    };

    const renderSecondCrumb = () => {
        let title;
        switch (pathname) {
            case getSearchLink():
                title = 'поиск';
                break;
            default:
                title = '';
        }
        if (username) {
            title = username;
        }
        if (title) {
            return (
                <li className="header__navigation-list-item">
                    <a className="header__navigation-link header__navigation-link--user">{title}</a>
                </li>
            );
        }
        return null;
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
                        {renderSecondCrumb()}
                    </ul>
                </nav>

                <div className="header__search">
                    <form className="header__search-form" onSubmit={onSubmit}>
                        <input
                            type="search"
                            className="header__search-input"
                            placeholder="Поиск пользователя"
                            value={searchValue}
                            onChange={changeHandler}
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
