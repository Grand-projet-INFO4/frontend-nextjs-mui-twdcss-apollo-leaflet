"use client";

import { useRouter } from "next/navigation";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const router = useRouter();

  return (
    <NavbarWrapper className="flex justify-between items-center px-4 backdrop-blur-sm bg-base-100 shadow">
      <div className="flex items-center">
        <img src="/logo.png" alt="Zaha-Dia logo" onClick={() => router.push("/")} />
      </div>
      <nav aria-label="Secondary navigation">
        <ul className="menu menu-horizontal bg-base-100">
          <li>
            <a>Accueil</a>
          </li>
          <li>
            <a>Voyages</a>
          </li>
          <li className="dropdown">
            <label tabIndex={0}>
              Divers
              <FontAwesomeIcon icon={faAngleDown} />
            </label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <a>Coopératives</a>
              </li>
              <li>
                <a>Gares routières</a>
              </li>
            </ul>
          </li>
          <li>
            <a>S'authentifier</a>
          </li>
          <li>
            <button className="btn btn-primary" style={{ color: "#fff" }}>
              Réserver
            </button>
          </li>
        </ul>
      </nav>
      <div className="flex items-center gap-x-2">
        <button>Hey!</button>
      </div>
    </NavbarWrapper>
  );
}

const NavbarWrapper = styled.header`
  height: 3.75rem; /* 60px */
`;
