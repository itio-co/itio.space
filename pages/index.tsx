import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Web3Auth } from "@web3auth/web3auth"
import { SafeEventEmitterProvider } from "@web3auth/base"
import { connectWeb3Auth } from './api/web3Auth'
import RPC from "./api/evm"
import { UserInfo } from '../models/account'
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Canvas } from "@react-three/fiber";
import { Scene } from "../components/THREE";
import { fabClasses } from '@mui/material'

const Home = () => {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);
  const [isLoading, setIsLoading] = useState(true)
  const [web3UserInfo, setWeb3UserInfo] = useState<UserInfo | null>(null);
  const [walletAddress, setWalletAddress] = useState<string[] | []>([]);
  const [balance, setBalance] = useState<string | null>(null);
  const [toggleProfile, setToggleProfile] = useState(false)

  const customTheme = createTheme({
    palette: {
      primary: {
        main: '#F3E600',
      },
    },
  });

  useEffect(() => {
    const init = async () => {
      try {

        if (provider && web3auth) {
					getProfileInfo(web3auth, provider)
				} else {
          // handle login session
          const result = await connectWeb3Auth()
          setWeb3auth(result)
					if (result && localStorage.getItem('Web3Auth-cachedAdapter')) {
						await login(result)
					}
				}

				setIsLoading(false)
      } catch (error) {
				console.log(error)
				setIsLoading(false)
      }
    }

    init()
	}, []);
	
	const getProfileInfo = async (_web3auth: Web3Auth | null, _provider: SafeEventEmitterProvider | null) => {
		try {
      if (_web3auth && _provider) {
        const { 
          aggregateVerifier,
          dappShare,
          email,
          idToken,
          name,
          profileImage,
          typeOfLogin,
          verifier,
          verifierId,
        } = await _web3auth.getUserInfo()
        setWeb3UserInfo({
          aggregateVerifier,
          dappShare,
          email,
          idToken,
          name,
          profileImage,
          typeOfLogin,
          verifier,
          verifierId,
        })

        const rpc = new RPC(_provider);
        const userAccount = await rpc.getAccounts();
        const balance = await rpc.getBalance()

        setWalletAddress(userAccount)
        setBalance(balance)
      }
    } catch (error) {
      throw(error)
    }
	}

  const login = async (_web3auth: Web3Auth | null) => {
    if (!_web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    try {
      const web3authProvider = await _web3auth.connect();
      setProvider(web3authProvider);

      await getProfileInfo(_web3auth, web3authProvider)
    } catch (error) {
      console.log(error)
    }
  }

  const logout = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    try {
			setIsLoading(true)
      await web3auth.logout();
      setProvider(null);
      setWeb3UserInfo(null)
      setWalletAddress([])
      setBalance(null)
			alert('You are logged out !')
			setIsLoading(false)
    } catch (error) {
			console.log(error)
			setIsLoading(false)
    }
  }

  const loggedInView = (
    <>
      <Button variant="outlined" onClick={logout} style={{filter: 'drop-shadow(0 3px 5px)'}}>
        Log Out
      </Button>

      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}></p>
      </div>
    </>
  )

  const unloggedInView = (
    <Button variant="outlined" onClick={() => login(web3auth)} style={{filter: 'drop-shadow(0 3px 5px)'}}>
      Login
    </Button>
  )

  console.log('>>>> web3UserInfo', web3UserInfo)

  return (
    <ThemeProvider theme={customTheme}>
      <div className={styles.container}>
        <Head>
          <title>ITIO Space</title>
          <meta name="description" content="ITIO space" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {!toggleProfile && <div className={styles.canvas}>
          <Canvas camera={{ position: [0, 20, 20] }}>
           <Scene />
          </Canvas>
        </div>}

        <div className={styles.topWrapper}>
          <div className={styles.pullLeft}>
            <a
              href="https://itios.co"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src="/itio.png" alt="itio Logo" width={64} height={38} />
            </a>
          </div>
          <div className={styles.pullRight}>
            <a
              href="https://github.com/itio-co/itio.space"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src="/GitHub-Mark-Light-32px.png" alt="Github Logo" width={32} height={32} />
            </a>
            {provider && <div onClick={() => {setToggleProfile(true)}} className={styles.profileWrapper}><img className={styles.profileImage} src={web3UserInfo.profileImage} /></div>}
            <div style={{marginLeft: '2vh'}}>{provider ? loggedInView : unloggedInView}</div>
          </div>
        </div>

        {(toggleProfile && provider) ? <main className={styles.profile}>
            <h2>{'User profile'}</h2>
            <div>{`name: ${web3UserInfo?.name}`}</div>
            <div>{`email: ${web3UserInfo?.email}`}</div>
            <div>{`login type: ${web3UserInfo?.typeOfLogin}`}</div>
            <div>{`wallet: ${walletAddress}`}</div>
            <div>{`balance: ${balance} ETH`}</div>
            <Button variant="outlined" onClick={() => {setToggleProfile(false)}} style={{marginTop: '5vh', filter: 'drop-shadow(0 2px 4px)'}}>
              Back
            </Button>
          </main> : <main className={styles.main}>
          <div className={styles.mainWrapper}>
            <h1 className={styles.title}>
              Welcome to 
              <a 
                href="https://itio.space"
                style={{color: '#F3E600', filter: 'drop-shadow(0 1px 3px)', textDecoration: 'none'}}>
                {' ITIO Space'}
              </a> |
            </h1>
          </div>
        </main>
        }

      </div>
    </ThemeProvider>
  )
}

export default Home
