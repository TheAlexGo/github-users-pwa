import React, { FC } from 'react';
import { Await, useLoaderData } from 'react-router-dom';

import { UserCard } from '../UserCard/UserCard';
import { Loader } from '../Loader/Loader';
import { IUserCard } from '../../types';

import './UsersList.css';

export const UsersList: FC = () => {
    const data = useLoaderData() as { users: IUserCard[] };

    const renderComponent = (users: IUserCard[]) => {
        return (
            <div className="users-list">
                {users.map((user) => (
                    <UserCard key={user.id} {...user} />
                ))}
            </div>
        );
    };

    return (
        <React.Suspense fallback={<Loader />}>
            <Await resolve={data.users} errorElement={<>Error fetch data</>}>
                {renderComponent}
            </Await>
        </React.Suspense>
    );
};
