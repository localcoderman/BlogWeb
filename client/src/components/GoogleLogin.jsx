import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, signInWithRedirect } from "firebase/auth";
import { Auth, provider } from "@/helpers/FireBase";
import { useNavigate } from "react-router-dom";
import { RouteIndex, RouteSignup } from "@/helpers/RouteName";
import { showToast } from "@/helpers/ShowToast";
import { getenv } from "@/helpers/GetEnv";
import axios from "axios";

const GoogleLogin = () => {
  const navigate = useNavigate();
  const handleLogin = async () => {
    const googleResponse = await signInWithPopup(Auth, provider);
    const user = googleResponse.user;
    const bodyData = {
      name: user.displayName,
      email: user.email,
      avatar: user.photoURL,
    };

    try {
      const response = await axios.post(
        `${getenv("VITE_API_BASE_URL")}/auth/google-login`,
        bodyData,
      );

      if (response.status === 200) {
        const data = response.data;
        showToast("success", data.message);
        setTimeout(() => {
          navigate(RouteIndex);
        }, 500);
        return;
      }
    } catch (apiError) {
      console.error("API Error:", apiError);
      const error = apiError.response?.data?.message || "Something went wrong";
      showToast("error", error);
    }
  };

  return (
    <Button variant="outline" className="w-full" onClick={handleLogin}>
      <FcGoogle />
      Continue With Google
    </Button>
  );
};

export default GoogleLogin;
