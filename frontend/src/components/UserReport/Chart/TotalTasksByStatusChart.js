import { useEffect, useState } from 'react';
import { convertDataJSIntoDateInput, getTotalTasksByStatusInWeek, 
  getWeekBeforeDate } from '../ChartUtilFuncs';
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { getProjectData } from '../../BoardTask/ProjectData';

export default function TotalTasksByStatusChart() {
  var currentDate = new Date();
  var [memberOptions, setMemberOptions] = useState([]);
  var [aWeekLabels, setAWeekLabels] = useState(getWeekBeforeDate(currentDate));
  var [totalTasks, setTotalTasks] = useState({});
  var [subTitle, setSubTitle] = useState("Tất cả thành viên   -   Tuần: " 
      + aWeekLabels[0].toLocaleDateString("en-GB") 
      + " -> " + currentDate.toLocaleDateString("en-GB"));
  var [dateInputValue, setDateInputValue] = 
      useState(convertDataJSIntoDateInput(currentDate));

  async function getData() {
    var projectData = await getProjectData();
                     
    setMemberOptions([projectData.leader, ...projectData.members]);

    totalTasks = await getTotalTasksByStatusInWeek(currentDate);
    setTotalTasks(totalTasks);
  }

  useEffect(() => {
    getData();
  }, []);
  
  var barColors = ["rgb(211, 211, 211)", "rgb(244, 194, 174)",
                  "rgb(166, 241, 166)", "rgb(100, 229, 207)", "rgb(255, 215, 0)"];
  var colorCounter = 0;

  var chartData = {
    labels: aWeekLabels.map(label => label.toLocaleDateString("en-GB")),
    datasets: Object.entries(totalTasks).map(status => {
      return {
        label: status[0],
        data: status[1],
        backgroundColor: barColors[colorCounter++]
      }
    })
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
        display: true,
        position: "bottom"
      },
      title: {
        display: true,
        text: "Tổng số công việc sắp theo trạng thái trong một tuần",
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
    var newSubTitle = "";
    var memberSelected = document.querySelector("#memberSelectInStatusChart").value;
    
    if(memberSelected === "Tất cả") {
      memberSelected = undefined;
      newSubTitle = "Tất cả thành viên";
    } else {
      newSubTitle = "Thành viên: " + memberOptions[memberSelected].Fullname;
      memberSelected = memberOptions[memberSelected]._id;
    }

    var dateSelected = new Date(document.querySelector("#dateSelectInStatusChart").value);
    totalTasks = await getTotalTasksByStatusInWeek(dateSelected, memberSelected);
    
    var aWeek = getWeekBeforeDate(new Date(dateSelected));
    newSubTitle += ("    -   Tuần: " + aWeek[0].toLocaleDateString("en-GB") 
                    + " -> " + dateSelected.toLocaleDateString("en-GB"));
    
    setAWeekLabels(aWeek);
    setTotalTasks(totalTasks);
    setSubTitle(newSubTitle);
    setDateInputValue(convertDataJSIntoDateInput(dateSelected));
  }

  return (
    <div className="container">
      <div style={{fontSize: 20, backgroundColor: "yellowgreen", padding: 15,
                  minWidth: 1000, maxWidth: 1500}}>
        <label htmlFor="memberSelectInStatusChart">Chọn thành viên:</label>&nbsp;
        <select id="memberSelectInStatusChart" onChange={handleChangeChart}>
          <option value="Tất cả">Tất cả</option>
          {
            memberOptions.map((member, i) => {
              return <option value={i} key={member._id}>{member.Fullname}</option>;
            })
          }
        </select>

        <label htmlFor="yearSelect" style={{paddingLeft: 100}}>Chọn ngày:</label>&nbsp;
        <input 
          type="date" 
          id="dateSelectInStatusChart" 
          value={dateInputValue} 
          onChange={handleChangeChart}
        />
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
