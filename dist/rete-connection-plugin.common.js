/*!
* rete-connection-plugin v2.0.5
* (c) 2024 Vitaliy Stoliarov
* Released under the MIT license.
* */
'use strict';



function ___$insertStyle(css) {
  if (!css) {
    return;
  }
  if (typeof window === 'undefined') {
    return;
  }

  var style = document.createElement('style');

  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  document.head.appendChild(style);

  return css;
}

Object.defineProperty(exports, '__esModule', { value: true });

var _typeof = require('@babel/runtime/helpers/typeof');
var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _classCallCheck = require('@babel/runtime/helpers/classCallCheck');
var _createClass = require('@babel/runtime/helpers/createClass');
var _possibleConstructorReturn = require('@babel/runtime/helpers/possibleConstructorReturn');
var _getPrototypeOf = require('@babel/runtime/helpers/getPrototypeOf');
var _get = require('@babel/runtime/helpers/get');
var _inherits = require('@babel/runtime/helpers/inherits');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _regeneratorRuntime = require('@babel/runtime/regenerator');
var rete = require('rete');
var reteAreaPlugin = require('rete-area-plugin');
var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _typeof__default = /*#__PURE__*/_interopDefaultLegacy(_typeof);
var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _classCallCheck__default = /*#__PURE__*/_interopDefaultLegacy(_classCallCheck);
var _createClass__default = /*#__PURE__*/_interopDefaultLegacy(_createClass);
var _possibleConstructorReturn__default = /*#__PURE__*/_interopDefaultLegacy(_possibleConstructorReturn);
var _getPrototypeOf__default = /*#__PURE__*/_interopDefaultLegacy(_getPrototypeOf);
var _get__default = /*#__PURE__*/_interopDefaultLegacy(_get);
var _inherits__default = /*#__PURE__*/_interopDefaultLegacy(_inherits);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);
var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty__default["default"](e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/**
 * Create pseudoconnection. Used to trigger rendering of connection that is being created by user.
 * Has additional `isPseudo` property in payload.
 * @param extra Extra payload to add to connection
 */
function createPseudoconnection(extra) {
  var element = null;
  var id = null;
  function unmount(areaPlugin) {
    if (id) {
      areaPlugin.removeConnectionView(id);
    }
    element = null;
    id = null;
  }
  function mount(areaPlugin) {
    unmount(areaPlugin);
    id = "pseudo_".concat(rete.getUID());
  }
  return {
    isMounted: function isMounted() {
      return Boolean(id);
    },
    mount: mount,
    render: function render(areaPlugin, _ref, data) {
      var x = _ref.x,
        y = _ref.y;
      var isOutput = data.side === 'output';
      var pointer = {
        x: x + (isOutput ? -3 : 3),
        y: y
      }; // fix hover of underlying elements

      if (!id) throw new Error('pseudo connection id wasn\'t generated');
      var payload = isOutput ? _objectSpread({
        id: id,
        source: data.nodeId,
        sourceOutput: data.key,
        target: '',
        targetInput: ''
      }, extra !== null && extra !== void 0 ? extra : {}) : _objectSpread({
        id: id,
        target: data.nodeId,
        targetInput: data.key,
        source: '',
        sourceOutput: ''
      }, extra !== null && extra !== void 0 ? extra : {});
      if (!element) {
        var view = areaPlugin.addConnectionView(payload);
        element = view.element;
      }

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (!element) return;
      void areaPlugin.emit({
        type: 'render',
        data: _objectSpread({
          element: element,
          type: 'connection',
          payload: payload
        }, isOutput ? {
          end: pointer
        } : {
          start: pointer
        })
      });
    },
    unmount: unmount
  };
}

function _createForOfIteratorHelper$1(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray$1(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray$1(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray$1(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$1(r, a) : void 0; } }
function _arrayLikeToArray$1(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
/**
 * @param elements list of Element returned by document.elementsFromPoint
 */
function findSocket(socketsCache, elements) {
  var _iterator = _createForOfIteratorHelper$1(elements),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var element = _step.value;
      var found = socketsCache.get(element);
      if (found) {
        return found;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}

/**
 * Alternative to document.elementsFromPoint that traverses shadow roots
 * @param x x coordinate
 * @param y y coordinate
 * @param root root element to search in
 */
function elementsFromPoint(x, y) {
  var _elements$;
  var root = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document;
  var elements = root.elementsFromPoint(x, y);
  var shadowRoot = (_elements$ = elements[0]) === null || _elements$ === void 0 ? void 0 : _elements$.shadowRoot;
  if (shadowRoot && shadowRoot !== root) {
    elements.unshift.apply(elements, _toConsumableArray__default["default"](elementsFromPoint(x, y, shadowRoot)));
  }
  return elements;
}

var Flow = /*#__PURE__*/_createClass__default["default"](function Flow() {
  _classCallCheck__default["default"](this, Flow);
});

var State = /*#__PURE__*/function () {
  function State() {
    _classCallCheck__default["default"](this, State);
  }
  return _createClass__default["default"](State, [{
    key: "setContext",
    value: function setContext(context) {
      this.context = context;
    }
  }]);
}();
function getSourceTarget(initial, socket) {
  var forward = initial.side === 'output' && socket.side === 'input';
  var backward = initial.side === 'input' && socket.side === 'output';
  var _ref = forward ? [initial, socket] : backward ? [socket, initial] : [],
    _ref2 = _slicedToArray__default["default"](_ref, 2),
    source = _ref2[0],
    target = _ref2[1];
  if (source && target) return [source, target];
}
function canMakeConnection(initial, socket) {
  return Boolean(getSourceTarget(initial, socket));
}
function makeConnection(initial, socket, context) {
  var _ref3 = getSourceTarget(initial, socket) || [null, null],
    _ref4 = _slicedToArray__default["default"](_ref3, 2),
    source = _ref4[0],
    target = _ref4[1];
  if (source && target) {
    void context.editor.addConnection({
      id: rete.getUID(),
      source: source.nodeId,
      sourceOutput: source.key,
      target: target.nodeId,
      targetInput: target.key
    });
    return true;
  }
}

function _callSuper$2(t, o, e) { return o = _getPrototypeOf__default["default"](o), _possibleConstructorReturn__default["default"](t, _isNativeReflectConstruct$2() ? Reflect.construct(o, e || [], _getPrototypeOf__default["default"](t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct$2() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$2 = function _isNativeReflectConstruct() { return !!t; })(); }

/**
 * Bidirect flow params
 */
var Picked$1 = /*#__PURE__*/function (_State) {
  function Picked(initial, params) {
    var _this;
    _classCallCheck__default["default"](this, Picked);
    _this = _callSuper$2(this, Picked);
    _this.initial = initial;
    _this.params = params;
    return _this;
  }
  _inherits__default["default"](Picked, _State);
  return _createClass__default["default"](Picked, [{
    key: "pick",
    value: function () {
      var _pick = _asyncToGenerator__default["default"](/*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee(_ref, context) {
        var socket;
        return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              socket = _ref.socket;
              if (this.params.makeConnection(this.initial, socket, context)) {
                this.drop(context, socket, true);
              } else if (!this.params.pickByClick) {
                this.drop(context, socket);
              }
            case 2:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function pick(_x, _x2) {
        return _pick.apply(this, arguments);
      }
      return pick;
    }()
  }, {
    key: "drop",
    value: function drop(context) {
      var socket = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var created = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      if (this.initial) {
        void context.scope.emit({
          type: 'connectiondrop',
          data: {
            initial: this.initial,
            socket: socket,
            created: created
          }
        });
      }
      this.context.switchTo(new Idle$1(this.params));
    }
  }]);
}(State);
var Idle$1 = /*#__PURE__*/function (_State2) {
  function Idle(params) {
    var _this2;
    _classCallCheck__default["default"](this, Idle);
    _this2 = _callSuper$2(this, Idle);
    _this2.params = params;
    return _this2;
  }
  _inherits__default["default"](Idle, _State2);
  return _createClass__default["default"](Idle, [{
    key: "pick",
    value: function () {
      var _pick2 = _asyncToGenerator__default["default"](/*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee2(_ref2, context) {
        var socket, event;
        return _regeneratorRuntime__default["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              socket = _ref2.socket, event = _ref2.event;
              if (!(event === 'down')) {
                _context2.next = 9;
                break;
              }
              _context2.next = 4;
              return context.scope.emit({
                type: 'connectionpick',
                data: {
                  socket: socket
                }
              });
            case 4:
              if (!_context2.sent) {
                _context2.next = 8;
                break;
              }
              this.context.switchTo(new Picked$1(socket, this.params));
              _context2.next = 9;
              break;
            case 8:
              this.drop(context);
            case 9:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function pick(_x3, _x4) {
        return _pick2.apply(this, arguments);
      }
      return pick;
    }()
  }, {
    key: "drop",
    value: function drop(context) {
      var socket = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var created = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      if (this.initial) {
        void context.scope.emit({
          type: 'connectiondrop',
          data: {
            initial: this.initial,
            socket: socket,
            created: created
          }
        });
      }
      delete this.initial;
    }
  }]);
}(State);
/**
 * Bidirect flow. User can pick a socket and connect it by releasing mouse button.
 * More simple than classic flow, but less functional (can't remove connection by clicking on input socket).
 */
var BidirectFlow = /*#__PURE__*/function () {
  function BidirectFlow(params) {
    _classCallCheck__default["default"](this, BidirectFlow);
    var pickByClick = Boolean(params === null || params === void 0 ? void 0 : params.pickByClick);
    var makeConnection$1 = (params === null || params === void 0 ? void 0 : params.makeConnection) || makeConnection;
    this.switchTo(new Idle$1({
      pickByClick: pickByClick,
      makeConnection: makeConnection$1
    }));
  }
  return _createClass__default["default"](BidirectFlow, [{
    key: "pick",
    value: function () {
      var _pick3 = _asyncToGenerator__default["default"](/*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee3(params, context) {
        return _regeneratorRuntime__default["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return this.currentState.pick(params, context);
            case 2:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function pick(_x5, _x6) {
        return _pick3.apply(this, arguments);
      }
      return pick;
    }()
  }, {
    key: "getPickedSocket",
    value: function getPickedSocket() {
      return this.currentState.initial;
    }
  }, {
    key: "drop",
    value: function drop(context) {
      this.currentState.drop(context);
    }
  }, {
    key: "switchTo",
    value: function switchTo(state) {
      state.setContext(this);
      this.currentState = state;
    }
  }]);
}();

function findPort(socket, editor) {
  var node = editor.getNode(socket.nodeId);
  if (!node) throw new Error('cannot find node');
  var list = socket.side === 'input' ? node.inputs : node.outputs;
  return list[socket.key];
}
function findConnections(socket, editor) {
  var nodeId = socket.nodeId,
    side = socket.side,
    key = socket.key;
  return editor.getConnections().filter(function (connection) {
    if (side === 'input') {
      return connection.target === nodeId && connection.targetInput === key;
    }
    if (side === 'output') {
      return connection.source === nodeId && connection.sourceOutput === key;
    }
  });
}

/**
 * Remove existing connections if Port doesnt allow multiple connections
 */
function syncConnections(sockets, editor) {
  var connections = sockets.map(function (socket) {
    var port = findPort(socket, editor);
    var multiple = port === null || port === void 0 ? void 0 : port.multipleConnections;
    if (multiple) return [];
    return findConnections(socket, editor);
  }).flat();
  return {
    commit: function commit() {
      var uniqueIds = Array.from(new Set(connections.map(function (_ref) {
        var id = _ref.id;
        return id;
      })));
      uniqueIds.forEach(function (id) {
        return void editor.removeConnection(id);
      });
    }
  };
}

function _callSuper$1(t, o, e) { return o = _getPrototypeOf__default["default"](o), _possibleConstructorReturn__default["default"](t, _isNativeReflectConstruct$1() ? Reflect.construct(o, e || [], _getPrototypeOf__default["default"](t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct$1() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$1 = function _isNativeReflectConstruct() { return !!t; })(); }

/**
 * Classic flow params
 */
var Picked = /*#__PURE__*/function (_State) {
  function Picked(initial, params) {
    var _this;
    _classCallCheck__default["default"](this, Picked);
    _this = _callSuper$1(this, Picked);
    _this.initial = initial;
    _this.params = params;
    return _this;
  }
  _inherits__default["default"](Picked, _State);
  return _createClass__default["default"](Picked, [{
    key: "pick",
    value: function () {
      var _pick = _asyncToGenerator__default["default"](/*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee(_ref, context) {
        var socket, created;
        return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              socket = _ref.socket;
              if (this.params.canMakeConnection(this.initial, socket)) {
                syncConnections([this.initial, socket], context.editor).commit();
                created = this.params.makeConnection(this.initial, socket, context);
                this.drop(context, created ? socket : null, created);
              }
            case 2:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function pick(_x, _x2) {
        return _pick.apply(this, arguments);
      }
      return pick;
    }()
  }, {
    key: "drop",
    value: function drop(context) {
      var socket = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var created = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      if (this.initial) {
        void context.scope.emit({
          type: 'connectiondrop',
          data: {
            initial: this.initial,
            socket: socket,
            created: created
          }
        });
      }
      this.context.switchTo(new Idle(this.params));
    }
  }]);
}(State);
var PickedExisting = /*#__PURE__*/function (_State2) {
  function PickedExisting(connection, params, context) {
    var _this2;
    _classCallCheck__default["default"](this, PickedExisting);
    _this2 = _callSuper$1(this, PickedExisting);
    _this2.connection = connection;
    _this2.params = params;
    var outputSocket = Array.from(context.socketsCache.values()).find(function (data) {
      return data.nodeId === _this2.connection.source && data.side === 'output' && data.key === _this2.connection.sourceOutput;
    });
    if (!outputSocket) throw new Error('cannot find output socket');
    _this2.outputSocket = outputSocket;
    return _this2;
  }
  _inherits__default["default"](PickedExisting, _State2);
  return _createClass__default["default"](PickedExisting, [{
    key: "init",
    value: function () {
      var _init = _asyncToGenerator__default["default"](/*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee2(context) {
        var _this3 = this;
        return _regeneratorRuntime__default["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              void context.scope.emit({
                type: 'connectionpick',
                data: {
                  socket: this.outputSocket
                }
              }).then(function (response) {
                if (response) {
                  void context.editor.removeConnection(_this3.connection.id);
                  _this3.initial = _this3.outputSocket;
                } else {
                  _this3.drop(context);
                }
              });
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function init(_x3) {
        return _init.apply(this, arguments);
      }
      return init;
    }()
  }, {
    key: "pick",
    value: function () {
      var _pick2 = _asyncToGenerator__default["default"](/*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee3(_ref2, context) {
        var socket, event, created, droppedSocket, _created, _droppedSocket;
        return _regeneratorRuntime__default["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              socket = _ref2.socket, event = _ref2.event;
              if (this.initial && !(socket.side === 'input' && this.connection.target === socket.nodeId && this.connection.targetInput === socket.key)) {
                if (this.params.canMakeConnection(this.initial, socket)) {
                  syncConnections([this.initial, socket], context.editor).commit();
                  created = this.params.makeConnection(this.initial, socket, context);
                  droppedSocket = created ? socket : null;
                  this.drop(context, droppedSocket, created);
                }
              } else if (event === 'down') {
                if (this.initial) {
                  syncConnections([this.initial, socket], context.editor).commit();
                  _created = this.params.makeConnection(this.initial, socket, context);
                  _droppedSocket = _created ? null : socket;
                  this.drop(context, _droppedSocket, _created);
                }
              }
            case 2:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function pick(_x4, _x5) {
        return _pick2.apply(this, arguments);
      }
      return pick;
    }()
  }, {
    key: "drop",
    value: function drop(context) {
      var socket = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var created = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      if (this.initial) {
        void context.scope.emit({
          type: 'connectiondrop',
          data: {
            initial: this.initial,
            socket: socket,
            created: created
          }
        });
      }
      this.context.switchTo(new Idle(this.params));
    }
  }]);
}(State);
var Idle = /*#__PURE__*/function (_State3) {
  function Idle(params) {
    var _this4;
    _classCallCheck__default["default"](this, Idle);
    _this4 = _callSuper$1(this, Idle);
    _this4.params = params;
    return _this4;
  }
  _inherits__default["default"](Idle, _State3);
  return _createClass__default["default"](Idle, [{
    key: "pick",
    value: function () {
      var _pick3 = _asyncToGenerator__default["default"](/*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee4(_ref3, context) {
        var socket, event, _connection, state;
        return _regeneratorRuntime__default["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              socket = _ref3.socket, event = _ref3.event;
              if (!(event !== 'down')) {
                _context4.next = 3;
                break;
              }
              return _context4.abrupt("return");
            case 3:
              if (!(socket.side === 'input')) {
                _context4.next = 11;
                break;
              }
              _connection = context.editor.getConnections().find(function (item) {
                return item.target === socket.nodeId && item.targetInput === socket.key;
              });
              if (!_connection) {
                _context4.next = 11;
                break;
              }
              state = new PickedExisting(_connection, this.params, context);
              _context4.next = 9;
              return state.init(context);
            case 9:
              this.context.switchTo(state);
              return _context4.abrupt("return");
            case 11:
              _context4.next = 13;
              return context.scope.emit({
                type: 'connectionpick',
                data: {
                  socket: socket
                }
              });
            case 13:
              if (!_context4.sent) {
                _context4.next = 17;
                break;
              }
              this.context.switchTo(new Picked(socket, this.params));
              _context4.next = 18;
              break;
            case 17:
              this.drop(context);
            case 18:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function pick(_x6, _x7) {
        return _pick3.apply(this, arguments);
      }
      return pick;
    }()
  }, {
    key: "drop",
    value: function drop(context) {
      var socket = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var created = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      if (this.initial) {
        void context.scope.emit({
          type: 'connectiondrop',
          data: {
            initial: this.initial,
            socket: socket,
            created: created
          }
        });
      }
      delete this.initial;
    }
  }]);
}(State);
/**
 * Classic flow. User can pick/click a socket and connect it by releasing/clicking on another socket.
 * If connection already exists and user clicks on input socket, connection will be removed.
 */
var ClassicFlow = /*#__PURE__*/function () {
  function ClassicFlow(params) {
    _classCallCheck__default["default"](this, ClassicFlow);
    var canMakeConnection$1 = (params === null || params === void 0 ? void 0 : params.canMakeConnection) || canMakeConnection;
    var makeConnection$1 = (params === null || params === void 0 ? void 0 : params.makeConnection) || makeConnection;
    this.switchTo(new Idle({
      canMakeConnection: canMakeConnection$1,
      makeConnection: makeConnection$1
    }));
  }
  return _createClass__default["default"](ClassicFlow, [{
    key: "pick",
    value: function () {
      var _pick4 = _asyncToGenerator__default["default"](/*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee5(params, context) {
        return _regeneratorRuntime__default["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return this.currentState.pick(params, context);
            case 2:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function pick(_x8, _x9) {
        return _pick4.apply(this, arguments);
      }
      return pick;
    }()
  }, {
    key: "getPickedSocket",
    value: function getPickedSocket() {
      return this.currentState.initial;
    }
  }, {
    key: "switchTo",
    value: function switchTo(state) {
      state.setContext(this);
      this.currentState = state;
    }
  }, {
    key: "drop",
    value: function drop(context) {
      this.currentState.drop(context);
    }
  }]);
}();

/**
 * Classic preset. Uses `ClassicFlow` for managing connections by user
 */
function setup() {
  return function () {
    return new ClassicFlow();
  };
}

var classic = /*#__PURE__*/Object.freeze({
  __proto__: null,
  setup: setup
});

/**
 * Built-in presets
 * @module
 */

var index = /*#__PURE__*/Object.freeze({
  __proto__: null,
  classic: classic
});

function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _callSuper(t, o, e) { return o = _getPrototypeOf__default["default"](o), _possibleConstructorReturn__default["default"](t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf__default["default"](t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _superPropGet(t, e, o, r) { var p = _get__default["default"](_getPrototypeOf__default["default"](1 & r ? t.prototype : t), e, o); return 2 & r && "function" == typeof p ? function (t) { return p.apply(o, t); } : p; }
/**
 * Connection plugin. Responsible for user interaction with connections (creation, deletion)
 * @priority 9
 * @emits connectionpick
 * @emits connectiondrop
 * @listens pointermove
 * @listens pointerup
 * @listens render
 * @listens unmount
 */
var ConnectionPlugin = /*#__PURE__*/function (_Scope) {
  function ConnectionPlugin() {
    var _this;
    _classCallCheck__default["default"](this, ConnectionPlugin);
    _this = _callSuper(this, ConnectionPlugin, ['connection']);
    _defineProperty__default["default"](_this, "presets", []);
    _defineProperty__default["default"](_this, "currentFlow", null);
    _defineProperty__default["default"](_this, "preudoconnection", createPseudoconnection({
      isPseudo: true
    }));
    _defineProperty__default["default"](_this, "socketsCache", new Map());
    return _this;
  }

  /**
   * Add preset to the plugin
   * @param preset Preset to add
   */
  _inherits__default["default"](ConnectionPlugin, _Scope);
  return _createClass__default["default"](ConnectionPlugin, [{
    key: "addPreset",
    value: function addPreset(preset) {
      this.presets.push(preset);
    }
  }, {
    key: "findPreset",
    value: function findPreset(data) {
      var _iterator = _createForOfIteratorHelper(this.presets),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var preset = _step.value;
          var flow = preset(data);
          if (flow) return flow;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return null;
    }
  }, {
    key: "update",
    value: function update() {
      if (!this.currentFlow) return;
      var socket = this.currentFlow.getPickedSocket();
      if (socket) {
        this.preudoconnection.render(this.areaPlugin, this.areaPlugin.area.pointer, socket);
      }
    }

    /**
     * Drop pseudo-connection if exists
     * @emits connectiondrop
     */
  }, {
    key: "drop",
    value: function drop() {
      var flowContext = {
        editor: this.editor,
        scope: this,
        socketsCache: this.socketsCache
      };
      if (this.currentFlow) {
        this.currentFlow.drop(flowContext);
        this.preudoconnection.unmount(this.areaPlugin);
        this.currentFlow = null;
      }
    }

    // eslint-disable-next-line max-statements
  }, {
    key: "pick",
    value: function () {
      var _pick = _asyncToGenerator__default["default"](/*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee(event, type) {
        var flowContext, pointedElements, pickedSocket;
        return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              flowContext = {
                editor: this.editor,
                scope: this,
                socketsCache: this.socketsCache
              };
              pointedElements = elementsFromPoint(event.clientX, event.clientY);
              pickedSocket = findSocket(this.socketsCache, pointedElements);
              if (!pickedSocket) {
                _context.next = 13;
                break;
              }
              event.preventDefault();
              event.stopPropagation();
              this.currentFlow = this.currentFlow || this.findPreset(pickedSocket);
              if (!this.currentFlow) {
                _context.next = 11;
                break;
              }
              _context.next = 10;
              return this.currentFlow.pick({
                socket: pickedSocket,
                event: type
              }, flowContext);
            case 10:
              this.preudoconnection.mount(this.areaPlugin);
            case 11:
              _context.next = 14;
              break;
            case 13:
              if (this.currentFlow) {
                this.currentFlow.drop(flowContext);
              }
            case 14:
              if (this.currentFlow && !this.currentFlow.getPickedSocket()) {
                this.preudoconnection.unmount(this.areaPlugin);
                this.currentFlow = null;
              }
              this.update();
            case 16:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function pick(_x, _x2) {
        return _pick.apply(this, arguments);
      }
      return pick;
    }()
  }, {
    key: "setParent",
    value: function setParent(scope) {
      var _this2 = this;
      _superPropGet(ConnectionPlugin, "setParent", this, 3)([scope]);
      this.areaPlugin = this.parentScope(reteAreaPlugin.BaseAreaPlugin);
      this.editor = this.areaPlugin.parentScope(rete.NodeEditor);
      var pointerdownSocket = function pointerdownSocket(e) {
        void _this2.pick(e, 'down');
      };
      this.addPipe(function (context) {
        if (!context || _typeof__default["default"](context) !== 'object' || !('type' in context)) return context;
        if (context.type === 'pointermove') {
          _this2.update();
        } else if (context.type === 'pointerup') {
          void _this2.pick(context.data.event, 'up');
        } else if (context.type === 'render') {
          if (context.data.type === 'socket') {
            var element = context.data.element;
            element.addEventListener('pointerdown', pointerdownSocket);
            _this2.socketsCache.set(element, context.data);
          }
        } else if (context.type === 'unmount') {
          var _element = context.data.element;
          _element.removeEventListener('pointerdown', pointerdownSocket);
          _this2.socketsCache["delete"](_element);
        }
        return context;
      });
    }
  }]);
}(rete.Scope);

exports.BidirectFlow = BidirectFlow;
exports.ClassicFlow = ClassicFlow;
exports.ConnectionPlugin = ConnectionPlugin;
exports.Flow = Flow;
exports.Presets = index;
exports.State = State;
exports.canMakeConnection = canMakeConnection;
exports.createPseudoconnection = createPseudoconnection;
exports.getSourceTarget = getSourceTarget;
exports.makeConnection = makeConnection;
//# sourceMappingURL=rete-connection-plugin.common.js.map
