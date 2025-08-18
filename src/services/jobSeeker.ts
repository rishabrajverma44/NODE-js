import { AppliedForms } from "../models/AppliedForms";
import { Form } from "../models/Form";
import { UsersModel } from "../models/Users";
import { PaginationRequest } from "../types";

class jobSeekerService {
  async getAllForm(reqest: PaginationRequest) {
    // get user id (job seeker) based on email
    const Email = reqest.Email;
    const search = reqest.search;
    const filters = reqest.filters;
    const page = reqest.page;
    const size = reqest.size;
    const userDetails = await UsersModel.findOne(
      { userEmail: Email },
      { userID: 1, _id: 0 }
    );

    try {
      const matchStage: any = {};
      //Search by text (role, company, location)
      if (search) {
        matchStage.$or = [
          { role: { $regex: search, $options: "i" } },
          { company: { $regex: search, $options: "i" } },
          { location: { $regex: search, $options: "i" } },
        ];
      }

      //  Apply filters dynamically
      if (filters) {
        Object.keys(filters).forEach((key) => {
          matchStage[key] = filters[key];
        });
      }

      const skip = (page - 1) * size;

      const allForms = await Form.aggregate([
        // Apply search & filter conditions
        { $match: matchStage },

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
            updatedAt: 1,
          },
        },

        { $sort: { updatedAt: -1 } },

        // Pagination for infinite scroll
        { $skip: skip },
        { $limit: size },
      ]);

      const totalCount = await Form.countDocuments(matchStage);

      return {
        data: allForms,
        page,
        size,
        total: totalCount,
        hasMore: skip + size < totalCount,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  //get apply form by user-email
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
        // check by this user id and form id
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

  //get apply form by user-email
  async isAppliedCkeck(userEmail: string | undefined, formID: string) {
    if (userEmail && formID) {
      //get user id (job seeker) based on email
      const userDetails = await UsersModel.findOne(
        { userEmail: userEmail },
        { userID: 1, _id: 0 }
      );

      const checkForAppliedForm = (
        userID: string | undefined,
        formID: string
      ) => {
        // check by this user id and form id
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
      return isApplied;
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

  //get get Numbers Of Form Applied by user email
  async getNumbersOfFormApplied(userMail: string) {
    try {
      const appliedFormDetails = await AppliedForms.find({
        userEmail: userMail,
      });
      return appliedFormDetails.length;
    } catch (error) {
      console.log(error);
    }
  }

  //get All Applied Form by user base on email id
  async getAppliedForms(userMail: string) {
    try {
      const appliedFormDetails = await AppliedForms.find(
        {
          userEmail: userMail,
        },
        {
          formID: 1,
          _id: 0,
        }
      );
      const formIDs = appliedFormDetails.map((form) => form.formID);

      const forms = await Form.find(
        { formID: { $in: formIDs } },
        { _id: 0 },
        { $sort: { updatedAt: -1 } }
      );

      return forms;
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
        { userName: 1, _id: 0 }
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
