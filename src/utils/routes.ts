enum Paths {
    USERS = 'users',
}

export const getUserLink = (id: number): string => `${Paths.USERS}/${id}`;
