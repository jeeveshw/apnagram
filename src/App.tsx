 import {Routes, Route} from "react-router-dom";
import "./globals.css";
import { SigninForm } from "./_auth/forms/SigninForm";
import { Home } from "./_root/pages";
import SignUpForm from "./_auth/forms/SignupForm";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import { Toaster } from "@/components/ui/toaster";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
          {/* Public route*/}
          <Route element={<AuthLayout />}>

          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />

          </Route>


        {/*private route */}
        <Route  element={<RootLayout />}>

             <Route index element={<Home />} />
        </Route>

      </Routes>
         
      <Toaster />  

    </main>
  )
}

export default App;