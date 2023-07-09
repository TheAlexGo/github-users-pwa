import React, { FC, useState, useEffect } from 'react';
import { getUsers } from '../../utils/api';
import { usersResponseConvert } from '../../utils/converts';

import { IUserCard } from '../UserCard/UserCard';

import { UserCard } from '../UserCard/UserCard';

import './UsersList.css';

export const UsersList: FC = () => {
    const [users, setUsers] = useState<IUserCard[]>([]);

    useEffect(() => {
        getUsers().then(usersResponseConvert).then(setUsers);
    }, []);

    return (
        <div className="users-list">
            {users.map((user) => (
                <UserCard key={user.id} {...user} />
            ))}
        </div>
    );
};
