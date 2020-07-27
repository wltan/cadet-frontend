import {
  Button,
  Callout,
  Classes,
  Menu,
  MenuDivider,
  MenuItem,
  NonIdealState,
  Spinner
} from '@blueprintjs/core';
import classNames from 'classnames';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Dispatch } from 'redux';

import RemoteExecutionAddDeviceDialog from '../../features/remoteExecution/RemoteExecutionDeviceDialog';
import { Device } from '../../features/remoteExecution/RemoteExecutionTypes';
import { OverallState } from '../application/ApplicationTypes';
import { deleteDevice } from '../sagas/RequestsSaga';
import { actions } from '../utils/ActionsHelper';
import { showSimpleConfirmDialog } from '../utils/DialogHelper';
import { showWarningMessage } from '../utils/NotificationsHelper';
import { WorkspaceLocation } from '../workspace/WorkspaceTypes';

export interface SideContentRemoteExecutionProps {
  workspace: WorkspaceLocation;
}

interface DeviceMenuItemButtonsProps {
  isConnected: boolean;
  device: Device;
  dispatch: Dispatch;
  onEditDevice: (device: Device) => void;
}

const DeviceMenuItemButtons = ({
  isConnected,
  device,
  dispatch,
  onEditDevice
}: DeviceMenuItemButtonsProps) => (
  <>
    {isConnected && <>Connected</>}
    <div className="edit-buttons">
      <Button
        icon="edit"
        small
        minimal
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
          onEditDevice(device);
        }}
      />
      <Button
        intent="danger"
        icon="trash"
        small
        minimal
        onClick={async (e: React.MouseEvent) => {
          e.stopPropagation();
          const confirm = await showSimpleConfirmDialog({
            title: 'Really delete device?',
            contents: `Are you sure you want to delete ${device.title} (${device.type})?`,
            positiveLabel: 'Delete',
            positiveIntent: 'danger',
            negativeLabel: 'No',
            icon: 'trash'
          });
          if (!confirm) {
            return;
          }
          try {
            await deleteDevice(device);
          } catch (e) {
            showWarningMessage(e.message || 'Unknown error occurred.');
            return;
          }
          if (isConnected) {
            dispatch(actions.remoteExecDisconnect());
          }
          dispatch(actions.remoteExecFetchDevices());
        }}
      />
    </div>
  </>
);

const SideContentRemoteExecution: React.FC<SideContentRemoteExecutionProps> = props => {
  const [dialogState, setDialogState] = React.useState<Device | true | undefined>(undefined);

  const [, isLoggedIn, devices, currentSession] = useSelector((store: OverallState) => [
    store.workspaces[props.workspace].isRunning,
    !!store.session.accessToken && !!store.session.role,
    store.session.remoteExecutionDevices,
    store.session.remoteExecutionSession
  ]);
  const dispatch = useDispatch();

  const isConnecting = currentSession && currentSession.connection.status === 'CONNECTING';

  React.useEffect(() => {
    // this is not supposed to happen - the destructor below should disconnect
    // once the user navigates away from the workspace
    if (currentSession && currentSession.workspace !== props.workspace) {
      dispatch(
        actions.remoteExecUpdateSession({
          ...currentSession,
          workspace: props.workspace
        })
      );
    }
  }, [currentSession, dispatch, props.workspace]);

  React.useEffect(() => {
    if (!devices && isLoggedIn) {
      dispatch(actions.remoteExecFetchDevices());
    }
  }, [dispatch, devices, isLoggedIn]);

  React.useEffect(
    () => () => {
      // note the double () => - this function is a destructor
      dispatch(actions.remoteExecDisconnect());
    },
    [dispatch]
  );

  if (!isLoggedIn) {
    return (
      <Callout intent="danger">
        Please <NavLink to="/login">log in</NavLink> to execute on a remote device.
      </Callout>
    );
  }

  const currentDevice = currentSession?.device;

  return (
    <div className="sa-remote-execution row">
      <div className="col-xs-6">
        {!currentDevice && (
          <>
            <p>Not connected to a device&mdash;programs are run in your local browser.</p>
            <p>Select a device from the right.</p>
          </>
        )}
        {currentDevice &&
          (isConnecting ? (
            <NonIdealState description="Connecting..." icon={<Spinner />} />
          ) : (
            <p>
              Connected to {currentDevice.title} ({currentDevice.type}).
            </p>
          ))}
      </div>
      <div className="col-xs-6 devices-menu-container">
        <Menu className={classNames(Classes.ELEVATION_0)}>
          <MenuItem
            text="Browser"
            onClick={() => dispatch(actions.remoteExecDisconnect())}
            icon={!currentDevice ? 'tick' : undefined}
            intent={!currentDevice ? 'success' : undefined}
          />
          {devices &&
            devices.map(device => {
              const thisConnected = currentDevice?.id === device.id;
              return (
                <MenuItem
                  key={device.id}
                  onClick={() => dispatch(actions.remoteExecConnect(props.workspace, device))}
                  text={`${device.title} (${device.type})`}
                  icon={thisConnected ? 'tick' : undefined}
                  labelElement={
                    <DeviceMenuItemButtons
                      onEditDevice={setDialogState}
                      isConnected={thisConnected}
                      device={device}
                      dispatch={dispatch}
                    />
                  }
                  intent={thisConnected ? 'success' : undefined}
                />
              );
            })}
          <MenuDivider />
          <MenuItem text="Add new device..." icon="add" onClick={() => setDialogState(true)} />
        </Menu>
      </div>
      <RemoteExecutionAddDeviceDialog
        isOpen={!!dialogState}
        deviceToEdit={typeof dialogState === 'object' ? dialogState : undefined}
        onClose={() => setDialogState(undefined)}
      />
    </div>
  );
};

export default SideContentRemoteExecution;
