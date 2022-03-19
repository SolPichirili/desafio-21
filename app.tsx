// @deno-types="https://deno.land/x/servest/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";
// @deno-types="https://deno.land/x/servest/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";
import { createApp } from "https://deno.land/x/servest/mod.ts";

const app = createApp();

let visits = 0;

app.handle("/", async (req) => {
  const phrase = req.query.get("frase") || 'no ingresaste ninguna frase por query';

  const changeOrder = (p: String) =>{
    const array = p.split(" ");
    const changedPhrase = array.reverse();
    return changedPhrase.toString();
  }

  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "text/html; charset=UTF-8",
    }),
    body: ReactDOMServer.renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>Servest</title>
        </head>
        <body>
          <h1>Hola Servest con React!</h1>
          <h2>Visitas: {++visits}</h2>
          <h3>Fecha y Hora: {new Date().toLocaleString()}</h3>
          <h4>Su frase: {changeOrder(phrase)}</h4>
        </body>
      </html>,
      ),
  });
});
app.listen({ port: 8080 });