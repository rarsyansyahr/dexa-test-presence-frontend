"use client";

import { PresenceCard, PresenceHistory } from "@/components/employees/home";
import dayjs from "dayjs";
import React, { FC } from "react";
import { LuCheckCircle } from "react-icons/lu";

const HomePage: FC = () => {
  return (
    <div className=" w-full">
      <PresenceCard />

      <PresenceHistory className="md:mt-12 mt-8" />
    </div>
  );
};

export default HomePage;
