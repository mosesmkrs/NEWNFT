// IMPORTING NECESSARY FILES
    // IMPORTING NECESSARY COMPONENTS
import { SignIn } from "@clerk/clerk-react"
    // IMPORTING NECESSARY MODULES
 
 // EXPORTING DEFAULT APPLYFORLAUNCHPADPAGE
 export default function AuthenticationPage(){
     // A STATE TO KEEP TRACK OF RIGHT STATE OF SIGN IN BUTTON

     return(
         // A CONTAINER FOR THE WHOLE PAGE
         <div className="min-h-[100vh] scroll-smooth box-border transition-all duration-500 ease-in-out flex justify-center items-center">
            <SignIn
                routing="path"
                path="/sign-in"
                signUpUrl="/sign-up"
                redirectUrl="/launchpad/apply%20for%20launchpad/apply"
            />
         </div>
     )
 }