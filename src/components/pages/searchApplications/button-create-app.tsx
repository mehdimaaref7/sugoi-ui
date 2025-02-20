import { Button, Grid, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import SimpleDialog from 'src/components/shared/popButton/Dialog';
interface Props {
	handleCreateApp: any;
}
export const CreateApplicationButton = ({ handleCreateApp }: Props) => {
	const [open, setOpen] = React.useState(false);
	const [appName, setAppName] = useState('');
	const [owner, setOwner] = useState('');
	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const onFinish = () => {
		handleCreateApp(appName, owner);
		setAppName('');
		setOwner('');
		setOpen(false);
	};

	return (
		<>
			<Button
				onClick={handleOpen}
				color="default"
				variant="contained"
			>
				Ajouter une application
			</Button>
			<SimpleDialog
				onClose={handleClose}
				open={open}
				title={'Ajouter une application'}
				body={
					<Grid
						container
						direction="column"
						justifyContent="center"
						alignItems="stretch"
						spacing={3}
					>
						<Grid item>
							<TextField
								id="application-create-name"
								label="Nom de l'application"
								variant="outlined"
								onChange={(e) => {
									setAppName(
										e.target.value,
									);
								}}
								value={appName}
								fullWidth
							/>
						</Grid>
						<Grid item>
							<TextField
								id="application-create-owner"
								label="Propriétaire de l'application"
								variant="outlined"
								onChange={(e) => {
									setOwner(e.target.value);
								}}
								value={owner}
								fullWidth
							/>
						</Grid>
					</Grid>
				}
				actions={<Button onClick={onFinish}>Créer</Button>}
				fullwidth
				maxwidth="md"
			/>
		</>
	);
};

export default CreateApplicationButton;
