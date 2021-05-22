export class Order {
    public size: string;
    public color: string;
    public title: string;
    public src: string;

    public constructor(
        newSize: string,
        newColor: string,
        newTitle: string,
        newSrc: string
    ) {
        this.size = newSize;
        this.color = newColor;
        this.title = newTitle;
        this.src = newSrc;
    }
}
