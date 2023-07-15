import React, { useEffect } from "react";
import { updateDashboard } from "./dataDasboard";

function Dashboard() {
  useEffect(() => {
    updateDashboard();
  }, []);

  return (
    <div className="container">
      <h1 className="my-4">Dashboard</h1>

      <div className="row">
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h4 className="card-title">Nombre de visteurs</h4>
              <p className="card-text" id="visitors-count">
                0
              </p>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h4 className="card-title">Page vues</h4>
              <p className="card-text" id="pageviews-count">
                0
              </p>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h4 className="card-title">Events</h4>
              <p className="card-text" id="events-count">
                0
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <h2 className="my-4">Dernier évènement détécté</h2>
          <table className="table table-striped" id="events-table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Type</th>
                <th scope="col">Data</th>
                <th scope="col">Heure</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
