import React, { FC } from 'react';

import { UserCard } from '../UserCard/UserCard';
import { IUserCard } from '../../types';

import './UsersList.css';

interface IUsersList {
    users: IUserCard[];
}

export const UsersList: FC<IUsersList> = ({ users }) => {
    return (
        <div className="users-list">
            {users.map((user) => (
                <UserCard key={user.id} {...user} />
            ))}
        </div>
    );
};
