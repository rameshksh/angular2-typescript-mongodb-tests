export class Menu {
    sortKey: string;
    description: string;
    order: string;

    constructor(sortKey: string, description: string, order: string) {
        this.sortKey = sortKey;
        this.description = description;
        this.order = order;
    }
} 