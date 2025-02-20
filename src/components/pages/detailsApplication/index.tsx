import { Grid, TextField, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import ConfirmationPopup from 'src/components/shared/confirmationPopUp';
import LoadingButton from 'src/components/shared/loadingButton';
import Title from 'src/components/shared/title/title';
import {
	useCreateGroup,
	useDeleteApplication,
	useGetApplication,
	useGetGroupManager,
} from 'src/lib/hooks/api-hooks';
import { Group } from 'src/lib/model/api/group';
import ButtonCreateGroup from './ButtonCreateGroup';
import { ButtonDeleteGroup } from './ButtonDeleteGroup';
import {
	ButtonManageGroup,
	ButtonManageManagerGroup,
} from './ButtonManageGroup';
import { GroupsViewer } from './groupsViewer';
import { useState } from 'react';
export const DetailsApplication = () => {
	const [groupeApplicatif, setGroupeApplicatif] = useState('');
	const { realm, id: applicationId } = useParams<any>();
	const { push } = useHistory();
	const { t } = useTranslation();
	document.title =
		t('detail_application.page_title_1') +
		applicationId +
		t('detail_application.page_title_2');
	const {
		application,
		execute: getApplication,
		loading,
	} = useGetApplication(realm, applicationId);

	const {
		execute: getGroupManager,
		group: groupManager,
		loading: loadingGroupManager,
	} = useGetGroupManager(realm, applicationId);

	const { execute: createGroup } = useCreateGroup();

	const { execute: deleteApplication, loading: loadingDelete } =
		useDeleteApplication();

	const handleDeleteApp = async (realm: string, applicationId: string) => {
		await deleteApplication(realm, applicationId);
		push('/realm/' + realm + '/applications');
	};

	const handleCreateGroup =
		(realm: string, applicationId: string) => (group: Group) => {
			createGroup(realm, applicationId, group).then(() =>
				getApplication(realm, applicationId),
			);
		};

	return (
		<>
			<Title
				title={t('detail_application.title') + applicationId}
			/>
			<Grid
				container
				direction="column"
				justifyContent="center"
				alignItems="stretch"
				spacing={5}
			>
				<Grid item>
					<Grid
						container
						direction="row"
						justifyContent="flex-end"
						alignItems="center"
						spacing={3}
					>
						<ButtonCreateGroup
							handleAddGroup={handleCreateGroup(
								realm,
								applicationId,
							)}
							application={application}
						/>
					</Grid>
				</Grid>
				<Grid item>
					<Grid
						container
						direction="column"
						justifyContent="center"
						alignItems="stretch"
						spacing={2}
					>
						<Grid item>
							<Title
								title={t(
									'detail_application.manager_groups_title',
								)}
								variant="subtitle1"
							/>
						</Grid>
						<Grid item>
							<GroupsViewer
								groups={
									groupManager
										? [
												groupManager as Group,
										  ]
										: []
								}
								paginate={false}
								realm={realm}
								loading={loadingGroupManager}
								updateComponent={(
									_group: Group,
								) => (
									<ButtonManageManagerGroup
										realm={realm}
										applicationName={
											applicationId
										}
										groupName={
											_group.name
										}
										onClose={() =>
											getGroupManager(
												realm,
												applicationId,
											)
										}
									/>
								)}
							/>
						</Grid>
					</Grid>
				</Grid>

				<Grid item>
					<Grid
						container
						direction="column"
						justifyContent="center"
						alignItems="stretch"
						spacing={1}
					>
						<Grid item>
							<Title
								title={t(
									'detail_application.groups_title',
								)}
								variant="subtitle1"
							/>
						</Grid>
						<Grid item xs={5}>
							<TextField
								fullWidth
								id="standard-bare"
								label={t(
									'detail_application.search_groups_title',
								)}
								variant="outlined"
								value={groupeApplicatif}
								onChange={(e) =>
									setGroupeApplicatif(
										e.target.value,
									)
								}
								InputProps={{
									endAdornment: (
										<IconButton>
											<SearchOutlined />
										</IconButton>
									),
								}}
							/>
						</Grid>
						<Grid item>
							<GroupsViewer
								groups={
									application?.groups.filter(
										(group) =>
											group.name.includes(
												groupeApplicatif,
											),
									) || []
								}
								realm={realm}
								loading={loading}
								updateComponent={(
									_group: Group,
								) => (
									<ButtonManageGroup
										realm={realm}
										applicationName={
											applicationId
										}
										groupName={
											_group.name
										}
										onClose={() =>
											getApplication(
												realm,
												applicationId,
											)
										}
									/>
								)}
								deleteComponent={(
									_group: Group,
								) => (
									<ButtonDeleteGroup
										group={_group}
										realm={realm}
										application={
											applicationId
										}
										onClose={() =>
											getApplication(
												realm,
												applicationId,
											)
										}
									/>
								)}
							/>
						</Grid>
					</Grid>
				</Grid>

				<Grid item>
					<Grid
						container
						direction="row"
						justifyContent="center"
						alignItems="center"
						spacing={3}
					>
						<Grid item>
							<ConfirmationPopup
								Icon={
									<LoadingButton
										loading={
											loadingDelete
										}
										color="secondary"
										variant="contained"
									>
										{t(
											'detail_application.buttons.delete.button',
										)}
									</LoadingButton>
								}
								title={
									t(
										'detail_application.buttons.delete.popup.title.part1',
									) +
									applicationId +
									t(
										'detail_application.buttons.delete.popup.title.part2',
									)
								}
								body1={t(
									'detail_application.buttons.delete.popup.body.body1',
								)}
								body2={t(
									'detail_application.buttons.delete.popup.body.body2',
								)}
								bodyBold={t(
									'detail_application.buttons.delete.popup.body.bodyBold',
								)}
								validation_text={applicationId}
								handleDelete={() =>
									handleDeleteApp(
										realm,
										applicationId,
									)
								}
							/>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</>
	);
};
