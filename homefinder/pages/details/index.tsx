import React from "react";

const keywords = ["hello", "world"];
const title = "Home in Antarctica";
const location = "Antarctica";
const price = "$100,000";
const size = 250;
const description =
  "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet sequi rerum, voluptate aliquam sapiente veritatis aliquid reprehenderit explicabo illo eos, eius iure optio qui? Tenetur suscipit ipsa quidem? Incidunt nihil amet cum, esse ducimus enim nam est voluptatibus consectetur eligendi alias fugit facilis tenetur dolore aliquid ad asperiores vero reprehenderit.";

export default function DetailsPage() {
  return (
    <div className="flex-1 bg-accent p-5 md:flex md:flex-col md:place-items-center md:place-content-center">
      <img
        src="https://picsum.photos/500"
        alt="A house."
        className="md:max-w-sm rounded-md"
      />
      <div className="flex flex-col gap-y-2.5 text-white py-5 md:py-0 md:text-center">
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
        <div>
          <p className="font-bold">
            Contact: <span className="font-normal">+383 048-202-333</span>
          </p>
          <p className="font-bold">
            Facebook: <span className="font-normal">@kimjong</span>
          </p>
          <p className="font-bold">
            E-Mail: <span className="font-normal">email@email.com</span>
          </p>
        </div>
      </div>
      <div>
        <button className="bg-white text-black text-sm shadow-black shadow-md px-5 font-black italic p-2 md:mt-5">
          Hide details
        </button>
      </div>
      <div className="text-white font-medium mt-5 md:text-center">
        <p>{description}</p>
      </div>
    </div>
  );
}
