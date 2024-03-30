import { Request, Response } from 'express';
//import { getGroupInfo, buyAndBurn } from '../utils';
import DataHelper from '../common/DataHelper';
import { IfreeBurns } from '../interfaces/IfreeBurns';
import fetch from 'node-fetch';
import { IGroup } from '../interfaces/IGroup';
import { ethers } from 'ethers';
import { ABI_v2 } from '../common/ABI/ABI_v2';
import { ABI_v3 } from '../common/ABI/ABI_v3';
/**
 * @requires fetch to checkFreeBurns
 * @function checkFreeBurns
 * @returns {void}
 */

export async function checkFreeBurns(): Promise<void> {
    try {
        /**
         * @dev - checking free burns
         */
        const getFreeBurns = await fetch(`${DataHelper.getEndpoint(true)}/freeBurns`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const freeBurns = await getFreeBurns.json() as IfreeBurns[];
        console.log('💫Checking free burns...', freeBurns);

        if (freeBurns.length === 0) {
            await checkFreeBurns();
        }

        const newEntries = freeBurns.filter((entry) => !entry.inProgress && !entry.processed);

        for (const entry of newEntries) {
            const { _id, groupId, amount, inProgress, processed, txHash } = entry;

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
                const provider = new ethers.providers.JsonRpcProvider('wss://ethereum-sepolia-rpc.publicnode.com');
                const publicKey = DataHelper.getBBB(true);
                const wallet = new ethers.Wallet(pvt_k ?? '', provider);
                const signer = wallet.connect(provider);

                if (poolType === 'v2') {
                    const factory_v2 = new ethers.Contract(DataHelper.getV2(true), ABI_v2, signer)
                    let amountIn = ethers.utils.parseEther(amount.toString())
                    let path = [tokenAddress, DataHelper.getWETH(true)]

                    try {
                        const estimate_out_min = await factory_v2.connect(signer).getAmountsOut(amountIn, path)
                        const out_min = estimate_out_min[0]
                        const tx_v2 = await factory_v2.connect(signer)
                            .swapExactETHForTokensSupportingFeeOnTransferTokens(
                                out_min,
                                path,
                                '0x000000000000000000000000000000000000dead',
                                3600,
                                {
                                    value: amountIn
                                })

                        const receipt = await tx_v2.wait()
                        const txHash = receipt.hash

                        if (txHash) {
                            console.log('✅[V2] Buying and burning...');
                            const putClose = await fetch(`${DataHelper.getEndpoint(true)}/freeBurns/${_id}`, {
                                method: 'PUT',
                                body: JSON.stringify({ processed: true, txHash: txHash }),
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                            });
                            console.log('✅[V2] Buying and burning response:', putClose.status);
                        } else {
                            console.log('❌[V2] Buying and burning...');
                            const putClose = await fetch(`${DataHelper.getEndpoint(true)}/freeBurns/${_id}`, {
                                method: 'PUT',
                                body: JSON.stringify({ processed: false, txHash: 'Error on V2 $BuybackAndBurn' }),
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                            });
                            console.log('❌[V2] Buying and burning response:', putClose.status);
                        }
                    } catch (e: any) {
                        console.log('❌[V2] ERROR UNDEF ON ROUTER V2', e.message)
                    }
                } else if (poolType === 'v3') {
                    const factory_v3 = new ethers.Contract(DataHelper.getV3(true), ABI_v3, signer)
                    let amountIn = ethers.utils.parseEther(amount.toString())
                    let path = [tokenAddress, DataHelper.getWETHv3(true)]

                    try {
                        const estimate_out_min = await factory_v3.connect(signer).getAmountsOut(amountIn, path)
                        const out_min = estimate_out_min[0]
                        const tx_v3 = await factory_v3.connect(signer)
                            .exactInputSingle(
                                DataHelper.getWETHv3(true),
                                tokenAddress,
                                10000,
                                path,
                                '0x000000000000000000000000000000000000dead',
                                3600,
                                amountIn,
                                1,
                                0,
                                {
                                    value: amountIn
                                })

                        const receipt = await tx_v3.wait()
                        const txHash = receipt.hash

                        if (txHash) {
                            console.log('✅ [V3] Buying and burning...');
                            const putClose = await fetch(`${DataHelper.getEndpoint(true)}/freeBurns/${_id}`, {
                                method: 'PUT',
                                body: JSON.stringify({ processed: true, txHash: txHash }),
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                            });
                            console.log('✅ [V3] Buying and burning response:', putClose.status);
                        } else {
                            console.log('❌Buying and burning...');
                            const putClose = await fetch(`${DataHelper.getEndpoint(true)}/freeBurns/${_id}`, {
                                method: 'PUT',
                                body: JSON.stringify({ processed: false, txHash: 'Error on V3 $BuybackAndBurn' }),
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                            });
                            console.log('❌ [V3] Buying and burning response:', putClose.status);
                        }
                    } catch (e: any) {
                        console.log('❌ [V3] ERROR UNDEF ON ROUTER v3', e.message)
                    }
                }

            } catch (e) {
                console.log(e)
            }


            await putClose.json();

            // Invia un messaggio al gruppo tramite il bot
            ("✅Sending message to group...")
            //sendMessageToGroup(groupId, 'Il processo è stato completato!', entry.txHash);

        }
    } catch (error) {
        console.error('Errore durante il controllo delle voci freeBurns:', error);
    }
};

/**
 *
 * @requires Request to handleEndpointRequest
 * @requires Response to handleEndpointRequest
 * @returns {void}
 * */

export const handleEndpointRequest = (req: Request, res: Response) => {
    checkFreeBurns();

    res.status(200).json({ message: 'Checking free burns!' });
};