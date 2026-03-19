import { Link } from "react-router-dom";
import { Card, Button } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "../../styles/Auth.css";
import { loginUser } from "../../services/AuthService";
import { toast } from "react-toastify";

function Login() {

  const navigate = useNavigate();

  interface Login {
    email: string;
    password: string;
  }

  const validationSchema = Yup.object({
    email: Yup.string().required("username or email required"),
    password: Yup.string()
      .min(3, "minimum 6 character required")
      .required("Required"),
  });

  const handleSubmit = async (values: Login) => {
    try {

      const payload = {
        username_or_email: values.email,
        password: values.password,
      };

      const response = await loginUser(payload);

      console.log(response);
      if (response.two_factor_enabled) {

        toast.info("OTP sent to your email");
        localStorage.setItem("otp_email", values.email);

        navigate("/otpverify");

      } else {

        toast.success("Logged in successfully");
        navigate("/dashboard");

      }

    } catch (error: any) {
      toast.error(error?.response?.data?.detail || "Login failed");
    }
  };

  return (
    <div className="login">
      <Card
        style={{
          width: 400,
          padding: 1,
          boxShadow: "1px 1px 15px rgba(0,0,0,0.2)",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <h1 className="text-center text-2xl">Login Form</h1>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="login-form flex flex-col gap-5 my-10">

            <Field
              name="email"
              placeholder="Username or Email"
              className="login-inputs"
            />
            <ErrorMessage name="email" component="div" className="login-error" />

            <Field
              name="password"
              type="password"
              placeholder="Password"
              className="login-inputs"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="login-error"
            />

            <Button type="primary" htmlType="submit" block>
              Login
            </Button>

            <p
              onClick={() => navigate("/forgetpassword")}
              className="text-center cursor-pointer"
            >
              Forget Password?
            </p>

            <p className="text-center cursor-pointer">
              Don't have an account?
              <Link to="/signup">Signup</Link>
            </p>

          </Form>
        </Formik>
      </Card>
    </div>
  );
}

export default Login;