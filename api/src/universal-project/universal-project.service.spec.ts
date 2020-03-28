import { Test, TestingModule } from "@nestjs/testing";
import { UniversalProjectService } from "./universal-project.service";

describe("UniversalProjectService", () => {
	let service: UniversalProjectService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UniversalProjectService],
		}).compile();

		service = module.get<UniversalProjectService>(UniversalProjectService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
