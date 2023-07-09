import { IUserCard } from '../components/UserCard/UserCard';
import { IUserResponse, IRepositoriesResponse, getRepositories, getFirstOrganization } from './api';

export const usersResponseConvert = async (users: IUserResponse[]): Promise<IUserCard[]> => {
    return Promise.all(
        users.map(async (user): Promise<IUserCard> => {
            const repositoriesData: IRepositoriesResponse[] = await getRepositories(user.repos_url);
            const organization = await getFirstOrganization(user.organizations_url);
            return {
                id: user.id,
                image: user.avatar_url,
                username: user.login,
                repositoriesCount: repositoriesData.length,
                organization: organization?.login || '',
            };
        }),
    );
};
