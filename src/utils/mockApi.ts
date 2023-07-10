/* eslint-disable @typescript-eslint/no-unused-vars */

import { IFullUserResponse, IOrganizationResponse, IRepositoryResponse, IUserResponse } from './api';

const REQUEST_DELAY = 5000;

/**
 * Получаем список репозиториев по ссылке (ссылку получаем, например, от пользователя)
 * @param {string} link
 * @return {Promise<IRepositoryResponse[]>} список репозиториев
 */
export const getRepositoriesMock = async (link: string): Promise<IRepositoryResponse[]> => {
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve([]);
        }, REQUEST_DELAY);
    });
};

/**
 * Получаем список организаций по ссылке (ссылку получаем, например, от пользователя)
 * @param {string} link
 * @return {Promise<IOrganizationResponse[]>} список организаций
 */
export const getOrganizationsMock = async (link: string): Promise<IOrganizationResponse[]> => {
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve([]);
        }, REQUEST_DELAY);
    });
};

/**
 * Получаем первую организацию по ссылке (ссылку получаем, например, от пользователя)
 * @param {string} link
 * @return {Promise<IOrganizationResponse | null>} объект организации или null
 */
export const getFirstOrganizationMock = async (link: string): Promise<IOrganizationResponse | null> => {
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                login: 'Тестовая организция',
            });
        }, REQUEST_DELAY);
    });
};

/**
 * Получаем список пользователей
 * @return {Promise<IUserResponse[]>} список пользователей
 */
export const getUsersMock = async (): Promise<IUserResponse[]> => {
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    login: 'TheAlexGo',
                    avatar_url: '/',
                    organizations_url: '/',
                    repos_url: '/',
                },
                {
                    id: 2,
                    login: 'TheAlexGo2',
                    avatar_url: '/',
                    organizations_url: '/',
                    repos_url: '/',
                },
                {
                    id: 3,
                    login: 'TheAlexGo3',
                    avatar_url: '/',
                    organizations_url: '/',
                    repos_url: '/',
                },
            ]);
        }, REQUEST_DELAY);
    });
};

/**
 * Получаем полные данные пользователя
 * @param {string} username - имя пользователя
 * @return {Promise<IFullUserResponse>} данные пользователя
 */
export const getFullUserMock = async (username: string): Promise<IFullUserResponse> => {
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: 1,
                login: 'TheAlexGo',
                avatar_url: '/',
                organizations_url: '/',
                repos_url: '/',
                public_repos: 123,
                followers: 942,
                following: 13,
                name: 'Александр Гордеев',
                blog: 'https://portfolio.thealexgo.ru/',
                company: 'VK',
            });
        }, REQUEST_DELAY);
    });
};

export const searchUsersMock = async (username: string): Promise<IUserResponse[]> => {
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    login: 'TheAlexGo',
                    avatar_url: '/',
                    organizations_url: '/',
                    repos_url: '/',
                },
                {
                    id: 2,
                    login: 'TheAlexGo2',
                    avatar_url: '/',
                    organizations_url: '/',
                    repos_url: '/',
                },
                {
                    id: 3,
                    login: 'TheAlexGo3',
                    avatar_url: '/',
                    organizations_url: '/',
                    repos_url: '/',
                },
            ]);
        }, REQUEST_DELAY);
    });
};
