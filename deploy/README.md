# Déploiement sur Infomaniak - Guide Complet

## 📋 Étape par étape

### 1. Création compte Infomaniak
1. Allez sur [infomaniak.com](https://www.infomaniak.com/)
2. Créez un compte
3. Choisissez "Hébergement Web" (5CHF/mois recommandé)
4. Sélectionnez un nom de domaine (si besoin)

### 2. Build du projet
```bash
npm run build
```
Le dossier `dist/` sera créé

### 3. Configuration FTP
1. Dans le manager Infomaniak → "Hébergement"
2. Notez vos identifiants FTP:
   - Serveur: `ftp.infomaniak.com`
   - Utilisateur: fourni par Infomaniak
   - Mot de passe: fourni par Infomaniak

### 4. Upload des fichiers
Utilisez FileZilla ou le client FTP de votre choix:
```
Dossier local: dist/
Distant: /htdocs/www/
```
Upload TOUS les fichiers du dossier `dist/`

### 5. Upload du script PHP
Upload aussi `deploy/infomaniak.php` à la racine:
```
Dossier local: deploy/infomaniak.php
Distant: /htdocs/www/infomaniak.php
```

### 6. Configuration email
Éditez le fichier `infomaniak.php` en ligne (via FileZilla ou panel):
```php
$to = 'email-du-client@fixphone.ch'; // Ligne 35
```

### 7. Test
- Allez sur `https://votredomaine.ch`
- Testez le formulaire de contact
- Vérifiez la réception des emails

## 🔄 Transfert au client

### Documents à préparer:
1. **Facture** pour le développement
2. **Guide d'utilisation** simple
3. **Identifiants** à transférer:
   - FTP Infomaniak
   - Panel manager.infomaniak.com
   - Email du domaine

### Coûts récurrents:
- Hébergement: ~5CHF/mois
- Domaine: ~15CHF/an

### Contrat de maintenance (optionnel):
- Mises à jour sécurité: 20CHF/mois
- Modifications simples: 40CHF/heure
- Support prioritaire: 50CHF/mois

## 📞 Support Infomaniak
- Téléphone: 022 820 3544
- Email: support@infomaniak.com
- Chat: Disponible sur leur site

## ⚠️ Points importants
- Conservez une sauvegarde locale du projet
- Documentez tous les identifiants
- Faites une démonstration au client avant le transfert
- Prévoyez 1-2 semaines de support gratuit post-lancement
