import React from 'react';
import { List, Datagrid, TextField, EditButton, Edit, SimpleForm, Create, Filter, TextInput, required } from 'react-admin';
import { CustomDeleteToolbar } from './customDeleteToolbar'
import { CustomBottomToolbar } from './customBottomToolbar'
import Empty from './empty'
import GroupIcon from '@material-ui/icons/Group';
import { CreateNoRedirectBottomToolbar } from './createNoRedirectBottomToolbar'


const GroupFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Поиск" source="q" alwaysOn />
    </Filter>
);

export const GroupList = props => (
    <List empty={<Empty displayName="Групп" icon={GroupIcon}/>} filters={<GroupFilter />} {...props} title='Группы' bulkActionButtons={<CustomDeleteToolbar />}>
        <Datagrid>
            <TextField source="id" label="Номер" />
            <TextField source="name" label="Номер группы" />
            <EditButton />
        </Datagrid>
    </List>
);

export const GroupEdit = props => (
    <Edit {...props} title={'Редактирование группы #' + props.id}>
        <SimpleForm toolbar={<CustomBottomToolbar {...props} />}>
            <TextInput disabled source="id" />
            <TextInput source="name" label="Номер группы" validate={[required()]} />
        </SimpleForm>
    </Edit>
);

export const GroupCreate = props => (
    <Create {...props} title='Создание группы'>
        <SimpleForm toolbar={<CreateNoRedirectBottomToolbar {...props} />} >
            <TextInput source="name" label="Номер группы" validate={[required()]} />
        </SimpleForm>
    </Create>
);
