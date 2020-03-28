import IIndex from "./IIndex";

export default interface IProfile {
    profile: IIndex[];
    match: {
        params: {
            id: number
        }
    }
}