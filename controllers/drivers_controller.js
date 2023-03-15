const Driver = require("../models/driver");

module.exports = {
  greetings(req, res) {
    res.send({ hi: "there" });
  },

  index(req, res, next) {
    const { lng, lat } = req.query;
    const point = {
      type: "Point",
      coordinates: [parseFloat(lng), parseFloat(lat)],
    };
    Driver.aggregate([
      {
        $geoNear: {
          near: point,
          spherical: true,
          maxDistance: 200000,
          distanceField: "dist.calculated",
        },
      },
    ])
      .then((drivers) => {
        res.send(drivers);
      })
      .catch(next);
  },

  create(req, res, next) {
    const driverProps = req.body;
    Driver.create(driverProps)
      .then((driver) => res.send(driver))
      .catch(next);
  },

  edit(req, res, next) {
    const driverId = req.params.id;
    const driverProps = req.body;

    Driver.findByIdAndUpdate({ _id: driverId }, driverProps).then(() =>
      Driver.findById({ _id: driverId })
        .then((driver) => res.send(driver))
        .catch(next)
    );
  },

  delete(req, res, next) {
    const driveId = req.params.id;
    Driver.findByIdAndRemove({ _id: driveId }).then((driver) =>
      res.status(204).send(driver)
    );
  },
};
