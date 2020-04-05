export default interface ISelectable<T = any>
{
    Fields: string[];
    OnSelect: (data: T) => void;
    DefaultId?: string;
}