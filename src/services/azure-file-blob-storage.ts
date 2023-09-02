import { AbstractFileService } from "@medusajs/medusa"
import fs from "fs";
import { parse } from "path"
import stream from "stream"
import {
  DeleteFileType,
  FileServiceGetUploadStreamResult,
  FileServiceUploadResult,
  GetUploadedFileType,
  UploadStreamDescriptorType,
} from "@medusajs/types"
import {
    ContainerClient,
    StorageSharedKeyCredential
} from '@azure/storage-blob';

class AzureBlobStorageFileService extends AbstractFileService {

    private _DEFAULT_CONTAINER_NAME = 'medusa-files';

    private _account_name: string;
    private _account_key: string;
    private _container: string;

    private _shared_key_credential: StorageSharedKeyCredential;
    private _baseUrl: string;

    constructor({}, options) {
        super({}, options)
    
        this._account_name = options.account_name;
        this._account_key = options.account_key;
        this._container = (options.container ?? this._DEFAULT_CONTAINER_NAME).toLowerCase();

        this._baseUrl = `https://${this._account_name}.blob.core.windows.net`;
        this._shared_key_credential = new StorageSharedKeyCredential(
            this._account_name, this._account_key
        );
      }

    async upload(file: Express.Multer.File): Promise<FileServiceUploadResult> {

        const containerClient = await this.getContainerClient();

        const parsedFilename = parse(file.originalname);
        const filename = `${parsedFilename.name}-${Date.now()}${parsedFilename.ext}`

        const blockBlobClient = containerClient.getBlockBlobClient(filename)

        await blockBlobClient.uploadStream(fs.createReadStream(file.path));

        return { url: blockBlobClient.url, key: filename };
    }

    async uploadProtected(file: Express.Multer.File): Promise<FileServiceUploadResult> {

        const containerClient = await this.getContainerClient(`${this._container}-protected`);
  
        const parsedFilename = parse(file.originalname);
        const filename = `${parsedFilename.name}-${Date.now()}${parsedFilename.ext}`
  
        const blockBlobClient = containerClient.getBlockBlobClient(filename)
  
        await blockBlobClient.uploadStream(fs.createReadStream(file.path));
  
        return { url: blockBlobClient.url, key: filename };
    }

    async delete(fileData: DeleteFileType): Promise<void> {
        const containerClient = await this.getContainerClient();

        const blockBlobClient = containerClient.getBlockBlobClient(fileData.fileKey)

        blockBlobClient.deleteIfExists();
    }

    async getUploadStreamDescriptor(file: UploadStreamDescriptorType): Promise<FileServiceGetUploadStreamResult> {
        
        const pass = new stream.PassThrough()
        const filename = file.name + file.ext;

        const containerClient = await this.getContainerClient();
        const blockBlobClient = containerClient.getBlockBlobClient(filename)

        return {
          writeStream: pass,
          promise: blockBlobClient.uploadStream(pass),
          url: this._baseUrl + '/' + this._container + '/' + filename,
          fileKey: filename
        }
    }

    async getDownloadStream(file: GetUploadedFileType): Promise<NodeJS.ReadableStream> {

        const containerClient = await this.getContainerClient();
        const blockBlobClient = containerClient.getBlockBlobClient(file.fileKey)

        const downloadResponse = await blockBlobClient.download();

        return downloadResponse.readableStreamBody!;
    }
      
    async getPresignedDownloadUrl(file: GetUploadedFileType): Promise<string> {

        const containerClient = await this.getContainerClient();
        const blockBlobClient = containerClient.getBlockBlobClient(file.fileKey)

        const expiresOn = new Date();
        expiresOn.setHours(expiresOn.getHours() + 2);
        return blockBlobClient.generateSasUrl({
          expiresOn: expiresOn
        });
    }

    async getContainerClient(container: string | null = null) : Promise<ContainerClient> {
        const containerClient = new ContainerClient(
          `${this._baseUrl}/${container ?? this._container}`, this._shared_key_credential
        );
  
        await containerClient.createIfNotExists({access: 'blob'});

        return containerClient;
    }

}

export default AzureBlobStorageFileService;