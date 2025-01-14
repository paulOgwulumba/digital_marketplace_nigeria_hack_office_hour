/* eslint-disable */
// @ts-nocheck
/**
 * This file was automatically generated by @algorandfoundation/algokit-client-generator.
 * DO NOT MODIFY IT BY HAND.
 * requires: @algorandfoundation/algokit-utils: ^2
 */
import * as algokit from '@algorandfoundation/algokit-utils'
import type {
  ABIAppCallArg,
  AppCallTransactionResult,
  AppCallTransactionResultOfType,
  AppCompilationResult,
  AppReference,
  AppState,
  AppStorageSchema,
  CoreAppCallArgs,
  RawAppCallArgs,
  TealTemplateParams,
} from '@algorandfoundation/algokit-utils/types/app'
import type {
  AppClientCallCoreParams,
  AppClientCompilationParams,
  AppClientDeployCoreParams,
  AppDetails,
  ApplicationClient,
} from '@algorandfoundation/algokit-utils/types/app-client'
import type { AppSpec } from '@algorandfoundation/algokit-utils/types/app-spec'
import type { SendTransactionResult, TransactionToSign, SendTransactionFrom, SendTransactionParams } from '@algorandfoundation/algokit-utils/types/transaction'
import type { ABIResult, TransactionWithSigner } from 'algosdk'
import { Algodv2, OnApplicationComplete, Transaction, AtomicTransactionComposer, modelsv2 } from 'algosdk'
export const APP_SPEC: AppSpec = {
  "hints": {
    "create_application(uint64,uint64)void": {
      "call_config": {
        "no_op": "CREATE"
      }
    },
    "set_price(uint64)void": {
      "call_config": {
        "no_op": "CALL"
      }
    },
    "get_price()uint64": {
      "call_config": {
        "no_op": "CALL"
      }
    },
    "optin_to_asset(pay)void": {
      "call_config": {
        "no_op": "CALL"
      }
    },
    "buy(pay,uint64)void": {
      "call_config": {
        "no_op": "CALL"
      }
    },
    "delete_application()void": {
      "call_config": {
        "delete_application": "CALL"
      }
    }
  },
  "source": {
    "approval": "I3ByYWdtYSB2ZXJzaW9uIDEwCgpzbWFydF9jb250cmFjdHMuZGlnaXRhbF9tYXJrZXRwbGFjZS5jb250cmFjdC5EaWdpdGFsTWFya2V0cGxhY2UuYXBwcm92YWxfcHJvZ3JhbToKICAgIGNhbGxzdWIgX19wdXlhX2FyYzRfcm91dGVyX18KICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy5kaWdpdGFsX21hcmtldHBsYWNlLmNvbnRyYWN0LkRpZ2l0YWxNYXJrZXRwbGFjZS5fX3B1eWFfYXJjNF9yb3V0ZXJfXygpIC0+IHVpbnQ2NDoKX19wdXlhX2FyYzRfcm91dGVyX186CiAgICBwcm90byAwIDEKICAgIHR4biBOdW1BcHBBcmdzCiAgICBieiBfX3B1eWFfYXJjNF9yb3V0ZXJfX19hZnRlcl9pZl9lbHNlQDExCiAgICBtZXRob2QgImNyZWF0ZV9hcHBsaWNhdGlvbih1aW50NjQsdWludDY0KXZvaWQiCiAgICBtZXRob2QgInNldF9wcmljZSh1aW50NjQpdm9pZCIKICAgIG1ldGhvZCAiZ2V0X3ByaWNlKCl1aW50NjQiCiAgICBtZXRob2QgIm9wdGluX3RvX2Fzc2V0KHBheSl2b2lkIgogICAgbWV0aG9kICJidXkocGF5LHVpbnQ2NCl2b2lkIgogICAgbWV0aG9kICJkZWxldGVfYXBwbGljYXRpb24oKXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBfX3B1eWFfYXJjNF9yb3V0ZXJfX19jcmVhdGVfYXBwbGljYXRpb25fcm91dGVAMiBfX3B1eWFfYXJjNF9yb3V0ZXJfX19zZXRfcHJpY2Vfcm91dGVAMyBfX3B1eWFfYXJjNF9yb3V0ZXJfX19nZXRfcHJpY2Vfcm91dGVANCBfX3B1eWFfYXJjNF9yb3V0ZXJfX19vcHRpbl90b19hc3NldF9yb3V0ZUA1IF9fcHV5YV9hcmM0X3JvdXRlcl9fX2J1eV9yb3V0ZUA2IF9fcHV5YV9hcmM0X3JvdXRlcl9fX2RlbGV0ZV9hcHBsaWNhdGlvbl9yb3V0ZUA3CiAgICBpbnQgMAogICAgcmV0c3ViCgpfX3B1eWFfYXJjNF9yb3V0ZXJfX19jcmVhdGVfYXBwbGljYXRpb25fcm91dGVAMjoKICAgIHR4biBPbkNvbXBsZXRpb24KICAgICEKICAgIGFzc2VydCAvLyBPbkNvbXBsZXRpb24gaXMgTm9PcAogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgICEKICAgIGFzc2VydCAvLyBpcyBjcmVhdGluZwogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgYnRvaQogICAgY2FsbHN1YiBjcmVhdGVfYXBwbGljYXRpb24KICAgIGludCAxCiAgICByZXRzdWIKCl9fcHV5YV9hcmM0X3JvdXRlcl9fX3NldF9wcmljZV9yb3V0ZUAzOgogICAgdHhuIE9uQ29tcGxldGlvbgogICAgIQogICAgYXNzZXJ0IC8vIE9uQ29tcGxldGlvbiBpcyBOb09wCiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgYXNzZXJ0IC8vIGlzIG5vdCBjcmVhdGluZwogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgYnRvaQogICAgY2FsbHN1YiBzZXRfcHJpY2UKICAgIGludCAxCiAgICByZXRzdWIKCl9fcHV5YV9hcmM0X3JvdXRlcl9fX2dldF9wcmljZV9yb3V0ZUA0OgogICAgdHhuIE9uQ29tcGxldGlvbgogICAgIQogICAgYXNzZXJ0IC8vIE9uQ29tcGxldGlvbiBpcyBOb09wCiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgYXNzZXJ0IC8vIGlzIG5vdCBjcmVhdGluZwogICAgY2FsbHN1YiBnZXRfcHJpY2UKICAgIGl0b2IKICAgIGJ5dGUgMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludCAxCiAgICByZXRzdWIKCl9fcHV5YV9hcmM0X3JvdXRlcl9fX29wdGluX3RvX2Fzc2V0X3JvdXRlQDU6CiAgICB0eG4gT25Db21wbGV0aW9uCiAgICAhCiAgICBhc3NlcnQgLy8gT25Db21wbGV0aW9uIGlzIE5vT3AKICAgIHR4biBBcHBsaWNhdGlvbklECiAgICBhc3NlcnQgLy8gaXMgbm90IGNyZWF0aW5nCiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50IDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludCBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIGNhbGxzdWIgb3B0aW5fdG9fYXNzZXQKICAgIGludCAxCiAgICByZXRzdWIKCl9fcHV5YV9hcmM0X3JvdXRlcl9fX2J1eV9yb3V0ZUA2OgogICAgdHhuIE9uQ29tcGxldGlvbgogICAgIQogICAgYXNzZXJ0IC8vIE9uQ29tcGxldGlvbiBpcyBOb09wCiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgYXNzZXJ0IC8vIGlzIG5vdCBjcmVhdGluZwogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludCAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnQgcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBidG9pCiAgICBjYWxsc3ViIGJ1eQogICAgaW50IDEKICAgIHJldHN1YgoKX19wdXlhX2FyYzRfcm91dGVyX19fZGVsZXRlX2FwcGxpY2F0aW9uX3JvdXRlQDc6CiAgICB0eG4gT25Db21wbGV0aW9uCiAgICBpbnQgRGVsZXRlQXBwbGljYXRpb24KICAgID09CiAgICBhc3NlcnQgLy8gT25Db21wbGV0aW9uIGlzIERlbGV0ZUFwcGxpY2F0aW9uCiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgYXNzZXJ0IC8vIGlzIG5vdCBjcmVhdGluZwogICAgY2FsbHN1YiBkZWxldGVfYXBwbGljYXRpb24KICAgIGludCAxCiAgICByZXRzdWIKCl9fcHV5YV9hcmM0X3JvdXRlcl9fX2FmdGVyX2lmX2Vsc2VAMTE6CiAgICBpbnQgMAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzLmRpZ2l0YWxfbWFya2V0cGxhY2UuY29udHJhY3QuRGlnaXRhbE1hcmtldHBsYWNlLmNyZWF0ZV9hcHBsaWNhdGlvbih1bml0YXJ5X3ByaWNlOiB1aW50NjQsIGFzc2V0X2lkOiB1aW50NjQpIC0+IHZvaWQ6CmNyZWF0ZV9hcHBsaWNhdGlvbjoKICAgIHByb3RvIDIgMAogICAgYnl0ZSAiYXNzZXRfaWQiCiAgICBmcmFtZV9kaWcgLTEKICAgIGFwcF9nbG9iYWxfcHV0CiAgICBieXRlICJ1bml0YXJ5X3ByaWNlIgogICAgZnJhbWVfZGlnIC0yCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzLmRpZ2l0YWxfbWFya2V0cGxhY2UuY29udHJhY3QuRGlnaXRhbE1hcmtldHBsYWNlLnNldF9wcmljZSh1bml0YXJ5X3ByaWNlOiB1aW50NjQpIC0+IHZvaWQ6CnNldF9wcmljZToKICAgIHByb3RvIDEgMAogICAgYnl0ZSAidW5pdGFyeV9wcmljZSIKICAgIGZyYW1lX2RpZyAtMQogICAgYXBwX2dsb2JhbF9wdXQKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy5kaWdpdGFsX21hcmtldHBsYWNlLmNvbnRyYWN0LkRpZ2l0YWxNYXJrZXRwbGFjZS5nZXRfcHJpY2UoKSAtPiB1aW50NjQ6CmdldF9wcmljZToKICAgIHByb3RvIDAgMQogICAgaW50IDAKICAgIGJ5dGUgInVuaXRhcnlfcHJpY2UiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIHNlbGYudW5pdGFyeV9wcmljZSBleGlzdHMKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy5kaWdpdGFsX21hcmtldHBsYWNlLmNvbnRyYWN0LkRpZ2l0YWxNYXJrZXRwbGFjZS5vcHRpbl90b19hc3NldChtYnJfdHhuOiB1aW50NjQpIC0+IHZvaWQ6Cm9wdGluX3RvX2Fzc2V0OgogICAgcHJvdG8gMSAwCiAgICB0eG4gU2VuZGVyCiAgICBnbG9iYWwgQ3JlYXRvckFkZHJlc3MKICAgID09CiAgICBhc3NlcnQKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBpbnQgMAogICAgYnl0ZSAiYXNzZXRfaWQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIHNlbGYuYXNzZXRfaWQgZXhpc3RzCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgIQogICAgYXNzZXJ0CiAgICBmcmFtZV9kaWcgLTEKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGFzc2VydAogICAgZnJhbWVfZGlnIC0xCiAgICBndHhucyBBbW91bnQKICAgIGdsb2JhbCBNaW5CYWxhbmNlCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgICsKICAgID09CiAgICBhc3NlcnQKICAgIGl0eG5fYmVnaW4KICAgIGludCAwCiAgICBieXRlICJhc3NldF9pZCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgc2VsZi5hc3NldF9pZCBleGlzdHMKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIGludCAwCiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgaW50IGF4ZmVyCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnQgMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMuZGlnaXRhbF9tYXJrZXRwbGFjZS5jb250cmFjdC5EaWdpdGFsTWFya2V0cGxhY2UuYnV5KGJ1eWVyX3R4bjogdWludDY0LCBxdWFudGl0eTogdWludDY0KSAtPiB2b2lkOgpidXk6CiAgICBwcm90byAyIDAKICAgIGZyYW1lX2RpZyAtMgogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYXNzZXJ0CiAgICBmcmFtZV9kaWcgLTIKICAgIGd0eG5zIFNlbmRlcgogICAgdHhuIFNlbmRlcgogICAgPT0KICAgIGFzc2VydAogICAgZnJhbWVfZGlnIC0yCiAgICBndHhucyBBbW91bnQKICAgIGludCAwCiAgICBieXRlICJ1bml0YXJ5X3ByaWNlIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBzZWxmLnVuaXRhcnlfcHJpY2UgZXhpc3RzCiAgICBmcmFtZV9kaWcgLTEKICAgICoKICAgID09CiAgICBhc3NlcnQKICAgIGl0eG5fYmVnaW4KICAgIGludCAwCiAgICBieXRlICJhc3NldF9pZCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgc2VsZi5hc3NldF9pZCBleGlzdHMKICAgIHR4biBTZW5kZXIKICAgIGZyYW1lX2RpZyAtMQogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgaW50IGF4ZmVyCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnQgMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMuZGlnaXRhbF9tYXJrZXRwbGFjZS5jb250cmFjdC5EaWdpdGFsTWFya2V0cGxhY2UuZGVsZXRlX2FwcGxpY2F0aW9uKCkgLT4gdm9pZDoKZGVsZXRlX2FwcGxpY2F0aW9uOgogICAgcHJvdG8gMCAwCiAgICB0eG4gU2VuZGVyCiAgICBnbG9iYWwgQ3JlYXRvckFkZHJlc3MKICAgID09CiAgICBhc3NlcnQKICAgIGl0eG5fYmVnaW4KICAgIGludCAwCiAgICBieXRlICJhc3NldF9pZCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgc2VsZi5hc3NldF9pZCBleGlzdHMKICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwogICAgZHVwCiAgICBpdHhuX2ZpZWxkIEFzc2V0Q2xvc2VUbwogICAgaW50IDAKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGludCBheGZlcgogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50IDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4bl9iZWdpbgogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICBkdXAKICAgIGl0eG5fZmllbGQgQ2xvc2VSZW1haW5kZXJUbwogICAgaW50IDAKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBpbnQgcGF5CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnQgMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICByZXRzdWIK",
    "clear": "I3ByYWdtYSB2ZXJzaW9uIDEwCgpzbWFydF9jb250cmFjdHMuZGlnaXRhbF9tYXJrZXRwbGFjZS5jb250cmFjdC5EaWdpdGFsTWFya2V0cGxhY2UuY2xlYXJfc3RhdGVfcHJvZ3JhbToKICAgIGludCAxCiAgICByZXR1cm4K"
  },
  "state": {
    "global": {
      "num_byte_slices": 0,
      "num_uints": 2
    },
    "local": {
      "num_byte_slices": 0,
      "num_uints": 0
    }
  },
  "schema": {
    "global": {
      "declared": {
        "asset_id": {
          "type": "uint64",
          "key": "asset_id"
        },
        "unitary_price": {
          "type": "uint64",
          "key": "unitary_price"
        }
      },
      "reserved": {}
    },
    "local": {
      "declared": {},
      "reserved": {}
    }
  },
  "contract": {
    "name": "DigitalMarketplace",
    "methods": [
      {
        "name": "create_application",
        "args": [
          {
            "type": "uint64",
            "name": "unitary_price"
          },
          {
            "type": "uint64",
            "name": "asset_id"
          }
        ],
        "readonly": false,
        "returns": {
          "type": "void"
        }
      },
      {
        "name": "set_price",
        "args": [
          {
            "type": "uint64",
            "name": "unitary_price"
          }
        ],
        "readonly": false,
        "returns": {
          "type": "void"
        }
      },
      {
        "name": "get_price",
        "args": [],
        "readonly": false,
        "returns": {
          "type": "uint64"
        }
      },
      {
        "name": "optin_to_asset",
        "args": [
          {
            "type": "pay",
            "name": "mbr_txn"
          }
        ],
        "readonly": false,
        "returns": {
          "type": "void"
        }
      },
      {
        "name": "buy",
        "args": [
          {
            "type": "pay",
            "name": "buyer_txn"
          },
          {
            "type": "uint64",
            "name": "quantity"
          }
        ],
        "readonly": false,
        "returns": {
          "type": "void"
        }
      },
      {
        "name": "delete_application",
        "args": [],
        "readonly": false,
        "returns": {
          "type": "void"
        }
      }
    ],
    "networks": {}
  },
  "bare_call_config": {}
}

