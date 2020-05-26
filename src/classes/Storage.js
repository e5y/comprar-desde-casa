export class Storage {
  constructor(storage) {
    this.storage = storage;
    this.ref = this.storage.ref();
  }

  /**
   * Firebase Upload
   * @link https://firebase.google.com/docs/storage/web/upload-files
   */
  upload(fullPath, file, metadata = {}, onStateChanged) {
    const upload = this.ref.child(fullPath).put(file, metadata);
    upload.on("state_changed", onStateChanged);
    return upload;
  }

  /**
   * Firebase Download URL
   * @link https://firebase.google.com/docs/storage/web/download-files
   */
  getDownloadURL(fullPath) {
    return this.ref.child(fullPath).getDownloadURL();
  }

  /**
   * Firebase Delete
   * https://firebase.google.com/docs/storage/web/delete-files
   */
  delete(fullPath) {
    return this.ref.child(fullPath).delete();
  }

  /**
   * Firebase Metadata
   * @link https://firebase.google.com/docs/storage/web/file-metadata
   */
  getMetadata(fullPath) {
    return this.ref.child(fullPath).getMetadata();
  }

  /**
   * @param {object} metadata You can delete metadata by setting its key to null
   */
  updateMetadata(fullPath, metadata) {
    return this.ref.child(fullPath).updateMetadata(metadata);
  }

  /**
   * Firebase Directory Listing
   * @link https://firebase.google.com/docs/storage/web/list-files
   */
  ls(directoryPath, maxResults = 100, pageToken = null) {
    return this.ref.child(directoryPath).list({ maxResults, pageToken });
  }
}
