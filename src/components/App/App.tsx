import React, { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { UserProfilePage } from '../UserProfilePage/UserProfilePage';
import { UsersPage } from '../UsersPage/UsersPage';
import { UsersSearchPage } from '../UsersSearchPage/UsersSearchPage';

export const App: FC = () => {
    return (
        <>
            <Routes>
                <Route path="/">
                    <Route index element={<UsersPage />} />
                    <Route path="users">
                        <Route index element={<UsersPage />} />
                        <Route path=":id" element={<UserProfilePage />} />
                    </Route>
                    <Route path="search" element={<UsersSearchPage />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Route>
            </Routes>
        </>
    );
};
