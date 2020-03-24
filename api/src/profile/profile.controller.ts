import { Controller, Get } from "@nestjs/common";

@Controller("api/sr/profiles")
export class ProfileController {
	@Get()
	public getProfiles() {
		return ["lol", "aga"];
	}
}
