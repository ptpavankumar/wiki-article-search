const { run } = require('./executor');

const args = process.argv.slice(2);
if (args.length === 0) {
    // eslint-disable-next-line no-console
    console.error('\x1b[31m', 'Missing search term...try again with search term', '\x1b[0m');
    process.exit();
}

run(args).then(result => (result.forEach(item => (
        // eslint-disable-next-line no-console
        console.log(`Number of occurrences of '${item.searchElement}' = \x1b[33m ${item.searchCount} \x1b[0m`)
    ))
));
