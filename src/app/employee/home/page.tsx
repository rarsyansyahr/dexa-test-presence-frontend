"use client";

import { PresenceCard, PresenceHistory } from "@/components/employees/home";
import { Cookie } from "@/lib";
import React, { FC, useEffect } from "react";

const HomePage: FC = () => {
  return (
    <div className=" w-full">
      <PresenceCard />

      <PresenceHistory className="md:mt-14 mt-10" />
    </div>
  );
};

export default HomePage;
