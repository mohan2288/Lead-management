import { Button } from "antd";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import "../styles/setting.css"

function UpdateProfileForm({ profile, onSubmit }: any) {

  const initialvalue = {
    first_name: profile?.first_name || "",
    last_name: profile?.last_name || "",
    email: profile?.email || "",
    role_id: profile?.role_id || "",
    phone: profile?.phone || "",
  };

  const schema = Yup.object({
    first_name: Yup.string()
      .min(2, "First name must be at least 2 characters")
      .required("First name is required"),

    last_name: Yup.string()
      .min(2, "Last name must be at least 2 characters")
      .required("Last name is required"),

    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    role_id: Yup.string().required("Role is required"),

    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
  });
  return (
    <Formik
      initialValues={initialvalue}
      validationSchema={schema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      <Form>
        <div className=" w-3/5 flex flex-col gap-3 max-sm:w-full">
          <div className="flex w-full gap-5 max-sm:flex-col">
            <div className="flex flex-col w-1/2 gap-2 max-sm:w-full">
              <label className="">First Name</label>
              <Field name="first_name" placeholder="Firstname" className="updateform-inputs" />
              <ErrorMessage name="first_name" component="div" className="updateform-error" />
            </div>

            <div className="flex flex-col w-1/2 gap-2 max-sm:w-full">
              <label>Last Name</label>
              <Field name="last_name" placeholder="Lastname" className="updateform-inputs" />
              <ErrorMessage name="last_name" component="div" className="updateform-error" />
            </div>
          </div>

          <div className="flex flex-col w-full gap-2">
            <label>E-mail</label>
            <Field name="email" placeholder="E-mail" className="updateform-inputs" />
            <ErrorMessage name="email" component="div" className="updateform-error" />
          </div>

          <div className="flex flex-col w-full gap-2">
            <label>Role</label>
            <Field name="role_id" placeholder="Role" className="updateform-inputs" />
            <ErrorMessage name="role_id" component="div" className="updateform-error" />
          </div>

          <div className="flex flex-col w-full gap-2">
            <label>Phone</label>
            <Field name="phone" placeholder="+91 00000 00000" className="updateform-inputs" />
            <ErrorMessage name="phone" component="div" className="updateform-error" />
          </div>
          <div className="w-1/4 max-sm:w-1/2">
           <Button type="primary" htmlType="submit" block>
            Save Changes
          </Button>
          </div>
        </div>
      </Form>
    </Formik>
  );
}

export default UpdateProfileForm;