import { IBaseComponent } from "./IBaseComponent";

export interface IButton extends IBaseComponent {
	variant: "filled" | "outline" | "rounded";
	onClick?: () => void;
}
