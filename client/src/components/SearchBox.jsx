import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { RouteSearch } from "@/helpers/RouteName";

const SearchBox = () => {
  const navigate = useNavigate()
  const [querry, setquerry] = useState();
 const  getInput = (e) => {
    setquerry(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(RouteSearch(querry))
  };

  
  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="q"
        onInput={getInput}
        placeholder="Search Here..."
        className="h-9 rounded-full "
      />
    </form>
  );
};

export default SearchBox;
