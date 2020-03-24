import { Controller, Get } from "@nestjs/common";

@Controller("api/sr/profiles")
export class RequirementController {
	@Get()
	public getProfiles() {
		return ["lol", "aga"];
	}
}
