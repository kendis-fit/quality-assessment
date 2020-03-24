import { Test, TestingModule } from "@nestjs/testing";
import { RequirementController } from "./requirement.controller";

describe("Requirement Controller", () => {
	let controller: RequirementController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [RequirementController],
		}).compile();

		controller = module.get<RequirementController>(RequirementController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
