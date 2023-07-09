import React, { FC } from 'react';
import {
    Route,
    Navigate,
    Params,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';

import { Layout } from '../Layout/Layout';
import { UserProfilePage } from '../UserProfilePage/UserProfilePage';
import { UsersPage } from '../UsersPage/UsersPage';
import { UsersSearchPage } from '../UsersSearchPage/UsersSearchPage';
import { getFullUser, getUsers, IFullUserResponse, IUserResponse } from '../../utils/api';
import { fullUserResponseConvert, usersResponseToCardsConvert } from '../../utils/converts';

const loadingUsersPage = async () => {
    const usersResponse: IUserResponse[] = await getUsers();
    return await usersResponseToCardsConvert(usersResponse);
};

const loadingUserProfilePage = async ({ params }: { params: Params<'username'> }) => {
    const fullUserResponse: IFullUserResponse = await getFullUser(params.username!);
    return await fullUserResponseConvert(fullUserResponse);
};

export const App: FC = () => {
    return (
        <RouterProvider
            router={createBrowserRouter(
                createRoutesFromElements(
                    <Route element={<Layout />}>
                        <Route path="/">
                            <Route index loader={loadingUsersPage} element={<UsersPage />} />
                            <Route path="users">
                                <Route index loader={loadingUsersPage} element={<UsersPage />} />
                                <Route path=":username" loader={loadingUserProfilePage} element={<UserProfilePage />} />
                            </Route>
                            <Route path="search" element={<UsersSearchPage />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </Route>
                    </Route>,
                ),
            )}
        />
    );
};
