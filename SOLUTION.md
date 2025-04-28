# SETUP
Avant de commencer, j'ai rapidement modifié quelques entrées dans la BDD car certains types avaient des espaces de fin.

# BACK
Côté back, ma solution nécessite uniquement l'ajout d'une route unique qui renvoie la liste des Options, Locations et Items.

# FRONT
Côté front, la solution se sépare en trois parties: 

## La sélection d'une Option (Question).
Pour ce faire, dans ChatInput, j'ai ajouté une variable State qui suit l'état focus de l'input texte.
Lorsqu'on est focus sur l'input une liste des questions possibles s'affiche au-dessus du champ de texte.
Si une question est sélectionnée on passe à l'étape suivante en affichant un formulaire dans une pop-up.

## La construction de la requête.
Cette pop-up contient un formulaire permettant de compléter la requête selon la question choisie en choisissant un Item, une Location ou les deux.
Que ce soit un Item ou une Location, la demande est séparée en deux <SELECT>. Un premier qui permet de filtrer par le type d'item ou de location. Et un deuxième qui contient la liste filtrée (ou pas) d'items ou de locations à sélectionner.

## Envoi de la requête
Le chatbot ayant déjà une fonction permettant d'envoyer un message, j'ai décidé de l'utiliser directement.
Après une rapide vérification que le formulaire est bien rempli, la fonction est appelée avec un message construit depuis toutes les données récupérées.
A ce moment, le helper se ferme et nous sommes de retour sur le chatbot avec le message affiché.
