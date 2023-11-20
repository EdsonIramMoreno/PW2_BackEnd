const social_mediaModel = require("../models/social_media_model");
const apiResponse = require("../helpers/apiResponse");
const { validationResult } = require('express-validator');
var mongoose = require("mongoose");


function SocialMediaData(data) {
    this.id = data._id
    this.name = data.name;
    this.url = data.url;
    this.icon = data.icon;
    this.id_user_creation = data.id_user_creation;
    this.creation_date = data.creation_date;
    this.id_user_update = data.id_user_update;
    this.update_date = data.update_date;
    this.isActive = data.isActive;
}

exports.findAll = async (req, res) => {
    try {
      // Assuming you want to retrieve all users, not just a single user.
      const sMedia = await social_mediaModel.find({});
      
      if (sMedia.length > 0) {
        return apiResponse.successResponseWithData(res, "Operation success", sMedia);
      } else {
        return apiResponse.successResponseWithData(res, "Operation success", []);
      }
    } catch (err) {
      // Handle any errors and return an error response.
      return apiResponse.ErrorResponse(res, err);
    }
  };

exports.social_media_Upload = async (req, res) => {
    try {
        const errors = validationResult(req);
        var sMedia = new social_mediaModel({
            name: req.body.name,
            url: req.body.url,
            icon: req.body.icon,
            id_user_creation: req.body.title,
            creation_date: req.body.creation_date,
            id_user_update: req.body.id_user_update,
            update_date: req.body.update_date,
            isActive: req.body.isActive
        });

        if (!errors.isEmpty()) {
            return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
        } else {
            await sMedia.save();
            let sMediaData = new SocialMediaData(sMedia);
            return apiResponse.successResponseWithData(res, "Social Media creation success.", sMediaData);
        }
    } catch (err) {
        // Handle any errors that might occur during the save or validation process
        return apiResponse.ErrorResponse(res, err);
    }
};

exports.social_media_Update = async (req, res) => {
  try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
      } else {
          if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
              return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid ID");
          } else {
            social_mediaModel.findById(req.params.id)
                  .then(sMedia => {
                      if (!sMedia) {
                          return apiResponse.notFoundResponse(res, "Social Media not exists with this id");
                      }
                      // Update the 
                      sMedia.name = req.body.name;
                      sMedia.url = req.body.url;
                      sMedia.icon = req.body.icon;
                      sMedia.id_user_creation = req.body.id_user_creation;
                      sMedia.id_user_update = req.body.id_user_update;
                      sMedia.creation_date = req.body.creation_date;
                      sMedia.update_date = req.body.creation_date;
                      sMedia.isActive = req.body.isActive;
                      sMedia.save()
                          .then(updatedsMedia => {
                              let sMediaData = new SocialMediaData(updatedsMedia);
                              return apiResponse.successResponseWithData(res, "SocialMedia updated Success.", sMediaData);
                          })
                          .catch(err => {
                              return apiResponse.ErrorResponse(res, err);
                          });
                  })
                  .catch(err => {
                      return apiResponse.ErrorResponse(res, err);
                  });
          }
      }
  } catch (err) {
      return apiResponse.ErrorResponse(res, err);
  }
};
