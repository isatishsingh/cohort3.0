export function checkAge(req, res, next) {
  const userAge = req.query.age;
  const ride = req.url.split("?")[0].split("/")[1];
  if (userAge >= 18 && userAge < 60) {
    next();
  } else {
    res.status(404).json({
      message: `You're not eligible for the ${ride}`,
    });
  }
}
