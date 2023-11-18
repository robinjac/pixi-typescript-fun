type Tuple<a> = [a, a];

/** A point is a normalized coordinate beteen 0 - 1 */
type Point = {x: number, y: number};

const takeFirst = <T>([first]: Tuple<T>): T => first;
const takeSecond = <T>([, second]: Tuple<T>): T => second;
const toPoint = ([first, second]: Tuple<number>): Point => ({x: first, y: second});


export { Tuple, Point, takeFirst, takeSecond, toPoint };
