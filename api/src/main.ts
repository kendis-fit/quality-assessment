import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";
import { configSwagger } from "./helpers/config-swagger";

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { cors: false });

	if (process.env.NODE_ENV === "development") {
		configSwagger(app);
	}

	await app.listen(process.env.PORT || 3000);
}
bootstrap();
