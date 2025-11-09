export function checkTicketType(req, res, next) {
  const ticketType = req.query.ticket;
  const ride = req.url.split("?")[0].split("/")[1];
  if (ticketType == "free") {
    next();
  } else {
    res.status(404).json({
      message: `You don't have any access to enjoy the ${ride}`,
    });
  }
}
