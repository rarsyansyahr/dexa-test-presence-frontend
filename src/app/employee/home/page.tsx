"use client";

import { PresenceCard, PresenceHistory } from "@/components/employees/home";
import dayjs from "dayjs";
import React, { FC, useEffect } from "react";
import { LuCheckCircle } from "react-icons/lu";

const HomePage: FC = () => {
  useEffect(() => {
    // alert("aa");
  }, []);

  return (
    <div className=" w-full">
      <PresenceCard />

      <PresenceHistory className="md:mt-14 mt-10" />
    </div>
  );
};

export default HomePage;
