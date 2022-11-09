import TotalTasksChart from './Chart/TotalTasksChart'
import TotalTasksByStatusChart from './Chart/TotalTasksByStatusChart';
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";

export default function UserReport() {
  return (
    <div>
      <Navbar />
      <br />
      <div className="container mt-3 breadcrumb">
        <a>Dự án</a>
        <div class="breadcrumb__separator">/</div>
        { localStorage.getItem("NameProject") }
      </div>
      <br />
      <h1 className="text-center">Báo cáo</h1>
      <br />
      <TotalTasksChart />
      <br />
      <TotalTasksByStatusChart />
      <Footer />
    </div>
  )
}
