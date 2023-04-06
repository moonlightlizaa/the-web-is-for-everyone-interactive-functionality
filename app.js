// Importeer express uit de node_modules map
import express, { request } from "express";

// API

const url = "https://api.visualthinking.fdnd.nl/api/v1/methods?first=100";
const data = await fetch(url).then((response) => response.json());

// console.log(data);

// Maak een nieuwe express app aan
const app = express();

// Stel ejs in als template engine en geef de 'views' map door
app.set("view engine", "ejs");
app.set("views", "./views");

// Gebruik de map 'public' voor statische resources
app.use(express.static("public"));

// Stel afhandeling van formulieren inzx
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Maak een route voor de index
app.get("/", async (req, res) => {
  let data = await fetch(url).then((response) => response.json());

  // filter data als req.params.blah
  // if (false) {
  //   let categorie = "Leren over anderen";

  //   data.methods = data.methods.filter((method) => {
  //     return (
  //       method.categories.find((category) => {
  //         return category.title == categorie;
  //       }) !== undefined
  //     );
  //   });
  // }
  res.render("index", data);
});

// Detail pagina

app.get("/methods/:slug", (request, response) => {
  let detailPageUrl =
    "https://api.visualthinking.fdnd.nl/api/v1" +
    "/method/" +
    request.params.slug;

  const id = request.query.id;

  fetchJson(detailPageUrl).then((data) => {
    response.render("detail-page", data);
  });
});

// Stappenplan pagina

app.get("/method/:slug/stappenplan", (request, response) => {
  const apiUrl = "https://api.visualthinking.fdnd.nl/api/v1";
  let detailPageUrl = apiUrl + "/method/" + request.params.slug;

  // console.log(1, detailPageUrl);

  fetchJson(detailPageUrl).then((data) => {
    // console.log(2, data);
    const method = data;

    response.render("stappenplan", method);
  });
});

// Voorbeelden pagina

app.get("/method/:slug/voorbeelden", (request, response) => {
  const apiUrl = "https://api.visualthinking.fdnd.nl/api/v1";
  let detailPageUrl = apiUrl + "/method/" + request.params.slug;

  fetchJson(detailPageUrl).then((data) => {
    const method = data;
    response.render("voorbeelden", method);
  });
});

// Comments page

app.get("/method/:slug/form", (request, response) => {
  const baseurl = "https://api.visualthinking.fdnd.nl/api/v1";
  const commentUrl = `${baseurl}comments` + "?id=" + request.query.id;

  let detailPageUrl = baseurl + "/method/" + request.params.slug;

  console.log(1, detailPageUrl);

  fetchJson(detailPageUrl).then((data) => {
    fetchJson(commentUrl).then((data2) => {
      const newdata = { detail: data, form: data2, slug: request.params.slug };
      console.log("DATA", newdata);
      response.render("form", newdata);
    });
  });
});

app.post("/method/:slug/form", (request, response) => {
  const baseurl = "https://api.visualthinking.fdnd.nl/api/v1";
  const url = `${baseurl}comments`;

  postJson(url, request.body).then((data) => {
    let newComment = { ...request.body };

    if (data.success) {
      response.redirect(
        "/method/" + request.params.slug + "/form?id=" + request.body.methodId
      );
    } else {
      const errormessage = `${data.message}: Werkt niet:(`;
      const newdata = { error: errormessage, values: newComment };

      response.render("form", newdata);
    }
  });
});

// Stel het poortnummer in waar express op gaat luisteren
app.set("port", process.env.PORT || 6600);

// Start express op, haal het ingestelde poortnummer op
app.listen(app.get("port"), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get("port")}`);
});

/**
 * Wraps the fetch api and returns the response body parsed through json
 * @param {*} url the api endpoint to address
 * @returns the json response from the api endpoint
 */
async function fetchJson(url) {
  return await fetch(url)
    .then((response) => response.json())
    .catch((error) => error);
}

/**
 * postJson() is a wrapper for the experimental node fetch api. It fetches the url
 * passed as a parameter using the POST method and the value from the body paramater
 * as a payload. It returns the response body parsed through json.
 * @param {*} url the api endpoint to address
 * @param {*} body the payload to send along
 * @returns the json response from the api endpoint
 */
export async function postJson(url, body) {
  return await fetch(url, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .catch((error) => error);
}
