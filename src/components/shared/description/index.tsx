import { Grid, Card, CardContent, CardHeader } from '@material-ui/core';
import { useGetRealm } from 'src/lib/hooks/api-hooks';
import Title from '../title/title';
import PopIcon from '../popIcon/popIcon';
import parse from 'html-react-parser';

interface Props {
	realmName: string;
}

export const Description = ({ realmName }: Props) => {
	const { realm } = useGetRealm(realmName);
	return (
		<Card variant="outlined">
			<CardHeader
				title={
					<Title
						title={'Description ' + realmName}
						variant="caption"
					/>
				}
			/>
			<CardContent>
				<Grid
					container
					direction="column"
					justifyContent="center"
					alignItems="stretch"
					spacing={3}
				>
					<Grid item xs={12}>
						{realm?.properties.description &&
							parse(realm?.properties.description)}
					</Grid>
					<Grid item xs={12}></Grid>
				</Grid>
			</CardContent>
		</Card>
	);
};

export const ButtonDescription = ({ realmName }: Props) => {
	const { realm } = useGetRealm(realmName);
	return (
		<PopIcon
			helpTextTitle={'Description ' + realmName}
			helpText={
				realm?.properties.description &&
				parse(realm?.properties.description)
			}
		/>
	);
};

export default Description;
