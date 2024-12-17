import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { BASE_URL } from "../utils/BASE_URL";

const BlogCard = ({ article, onDelete }) => {
  const userEmail = localStorage.getItem("userEmail");

  const handleDelete = async () => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This action will delete the blog permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (confirm.isConfirmed) {
      try {
        const response = await fetch(`${BASE_URL}/delete-blog/${article._id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to delete the blog");
        }

        const responseData = await response.json();

        await Swal.fire({
          title: "Deleted!",
          text: responseData.message,
          icon: "success",
        });

        onDelete(article._id);
      } catch (error) {
        console.error("Error deleting blog:", error.message);

        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="bg-white shadow-lg overflow-hidden flex flex-col h-full">
      <img
        src={article?.imageUrl}
        alt={article?.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6 py-8 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-4 font-heading text-left ">{article?.title}</h3>
        {article?.content && (
          <p className="text-sm text-black flex mb-6">
            <div
              dangerouslySetInnerHTML={{
                __html: article?.content.slice(0, 120),
              }}
              className="prose text-left"
            />
          </p>
        )}
        <div className="flex justify-between items-center mt-auto">
          <Link to={`/blog-detail/${article?._id}`}>
            <button className="text-white px-4 py-2 rounded bg-sky-500 font-semibold hover:bg-sky-600">
              Read more
            </button>
          </Link>
          {userEmail === "usama.mang0901@gmail.com" && (
            <button
              onClick={handleDelete}
              className="text-white bg-red-600 font-semibold hover:bg-red-900 px-4 py-2 rounded"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