/**
 * Defines an onCompletionAction of 'no_op'
 */
export type OnCompleteNoOp =  { onCompleteAction?: 'no_op' | OnApplicationComplete.NoOpOC }
/**
 * Defines an onCompletionAction of 'opt_in'
 */
export type OnCompleteOptIn =  { onCompleteAction: 'opt_in' | OnApplicationComplete.OptInOC }
/**
 * Defines an onCompletionAction of 'close_out'
 */
export type OnCompleteCloseOut =  { onCompleteAction: 'close_out' | OnApplicationComplete.CloseOutOC }
/**
 * Defines an onCompletionAction of 'delete_application'
 */
export type OnCompleteDelApp =  { onCompleteAction: 'delete_application' | OnApplicationComplete.DeleteApplicationOC }
/**
 * Defines an onCompletionAction of 'update_application'
 */
export type OnCompleteUpdApp =  { onCompleteAction: 'update_application' | OnApplicationComplete.UpdateApplicationOC }
/**
 * A state record containing a single unsigned integer
 */
export type IntegerState = {
  /**
   * Gets the state value as a BigInt.
   */
  asBigInt(): bigint
  /**
   * Gets the state value as a number.
   */
  asNumber(): number
}
/**
 * A state record containing binary data
 */
export type BinaryState = {
  /**
   * Gets the state value as a Uint8Array
   */
  asByteArray(): Uint8Array
  /**
   * Gets the state value as a string
   */
  asString(): string
}

