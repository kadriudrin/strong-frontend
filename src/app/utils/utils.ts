export function lerp(
    start_value: number,
    end_value: number,
    pct: number
): number {
    return start_value + (end_value - start_value) * pct;
}

export function flip(x: number): number {
    return 1 - x;
}
export function easeIn(t: number): number {
    return t * t;
}

export function easeOut(t: number): number {
    return flip(Math.pow(flip(t), 2));
}

export function easeInOut(t: number): number {
    return lerp(easeIn(t), easeOut(t), t);
}
