const userModel = require("../models/user_model");
const apiResponse = require("../helpers/apiResponse");
const { validationResult } = require('express-validator');

function UserData(data) {
  this.id = data._id
	this.email = data.email;
	this.pwd = data.pwd;
  this.isActive = data.isActive;
}

// Retrieve all user data from the database.
exports.findAll = async (req, res) => {
  try {
    // Assuming you want to retrieve all users, not just a single user.
    const users = await userModel.find({});
    
    if (users.length > 0) {
      return apiResponse.successResponseWithData(res, "Operation success", users);
    } else {
      return apiResponse.successResponseWithData(res, "Operation success", []);
    }
  } catch (err) {
    // Handle any errors and return an error response.
    return apiResponse.ErrorResponse(res, err);
  }
};

exports.userRegister = async (req, res) => {
    try {
        const errors = validationResult(req);
        var user = new userModel({
            email: req.body.email,
            pwd: req.body.pwd,
            isActive: req.body.isActive
        });

        if (!errors.isEmpty()) {
            return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
        } else {
            // Save user using await directly
            await user.save();
            let userData = new UserData(user);
            return apiResponse.successResponseWithData(res, "User registration success.", userData);
        }
    } catch (err) {
        // Handle any errors that might occur during the save or validation process
        return apiResponse.ErrorResponse(res, err);
    }
};

exports.userLogin = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
				await userModel.findOne({email : req.body.email, pwd : req.body.pwd}).then(user => {
					if (user) {
						return apiResponse.successResponseWithData(res,"Login Success.", user);
					}
					else{
						return apiResponse.unauthorizedResponse(res, "Email or Password wrong.");
					}
				});
			}
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
};
