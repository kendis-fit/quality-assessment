import React, { Fragment } from "react";
import { TableHead, TableRow, TableCell, TableSortLabel } from "@material-ui/core";

import ISortHeader from "../Interfaces/ISortHeader";

const SortHeaders = (props: ISortHeader) => {
    const { HeadCells, Order, OrderBy, OnRequestSort } = props;
    const createSortHandler = (property: string) => {
      OnRequestSort(property);
    };
  
    return (
      <TableHead>
        <TableRow>
          {HeadCells.map(headCell => {
			if (headCell.hide)
			{
				return <Fragment key={headCell.id}></Fragment>
			}
            return <TableCell
              key={headCell.id}
              sortDirection={OrderBy === headCell.id ? Order : false}
            >
              <TableSortLabel
                active={OrderBy === headCell.id}
                direction={OrderBy === headCell.id ? Order : 'asc'}
                onClick={() => createSortHandler(headCell.id)}
              >
                {headCell.label}
              </TableSortLabel>
            </TableCell>
          })}
        </TableRow>
      </TableHead>
    );
}

export default SortHeaders;