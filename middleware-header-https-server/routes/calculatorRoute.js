import { getReqCounter } from "../middlewares/requestCounter.js";

export function admin(req, res) {
  res.json({
    message: `Total number of request count is ${getReqCounter()}`,
  });
}

export function findSum(req, res) {
  let a = +req.query.a;
  let b = +req.query.b;
  let result = a + b;
  res.json({
    answer: result,
  });
}

export function findSub(req, res) {
  let a = parseInt(req.params.a);
  let b = parseInt(req.params.b);
  let result = a - b;
  res.json({
    answer: result,
  });
}

export function findMultiply(req, res) {
  let a = +req.query.a;
  let b = +req.query.b;
  let result = a * b;
  res.json({
    answer: result,
  });
}

export function findDivide(req, res) {
  let a = +req.query.a;
  let b = +req.query.b;
  let result = a / b;
  res.json({
    answer: result,
  });
}
