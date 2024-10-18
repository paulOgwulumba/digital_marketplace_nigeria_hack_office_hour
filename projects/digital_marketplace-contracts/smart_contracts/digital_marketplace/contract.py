from algopy import (
    Asset,
    Global,
    Txn,
    UInt64,
    arc4,
    gtxn,
    itxn,
)

class DigitalMarketplace(arc4.ARC4Contract):
    asset_id: UInt64
    unitary_price: UInt64

    @arc4.abimethod(
        allow_actions=['NoOp'],
        create='require'
    )
    def create_application(
        self,
        unitary_price: UInt64,
        asset_id: UInt64        
    ) -> None:
        self.asset_id = asset_id
        self.unitary_price = unitary_price

    @arc4.abimethod
    def set_price(
        self,
        unitary_price: UInt64
    ) -> None:
        self.unitary_price = unitary_price

    @arc4.abimethod
    def get_price(
        self,
    ) -> UInt64:
        return self.unitary_price
    
    @arc4.abimethod
    def optin_to_asset(
        self,
        # Minimum balance requirement transaction
        mbr_txn: gtxn.PaymentTransaction
    ) -> None:
        # Make sure only the creator can call this method
        assert Txn.sender == Global.creator_address

        # Make sure opt in has not been done already
        assert not Global.current_application_address.is_opted_in(Asset(self.asset_id))

        #  Make sure smart contract is the receiver of the minimum bal. transaction
        assert mbr_txn.receiver == Global.current_application_address

        # Make sure amount in minimum bal. transaction is up to the required minimum balance
        assert mbr_txn.amount == Global.min_balance + Global.asset_opt_in_min_balance

        itxn.AssetTransfer(
            xfer_asset=self.asset_id,
            asset_amount=0,
            asset_receiver=Global.current_application_address
        ).submit()

    @arc4.abimethod
    def buy(
        self,
        buyer_txn: gtxn.PaymentTransaction,
        quantity: UInt64
    ) -> None:
        assert buyer_txn.receiver == Global.current_application_address
        assert buyer_txn.sender == Txn.sender
        assert buyer_txn.amount == self.unitary_price * quantity

        itxn.AssetTransfer(
            xfer_asset=self.asset_id,
            asset_receiver=Txn.sender,
            asset_amount=quantity
        ).submit()
    
    @arc4.abimethod(
        allow_actions=['DeleteApplication']
    )
    def delete_application(self) -> None:
        # Only creator can call this
        assert Txn.sender == Global.creator_address

        # Clear the asset balance of the contract
        itxn.AssetTransfer(
            xfer_asset=self.asset_id,
            asset_receiver=Global.creator_address,
            asset_amount=0,
            asset_close_to=Global.creator_address
        ).submit()

        # Clear the algo balance of the contract
        itxn.Payment(
            receiver=Global.creator_address,
            amount=0,
            close_remainder_to=Global.creator_address
        ).submit()