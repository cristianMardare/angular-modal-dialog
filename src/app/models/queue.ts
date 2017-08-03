export class Queue {
    private _queue: any[] = [];

    enqueue(item: any) {
        this._queue.push(item);
    }

    dequeue(): any {
        if (this.getLength() === 0)
            return undefined;

        let item = this._queue[0];
        // remove the item from the queue by slicing the queue after the head element
        this._queue = this._queue.slice(1);

        return item;
    }

    peek(): any {
        if (this.getLength() === 0)
            return undefined;

        return this._queue[0];
    }

    peekLast(): any {
        const length = this.getLength();
         if (length === 0)
            return undefined;

        return this._queue[length - 1];
    }

    getLength(): number {
        return this._queue.length;
    }
}