import { profile } from "./profile.json";
import { Profile } from "./profile.enum.js";
import { uxProfile } from "./ux-profile.json.js";
import { baseProfile } from "./base-profile.json.js";
import { verbalProfile } from "./verbal-profile.json";

export const PROFILE = "PROFILE";
export const UX_PROFILE = "UX_PROFILE";
export const BASE_PROFILE = "BASE_PROFILE";
export const TYPE_PROFILE = "TYPE_PROFILE";
export const VERBAL_PROFILE = "VERBAL_PROFILE";

export const jsonProviders = [
	{
		provide: PROFILE,
		useValue: profile,
	},
	{
		provide: UX_PROFILE,
		useValue: uxProfile,
	},
	{
		provide: BASE_PROFILE,
		useValue: baseProfile,
	},
	{
		provide: VERBAL_PROFILE,
		useValue: verbalProfile
	},
	{
		provide: TYPE_PROFILE,
		useValue: (prof: Profile) => {
			switch (prof) {
				case PROFILE:
					return profile;
				case UX_PROFILE:
					return uxProfile;
				case BASE_PROFILE:
					return baseProfile;
				case VERBAL_PROFILE:
					return verbalProfile;
				default:
					return [];
			}
		},
	},
];
