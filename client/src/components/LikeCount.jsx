import { getenv } from "@/helpers/GetEnv";
import { showToast } from "@/helpers/ShowToast";
import { useAxios } from "@/hooks/useAiox";
import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";

const axiosOptions = { withCredentials: true };

const LikeCount = ({ props }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  const user = useSelector((state) => state.user?.user);

  // 1. URL banayein aur ensure karein ke Redux load hone par hi ID lagay
  const apiUrl = useMemo(() => {
    if (user?.isLoggedIn && user?.user?._id) {
      return `${getenv("VITE_API_BASE_URL")}/blog-like/get-like/${props.blogid}/${user.user._id}`;
    }
    return `${getenv("VITE_API_BASE_URL")}/blog-like/get-like/${props.blogid}`;
  }, [user?.isLoggedIn, user?.user?._id, props.blogid]);

  // Hook se initial data fetch karein
  const { data: bloglikeCount } = useAxios(apiUrl, axiosOptions, [apiUrl]);

  // 2. Sirf page load/refresh par backend se data set karein
  useEffect(() => {
    if (bloglikeCount) {
      setLikeCount(bloglikeCount.likeCount ?? 0);
      setHasLiked(!!bloglikeCount.isuserLiked);
    }
  }, [bloglikeCount]);

  // 3. Click handle bina kisi page refresh ke aur bina counting kharab kiye
  const handleLike = async () => {
    if (!user?.isLoggedIn) {
      return showToast("error", "Please login into your Account");
    }

    // Pehle hi UI badal dein taake user ko response instant mile
    const currentlyLiked = hasLiked;
    setHasLiked(!currentlyLiked);
    setLikeCount((prev) => (currentlyLiked ? prev - 1 : prev + 1));

    try {
      const data = { user: user.user._id, blogid: props.blogid };
      
      const response = await axios.post(
        `${getenv("VITE_API_BASE_URL")}/blog-like/like`,
        data,
        { withCredentials: true }
      );

      // Agar backend response de de, to exact wahi count set karein jo DB mein hai
      if (response.status === 200 && response.data) {
        setLikeCount(response.data.likeCount);
      }
    } catch (error) {
      // Agar API fail ho to purani state wapas le aayein
      setHasLiked(currentlyLiked);
      setLikeCount((prev) => (currentlyLiked ? prev + 1 : prev - 1));
      showToast("error", "Failed to update like");
    }
  };

  return (
    <button
      onClick={handleLike}
      type="button"
      className="flex justify-between items-center gap-2"
    >
      {hasLiked ? <FaHeart className="text-red-600" /> : <FaRegHeart />}
      <span>{likeCount}</span>
    </button>
  );
};

export default LikeCount;