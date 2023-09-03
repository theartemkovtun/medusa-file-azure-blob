<p align="center">
  <a href="https://www.medusajs.com">
    <img alt="Medusa" src="https://thehub-io.imgix.net/files/s3/20220829133004-0996b04d6c303a7a3292e8ce5859368a.png?fit=crop&w=300&h=300&auto=format&q=60" width="100" />
  </a>
  <a href="https://www.medusajs.com">
    <img alt="Azure" src="https://arunpotti.files.wordpress.com/2021/12/microsoft_azure.svg_.png" width="100" />
  </a>
</p>
<h1 align="center">
  Azure Blob Storage Medusa File
</h1>

<h4 align="center">
  <a href="https://www.medusajs.com" target="_blank">Medusa Website</a> |
  <a href="https://github.com/theartemkovtun/medusa-file-azure-blob" target="_blank">Plugin Repository</a>
</h4>

<p align="center">
    Store uploaded files to your Medusa backend on Azure blob storage 
</p>
<p align="center">
  <a href="https://github.com/theartemkovtun/medusa-file-azure-blob/blob/main/LICENSE" target="_blank">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Medusa is released under the MIT license." />
  </a>
  <a href="https://github.com/medusajs/medusa/blob/master/CONTRIBUTING.md" target="_blank">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat" alt="PRs welcome!" />
  </a>
  <a href="https://discord.gg/xpCwq3Kfn8" target="_blank">
    <img src="https://img.shields.io/badge/chat-on%20discord-7289DA.svg" alt="Discord Chat" />
  </a>
  <a href="https://twitter.com/intent/follow?screen_name=medusajs" target="_blank">
    <img src="https://img.shields.io/twitter/follow/medusajs.svg?label=Follow%20@medusajs" alt="Follow @medusajs" />
  </a>
</p>

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

## Test the Plugin

1\. Run the following command in the directory of the Medusa backend to run the backend:

```bash
npm run start
```

2\. Upload an image for a product using the admin dashboard or using [the Admin APIs](https://docs.medusajs.com/api/admin#tag/Upload).

## License

The Plugin is licensed under the [MIT License](https://github.com/theartemkovtun/medusa-file-azure-blob/blob/main/LICENSE).
