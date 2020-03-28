import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const configSwagger = (app: INestApplication) => {
	const options = new DocumentBuilder()
		.setTitle("Calculating of quality")
		.setDescription("This API calculates qualities tech. tasks, UI, UX")
		.setVersion("0.5")
		.build();

	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup("swagger", app, document);
	return document;
};
