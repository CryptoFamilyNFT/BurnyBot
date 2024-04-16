import { Request, Response } from 'express';
//import { getGroupInfo, buyAndBurn } from '../utils';
import DataHelper from '../common/DataHelper';
import { IfreeBurns } from '../interfaces/IfreeBurns';
import fetch from 'node-fetch';
import { IGroup } from '../interfaces/IGroup';
import { ethers } from 'ethers';
import ICreditActivation from '../interfaces/ICreditAct';

/**
 * @requires fetch to checkFreeBurns
 * @function checkFreeBurns
 * @returns {void}
 */

export async function payer(): Promise<void> {
    try {
        /**
         * @dev - checking free burns
         */
        const getFreeBurns = await fetch(`${DataHelper.getEndpoint(true)}/creditActivation`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const freeBurns = await getFreeBurns.json() as ICreditActivation[];
        console.log('💫Checking free burns...', freeBurns);

        if (freeBurns.length === 0) {
            await payer();
        }

        const newEntries = freeBurns.filter((entry) => !entry.inProgress && !entry.processed);

        for (const entry of newEntries) {
            const { _id, groupId, amount, isVip, inProgress, processed, txHash } = entry;

            // Imposta inProgress=true per evitare elaborazioni duplicate
            const putEntry = await fetch(`${DataHelper.getEndpoint(true)}/freeBurns/${_id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    inProgress: true
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            console.log('✅Setting inProgress=true:', putEntry.status);

            /**
             * @dev - checking group info
            */
            const getGroupInfo = await fetch(`${DataHelper.getEndpoint(true)}/groupId/${groupId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('💫Getting group info...', await getGroupInfo.status);
            console.log('✅Group info:', await getGroupInfo.json() as IGroup);

            try {
                const groupInfo = await getGroupInfo.json();
                const { _id, groupId, projectName, pairAddress, tokenAddress, poolType, tokenBoughtBurned, Wins, Loss, AllAttempts } = groupInfo;
                let pvt_k = process.env.BURNY_BOT_PVT_K
                const provider = new ethers.providers.JsonRpcProvider('wss://bsc-testnet-rpc.publicnode.com');
                const publicKey = DataHelper.getBBB(true);
                const wallet = new ethers.Wallet(pvt_k ?? '', provider);
                const signer = wallet.connect(provider);

                /**
                 * @dev - send wins to the group
                 */

                if (isVip) {
                    const tx = await signer.sendTransaction({
                        to: publicKey,
                        value: ethers.utils.parseEther(amount.toString())
                    });
                    console.log('✅Sending wins to the group:', tx.hash);
                } else {
                    const tx = await signer.sendTransaction({
                        to: publicKey,
                        value: ethers.utils.parseEther(amount.toString())
                    });
                    console.log('✅Sending wins to the group:', tx.hash);
                }
            } catch (error) {
                console.error('Errore durante il controllo delle voci freeBurns:', error);
            }
        };
    }
    catch (error) {
        console.error('Errore durante il controllo delle voci freeBurns:', error);
    }
}

/**
 *
 * @requires Request to handleEndpointRequest
 * @requires Response to handleEndpointRequest
 * @returns {void}
 * */

export const handleEndpointRequest = (req: Request, res: Response) => {
    payer();

    res.status(200).json({ message: 'Checking free burns!' });
};