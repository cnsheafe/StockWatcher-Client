export interface Company {
    symbol: string;
    name: string;
}
export interface Graph {
    index: number;
    graphId: string;
    company: Company;
    dataset: Array<number>;
    labels: Array<string>;
    timeInterval?: string;
}
export interface DataPoints {
    prices: Array<number>;
    times: Array<string>;
}
