import * as process from "node:process";
import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";


async function start() {
    const PORT = process.env.PORT || 5001;
    const app = await NestFactory.create(AppModule);

    app.listen(PORT, () => console.log(`Listening on ${PORT}`));

}

start();