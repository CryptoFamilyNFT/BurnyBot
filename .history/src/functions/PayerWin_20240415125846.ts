import { Request, Response } from 'express';
//import { getGroupInfo, buyAndBurn } from '../utils';
import DataHelper from '../common/DataHelper';
import { IfreeBurns } from '../interfaces/IfreeBurns';
import fetch from 'node-fetch';
import { IGroup } from '../interfaces/IGroup';
import { ethers } from 'ethers';
import ICreditActivation from '../interfaces/ICreditAct';
import { IUser } from '../interfaces/IUser';
import ICreditWins from '../interfaces/ICreditWins';


//semplice send ETH - use user.ts to get the address and then send ETH to the address

/**
 * @requires fetch to checkFreeBurns
 * @function checkFreeBurns
 * @returns {void}
 */

export async function payerWin(): Promise<void> {
    try {
        /**
         * @dev - checking free burns
         */
        const getCreditWins = await fetch(`${DataHelper.getEndpoint(true)}/creditWins`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const freeBurns = await getCreditWins.json() as ICreditWins[];
        console.log('💫Checking free burns...', freeBurns);

        if (freeBurns.length === 0) {
            await payerWin();
        }

        const newEntries = freeBurns.filter((entry) => !entry.inProgress && !entry.processed);

        for (const entry of newEntries) {

            // Imposta inProgress=true per evitare elaborazioni duplicate
            const putEntry = await fetch(`${DataHelper.getEndpoint(true)}/creditWins/${entry.userId}`, {
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
             * @dev - checking user info
            */
            const getGroupInfo = await fetch(`${DataHelper.getEndpoint(true)}/users/${entry.userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('💫Getting user info...', await getGroupInfo.status);
            const userInfo = await getGroupInfo.json() as IUser

            if (entry.amount.toString() !== '' && entry.inProgress === true) {
                try {
                    let pvt_k = process.env.BURNY_BOT_PVT_K
                    const provider = new ethers.providers.JsonRpcProvider('https://ethereum-sepolia-rpc.publicnode.com');
                    const publicKey = DataHelper.getBBB(true);
                    const wallet = new ethers.Wallet('0xcefa960c06e3e28dad0db0f51476245c6e93c7465207e95378180df7ef23b68f' ?? '', provider); // todo fix the env import to get the pvt key
                    const signer = wallet.connect(provider);

                    /**
                    * @dev - send wins to the user
                    */
                    const tx = await signer.sendTransaction({
                        to: userInfo.Address,
                        value: ethers.utils.parseEther(entry.amount.toString())
                    });
                    console.log('✅Sending wins to the user:', tx.hash);


                    await fetch(`${DataHelper.getEndpoint(true)}/creditWins/${entry.userId}`, {
                        method: 'PUT',
                        body: JSON.stringify({
                            inProgress: true,
                            processed: true,
                            txHash: tx.hash
                        }),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                    console.log('✅Updated DB:', tx.hash);


                } catch (error) {
                    console.error('Errore durante il controllo delle voci freeBurns:', error);
                }
            }
        };
    }
    catch (error) {
        console.error('ERROR - :', error);
    }
}

/**
 *
 * @requires Request to handleEndpointRequest
 * @requires Response to handleEndpointRequest
 * @returns {void}
 * */

export const handleEndpointRequest = (req: Request, res: Response) => {
    payerWin();

    res.status(200).json({ message: 'Checking free burns!' });
};