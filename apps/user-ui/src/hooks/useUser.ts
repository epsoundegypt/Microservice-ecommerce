import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/utils/AxiosInstance";

// fetch user data

const fetchUser = async () => {
  const res = await axiosInstance.get("/api/logged-in-user");
  return res.data.user;
};

const useUser = () => {
  const {
    data: user,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 60 * 24,
    retry: 1,
  });
  return { user, isLoading, isError, refetch };
};

export default useUser;
