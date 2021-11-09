import {
	Grid,
	Paper,
	Select,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import { useDeleteApplication } from '../../hooks/applications/useDeleteApplication';
import { useGetApplication } from '../../hooks/applications/useGetApplication';
import { useCreateGroup } from '../../hooks/group';
import useGetGroupManager from '../../hooks/group/useGetGroupManager';
import { Group } from '../../model/api/group';
import ConfirmationPopup from '../commons/confirmationPopUp';
import LoadingButton from '../commons/loadingButton';
import Title from '../commons/title/title';
import ButtonCreateGroup from './ButtonCreateGroup';
import { ButtonDeleteGroup } from './ButtonDeleteGroup';
import {
	ButtonManageGroup,
	ButtonManageManagerGroup,
} from './ButtonManageGroup';
import { GroupsViewer } from './groupsViewer';

export const DetailsApplication = () => {
	const { realm, id: applicationId } = useParams<any>();
	const { push } = useHistory();
	const { t } = useTranslation();

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
						spacing={2}
					>
						<Grid item>
							<Title
								title={t(
									'detail_application.groups_title',
								)}
								variant="subtitle1"
							/>
						</Grid>
						<Grid item>
							<GroupsViewer
								groups={
									application?.groups || []
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
