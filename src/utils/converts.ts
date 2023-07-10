import { IUserResponse, getFullUser, IFullUserResponse, IRepositoryResponse, getRepositories } from './api';
import { IFullUser, IRepository, IUserCard } from '../types';

/**
 * Преобразуем сущность Repository с github API в нашу модель
 * @param {IRepositoryResponse} repository - сущность с github API
 * @return {IRepository} currentRepository - наша модель
 */
export const repositoryResponseConvert = (repository: IRepositoryResponse): IRepository => {
    return {
        id: repository.id,
        title: repository.name,
        description: repository.description,
        url: repository.html_url,
    };
};

/**
 * Преобразуем список сущностей Repository с github API в нашу модель
 * @param {IRepositoryResponse[]} repositories - список сущностей с github API
 * @return {IRepository[]} currentRepositories - список наших моделей
 */
export const repositoriesResponseConvert = (repositories: IRepositoryResponse[]): IRepository[] => {
    return repositories.map(repositoryResponseConvert);
};

/**
 * Преобразуем сущность User (конкретного пользователя) с github API в нашу модель
 * @param {IFullUserResponse} user - сущность с github API
 * @return {IFullUser} currentUser - наша модель
 */
export const fullUserResponseConvert = async (user: IFullUserResponse): Promise<IFullUser> => {
    const fullUserData: IFullUserResponse = await getFullUser(user.login);
    const repositoriesData: IRepositoryResponse[] = await getRepositories(user.repos_url);
    const repositories: IRepository[] = repositoriesResponseConvert(repositoriesData);
    return {
        id: user.id,
        image: user.avatar_url,
        username: user.login,
        followers: fullUserData.followers,
        following: fullUserData.following,
        name: fullUserData.name || '',
        siteUrl: fullUserData.blog || '',
        repositories: repositories,
    };
};

/**
 * Преобразуем сущность User (из общего списко пользователей) с github API в нашу модель
 * @param {IUserResponse} user - сущность с github API
 * @return {IUserCard} currentUser - наша модель
 */
export const userResponseToCardConvert = async (user: IUserResponse): Promise<IUserCard> => {
    const fullUserData: IFullUserResponse = await getFullUser(user.login);
    return {
        id: user.id,
        image: user.avatar_url,
        username: user.login,
        repositoriesCount: fullUserData.public_repos,
        organization: fullUserData.company || '',
    };
};

/**
 * Преобразуем список сущностей User (из общего списко пользователей) с github API в нашу модель
 * @param {IUserResponse[]} users - список сущностей с github API
 * @return {IUserCard[]} currentUsers - список наших моделей
 */
export const usersResponseToCardsConvert = async (users: IUserResponse[]): Promise<IUserCard[]> => {
    return Promise.all(users.map(userResponseToCardConvert));
};
