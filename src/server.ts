import app from "./app.js";
import connectDB from "./config/db.js";
import {env} from "./config/env.js";

async function bootstrap(): Promise<void> {
  try {
    await connectDB();

    const server = app.listen(env.PORT, () => {
      console.log(`Server running on http://localhost:${env.PORT}`);
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}
void bootstrap();
