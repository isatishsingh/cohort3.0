export function logRequest(req, res, next) {
  const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
}