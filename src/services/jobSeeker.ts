import { AppliedForms } from "../models/AppliedForms";
import { Form } from "../models/Form";
import { Userschema } from "../models/Users";

class jobSeekerService {
  async getFormsByUser(userEmail: string | undefined) {
    try {
      const allForms = await Form.find({}, { applicants: 0, _id: 0 });
      //1. find form by this user is applied or not get those form id form collection applied form
      const appliedForms = await AppliedForms.find({ userEmail: userEmail });
      console.log(appliedForms);
      //combine all form with applied forms and add status with it then send use lookup

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
      const userDetails = await Userschema.findOne(
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
}

export const JobSeekerServices = new jobSeekerService();
