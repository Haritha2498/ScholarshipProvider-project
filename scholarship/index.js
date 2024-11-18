/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const ScholarshipContract = require('./lib/scholarship');
const FundContract = require('./lib/FundContract');

module.exports.ScholarshipContract = ScholarshipContract;
module.exports.FundContract =FundContract;

module.exports.contracts = [ ScholarshipContract,FundContract ];
