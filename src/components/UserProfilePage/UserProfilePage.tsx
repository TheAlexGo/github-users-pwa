import React, { FC } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

import { repositoryFollowers, repositoryFollowing } from '../../utils/words';
import { RepositoryCard } from '../RepositoryCard/RepositoryCard';
import { IFullUser } from '../../types';

import './UserProfilePage.css';

export const UserProfilePage: FC = () => {
    const { username, image, name, followers, following, siteUrl, repositories } = useLoaderData() as IFullUser;

    const imageAlt = `${username} profile photo`;

    const repositoriesUrl = `https://github.com/${username}?tab=repositories`;

    const renderFollowers = () => {
        const [count, word] = repositoryFollowers(followers);
        return (
            <>
                <span className="user-profile__accent">{count}</span> {word} ·{' '}
            </>
        );
    };

    const renderFollowing = () => {
        const [count, word] = repositoryFollowing(following);
        return (
            <>
                <span className="user-profile__accent">{count}</span> {word} ·{' '}
            </>
        );
    };

    return (
        <main>
            <div className="container">
                <section className="user-profile">
                    <div className="user-profile__image-container">
                        <img className="user-profile__image" src={image} alt={imageAlt} />
                    </div>
                    <div className="user-profile__content">
                        <h1 className="user-profile__title">
                            {name}, <span className="user-profile__accent">{username}</span>
                        </h1>
                        <p className="user-profile__text">
                            {renderFollowers()}
                            {renderFollowing()}
                            <Link to={siteUrl} className="link" target="_blank">
                                {siteUrl}
                            </Link>
                        </p>
                    </div>
                </section>

                <section className="repository-list">
                    <div className="repository-list__header">
                        <h2 className="repository-list__title">Репозитории</h2>
                        <Link to={repositoriesUrl} className="link" target="_blank" rel="noreferrer">
                            Все репозитории
                        </Link>
                    </div>

                    <div className="repository-list__container">
                        {repositories.map((repository) => (
                            <RepositoryCard key={repository.id} {...repository} />
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
};
