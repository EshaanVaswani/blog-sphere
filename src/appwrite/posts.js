import config from "../config/config";
import { Client, Databases, Query } from "appwrite";

export class PostService {
   client = new Client();
   databases;

   constructor() {
      this.client
         .setEndpoint(config.appwriteUrl)
         .setProject(config.appwriteProjectId);
      this.databases = new Databases(this.client);
   }

   async createPost({ title, slug, content, featuredImage, status, userId }) {
      try {
         return await this.databases.createDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug,
            {
               title,
               content,
               featuredImage,
               status,
               userId,
            }
         );
      } catch (error) {
         console.log("Appwrite service :: createPost :: error", error);
      }
   }

   async updatePost(slug, { title, content, featuredImage, status }) {
      try {
         return await this.databases.updateDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug,
            {
               title,
               content,
               featuredImage,
               status,
            }
         );
      } catch (error) {
         console.log("Appwrite service :: updatePost :: error", error);
      }
   }

   async deletePost(slug) {
      try {
         await this.databases.deleteDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug
         );
         return true;
      } catch (error) {
         console.log("Appwrite service :: deletePost :: error", error);
         return false;
      }
   }

   async getPost(slug) {
      try {
         return await this.databases.getDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug
         );
      } catch (error) {
         console.log("Appwrite service :: getPost :: error", error);
         return false;
      }
   }

   async getPosts(queries = [Query.equal("status", "active")]) {
      try {
         return await this.databases.listDocuments(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            queries
         );
      } catch (error) {
         console.log("Appwrite service :: getPosts :: error", error);
      }
   }
}

const dbService = new PostService();

export default dbService;
