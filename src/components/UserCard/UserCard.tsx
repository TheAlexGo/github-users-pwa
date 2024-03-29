import React, { FC, JSX } from 'react';
import { Link } from 'react-router-dom';

import { getUserLink } from '../../utils/routes';
import { repositoryPluralize } from '../../utils/words';
import { IUserCard } from '../../types';

export const UserCard: FC<IUserCard> = ({ image, username, repositoriesCount = 0, organization }): JSX.Element => {
    const renderOrganization = (): JSX.Element | null => {
        if (organization) {
            return <p className="users-list__text">{organization}</p>;
        }
        return null;
    };

    const imageAlt = `${username} profile photo`;

    return (
        <section className="users-list__item">
            <div className="users-list__image-container">
                <img className="users-list__image" src={image} alt={imageAlt} />
            </div>
            <div className="users-list__content">
                <h2 className="users-list__title">
                    <Link to={getUserLink(username)} className="link">
                        {username}
                    </Link>
                    , {repositoryPluralize(repositoriesCount).join(' ')}
                </h2>
                {renderOrganization()}
            </div>
        </section>
    );
};
