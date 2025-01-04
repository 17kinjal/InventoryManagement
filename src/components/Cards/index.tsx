import React from 'react';
import { Card, CardContent, Typography, Stack } from '@mui/material';
import { ReactElement } from 'react';

interface CardComponentProps {
	title: string;
	value: string | number;
	icon: ReactElement;
}

const CardComponent: React.FC<CardComponentProps> = ({ title, value, icon }) => {
	return (
		<Card sx={{ minWidth: 200, textAlign: 'center', backgroundColor: 'primary.main', boxShadow: 'none' }}>
			<CardContent>
				<Stack direction="row" gap={2} alignItems='flex-start'>
					{icon}
					<Stack direction="column" alignItems='flex-start'>
						<Typography variant="subtitle1">
							{title}
						</Typography>
						<Typography variant="h4">
							{value}
						</Typography>
					</Stack>
				</Stack>
			</CardContent>
		</Card>
	);
};

export default CardComponent;
