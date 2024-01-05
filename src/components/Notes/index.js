import React from 'react';
import TableView from '../Table';

const NotesList = (props) => {
    const { notes, onRowClick } = props

    const columns = [
        {
            accessorKey: 'title',
            header: 'Title',
            size: 150,
        },
        {
            accessorKey: 'dateUpdated',
            header: 'Date Updated',
            size: 300,
        },
        {
            accessorKey: 'tags',
            header: 'Tags',
            size: 300,
        },
        // {
        //     accessorKey: 'size',
        //     header: 'size',
        //     size: 170,
        // },
        // {
        //     accessorKey: 'url',
        //     header: 'url',
        //     size: 150,
        // },
        // {
        //     accessorKey: 'dateUpdated',
        //     header: 'dateUpdated',
        //     size: 300,
        // },
        // {
        //     accessorKey: 'dateCreated',
        //     header: 'dateCreated',
        //     size: 250,
        // },
        // {
        //     accessorKey: 'location',
        //     header: 'location',
        //     size: 300,
        // },
        // {
        //     accessorKey: 'reminderDate',
        //     header: 'reminderDate',
        // },
        // {
        //     accessorKey: 'createdBy',
        //     header: 'createdBy',
        // },
        // {
        //     accessorKey: 'updatedBy',
        //     header: 'updatedBy',
        //     size: 350,
        // },
        // {
        //     accessorKey: 'description',
        //     header: 'description',
        // },
        // {
        //     accessorKey: 'canvas',
        //     header: 'canvas',
        // },
        // {
        //     accessorKey: 'audioLink',
        //     header: 'audioLink',
        // },
        // {
        //     accessorKey: 'isActive',
        //     header: 'Is Active',
        // },
    ];
    return (
        <TableView columns={columns} data={notes} onRowClick={onRowClick} />
    );
};

export default NotesList;
