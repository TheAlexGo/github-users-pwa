/**
 * 1: репозиторий
 * 2-4: репозитория
 * n: репозиториев
 *
 * 1: подписчик
 * 2-4: подписчика
 * n: подписчиков
 * @param count - количество элементов
 * @param words - массив слов, из которых будем выбирать подходящий вариант
 */
export const pluralize = (count: number, words: string[]): string => {
    const unit = Math.abs(count) % 10;
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
    return `${count} ${result}`;
};

export const repositoryPluralize = (count: number): string =>
    pluralize(count, ['репозиторий', 'репозитория', 'репозиториев']);
