import dva from "dva";
import createLoading from "dva-loading";
import registerServiceWorker from "./registerServiceWorker";
import router from "./router";

// 1. Initialize
const app = dva();

// 2. Plugins
app.use(createLoading());

// 3. Registter global model
// app.model(count);

// 4. Router
app.router(router);

// 5. Start
app.start("#root");

registerServiceWorker();
