import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Page() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [shouldRedirect, setShouldRedirect] = useState(false);

  function performSearch() {
    if (search.replace(" ", "").length === 0) {
      return;
    }
    setShouldRedirect(true);
  }

  if (shouldRedirect) {
    router.push("/search?query=" + search.replaceAll(" ", "+"));
  }
  return (
    <div className="flex-1 grid grid-cols-4 mx-6 place-content-center place-items-center gap-y-5 md:grid-cols-12">
      <div className="flex flex-col text-accent col-span-4 items-center md:col-span-12">
        <p className="font-bold text-4xl md:text-6xl">HomeFinder</p>
        <p className="text-sm font-light md:text-xl">
          Powered by intelligent search.
        </p>
      </div>
      <input
        className="col-span-4 md:text-center md:text-lg md:col-start-4 md:col-end-10 w-full p-2 border-2 flex-1 border-accent text-accent text-sm focus:outline-none placeholder:text-accent/50"
        type="text"
        name="search"
        id="search"
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Medium sized home in Antarctica that costs 100,000 euros"
      />
      <div className="col-span-2 col-start-2 md:col-start-4 md:col-end-10 flex flex-col items-center justify-center gap-y-1">
        <button
          onClick={performSearch}
          className="border-accent border-2 p-2 w-full text-accent rounded-sm text-sm md:text-xl md:px-5 font-bold"
        >
          Search
        </button>
        <button className="border-accent border-2 p-2 w-full text-accent rounded-sm text-sm md:text-xl md:px-5 font-bold">
          Sell a home
        </button>
      </div>
    </div>
  );
}
