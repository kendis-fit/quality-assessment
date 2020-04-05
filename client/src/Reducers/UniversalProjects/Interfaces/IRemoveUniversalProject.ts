import { REMOVE_UNIVERSAL_PROJECT } from "../../../Constants/actions";

export interface IRemoveUniversalProject {
    type: typeof REMOVE_UNIVERSAL_PROJECT;
    value: string;
}