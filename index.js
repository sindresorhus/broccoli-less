'use strict';
var Filter = require('broccoli-filter');
var RSVP = require('rsvp');
var less = require('less');

function LessFilter(inputTree, options) {
	if (!(this instanceof LessFilter)) {
		return new LessFilter(inputTree, options);
	}

	Filter.call(this, inputTree);

	this.inputTree = inputTree;
	this.options = options || {};
}

LessFilter.prototype = Object.create(Filter.prototype);
LessFilter.prototype.constructor = LessFilter;

LessFilter.prototype.extensions = ['less'];
LessFilter.prototype.targetExtension = 'css';

LessFilter.prototype.processString = function (str) {
	return new RSVP.Promise(function(resolve, reject) {
		less.render(str, this.options, function (err, data) {
			if (err) {
				reject(err);
				return;
			}

			resolve(data.css);
		});
	}.bind(this));
};

module.exports = LessFilter;
