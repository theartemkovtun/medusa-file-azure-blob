"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var medusa_1 = require("@medusajs/medusa");
var fs = require("fs");
var path_1 = require("path");
var stream = require("stream");
var storage_blob_1 = require("@azure/storage-blob");
var AzureBlobStorageFileService = /** @class */ (function (_super) {
    __extends(AzureBlobStorageFileService, _super);
    function AzureBlobStorageFileService(_a, options) {
        var _this = this;
        var _b, _c, _d;
        _this = _super.call(this, {}, options) || this;
        _this._account_name = (_b = options.account_name) !== null && _b !== void 0 ? _b : 'cailmsstorage';
        _this._account_key = (_c = options.account_key) !== null && _c !== void 0 ? _c : '0b57O6nyEmZJzaT2S7ef7WZX6G4yAE/R7FRc8jrYy3XfWM5GY1zUEYqfU8xxffMCkkzrj4IR/HKw+AStUB8oJw==';
        _this._container = (_d = options.container) !== null && _d !== void 0 ? _d : 'medusa-files';
        _this._baseUrl = "https://".concat(_this._account_name, ".blob.core.windows.net");
        _this._shared_key_credential = new storage_blob_1.StorageSharedKeyCredential(_this._account_name, _this._account_key);
        return _this;
    }
    AzureBlobStorageFileService.prototype.upload = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var containerClient, parsedFilename, filename, blockBlobClient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getContainerClient()];
                    case 1:
                        containerClient = _a.sent();
                        parsedFilename = (0, path_1.parse)(file.originalname);
                        filename = "".concat(parsedFilename.name, "-").concat(Date.now()).concat(parsedFilename.ext);
                        blockBlobClient = containerClient.getBlockBlobClient(filename);
                        return [4 /*yield*/, blockBlobClient.uploadStream(fs.createReadStream(file.path))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, { url: blockBlobClient.url, key: filename }];
                }
            });
        });
    };
    AzureBlobStorageFileService.prototype.uploadProtected = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var containerClient, parsedFilename, filename, blockBlobClient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getContainerClient("".concat(this._container, "-protected"))];
                    case 1:
                        containerClient = _a.sent();
                        parsedFilename = (0, path_1.parse)(file.originalname);
                        filename = "".concat(parsedFilename.name, "-").concat(Date.now()).concat(parsedFilename.ext);
                        blockBlobClient = containerClient.getBlockBlobClient(filename);
                        return [4 /*yield*/, blockBlobClient.uploadStream(fs.createReadStream(file.path))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, { url: blockBlobClient.url, key: filename }];
                }
            });
        });
    };
    AzureBlobStorageFileService.prototype["delete"] = function (fileData) {
        return __awaiter(this, void 0, void 0, function () {
            var containerClient, blockBlobClient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getContainerClient()];
                    case 1:
                        containerClient = _a.sent();
                        blockBlobClient = containerClient.getBlockBlobClient(fileData.fileKey);
                        blockBlobClient.deleteIfExists();
                        return [2 /*return*/];
                }
            });
        });
    };
    AzureBlobStorageFileService.prototype.getUploadStreamDescriptor = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var pass, filename, containerClient, blockBlobClient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pass = new stream.PassThrough();
                        filename = file.name + file.ext;
                        return [4 /*yield*/, this.getContainerClient()];
                    case 1:
                        containerClient = _a.sent();
                        blockBlobClient = containerClient.getBlockBlobClient(filename);
                        return [2 /*return*/, {
                                writeStream: pass,
                                promise: blockBlobClient.uploadStream(pass),
                                url: this._baseUrl + '/' + this._container + '/' + filename,
                                fileKey: filename
                            }];
                }
            });
        });
    };
    AzureBlobStorageFileService.prototype.getDownloadStream = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var containerClient, blockBlobClient, downloadResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getContainerClient()];
                    case 1:
                        containerClient = _a.sent();
                        blockBlobClient = containerClient.getBlockBlobClient(file.fileKey);
                        return [4 /*yield*/, blockBlobClient.download()];
                    case 2:
                        downloadResponse = _a.sent();
                        return [2 /*return*/, downloadResponse.readableStreamBody];
                }
            });
        });
    };
    AzureBlobStorageFileService.prototype.getPresignedDownloadUrl = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var containerClient, blockBlobClient, expiresOn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getContainerClient()];
                    case 1:
                        containerClient = _a.sent();
                        blockBlobClient = containerClient.getBlockBlobClient(file.fileKey);
                        expiresOn = new Date();
                        expiresOn.setHours(expiresOn.getHours() + 2);
                        return [2 /*return*/, blockBlobClient.generateSasUrl({
                                expiresOn: expiresOn
                            })];
                }
            });
        });
    };
    AzureBlobStorageFileService.prototype.getContainerClient = function (container) {
        if (container === void 0) { container = null; }
        return __awaiter(this, void 0, void 0, function () {
            var containerClient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        containerClient = new storage_blob_1.ContainerClient("".concat(this._baseUrl, "/").concat(container !== null && container !== void 0 ? container : this._container), this._shared_key_credential);
                        return [4 /*yield*/, containerClient.createIfNotExists({ access: 'blob' })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, containerClient];
                }
            });
        });
    };
    return AzureBlobStorageFileService;
}(medusa_1.AbstractFileService));
exports["default"] = AzureBlobStorageFileService;
