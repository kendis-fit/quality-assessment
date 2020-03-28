import { profile } from "./profile.json";
import { uxProfile } from "./ux-profile.json.js";
import { baseProfile } from "./base-profile.json.js";

export const PROFILE = "PROFILE";
export const UX_PROFILE = "UX_PROFILE";
export const BASE_PROFILE = "BASE_PROFILE";

export const jsonProviders = [
	{
		provide: PROFILE,
		useValue: profile,
	},
	{
		provide: UX_PROFILE,
		useValue: uxProfile
	},
	{
		provide: BASE_PROFILE,
		useValue: baseProfile,
	},
];
