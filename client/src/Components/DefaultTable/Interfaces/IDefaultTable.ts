import IRequestHeader from "./IRequestHeader";
import ISelectable from "./ISelectable";

export default interface IDefaultTable
{
    data: any[];
    isPagination: boolean;
    columnTitles: IRequestHeader[];
    selectable?: ISelectable;
} 