// IMPORTING REACT ROUTER
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
//import React from 'react'
import { useContext, useMemo } from "react";
import { createTheme, ThemeProvider, CssBaseline} from "@mui/material";
import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react';
import { MeshProvider } from "@meshsdk/react";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";

import { WagmiConfig } from "wagmi";
import { arbitrum, mainnet } from "wagmi/chains";
// IMPORTING THE NECESSARY PAGES AND LAYOUTS
import AllCollectionsPage from './pages/AllCollectionsPage';
import AllNftsPage from './pages/AllNftsPage';
import RewardsPage from './pages/RewardsPage'
import HomePage from './pages/Home/HomePage';
import LaunchpadPage from './pages/launchpadPage';
import LaunchesPage from './pages/LaunchesPage';
import ApplyForLaunchpadPage from "./pages/ApplyForLaunchpadPage"
import SignInAuthenticationPage from './pages/SignInAuthenticationPage';
import SignUpAuthenticationPage from './pages/SignUpAuthenticationPage';

import TeamPage from './pages/TeamPage';
import VerificationPage from './pages/VerificationPage';

import MiningPage from './pages/MiningPage'
import ImpactPage from './pages/ImpactPage';
import Faq from './pages/Faq';
import TnC from './pages/T&C';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import Profile from './pages/profile';
import SingleCollection from './pages/singleCollection';

import RootLayout from './layouts/RootLayout'
import {ThemeContext} from "./contexts/ThemeProvider";

// 1. Get projectId
const projectId = "a0879b9bbc96eb062ae8c28089833657";

// 2. Create wagmiConfig
const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Component",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [mainnet, arbitrum];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains });

// CREATING A APPROUTER FUNCTION
const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      {/* AUTH */}
      <Route path='auth'>
        <Route path="sign-in" element={<SignInAuthenticationPage/>}>
          {/* NO PROPS FOR THIS CLERK ELEMENT AS BEHAVIOUR IS DESCRIBED BY PARENT */}
          <Route path="sso-callback" element={<AuthenticateWithRedirectCallback />}/>
        </Route>

        <Route path="sign-up" element={<SignUpAuthenticationPage/>}>
          {/* NO PROPS FOR THIS CLERK ELEMENT AS BEHAVIOUR IS DESCRIBED BY PARENT */}
          <Route path="sso-callback" element={<AuthenticateWithRedirectCallback />}/>
        </Route>
      </Route>

      {/* HOMEPAGE */}
      <Route path="/" element={<HomePage />}></Route>
      <Route path="home" element={<HomePage />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/singleCollection" element={<SingleCollection />}></Route>

      {/* REWARDS */}
      <Route path="rewards" element={<RewardsPage />}></Route>

      {/* EXPLORE */}
      <Route path="explore">
        <Route path="allCollections" element={<AllCollectionsPage />}></Route>
        <Route path="allNFTs" element={<AllNftsPage />}></Route>
      </Route>

      {/* ABOUT */}
      <Route path="about">
        <Route path="team" element={<TeamPage />}></Route>
        <Route path="impact" element={<ImpactPage />}></Route>
        <Route path="FAQ" element={<Faq />}></Route>
        <Route path="T&C" element={<TnC />}></Route>
        <Route path="privacy-policy" element={<PrivacyPolicyPage />}></Route>
      </Route>

      {/* CREATORS */}
      <Route path="creators">
        <Route path="verification" element={<VerificationPage />}></Route>
        <Route path="mining" element={<MiningPage />}></Route>
      </Route>

      {/* LAUNCHPAD */}
      <Route path='launchpad'>
        <Route path='launches' element={<LaunchesPage/>}></Route>
        <Route path='launch details' element={<LaunchpadPage/>}></Route>
        <Route path='apply for launchpad' element={<ApplyForLaunchpadPage/>}></Route>
      </Route>
    </Route>
  )
);

// CREATING AN APP FUNCTION
export default function App() {
  const [mode] = useContext(ThemeContext)
  
  const getDesignTokens = (mode) => ({
    palette: {
      mode,
     
      ...(mode === 'dark' ? {
        background: {
          default: '#141414',
          paper: '#141414',
        },
      }: {
        background: {
          default:'#fff',
          paper: 'whitesmoke'
        }
      }),
      text: {
        ...(mode === 'light'
          ? {
            primary: '#000',
            secondary:'#9ca3af'
            }
          : {
              primary: '#fff',
              secondary:'#9ca3af',
            }),
      },
    },
  });

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <div>
      <MeshProvider>
          <WagmiConfig config={wagmiConfig}>
            <RouterProvider router={appRouter} />
          </WagmiConfig>
        </MeshProvider>
      </div>
    </ThemeProvider>
  );
}