export type AppCreateCallTransactionResult = AppCallTransactionResult & Partial<AppCompilationResult> & AppReference
export type AppUpdateCallTransactionResult = AppCallTransactionResult & Partial<AppCompilationResult>

export type AppClientComposeCallCoreParams = Omit<AppClientCallCoreParams, 'sendParams'> & {
  sendParams?: Omit<SendTransactionParams, 'skipSending' | 'atc' | 'skipWaiting' | 'maxRoundsToWaitForConfirmation' | 'populateAppCallResources'>
}
export type AppClientComposeExecuteParams = Pick<SendTransactionParams, 'skipWaiting' | 'maxRoundsToWaitForConfirmation' | 'populateAppCallResources' | 'suppressLog'>

export type IncludeSchema = {
  /**
   * Any overrides for the storage schema to request for the created app; by default the schema indicated by the app spec is used.
   */
  schema?: Partial<AppStorageSchema>
}

/**
 * Defines the types of available calls and state of the DigitalMarketplace smart contract.
 */
export type DigitalMarketplace = {
  /**
   * Maps method signatures / names to their argument and return types.
   */
  methods:
    & Record<'create_application(uint64,uint64)void' | 'create_application', {
      argsObj: {
        unitaryPrice: bigint | number
        assetId: bigint | number
      }
      argsTuple: [unitaryPrice: bigint | number, assetId: bigint | number]
      returns: void
    }>
    & Record<'set_price(uint64)void' | 'set_price', {
      argsObj: {
        unitaryPrice: bigint | number
      }
      argsTuple: [unitaryPrice: bigint | number]
      returns: void
    }>
    & Record<'get_price()uint64' | 'get_price', {
      argsObj: {
      }
      argsTuple: []
      returns: bigint
    }>
    & Record<'optin_to_asset(pay)void' | 'optin_to_asset', {
      argsObj: {
        mbrTxn: TransactionToSign | Transaction | Promise<SendTransactionResult>
      }
      argsTuple: [mbrTxn: TransactionToSign | Transaction | Promise<SendTransactionResult>]
      returns: void
    }>
    & Record<'buy(pay,uint64)void' | 'buy', {
      argsObj: {
        buyerTxn: TransactionToSign | Transaction | Promise<SendTransactionResult>
        quantity: bigint | number
      }
      argsTuple: [buyerTxn: TransactionToSign | Transaction | Promise<SendTransactionResult>, quantity: bigint | number]
      returns: void
    }>
    & Record<'delete_application()void' | 'delete_application', {
      argsObj: {
      }
      argsTuple: []
      returns: void
    }>
  /**
   * Defines the shape of the global and local state of the application.
   */
  state: {
    global: {
      assetId?: IntegerState
      unitaryPrice?: IntegerState
    }
  }
}
/**
 * Defines the possible abi call signatures
 */
