import { Card } from "../../components/Card";
import { useSearchParams, redirect } from "next/navigation";
import {
  currencyConversion,
  prepareResponse,
  sizeToNumber,
} from "../../server/prompt_generator";
import prisma from "../../server/prisma";
import { GetServerSideProps } from "next";
import { Home } from "@prisma/client";
import { useEffect } from "react";

export default async function Page({
  result,
  homes,
}: {
  result: any;
  homes: Home[];
}) {
  return (
    <div>
      <div className="w-full text-accent flex flex-col gap-y-2 p-5 shadow-lg">
        <div className="flex flex-col italic">
          <p className="font-black text-lg">What we inferred:</p>
          <p className="font-light">
            Tap on what we got wrong and edit it. We will use that as feedback.
          </p>
        </div>
        <div className="flex flex-col gap-y-1">
          <p className="font-bold">
            Location: <span className="font-light">{result.location}</span>
          </p>
          <p className="font-bold">
            Price Range: <span className="font-light">$0-${result.price}</span>
          </p>
          <p className="font-bold">
            Size: <span className="font-light">{result.houseSize}m&sup2;</span>
          </p>
        </div>
      </div>
      <div className="mx-6 flex-1 grid grid-cols-4 place-content-center place-items-center gap-y-5 md:grid-cols-12">
        <div className="col-span-4 m-2 md:col-span-12 md:w-full md:p-5">
          {homes.map((home) => (
            <Card
              title={home.name}
              id={home.id}
              keywords={home.keywords}
              location={home.address}
              size={home.size}
              price={"$" + home.price}
              key={home.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query["query"];
  if (!query || query.length > 180) {
    return {
      redirect: "/",
      props: {},
    };
  }

  const result = await prepareResponse(query as string);

  const homes = await prisma.home.findMany({
    where: {
      address: result.location,
      price: {
        lte: currencyConversion(result.price, result.priceCurrency),
      },
      size: {
        lte: sizeToNumber(result.houseSize),
      },
    },
  });
  return {
    props: {
      result,
      homes,
    },
  };
};
