type Tuple<a> = [a, a];

const takeFirst = <T>([first]: Tuple<T>): T => first;
const takeSecond = <T>([, second]: Tuple<T>): T => second;

export { Tuple, takeFirst, takeSecond };
