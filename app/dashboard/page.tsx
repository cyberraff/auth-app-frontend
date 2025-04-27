'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardCard } from '../components/DashboardCard';

export default function Dashboard() {
	const [user, setUser] = useState<any>(null);
	const router = useRouter();

	const url = 'https://auth-app-backend-xwg2.onrender.com/api/v1/users/me';
	const devUrl = 'http://localhost:3000/api/v1/users/me';

	const token = sessionStorage.getItem('token');

	console.log('Token in Dashboard:', token); // Debug log

	useEffect(() => {
		if (!token) {
			console.log('No token found, redirecting to login');
			router.push('/login'); // Redirect to login if no token is found
			return;
		}
		const getMe = async () => {
			const res = await fetch(devUrl, {
				headers: {
					Authorization: `Bearer ${token}`, // Attach token here
				},
			});

			const data = await res.json();

			console.log('Token in Dashboard 2:', token); // Debug log
			if (res.ok) {
				setUser(data.data.user);
				console.log('logged in');
			} else {
				// Try refresh token
				console.log('Error response:', data);
				alert('Login failed: ' + data.message);
			}
		};

		getMe();
	}, [router, token]);

	return (
		<div className='p-4 text-center text-2xl'>
			{/* {user ? `Welcome, ${user.firstName}` : 'Loading...'} */}
			<DashboardCard user={user} />
		</div>
	);
}
