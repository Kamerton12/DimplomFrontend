import React, { useCallback, FC, ReactElement, SyntheticEvent } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import ActionDelete from '@material-ui/icons/Delete';
//@ts-ignore
import classnames from 'classnames';
//@ts-ignore
import { Button, ButtonProps, showNotification } from 'react-admin';
import {
    useDelete,
    useRefresh,
    useNotify,
    useRedirect,
    CRUD_DELETE,
    Record,
    RedirectionSideEffect,
} from 'ra-core';
//@ts-ignore
import { useDispatch } from 'react-redux'

const UserDeleteWithUndoButton: FC<UserDeleteWithUndoButtonProps> = props => {
    const {
        label = 'ra.action.delete',
        classes: classesOverride,
        className,
        icon = defaultIcon,
        onClick,
        resource,
        record,
        basePath,
        redirect: redirectTo = 'list',
        ...rest
    } = props;
    const classes = useStyles(props);
    const notify = useNotify();
    const redirect = useRedirect();
    const refresh = useRefresh();
    const dispath = useDispatch(); 

    const [deleteOne, { loading }] = useDelete(resource, record.id, record, {
        action: CRUD_DELETE,
        onSuccess: () => {
            notify('ra.notification.deleted', 'info', { smart_count: 1 }, true);
            redirect(redirectTo, basePath);
            refresh();
        },
        onFailure: (error: any) =>
            notify(
                typeof error === 'string'
                    ? error
                    : error.message || 'ra.notification.http_error',
                'warning'
            ),
        undoable: true,
    });
    const b = useCallback(
        event => {
            event.stopPropagation();
            deleteOne();
            if (typeof onClick === 'function') {
                onClick(event);
            }
        },
        [deleteOne, onClick]
    );
    const handleDelete = (e: any) => {
        const username = localStorage.getItem('username');
        if(props.selectedIds.includes(username)){
            dispath(showNotification("Вы не можете удалить самого себя!!!", 'warning'))
        } else {
            b(e);
        }
    }

    return (
        <Button
            onClick={handleDelete}
            disabled={loading}
            label={label}
            className={classnames(
                'ra-delete-button',
                classes.deleteButton,
                className
            )}
            key="button"
            {...rest}
        >
            {icon}
        </Button>
    );
};

const useStyles = makeStyles(
    theme => ({
        deleteButton: {
            color: theme.palette.error.main,
            '&:hover': {
                backgroundColor: fade(theme.palette.error.main, 0.12),
                // Reset on mouse devices
                '@media (hover: none)': {
                    backgroundColor: 'transparent',
                },
            },
        },
    }),
    { name: 'RaDeleteWithUndoButton' }
);

interface Props {
    basePath?: string;
    classes?: object;
    className?: string;
    icon?: ReactElement;
    label?: string;
    onClick?: (e: MouseEvent) => void;
    record?: Record;
    redirect?: RedirectionSideEffect;
    resource?: string;
    // May be injected by Toolbar - sanitized in Button
    handleSubmit?: (event?: SyntheticEvent<HTMLFormElement>) => Promise<Object>;
    handleSubmitWithRedirect?: (redirect?: RedirectionSideEffect) => void;
    invalid?: boolean;
    pristine?: boolean;
    saving?: boolean;
    submitOnEnter?: boolean;
    undoable?: boolean;
}

const defaultIcon = <ActionDelete />;

export type UserDeleteWithUndoButtonProps = Props & ButtonProps;

UserDeleteWithUndoButton.propTypes = {
    basePath: PropTypes.string,
    classes: PropTypes.object,
    className: PropTypes.string,
    label: PropTypes.string,
    record: PropTypes.any,
    redirect: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.func,
    ]),
    resource: PropTypes.string,
    icon: PropTypes.element,
};

export default UserDeleteWithUndoButton;