import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Card from "../components/Card";
import Jobs from "./Jobs";
import Sidebar from "../sidebard/Sidebar";
import Newsletter from "../components/Newsletter";
import Arrow from "../components/Arrow";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import Browse from "./Browse";

const Home = () => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setIsloading(true);
    fetch("https://job-portal-6fci.onrender.com/all-jobs")
      .then(res => res.json())
      .then(data => {
        //console.log(data)
        setJobs(data);
        setIsloading(false)

      }
      )
  }, [])

  //console.log(jobs)

  const [query, setQuery] = useState(""); // Move useState to the Home component

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };
  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };
  const handleCategories = (Category) => {
    setSelectedCategory(Category);
  };

  //filter  jobs by title Create by Usama
  // const filteredItems = jobs.filter((job) => job?.jobTitle.toLowerCase().indexOf(query.toLocaleLowerCase()) !== -1)
  const filteredItems = jobs.filter((job) => {
    const jobTitleMatch = job?.jobTitle?.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    const companyNameMatch = job?.companyName?.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    const locationMatch = !selectedLocation || (job?.jobLocation && job.jobLocation.toLowerCase() === selectedLocation.toLowerCase());
    const categoryMatch = !selectedCategory || (job?.category && job.category.toLowerCase() === selectedCategory.toLowerCase());
    return (jobTitleMatch || companyNameMatch) && locationMatch && categoryMatch;
  });

  //================Radio Base Button filtering-------------
  const handleChange = (event) => {
    setSelectedCategory(event.target.value)
  }
  // ===================Buttons Side  filtering---------------
  const handleClick = (event) => {
    // console.log(event.target.value);
    setSelectedCategory(event.target.value)
  }
  // calculate inndex Range
  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  }

  // funxtion for the next page
  const nextPage = () => {

    if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }

  }
  // function for current page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }
  // main funtion 

  const filteredData = (jobs, selected, query, selectedLocation) => {
    let filteredJobs = jobs;
    // Filtering input
    if (query) {
      filteredJobs = filteredItems;
    }
    // Category filtering
    if (selected) {
      // console.log(selected);
      filteredJobs = filteredJobs.filter(({ jobLocation, maxPrice, experiencedLevel, salaryType, employementType, postingDate, category }) =>
        (jobLocation && jobLocation.toLowerCase() === selected.toLowerCase()) ||
        (category && category.toLowerCase() === selected.toLowerCase()) ||
        (maxPrice && parseInt(maxPrice) <= parseInt(selected)) ||
        (postingDate && postingDate >= selected) ||
        (salaryType && salaryType.toLowerCase() === selected.toLowerCase()) ||
        (experiencedLevel && experiencedLevel.toLowerCase() === selected.toLowerCase()) ||
        (employementType && employementType.toLowerCase() === selected.toLowerCase())
      );
      // console.log(filteredJobs);
    }
    if (selectedLocation) {
      filteredJobs = filteredJobs.filter(job =>
        job.jobLocation.toLowerCase() === selectedLocation.toLowerCase()
      );
    }
    //slice the data based on current page
    const { startIndex, endIndex } = calculatePageRange();
    filteredJobs = filteredJobs.slice(startIndex, endIndex)
    return filteredJobs.map((data, i) => <Card key={i} data={data} />);
  }

  const result = filteredData(jobs, selectedCategory, query, selectedLocation);

  return (
    <div>
      {/* Pass query and handleInputChange as props to the Banner component */}
      <Banner
        query={query}
        handleInputChange={handleInputChange}
        handleLocationChange={handleLocationChange}
        handleCategories={handleCategories}
      />
      {/* Main Content  */}
      <div className="bg-[#FAFAFA] grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-8 lg:px-6 px-4 py-8 lg:py-12">
        {/* Left Side  */}
        <div className="bg-white p-4 rounded md:col-span-1">
          <Sidebar handleChange={handleChange} handleClick={handleClick} />
        </div>
        {/* Job Cards   */}
        <div className="bg-white p-4 rounded-sm md:col-span-2">
          {isLoading ? (
            <div className="flex justify-center items-center">
              <img src="/images/loader.gif" alt="Loading..." style={{ height: "100px" }} />
            </div>
          ) : result.length > 0 ? (
            <Jobs result={result} />
          ) : (
            <>
              <h3 className="text-lg font-bold mb-2">{result?.length} Jobs</h3>
              <p className="flex justify-center font-bold">No Data Found!</p>
            </>
          )}
          {/* Pagination */}
          {result.length > 0 && (
            <div className="flex justify-end space-x-6 mt-4">
              <button onClick={prevPage} disabled={currentPage === 1} className="cursor-pointer">
                <MdArrowBackIos size={20} />
              </button>
              <span className="mx-2">Page {currentPage} of {Math.ceil(filteredItems.length / itemsPerPage)}</span>
              <button onClick={nextPage} disabled={currentPage === Math.ceil(filteredItems.length / itemsPerPage)} className="cursor-pointer">
                <MdArrowForwardIos size={20} />
              </button>
            </div>
          )}
        </div>
        {/* Right Side  */}
        <div className="bg-white p-4 rounded md:col-span-1">
          <Newsletter />
        </div>
      </div>
      <Browse />
      <Arrow />
    </div>
  );
};

export default Home;

