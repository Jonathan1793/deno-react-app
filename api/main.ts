import { Application, Router } from "@oakserver/oak";
import { oakCors } from "@tajpouria/cors";
import data from "./data.json" with { type: "json" };

const router = new Router();

router.get("/", (context) => {
  context.response.body = `
      <html>
          <head><title>Dinosaur API</title></head>
          <body>
              <h1>Welcome to Dinosaur API</h1>
              <p>Use the endpoint <code>/api/dinosaurs</code> to see the dinosaur list.</p>
          </body>
      </html>
  `;
});

router.get("/api/dinosaurs", (context) => {
  console.log("GET /api/dinosaurs endpoint hit");
    context.response.body = data;
  });
  
  router.get("/api/dinosaurs/:dinosaur", (context) => {
    console.log("GET /api/dinosaurs/:dinosaur endpoint hit with parameter:", context?.params?.dinosaur);
    if (!context?.params?.dinosaur) {
      context.response.body = "No dinosaur name provided.";
    }
  
    const dinosaur = data.find((item) =>
      item.name.toLowerCase() === context.params.dinosaur.toLowerCase()
    );
  
    context.response.body = dinosaur ?? "No dinosaur found.";
  });
  

  const app = new Application();
  app.use(oakCors());
  app.use(router.routes());
  app.use(router.allowedMethods());
  console.log("Server is running on http://localhost:8000");
  await app.listen({ port: 8000 });  
