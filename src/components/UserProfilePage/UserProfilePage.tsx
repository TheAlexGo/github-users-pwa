import React, { FC, JSX } from 'react';
import { Await, Link, useLoaderData } from 'react-router-dom';

import { Loader } from '../Loader/Loader';
import { RepositoryCard } from '../RepositoryCard/RepositoryCard';
import { repositoryFollowers, repositoryFollowing } from '../../utils/words';
import { IFullUser } from '../../types';

import './UserProfilePage.css';

export const UserProfilePage: FC = () => {
    const data = useLoaderData() as { user: IFullUser };

    const renderComponent = (user: IFullUser) => {
        const { username, image, name, followers, following, siteUrl, repositories } = user;

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

        const renderUsername = () => {
            const result: JSX.Element[] = [];
            if (name) {
                result.push(
                    <React.Fragment key="name">
                        {name} {', '}
                    </React.Fragment>,
                );
            }
            result.push(
                <span key="username" className="user-profile__accent">
                    {username}
                </span>,
            );
            return result;
        };

        return (
            <>
                <section className="user-profile">
                    <div className="user-profile__image-container">
                        <img className="user-profile__image" src={image} alt={imageAlt} />
                    </div>
                    <div className="user-profile__content">
                        <h1 className="user-profile__title">{renderUsername()}</h1>
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
            </>
        );
    };

    return (
        <main>
            <div className="container">
                <React.Suspense fallback={<Loader />}>
                    <Await resolve={data.user} errorElement={<>Error fetch data</>}>
                        {renderComponent}
                    </Await>
                </React.Suspense>
            </div>
        </main>
    );
};
