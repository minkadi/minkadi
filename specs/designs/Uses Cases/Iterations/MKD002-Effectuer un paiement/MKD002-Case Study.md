### Case 02 Effectuer un paiement

### Acteur principal

- [ ] Agent Partenaire

### Objectifs

- [ ] L'agent effectue un paiement d'une transaction reçu après que le
      destinataire lui fasse la demande de retratit

### Preconditions

- [ ] L'agent est authentifié ( voir le cas d'utilisation S'authentifier)
- [ ] La transaction est en attente de paiement

### Postconditions

- [ ] La transaction est marquée comme payé, le justificatif de paiment peut
      être ajouté dans dans la transaction
- [ ] Un mail de notification est envoyé au client initiateur et à l'agent
      concernant le paiement

### **Scenario**

- [ ] 1 - L'agent se connecte
- [ ] 2 - cherche la transaction (doit être facile via de critère de recherche )
- [ ] 3 - commence le processus de paiement
- [ ] 4 - ajoute les informations le justificatif de paiement (un simple capture
      d'ecran si paiement mobile ou une image du reçu et de la pièce d'identité
      )
- [ ] 5 - confirme le paiement
- [ ] 6 - Un mail est envoyé au deux entitées
- [ ] 7 - La transaction est envoyé au service client pour verification
      supplémentaire, verifier que la pièce d'identité est conforme aux
      informations saisie par le client
- [ ] 8 - Le service client valide la transaction, le client est notifié,
      l'agent est notifié

!["Effectuer un paiement cas nominal"](./mkdi002_nominal.jpg "Effectuer un paiement")

### Alternatives

- [ ] 2a - transaction n'existe pas oubien la transaction n'est pas en attente
      de paiement (pending)
  - [ ] afficher une erreur si la transaction n'existe pas
  - [ ] sinon montrer une icone grisée pour montrer que la transaction n'est pas
        payable
- [ ] 6a - le justificatif de paiement n'est pas au bon format
  - [ ] afficher une erreur
- [ ] 7a - après avoir ajouter le justificatif, l'utilisateur choisi
      d'abandonner le paiement
  - [ ] supprimer l'attachementn'e ubien ajouter une option enregistrer pour
        plutard)
