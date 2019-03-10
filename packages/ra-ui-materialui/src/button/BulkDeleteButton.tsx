import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import ActionDelete from '@material-ui/icons/Delete';
import {
    withStyles,
    createStyles,
    Theme,
    WithStyles,
} from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import {
    crudDeleteMany,
    startUndoable as startUndoableAction,
    Dispatch,
    Identifier,
} from 'ra-core';

import Button from './Button';
import { ButtonWithIconProps } from './types';

interface Props extends ButtonWithIconProps {
    undoable: boolean;
    onClick?: () => void;
}

// Props injected by react-admin
interface InjectedProps {
    basePath: string;
    resource: string;
    selectedIds: Identifier[];
}

// Props injected by the HOCs
interface EnhancedProps extends WithStyles<typeof styles> {
    dispatchCrudDeleteMany: Dispatch<typeof crudDeleteMany>;
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

class BulkDeleteButton extends Component<
    Props & InjectedProps & EnhancedProps
> {
    handleClick = () => {
        const {
            basePath,
            dispatchCrudDeleteMany,
            resource,
            selectedIds,
            startUndoable,
            undoable,
            onClick,
        } = this.props;
        if (undoable) {
            startUndoable(crudDeleteMany(resource, selectedIds, basePath));
        } else {
            dispatchCrudDeleteMany(resource, selectedIds, basePath);
        }

        if (typeof onClick === 'function') {
            onClick();
        }
    };

    render() {
        const {
            basePath,
            classes,
            dispatchCrudDeleteMany,
            label,
            icon,
            onClick,
            resource,
            selectedIds,
            startUndoable,
            theme,
            undoable,
            ...rest
        } = this.props;
        return (
            <Button
                onClick={this.handleClick}
                label={label}
                className={classes.deleteButton}
                {...rest}
            >
                {icon}
            </Button>
        );
    }
}

const EnhancedBulkDeleteButton = compose<
    Props & InjectedProps & EnhancedProps,
    Props
>(
    connect(
        undefined,
        {
            startUndoable: startUndoableAction,
            dispatchCrudDeleteMany: crudDeleteMany,
        }
    ),
    withStyles(styles)
)(BulkDeleteButton);

EnhancedBulkDeleteButton.propTypes = {
    label: PropTypes.string,
    undoable: PropTypes.bool,
    icon: PropTypes.element,
};

EnhancedBulkDeleteButton.defaultProps = {
    label: 'ra.action.delete',
    undoable: true,
    icon: <ActionDelete />,
};

export default EnhancedBulkDeleteButton;
