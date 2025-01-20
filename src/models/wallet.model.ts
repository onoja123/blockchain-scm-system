import mongoose from 'mongoose';
import { Iwallet } from '../types/interfaces/wallet.inter';

export const WalletSchema = new mongoose.Schema<Iwallet>({
    _user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    balance: {
        type: Number,
        default: 0,
    },
    accountDetails: [
        {
            account_number: {
                type: String,
            },
            account_bank: {
                type: String,
            },
            account_name: {
                type: String,
            },
            created: {
                type: Date,
                default: Date.now,
            }
        }
    ],
    _transactions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Transaction',
        }
    ],
    lastTransacted: {
        type: Date,
        default: Date.now,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Wallet = mongoose.model<Iwallet>('Wallet', WalletSchema);

export default Wallet;
