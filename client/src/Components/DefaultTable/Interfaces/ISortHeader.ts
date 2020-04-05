import IRequestHeader from "./IRequestHeader";

export default interface ISortHeaders
{
    HeadCells: IRequestHeader[];
    Order: "asc" | "desc";
    OrderBy: string;
    OnRequestSort: (property: string) => void;
}