export type DigitalMarketplaceSig = keyof DigitalMarketplace['methods']
/**
 * Defines an object containing all relevant parameters for a single call to the contract. Where TSignature is undefined, a bare call is made
 */
export type TypedCallParams<TSignature extends DigitalMarketplaceSig | undefined> = {
  method: TSignature
  methodArgs: TSignature extends undefined ? undefined : Array<ABIAppCallArg | undefined>
} & AppClientCallCoreParams & CoreAppCallArgs
/**
 * Defines the arguments required for a bare call
 */
export type BareCallArgs = Omit<RawAppCallArgs, keyof CoreAppCallArgs>
/**
 * Maps a method signature from the DigitalMarketplace smart contract to the method's arguments in either tuple of struct form
 */
export type MethodArgs<TSignature extends DigitalMarketplaceSig> = DigitalMarketplace['methods'][TSignature]['argsObj' | 'argsTuple']
/**
 * Maps a method signature from the DigitalMarketplace smart contract to the method's return type
 */
export type MethodReturn<TSignature extends DigitalMarketplaceSig> = DigitalMarketplace['methods'][TSignature]['returns']

/**
 * A factory for available 'create' calls
 */
export type DigitalMarketplaceCreateCalls = (typeof DigitalMarketplaceCallFactory)['create']
/**
 * Defines supported create methods for this smart contract
 */
