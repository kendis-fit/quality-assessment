import { Controller, Get } from "@nestjs/common";

@Controller("profiles")
export class ProfileController 
{
    @Get()
    public getProfiles()
    {
        return ["lol", "aga"];
    }
}