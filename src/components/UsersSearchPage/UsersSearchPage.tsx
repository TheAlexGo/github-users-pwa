import React, { FC } from 'react';
import { Await, useLoaderData, useNavigation, useSearchParams } from 'react-router-dom';

import { UsersList } from '../UsersList/UsersList';
import { IUserCard } from '../../types';

export const UsersSearchPage: FC = () => {
    const [searchParams] = useSearchParams();
    const { state } = useNavigation();
    const data = useLoaderData() as { users: IUserCard[] };

    const isLoading = state === 'loading';

    const renderLoader = () => <h1 className="title">Ищем...</h1>;

    const renderComponent = (users: IUserCard[]) => {
        if (isLoading) {
            return renderLoader();
        }

        const renderHeading = () => {
            const username = searchParams.get('query');

            return (
                <h1 className="title">
                    {users.length ? `Пользователи по запросу ${username}` : `Ничего не найдено по запросу ${username}`}
                </h1>
            );
        };

        return (
            <>
                {renderHeading()}
                <UsersList users={users} />
            </>
        );
    };

    return (
        <main>
            <div className="container">
                <React.Suspense fallback={renderLoader()}>
                    <Await resolve={data.users} errorElement={<>Error fetch data</>}>
                        {renderComponent}
                    </Await>
                </React.Suspense>
            </div>
        </main>
    );
};
