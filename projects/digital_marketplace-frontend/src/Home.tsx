// src/components/Home.tsx
import { useWallet } from '@txnlab/use-wallet'
import React, { useState } from 'react'
import AppCalls from './components/AppCalls'
import ConnectWallet from './components/ConnectWallet'
import CreateApplicationModal from './components/CreateApplicationModal'
import OptinModal from './components/OptinModal'
import Transact from './components/Transact'

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [openWalletModal, setOpenWalletModal] = useState<boolean>(false)
  const [openDemoModal, setOpenDemoModal] = useState<boolean>(false)
  const [appCallsDemoModal, setAppCallsDemoModal] = useState<boolean>(false)
  const [createAppModal, setCreateAppModal] = useState<boolean>(false)
  const [optinModal, setOptinModal] = useState<boolean>(false)
  const [appId, setAppId] = useState<number>()
  const { activeAddress } = useWallet()

  const toggleWalletModal = () => {
    setOpenWalletModal(!openWalletModal)
  }

  return (
    <div className="hero min-h-screen bg-teal-400">
      <div className="hero-content text-center rounded-lg p-6 max-w-md bg-white mx-auto">
        <div className="max-w-md">
          <h1 className="text-4xl">
            Welcome to <div className="font-bold">AlgoKit 🙂</div>
          </h1>
          <p className="py-6">
            This starter has been generated using official AlgoKit React template. Refer to the resource below for next steps.
          </p>

          <div className="grid">
            <div className="divider" />
            <button data-test-id="connect-wallet" className="btn m-2" onClick={toggleWalletModal}>
              Wallet Connection
            </button>

            {/* {activeAddress && (
              <button data-test-id="transactions-demo" className="btn m-2" onClick={toggleDemoModal}>
                Transactions Demo
              </button>
            )} */}

            {/* {activeAddress && (
              <button data-test-id="appcalls-demo" className="btn m-2" onClick={toggleAppCallsModal}>
                Contract Interactions Demo
              </button>
            )} */}

            {!!activeAddress && !appId && (
              <button data-test-id="transactions-demo" className="btn m-2" onClick={() => setCreateAppModal(true)}>
                Create application
              </button>
            )}

            {!!activeAddress && !!appId && (
              <button data-test-id="transactions-demo" className="btn m-2" onClick={() => setOptinModal(true)}>
                Optin Smart Contract to Asset
              </button>
            )}
          </div>

          <ConnectWallet openModal={openWalletModal} closeModal={toggleWalletModal} />
          <Transact openModal={openDemoModal} setModalState={setOpenDemoModal} />
          <AppCalls openModal={appCallsDemoModal} setModalState={setAppCallsDemoModal} />
          <CreateApplicationModal setAppId={setAppId} openModal={createAppModal} setModalState={setCreateAppModal} />
          {optinModal && !!appId && <OptinModal appId={appId} setModalState={setOptinModal} />}
        </div>
      </div>
    </div>
  )
}

export default Home
