import React, { SFC } from 'react';
import PropTypes from 'prop-types';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import MuiButton from '@material-ui/core/Button';
import {
    withStyles,
    createStyles,
    Theme,
    WithStyles,
} from '@material-ui/core/styles';
import ContentAdd from '@material-ui/icons/Add';
import compose from 'recompose/compose';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { withTranslate, TranslationContextProps } from 'ra-core';

import Button from './Button';
import Responsive from '../layout/Responsive';
import { ButtonWithIconProps } from './types';

// Props injected by react-admin
interface InjectedProps {
    basePath: string;
    resource: string;
}

interface EnhancedProps
    extends WithStyles<typeof styles>,
        TranslationContextProps {}

const styles = (theme: Theme) =>
    createStyles({
        floating: {
            color: theme.palette.getContrastText(theme.palette.primary.main),
            margin: 0,
            top: 'auto',
            right: 20,
            bottom: 60,
            left: 'auto',
            position: 'fixed',
            zIndex: 1000,
        },
        floatingLink: {
            color: 'inherit',
        },
    });

const CreateButtonView: SFC<
    ButtonWithIconProps & InjectedProps & EnhancedProps
> = ({
    basePath = '',
    className,
    classes,
    translate,
    label = 'ra.action.create',
    icon = <ContentAdd />,
    ...rest
}) => (
    <Responsive
        small={
            <MuiButton
                // @ts-ignore
                component={Link}
                variant="fab"
                color="primary"
                className={classnames(classes.floating, className)}
                to={`${basePath}/create`}
                aria-label={label && translate(label)}
                {...rest}
            >
                {icon}
            </MuiButton>
        }
        medium={
            <Button
                // @ts-ignore
                component={Link}
                to={`${basePath}/create`}
                className={className}
                label={label}
                {...rest}
            >
                {icon}
            </Button>
        }
    />
);

const enhance = compose<
    ButtonWithIconProps & InjectedProps & EnhancedProps,
    ButtonWithIconProps
>(
    withTranslate,
    onlyUpdateForKeys(['basePath', 'label', 'translate']),
    withStyles(styles)
);

const CreateButton = enhance(CreateButtonView);

CreateButton.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    icon: PropTypes.element,
};

export default CreateButton;
