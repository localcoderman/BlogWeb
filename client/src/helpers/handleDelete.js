import axios from "axios";

export const handleDelete = async (endpoint) => {
  const confirmDelete = confirm("Are you sure to delete this data?");
  if (!confirmDelete) return false;

  try {
    const response = await axios.delete(endpoint,{withCredentials:true});
    
    if (response.status === 200) {
      return { success: true, data: response.data };
    }
    
    return { success: false, message: "Something went Wrong" };
  } catch (error) {
    console.error("Delete Error:", error);
    return { 
      success: false, 
      message: error.response?.data?.message || "Server error!" 
    };
  }
};