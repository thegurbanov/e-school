
export interface Country {
    id: string;
    info: string;
}

export interface Region {
    id: string;
    info: string;
    country: Country
}
