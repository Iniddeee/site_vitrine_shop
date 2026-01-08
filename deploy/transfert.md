# Guide de Transfert du Site au Client

## Étapes pour le transfert Infomaniak

### 1. Préparation du compte client
- Le client crée son compte Infomaniak
- Il choisit un hébergement Web (recommandé: Web Hosting 5CHF/mois)
- Il vous donne accès temporaire ou vous transfère le domaine

### 2. Transfert des fichiers
```bash
# Build du projet
npm run build

# Upload via FTP du dossier dist/ vers :
/htdocs/www/
```

### 3. Configuration du domaine
- Pointer le domaine vers les serveurs Infomaniak
- Attendre la propagation DNS (24-48h)

### 4. Configuration email
- Modifier `deploy/infomaniak.php` ligne 35:
  ```php
  $to = 'email-du-client@fixphone.ch';
  ```

### 5. Test final
- Tester le formulaire de contact
- Vérifier tous les liens
- Tester sur mobile/desktop

### 6. Remise des accès
- Fournir au client:
  - Accès FTP Infomaniak
  - Accès panel manager.infomaniak.com
  - Guide des modifications simples

### Coûts mensuels prévisionnels
- Hébergement Web: ~5CHF/mois
- Nom de domaine: ~15CHF/an
- Total: ~75CHF/an

### Documents à fournir
1. Facture pour le développement
2. Contrat de maintenance (optionnel)
3. Guide d'utilisation du site
4. Identifiants et accès
