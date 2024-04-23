import { useLastPresence, usePresence } from "@/hooks";
import { Cookie } from "@/lib";
import { PresenceStatus } from "@/types";
import dayjs from "dayjs";
import { FC } from "react";
import { LuCheckCircle, LuFingerprint } from "react-icons/lu";

const PresenceCardItem: FC<{ type: "in" | "out"; value?: string }> = (
  props
) => (
  <div className="flex flex-row justify-center items-center">
    <div
      className={`md:p-4 p-3 rounded-md shadow-sm ${
        props.value ? "bg-blue-400" : "bg-gray-200"
      } justify-center items-center`}
    >
      <LuCheckCircle className="md:w-10 md:h-10 w-6 h-6" color="white" />
    </div>

    <div
      className={`ml-2 flex flex-col justify-between ${
        props.value ? "text-black" : "text-gray-500"
      }`}
    >
      <div className="md:text-lg text-sm">
        {props.type === "in" ? "Datang" : "Pulang"}
      </div>
      <div className="md:text-4xl text-xl font-semibold">
        {props.value ? props.value : "-- : --"}
      </div>
    </div>
  </div>
);

export const PresenceCard: FC<{
  className?: string;
}> = (props) => {
  const { className } = props;
  const { presenceTime: presence, getLastPresence } = useLastPresence(
    // @ts-ignore
    Cookie.getEmployeeId()
  );
  const { createPresence, isLoading } = usePresence(getLastPresence);
  // @ts-ignore

  const in_time = presence?.in_time;
  const out_time = presence?.out_time;
  const isPresenced = in_time && out_time;

  const onCreatePresence = () =>
    createPresence(in_time ? PresenceStatus.Out : PresenceStatus.In);

  return (
    <div className={className}>
      <div className="flex flex-row justify-between">
        <div className="md:text-base text-sm">
          {dayjs().format("dddd, DD MMMM YYYY")}
        </div>
        <div className="md:text-base text-sm">{dayjs().format("HH:mm")}</div>
      </div>

      <div className="w-full">
        <div className="flex flex-row justify-evenly items-center mt-6 md:mt-10">
          <PresenceCardItem type="in" value={presence?.in_time} />
          <PresenceCardItem type="out" value={presence?.out_time} />
        </div>

        <div className="flex justify-center">
          <button
            className={`flex flex-row justify-center items-center md:mt-8 mt-6 ${
              isPresenced || isLoading ? "bg-gray-300" : "bg-indigo-500"
            } px-6 py-4 rounded-md md:w-10/12 w-full text-base md:text-xl shadow-lg text-white uppercase`}
            onClick={onCreatePresence}
            // @ts-ignore
            disabled={isPresenced || isLoading}
          >
            <LuFingerprint className="w-5 h-5 mr-1.5 md:w-8 md:h-8 md:mr-2" />{" "}
            {!in_time && "Rekam Datang"}
            {in_time && !out_time && "Rekam Pulang"}
            {isPresenced && "Kamu sudah presensi"}
          </button>
        </div>
      </div>
    </div>
  );
};
