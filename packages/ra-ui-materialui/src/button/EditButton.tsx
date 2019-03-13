import React, { SFC, ComponentType } from 'react';
import shouldUpdate from 'recompose/shouldUpdate';
import ContentCreate from '@material-ui/icons/Create';
import { Link } from 'react-router-dom';
import { linkToRecord, TranslationContextProps, Record } from 'ra-core';

import Button from './Button';
import { ButtonWithIconProps, buttonWithIconPropTypes } from './types';

// Props injected by react-admin
interface InjectedProps {
    basePath: string;
    record: Record;
    resource: string;
}
// useful to prevent click bubbling in a datagrid with rowClick
const stopPropagation = e => e.stopPropagation();

const EditButtonView: SFC<ButtonWithIconProps & InjectedProps> = ({
    basePath = '',
    label,
    record,
    icon,
    ...rest
}) => (
    <Button
        // @ts-ignore
        component={Link}
        to={linkToRecord(basePath, record.id)}
        label={label}
        onClick={stopPropagation}
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
        (props.record &&
            nextProps.record &&
            props.record.id !== nextProps.record.id) ||
        props.basePath !== nextProps.basePath ||
        (props.record == null && nextProps.record != null)
);

const EditButton = enhance(EditButtonView) as ComponentType<
    ButtonWithIconProps
>;

EditButton.propTypes = buttonWithIconPropTypes;

EditButton.defaultProps = {
    label: 'ra.action.edit',
    icon: <ContentCreate />,
};

export default EditButton;
