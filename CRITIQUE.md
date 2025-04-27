# STRUCTURE

Très bonne organisation du projet, qui est claire et modulaire, avec une bonne séparation logique. Le fonctionnement est facilement compréhensible et il semble facile de modifier les fonctionnalités existantes ou d'en ajouter de nouvelles.
On peut noter qu'il manque une gestion de state globale et d'une centralisation des tests qu'on trouverait généralement dans des projets un peu plus importants.

# CODE SOURCE

Pour commencer avec le front, les composants sont bien séparés, ce qui rend le code facilement lisible et compréhensible.
Le code en lui-même est propre et bien commenté.
Bonne utilisation de Try Catch qui permet de gérer les erreurs lors des appels à l'API.
Très bonne utilisation de states que ce soit pour les données (messages et conversations) ou pour l'UX/UI (isLoading/isTyping).
Très bonne utilisation des outils React useCallback et memo pour un très bon rendu.

Il est important de noter que la gestion des erreurs est minimale, avec uniquement un console.log. Il serait bien d'informer le user avec une alerte ou un toast et de log côté dev.
De plus, l'ID du message devrait plutôt être généré dans le back et utiliser un vrai ID unique soit en utilisant les clés primaires automatiques des base de données soit en utilisant un package type UUID. Utiliser un Date() risque d'avoir des IDs dupliqués. Si la date est nécessaire, il est possible d'ajouter une information supplémentaire à l'ID comme le numéro du message par exemple.


Côté back, le code reste simple et propre. Des Try...Catch sont présents mais cela reste encore une fois assez basique.


# CONCLUSION

Pour conclure, je définirais le niveau du code comme Haut Intermédiaire, s'approchant d'un niveau avancé surtout sur le Front.

