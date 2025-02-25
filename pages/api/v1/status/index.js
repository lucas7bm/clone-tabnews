import database from "../../../../infra/database.js";

async function status(request, response) {
  const result = await database.query("SELECT 1+1 as sum;");
  console.log(result.rows);
  response
    .status(200)
    .json({ chave: "aeHOOOO, retorno bão dessa API hein, xará?" });
}

export default status;
