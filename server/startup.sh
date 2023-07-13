#!/bin/sh

# Attendre que la base de données soit accessible
while ! nc -z db 5432; do
    echo "La base de données n'est pas encore accessible. Attente..."
    sleep 1
done

# Exécuter la commande de migration
if npx sequelize-cli db:migrate; then
    # Démarrer l'application
    npm start
else
    echo "La migration a échoué. Arrêt de l'application."
fi
