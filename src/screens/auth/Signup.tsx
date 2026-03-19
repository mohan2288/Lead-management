import { Card, Button } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "../../styles/Auth.css";
import { toast } from "react-toastify";
import {signupUser} from "../../services/AuthService"

interface Signup {
  username:string,
  first_name: string,
  last_name: string,
  email: string,
  password: string
}


function Signup() {
  const navigate = useNavigate();

  const handleSubmit = async (values:Signup)=>{
    try{
      console.log(values)
      const response = await signupUser(values);
      toast.success('signup successfull')
      console.log(response)
      navigate('/')
    }
    catch (error:any){
      console.log(error)
        toast.error(error.message||"signup failed")
    }
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Minimum 3 characters")
      .required("Username is required"),

    first_name: Yup.string()
      .min(2, "Minimum 2 characters")
      .required("First name is required"),

    last_name: Yup.string()
      .min(2, "Minimum 2 characters")
      .required("Last name is required"),

    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    password: Yup.string()
      .min(6, "Minimum 6 characters required")
      .required("Password is required"),

  
  });
  return (
    <div className="signup">
      <Card
        style={{
          width: 400,
          padding: 10,
          boxShadow: "1px 1px 15px rgba(0,0,0,0.2)",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <h1 className="text-2xl text-center">Signup</h1>

        <Formik
          initialValues={{
            username: "",
            first_name: "",
            last_name: "",
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="login-form flex flex-col gap-5 my-10">
            <Field name="username" placeholder="Username" className="signup-inputs" maxLength={10}/>
            <ErrorMessage name="username" component="div" className="signup-error" />

            <Field name="first_name" placeholder="First Name" className="signup-inputs " />
            <ErrorMessage name="first_name" component="div" className="signup-error" />

            <Field name="last_name" placeholder="Last Name" className="signup-inputs" />
            <ErrorMessage name="last_name" component="div" className="signup-error" />

            <Field name="email" placeholder="Email" className="signup-inputs" />
            <ErrorMessage name="email" component="div" className="signup-error" />

            <Field
              name="password"
              type="password"
              placeholder="Password"
              className="signup-inputs"
            />
            <ErrorMessage name="password" component="div" className="signup-error" />
           


            <Button type="primary" htmlType="submit" block>
              Signup
            </Button>
          </Form>
        </Formik>
      </Card>
    </div>
  );
}

export default Signup;