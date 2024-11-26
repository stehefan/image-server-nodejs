export type Dimension = {
    name: string;
    width: number;
    height: number;
}

export type AccessibleDimension = Dimension & {
    href: string;
}

export type Image = {
    id: number;
    dimensions?: AccessibleDimension[];
}

export type ServerSideError = {
    status: number;
    type?: ErrorType;
    msg?: string;
}