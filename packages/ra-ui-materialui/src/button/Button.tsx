import React, { SFC, isValidElement, ReactElement } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import MuiButton, {
    ButtonProps as MuiButtonProps,
} from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { withTranslate, TranslationContextProps } from 'ra-core';

import Responsive from '../layout/Responsive';
import { IconProps } from '@material-ui/core/Icon';

export interface ButtonProps extends MuiButtonProps {
    alignIcon: 'left' | 'right';
    label: string;
    children: ReactElement<IconProps>;
}

interface EnhancedProps
    extends WithStyles<typeof styles>,
        TranslationContextProps {}

const styles = createStyles({
    button: {
        display: 'inline-flex',
        alignItems: 'center',
    },
    label: {
        paddingLeft: '0.5em',
    },
    labelRightIcon: {
        paddingRight: '0.5em',
    },
    smallIcon: {
        fontSize: 20,
    },
    mediumIcon: {
        fontSize: 22,
    },
    largeIcon: {
        fontSize: 24,
    },
});

const ButtonView: SFC<ButtonProps & EnhancedProps> = ({
    alignIcon,
    children,
    classes,
    className,
    color,
    disabled,
    label,
    size,
    translate,
    ...rest
}) => (
    <Responsive
        small={
            label && !disabled ? (
                <Tooltip title={translate(label, { _: label })}>
                    <IconButton
                        aria-label={translate(label, { _: label })}
                        className={className}
                        color={color}
                        {...rest}
                    >
                        {children}
                    </IconButton>
                </Tooltip>
            ) : (
                <IconButton
                    className={className}
                    color={color}
                    disabled={disabled}
                    {...rest}
                >
                    {children}
                </IconButton>
            )
        }
        medium={
            <MuiButton
                className={classnames(classes.button, className)}
                color={color}
                size={size}
                aria-label={label ? translate(label, { _: label }) : undefined}
                disabled={disabled}
                {...rest}
            >
                {alignIcon === 'left' &&
                    isValidElement(children) &&
                    React.cloneElement(children, {
                        className: classes[`${size}Icon`],
                    })}
                {label && (
                    <span
                        className={classnames({
                            [classes.label]: alignIcon === 'left',
                            [classes.labelRightIcon]: alignIcon !== 'left',
                        })}
                    >
                        {translate(label, { _: label })}
                    </span>
                )}
                {alignIcon === 'right' &&
                    isValidElement(children) &&
                    React.cloneElement(children, {
                        className: classes[`${size}Icon`],
                    })}
            </MuiButton>
        }
    />
);

const enhance = compose<ButtonProps & EnhancedProps, ButtonProps>(
    withStyles(styles),
    withTranslate
);

const Button = enhance(ButtonView);

Button.propTypes = {
    ...MuiButton.propTypes,
    alignIcon: PropTypes.oneOf(['left', 'right']),
    label: PropTypes.string,
};

Button.defaultProps = {
    alignIcon: 'left',
    color: 'primary',
    size: 'small',
};

export default Button;
