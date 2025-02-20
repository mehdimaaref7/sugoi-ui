import { Grid } from '@material-ui/core';
import GenerateFields from 'src/components/shared/formular/fields/utils';
import Panel from 'src/components/shared/panel/panel';
import { Field } from 'src/lib/model/field';

interface mainPanelProps {
	values: any;
	handleChange: any;
	mainsFields: Field[];
	addressFields: Field[];
	advancedFields: Field[];
}

const MainPanel = ({
	values,
	handleChange,
	mainsFields,
	addressFields,
	advancedFields,
}: mainPanelProps) => {
	return (
		<>
			<Grid container spacing={3} direction="row">
				{GenerateFields(values, handleChange, mainsFields).map(
					(field, i) => (
						<Grid
							item
							xs={12}
							md={6}
							key={'field-' + field + '-' + i}
						>
							{field}
						</Grid>
					),
				)}
			</Grid>
			{addressFields.length > 0 && (
				<Panel
					title="Adresse"
					collapsible={true}
					description="Information générale"
					elevation={0}
				>
					<Grid container spacing={3} direction="row">
						{GenerateFields(
							values,
							handleChange,
							addressFields,
						).map((field, i) => (
							<Grid
								item
								xs={12}
								md={6}
								key={'field-' + field + '-' + i}
							>
								{field}
							</Grid>
						))}
					</Grid>
				</Panel>
			)}
			{advancedFields.length > 0 && (
				<Panel
					title="Information Complémentaire"
					collapsible={true}
					description="Autres infos"
					elevation={0}
				>
					<Grid container spacing={3} direction="row">
						{GenerateFields(
							values,
							handleChange,
							advancedFields,
						).map((field, i) => (
							<Grid
								item
								xs={12}
								md={6}
								key={'field-' + field + '-' + i}
							>
								{field}
							</Grid>
						))}
					</Grid>
				</Panel>
			)}
		</>
	);
};

export default MainPanel;
