# Intro

Store uploaded files to your Medusa backend on Azure Blob Storage.

[Medusa Website](https://medusajs.com) | [Plugin Repository](https://github.com/theartemkovtun/medusa-file-azure-blob)

---

## Prerequisites

- [Medusa backend](https://docs.medusajs.com/development/backend/install)
- [Azure Blob Storage](https://azure.microsoft.com/en-us/products/storage/blobs)

---

## How to Install

1\. Run the following command in the directory of the Medusa backend:

```bash
npm install medusa-file-azure-blob
```

2\. Set the following environment variables in `.env`:

```bash
ACCOUNT_NAME=<YOUR_STORAGE_NAME>
ACCOUNT_KEY=<YOUR_STORAGE_KEY>
CONTAINER=<YOUR_CONTAINER_NAME>
```

3\. In `medusa-config.js` add the following at the end of the `plugins` array:

```js
const plugins = [
  // ...
  {
    resolve: `medusa-file-azure-blob',
    options: {
        account_name: process.env.ACCOUNT_NAME,
        account_key: process.env.ACCOUNT_KEY,
        container: process.env.CONTAINER
    },
  },
]
```