export type DigitalMarketplaceCreateCallParams =
  | (TypedCallParams<'create_application(uint64,uint64)void'> & (OnCompleteNoOp))
/**
 * A factory for available 'delete' calls
 */
export type DigitalMarketplaceDeleteCalls = (typeof DigitalMarketplaceCallFactory)['delete']
/**
 * Defines supported delete methods for this smart contract
 */
export type DigitalMarketplaceDeleteCallParams =
  | TypedCallParams<'delete_application()void'>
/**
 * Defines arguments required for the deploy method.
 */
export type DigitalMarketplaceDeployArgs = {
  deployTimeParams?: TealTemplateParams
  /**
   * A delegate which takes a create call factory and returns the create call params for this smart contract
   */
  createCall?: (callFactory: DigitalMarketplaceCreateCalls) => DigitalMarketplaceCreateCallParams
  /**
   * A delegate which takes a delete call factory and returns the delete call params for this smart contract
   */
  deleteCall?: (callFactory: DigitalMarketplaceDeleteCalls) => DigitalMarketplaceDeleteCallParams
}


/**
 * Exposes methods for constructing all available smart contract calls
 */
export abstract class DigitalMarketplaceCallFactory {
  /**
   * Gets available create call factories
   */
  static get create() {
    return {
      /**
       * Constructs a create call for the DigitalMarketplace smart contract using the create_application(uint64,uint64)void ABI method
       *
       * @param args Any args for the contract call
       * @param params Any additional parameters for the call
       * @returns A TypedCallParams object for the call
       */
      createApplication(args: MethodArgs<'create_application(uint64,uint64)void'>, params: AppClientCallCoreParams & CoreAppCallArgs & AppClientCompilationParams & (OnCompleteNoOp) = {}) {
        return {
          method: 'create_application(uint64,uint64)void' as const,
          methodArgs: Array.isArray(args) ? args : [args.unitaryPrice, args.assetId],
          ...params,
        }
      },
    }
  }

  /**
   * Gets available delete call factories
   */
  static get delete() {
    return {
      /**
       * Constructs a delete call for the DigitalMarketplace smart contract using the delete_application()void ABI method
       *
       * @param args Any args for the contract call
       * @param params Any additional parameters for the call
       * @returns A TypedCallParams object for the call
       */
      deleteApplication(args: MethodArgs<'delete_application()void'>, params: AppClientCallCoreParams & CoreAppCallArgs = {}) {
        return {
          method: 'delete_application()void' as const,
          methodArgs: Array.isArray(args) ? args : [],
          ...params,
        }
      },
    }
  }

  /**
   * Constructs a no op call for the set_price(uint64)void ABI method
   *
   * @param args Any args for the contract call
   * @param params Any additional parameters for the call
   * @returns A TypedCallParams object for the call
   */
  static setPrice(args: MethodArgs<'set_price(uint64)void'>, params: AppClientCallCoreParams & CoreAppCallArgs) {
    return {
      method: 'set_price(uint64)void' as const,
      methodArgs: Array.isArray(args) ? args : [args.unitaryPrice],
      ...params,
    }
  }
  /**
   * Constructs a no op call for the get_price()uint64 ABI method
   *
   * @param args Any args for the contract call
   * @param params Any additional parameters for the call
   * @returns A TypedCallParams object for the call
   */
  static getPrice(args: MethodArgs<'get_price()uint64'>, params: AppClientCallCoreParams & CoreAppCallArgs) {
    return {
      method: 'get_price()uint64' as const,
      methodArgs: Array.isArray(args) ? args : [],
      ...params,
    }
  }
  /**
   * Constructs a no op call for the optin_to_asset(pay)void ABI method
   *
   * @param args Any args for the contract call
   * @param params Any additional parameters for the call
   * @returns A TypedCallParams object for the call
   */
  static optinToAsset(args: MethodArgs<'optin_to_asset(pay)void'>, params: AppClientCallCoreParams & CoreAppCallArgs) {
    return {
      method: 'optin_to_asset(pay)void' as const,
      methodArgs: Array.isArray(args) ? args : [args.mbrTxn],
      ...params,
    }
  }
  /**
   * Constructs a no op call for the buy(pay,uint64)void ABI method
   *
   * @param args Any args for the contract call
   * @param params Any additional parameters for the call
   * @returns A TypedCallParams object for the call
   */
  static buy(args: MethodArgs<'buy(pay,uint64)void'>, params: AppClientCallCoreParams & CoreAppCallArgs) {
    return {
      method: 'buy(pay,uint64)void' as const,
      methodArgs: Array.isArray(args) ? args : [args.buyerTxn, args.quantity],
      ...params,
    }
  }
}

