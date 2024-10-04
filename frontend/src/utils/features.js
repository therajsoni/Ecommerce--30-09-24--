import toast from "react-hot-toast";

export const responseToast = (res, navigate, url) => {
  if (res?.data) { // Checking if the response has a `data` field
    toast.success(res.data.message); // Success toast
    if (navigate) navigate(url); // Navigate if the navigate function and URL are provided
  } else if (res?.error) { // Checking if the response contains an error
    const messageResponse = res.error.data || {}; // Fallback in case res.error.data is undefined
    toast.error(messageResponse?.message || "An error occurred"); // Show error toast
  }
};
