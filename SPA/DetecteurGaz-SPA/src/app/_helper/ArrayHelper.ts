interface VIterable extends Iterable<{}> {
    length: number;
}

export class VArray<T> extends Array<T> {
    static range(from: number, to: number, step: number): number[] {
        return Array.from(
            ({ length: Math.floor((to - from) / step) + 1 } as VIterable),
            (v, k) => from + k * step
        );
    }
}
