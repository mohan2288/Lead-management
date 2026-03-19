import { Input, Button, Card } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../../styles/Auth.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../services/AuthService";

function Resetpassword() {

  const navigate = useNavigate();

  interface ResetForm {
    password: string;
    confirmPassword: string;
  }

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(6, "Minimum 6 characters required")
      .required("Password is required"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = async (values: ResetForm) => {
    try {

      const resetkey = localStorage.getItem("resetkey");

      if (!resetkey) {
        toast.error("Session expired. Please try again.");
        navigate("/");
        return;
      }

      const payload = {
        resetkey,
        new_password: values.password,
      };

      console.log("Reset Payload:", payload);

      await resetPassword(payload);

      toast.success("Password changed successfully");

      localStorage.removeItem("resetkey");
      localStorage.removeItem("otp_type");

      navigate("/");

    } catch (error: any) {
      console.error(error.response?.data);
      toast.error(
        error?.response?.data?.detail || "Reset password failed"
      );
    }
  };

  return (
    <div className="resetpassword">
      <Card
        title="Reset Password"
        style={{
          width: 400,
          boxShadow: "1px 1px 15px rgba(0,0,0,0.2)",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)"
        }}
      >
        <Formik
          initialValues={{
            password: "",
            confirmPassword: ""
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="flex flex-col gap-4">

            <Field
              name="password"
              as={Input.Password}
              placeholder="New Password"
            />

            <ErrorMessage
              name="password"
              component="div"
              className="signup-error"
            />

            <Field
              name="confirmPassword"
              as={Input.Password}
              placeholder="Confirm Password"
            />

            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="signup-error"
            />

            <Button type="primary" htmlType="submit" block>
              Reset Password
            </Button>

          </Form>
        </Formik>
      </Card>
    </div>
  );
}

export default Resetpassword;