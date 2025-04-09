import { BASE_PATH } from "@/app/utils/constants";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Redirect = () => {
  //Tech debt: temporary solution
  const navigate = useNavigate();
  useEffect(() => {
    navigate({ to: BASE_PATH });
  });
  return <div>Redirecting...</div>;
};
