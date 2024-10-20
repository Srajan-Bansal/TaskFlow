export const ProfilePic = ({ initials }: { initials: string }) => {
	const getRandomColor = () => {
		const letters = '0123456789ABCDEF';
		let color = '#';
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	};

	const randomColor = getRandomColor();

	const styles = {
		width: '50px',
		height: '50px',
		borderRadius: '50%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: randomColor,
		color: '#FFFFFF',
		fontWeight: 'bold',
		fontSize: '20px',
		fontFamily: 'Arial, sans-serif',
	};

	return <div style={styles}>{initials}</div>;
};
