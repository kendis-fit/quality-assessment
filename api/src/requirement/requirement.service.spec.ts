import { Test, TestingModule } from "@nestjs/testing";
import { RequirementService } from "./requirement.service";

describe("RequirementService", () => {
	let service: RequirementService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [RequirementService],
		}).compile();

		service = module.get<RequirementService>(RequirementService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
