import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

interface DashboardCardProps {
	user: any; // Replace 'any' with the appropriate type for the user object
}

// return <div>Welcome, {user ? user.firstName : 'Guest'}</div>;

export function DashboardCard({ user }: DashboardCardProps) {
	const router = useRouter();

	const handleLogout = () => {
		sessionStorage.removeItem('token'); // Remove the token from sessionStorage
		router.push('/'); // Redirect to login page
	};
	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle className='py-8'>
						{user ? `Welcome, ${user.firstName}` : 'Loading...'}
					</CardTitle>
				</CardHeader>
			</Card>
			<Button className='mt-4' onClick={handleLogout}>
				Log Out
			</Button>
		</>
	);
}
