export default interface IProfile {
    typeProfile: "PROFILE" | "UX_PROFILE";
    match: {
        params: {
            id: number
        }
    }
}