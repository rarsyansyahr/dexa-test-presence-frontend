import Image from "next/image";
import React, { FC } from "react";

const HomePage: FC = () => {
  return (
    <div className="flex justify-center items-center">
      <Image
        src="/images/logo.png"
        width={800}
        height={400}
        alt="Logo"
        className="w-56 md:w-80"
      />
      {/* <div>Hai, Sdr. Rizky</div> */}
    </div>
  );
};

export default HomePage;
