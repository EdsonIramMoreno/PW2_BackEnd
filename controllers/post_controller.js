const postModel = require("../models/post_model");
const apiResponse = require("../helpers/apiResponse");
const { validationResult } = require('express-validator');
var mongoose = require("mongoose");


function PostData(data) {
    this.id = data._id
    this.title = data.title;
    this.desc = data.title;
    this.photo = data.photo;
    this.id_user_creation = data.id_user_creation;
    this.creation_date = data.creation_date;
    this.id_user_update = data.id_user_update;
    this.update_date = data.update_date;
    this.isActive = data.isActive;
}

exports.findAll = async (req, res) => {
    try {
      // Assuming you want to retrieve all users, not just a single user.
      const posts = await postModel.find({});
      
      if (posts.length > 0) {
        return apiResponse.successResponseWithData(res, "Operation success", posts);
      } else {
        return apiResponse.successResponseWithData(res, "Operation success", []);
      }
    } catch (err) {
      // Handle any errors and return an error response.
      return apiResponse.ErrorResponse(res, err);
    }
  };

exports.postUpload = async (req, res) => {
    try {

        
        const errors = validationResult(req);
        var post = new postModel({
            title: req.body.title,
            photo: req.body.photo,
            desc: req.body.desc,
            id_user_creation: req.body.id_user_creation,
            creation_date: req.body.creation_date,
            id_user_update: req.body.id_user_update,
            update_date: req.body.update_date,
            isActive: req.body.isActive
        });



        if (!errors.isEmpty()) {
            return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
        } else {
            await post.save();
            let postData = new PostData(post);
            return apiResponse.successResponseWithData(res, "Post creation success.", postData);
        }
    } catch (err) {
        // Handle any errors that might occur during the save or validation process
        return apiResponse.ErrorResponse(res, err);
    }
};

exports.postUpdate = async (req, res) => {
  try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
      } else {
          if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
              return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid ID");
          } else {
              postModel.findById(req.params.id)
                  .then(post => {
                      if (!post) {
                          return apiResponse.notFoundResponse(res, "Post not exists with this id");
                      }
                      // Update the post
                      post.title = req.body.title;
                      post.desc = req.body.desc;
                      post.photo = req.body.photo;
                      post.id_user_creation = req.body.id_user_creation;
                      post.id_user_update = req.body.id_user_update;
                      post.creation_date = req.body.creation_date;
                      post.update_date = req.body.creation_date;
                      post.isActive = req.body.isActive;
                      post.save()
                          .then(updatedPost => {
                              let postData = new PostData(updatedPost);
                              return apiResponse.successResponseWithData(res, "Post updated Success.", postData);
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
