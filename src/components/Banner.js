import React from "react";
import { FiMapPin, FiSearch } from "react-icons/fi";
import { TbCategory } from "react-icons/tb";
import TypewriterText from "../Pages/TypewriterText";



const Banner = ({ query, handleInputChange, handleLocationChange, selectedLocation, handleCategories, selectedCategory }) => {
  return (
    <div className='bg-sky-500 xl:px-24 px-10 py-14 h-[80vh] flex justify-center items-center'
      style={{
        clipPath: 'polygon(0 1%, 100% 0%, 100% 85%, 0% 100%)',
        '@screen sm': {
          clipPath: 'polygon(0 1%, 100% 0%, 100% 70%, 0% 100%)',
        },
      }}
    >
      <div className="w-full md:w-[80%] flex flex-col items-center justify-center">
        {/* <h1 className='text-4xl md:text-6xl font-sans text-white mb-10'>
          Find Your<span className="text-white"> New Job Today.</span>
        </h1> */}
        <TypewriterText text="Find Your New Job Today." />
        <p className='text-lg text-white hidden sm:block'>We Can Help You Succeed</p>
        <p className='text-lg text-white mb-8 hidden sm:block'>Browse Thousands Of Jobs From Top Companies</p>
        <form className="w-full">
          <div className='flex justify-start md:flex-row flex-col w-full'>
            <div className='bg-white flex md:rounded-s-md rounded shawdow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 md:w-1/2 w-full'>
              <input
                type="text"
                name="title"
                placeholder='Job Title, Skills or Company'
                id="title"
                className='block flex-1 border-0 bg-transparent py-3 pl-10 text-grey-900 placeholder:text-gray-400 focus=right-0 sm:text-sm sm:leading-6'
                onChange={handleInputChange}
                value={query}
              />
              <FiSearch className='absolute mt-4 ml-2 text-gray-400' />
            </div>
            <div className='bg-white flex md:rounded-s-none rounded shawdow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 md:w-1/3 w-full hover:pointer'>
              <select
                name="city"
                id="city"
                className='block flex-1 border-0 bg-transparent py-3 pl-10 pr-4 text-grey-900 placeholder:text-gray-400 focus=right-0 sm:text-sm sm:leading-6'
                onChange={(event) => handleLocationChange(event.target.value)}
                value={selectedLocation}
              >
                <option value="">Select a city</option>
                <option value="">All</option>
                <option value="London">London</option>
                <option value="Manchester">Manchester</option>
                <option value="Birmingham">Birmingham</option>
                <option value="Liverpool">Liverpool</option>
                <option value="Glasgow">Glasgow</option>
                <option value="Edinburgh">Edinburgh</option>
                <option value="Sheffield">Sheffield</option>
                <option value="Oxford">Oxford</option>
                <option value="Bristol">Bristol</option>
                <option value="Norwich">Norwich</option>
                <option value="Cambridge">Cambridge</option>
                <option value="Dublin">Dublin</option>
                <option value="Nottingham">Nottingham</option>
                <option value="Derby">Derby</option>
              </select>
              <FiMapPin className='absolute mt-4 ml-2 text-gray-400' />
            </div>
            <div className='bg-white flex md:rounded-s-none rounded shawdow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 md:w-1/3 w-full hover:pointer'>
              <select
                name="category"
                id="category"
                className='block flex-1 border-0 bg-transparent py-3 pl-10 pr-4 text-grey-900 placeholder:text-gray-400 focus=right-0 sm:text-sm sm:leading-6'
                onChange={(event) => handleCategories(event.target.value)}
                value={selectedCategory}
              >
                <option value="">Select a Category</option>
                <option value="">All</option>
                <option value="InformationTechnology ">Information Technology </option>
                <option value="LifeSciencesHealthcare">Life Sciences & Healthcare</option>
                <option value="Retail">Retail</option>
                <option value="AccountingFinance">Accounting / Finance</option>
                <option value="DistributionLogistics">Distribution/Logistics</option>
                <option value="OilGas">Oil & Gas</option>
                <option value="LegalProfessionalServices">Legal & Professional Services</option>
                <option value="SalesBusinessDevelopment">Sales/Business Development</option>
                <option value="HealthcareMedical">Healthcare & Medical</option>
                <option value="HumanResource">Human Resource</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="DesignMultimedia">Design & Multimedia</option>
                <option value="Government">Government</option>
                <option value="Engineering Jobs">Engineering Jobs</option>
              </select>
              <TbCategory className='absolute mt-4 ml-2 text-gray-400' />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Banner;
