import React, { FC, JSX } from 'react';
import { Link } from 'react-router-dom';

import { IRepository } from '../../types';

export const RepositoryCard: FC<IRepository> = ({ title, description, url }): JSX.Element => {
    const renderDescription = (): JSX.Element | null => {
        if (description) {
            return <p className="repository-list__item-text">{description}</p>;
        }
        return null;
    };

    return (
        <section className="repository-list__item">
            <h3 className="repository-list__item-title">
                <Link to={url} className="link" target="_blank">
                    {title}
                </Link>
            </h3>
            {renderDescription()}
        </section>
    );
};
