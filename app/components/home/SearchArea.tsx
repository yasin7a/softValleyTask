import Search_Icon from "@/svgIcon/Search_Icon";

const SearchArea = ({
  query,
  handleSearch,
}: {
  query: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="flex justify-end items-center relative max-w-[15rem]">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        className="w-full bg-transparent px-3 py-1 focus:outline-none border border-gray-400 rounded-md focus:ring-2 ring-gray-600 focus:border-transparent"
        placeholder="Search in Lead Table..."
      />
      <button className="absolute flex justify-center items-center pr-2">
        <span className=" inline-block w-5 h-5 text-gray-500">
          <Search_Icon />
        </span>
      </button>
    </div>
  );
};

export default SearchArea;
