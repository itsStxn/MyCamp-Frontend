"use client";

import { IFacilityCard } from '@/interfaces/IFacilityCard';
import { useAuth } from '@/contexts/AuthContext';
import axiosUtil from '@/utils/axiosUtil';
import React, { useEffect } from 'react';
import lazy from 'next/dynamic';

const FacilityCard = lazy(() => import('@/components/FacilityCard'), { ssr: false });

const Facilities: React.FC<IFacilityCard> = () => {

	const { token, logout } = useAuth();
	const [cards, setCards] = React.useState<IFacilityCard[]>([]);

	const FetchedCards = async () => {
		try {
			const response = await axiosUtil.get('/Facilities', {
				headers: {
					Authorization: `Bearer ${token}`
			}});
			setCards(response.data);
		} catch (e: any) {
			console.log(e);
		}
	}

	useEffect(() => {
		FetchedCards();
	}, [])

	return (
		<div>
			{cards.map((card, index) => (
				<FacilityCard key={index} {...card} />
			))}
		</div>
	)
}

export default Facilities