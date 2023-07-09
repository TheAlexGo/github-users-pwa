import { Octokit } from 'octokit';

const REPOSITORIES_PER_PAGE = 100;
const USERS_PER_PAGE = 2;

export interface IRepositoriesResponse {
    id: number;
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

export const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});

const getRepositoriesByPage = async (link: string, page: number): Promise<IRepositoriesResponse[]> => {
    return (
        await octokit.request(`GET ${link}`, {
            per_page: REPOSITORIES_PER_PAGE,
            page,
        })
    ).data;
};

export const getRepositories = async (link: string): Promise<IRepositoriesResponse[]> => {
    const result: IRepositoriesResponse[] = [];
    let pageCounter = 1;
    let isStopLoop = false;
    while (!isStopLoop) {
        const repositories: IRepositoriesResponse[] = await getRepositoriesByPage(link, pageCounter);
        result.push(...repositories);
        if (repositories.length < REPOSITORIES_PER_PAGE) {
            isStopLoop = true;
        }
        pageCounter++;
    }
    return result;
};

export const getOrganizations = async (link: string): Promise<IOrganizationResponse[]> => {
    return (await octokit.request(`GET ${link}`)).data;
};

export const getFirstOrganization = async (link: string): Promise<IOrganizationResponse | null> => {
    const organizations: IOrganizationResponse[] = await getOrganizations(link);
    if (organizations.length > 0) {
        return organizations[0];
    }
    return null;
};

export const getUsers = async (): Promise<IUserResponse[]> => {
    return (
        await octokit.request('GET /users', {
            per_page: USERS_PER_PAGE,
        })
    ).data;
};
