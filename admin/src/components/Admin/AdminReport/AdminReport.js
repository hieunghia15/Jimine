import AdminTotalProjectsTasksChart from "./AdminTotalProjectsTasksChart";
import AdminTotalProjectsTasksCard from "./AdminTotalProjectsTasksCard";
import Footer from '../Layouts/Footer'
import Navbar from '../Layouts/Navbar'
import Sidebar from '../Layouts/Sidebar'

export default function AdminReport() {
  return (
    <div>
      <div id="app">
        <div className="main-wrapper main-wrapper-1">
          <Navbar />
          <Sidebar />
          <div className="main-content">
            <section className="section">
              <div className="section-body">
                <div className="section-header">
                  <h1 className="text-center">Thống kê</h1>
                </div>
                <AdminTotalProjectsTasksCard />
                <br />
                <AdminTotalProjectsTasksChart />
              </div>
            </section>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  )
}
