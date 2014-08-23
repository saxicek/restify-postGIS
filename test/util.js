var expect = require('chai').expect,
    sinon  = require('sinon'),
    util   = require('../bin/util.js');

describe('util', function() {

  describe('parseDate()', function() {
    // parse date is sensitive to current date since it is
    // guessing year from current date and input parameters
    before(function() {
      this.clock = sinon.useFakeTimers((new Date(2012, 11, 15)).getTime(), 'Date');
    });

    it('should expose a function', function () {
      expect(util.parseDate).to.be.a('function');
    });

    it('should parse valid input', function() {
      expect(util.parseDate('31.12.', '13.00-17.00')).to.eql({
        'time_from': new Date(2012, 11, 31, 13, 0),
        'time_to': new Date(2012, 11, 31, 17, 0)
      });
    });

    it('should support unicode "en dash" character', function() {
      expect(util.parseDate('31.12.', '13.00\u201317.00')).to.eql({
        'time_from': new Date(2012, 11, 31, 13, 0),
        'time_to': new Date(2012, 11, 31, 17, 0)
      });
    });

    it('should set date to next year if current date > parsed date', function() {
      expect(util.parseDate('01.01.', '13.00-17.00')).to.eql({
        'time_from': new Date(2013, 0, 1, 13, 0),
        'time_to': new Date(2013, 0, 1, 17, 0)
      });
    });

    after(function() {
      this.clock.restore();
    });
  });

  describe('parseDate()', function() {
    // parse date is sensitive to current date since it is
    // guessing year from current date and input parameters
    before(function() {
      this.clock = sinon.useFakeTimers((new Date(2013, 2, 15)).getTime(), 'Date');
    });

    it('should parse valid input', function() {
      expect(util.parseDate('31.2.', '13.00-17.00')).to.eql({
        'time_from': new Date(2013, 1, 31, 13, 0),
        'time_to': new Date(2013, 1, 31, 17, 0)
      });
    });

    it('should parse valid input', function() {
      expect(util.parseDate('31.1.', '13.00-17.00')).to.eql({
        'time_from': new Date(2013, 0, 31, 13, 0),
        'time_to': new Date(2013, 0, 31, 17, 0)
      });
    });

    it('should set date to previous year if current date < parsed date', function () {
      expect(util.parseDate('01.12.', '13.00-17.00')).to.eql({
        'time_from':new Date(2012, 11, 1, 13, 0),
        'time_to':new Date(2012, 11, 1, 17, 0)
      });
    });

    after(function() {
      this.clock.restore();
    });
  });
});

