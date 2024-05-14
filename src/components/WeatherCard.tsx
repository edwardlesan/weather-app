import React from "react";
import { Card } from "./ui/card";
import { WeatherDataProps } from "@/app/page";
import Image from "next/image";
import { LuDroplet } from "react-icons/lu";
import { LuThermometer } from "react-icons/lu";
import { LuArrowDownNarrowWide } from "react-icons/lu";

interface WeatherCardProps {
  data: WeatherDataProps | null;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  return (
    <Card className="px-6 py-4 w-64 border-2">
      {data ? (
        <div className="flex flex-col gap-16">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-semibold">{data.name}</h1>
            <div className="flex w-full items-center">
              <p className="text-lg font-medium text-gray-600">
                {data.weather[0].main}
              </p>
              <Image
                src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                alt="/"
                width="48"
                height="48"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="items-center flex gap-1">
              <LuThermometer stroke="black" size={24} />
              {data.main.temp} °C
            </p>
            <p className="items-center flex gap-1">
              <LuDroplet stroke="black" size={24} /> {data.main.humidity} %
            </p>
            <p className="items-center flex gap-1">
              <LuArrowDownNarrowWide stroke="black" size={24} />
              {data.main.pressure} hPa
            </p>
          </div>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </Card>
  );
};

export default WeatherCard;
