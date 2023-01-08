import Image from "next/image";

export interface CardProps {
  title: string;
  price: string;
  size: number;
  location: string;
  keywords: string[];
  id: number;
}

export function Card({
  title,
  price,
  location,
  keywords,
  id,
  size,
}: CardProps) {
  return (
    <div className="m-2 bg-accent p-3 rounded-md shadow-sm md:flex md:flex-row md:items-center md:my-2 md:mx-0 md:p-5 md:gap-x-3">
      <img
        src="https://picsum.photos/500"
        alt="A house."
        className="md:max-w-sm"
      />
      <div className="p-5 flex flex-col gap-y-2.5 md:p-0">
        <div className="flex flex-col gap-y-2.5 text-white py-5 md:py-0">
          <div>
            <p className="text-lg font-black">{title}</p>
          </div>
          <div>
            <p className="font-bold">
              Location: <span className="font-normal">{location}</span>
            </p>
            <p className="font-bold">
              Price: <span className="font-normal">{price}</span>
            </p>
            <p className="font-bold">
              Size: <span className="font-normal">{size}m&sup2;</span>
            </p>
          </div>
          <div>
            <p className="font-black">Keywords that may interest you:</p>
            <ul className="italic uppercase font-medium">
              {keywords.map((keyword) => (
                <p key={keyword}>{keyword}</p>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <button className="bg-white text-black text-sm shadow-black shadow-md px-5 font-black italic p-2">
            View more details
          </button>
        </div>
      </div>
    </div>
  );
}
