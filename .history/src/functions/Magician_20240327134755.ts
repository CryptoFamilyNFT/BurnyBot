import { Request, Response } from 'express';
//import { getGroupInfo, buyAndBurn } from '../utils';
import DataHelper from '../common/DataHelper';
import { IfreeBurns } from '../interfaces/IfreeBurns';
import fetch from 'node-fetch';
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
            const { groupId, amount } = entry;

            // Imposta inProgress=true per evitare elaborazioni duplicate
            const putEntry = await fetch(`${DataHelper.getEndpoint(true)}/freeBurns/${entry.id}`, {
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
            console.log('💫Getting group info...', getGroupInfo.status);
            console.log('✅Group info:', getGroupInfo);

            // Esegui l'acquisto e il burn utilizzando le informazioni del gruppo
            console.log('✅Buying and burning...')
            //await buyAndBurn(groupInfo.pairType, amount);

            // Imposta Processed=true e txHash
            const putClose = await fetch(`${DataHelper.getEndpoint(true)}/freeBurns/${entry.groupId}`, {
                method: 'PUT',
                body: JSON.stringify({ Processed: true, txHash: '...done_test_1' }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })

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