import IRequestHeader from "./IRequestHeader";
import ISelectable from "./ISelectable";

export default interface IDefaultTable
{
    Data: any[];
    IsPagination: boolean;
    ColumTitles?: IRequestHeader[];
    PropsTable?: any;
    Selectable?: ISelectable;
} 