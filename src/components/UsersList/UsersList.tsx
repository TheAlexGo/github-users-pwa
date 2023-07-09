import React, { FC, useState, useEffect } from 'react';
import { getUsers } from '../../utils/api';
import { usersResponseToCardsConvert } from '../../utils/converts';
import { UserCard } from '../UserCard/UserCard';
import { IUserCard } from '../../types';

import './UsersList.css';

export const UsersList: FC = () => {
    const [users, setUsers] = useState<IUserCard[]>([]);

    useEffect(() => {
        getUsers().then(usersResponseToCardsConvert).then(setUsers);
    }, []);

    return (
        <div className="users-list">
            {users.map((user) => (
                <UserCard key={user.id} {...user} />
            ))}
        </div>
    );
};
