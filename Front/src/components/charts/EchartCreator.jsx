import { useTheme } from "@mui/material";
import * as echarts from "echarts";
import ReactEcharts from "echarts-for-react";
import PropTypes from "prop-types";
import { EchartTheme } from "../MatxTheme/EchartTheme";


const EchartCreator = ({ height, option }) => {
  // const theme = useTheme();
  // echarts.registerTheme("echarts-theme",);

  return (
    <ReactEcharts
      option={option}
      lazyUpdate={true}
      style={{ height: height, width: "100%" }}
    />
  );
};

EchartCreator.prototype = {
  height: PropTypes.string.isRequired,
  option: PropTypes.object.isRequired,
};

export default EchartCreator;
