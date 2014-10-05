var
  cheerio     = require('cheerio'),
  util        = require('../util.js'),
  path        = require('path'),
  scraper     = require('../scraper.js').createScraper(path.basename(__filename, '.js'))
;

scraper.url = 'http://www.praha8.cz/Svoz-nebezpecneho-odpadu-1';

// district used for validation of container places
scraper.districtName = 'Praha 8';

// minimum interval between scrapes; format is moment.duration(String);
scraper.minScrapeInterval = '1.00:00:00'; // once a day

scraper.parse = function(body, callback) {
  // parse html page
  var containers = [],
    $ = cheerio.load(body),
    i = 0;

  $('table.mcp8').each(function() {
    var str_dates = util.splitDateList($(this).find('tr.mcp8TableFooterRow').find('td').contents().slice(1,2).text());
    // for each row (skip header and footer)
    $(this).find('tr').slice(2, -1).each(function() {
      var
        cells,
        place_name,
        raw_time,
        dates;
      cells = $(this).find('td');
      place_name = cells.eq(0).text().trim().replace(/'/g, "''");

      raw_time = cells.eq(1).text().trim();

      // combine parsed date and time information
      str_dates.forEach(function(date) {
        dates = util.parseDate(date, raw_time);
        containers[i++] = {
          place_name:place_name,
          time_from:dates.time_from,
          time_to:dates.time_to,
          container_type:'HAZARDOUS_WASTE'
        };
      });
    });
  });

  // first argument of callback is null - no error was raised
  callback(null, containers);
};

module.exports = exports = scraper;