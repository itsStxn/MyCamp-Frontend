"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axiosUtil from '@/utils/axiosUtil';
import './ActivateAccount.scss';


const ActivateAccount = () => {
	const router = useRouter();
	const queryParams = useSearchParams();
	const [isLoading, setIsLoading] = useState(true);
	const [isActivated, setIsActivated] = useState(false);
	
	const Success = () => {
		return <h1 className='ActivateAccount'>Your account has been <strong className="strong">activated!</strong></h1>;
	}
	const Fail = () => {
		return isLoading 
		? <p className='text-white'>Checking...</p>
		: <h1 className='ActivateAccount'>Invalid or expired token</h1>;
	}
	const goBackHome = () => {
		setTimeout(() => router.push('/'), 5000);
	}
	const checkAccount = async () => {
		setIsLoading(false);
		const token = queryParams.get('token');
		if (!token) {
			setIsActivated(false);
			setIsLoading(true);
			goBackHome();
			return;
		}
		try {
			await axiosUtil.put('/AuthUsers/activateAccount', null, {
				headers: {
					"Accept": "text/plain",
					'Authorization': `Bearer ${token}`
				}
			});
			setIsActivated(true);
		} catch (e: any) {
			console.log(e);
			setIsActivated(false);
		} finally {
			setIsLoading(false);
			goBackHome();
		}
	}

	useEffect(() => {
		const timer = setTimeout(() => checkAccount(), 5000);
		return () => clearTimeout(timer);
	}, [])

	return (
		<>{ isActivated ? <Success /> : <Fail /> }</>
	)
}

export default ActivateAccount;