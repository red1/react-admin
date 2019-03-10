import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import {
    withStyles,
    createStyles,
    Theme,
    WithStyles,
} from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import ActionDelete from '@material-ui/icons/Delete';
import classnames from 'classnames';
import {
    crudDelete,
    startUndoable as startUndoableAction,
    Dispatch,
    Record,
    RedirectionSideEffect,
} from 'ra-core';

import Button from './Button';
import { ButtonWithIconProps } from './types';

interface Props extends ButtonWithIconProps {
    onClick?: () => void;
    redirect: RedirectionSideEffect;
    undoable: boolean;
}

// Props injected by react-admin
interface InjectedProps {
    basePath: string;
    record: Record;
    resource: string;
}

interface EnhancedProps extends WithStyles<typeof styles> {
    dispatchCrudDelete: Dispatch<typeof crudDelete>;
    startUndoable: Dispatch<typeof startUndoableAction>;
}

const styles = (theme: Theme) =>
    createStyles({
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
    });

class DeleteButtonView extends Component<
    Props & InjectedProps & EnhancedProps
> {
    handleDelete = event => {
        event.stopPropagation();
        const {
            dispatchCrudDelete,
            startUndoable,
            resource,
            record,
            basePath,
            redirect,
            undoable,
            onClick,
        } = this.props;
        if (undoable) {
            startUndoable(
                crudDelete(resource, record.id, record, basePath, redirect)
            );
        } else {
            dispatchCrudDelete(resource, record.id, record, basePath, redirect);
        }

        if (typeof onClick === 'function') {
            onClick();
        }
    };

    render() {
        const {
            basePath,
            classes,
            dispatchCrudDelete,
            className,
            icon,
            label = 'ra.action.delete',
            onClick,
            record,
            redirect,
            resource,
            startUndoable,
            undoable,
            ...rest
        } = this.props;
        return (
            <Button
                onClick={this.handleDelete}
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
    }
}

const DeleteButton = compose(
    connect(
        null,
        { startUndoable: startUndoableAction, dispatchCrudDelete: crudDelete }
    ),
    withStyles(styles)
)(DeleteButtonView);

DeleteButton.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    redirect: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.func,
    ]),
    undoable: PropTypes.bool,
    icon: PropTypes.element,
};

DeleteButton.defaultProps = {
    redirect: 'list',
    undoable: true,
    icon: <ActionDelete />,
};

export default DeleteButton;
