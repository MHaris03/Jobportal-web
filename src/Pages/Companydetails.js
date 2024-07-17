import React, { useState } from "react";
import { Link } from "react-router-dom";
import { faqs } from "../Data/Companyinfo"
import CardBorder from "../components/CardBorder";
import Arrow from "../components/Arrow";

const Companydetails = () => {
  const [selected, setSelected] = useState("faq");
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAllQuestions, setShowAllQuestions] = useState(false);

  const selectedCategory = faqs.find((item) => item.id === selected);
  const filteredQuestions = selectedCategory?.questions.filter((question) =>
    question.title.toLowerCase().includes(selectedOption?.value?.toLowerCase() || "")
  );

  const handleViewMore = () => {
    setShowAllQuestions(!showAllQuestions);
  };

  const selectedQuestionIndex = filteredQuestions?.findIndex(question => question.title === selectedOption?.value);
  const reorderedQuestions = [...(filteredQuestions || [])];
  if (selectedQuestionIndex !== -1 && selectedQuestionIndex !== undefined) {
    const selectedQuestion = reorderedQuestions.splice(selectedQuestionIndex, 1);
    reorderedQuestions.unshift(selectedQuestion[0]);
  }

  const questionsToDisplay = showAllQuestions ? reorderedQuestions : reorderedQuestions.slice(0, 5);

  return (
    <div className="min-h-[100vh]">
      <div className="px-[5%] md:px-[14%] pt-[5%]">
        <div>
          <h1 className='text-sky-500 font-sans text-2xl text-bold text-center mb-10'>
            Do You Have Any Questions?
          </h1>
        </div>
        <p className="text-md text-secondary">
          Find answers to the most commonly asked questions below. Search for
          topics you are interested in or sort by category. If you still can&apos;t find the answer you&apos;re looking for, just <Link to="/contact" className="text-blue font-semibold"> Contact us!</Link>
        </p>
        <div className="py-4 md:p-8 my-10 flex flex-col gap-4 lg:gap-0 lg:flex-row">
          <div className="relative border-s border-blue w-full lg:w-[40%] h-[140px]">
            <ol className="h-full">
              {faqs.map((item) => (
                <li className="ms-4 mt-4" key={item.id}>
                  <div className="absolute w-3 h-3 bg-blue rounded-full mt-1.5 -start-1.5 border border-white"></div>
                  <time
                    className={`mb-1 text-md font-normal leading-none hover:text-blue cursor-pointer
                   ${selected === item.id ? "text-blue" : "text-secondary"}`}
                    onClick={() => setSelected(item.id)}
                  >
                    {item.title}
                  </time>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex-1">
            <h2 className="font-semibold text-secondary text-xl">
              {selectedCategory?.title}
            </h2>
            <hr className="h-[2px] text-black bg-tertiary my-2" />
            <div className="w-full mt-4 flex flex-col gap-2">
              {questionsToDisplay?.map((question, index) => (
                <CardBorder
                  key={index}
                  title={question.title}
                  content={question.desc}
                  open={question.title === selectedOption?.value}
                />
              ))}
              {!showAllQuestions && (
                <button className="text-blue underline text-left" onClick={handleViewMore}>
                  View More
                </button>
              )}
              {showAllQuestions && (
                <button className="text-blue underline text-left" onClick={handleViewMore}>
                  View Less
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Arrow/>
    </div>
  );
};

export default Companydetails;
