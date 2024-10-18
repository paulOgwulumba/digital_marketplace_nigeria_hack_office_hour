/* eslint-disable @typescript-eslint/no-explicit-any */
import * as algokit from '@algorandfoundation/algokit-utils'
import { useWallet } from '@txnlab/use-wallet'
import algosdk from 'algosdk'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { DigitalMarketplaceClient } from '../contracts/DigitalMarketplace'
import { getAlgodConfigFromViteEnvironment, getIndexerConfigFromViteEnvironment } from '../utils/network/getAlgoClientConfigs'

interface AppCallsInterface {
  openModal: boolean
  setModalState: (value: boolean) => void
  setAppId: (value: number) => void
}

const CreateApplicationModal = ({ openModal, setModalState, setAppId }: AppCallsInterface) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [unitaryPrice, setUnitaryPrice] = useState(0)
  const [assetIndex, setAssetIndex] = useState<number>()

  const algodConfig = getAlgodConfigFromViteEnvironment()
  const algodClient = algokit.getAlgoClient({
    server: algodConfig.server,
    port: algodConfig.port,
    token: algodConfig.token,
  })
  const indexerConfig = getIndexerConfigFromViteEnvironment()
  const indexer = algokit.getAlgoIndexerClient({
    server: indexerConfig.server,
    port: indexerConfig.port,
    token: indexerConfig.token,
  })

  const { enqueueSnackbar } = useSnackbar()
  const { signer, activeAddress, signTransactions, sendTransactions } = useWallet()

  const createAsset = async () => {
    setLoading(true)

    if (!signer || !activeAddress) {
      enqueueSnackbar('Please connect wallet first', { variant: 'warning' })
      return
    }

    const suggestedParams = await algodClient.getTransactionParams().do()

    const transaction = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
      suggestedParams: suggestedParams,
      assetName: 'TARABA',
      total: 1000,
      from: activeAddress,
      decimals: 0,
      defaultFrozen: false,
    })

    const encodedTransaction = algosdk.encodeUnsignedTransaction(transaction)

    const signedTransactions = await signTransactions([encodedTransaction])

    const waitRoundsToConfirm = 4

    try {
      enqueueSnackbar('Creating asset...', { variant: 'info' })
      const response: any = await sendTransactions(signedTransactions, waitRoundsToConfirm)
      const assetId = response['asset-index']
      setAssetIndex(Number(assetId))
      enqueueSnackbar(`Asset created with id ${assetId}`, { variant: 'success' })
    } catch (e) {
      enqueueSnackbar('Failed to create asset', { variant: 'error' })
    }

    setLoading(false)
  }

  const promptForAssetId = () => {
    const assetID = prompt('Enter the id of the asset')

    if (assetID) {
      setAssetIndex(Number(assetID))
    }
  }

  const createContract = async () => {
    setLoading(true)

    if (!signer || !activeAddress) {
      enqueueSnackbar('Please connect wallet first', { variant: 'warning' })
      return
    }

    const digitalMarketplaceClient = new DigitalMarketplaceClient(
      {
        resolveBy: 'id',
        id: 0,
        sender: {
          addr: activeAddress,
          signer,
        },
      },
      algodClient,
    )

    try {
      const res = await digitalMarketplaceClient.create.createApplication({
        unitaryPrice: unitaryPrice,
        assetId: assetIndex!,
      })

      enqueueSnackbar(`Contract created with id ${res.appId}`, { variant: 'success' })
      setAppId(Number(res.appId))
      console.log(res)
      setLoading(false)
    } catch (error) {
      enqueueSnackbar(`Error creating contract: ${error}`, { variant: 'error' })
      setLoading(false)
    }
  }

  return (
    <dialog id="appcalls_modal" className={`modal ${openModal ? 'modal-open' : ''} bg-slate-200`}>
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg">Create your Digital Marketplace contract</h3>
        <br />

        {assetIndex ? (
          <div className="modal-action ">
            <label>Asset Index: {assetIndex}</label>
            <button className="btn" onClick={() => setAssetIndex(undefined)}>
              Clear asset id
            </button>
          </div>
        ) : (
          <>
            <label>Enter the asset ID or create a new asset</label>
            <div className="modal-action ">
              <button className="btn" onClick={() => promptForAssetId()}>
                Enter asset id
              </button>
              <button className={`btn`} onClick={createAsset}>
                {loading ? <span className="loading loading-spinner" /> : 'Create asset'}
              </button>
            </div>
            <br />
          </>
        )}

        <br />

        <label>Enter the unit price in Algos</label>
        <input
          type="number"
          placeholder="Provide the unit price of your asset"
          className="input input-bordered w-full"
          value={String(unitaryPrice)}
          onChange={(e) => {
            setUnitaryPrice(Number(e.target.value || '0'))
          }}
        />
        <div className="modal-action ">
          <button className="btn" onClick={() => setModalState(!openModal)}>
            Close
          </button>
          <button disabled={!assetIndex || !unitaryPrice} className={`btn`} onClick={createContract}>
            {loading ? <span className="loading loading-spinner" /> : 'Send application call'}
          </button>
        </div>
      </form>
    </dialog>
  )
}

export default CreateApplicationModal

// 1034
