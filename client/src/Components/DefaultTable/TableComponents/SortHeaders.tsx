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
			if (headCell.Hide)
			{
				return <Fragment key={headCell.Id}></Fragment>
			}
            return <TableCell
              key={headCell.Id}
              sortDirection={OrderBy === headCell.Id ? Order : false}
            >
              <TableSortLabel
                active={OrderBy === headCell.Id}
                direction={OrderBy === headCell.Id ? Order : 'asc'}
                onClick={() => createSortHandler(headCell.Id)}
              >
                {headCell.Label}
              </TableSortLabel>
            </TableCell>
          })}
        </TableRow>
      </TableHead>
    );
}

export default SortHeaders;