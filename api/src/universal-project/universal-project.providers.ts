import { Project } from "./universal-project.entity";

export const PROJECT_REPOSITORY = "PROJECT_REPOSITORY";

export const universalProjectProviders = [
    {
        provide: PROJECT_REPOSITORY,
        useValue: Project
    }
]