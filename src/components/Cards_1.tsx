"use client";

import { IBaseComponent } from '@/interfaces/IBaseComponent';
import { Deer, Hiking, Fish, Sun } from '@/assets/svg';
import React, { memo } from 'react';
import lazy from 'next/dynamic';


const Card_1 = lazy(() => import('./Card_1'), {ssr: false});

const Cards_1: React.FC<IBaseComponent> = ({ className }) => {
	return (
		<div className={`Cards_1 ${className ?? ''}`}>
			<Card_1 title="Camping & Day use" Icon={ Sun }>
				Return to your favourite spot or discover a new one suited for you.
			</Card_1>
			<Card_1 title="Wildlife watching" Icon={ Deer }>
				Experience the thrill of watching local wildlife in their natural habitat
			</Card_1>
			<Card_1 title="Recreation activities" Icon={ Fish }>
				Find the best spots for hunting, fishing & recreational shooting
			</Card_1>
			<Card_1 title="Hiking adventures" Icon={ Hiking }>
				Explore scenic trails and discover breath-taking views
			</Card_1>
		</div>
	);
}

const MemoCards_1 = memo(Cards_1);
MemoCards_1.displayName = "Cards_1";

export default MemoCards_1;