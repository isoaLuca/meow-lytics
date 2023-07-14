const Event = require("../models/Event");

async function trackEvent(req, res) {
  try {
    const { eventType, eventData, userId } = req.body;

    if (!eventType || !eventData || !userId) {
      return res
        .status(400)
        .send({ error: "eventType, eventData and userId are required." });
    }

    const event = await Event.create({
      eventType,
      eventData,
      userId,
    });

    res.status(201).send(event);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Something went wrong." });
  }
}

module.exports = {
  trackEvent,
};
