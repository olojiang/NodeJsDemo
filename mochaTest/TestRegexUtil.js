/**
 * Created by Hunter on 5/15/2015.
 */
"use strict";

var assert = require('assert');
var regexUtil = require('../js/regexUtil');


describe('Regular Expression Util Test', function(){
    it('Picture date_time matcher', function(){

        assert.deepEqual(regexUtil.parsePicName('2007_11_16铎铎去北京火车上'), {'2007_11_16': '铎铎去北京火车上'}, 'Matched 1');
        assert.deepEqual(regexUtil.parsePicName('20091112佳丽雪景'), {'2009_11_12': '佳丽雪景'}, 'Matched 2');
        assert.deepEqual(regexUtil.parsePicName('20060101_太和'), {'2006_01_01': '太和'}, 'Matched 3');
        assert.deepEqual(regexUtil.parsePicName('20100327京城来客抖空竹'), {'2010_03_27': '京城来客抖空竹'}, 'Matched 4');
        assert.deepEqual(regexUtil.parsePicName('201307天津家'), {'2013_07': '天津家'}, 'Matched 4.5');
        assert.deepEqual(regexUtil.parsePicName('2008_10集体学电脑'), {'2008_10': '集体学电脑'}, 'Matched 5');
        assert.deepEqual(regexUtil.parsePicName('080920_游伯大'), {'2008_09_20': '游伯大'}, 'Matched 6');
        assert.deepEqual(regexUtil.parsePicName('080206_2008年的年夜饭'), {'2008_02_06': '2008年的年夜饭'}, 'Matched 7');
        assert.deepEqual(regexUtil.parsePicName('080323巨石阵_巴斯'), {'2008_03_23': '巨石阵_巴斯'}, 'Matched 8');

        assert.deepEqual(regexUtil.parsePicName('aaa'), '', 'Not match');
    });
});