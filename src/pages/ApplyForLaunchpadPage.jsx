// IMPORTING NECESSARY FILES
    // IMPORTING NECESSARY MODULES
import { UserButton, SignedIn, SignedOut, RedirectToSignIn} from "@clerk/clerk-react"

// EXPORTING DEFAULT APPLYFORLAUNCHPADPAGE
export default function ApplyForLaunchpadPage(){
    return(
        // A CONTAINER FOR THE WHOLE PAGE
        <div className="min-h-[100vh] scroll-smooth box-border transition-all duration-500 ease-in-out flex justify-center items-center">
            <SignedIn>
                <UserButton
                    showName={true}
                    signInUrl="/auth/sign-in"
                    afterSignOutUrl="/"
                    afterMultiSessionSingleSignOutUrl="/"
                    afterSwitchSessionUrl="/"
                    defaultOpen={false}
                />
            </SignedIn>

            <SignedOut>
                <RedirectToSignIn redirectUrl="/launchpad/apply%20for%20launchpad"/>
            </SignedOut>
        </div>
    )
}