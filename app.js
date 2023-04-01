// Importeer express uit de node_modules map
import express from "express";

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

// Maak een route voor de index
app.get("/", async (req, res) => {
  let data = await fetch(url).then((response) => response.json());

  // filter data als req.params.blah
  if (false) {
    let categorie = "Leren over anderen";

    data.methods = data.methods.filter((method) => {
      return (
        method.categories.find((category) => {
          return category.title == categorie;
        }) !== undefined
      );
    });
  }
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

// Stel het poortnummer in waar express op gaat luisteren
app.set("port", process.env.PORT || 6500);

// Start express op, haal het ingestelde poortnummer op
app.listen(app.get("port"), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get("port")}`);
});

// **
//  * Wraps the fetch api and returns the response body parsed through json
//  * @param {*} url the api endpoint to address
//  * @returns the json response from the api endpoint
//  */
async function fetchJson(url) {
  return await fetch(url)
    .then((response) => response.json())
    .catch((error) => error);
}
