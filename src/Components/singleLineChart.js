import React from "react";
import { Line } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import { getMonthName } from "../utils/functions";
import DATA from "../data/MonthlyVarDf.json";
import DropDownSelections from "./Dropdown";

class SingleLineChart extends React.Component {
  state = {
    dataLine: null,
    years: null,
    selectedYear: null,
  };
  async componentDidMount() {
    const { fileData } = this.props;
    try {
      if (fileData) {
        this.updateBarChart("LIN_monthly_var", fileData);
      }
    } catch (error) {
      console.log("bar chart error=======", error);
    }
  }

  formatData = (objects, selectedLabel) => {
    let tempData = [];
    for (const key in objects) {
      if (Object.hasOwnProperty.call(objects, key)) {
        const element = objects[key];
        if (element && element.length != 0) {
          const total = this.calculateSum(element, selectedLabel);
          const label = key;
          tempData.push({ total: total, label: getMonthName(label) });
        }
      }
    }
    return tempData;
  };

  calculateSum = (arr, selectedLabel) => {
    if (arr) {
      const sum = arr.reduce((accumulator, object) => {
        return accumulator + Number(object[selectedLabel]);
      }, 0);
      return sum;
    } else {
      return 0;
    }
  };

  handleChange = (value) => {
    const { fileData } = this.props;
    this.updateBarChart(value, fileData);
  };

  groupByDate = (data) => {
    const groups = data.reduce((groups, item) => {
      const date = item.Date.split("-")[1];
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(item);
      return groups;
    }, {});
    return groups;
  };

  updateBarChart = async (key, fileData) => {
    const label = key || "LIN_monthly_var";
    const months = this.groupByDate(fileData);
    const dataSets = this.formatData(months, label);
    const xAxes = dataSets.map((data) => data.label);
    const yAxes = dataSets.map((data) => data.total);
    this.setState({
      dataLine: {
        labels: xAxes,
        datasets: [
          {
            label: "Total",
            fill: true,
            lineTension: 0.3,
            backgroundColor: "rgba(225, 204,230, .3)",
            borderColor: "rgb(205, 130, 158)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgb(205, 130,1 58)",
            pointBackgroundColor: "rgb(255, 255, 255)",
            pointBorderWidth: 10,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgb(0, 0, 0)",
            pointHoverBorderColor: "rgba(220, 220, 220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: yAxes,
          },
        ],
      },
      selectedYearData: label,
    });
  };

  render() {
    const { years, selectedYearData, dataLine } = this.state;
    return (
      <MDBContainer>
        <h3 className="mt-5">{`Monthly Analysis Of ${
          selectedYearData || "LIN_monthly_var"
        }`}</h3>
        {years && years.length > 0 && (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <div>
              <b>Select year</b>
              <select
                className="browser-default custom-select"
                onChange={(e) => this.handleChangeYear(e.target.value)}
              >
                <option value={"0"}>Select year</option>
                {years.map((item, index) => {
                  return (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        )}

        {dataLine && (
          <Line data={this.state.dataLine} options={{ responsive: true }} />
        )}
        <DropDownSelections
          onChange={(value) => {
            this.handleChange(value);
          }}
        />
      </MDBContainer>
    );
  }
}

export default SingleLineChart;
