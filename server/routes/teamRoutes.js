module.exports = app => {
  app.get("/api/teams", (req, res) => {
    console.log(req.query);
    res.send(req.query);
  });
};
