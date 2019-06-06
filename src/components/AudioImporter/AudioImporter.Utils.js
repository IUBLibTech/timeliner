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
    // const audio = new Audio();
    // const audioURL = url;
    // audio.addEventListener('loadedmetadata', () => {
    //   resolve(createNewManifest(MANIFEST_DOMAIN, audioURL, audio.duration));
    // });
    // audio.addEventListener('error', () => {
    //   switch (audio.error.code) {
    //     case 1:
    //       throw 'fetching process aborted by user';
    //     case 2:
    //       throw 'error occurred when downloading';
    //     case 3:
    //       throw 'error occurred when decoding';
    //     case 4:

          // TODO: Restore ability to load audio resources
          // The previous approach of assuming the resource is audio and falling back
          // to fetching it as a manifest fails on safari over 50% of the time.
          // Possible solutions include assuming the resource is a manifest first
          // and falling back to loading it as audio, maknig a HEAD request to get
          // the content type of the resource and choose only the appropriate path,
          // passing the content type in as a prop, or determining if there is a
          // different event that safari is sending in this case (that's not
          // loadedmetadata or error).
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
              if (contentType.includes('application/json')) {
                const manifestJSON = res.json();
                validateManifest(manifestJSON);
                resolve(manifestJSON);
              } else {
                throw new Error(`Content type not recognised ${contentType}`);
              }
            })
            .catch(err => {
              reject(err.toString());
            });
      //     break;
      //   default:
      //     throw 'Unknown error with resource.';
      // }
    // });
    // audio.src = audioURL;
  });
};

export default importResource;