/**
 * A client to make calls to the DigitalMarketplace smart contract
 */
export class DigitalMarketplaceClient {
  /**
   * The underlying `ApplicationClient` for when you want to have more flexibility
   */
  public readonly appClient: ApplicationClient

  private readonly sender: SendTransactionFrom | undefined

  /**
   * Creates a new instance of `DigitalMarketplaceClient`
   *
   * @param appDetails appDetails The details to identify the app to deploy
   * @param algod An algod client instance
   */
  constructor(appDetails: AppDetails, private algod: Algodv2) {
    this.sender = appDetails.sender
    this.appClient = algokit.getAppClient({
      ...appDetails,
      app: APP_SPEC
    }, algod)
  }

  /**
   * Checks for decode errors on the AppCallTransactionResult and maps the return value to the specified generic type
   *
   * @param result The AppCallTransactionResult to be mapped
   * @param returnValueFormatter An optional delegate to format the return value if required
   * @returns The smart contract response with an updated return value
   */
  protected mapReturnValue<TReturn, TResult extends AppCallTransactionResult = AppCallTransactionResult>(result: AppCallTransactionResult, returnValueFormatter?: (value: any) => TReturn): AppCallTransactionResultOfType<TReturn> & TResult {
    if(result.return?.decodeError) {
      throw result.return.decodeError
    }
    const returnValue = result.return?.returnValue !== undefined && returnValueFormatter !== undefined
      ? returnValueFormatter(result.return.returnValue)
      : result.return?.returnValue as TReturn | undefined
      return { ...result, return: returnValue } as AppCallTransactionResultOfType<TReturn> & TResult
  }

  /**
   * Calls the ABI method with the matching signature using an onCompletion code of NO_OP
   *
   * @param typedCallParams An object containing the method signature, args, and any other relevant parameters
   * @param returnValueFormatter An optional delegate which when provided will be used to map non-undefined return values to the target type
   * @returns The result of the smart contract call
   */
  public async call<TSignature extends keyof DigitalMarketplace['methods']>(typedCallParams: TypedCallParams<TSignature>, returnValueFormatter?: (value: any) => MethodReturn<TSignature>) {
    return this.mapReturnValue<MethodReturn<TSignature>>(await this.appClient.call(typedCallParams), returnValueFormatter)
  }

  /**
   * Idempotently deploys the DigitalMarketplace smart contract.
   *
   * @param params The arguments for the contract calls and any additional parameters for the call
   * @returns The deployment result
   */
  public deploy(params: DigitalMarketplaceDeployArgs & AppClientDeployCoreParams & IncludeSchema = {}): ReturnType<ApplicationClient['deploy']> {
    const createArgs = params.createCall?.(DigitalMarketplaceCallFactory.create)
    const deleteArgs = params.deleteCall?.(DigitalMarketplaceCallFactory.delete)
    return this.appClient.deploy({
      ...params,
      deleteArgs,
      createArgs,
      createOnCompleteAction: createArgs?.onCompleteAction,
    })
  }

  /**
   * Gets available create methods
   */
  public get create() {
    const $this = this
    return {
      /**
       * Creates a new instance of the DigitalMarketplace smart contract using the create_application(uint64,uint64)void ABI method.
       *
       * @param args The arguments for the smart contract call
       * @param params Any additional parameters for the call
       * @returns The create result
       */
      async createApplication(args: MethodArgs<'create_application(uint64,uint64)void'>, params: AppClientCallCoreParams & AppClientCompilationParams & IncludeSchema & CoreAppCallArgs & (OnCompleteNoOp) = {}) {
        return $this.mapReturnValue<MethodReturn<'create_application(uint64,uint64)void'>, AppCreateCallTransactionResult>(await $this.appClient.create(DigitalMarketplaceCallFactory.create.createApplication(args, params)))
      },
    }
  }

  /**
   * Gets available delete methods
   */
  public get delete() {
    const $this = this
    return {
      /**
       * Deletes an existing instance of the DigitalMarketplace smart contract using the delete_application()void ABI method.
       *
       * @param args The arguments for the smart contract call
       * @param params Any additional parameters for the call
       * @returns The delete result
       */
      async deleteApplication(args: MethodArgs<'delete_application()void'>, params: AppClientCallCoreParams & CoreAppCallArgs = {}) {
        return $this.mapReturnValue<MethodReturn<'delete_application()void'>>(await $this.appClient.delete(DigitalMarketplaceCallFactory.delete.deleteApplication(args, params)))
      },
    }
  }

  /**
   * Makes a clear_state call to an existing instance of the DigitalMarketplace smart contract.
   *
   * @param args The arguments for the bare call
   * @returns The clear_state result
   */
  public clearState(args: BareCallArgs & AppClientCallCoreParams & CoreAppCallArgs = {}) {
    return this.appClient.clearState(args)
  }

