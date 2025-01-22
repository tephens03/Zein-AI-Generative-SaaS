"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("46840687-40db-4ba6-b7ef-4d30fda7c34e");
  }, []);

  return null;
};