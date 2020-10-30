import { Module } from "@nestjs/common";
import { CalculateProfileService } from "./calculate-profile.service";

@Module({
	providers: [CalculateProfileService],
	exports: [CalculateProfileService],
})
export class CalculateProfileModule {}
