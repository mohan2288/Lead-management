import { Input, Button, Card } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../../styles/Auth.css";
import { verifyOTP, resendOTP } from "../../services/AuthService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function OTPverification() {
  const navigate = useNavigate();
  const [resendDisabled, setResendDisabled] = useState(true);
  const [timer, setTimer] = useState(45);

  interface OTPFormValues {
    otp: string;
  }

  const validationSchema = Yup.object({
    otp: Yup.string()
      .matches(/^[0-9]{6}$/, "OTP must be 6 digits")
      .required("OTP is required"),
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (resendDisabled) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setResendDisabled(false);
            return 45;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [resendDisabled]);

  const handleSubmit = async (values: OTPFormValues) => {
    try {
      const otpType = localStorage.getItem("otp_type");
      const resetkey = localStorage.getItem("resetkey");

      if (!resetkey) {
        toast.error("Session expired. Please try again.");
        return;
      }

      const payload = {
        resetkey,
        otp: Number(values.otp),
      };

      console.log("OTP Payload:", payload);

      await verifyOTP(payload);

      if (otpType === "reset") {
        toast.success("OTP verified");
        navigate("/resetpassword");
      } else if (otpType === "login") {
        toast.success("Login successful");
        navigate("/dashboard");
      } else {
        toast.error("Invalid session. Please try again.");
        navigate("/");
      }
    } catch (error: any) {
      console.error(error.response?.data);
      toast.error(
        error?.response?.data?.detail || "OTP verification failed"
      );
    }
  };
  const handleResend = async () => {
    try {
      const resetkey = localStorage.getItem("resetkey");

      if (!resetkey) {
        toast.error("Session expired. Please try again.");
        return;
      }

      const payload = { resetkey };

      console.log("Resend Payload:", payload);

      await resendOTP(payload);

      toast.success("OTP resent successfully");

      setResendDisabled(true);
      setTimer(45);
    } catch (error: any) {
      console.error(error.response?.data);
      toast.error(
        error.response?.data?.detail || "Failed to resend OTP"
      );
    }
  };

  return (
    <div className="otp">
      <Card
        title="OTP Verification"
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
          initialValues={{ otp: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="flex flex-col gap-4">
            <Field
              name="otp"
              as={Input}
              placeholder="Enter OTP"
              maxLength={6}
            />

            <ErrorMessage
              name="otp"
              component="div"
              className="signup-error"
            />

            <Button type="primary" htmlType="submit" block>
              Verify OTP
            </Button>

            <Button
              type="default"
              block
              onClick={handleResend}
              disabled={resendDisabled}
            >
              {resendDisabled
                ? `Resend OTP in ${timer}s`
                : "Resend OTP"}
            </Button>
          </Form>
        </Formik>
      </Card>
    </div>
  );
}

export default OTPverification;