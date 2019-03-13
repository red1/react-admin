import { Omit } from '@material-ui/core';
import { IconProps } from '@material-ui/core/Icon';
import { ReactElement } from 'react';
import PropTypes from 'prop-types';

import Button, { ButtonProps } from './Button';

export interface ButtonWithIconProps extends Omit<ButtonProps, 'children'> {
    icon: ReactElement<IconProps>;
}

const { children, ...propTypes } = Button.propTypes;

export const buttonWithIconPropTypes = {
    ...propTypes,
    icon: PropTypes.element,
};
