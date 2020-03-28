import { Test, TestingModule } from '@nestjs/testing';
import { CalculateProfileService } from './calculate-profile.service';

describe('CalculateProfileService', () => {
  let service: CalculateProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalculateProfileService],
    }).compile();

    service = module.get<CalculateProfileService>(CalculateProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
