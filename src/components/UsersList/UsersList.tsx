import React, { FC } from 'react';

import { UserCard } from '../UserCard/UserCard';
import { IUserCard } from '../../types';

import './UsersList.css';
import { useLoaderData } from 'react-router-dom';

export const UsersList: FC = () => {
    const users = useLoaderData() as IUserCard[];

    return (
        <div className="users-list">
            {users.map((user) => (
                <UserCard key={user.id} {...user} />
            ))}
        </div>
    );
};
