import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { BASE_PATH } from "../../utils/constants";

export const Redirect = () => {
  //Tech debt: temporary solution
  const navigate = useNavigate();

  useEffect(() => {
    navigate({ to: BASE_PATH });
  });

  return <div>Redirecting...</div>;
};
