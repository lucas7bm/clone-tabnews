function status(request, response) {
  response
    .status(200)
    .json({ chave: "aeHOOOO, retorno bão dessa API hein, xará?" });
}

export default status;
