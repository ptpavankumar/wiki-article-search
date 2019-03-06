const chai = require('chai');
const nock = require('nock');
const chaiHttp = require('chai-http');
const { run, targetBaseUrl, targetUrlFolderPath } = require('../../executor');

const { expect } = chai;
chai.use(chaiHttp);

describe('Run method', () => {
    const searchElement = 'pizza';
    before(() => {
        const responseBody = { 
            parse: { title: 'Pizza',
                pageid: 24768,
                text: { '*': '<div class="mw-parser-output"><div role="note" class="hatnote navigation-not-searchable">For other uses, see <a href="/wiki/Pizza_(disambiguation)" class="mw-disambig" title="Pizza (disambiguation)">Pizza (disambiguation)</a>.</div>\n<p class="mw-empty-elt">\n</p>\n<div class="shortdescription nomobile noexcerpt noprint searchaux" style="display:none">Usually savory dish of flattened bread and toppings</div>\n<table class="infobox hrecipe adr" style="width:22em"><caption class="fn"><span>Pizza</span></caption><tbody><tr><td colspan="2" style="text-align:center"><a href="/wiki/File:Eq_it-na_pizza-margherita_sep2005_sml.jpg" class="image"><img alt="Eq it-na pizza-margherita sep2005 sml.jpg" src="//upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg/220px-Eq_it-na_pizza-margherita_sep2005_sml.jpg" decoding="async" width="220" height="165" srcset="//upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg/330px-Eq_it-na_pizza-margherita_sep2005_sml.jpg 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg/440px-Eq_it-na_pizza-margherita_sep2005_sml.jpg 2x" data-file-width="1024" data-file-height="768" /></a>' }
            }
        }
  
        nock(targetBaseUrl)
            .get(`${targetUrlFolderPath}${searchElement}`)
            .reply(200, responseBody);
    });

    it('should return valid number when params are injected', async () => {
        const result = await run([searchElement]);
        expect(result).to.be.not.empty;
        expect(result[0]).to.deep.equal({
            searchElement,
            searchCount: 12
        });
    });

    it('should throw error when params are not injected', async () => {
        const result = await run([]);
        expect(result).to.be.empty;
    });
});