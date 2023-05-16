import React from "react";
import { Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import DATA from "../data/MonthlyVarDf.json";
import { getMonthName } from "../utils/functions";
import DropDownSelections from "./Dropdown";

class BarChart extends React.Component {
  state = {
    selectedLabel: "LIN_monthly_var",
    dataBar: null,
    barChartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            barPercentage: 1,
            gridLines: {
              display: true,
              color: "rgba(0, 0, 0, 0.1)",
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              display: true,
              color: "rgba(0, 0, 0, 0.1)",
            },
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  };

  async componentDidMount() {
    const { fileData } = this.props;
    try {
      if (fileData) {
        this.updateBarChart("LIN_monthly_var");
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
        console.log("element----", element);
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
    this.updateBarChart(value);
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

  updateBarChart = async (key) => {
    const label = key || "LIN_monthly_var";
    const months = this.groupByDate(DATA);
    const dataSets = this.formatData(months, label);
    const xAxes = dataSets.map((data) => data.label);
    const yAxes = dataSets.map((data) => data.total);
    this.setState({
      selectedLabel: label,
      dataBar: {
        labels: xAxes,
        selectedLabel: label,
        datasets: [
          {
            label: "Total",
            data: yAxes,
            backgroundColor: [
              "rgba(255, 134,159,0.4)",
              "rgba(98,  182, 239,0.4)",
              "rgba(255, 218, 128,0.4)",
              "rgba(113, 205, 205,0.4)",
              "rgba(170, 128, 252,0.4)",
              "rgba(255, 177, 101,0.4)",
              "rgba(255, 218, 128, 1)",
              "rgba(98,  182, 239,0.4)",
              "rgba(255, 134,159,0.4)",
              "rgba(255, 218, 128,0.4)",
              "rgba(170, 128, 252,0.4)",
            ],
            borderWidth: 2,
            borderColor: [
              "rgba(255, 134, 159, 1)",
              "rgba(98,  182, 239, 1)",
              "rgba(255, 218, 128, 1)",
              "rgba(113, 205, 205, 1)",
              "rgba(170, 128, 252, 1)",
              "rgba(255, 218, 128, 1)",
              "rgba(255, 134,159,0.4)",
              "rgba(255, 134,159,0.4)",
              "rgba(255, 134, 159, 1)",
              "rgba(255, 134, 159, 1)",
            ],
          },
        ],
      },
    });
  };

  render() {
    const { dataBar, selectedLabel } = this.state;
    return (
      <MDBContainer style={{ paddingBottom: 20 }}>
        {dataBar && (
          <>
            <h3 className="mt-5">{`Monthly Analysis Of ${
              selectedLabel || "LIN_monthly_var"
            }`}</h3>
            <Bar
              data={this.state.dataBar}
              options={this.state.barChartOptions}
              legend={false}
              height={300}
            />
            <b style={{ marginRight: 20 }}>(Select Attribute)</b>
          </>
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

export default BarChart;
