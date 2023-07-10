/**
 * Склоняем слово, в зависимости от количества его объектов
 * @param count - количество объектов
 * @param words - массив слов, из которых будем выбирать подходящий вариант
 */
export const pluralize = (count: number, words: string[]): [string, string] => {
    const unit = 11 <= count % 100 && count % 100 <= 14 ? count : Math.abs(count) % 10;
    let result;
    switch (unit) {
        case 1:
            result = words[0];
            break;
        case 2:
        case 3:
        case 4:
            result = words[1];
            break;
        default:
            result = words[2];
    }
    return [count.toString(), result];
};

export const repositoryPluralize = (count: number): [string, string] =>
    pluralize(count, ['репозиторий', 'репозитория', 'репозиториев']);

export const repositoryFollowers = (count: number): [string, string] =>
    pluralize(count, ['подписчик', 'подписчика', 'подписчиков']);

export const repositoryFollowing = (count: number): [string, string] =>
    pluralize(count, ['подписка', 'подписки', 'подписок']);
