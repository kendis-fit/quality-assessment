import { profile } from "./profile.json";
import { Profile } from "./profile.enum.js";
import { uxProfile } from "./ux-profile.json.js";
import { uiProfile } from "./ui-profile.json.js";
import { baseProfile } from "./base-profile.json.js";
import { verbalProfile } from "./verbal-profile.json";
import { faultsInjectionProfile } from "./faults-injection-profile.json";

export const PROFILE = "PROFILE";
export const UX_PROFILE = "UX_PROFILE";
export const UI_PROFILE = "UI_PROFILE";
export const BASE_PROFILE = "BASE_PROFILE";
export const TYPE_PROFILE = "TYPE_PROFILE";
export const VERBAL_PROFILE = "VERBAL_PROFILE";
export const FAULTS_INJECTION_PROFILE = "FAULTS_INJECTION_PROFILE";

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
		provide: UI_PROFILE,
		useValue: uiProfile
	},
	{
		provide: FAULTS_INJECTION_PROFILE,
		useValue: faultsInjectionProfile,
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
				case UI_PROFILE:
					return uiProfile;
				case FAULTS_INJECTION_PROFILE:
					return faultsInjectionProfile;
				default:
					return [];
			}
		},
	},
];
