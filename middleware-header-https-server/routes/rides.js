export function ride1(req, res) {
  res.status(200).send(`enjoy the ${req.url.split("?")[0].split("/")[1]}`);
}

export function ride2(req, res) {
  res.status(200).send(`enjoy the ${req.url.split("?")[0].split("/")[1]}`);
}

export function ride3(req, res) {
  res.status(200).send(`enjoy the ${req.url.split("?")[0].split("/")[1]}`);
}