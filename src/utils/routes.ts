import { Paths } from '../types';

export const getUserLink = (username: string): string => `${Paths.USERS}/${username}`;
