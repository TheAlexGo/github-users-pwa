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
import { getFullUser, IFullUserResponse } from '../../utils/api';
import { fullUserResponseConvert } from '../../utils/converts';

const loadingUserPage = async ({ params }: { params: Params<'username'> }) => {
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
                            <Route index element={<UsersPage />} />
                            <Route path="users">
                                <Route index element={<UsersPage />} />
                                <Route path=":username" loader={loadingUserPage} element={<UserProfilePage />} />
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
