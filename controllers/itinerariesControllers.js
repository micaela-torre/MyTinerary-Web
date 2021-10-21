const Itinerary = require("../models/Itinerary");
const itinerariesControllers = {
  getItineraries: async (req, res) => {
    try {
      var itineraries = await Itinerary.find();
      if (itineraries.length) {
        res.json({ success: true, response: itineraries });
      } else {
        throw new Error("Itineraries not Found");
      }
    } catch (error) {
      res.json({ success: false, response: error });
      console.log(error);
    }
  },
  getItinerary: async (req, res) => {
    try {
      var itinerary = await Itinerary.findOne({ _id: req.params.id });
      if (itinerary) {
        res.json({ success: true, response: itinerary });
      } else {
        throw new Error();
      }
    } catch (error) {
      res.json({ success: false, response: error });
    }
  },
  getItinerariesByCity: async (req, res) => {
    try {
      var itinerariesByCity = await Itinerary.find({
        cityId: req.params.cityId,
      });
      res.json({ success: true, response: itinerariesByCity });
    } catch (e) {
      res.json({ success: false, response: e });
    }
  },

  addNewItinerary: (req, res) => {
    const newItinerary = new Itinerary({
      name: req.body.name,
      author: req.body.author,
      description: req.body.description,
      hashtag: req.body.hashtag,
      likes: req.body.likes,
      price: req.body.price,
      duration: req.body.duration,
      includes: req.body.includes,
      comments: req.body.comments,
    });
    newItinerary
      .save()
      .then(() => res.json({ success: true }))
      .catch((error) => res.json({ success: false, response: error }));
  },
  deleteItinerary: (req, res) => {
    Itinerary.findOneAndDelete({ _id: req.params.id })
      .then(() => res.json({ success: true }))
      .catch((error) => res.json({ success: false, response: error }));
  },
  modifyProp: (req, res) => {
    Itinerary.findOneAndUpdate({ _id: req.params.id }, { ...req.body })
      .then(() => res.json({ success: true }))
      .catch((error) => res.json({ success: false, response: error }));
  },

  putLike: async (req, res) => {
    try {
      let itinerary = await Itinerary.findOne({ _id: req.params.id });
      if (itinerary.likes.includes(req.user._id)) {
        let dontLike = await Itinerary.findOneAndUpdate(
          { _id: req.params.id },
          { $pull: { likes: req.user._id } },
          { new: true }
        );
        res.json({ succes: true, response: dontLike.likes });
      } else {
        let like = await Itinerary.findOneAndUpdate(
          { _id: req.params.id },
          { $push: { likes: req.user._id } },
          { new: true }
        );
        res.json({ success: true, response: like.likes });
      }
    } catch (e) {
      console.log(e);
    }
  },

  addComment: async (req, res) => {
    try {
      if(!req.body.id) {
        let resp = await Itinerary.findOneAndUpdate(
          { _id: req.params.id },
          { $push: { comments: req.body.comments} }
          )
          res.json({ success: true, response: resp.comments });
      } else {
        let resp = await Itinerary.findOneAndUpdate(
          { _id: req.params.id },
          { $pull: { comments: req.body.comments} }
          )
          res.json({ success: true, response: resp });
      }
      } catch (err) {
      res.json({ success: false, response: err });
    }
  },
  deleteComment: async(req, res) => {
    await Itinerary.findOneAndDelete({ _id: req.params.id })
  }
};
module.exports = itinerariesControllers;