  /**
   * Calls the set_price(uint64)void ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The result of the call
   */
  public setPrice(args: MethodArgs<'set_price(uint64)void'>, params: AppClientCallCoreParams & CoreAppCallArgs = {}) {
    return this.call(DigitalMarketplaceCallFactory.setPrice(args, params))
  }

  /**
   * Calls the get_price()uint64 ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The result of the call
   */
  public getPrice(args: MethodArgs<'get_price()uint64'>, params: AppClientCallCoreParams & CoreAppCallArgs = {}) {
    return this.call(DigitalMarketplaceCallFactory.getPrice(args, params))
  }

  /**
   * Calls the optin_to_asset(pay)void ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The result of the call
   */
  public optinToAsset(args: MethodArgs<'optin_to_asset(pay)void'>, params: AppClientCallCoreParams & CoreAppCallArgs = {}) {
    return this.call(DigitalMarketplaceCallFactory.optinToAsset(args, params))
  }

  /**
   * Calls the buy(pay,uint64)void ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The result of the call
   */
  public buy(args: MethodArgs<'buy(pay,uint64)void'>, params: AppClientCallCoreParams & CoreAppCallArgs = {}) {
    return this.call(DigitalMarketplaceCallFactory.buy(args, params))
  }

  /**
   * Extracts a binary state value out of an AppState dictionary
   *
   * @param state The state dictionary containing the state value
   * @param key The key of the state value
   * @returns A BinaryState instance containing the state value, or undefined if the key was not found
   */
  private static getBinaryState(state: AppState, key: string): BinaryState | undefined {
    const value = state[key]
    if (!value) return undefined
    if (!('valueRaw' in value))
      throw new Error(`Failed to parse state value for ${key}; received an int when expected a byte array`)
    return {
      asString(): string {
        return value.value
      },
      asByteArray(): Uint8Array {
        return value.valueRaw
      }
    }
  }

  /**
   * Extracts a integer state value out of an AppState dictionary
   *
   * @param state The state dictionary containing the state value
   * @param key The key of the state value
   * @returns An IntegerState instance containing the state value, or undefined if the key was not found
   */
  private static getIntegerState(state: AppState, key: string): IntegerState | undefined {
    const value = state[key]
    if (!value) return undefined
    if ('valueRaw' in value)
      throw new Error(`Failed to parse state value for ${key}; received a byte array when expected a number`)
    return {
      asBigInt() {
        return typeof value.value === 'bigint' ? value.value : BigInt(value.value)
      },
      asNumber(): number {
        return typeof value.value === 'bigint' ? Number(value.value) : value.value
      },
    }
  }

  /**
   * Returns the smart contract's global state wrapped in a strongly typed accessor with options to format the stored value
   */
  public async getGlobalState(): Promise<DigitalMarketplace['state']['global']> {
    const state = await this.appClient.getGlobalState()
    return {
      get assetId() {
        return DigitalMarketplaceClient.getIntegerState(state, 'asset_id')
      },
      get unitaryPrice() {
        return DigitalMarketplaceClient.getIntegerState(state, 'unitary_price')
      },
    }
  }

