import React from "react";
import fileService from "../appwrite/files";
import { Link } from "react-router-dom";

const Card = ({ $id, title, featuredImage }) => {
   return (
      <Link to={`/post/${$id}`}>
         <div className="w-full bg-gray-100 rounded-xl p-4">
            <div className="w-full justify-center mb-4">
               <img
                  className="rounded-xl"
                  src={fileService.getFilePreview(featuredImage)}
                  alt={title}
               />
            </div>
            <h2 className="text-xl font-bold">{title}</h2>
         </div>
      </Link>
   );
};

export default Card;
