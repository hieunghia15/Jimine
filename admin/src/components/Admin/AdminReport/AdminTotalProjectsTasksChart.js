import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from "chart.js/auto";
import {convertDataJSIntoDateInput, getDaysDifferentBetweenTwoDates, getNDaysBeforeDate, 
        getTotalProjectsAndTasksInNDay} from "./AdminChartUtilFuncs";
import ChartDataLabels from "chartjs-plugin-datalabels";
import ClipLoader from "react-spinners/ClipLoader";

export default function AdminTotalProjectsTasksChart() {
    var currentDate = new Date();
    
    var [nDays, setNDays] = useState(getNDaysBeforeDate(7, currentDate));
    var [totalProjects, setTotalProjects] = useState([]);
    var [totalTasks, setTotalTasks] = useState([]);
    
    var startDate = nDays[0];
    var endDate = nDays[nDays.length - 1];
    
    var [startDateInputValue, setStartDateInputValue] = 
                                useState(convertDataJSIntoDateInput(startDate));
    var [endDateInputValue, setEndDateInputValue] = 
                                useState(convertDataJSIntoDateInput(endDate));
    var [subTitle, setSubTitle] = useState("Ngày: " + startDate.toLocaleDateString("en-GB")
                                            + " -> " + endDate.toLocaleDateString("en-GB"));
    
    async function getData() {
        var [totalProjects, totalTasks] = await getTotalProjectsAndTasksInNDay(7, currentDate);
        setTotalProjects(totalProjects);
        setTotalTasks(totalTasks);
    }

    useEffect(() => {
        getData(); 
    }, []);

    var [loading, setLoading] = useState(false);
    var [chartOpacity, setChartOpacity] = useState(1);

    function setLoadingState(isLoading) {
        if(isLoading) {
            setLoading(true);
            setChartOpacity(0.4);
        } else {
            setLoading(false);
            setChartOpacity(1);
        }
    }
    
    var dataChart = {
        labels: nDays.map(day => day.toLocaleDateString("en-GB")),
        datasets: [
            {
                fill: true,
                label: "Số lượng dự án đã tạo",
                data: totalProjects,
                borderColor: "rgba(255, 160, 122, 1)",
                backgroundColor: 'rgba(255, 160, 122, 0.8)',
            },
            {
                fill: true,
                label: "Số lượng công việc đã tạo",
                data: totalTasks,
                borderColor: "rgba(144, 238, 144, 1)",
                backgroundColor: "rgba(144, 238, 144, 0.5)",
            }
        ]
    };
       
    var optionsChart = {
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
                text: "Tổng số dự án và công việc được tạo",
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
        var startDateSelected = 
            new Date(document.querySelector("#AdminTotalProjects_startDateSelected").value);
        var endDateSelected = 
            new Date(document.querySelector("#AdminTotalProjects_endDateSelected").value);
        
        if(new Date(startDateSelected) >= new Date(endDateSelected)) {
            return false;
        }

        var daysDifference = getDaysDifferentBetweenTwoDates(startDateSelected, endDateSelected);
        var newSubTitle = "Ngày: " + startDateSelected.toLocaleDateString("en-GB") 
                            + " -> " + endDateSelected.toLocaleDateString("en-GB");
                            
        setLoadingState(true);
        var [totalProjects, totalTasks] = await getTotalProjectsAndTasksInNDay(daysDifference, endDateSelected);
        setLoadingState(false);

        setNDays(getNDaysBeforeDate(daysDifference, endDateSelected));
        setSubTitle(newSubTitle);
        setStartDateInputValue(convertDataJSIntoDateInput(startDateSelected));
        setEndDateInputValue(convertDataJSIntoDateInput(endDateSelected));
        setTotalProjects(totalProjects);
        setTotalTasks(totalTasks);
    }

    return (
        <div className="container">
            <div style={{fontSize: 20, backgroundColor: "darkorange", padding: 15,
                        minWidth: 1000, maxWidth: 1500, color: "black"}}>
                <label htmlFor="AdminTotalProjects_startDateSelected">
                    Chọn ngày bắt đầu: &nbsp;
                </label>
                <input 
                    type="date" 
                    id="AdminTotalProjects_startDateSelected" 
                    value={startDateInputValue} 
                    onChange={handleChangeChart}
                />
        
                <label htmlFor="AdminTotalProjects_endDateSelected" style={{paddingLeft: 100}}>
                    Chọn ngày kết thúc: &nbsp;
                </label>
                <input 
                    type="date" 
                    id="AdminTotalProjects_endDateSelected" 
                    value={endDateInputValue} 
                    onChange={handleChangeChart}
                />

                {
                    loading ?
                        <ClipLoader 
                            color={"black"} 
                            loading={loading}   
                            size={35} 
                            cssOverride={{float: "right", marginRight: "30px"}}
                        />
                    :
                        <></>
                }
            </div>
    
            <div style={{minWidth: 1000, maxWidth: 1500, padding: 20, margin: "0 auto", 
                        opacity: chartOpacity}}>
                <Line data={dataChart} options={optionsChart} plugins={[ChartDataLabels]}/>
            </div> 
        </div> 
    )
}
