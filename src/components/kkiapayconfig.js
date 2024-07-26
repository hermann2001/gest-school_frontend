// kkiapayConfig.js
import { openKkiapayWidget, addSuccessListener, addFailedListener } from 'kkiapay';

const initializeKkiapay = (callback) => {
    openKkiapayWidget({
        publicKey: 'dfab22b049f311ef8a2865b7aef0cbc2', // Remplacez par votre clé publique Kkiapay
        sandbox: true, // Mettre à false pour l'environnement de production
        callback: (response) => {
            if (response.status === 'PAID') {
                alert('Paiement réussi !');
                callback('success', response);
            } else {
                alert('Paiement échoué !');
                callback('failed', response);
            }
        }
    });
};

export { initializeKkiapay, addSuccessListener, addFailedListener };
