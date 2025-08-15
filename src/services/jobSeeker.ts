import { AppliedForms } from "../models/AppliedForms";
import { Form } from "../models/Form";
import { UsersModel } from "../models/Users";

class jobSeekerService {
  async getAllForm(userEmail: string) {
    //get user id (job seeker) based on email
    const userDetails = await UsersModel.findOne(
      { userEmail: userEmail },
      { userID: 1, _id: 0 }
    );

    try {
      /// find data from appliedforms based on user-id
      const allForms = await Form.aggregate([
        {
          $lookup: {
            from: "appliedforms",
            let: { formID: "$formID", jobSeekerID: userDetails?.userID },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$formID", "$$formID"] },
                      { $eq: ["$userID", "$$jobSeekerID"] },
                    ],
                  },
                },
              },
            ],
            as: "appliedData",
          },
        },
        {
          $addFields: {
            applied: { $gt: [{ $size: "$appliedData" }, 0] },
          },
        },
        {
          $project: {
            _id: 0,
            formID: 1,
            company: 1,
            role: 1,
            jobType: 1,
            location: 1,
            date: 1,
            status: 1,
            notes: 1,
            applied: 1,
          },
        },
      ]);
      ///
      return allForms;
    } catch (error) {
      console.log(error);
    }
  }

  async applyForm(userEmail: string | undefined, formID: string) {
    if (userEmail && formID) {
      //find company id by form
      const companyDetails = await Form.findOne(
        { formID: formID },
        { companyID: 1, _id: 0 }
      );
      //get user id (job seeker) based on email
      const userDetails = await UsersModel.findOne(
        { userEmail: userEmail },
        { userID: 1, _id: 0 }
      );

      const checkForAppliedForm = (
        userID: string | undefined,
        formID: string
      ) => {
        //1 check by this user id and form id
        const check = async () => {
          const data = await AppliedForms.find({
            userID: userID,
            formID: formID,
          });
          if (data.length === 0) return false;
          else return true;
        };
        return check();
      };

      const isApplied = await checkForAppliedForm(userDetails?.userID, formID);
      try {
        if (!isApplied) {
          const data = {
            userID: userDetails?.userID,
            userEmail: userEmail,
            formID: formID,
            companyID: companyDetails?.companyID,
          };
          await AppliedForms.create(data);
          return { message: "You have applied this job succesfully !" };
        } else return { message: "You have allready appied this form !" };
      } catch (error) {
        console.log(error);
      }
    }
  }

  //get header details for emplyeer
  async getUserDetails(userMail: string) {
    try {
      const companyDetails = await UsersModel.findOne(
        { userEmail: userMail },
        { userName: 1 }
      );
      return companyDetails?.userName;
    } catch (error) {
      console.log(error);
    }
  }

  //get applied from numbers
  async getAppliedFormNumbers(userMail: string) {
    try {
      const appliedFormDetails = await AppliedForms.find({
        userEmail: userMail,
      });
      return appliedFormDetails.length;
    } catch (error) {
      console.log(error);
    }
  }
  //get form details by form id
  async getFormDetails(formID: string) {
    try {
      const companyID = await Form.findOne(
        { formID: formID },
        { companyID: 1 }
      );
      const companyDetails = await UsersModel.findOne(
        {
          userID: companyID?.companyID,
        },
        { userName: 1 }
      );
      const formData = await Form.findOne(
        { formID: formID },
        { companyID: 0, _id: 0 }
      );
      const formDetails = { companyDetails, formData };

      return formDetails;
    } catch (error) {
      console.log(error);
    }
  }
}

export const JobSeekerServices = new jobSeekerService();
