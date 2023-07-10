/**
 * Склоняем слово, в зависимости от количества его объектов
 * @param count - количество объектов
 * @param words - массив слов, из которых будем выбирать подходящий вариант
 * @param withRoundThousands - округляем тысячи
 */
export const pluralize = (count: number, words: string[], withRoundThousands = false): [number, string] => {
    const unit =
        (11 <= count % 100 && count % 100 <= 14) || (withRoundThousands && count >= 1000)
            ? count
            : Math.abs(count) % 10;
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
    return [count, result];
};

export const repositoryPluralize = (count: number): [number, string] =>
    pluralize(count, ['репозиторий', 'репозитория', 'репозиториев']);

export const followersPluralize = (count: number): [number, string] =>
    pluralize(count, ['подписчик', 'подписчика', 'подписчиков'], true);

export const followingPluralize = (count: number): [number, string] =>
    pluralize(count, ['подписка', 'подписки', 'подписок'], true);

export const roundThousands = (count: number): string => {
    if (count < 1000) {
        return count.toString();
    }
    return (count / 1000).toFixed(1) + 'k';
};
