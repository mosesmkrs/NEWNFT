// IMPORTING NECESSARY FILES
    // IMPORTING NECESSARY MODULES
import { UserButton, UserProfile } from "@clerk/clerk-react"

// EXPORTING DEFAULT APPLYFORLAUNCHPADPAGE
export default function ApplyForLaunchpadPage(){
    return(
        // A CONTAINER FOR THE WHOLE PAGE
        <div className="min-h-[100vh] scroll-smooth box-border transition-all duration-500 ease-in-out flex justify-center items-center">
            <UserButton
                showName={true}
                signInUrl="/launchpad/apply%20for%20launchpad/auth/sign-in"
                afterSignOutUrl="/"
                defaultOpen={false}
            />
        </div>
    )
}