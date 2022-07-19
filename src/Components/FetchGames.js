import React, { useEffect, useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/fontawesome-free-solid";
import { faArrowUp } from "@fortawesome/fontawesome-free-solid";
import { faArrowDown } from "@fortawesome/fontawesome-free-solid";

import { faShield } from "@fortawesome/free-solid-svg-icons";
import Sorting from "./Sorting";

import "./style.css";

export default function FetchGames() {
  const [games, setGames] = useState([]);

  const getGames = async () => {
    const response = await fetch(
      "https://s3-ap-southeast-1.amazonaws.com/he-public-data/gamesarena274f2bf.json"
    );
    setGames(await response.json());
  };
  useEffect(() => {
    getGames();
  }, []);

  const [filterval, setFilterval] = useState("");

  const [sortData, setSortData] = useState("DESC");

  const sorting = (col) => {
    if (sortData === "DESC") {
      const sorted = [...games].sort((a, b) => (a[col] > b[col] ? -1 : 1));
      setGames(sorted);
      setSortData("ASC");
    }
    if (sortData === "ASC") {
      const sorted = [...games].sort((a, b) => (a[col] > b[col] ? 1 : -1));
      setGames(sorted);
      setSortData("DESC");
    }
    
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg py-4 navbar-dark bg-dark fixed-top">
        <div className="container">
          <a className="navbar-brand" href="#">
            <div className="sign">
              <span class="fast-flicker">G</span>ames
              <span class="flicker"> E</span>xplorer
            </div>
          </a>

        </div>
      </nav>


      /*carosel*/
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to={0}
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          />
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to={1}
            aria-label="Slide 2"
          />
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to={2}
            aria-label="Slide 3"
          />
        </div>
        <div className="carousel-inner">
          <div
            className="carousel-item active"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")',
            }}
          >
            <div className="carousel-caption">
              <h3>Gaming brings people together</h3>
            </div>
          </div>
          <div
            className="carousel-item"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")',
            }}
          >
            <div className="carousel-caption">
              <h3>Do we care about gaming? We absolutely care</h3>
            </div>
          </div>
          <div
            className="carousel-item"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1636489951222-2af65c1d9ae3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80")',
            }}
          >
            <div className="carousel-caption">
              <h3>
                Much of the excitement about virtual reality has come from the
                gaming community.
              </h3>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>


      <div class="d-flex bg-dark bd-highlight mt-1">
        <div class="p-2 flex-fill bd-highlight">
          <div className="search">
            <FontAwesomeIcon color="black" icon={faSearch} />
            <input
              type="search"
              class="form-control rounded mt-1 mr-sm"
              placeholder="Explore Games Here..."
              aria-label="Search"
              aria-describedby="search-addon"
              value={filterval}
              onChange={(e) => {
                setFilterval(e.target.value);
              }}
            />
          </div>
        </div>
        <div class="p-2 flex-fill bd-highlight">
          <h1 class="text-center glow">List Of Games 🎮</h1>
        </div>
        <div class="p-2 flex-fill bd-highlight">
          <button
            type="button"
            class="btn btn-success mt-2"
            onClick={() => sorting("score")}
          >
            <FontAwesomeIcon icon={faArrowUp} />
            <FontAwesomeIcon icon={faArrowDown} />
            Top Rated
          </button>
        </div>
      </div>



      <div className="container-fluid mt-2">
        <div className="row">
          {games
            .filter((value) => {
              if (filterval === "") {
                return value;
              } else if (
                value.title?.toLowerCase().includes(filterval?.toLowerCase())
              ) {
                return value;
              }
            })
            .map((curEle) => {
              if (!curEle.title) {
                return null;
              }
              return (
                <div className="col-md-4">
                  <div className="card shadow p-3 mb-4 bg-gradient rounded p-3 mb-2">
                    <div className="d-flex justify-content-between">
                      <div className="d-flex flex-row align-items-center">
                        <div className="ms-2 c-details">
                          <h6 className="mb-0 genre">{curEle.genre}</h6>

                          {curEle.editors_choice === "Y" && (
                            <h6 className="edchoice">
                              <FontAwesomeIcon icon={faShield} />
                              Editors Choice
                            </h6>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mt-5">
                      <h3 className="heading">
                        <h4>{curEle.title}</h4>

                        <h5>{curEle.platform}</h5>
                      </h3>
                      <div className="mt-5">
                        <ProgressBar
                          striped
                          variant="success"
                          animated
                          max={10}
                          now={curEle.score}
                        />

                        <div className="mt-3">
                          <span className="text1">
                            Rating:{" "}
                            <span className="text2">{curEle.score} of 10</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
