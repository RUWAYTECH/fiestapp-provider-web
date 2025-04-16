export interface ActionStatus {
    [key: string]: boolean;
}

export interface MenuChildResponseDto {
    code: string;
    name: string;
    icon: string;
    url: string;
    actions: ActionStatus;
}

export interface MenuData {
    code: string;
    name: string;
    icon: string;
    url: string;
    children: MenuChildResponseDto[]
}