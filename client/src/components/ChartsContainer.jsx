import { useState } from "react";
import BarChart from "./BarChart";
import AreaChart from "./AreaChart";
import Wrapper from "../assets/wrappers/ChartsContainer";

export default function ChartsContainer({ data }) {
  const [barchart, setBarchart] = useState(false);
  function handleButtonToggle() {
    setBarchart((barchart) => !barchart);
  }
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type="button" onClick={handleButtonToggle}>
        {barchart ? "Bar Chart" : "Area Chart"}
      </button>
      {barchart ? <AreaChart data={data} /> : <BarChart data={data} />}
    </Wrapper>
  );
}
