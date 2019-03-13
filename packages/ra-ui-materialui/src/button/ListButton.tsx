import React, { SFC, ComponentType } from 'react';
import ActionList from '@material-ui/icons/List';
import { Link } from 'react-router-dom';
import shouldUpdate from 'recompose/shouldUpdate';

import Button from './Button';
import { ButtonWithIconProps, buttonWithIconPropTypes } from './types';
import { TranslationContextProps } from 'ra-core';

// Props injected by react-admin
interface InjectedProps {
    basePath: string;
    resource: string;
}

const ListButtonView: SFC<ButtonWithIconProps & InjectedProps> = ({
    basePath = '',
    label = 'ra.action.list',
    icon = <ActionList />,
    ...rest
}) => (
    <Button
        // @ts-ignore
        component={Link}
        to={basePath}
        label={label}
        {...rest}
    >
        {icon}
    </Button>
);

const enhance = shouldUpdate(
    (
        props: InjectedProps & TranslationContextProps,
        nextProps: InjectedProps & TranslationContextProps
    ) =>
        props.translate !== nextProps.translate ||
        props.basePath !== nextProps.basePath
);

const ListButton = enhance(ListButtonView) as ComponentType<
    ButtonWithIconProps
>;

ListButton.propTypes = buttonWithIconPropTypes;

export default ListButton;
