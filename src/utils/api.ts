import { Octokit } from 'octokit';

const USERS_PER_PAGE = 30;
const REPOSITORIES_PER_PAGE = 30;

export interface IRepositoryResponse {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
}

export interface IOrganizationResponse {
    login: string;
}

export interface IUserResponse {
    id: number;
    login: string;
    avatar_url: string;
    organizations_url: string;
    repos_url: string;
}

export interface IFullUserResponse extends IUserResponse {
    public_repos: number;
    followers: number;
    following: number;
    name: string | null;
    blog: string | null;
}

export const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});

/**
 * Получаем список репозиториев по ссылке (ссылку получаем, например, от пользователя)
 * @param {string} link
 * @return {Promise<IRepositoryResponse[]>} список репозиториев
 */
export const getRepositories = async (link: string): Promise<IRepositoryResponse[]> => {
    return (
        await octokit.request(`GET ${link}`, {
            per_page: REPOSITORIES_PER_PAGE,
        })
    ).data;
};

/**
 * Получаем список организаций по ссылке (ссылку получаем, например, от пользователя)
 * @param {string} link
 * @return {Promise<IOrganizationResponse[]>} список организаций
 */
export const getOrganizations = async (link: string): Promise<IOrganizationResponse[]> => {
    return (await octokit.request(`GET ${link}`)).data;
};

/**
 * Получаем первую организацию по ссылке (ссылку получаем, например, от пользователя)
 * @param {string} link
 * @return {Promise<IOrganizationResponse | null>} объект организации или null
 */
export const getFirstOrganization = async (link: string): Promise<IOrganizationResponse | null> => {
    const organizations: IOrganizationResponse[] = await getOrganizations(link);
    if (organizations.length > 0) {
        return organizations[0];
    }
    return null;
};

/**
 * Получаем список пользователей
 * @return {Promise<IUserResponse[]>} список пользователей
 */
export const getUsers = async (): Promise<IUserResponse[]> => {
    return (
        await octokit.request('GET /users', {
            per_page: USERS_PER_PAGE,
        })
    ).data;
};

/**
 * Получаем полные данные пользователя
 * @param {string} username - имя пользователя
 * @return {Promise<IFullUserResponse>} данные пользователя
 */
export const getFullUser = async (username: string): Promise<IFullUserResponse> => {
    return (
        await octokit.request('GET /users/{username}', {
            username,
        })
    ).data;
};
