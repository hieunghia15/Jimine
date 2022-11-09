import React from 'react'
import Footer from '../Layouts/Footer'
import Navbar from '../Layouts/Navbar'
import Sidebar from '../Layouts/Sidebar'

export default function Index() {
    return (
        <div>
            <div id="app">
                <div className="main-wrapper main-wrapper-1">
                    <Navbar />
                    <Sidebar />
                    <div className="main-content">
                        <section className="section">

                            <div className="section-header">
                                <h1>Blank Page</h1>
                            </div>

                            <div className="section-body">
                            </div>
                            
                        </section>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}
