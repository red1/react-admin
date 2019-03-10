import React, { SFC } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import shouldUpdate from 'recompose/shouldUpdate';
import Queue from '@material-ui/icons/Queue';
import { Link } from 'react-router-dom';

import Button from './Button';
import { Record, TranslationContextProps } from 'ra-core';
import { ButtonWithIconProps } from './types';

// Props injected by react-admin
interface InjectedProps {
    basePath: string;
    record: Record;
    resource: string;
}

const omitId = ({ id, ...rest }) => rest;

export const CloneButtonView: SFC<ButtonWithIconProps & InjectedProps> = ({
    basePath = '',
    label = 'ra.action.clone',
    record,
    icon = <Queue />,
    ...rest
}) => (
    <Button
        // @ts-ignore
        component={Link}
        to={{
            pathname: `${basePath}/create`,
            state: { record: omitId(record) },
        }}
        label={label}
        {...rest}
    >
        {icon}
    </Button>
);

const enhance = compose<
    ButtonWithIconProps & InjectedProps,
    ButtonWithIconProps
>(
    shouldUpdate(
        (
            props: InjectedProps & TranslationContextProps,
            nextProps: InjectedProps & TranslationContextProps
        ) =>
            props.translate !== nextProps.translate ||
            (props.record &&
                nextProps.record &&
                props.record !== nextProps.record) ||
            props.basePath !== nextProps.basePath ||
            (props.record == null && nextProps.record != null)
    )
);

const CloneButton = enhance(CloneButtonView);

CloneButton.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    icon: PropTypes.element,
};

CloneButton.defaultProps = Button.defaultProps;

export default CloneButton;
