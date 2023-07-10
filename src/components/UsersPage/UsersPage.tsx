import React, { FC } from 'react';
import { Await, useLoaderData } from 'react-router-dom';

import { UsersList } from '../UsersList/UsersList';
import { Loader } from '../Loader/Loader';
import { IUserCard } from '../../types';

export const UsersPage: FC = () => {
    const data = useLoaderData() as { users: IUserCard[] };

    const renderComponent = (users: IUserCard[]) => {
        return <UsersList users={users} />;
    };

    return (
        <>
            <main>
                <div className="container">
                    <React.Suspense fallback={<Loader />}>
                        <Await resolve={data.users} errorElement={<>Error fetch data</>}>
                            {renderComponent}
                        </Await>
                    </React.Suspense>
                </div>
            </main>
        </>
    );
};
