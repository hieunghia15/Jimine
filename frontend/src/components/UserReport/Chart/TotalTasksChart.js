import { useEffect, useState } from 'react';
import { getTotalTasksInYear } from "../ChartUtilFuncs";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { getProjectData } from '../../BoardTask/ProjectData';

export default function TotalTasksChart() {
  var currentYear = new Date().getFullYear();
  var [yearOptions, setYearOptions] = useState([]);
  var [totalTasks, setTotalTasks] = useState([]);
  var [yearSelectedValue, setYearSelectedValue] = useState(currentYear);
  var [subTitle, setSubTitle] = useState("Năm: " + currentYear);

  async function getData() {
    var projectData = await getProjectData();
    
    yearOptions = [];
    var projectYear = new Date(projectData.createdAt).getFullYear();
    for(var year = projectYear; year <= currentYear; year++) {
      yearOptions.push(year);
    }
    setYearOptions(yearOptions);

    setTotalTasks(await getTotalTasksInYear(currentYear));
  }

  useEffect(() => {
    getData();
  }, [])

  var chartData = {
    labels: [ "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4",
              "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8",
              "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12" ],
    datasets: [
      {
        label: "Số lượng công việc đã tạo",
        data: totalTasks,
        backgroundColor: "rgb(211, 211, 211)",
        hoverBackgroundColor: "rgb(188, 188, 188)"
      }
    ]
  };

  var chartOptions = {
    scales: {
      yAxis: {  
        ticks: {
          beginAtZero: true,
          precision: 0
        }
      }  
    },
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: "Tổng số công việc đã tạo trong dự án theo tháng",
        font: {
          size: 28
        }
      },
      subtitle: {
        display: true,
        text: subTitle,
        font: {
          size: 18
        },
        padding: {
          bottom: 50
        }
      },
      datalabels: {
        display: true,
        anchor: "end",
        align: "top"
      }
    } 
  };

  async function handleChangeChart() {
    var yearSelected = Number(document.querySelector("#yearSelectInTotalChart").value);
    setTotalTasks(await getTotalTasksInYear(yearSelected));
    setYearSelectedValue(yearSelected);
    setSubTitle("Năm: " + yearSelected);
  }

  return (
    <div className="container">
      <div style={{fontSize: 20, backgroundColor: "yellowgreen", padding: 15,
                  minWidth: 1000, maxWidth: 1500}}>
        <label htmlFor="yearSelectInTotalChart" >Chọn năm:</label>&nbsp;
        <select id="yearSelectInTotalChart" onChange={handleChangeChart} value={yearSelectedValue}>
          {
            yearOptions.map(year => {
              return <option value={year} key={year}>{year}</option>;
            })
          }
        </select>
      </div>
      
      <div style={{minWidth: 1000, maxWidth: 1500, padding: 20, margin: "0 auto"}}>
        <Bar
          data= {chartData}
          options= {chartOptions}
          plugins={[ChartDataLabels]}
        />
      </div>
    </div>
  )
}
