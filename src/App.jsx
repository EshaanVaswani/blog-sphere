import { useEffect, useState } from "react";
import { Header, Footer } from "./components";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Outlet } from "react-router-dom";

function App() {
   const [loading, setLoading] = useState(true);
   const dispatch = useDispatch();

   useEffect(() => {
      authService
         .getCurrentUser()
         .then((userData) => {
            if (userData) {
               dispatch(login({ userData }));
            } else {
               dispatch(logout());
            }
         })
         .catch((error) => {
            console.error("Error fetching current user:", error);
            dispatch(logout());
         })
         .finally(() => setLoading(false));
   }, [dispatch]);

   if (loading) {
      return (
         <div className="min-h-screen flex items-center justify-center bg-gray-500">
            <h1>Loading...</h1>
         </div>
      );
   }

   return (
      <div className="min-h-screen flex flex-col bg-gray-500">
         <Header />
         <main className="flex-grow">
            <Outlet />
         </main>
         <Footer />
      </div>
   );
}

export default App;
