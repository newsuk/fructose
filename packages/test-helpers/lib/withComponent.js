"use strict";Object.defineProperty(exports,"__esModule",{value:true});var log=require('npmlog');var Client=require("../../client");var _require=require("./setup"),setup=_require.setup,teardown=_require.teardown;exports.default=function(config){var first=true;beforeAll(function _callee(){return regeneratorRuntime.async(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:if(!first){_context.next=5;break;}console.log("setting up");_context.next=4;return regeneratorRuntime.awrap(setup(config).then(function(){return console.log("setup complete");}));case 4:first=false;case 5:case"end":return _context.stop();}}},null,undefined);},180000);afterAll(function _callee2(){return regeneratorRuntime.async(function _callee2$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:_context2.next=2;return regeneratorRuntime.awrap(teardown());case 2:case"end":return _context2.stop();}}},null,undefined);});var withComponent=function withComponent(component,description,tests){describe(description,function(){var hashed=JSON.stringify(component);var client=void 0;beforeAll(function _callee3(){return regeneratorRuntime.async(function _callee3$(_context3){while(1){switch(_context3.prev=_context3.next){case 0:client=Client(7811);console.log("client address",client.socket);case 2:case"end":return _context3.stop();}}},null,undefined);},60000);afterAll(function _callee4(){return regeneratorRuntime.async(function _callee4$(_context4){while(1){switch(_context4.prev=_context4.next){case 0:return _context4.abrupt("return",client.disconnect());case 1:case"end":return _context4.stop();}}},null,undefined);});beforeEach(function _callee5(){return regeneratorRuntime.async(function _callee5$(_context5){while(1){switch(_context5.prev=_context5.next){case 0:_context5.next=2;return regeneratorRuntime.awrap(client.loadComponent(hashed).then(function(){return console.log('loadComponent',hashed);}));case 2:return _context5.abrupt("return",_context5.sent);case 3:case"end":return _context5.stop();}}},null,undefined);});tests();});};global.withComponent=withComponent;};