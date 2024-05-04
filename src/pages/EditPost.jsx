import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, PostForm } from "../components";
import dbService from "../appwrite/posts";

const EditPost = () => {
   const [post, setPost] = useState(null);
   const navigate = useNavigate();
   const { slug } = useParams;

   useEffect(() => {
      if (slug) {
         dbService.getPost(slug).then((post) => {
            setPost(post);
         });
      } else {
         navigate("/");
      }
   }, [slug, navigate]);

   return post ? (
      <div className="py-8">
         <Container>
            <PostForm post={post} />
         </Container>
      </div>
   ) : null;
};

export default EditPost;
