import { IBaseComponent } from "./IBaseComponent";
import { ResFacility } from "@/interfaces/api/IFacility";

export interface IFacilityCard extends IBaseComponent {
	title: string;
	description: string;
	src: string;
	info: ResFacility;
}