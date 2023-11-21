const aboutModel = require("../models/about_model");
const apiResponse = require("../helpers/apiResponse");
const { validationResult } = require('express-validator');
var mongoose = require("mongoose");


function AboutData(data) {
    this.id = data._id
    this.artist_name = data.artist_name;
    this.resume = data.resume;
    this.photo = data.photo;
    this.email = data.email;
    this.id_user_update = data.id_user_update;
    this.update_date = data.update_date;
}

exports.find = async (req, res) => {
    try {
      // Assuming you want to retrieve all users, not just a single user.
      const about = await aboutModel.find({});
      
      if (about.length > 0) {
        return apiResponse.successResponseWithData(res, "Operation success", about);
      } else {
        return apiResponse.successResponseWithData(res, "Operation success", []);
      }
    } catch (err) {
      // Handle any errors and return an error response.
      return apiResponse.ErrorResponse(res, err);
    }
  };

exports.aboutUpload = async (req, res) => {
    try {
        const errors = validationResult(req);
        var about = new aboutModel({
            id: req.body.id,
            artist_name: req.body.artist_name,
            resume: req.body.resume,
            photo: req.body.photo,
            email: req.body.email,
            id_user_update: req.body.id_user_update,
            update_date: req.body.update_date
        });

        if (!errors.isEmpty()) {
            return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
        } else {
            await about.save();
            let aboutData = new AboutData(about);
            return apiResponse.successResponseWithData(res, "About creation success.", aboutData);
        }
    } catch (err) {
        // Handle any errors that might occur during the save or validation process
        return apiResponse.ErrorResponse(res, err);
    }
};

exports.aboutUpdate = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
      }
  
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid ID");
      }
  
      aboutModel.findById(req.params.id)
        .then(about => {
          if (!about) {
            return apiResponse.notFoundResponse(res, "About not exists with this id");
          }
  
          // Update the about properties
          about.artist_name = req.body.artist_name;
          about.resume = req.body.resume;
          about.photo = req.body.photo;
          about.email = req.body.email;
          about.id_user_update = req.body.id_user_update;
          about.update_date = req.body.update_data;
  
          // Save the updated about
          about.save()
            .then(updatedAbout => {
              let aboutData = new AboutData(updatedAbout);
              return apiResponse.successResponseWithData(res, "About updated Success.", aboutData);
            })
            .catch(err => {
              return apiResponse.ErrorResponse(res, err);
            });
        })
        .catch(err => {
          return apiResponse.ErrorResponse(res, err);
        });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  };
  
