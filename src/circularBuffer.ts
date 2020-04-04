interface ForeachCallback<T> {
    (element: T, index: number, count: number): void;
}

export class CircularBuffer<T> {
    private elements: T[] = [];
    private insertionIndex = 0;

    constructor(private elementCount: number) {}

    add(newElement: T) {
        this.elements[this.insertionIndex] = newElement;
        this.insertionIndex++;
        this.insertionIndex %= this.elementCount;
    }

    foreach(callback: ForeachCallback<T>) {
        if (this.elements.length === this.elementCount) {
            let last = this.getIndexBeforeInsertion();
            for (let i = this.insertionIndex, j = 0; ; i++, j++) {
                i %= this.elementCount;

                callback(this.elements[i], j, this.elementCount);

                if (i === last) {
                    break;
                }
            }
        } else {
            for (let i = 0; i < this.insertionIndex; i++) {
                callback(this.elements[i], i, this.elements.length);
            }
        }
    }

    getIndexBeforeInsertion() {
        let index: number;
        if (this.insertionIndex === 0) {
            index = this.elementCount - 1;
        } else {
            index = this.insertionIndex - 1;
        }

        return index;
    }
}
