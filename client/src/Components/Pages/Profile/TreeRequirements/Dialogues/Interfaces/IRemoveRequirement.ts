export interface IRemoveRequirement {
    id: string;
    name: string;
    onRemoveElement: () => void;
    handleClose: () => void;
}