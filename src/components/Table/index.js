import { useEffect, useMemo, useRef, useState } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import { dummyNotes } from '../../mockData/data';

const TableView = (props) => {
    const { columns, data } = props
    const tblColumns = useMemo(
        () => columns,
        [],
        //end
    );

    //optionally access the underlying virtualizer instance
    const rowVirtualizerInstanceRef = useRef(null);

    const [tblData, setTblData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sorting, setSorting] = useState([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setTblData(data);
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
        columns: tblColumns,
        data: tblData,
        defaultDisplayColumn: { enableResizing: false },
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
        enableGlobalFilter: true, // Disable search functionality
        enableFullScreenToggle: false, // Disable toggle columns functionality
        enableSorting: true,
        enableColumnActions: false,
        enableHiding: false,
        enableDensityToggle: false,
        initialState: { density: 'compact' },
    });

    return <MaterialReactTable table={table} />;
};

//virtualizerInstanceRef was renamed to rowVirtualizerInstanceRef in v1.5.0
//virtualizerProps was renamed to rowVirtualizerOptions in v1.5.0

export default TableView;
