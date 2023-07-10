export enum Paths {
    USERS = 'users',
    SEARCH = 'search',
}

export interface IRepository {
    id: number;
    title: string;
    url: string;
    description: string | null;
}

export interface IUserCard {
    id: number;
    image: string;
    username: string;
    repositoriesCount?: number;
    organization?: string;
}

export interface IFullUser extends IUserCard {
    name: string;
    followers: number;
    following: number;
    siteUrl: string;
    repositories: IRepository[];
}
