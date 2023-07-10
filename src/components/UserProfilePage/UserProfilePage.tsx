import React, { FC, JSX, useMemo } from 'react';
import { Await, Link, useLoaderData } from 'react-router-dom';

import { Loader } from '../Loader/Loader';
import { RepositoryCard } from '../RepositoryCard/RepositoryCard';
import { followersPluralize, followingPluralize, roundThousands } from '../../utils/words';
import { IFullUser } from '../../types';

import './UserProfilePage.css';

export const UserProfilePage: FC = () => {
    const data = useLoaderData() as { user: IFullUser };

    const renderComponent = (user: IFullUser) => {
        const { username, image, name, followers, following, siteUrl, repositories } = user;

        const imageAlt = `${username} profile photo`;

        const repositoriesUrl = `https://github.com/${username}?tab=repositories`;

        const currentSiteUrl: string | null = useMemo(() => {
            if (!siteUrl) {
                return null;
            }
            try {
                const { href } = new URL(siteUrl);
                return href;
            } catch (e) {
                return `https://${siteUrl}`;
            }
        }, [siteUrl]);

        const renderFollowers = () => {
            const [count, word] = followersPluralize(followers);
            return (
                <>
                    <span className="user-profile__accent">{roundThousands(count)}</span> {word} ·{' '}
                </>
            );
        };

        const renderFollowing = () => {
            const [count, word] = followingPluralize(following);
            return (
                <>
                    <span className="user-profile__accent">{roundThousands(count)}</span> {word} ·{' '}
                </>
            );
        };

        const renderSiteUrl = (): JSX.Element | null => {
            if (currentSiteUrl) {
                return (
                    <Link to={currentSiteUrl} className="link" target="_blank">
                        {currentSiteUrl}
                    </Link>
                );
            }
            return null;
        };

        const renderUsername = () => {
            const result: JSX.Element[] = [];
            if (name) {
                result.push(<React.Fragment key="name">{name}, </React.Fragment>);
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
                            {renderSiteUrl()}
                        </p>
                    </div>
                </section>

                <section className="repository-list">
                    <div className="repository-list__header">
                        <h2 className="repository-list__title">Репозитории</h2>
                        <Link to={repositoriesUrl} className="link link-all" target="_blank" rel="noreferrer">
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
