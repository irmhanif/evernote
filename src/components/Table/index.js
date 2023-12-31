import { useEffect, useMemo, useRef, useState } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import { dummyNotes } from '../../mockData/data';

const TableView = () => {
    const columns = useMemo(
        () => [
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
        ],
        [],
        //end
    );

    //optionally access the underlying virtualizer instance
    const rowVirtualizerInstanceRef = useRef(null);

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sorting, setSorting] = useState([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setData(dummyNotes);
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        //scroll to the top of the table when the sorting changes
        try {
            rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
        } catch (error) {
            console.error(error);
        }
    }, [sorting]);

    const table = useMaterialReactTable({
        columns,
        data, //10,000 rows
        defaultDisplayColumn: { enableResizing: true },
        enableBottomToolbar: false,
        enableColumnResizing: true,
        enableColumnVirtualization: false,
        enableGlobalFilterModes: false,
        enablePagination: false,
        enableColumnPinning: false,
        enableRowVirtualization: false,
        muiTableContainerProps: { sx: { maxHeight: '600px' } },
        onSortingChange: setSorting,
        state: { isLoading, sorting },
    });

    return <MaterialReactTable table={table} />;
};

//virtualizerInstanceRef was renamed to rowVirtualizerInstanceRef in v1.5.0
//virtualizerProps was renamed to rowVirtualizerOptions in v1.5.0

export default TableView;
