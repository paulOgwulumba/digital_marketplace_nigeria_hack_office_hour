/* eslint-disable @typescript-eslint/no-explicit-any */
import * as algokit from '@algorandfoundation/algokit-utils'
import { useWallet } from '@txnlab/use-wallet'
import algosdk from 'algosdk'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { DigitalMarketplaceClient } from '../contracts/DigitalMarketplace'
import { getAlgodConfigFromViteEnvironment } from '../utils/network/getAlgoClientConfigs'

interface AppCallsInterface {
  setModalState: (value: boolean) => void
  appId: number
}

const OptinModal = ({ setModalState, appId }: AppCallsInterface) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [optinStatus, setOptinStatus] = useState(false)
  const [isOptedIn, setIsOptedIn] = useState(false)

  const algodConfig = getAlgodConfigFromViteEnvironment()
  const algodClient = algokit.getAlgoClient({
    server: algodConfig.server,
    port: algodConfig.port,
    token: algodConfig.token,
  })

  const { enqueueSnackbar } = useSnackbar()
  const { signer, activeAddress } = useWallet()

  const digitalMarketplaceClient = new DigitalMarketplaceClient(
    {
      resolveBy: 'id',
      id: Number(appId),
      sender: {
        addr: activeAddress!,
        signer,
      },
    },
    algodClient,
  )

  const optinSmartContract = async () => {
    setLoading(true)

    if (!signer || !activeAddress) {
      enqueueSnackbar('Please connect wallet first', { variant: 'warning' })
      return
    }

    const appAddress = algosdk.getApplicationAddress(appId)
    const mbrTransaction = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from: activeAddress,
      to: appAddress,
      amount: algokit.microAlgos(200_000).microAlgos,
      suggestedParams: await algodClient.getTransactionParams().do(),
    })

    const appGlobalState = await digitalMarketplaceClient.getGlobalState()
    const assetId = appGlobalState.assetId!.asNumber()

    try {
      const response = await digitalMarketplaceClient.optinToAsset(
        {
          mbrTxn: {
            signer: {
              signer,
              addr: activeAddress,
            },
            transaction: mbrTransaction,
          },
        },
        {
          sendParams: {
            fee: algokit.microAlgos(2_000),
          },
          assets: [assetId],
        },
      )

      enqueueSnackbar('Smart contract opted in to the asset', { variant: 'success' })
      setLoading(false)
      setModalState(false)
    } catch (error) {
      enqueueSnackbar('Failed to opt in the smart contract to the asset', { variant: 'error' })
      setLoading(false)
    }
  }

  const checkOptinStatus = async () => {
    const appAddress = algosdk.getApplicationAddress(appId)
    const appGlobalState = await digitalMarketplaceClient.getGlobalState()

    try {
      const res = await algodClient.accountAssetInformation(appAddress, appGlobalState.assetId!.asNumber()).do()
      enqueueSnackbar('The app is opted in already')
      setIsOptedIn(true)
    } catch (err) {
      enqueueSnackbar('The app is not opted in to the asset', { variant: 'error' })
      setIsOptedIn(false)
    }

    setOptinStatus(true)
  }

  return (
    <dialog id="appcalls_modal" className={`modal modal-open bg-slate-200`}>
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg">Opt in smart contract to Asset</h3>
        <br />
        <div className="modal-action ">
          <button className="btn" onClick={() => setModalState(false)}>
            Close
          </button>
          {!optinStatus && (
            <button className={`btn`} onClick={checkOptinStatus}>
              {loading ? <span className="loading loading-spinner" /> : 'Check opt-in status'}
            </button>
          )}
          {optinStatus && !isOptedIn && (
            <button className={`btn`} onClick={optinSmartContract}>
              {loading ? <span className="loading loading-spinner" /> : 'Opt smart contract into asset'}
            </button>
          )}
        </div>
      </form>
    </dialog>
  )
}

export default OptinModal

// 1034
