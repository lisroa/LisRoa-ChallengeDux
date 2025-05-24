import React from 'react';

export const Sidebar = () => {
	return (
		<div className='h-full align-items-center justify-content-start flex flex-column bg-gray-900 px-4 gap-4 py-4'>
			{Array.from({ length: 6 }).map((_, i) => (
				<i key={i} className='pi pi-cog text-2xl text-white'></i>
			))}
		</div>
	);
};
