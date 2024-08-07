import React, { FunctionComponent, SVGProps } from "react"
import { IBaseComponent } from "./IBaseComponent"

export interface ICard_1 extends IBaseComponent {
	title: string
	Icon: FunctionComponent<SVGProps<SVGSVGElement>>
}