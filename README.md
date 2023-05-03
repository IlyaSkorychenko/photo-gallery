# Local

---

## API local

1. Create and fill `.env`
2.  ```bash
    $ npm ci
    $ npm run docker:env
    $ npm run db:migration:run
    $ npm run api:start[:watch/:debug]
    ```

## Image compressor consumer

1. Install `imagemagick` (https://imagemagick.org/script/download.php)
2. ```bash
    $ npm run image-compressor:start[:watch]
    ```

## Postman

Use postman collection: `photo_gallery.postman_collection.json`

---
