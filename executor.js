const axios = require('axios');

const targetUrl = 'https://en.wikipedia.org/w/api.php?action=parse&section=0&prop=text&format=json&page=';
const targetBaseUrl = 'https://en.wikipedia.org';
const targetUrlFolderPath = '/w/api.php?action=parse&section=0&prop=text&format=json&page=';
const run = async (args) => {
    const promises = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < args.length; i++) {
        const element = args[i];
        const wikiSearchUrl = `${targetUrl}${element}`;
        const axiosPromise = axios.get(wikiSearchUrl);
        promises.push(axiosPromise);
    }

    const responses = await Promise.all(promises);

    const result = [];
    let argsIndex = 0;
    responses.forEach((response) => {
        const wikiResponseBody = response.data;
        const searchContext = wikiResponseBody.parse.text['*'];
        const count = (searchContext.match(new RegExp(args[argsIndex], 'gi')) || []).length;
        result.push({ searchElement: args[argsIndex], searchCount: count });
        // eslint-disable-next-line no-plusplus
        argsIndex++;
    });

    return result;
};

module.exports = {
    run,
    targetBaseUrl,
    targetUrlFolderPath,
};
