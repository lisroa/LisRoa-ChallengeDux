import Image from 'next/image';
import React from 'react';

export const Navbar = () => {
	return (
		<div className='align-items-center justify-content-between flex h-16 w-full flex-row bg-blue-500 px-3 py-1'>
			<Image src={'/brand/isologo.png'} width={43} height={43} alt='Dux Challenge Logo' />

			<i className='pi pi-cog text-2xl text-white'></i>
		</div>
	);
};