  public compose(): DigitalMarketplaceComposer {
    const client = this
    const atc = new AtomicTransactionComposer()
    let promiseChain:Promise<unknown> = Promise.resolve()
    const resultMappers: Array<undefined | ((x: any) => any)> = []
    return {
      setPrice(args: MethodArgs<'set_price(uint64)void'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs) {
        promiseChain = promiseChain.then(() => client.setPrice(args, {...params, sendParams: {...params?.sendParams, skipSending: true, atc}}))
        resultMappers.push(undefined)
        return this
      },
      getPrice(args: MethodArgs<'get_price()uint64'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs) {
        promiseChain = promiseChain.then(() => client.getPrice(args, {...params, sendParams: {...params?.sendParams, skipSending: true, atc}}))
        resultMappers.push(undefined)
        return this
      },
      optinToAsset(args: MethodArgs<'optin_to_asset(pay)void'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs) {
        promiseChain = promiseChain.then(() => client.optinToAsset(args, {...params, sendParams: {...params?.sendParams, skipSending: true, atc}}))
        resultMappers.push(undefined)
        return this
      },
      buy(args: MethodArgs<'buy(pay,uint64)void'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs) {
        promiseChain = promiseChain.then(() => client.buy(args, {...params, sendParams: {...params?.sendParams, skipSending: true, atc}}))
        resultMappers.push(undefined)
        return this
      },
      get delete() {
        const $this = this
        return {
          deleteApplication(args: MethodArgs<'delete_application()void'>, params?: AppClientComposeCallCoreParams) {
            promiseChain = promiseChain.then(() => client.delete.deleteApplication(args, {...params, sendParams: {...params?.sendParams, skipSending: true, atc}}))
            resultMappers.push(undefined)
            return $this
          },
        }
      },
      clearState(args?: BareCallArgs & AppClientComposeCallCoreParams & CoreAppCallArgs) {
        promiseChain = promiseChain.then(() => client.clearState({...args, sendParams: {...args?.sendParams, skipSending: true, atc}}))
        resultMappers.push(undefined)
        return this
      },
      addTransaction(txn: TransactionWithSigner | TransactionToSign | Transaction | Promise<SendTransactionResult>, defaultSender?: SendTransactionFrom) {
        promiseChain = promiseChain.then(async () => atc.addTransaction(await algokit.getTransactionWithSigner(txn, defaultSender ?? client.sender)))
        return this
      },
      async atc() {
        await promiseChain
        return atc
      },
      async simulate(options?: SimulateOptions) {
        await promiseChain
        const result = await atc.simulate(client.algod, new modelsv2.SimulateRequest({ txnGroups: [], ...options }))
        return {
          ...result,
          returns: result.methodResults?.map((val, i) => resultMappers[i] !== undefined ? resultMappers[i]!(val.returnValue) : val.returnValue)
        }
      },
      async execute(sendParams?: AppClientComposeExecuteParams) {
        await promiseChain
        const result = await algokit.sendAtomicTransactionComposer({ atc, sendParams }, client.algod)
        return {
          ...result,
          returns: result.returns?.map((val, i) => resultMappers[i] !== undefined ? resultMappers[i]!(val.returnValue) : val.returnValue)
        }
      }
    } as unknown as DigitalMarketplaceComposer
  }
}
export type DigitalMarketplaceComposer<TReturns extends [...any[]] = []> = {
  /**
   * Calls the set_price(uint64)void ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The typed transaction composer so you can fluently chain multiple calls or call execute to execute all queued up transactions
   */
  setPrice(args: MethodArgs<'set_price(uint64)void'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs): DigitalMarketplaceComposer<[...TReturns, MethodReturn<'set_price(uint64)void'>]>

  /**
   * Calls the get_price()uint64 ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The typed transaction composer so you can fluently chain multiple calls or call execute to execute all queued up transactions
   */
  getPrice(args: MethodArgs<'get_price()uint64'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs): DigitalMarketplaceComposer<[...TReturns, MethodReturn<'get_price()uint64'>]>

  /**
   * Calls the optin_to_asset(pay)void ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The typed transaction composer so you can fluently chain multiple calls or call execute to execute all queued up transactions
   */
  optinToAsset(args: MethodArgs<'optin_to_asset(pay)void'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs): DigitalMarketplaceComposer<[...TReturns, MethodReturn<'optin_to_asset(pay)void'>]>

  /**
   * Calls the buy(pay,uint64)void ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The typed transaction composer so you can fluently chain multiple calls or call execute to execute all queued up transactions
   */
  buy(args: MethodArgs<'buy(pay,uint64)void'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs): DigitalMarketplaceComposer<[...TReturns, MethodReturn<'buy(pay,uint64)void'>]>

  /**
   * Gets available delete methods
   */
  readonly delete: {
    /**
     * Deletes an existing instance of the DigitalMarketplace smart contract using the delete_application()void ABI method.
     *
     * @param args The arguments for the smart contract call
     * @param params Any additional parameters for the call
     * @returns The typed transaction composer so you can fluently chain multiple calls or call execute to execute all queued up transactions
     */
    deleteApplication(args: MethodArgs<'delete_application()void'>, params?: AppClientComposeCallCoreParams): DigitalMarketplaceComposer<[...TReturns, MethodReturn<'delete_application()void'>]>
  }

  /**
   * Makes a clear_state call to an existing instance of the DigitalMarketplace smart contract.
   *
   * @param args The arguments for the bare call
   * @returns The typed transaction composer so you can fluently chain multiple calls or call execute to execute all queued up transactions
   */
  clearState(args?: BareCallArgs & AppClientComposeCallCoreParams & CoreAppCallArgs): DigitalMarketplaceComposer<[...TReturns, undefined]>

  /**
   * Adds a transaction to the composer
   *
   * @param txn One of: A TransactionWithSigner object (returned as is), a TransactionToSign object (signer is obtained from the signer property), a Transaction object (signer is extracted from the defaultSender parameter), an async SendTransactionResult returned by one of algokit utils helpers (signer is obtained from the defaultSender parameter)
   * @param defaultSender The default sender to be used to obtain a signer where the object provided to the transaction parameter does not include a signer.
   */
  addTransaction(txn: TransactionWithSigner | TransactionToSign | Transaction | Promise<SendTransactionResult>, defaultSender?: SendTransactionFrom): DigitalMarketplaceComposer<TReturns>
  /**
   * Returns the underlying AtomicTransactionComposer instance
   */
  atc(): Promise<AtomicTransactionComposer>
  /**
   * Simulates the transaction group and returns the result
   */
  simulate(options?: SimulateOptions): Promise<DigitalMarketplaceComposerSimulateResult<TReturns>>
  /**
   * Executes the transaction group and returns the results
   */
  execute(sendParams?: AppClientComposeExecuteParams): Promise<DigitalMarketplaceComposerResults<TReturns>>
}
export type SimulateOptions = Omit<ConstructorParameters<typeof modelsv2.SimulateRequest>[0], 'txnGroups'>
export type DigitalMarketplaceComposerSimulateResult<TReturns extends [...any[]]> = {
  returns: TReturns
  methodResults: ABIResult[]
  simulateResponse: modelsv2.SimulateResponse
}
export type DigitalMarketplaceComposerResults<TReturns extends [...any[]]> = {
  returns: TReturns
  groupId: string
  txIds: string[]
  transactions: Transaction[]
}
