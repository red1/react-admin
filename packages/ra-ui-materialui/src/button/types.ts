import { ButtonProps } from './Button';
import { Omit } from '@material-ui/core';
import { IconProps } from '@material-ui/core/Icon';
import { ReactElement } from 'react';

export interface ButtonWithIconProps extends Omit<ButtonProps, 'children'> {
    icon: ReactElement<IconProps>;
}
