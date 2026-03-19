import { Input, Button, Card } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../../styles/Auth.css";
import { useNavigate } from "react-router-dom"; 
import { toast } from "react-toastify";
import { forgotPassword } from "../../services/AuthService";

function ForgetPassword() {

  interface forgetPasswordPayload{
      email: string,
  }

  const navigate = useNavigate()

  const Schema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

   const handleSubmit = async (values:forgetPasswordPayload) => {
  try {

    const response = await forgotPassword(values);

    localStorage.setItem("resetkey",response.resetkey)
    localStorage.setItem("otp_type", "reset");

    toast.success("OTP sent to your email");

    navigate("/otp");

  } catch (error: any) {

    console.log(error);

    toast.error(error?.response?.data?.message || "Failed to send reset link");
  }
};
  return (
    <div className="forgetpassword">
      <Card
        title="Forgot Password"
        style={{
          width: 400,
          textAlign: "center",
          boxShadow: "1px 1px 15px rgba(0,0,0,0.2)",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <Formik
          initialValues={{ email: "" }}
          validationSchema={Schema}
          onSubmit={handleSubmit}
        >
          {({isSubmitting})=>(
           <Form className="flex flex-col gap-4">

            <Field
              name="email"
              as={Input}
              placeholder="Enter email"
            />

            <ErrorMessage
              name="email"
              component="div"
              className="forgot-error"
            />

            <Button type="primary" htmlType="submit" loading={isSubmitting} block>
              Send OTP
            </Button>
          </Form>)} 
        </Formik>
      </Card>
    </div>
  );
}

export default ForgetPassword;