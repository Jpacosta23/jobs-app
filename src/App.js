import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Form, FormControl, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";

const Link = "http://localhost:3001/api/jobs";

const HeadLine = () => {
  return (
    <div className="HeadLine-Container">
      <p>
        <strong>Github</strong> Jobs
      </p>
    </div>
  );
};

const SearchBar = ({ setJobs }) => {
  const infoEl = React.useRef(null);
  const getFiltered = async () => {
    try {
      if (infoEl.current.value.length === 0) {
        setJobs(null);
      } else {
        const RES = await fetch(`${Link}/keyword/${infoEl.current.value}`);
        const data = await RES.json();
        setJobs(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handlerSubmit = (evt) => {
    evt.preventDefault();
    getFiltered();
    console.log(infoEl.current.value);
  };
  return (
    <div className="Navbar-Container">
      <Navbar className="bg-light justify-content-between">
        <Form inline onSubmit={handlerSubmit}>
          <FormControl
            type="text"
            placeholder="Title, companies, expertise or benefits"
            className=" mr-sm-2"
            name="searchQuery"
            ref={infoEl}
          />
          <Button type="submit">Search</Button>
        </Form>
      </Navbar>
    </div>
  );
};

const Location = () => {
  return (
    <div>
      <p className="Radio-Button">
        <input
          type="checkbox"
          id="contract"
          name="contract"
          value="full time"
        />
        Full-time
      </p>
      <p className="location-title">
        <strong>LOCATION</strong>
      </p>
      <form className="form2">
        <div className="icon-input-container">
          <input
            type="text"
            id="location"
            size="30"
            placeholder="City, state, zip-code or country "
          />
          <div className="icon-container">
            <div className="icon-email"></div>
          </div>
        </div>
        <p>
          <input type="radio" name="city" value="London" />
          London
        </p>
        <p>
          <input type="radio" name="city" value="Amsterdam" />
          Amsterdam
        </p>
        <p>
          <input type="radio" name="city" value="New York" />
          New York
        </p>
        <p>
          <input type="radio" name="city" value="Berlin" />
          Berlin
        </p>
      </form>
    </div>
  );
};

const showJob = (job, index) => {
  return (
    <div className="Job_Container" key={index}>
      <img src={job.company_logo} alt="" width="150" height="150"></img>
      <div className="Company_info">
        <h1>{job.company}</h1>
        <p>{job.type}</p>
        <p>{job.title}</p>
      </div>
    </div>
  );
};

const DisplayJob = ({ jobs, setJobs }) => {
  const getJobs = async () => {
    try {
      const RES = await fetch(Link);
      const data = await RES.json();
      setJobs(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (jobs === null) {
      getJobs();
    }
  });

  return (
    <div>
      {!jobs
        ? "cargando..."
        : jobs.map((job, index) => {
            return showJob(job, index);
          })}
    </div>
  );
};

function App() {
  const [jobs, setJobs] = useState(null);
  return (
    <div className="align-page">
      <HeadLine />
      <SearchBar setJobs={setJobs} />
      <div className="Section">
        <Location setJobs={setJobs} />
        <div className="Section-Jobs">
          <DisplayJob jobs={jobs} setJobs={setJobs} />
        </div>
      </div>
    </div>
  );
}

export default App;
