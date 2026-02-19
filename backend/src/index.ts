import {createServer} from "./server.js";

async function startServer() {
  const server = await createServer()

  server.listen({ port: 3000 }, (err) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(`Server listening at: http://localhost:${3000}`)
  })
}

startServer().then().catch((err) => {
  console.error(`Error while starting server: ${err}`)
})