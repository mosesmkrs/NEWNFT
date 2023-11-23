// IMPORTING NECESSARY FILES
    // IMPORTING NECESSARY COMPONENTS
import { SignIn } from "@clerk/clerk-react"
 
 // EXPORTING DEFAULT SIGNAPPLYFORLAUNCHPADPAGE
export default function SignInAuthenticationPage(){
     return(
         // A CONTAINER FOR THE WHOLE PAGE
        <div className="min-h-[100vh] scroll-smooth box-border transition-all duration-500 ease-in-out flex justify-center items-center">
            <SignIn
                routing="path"
                path="/launchpad/apply%20for%20launchpad/auth/sign-in"
                signUpUrl="/launchpad/apply%20for%20launchpad/auth/sign-up"
                redirectUrl="/launchpad/apply%20for%20launchpad/apply"
            />
        </div>
     )
}