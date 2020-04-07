import React, { useState, Fragment, useEffect } from "react";
import {
    TableRow,
    TablePagination,
    TableContainer,
    TableCell,
    TableBody,
    Table,
    makeStyles
} from "@material-ui/core";

import SortHeaders from "./TableComponents/SortHeaders";
import IDefaultTable from "./Interfaces/IDefaultTable";

const useStyles = makeStyles({
    root: {
        width: "100%" 
    },
    selectedItem: {
        cursor: "pointer"
    }
});

function descendingComparator(a: any, b: any, orderBy: any) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order: "asc" | "desc", orderBy: string) {
    return order === "desc"
        ? (a: any, b: any) => descendingComparator(a, b, orderBy)
        : (a: any, b: any) => -descendingComparator(a, b, orderBy);
}

function stableSort(array: any, comparator: any) {
    const stabilizedThis = array.map((el: any, index: any) => [el, index]);
    stabilizedThis.sort((a: any, b: any) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el: any) => el[0]);
}

const DefaultTable = (props: IDefaultTable) => {
    const classes = useStyles();
    const { columnTitles, isPagination } = props;

    const [indexSelected, setIndexSelected] = useState(props.selectable?.DefaultId);
    const [order, setOrder] = useState<"asc" | "desc">("asc");
    const [orderBy, setOrderBy] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(
        isPagination ? 50 : props.data.length
    );
    const dense = false;

    useEffect(() => {
        setRowsPerPage(isPagination ? 50 : props.data.length);
    }, [isPagination, props]);

    const handleRequestSort = (property: string) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const SelectItem = (row: any, index: any) => {
        setIndexSelected(index);
        let object: any = {};
        props.selectable?.Fields?.forEach(field => object[field] = row[field]);
        props.selectable?.OnSelect(object);
    }

    const PaginationRender = () => {
        if (isPagination) {
            return (
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50, 100]}
                    component="div"
                    count={props.data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            );
        }
        return null;
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.data.length - page * rowsPerPage);

    return (
        <div className={classes.root}>
            <TableContainer style={{ height: "740px", overflowY: "auto" }}>
                <Table
                    size={dense ? "small" : "medium"}
                    stickyHeader
                >
                    {columnTitles &&
                        <SortHeaders
                            HeadCells={columnTitles}
                            Order={order}
                            OrderBy={orderBy}
                            OnRequestSort={handleRequestSort}
                        />}
                    <TableBody className={props.selectable ? classes.selectedItem : ""}>
                        {stableSort(props.data, getComparator(order, orderBy))
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((row: any, index: any) => (
                                <TableRow
                                    onClick={() => props.selectable && SelectItem(row, row.id)}
                                    key={index} hover={props.selectable !== undefined}
                                    tabIndex={-1}
                                    selected={props.selectable !== undefined && (row.id === indexSelected)}>
                                    {columnTitles && columnTitles.map((header, index) => {
                                        if (header.hide) {
                                            return <Fragment key={index}></Fragment>
                                        }
                                        return <TableCell key={index}>
                                            {row[header.id]}
                                        </TableCell>
                                    })}
                                </TableRow>
                            ))}
                        {emptyRows > 0 && (
                            <TableRow
                                style={{
                                    height: (dense ? 33 : 53) * emptyRows
                                }}
                            >
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {PaginationRender()}
        </div>
    );
};

export default DefaultTable;
