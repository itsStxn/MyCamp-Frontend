export interface IBaseComponent {
	className?: string;
	style?: string;
	children?: React.ReactNode;
	type?: "button" | "submit" | "reset" | undefined;
}