import { Card, Button } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { UpdatePassword } from "../../services/SettingServices";
import TwofactorAuthentication from "../../components/TwofactorAuthentication";


interface PasswordPayload {
  currentpassword: string;
  newpassword: string;
  confirmpassword: string;
}

function Security() {

  const initialValues = {
    currentpassword: "",
    newpassword: "",
    confirmpassword: "",
  };

  const schema = Yup.object({
    currentpassword: Yup.string()
      .min(6, "Minimum 6 characters required")
      .required("Current password is required"),

    newpassword: Yup.string()
      .min(6, "Minimum 6 characters required")
      .required("New password is required"),

    confirmpassword: Yup.string()
      .oneOf([Yup.ref("newpassword")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = async (values: PasswordPayload) => {
    try {
      const payload = {
        Current_Password: values.currentpassword,
        New_Password: values.newpassword,
        Confirm_password: values.confirmpassword,
      };

      const response = await UpdatePassword(payload);
      console.log(response);

      toast.success("Password updated successfully");
    } catch (error: any) {
      toast.error(error.message || "Password update failed");
    }
    
  };

  return (
    <Card title="Security">
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-col gap-4">
          <h1 className="text-base font-semibold">Change Password</h1>
          <div className="flex flex-col gap-3 w-7/12 max-sm:w-full">
          <div className="flex flex-col gap-3">
            <label className="text-sm font-semibold">Current Password</label>
            <Field
            name="currentpassword"
            className="p-3! rounded-2xl"
            style={{background:"var(--body-color)"}}
          />
          <ErrorMessage name="currentpassword" component="div" className="text-red-500 text-sm" />
           </div>
         
          <div className="flex flex-col gap-3">
            <label className="text-sm font-semibold">New Password</label>
             <Field
            name="newpassword"
            className="p-3! rounded-2xl"
             style={{background:"var(--body-color)"}}
          />
          <ErrorMessage name="newpassword" component="div" className="text-red-500 text-sm" />
          </div>
          
           <div className="flex flex-col gap-3">
            <label className="text-sm font-semibold">Confirm Password</label>
               <Field
            name="confirmpassword"
            className="p-3! rounded-2xl"
             style={{background:"var(--body-color)"}}
          />
          <ErrorMessage name="confirmpassword" component="div" className="text-red-500 text-sm" />
           </div>
          </div>
          <div>
            <Button type="primary" htmlType="submit" size="large">
            Update Password
          </Button>
          </div>
          
          <div>
            <TwofactorAuthentication/>
          </div>

        </Form>
      </Formik>
    </Card>
  );
}

export default Security;