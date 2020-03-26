import profile from "./profile.json";
import baseProfile from "./baseProfile.json.js";

export const PROFILE = "PROFILE";
export const BASE_PROFILE = "BASE_PROFILE";

export const jsonProviders = [
    {
        provide: PROFILE,
        useValue: profile
    },
    {
        provide: BASE_PROFILE,
        useValue: baseProfile
    }
]