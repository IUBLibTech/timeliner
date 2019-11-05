import createNewManifest from './AudioImporter.ManifestTemplate';

const MANIFEST_DOMAIN = 'http://digirati.com/iiif/v3/temporary';

// TODO: check if it is valid
// throws 'Invalid manifest'
const validateManifest = manifest => true;

export const mapImportErrorMessage = error => {
  if (error.indexOf('SyntaxError') === 0) {
    return 'File chosen must be a JSON file';
  }

  if (error.indexOf('TypeError') === 0) {
    return 'Invalid JSON provided, please use JSON downloaded from this tool';
  }

  return 'An unknown error occurred while importing.';
};

const importResource = url => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => {
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error('Resource not found (404)');
          }
          console.log(res);
        }

        const contentType = res.headers.get('content-type');
        if (!contentType) {
          throw new Error(
            'No content type on resource, unable to identify.'
          );
        }
        if (contentType.includes('application/json') || contentType.includes('text/plain')) {
          const manifestJSON = res.json();
          validateManifest(manifestJSON);
          resolve(manifestJSON);
        } else {
          const audio = new Audio();
          const audioURL = url;
          audio.addEventListener('loadedmetadata', () => {
            resolve(createNewManifest(MANIFEST_DOMAIN, audioURL, audio.duration));
          });
          audio.addEventListener('error', () => {
            switch (audio.error.code) {
              case 1:
                throw 'fetching process aborted by user';
              case 2:
                throw 'error occurred when downloading';
              case 3:
                throw 'error occurred when decoding';
              default:
                throw 'Unknown error with resource.';
            }
          })
          audio.src = audioURL;
        }
      })
      .catch(err => {
        reject(err.toString());
      });
  });
};

export default importResource;
