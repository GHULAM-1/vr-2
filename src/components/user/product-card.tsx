import Image from "next/image";
import React from "react";
import { Button } from "../ui/moving-border";
import QRCode from "react-qr-code";

import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
type ProducCardPropsType = {
  name: string;
  desc: string;
  price: string;
  isVR: boolean;
  url: string;
  businessName?: string;
};
export function ProductCard({
  name,
  desc,
  price,
  isVR,
  url,
  businessName,
}: ProducCardPropsType) {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[20rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          {name}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          {desc}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src={url}
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-10">
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
          >
            {price}
          </CardItem>
          {isVR ? (
            <div>
              <Button
                borderRadius="1.75rem"
                className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
              >
                see in AR
              </Button>
            </div>
          ) : null}
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            {businessName}
          </CardItem>
          <div
            style={{
              height: "auto",
              margin: "0 auto",
              maxWidth: 64,
              width: "100%",
            }}
          >
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value="https://j7fsz12t-3000.asse.devtunnels.ms/"
              viewBox={`0 0 256 256`}
            />
          </div>
        </div>
      </CardBody>
    </CardContainer>
  );
}
