import { MenuData, MenuChildResponseDto } from "@/stateManagement/models/menu/menuDto";

export const searchActionStatus = (menuData: MenuData[], codePathAction: string): boolean | null => {
       
    const [menuCode, childCode, action] = codePathAction?.split('.');

    const findAction = (children: MenuChildResponseDto[] | undefined): boolean | null => {
        if (!children) {
            return null;
        }

        for (const child of children) {
            if (child.code === childCode) {
                return child.actions[action] ?? null;
            }
        }

        return null;
    };

    for (const menu of menuData) {
        if (menu.code === menuCode) {
            return findAction(menu.children);
        }
    }

    return null;
};