const mediaModel = require("../models/media_model");
const apiResponse = require("../helpers/apiResponse");
const { validationResult } = require('express-validator');
var mongoose = require("mongoose");

function MediaData(data) {
    this.id = data._id
	this.title = data.title;
	this.url = data.url;
    this.id_user_creation = data.id_user_creation;
    this.creation_date = data.creation_date;
    this.id_user_update = data.id_user_update;
    this.update_date = data.update_date;
    this.isActive = data.isActive;
}

// Retrieve all user data from the database.
exports.findAll = async (req, res) => {
  try {
    // Assuming you want to retrieve all users, not just a single user.
    const media = await mediaModel.find({});
    
    if (media.length > 0) {
      return apiResponse.successResponseWithData(res, "Operation success", media);
    } else {
      return apiResponse.successResponseWithData(res, "Operation success", []);
    }
  } catch (err) {
    // Handle any errors and return an error response.
    return apiResponse.ErrorResponse(res, err);
  }
};

exports.mediaCreation = async (req, res) => {
    try {
        const errors = validationResult(req);
        var media = new mediaModel({
            id: req.body.id,
            title: req.body.title,
            url: req.body.url,
            id_user_creation: req.body.title,
            creation_date: req.body.creation_date,
            id_user_update: req.body.id_user_update,
            update_date: req.body.update_date,
            isActive: req.body.isActive
        });

        if (!errors.isEmpty()) {
            return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
        } else {
            // Save user using await directly
            await media.save();
            let mediaData = new MediaData(media);
            return apiResponse.successResponseWithData(res, "User registration success.", mediaData);
        }
    } catch (err) {
        // Handle any errors that might occur during the save or validation process
        return apiResponse.ErrorResponse(res, err);
    }
};

exports.mediaUpdate = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
        } else {
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid ID");
            } else {
                mediaModel.findById(req.params.id)
                    .then(media => {
                        if (!media) {
                            return apiResponse.notFoundResponse(res, "Media not exists with this id");
                        }
                        // Update the post
                        media.title = req.body.title;
                        media.url = req.body.url;
                        media.id_user_creation = req.body.id_user_creation;
                        media.id_user_update = req.body.id_user_update;
                        media.creation_date = req.body.creation_date;
                        media.update_date = req.body.creation_date;
                        media.isActive = req.body.isActive;
                        media.save()
                            .then(updatedMedia => {
                                let mediaData = new MediaData(updatedMedia);
                                return apiResponse.successResponseWithData(res, "Media updated Success.", mediaData);
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
  