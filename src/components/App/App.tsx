import React, { FC } from 'react';
import {
    Route,
    Navigate,
    Params,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
    defer,
} from 'react-router-dom';

import { Layout } from '../Layout/Layout';
import { UserProfilePage } from '../UserProfilePage/UserProfilePage';
import { UsersPage } from '../UsersPage/UsersPage';
import { UsersSearchPage } from '../UsersSearchPage/UsersSearchPage';
import { getFullUser, getUsers, IFullUserResponse, IUserResponse, searchUsers } from '../../utils/api';
import { fullUserResponseConvert, usersResponseToCardsConvert } from '../../utils/converts';
import { Paths } from '../../types';

const loadingUsers = async () => {
    const usersResponsePromise: Promise<IUserResponse[]> = getUsers();
    return defer({
        users: usersResponsePromise.then(usersResponseToCardsConvert),
    });
};

const loadingUserProfilePage = async ({ params }: { params: Params<'username'> }) => {
    const fullUserResponsePromise: Promise<IFullUserResponse> = getFullUser(params.username!);
    return defer({
        user: fullUserResponsePromise.then(fullUserResponseConvert),
    });
};

const loadingSearchUsers = async ({ request }: { request: Request }) => {
    const url = new URL(request.url);
    const username = url.searchParams.get('query');
    let usersResponsePromise: Promise<IUserResponse[]>;
    if (username) {
        usersResponsePromise = searchUsers(username!);
    } else {
        usersResponsePromise = getUsers();
    }
    return defer({
        users: usersResponsePromise.then(usersResponseToCardsConvert),
    });
};

export const App: FC = () => {
    return (
        <RouterProvider
            router={createBrowserRouter(
                createRoutesFromElements(
                    <Route element={<Layout />}>
                        <Route path="/">
                            <Route index loader={loadingUsers} element={<UsersPage />} />
                            <Route path={Paths.USERS}>
                                <Route index loader={loadingUsers} element={<UsersPage />} />
                                <Route path=":username" loader={loadingUserProfilePage} element={<UserProfilePage />} />
                            </Route>
                            <Route path={Paths.SEARCH} loader={loadingSearchUsers} element={<UsersSearchPage />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </Route>
                    </Route>,
                ),
            )}
        />
    );
};
