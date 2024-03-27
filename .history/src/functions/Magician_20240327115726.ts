import { Request, Response } from 'express';
import { CronJob } from 'cron';
import { getGroupInfo, buyAndBurn } from '../utils';
import DataHelper from '../common/DataHelper';

// Funzione per controllare la tabella freeBurns ogni minuto
const checkFreeBurns = new CronJob('* * * * *', async () => {
    try {
        // Controlla se ci sono nuove voci non elaborate
        const getFreeBurns = await fetch(`${DataHelper.getEndpoint(false)}/freeBurns`);
        const newEntries = await FreeBurn.find({ Processed: false, inProgress: false });

        for (const entry of newEntries) {
            const { groupId, amount } = entry;

            // Imposta inProgress=true per evitare elaborazioni duplicate
            entry.inProgress = true;
            await entry.save();

            // Ottieni informazioni sul gruppo dal groupId
            const groupInfo = await getGroupInfo(groupId);

            // Esegui l'acquisto e il burn utilizzando le informazioni del gruppo
            await buyAndBurn(groupInfo.pairType, amount);

            // Imposta Processed=true e txHash
            entry.Processed = true;
            entry.txHash = '...'; // Inserisci qui la txHash generata

            // Invia un messaggio al gruppo tramite il bot
            sendMessageToGroup(groupId, 'Il processo è stato completato!', entry.txHash);

            // Salva le modifiche all'entry
            await entry.save();
        }
    } catch (error) {
        console.error('Errore durante il controllo delle voci freeBurns:', error);
    }
});

/** 
 * 
 * @requires Request to handleEndpointRequest
 * @requires Response to handleEndpointRequest
 * @returns {void}
 * */
const handleEndpointRequest = (req: Request, res: Response) => {
    checkFreeBurns.start();

    res.status(200).json({ message: 'Checking free burns!' });
};

export default handleEndpointRequest;