import React from 'react';
import { List, Datagrid, TextField, DateField, ReferenceField, EditButton, Edit, SimpleForm, DateTimeInput, ReferenceInput, SelectInput, Create, Filter, required } from 'react-admin';

const LessonFilter = (props) => (
    <Filter {...props}>
        <ReferenceInput label="Группа" source="group" reference="groups" allowEmpty>
            <SelectInput optionText="name" />
        </ReferenceInput>
        <ReferenceInput label="Преподаватель" source="teacher" reference="teachers" allowEmpty>
            <SelectInput optionText="name" />
        </ReferenceInput>
        <ReferenceInput label="Кабинет" source="office" reference="offices" allowEmpty>
            <SelectInput optionText="office" />
        </ReferenceInput>
    </Filter>
);

export const LessonList = props => (
    <List filters={<LessonFilter />} {...props} title='Пары'>
        <Datagrid>
            <DateField source="startTime" showTime label="Время начала" options={{hour12:false}} />
            <DateField source="endTime" showTime label="Время конца" options={{hour12:false}} />
            <ReferenceField source="teacher" reference="teachers" label="Преподаватель" >
                <TextField source="name" />
            </ReferenceField>
            <ReferenceField source="office" reference="offices" label="Кабинет" >
                <TextField source="office" />
            </ReferenceField>
            <ReferenceField source="group" reference="groups" label="Группа" >
                <TextField source="name" />
            </ReferenceField>
            <ReferenceField source="discipline" reference="disciplines" label="Предмет" >
                <TextField source="name" />
            </ReferenceField>
            <EditButton />
        </Datagrid>
    </List>
);

export const LessonEdit = props => (
    <Edit {...props} title={'Редактирование пары #' + props.id}>
        <SimpleForm>
            <DateTimeInput source="startTime" label="Время начала" validate={[required()]} />
            <DateTimeInput source="endTime" label="Время конца" validate={[required()]} />
            <ReferenceInput source="teacher" reference="teachers" label="Преподаватель" validate={[required()]} >
                <SelectInput optionText="name" />
            </ReferenceInput>
            <ReferenceInput source="office" reference="offices" label="Кабинет" validate={[required()]} >
                <SelectInput optionText="office" />
            </ReferenceInput>
            <ReferenceInput source="group" reference="groups" label="Группа" validate={[required()]} >
                <SelectInput optionText="name" />
            </ReferenceInput>
            <ReferenceInput source="discipline" reference="disciplines" label="Предмет" validate={[required()]} >
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);

export const LessonCreate = props => (
    <Create {...props} title='Создание пары'>
        <SimpleForm>
            <DateTimeInput source="startTime" label="Время начала" validate={[required()]} />
            <DateTimeInput source="endTime" label="Время конца" validate={[required()]} />
            <ReferenceInput source="teacher" reference="teachers" label="Преподаватель" validate={[required()]} >
                <SelectInput optionText="name" />
            </ReferenceInput>
            <ReferenceInput source="office" reference="offices" label="Кабинет" validate={[required()]} >
                <SelectInput optionText="office" />
            </ReferenceInput>
            <ReferenceInput source="group" reference="groups" label="Группа" validate={[required()]} >
                <SelectInput optionText="name" />
            </ReferenceInput>
            <ReferenceInput source="discipline" reference="disciplines" label="Предмет" validate={[required()]} >
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);