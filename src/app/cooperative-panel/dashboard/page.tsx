"use client";
import React from "react";
import "./dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleDown } from "@fortawesome/free-regular-svg-icons";
import { faBus, faPeopleGroup, faStore, faMapMarker } from "@fortawesome/free-solid-svg-icons";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default function Dashboard() {
  const data = {
    labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Jui", "Aout", "Sept", "Oct", "Nov", "Déc"],
    datasets: [
      {
        label: "Résérvations en ligne",
        data: [65, 52, 10, 89, 24, 14, 50, 78, 24, 57, 98, 61],
        fill: false,
        borderColor: "rgb(75,192,192)",
        tension: 0.1,
        responsive: true,
      },
      {
        label: "Résérvations physique",
        data: [30, 47, 18, 71, 32, 8, 41, 60, 22, 53, 89, 64],
        fill: false,
        borderColor: "rgb(37,180,59)",
        tension: 0.1,
        responsive: true,
      },
    ],
  };
  const data_cars = {
    labels: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Dimanche"],
    datasets: [
      {
        label: "Total des voyages",
        data: [65, 52, 10, 89, 24, 14],
        fill: false,
        backgroundColor: [
          "rgba(248,200,34)",
          "rgba(34,91,248)",
          "rgba(65,141,46)",
          "rgba(183,86,128)",
          "rgba(15,192,192)",
          "rgba(198,120,26)",
        ],
      },
    ],
  };
  const circleData = {
    // labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Dimanche'],
    datasets: [
      {
        label: "statut de la véhicule",
        data: [35, 76],
        backgroundColor: ["rgba(195,195,195)", "rgba(105,102,102)"],
      },
    ],
  };
  const circle_car_repatition = {
    datasets: [
      {
        label: "véhicule en location",
        data: [35, 21, 90, 20],
        backgroundColor: [
          "rgba(79,122,142)",
          "rgba(255,222,102)",
          "rgba(103,186,105)",
          "rgba(223,149,98)",
        ],
      },
    ],
  };
  const driver_data = {
    // labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Dimanche'],
    datasets: [
      {
        label: "statut de la véhicule",
        data: [35, 76],
        backgroundColor: ["rgba(195,195,195)", "rgba(105,102,102)"],
      },
    ],
  };
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <div className="mx-auto  bg-background-dark w-full h-auto ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 justify-center">
        <div className="card w-auto h-auto p-4 bg-background shadow-md rounded-md">
          <h2 className="font-light text-center text-xl text-foreground">Chiffre d affaires</h2>
          <div className="flex justify-center mt-2 w-full h-auto">
            <FontAwesomeIcon icon={faArrowAltCircleDown} className="text-md text-red-500" />
            <p className="font-light text-sm ml-2">1 500 000 Ariary</p>
          </div>
          <p className="font-light text-sm mt-2">80%</p>
          <div className="mt-2 w-full h-auto bg-gray-100">
            <div className="progress-primary w-[80%] h-2 rounded-md bg-red-500"></div>
          </div>
          <p className="font-light text-sm mt-2 ">Dernier mois</p>
        </div>

        <div className="card w-auto h-auto p-4 bg-background shadow-md rounded-md">
          <h2 className="font-light text-center text-xl text-foreground">Nombre de résérvations</h2>
          <div className="flex justify-center mt-2 w-full h-auto">
            <FontAwesomeIcon icon={faArrowAltCircleDown} className="text-md text-green-500" />
            <p className="font-light text-sm ml-2">1245 personnes</p>
          </div>
          <p className="font-light text-sm mt-2">45%</p>
          <div className="mt-2 w-full h-auto bg-gray-100">
            <div className="progress-primary w-[45%] h-2 rounded-md bg-green-500"></div>
          </div>
          <p className="font-light text-sm mt-2 ">Dernier mois</p>
        </div>

        <div className="card w-auto h-auto p-4 bg-background shadow-md rounded-md">
          <h2 className="font-light text-center text-xl text-foreground">Nombre de voyages</h2>
          <div className="flex justify-center mt-2 w-full h-auto">
            <FontAwesomeIcon icon={faArrowAltCircleDown} className="text-md text-blue-500" />
            <p className="font-light text-sm ml-2">3248 voyages</p>
          </div>
          <p className="font-light text-sm mt-2">52%</p>
          <div className="mt-2 w-full h-auto bg-gray-100">
            <div className="progress-primary w-[52%] h-2 rounded-md bg-blue-500"></div>
          </div>
          <p className="font-light text-sm mt-2 ">Dernier mois</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-3 justify-center items-center mt-12 ">
        <div className="relative flex justify-center w-auto h-80 bg-background shadow-md rounded-md">
          <div className="card w-[90%] h-72 relative  bottom-8 bg-background shadow-md rounded-md">
            <div className="flex justify-center items-center">
              <Line data={data} options={options} />
            </div>
          </div>
        </div>
        <div className="md:relative flex justify-center w-auto h-80 bg-background shadow-md rounded-md">
          <div className="card w-[90%] h-72 relative  bottom-8 bg-background shadow-md rounded-md">
            <div className="flex justify-center">
              <Bar data={data_cars} options={options} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3 justify-center mt-3">
        <div className="card w-auto h-32 p-4 bg-background shadow-md rounded-md">
          <h2 className="font-light text-xl text-foreground"> Véhicules</h2>
          <div className="flex justify-between mt-2 w-full h-auto">
            <p className="font-light text-xl">80</p>
            <FontAwesomeIcon icon={faBus} className="w-8 h-6 text-[#6fb1ce]" />
          </div>
        </div>
        <div className="card w-auto h-32 p-4 bg-background shadow-md rounded-md">
          <h2 className="font-light text-xl text-foreground">Chauffeurs</h2>
          <div className="flex justify-between mt-2 w-full h-auto">
            <p className="font-light text-xl">30</p>
            <FontAwesomeIcon icon={faPeopleGroup} className="w-8 h-6 text-[#6fb1ce]" />
          </div>
        </div>
        <div className="card w-auto h-32 p-4 bg-background shadow-md rounded-md">
          <h2 className="font-light text-xl text-foreground">Stationnement</h2>
          <div className="flex justify-between mt-2 w-full h-auto">
            <p className="font-light text-xl">10</p>
            <FontAwesomeIcon icon={faStore} className="w-8 h-6 text-[#6fb1ce]" />
          </div>
        </div>
        <div className="card w-auto h-32 p-4 bg-background shadow-md rounded-md">
          <h2 className="font-light  text-xl text-foreground">Itineraires</h2>
          <div className="flex justify-between mt-2 w-full h-auto">
            <p className="font-light text-xl">50</p>
            <FontAwesomeIcon icon={faMapMarker} className="w-8 h-6 text-[#6fb1ce]" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-3 justify-center items-start mt-3 ">
        <div className="w-auto h-auto py-5 bg-background shadow-md rounded-md">
          <h2 className="font-light text-center text-xl text-foreground">
            {" "}
            Véhicules répartis par statut
          </h2>
          <div className="mt-2 flex justify-center w-full h-40 p-2">
            <Doughnut data={circleData} />
          </div>
          <div className="flex justify-between p-2 w-full h-auto">
            <div className="flex">
              <div className="w-4 h-4 bg-[#c3c3c3]"></div>
              <p className="font-light text-sm ml-2">En service</p>
            </div>
            <div className="">
              <p className="font-light text-sm">76</p>
            </div>
          </div>
          <div className="flex justify-between p-2 w-full h-auto">
            <div className="flex">
              <div className="w-4 h-4 bg-[#c3c3c3]"></div>
              <p className="font-light text-sm ml-2">Hors service</p>
            </div>
            <div className="">
              <p className="font-light text-sm">35</p>
            </div>
          </div>
        </div>
        <div className="w-auto h-auto py-5 bg-background shadow-md rounded-md">
          <h2 className="font-light text-center text-xl text-foreground">
            {" "}
            Véhicules répartis selon leurs états
          </h2>
          <div className="mt-1 flex justify-center w-full h-40 p-2">
            <Doughnut data={circle_car_repatition} />
          </div>
          <div className="flex justify-between p-2 w-full h-auto">
            <div className="flex">
              <div className="w-4 h-4 bg-[#67ba69]"></div>
              <p className="font-light text-sm ml-2">Fonctionnel</p>
            </div>
            <div className="">
              <p className="font-light text-sm">90</p>
            </div>
          </div>
          <div className="flex justify-between p-2 w-full h-auto">
            <div className="flex">
              <div className="w-4 h-4 bg-[#df9562]"></div>
              <p className="font-light text-sm ml-2">En réparation</p>
            </div>
            <div className="">
              <p className="font-light text-sm">21</p>
            </div>
          </div>
          <div className="flex justify-between p-2 w-full h-auto">
            <div className="flex">
              <div className="w-4 h-4 bg-[#4f7a8e]"></div>
              <p className="font-light text-sm ml-2">Endommagé</p>
            </div>
            <div className="">
              <p className="font-light text-sm">35</p>
            </div>
          </div>
          <div className="flex justify-between p-2 w-full h-auto">
            <div className="flex">
              <div className="w-4 h-4 bg-[#ffde66]"></div>
              <p className="font-light text-sm ml-2">Accidenté</p>
            </div>
            <div className="">
              <p className="font-light text-sm">21</p>
            </div>
          </div>
        </div>
        <div className="w-auto h-auto py-5 bg-background shadow-md rounded-md">
          <h2 className="font-light text-center text-xl text-foreground">
            Chauffeurs répatis par statut
          </h2>
          <div className="mt-1 flex justify-center w-full h-40 p-2">
            <Doughnut data={driver_data} />
          </div>
          <div className="flex justify-between p-2 w-full h-auto">
            <div className="flex">
              <div className="w-4 h-4 bg-[#c3c3c3]"></div>
              <p className="font-light text-sm ml-2">En service</p>
            </div>
            <div className="">
              <p className="font-light text-sm">76</p>
            </div>
          </div>
          <div className="flex justify-between p-2 w-full h-auto">
            <div className="flex">
              <div className="w-4 h-4 bg-[#c3c3c3]"></div>
              <p className="font-light text-sm ml-2">Hors service</p>
            </div>
            <div className="">
              <p className="font-light text-sm">35</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
