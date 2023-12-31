export interface NavigatorItem {
    label?: string;
    icon?: string;
    command?: (event?: any) => void;
    items?: NavigatorItem[];
}
