/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/debug/src/browser.js":
/*!*******************************************!*\
  !*** ./node_modules/debug/src/browser.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(/*! ./debug */ "./node_modules/debug/src/debug.js");
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  'lightseagreen',
  'forestgreen',
  'goldenrod',
  'dodgerblue',
  'darkorchid',
  'crimson'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/debug/src/debug.js":
/*!*****************************************!*\
  !*** ./node_modules/debug/src/debug.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(/*! ms */ "./node_modules/ms/index.js");

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  return debug;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}


/***/ }),

/***/ "./node_modules/inherits/inherits_browser.js":
/*!***************************************************!*\
  !*** ./node_modules/inherits/inherits_browser.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),

/***/ "./node_modules/markdown/lib/index.js":
/*!********************************************!*\
  !*** ./node_modules/markdown/lib/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// super simple module for the most common nodejs use case.
exports.markdown = __webpack_require__(/*! ./markdown */ "./node_modules/markdown/lib/markdown.js");
exports.parse = exports.markdown.toHTML;


/***/ }),

/***/ "./node_modules/markdown/lib/markdown.js":
/*!***********************************************!*\
  !*** ./node_modules/markdown/lib/markdown.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Released under MIT license
// Copyright (c) 2009-2010 Dominic Baggott
// Copyright (c) 2009-2010 Ash Berlin
// Copyright (c) 2011 Christoph Dorn <christoph@christophdorn.com> (http://www.christophdorn.com)

/*jshint browser:true, devel:true */

(function( expose ) {

/**
 *  class Markdown
 *
 *  Markdown processing in Javascript done right. We have very particular views
 *  on what constitutes 'right' which include:
 *
 *  - produces well-formed HTML (this means that em and strong nesting is
 *    important)
 *
 *  - has an intermediate representation to allow processing of parsed data (We
 *    in fact have two, both as [JsonML]: a markdown tree and an HTML tree).
 *
 *  - is easily extensible to add new dialects without having to rewrite the
 *    entire parsing mechanics
 *
 *  - has a good test suite
 *
 *  This implementation fulfills all of these (except that the test suite could
 *  do with expanding to automatically run all the fixtures from other Markdown
 *  implementations.)
 *
 *  ##### Intermediate Representation
 *
 *  *TODO* Talk about this :) Its JsonML, but document the node names we use.
 *
 *  [JsonML]: http://jsonml.org/ "JSON Markup Language"
 **/
var Markdown = expose.Markdown = function(dialect) {
  switch (typeof dialect) {
    case "undefined":
      this.dialect = Markdown.dialects.Gruber;
      break;
    case "object":
      this.dialect = dialect;
      break;
    default:
      if ( dialect in Markdown.dialects ) {
        this.dialect = Markdown.dialects[dialect];
      }
      else {
        throw new Error("Unknown Markdown dialect '" + String(dialect) + "'");
      }
      break;
  }
  this.em_state = [];
  this.strong_state = [];
  this.debug_indent = "";
};

/**
 *  parse( markdown, [dialect] ) -> JsonML
 *  - markdown (String): markdown string to parse
 *  - dialect (String | Dialect): the dialect to use, defaults to gruber
 *
 *  Parse `markdown` and return a markdown document as a Markdown.JsonML tree.
 **/
expose.parse = function( source, dialect ) {
  // dialect will default if undefined
  var md = new Markdown( dialect );
  return md.toTree( source );
};

/**
 *  toHTML( markdown, [dialect]  ) -> String
 *  toHTML( md_tree ) -> String
 *  - markdown (String): markdown string to parse
 *  - md_tree (Markdown.JsonML): parsed markdown tree
 *
 *  Take markdown (either as a string or as a JsonML tree) and run it through
 *  [[toHTMLTree]] then turn it into a well-formated HTML fragment.
 **/
expose.toHTML = function toHTML( source , dialect , options ) {
  var input = expose.toHTMLTree( source , dialect , options );

  return expose.renderJsonML( input );
};

/**
 *  toHTMLTree( markdown, [dialect] ) -> JsonML
 *  toHTMLTree( md_tree ) -> JsonML
 *  - markdown (String): markdown string to parse
 *  - dialect (String | Dialect): the dialect to use, defaults to gruber
 *  - md_tree (Markdown.JsonML): parsed markdown tree
 *
 *  Turn markdown into HTML, represented as a JsonML tree. If a string is given
 *  to this function, it is first parsed into a markdown tree by calling
 *  [[parse]].
 **/
expose.toHTMLTree = function toHTMLTree( input, dialect , options ) {
  // convert string input to an MD tree
  if ( typeof input ==="string" ) input = this.parse( input, dialect );

  // Now convert the MD tree to an HTML tree

  // remove references from the tree
  var attrs = extract_attr( input ),
      refs = {};

  if ( attrs && attrs.references ) {
    refs = attrs.references;
  }

  var html = convert_tree_to_html( input, refs , options );
  merge_text_nodes( html );
  return html;
};

// For Spidermonkey based engines
function mk_block_toSource() {
  return "Markdown.mk_block( " +
          uneval(this.toString()) +
          ", " +
          uneval(this.trailing) +
          ", " +
          uneval(this.lineNumber) +
          " )";
}

// node
function mk_block_inspect() {
  var util = __webpack_require__(/*! util */ "./node_modules/util/util.js");
  return "Markdown.mk_block( " +
          util.inspect(this.toString()) +
          ", " +
          util.inspect(this.trailing) +
          ", " +
          util.inspect(this.lineNumber) +
          " )";

}

var mk_block = Markdown.mk_block = function(block, trail, line) {
  // Be helpful for default case in tests.
  if ( arguments.length == 1 ) trail = "\n\n";

  var s = new String(block);
  s.trailing = trail;
  // To make it clear its not just a string
  s.inspect = mk_block_inspect;
  s.toSource = mk_block_toSource;

  if ( line != undefined )
    s.lineNumber = line;

  return s;
};

function count_lines( str ) {
  var n = 0, i = -1;
  while ( ( i = str.indexOf("\n", i + 1) ) !== -1 ) n++;
  return n;
}

// Internal - split source into rough blocks
Markdown.prototype.split_blocks = function splitBlocks( input, startLine ) {
  input = input.replace(/(\r\n|\n|\r)/g, "\n");
  // [\s\S] matches _anything_ (newline or space)
  // [^] is equivalent but doesn't work in IEs.
  var re = /([\s\S]+?)($|\n#|\n(?:\s*\n|$)+)/g,
      blocks = [],
      m;

  var line_no = 1;

  if ( ( m = /^(\s*\n)/.exec(input) ) != null ) {
    // skip (but count) leading blank lines
    line_no += count_lines( m[0] );
    re.lastIndex = m[0].length;
  }

  while ( ( m = re.exec(input) ) !== null ) {
    if (m[2] == "\n#") {
      m[2] = "\n";
      re.lastIndex--;
    }
    blocks.push( mk_block( m[1], m[2], line_no ) );
    line_no += count_lines( m[0] );
  }

  return blocks;
};

/**
 *  Markdown#processBlock( block, next ) -> undefined | [ JsonML, ... ]
 *  - block (String): the block to process
 *  - next (Array): the following blocks
 *
 * Process `block` and return an array of JsonML nodes representing `block`.
 *
 * It does this by asking each block level function in the dialect to process
 * the block until one can. Succesful handling is indicated by returning an
 * array (with zero or more JsonML nodes), failure by a false value.
 *
 * Blocks handlers are responsible for calling [[Markdown#processInline]]
 * themselves as appropriate.
 *
 * If the blocks were split incorrectly or adjacent blocks need collapsing you
 * can adjust `next` in place using shift/splice etc.
 *
 * If any of this default behaviour is not right for the dialect, you can
 * define a `__call__` method on the dialect that will get invoked to handle
 * the block processing.
 */
Markdown.prototype.processBlock = function processBlock( block, next ) {
  var cbs = this.dialect.block,
      ord = cbs.__order__;

  if ( "__call__" in cbs ) {
    return cbs.__call__.call(this, block, next);
  }

  for ( var i = 0; i < ord.length; i++ ) {
    //D:this.debug( "Testing", ord[i] );
    var res = cbs[ ord[i] ].call( this, block, next );
    if ( res ) {
      //D:this.debug("  matched");
      if ( !isArray(res) || ( res.length > 0 && !( isArray(res[0]) ) ) )
        this.debug(ord[i], "didn't return a proper array");
      //D:this.debug( "" );
      return res;
    }
  }

  // Uhoh! no match! Should we throw an error?
  return [];
};

Markdown.prototype.processInline = function processInline( block ) {
  return this.dialect.inline.__call__.call( this, String( block ) );
};

/**
 *  Markdown#toTree( source ) -> JsonML
 *  - source (String): markdown source to parse
 *
 *  Parse `source` into a JsonML tree representing the markdown document.
 **/
// custom_tree means set this.tree to `custom_tree` and restore old value on return
Markdown.prototype.toTree = function toTree( source, custom_root ) {
  var blocks = source instanceof Array ? source : this.split_blocks( source );

  // Make tree a member variable so its easier to mess with in extensions
  var old_tree = this.tree;
  try {
    this.tree = custom_root || this.tree || [ "markdown" ];

    blocks:
    while ( blocks.length ) {
      var b = this.processBlock( blocks.shift(), blocks );

      // Reference blocks and the like won't return any content
      if ( !b.length ) continue blocks;

      this.tree.push.apply( this.tree, b );
    }
    return this.tree;
  }
  finally {
    if ( custom_root ) {
      this.tree = old_tree;
    }
  }
};

// Noop by default
Markdown.prototype.debug = function () {
  var args = Array.prototype.slice.call( arguments);
  args.unshift(this.debug_indent);
  if ( typeof print !== "undefined" )
      print.apply( print, args );
  if ( typeof console !== "undefined" && typeof console.log !== "undefined" )
      console.log.apply( null, args );
}

Markdown.prototype.loop_re_over_block = function( re, block, cb ) {
  // Dont use /g regexps with this
  var m,
      b = block.valueOf();

  while ( b.length && (m = re.exec(b) ) != null ) {
    b = b.substr( m[0].length );
    cb.call(this, m);
  }
  return b;
};

/**
 * Markdown.dialects
 *
 * Namespace of built-in dialects.
 **/
Markdown.dialects = {};

/**
 * Markdown.dialects.Gruber
 *
 * The default dialect that follows the rules set out by John Gruber's
 * markdown.pl as closely as possible. Well actually we follow the behaviour of
 * that script which in some places is not exactly what the syntax web page
 * says.
 **/
Markdown.dialects.Gruber = {
  block: {
    atxHeader: function atxHeader( block, next ) {
      var m = block.match( /^(#{1,6})\s*(.*?)\s*#*\s*(?:\n|$)/ );

      if ( !m ) return undefined;

      var header = [ "header", { level: m[ 1 ].length } ];
      Array.prototype.push.apply(header, this.processInline(m[ 2 ]));

      if ( m[0].length < block.length )
        next.unshift( mk_block( block.substr( m[0].length ), block.trailing, block.lineNumber + 2 ) );

      return [ header ];
    },

    setextHeader: function setextHeader( block, next ) {
      var m = block.match( /^(.*)\n([-=])\2\2+(?:\n|$)/ );

      if ( !m ) return undefined;

      var level = ( m[ 2 ] === "=" ) ? 1 : 2;
      var header = [ "header", { level : level }, m[ 1 ] ];

      if ( m[0].length < block.length )
        next.unshift( mk_block( block.substr( m[0].length ), block.trailing, block.lineNumber + 2 ) );

      return [ header ];
    },

    code: function code( block, next ) {
      // |    Foo
      // |bar
      // should be a code block followed by a paragraph. Fun
      //
      // There might also be adjacent code block to merge.

      var ret = [],
          re = /^(?: {0,3}\t| {4})(.*)\n?/,
          lines;

      // 4 spaces + content
      if ( !block.match( re ) ) return undefined;

      block_search:
      do {
        // Now pull out the rest of the lines
        var b = this.loop_re_over_block(
                  re, block.valueOf(), function( m ) { ret.push( m[1] ); } );

        if ( b.length ) {
          // Case alluded to in first comment. push it back on as a new block
          next.unshift( mk_block(b, block.trailing) );
          break block_search;
        }
        else if ( next.length ) {
          // Check the next block - it might be code too
          if ( !next[0].match( re ) ) break block_search;

          // Pull how how many blanks lines follow - minus two to account for .join
          ret.push ( block.trailing.replace(/[^\n]/g, "").substring(2) );

          block = next.shift();
        }
        else {
          break block_search;
        }
      } while ( true );

      return [ [ "code_block", ret.join("\n") ] ];
    },

    horizRule: function horizRule( block, next ) {
      // this needs to find any hr in the block to handle abutting blocks
      var m = block.match( /^(?:([\s\S]*?)\n)?[ \t]*([-_*])(?:[ \t]*\2){2,}[ \t]*(?:\n([\s\S]*))?$/ );

      if ( !m ) {
        return undefined;
      }

      var jsonml = [ [ "hr" ] ];

      // if there's a leading abutting block, process it
      if ( m[ 1 ] ) {
        jsonml.unshift.apply( jsonml, this.processBlock( m[ 1 ], [] ) );
      }

      // if there's a trailing abutting block, stick it into next
      if ( m[ 3 ] ) {
        next.unshift( mk_block( m[ 3 ] ) );
      }

      return jsonml;
    },

    // There are two types of lists. Tight and loose. Tight lists have no whitespace
    // between the items (and result in text just in the <li>) and loose lists,
    // which have an empty line between list items, resulting in (one or more)
    // paragraphs inside the <li>.
    //
    // There are all sorts weird edge cases about the original markdown.pl's
    // handling of lists:
    //
    // * Nested lists are supposed to be indented by four chars per level. But
    //   if they aren't, you can get a nested list by indenting by less than
    //   four so long as the indent doesn't match an indent of an existing list
    //   item in the 'nest stack'.
    //
    // * The type of the list (bullet or number) is controlled just by the
    //    first item at the indent. Subsequent changes are ignored unless they
    //    are for nested lists
    //
    lists: (function( ) {
      // Use a closure to hide a few variables.
      var any_list = "[*+-]|\\d+\\.",
          bullet_list = /[*+-]/,
          number_list = /\d+\./,
          // Capture leading indent as it matters for determining nested lists.
          is_list_re = new RegExp( "^( {0,3})(" + any_list + ")[ \t]+" ),
          indent_re = "(?: {0,3}\\t| {4})";

      // TODO: Cache this regexp for certain depths.
      // Create a regexp suitable for matching an li for a given stack depth
      function regex_for_depth( depth ) {

        return new RegExp(
          // m[1] = indent, m[2] = list_type
          "(?:^(" + indent_re + "{0," + depth + "} {0,3})(" + any_list + ")\\s+)|" +
          // m[3] = cont
          "(^" + indent_re + "{0," + (depth-1) + "}[ ]{0,4})"
        );
      }
      function expand_tab( input ) {
        return input.replace( / {0,3}\t/g, "    " );
      }

      // Add inline content `inline` to `li`. inline comes from processInline
      // so is an array of content
      function add(li, loose, inline, nl) {
        if ( loose ) {
          li.push( [ "para" ].concat(inline) );
          return;
        }
        // Hmmm, should this be any block level element or just paras?
        var add_to = li[li.length -1] instanceof Array && li[li.length - 1][0] == "para"
                   ? li[li.length -1]
                   : li;

        // If there is already some content in this list, add the new line in
        if ( nl && li.length > 1 ) inline.unshift(nl);

        for ( var i = 0; i < inline.length; i++ ) {
          var what = inline[i],
              is_str = typeof what == "string";
          if ( is_str && add_to.length > 1 && typeof add_to[add_to.length-1] == "string" ) {
            add_to[ add_to.length-1 ] += what;
          }
          else {
            add_to.push( what );
          }
        }
      }

      // contained means have an indent greater than the current one. On
      // *every* line in the block
      function get_contained_blocks( depth, blocks ) {

        var re = new RegExp( "^(" + indent_re + "{" + depth + "}.*?\\n?)*$" ),
            replace = new RegExp("^" + indent_re + "{" + depth + "}", "gm"),
            ret = [];

        while ( blocks.length > 0 ) {
          if ( re.exec( blocks[0] ) ) {
            var b = blocks.shift(),
                // Now remove that indent
                x = b.replace( replace, "");

            ret.push( mk_block( x, b.trailing, b.lineNumber ) );
          }
          else {
            break;
          }
        }
        return ret;
      }

      // passed to stack.forEach to turn list items up the stack into paras
      function paragraphify(s, i, stack) {
        var list = s.list;
        var last_li = list[list.length-1];

        if ( last_li[1] instanceof Array && last_li[1][0] == "para" ) {
          return;
        }
        if ( i + 1 == stack.length ) {
          // Last stack frame
          // Keep the same array, but replace the contents
          last_li.push( ["para"].concat( last_li.splice(1, last_li.length - 1) ) );
        }
        else {
          var sublist = last_li.pop();
          last_li.push( ["para"].concat( last_li.splice(1, last_li.length - 1) ), sublist );
        }
      }

      // The matcher function
      return function( block, next ) {
        var m = block.match( is_list_re );
        if ( !m ) return undefined;

        function make_list( m ) {
          var list = bullet_list.exec( m[2] )
                   ? ["bulletlist"]
                   : ["numberlist"];

          stack.push( { list: list, indent: m[1] } );
          return list;
        }


        var stack = [], // Stack of lists for nesting.
            list = make_list( m ),
            last_li,
            loose = false,
            ret = [ stack[0].list ],
            i;

        // Loop to search over block looking for inner block elements and loose lists
        loose_search:
        while ( true ) {
          // Split into lines preserving new lines at end of line
          var lines = block.split( /(?=\n)/ );

          // We have to grab all lines for a li and call processInline on them
          // once as there are some inline things that can span lines.
          var li_accumulate = "";

          // Loop over the lines in this block looking for tight lists.
          tight_search:
          for ( var line_no = 0; line_no < lines.length; line_no++ ) {
            var nl = "",
                l = lines[line_no].replace(/^\n/, function(n) { nl = n; return ""; });

            // TODO: really should cache this
            var line_re = regex_for_depth( stack.length );

            m = l.match( line_re );
            //print( "line:", uneval(l), "\nline match:", uneval(m) );

            // We have a list item
            if ( m[1] !== undefined ) {
              // Process the previous list item, if any
              if ( li_accumulate.length ) {
                add( last_li, loose, this.processInline( li_accumulate ), nl );
                // Loose mode will have been dealt with. Reset it
                loose = false;
                li_accumulate = "";
              }

              m[1] = expand_tab( m[1] );
              var wanted_depth = Math.floor(m[1].length/4)+1;
              //print( "want:", wanted_depth, "stack:", stack.length);
              if ( wanted_depth > stack.length ) {
                // Deep enough for a nested list outright
                //print ( "new nested list" );
                list = make_list( m );
                last_li.push( list );
                last_li = list[1] = [ "listitem" ];
              }
              else {
                // We aren't deep enough to be strictly a new level. This is
                // where Md.pl goes nuts. If the indent matches a level in the
                // stack, put it there, else put it one deeper then the
                // wanted_depth deserves.
                var found = false;
                for ( i = 0; i < stack.length; i++ ) {
                  if ( stack[ i ].indent != m[1] ) continue;
                  list = stack[ i ].list;
                  stack.splice( i+1, stack.length - (i+1) );
                  found = true;
                  break;
                }

                if (!found) {
                  //print("not found. l:", uneval(l));
                  wanted_depth++;
                  if ( wanted_depth <= stack.length ) {
                    stack.splice(wanted_depth, stack.length - wanted_depth);
                    //print("Desired depth now", wanted_depth, "stack:", stack.length);
                    list = stack[wanted_depth-1].list;
                    //print("list:", uneval(list) );
                  }
                  else {
                    //print ("made new stack for messy indent");
                    list = make_list(m);
                    last_li.push(list);
                  }
                }

                //print( uneval(list), "last", list === stack[stack.length-1].list );
                last_li = [ "listitem" ];
                list.push(last_li);
              } // end depth of shenegains
              nl = "";
            }

            // Add content
            if ( l.length > m[0].length ) {
              li_accumulate += nl + l.substr( m[0].length );
            }
          } // tight_search

          if ( li_accumulate.length ) {
            add( last_li, loose, this.processInline( li_accumulate ), nl );
            // Loose mode will have been dealt with. Reset it
            loose = false;
            li_accumulate = "";
          }

          // Look at the next block - we might have a loose list. Or an extra
          // paragraph for the current li
          var contained = get_contained_blocks( stack.length, next );

          // Deal with code blocks or properly nested lists
          if ( contained.length > 0 ) {
            // Make sure all listitems up the stack are paragraphs
            forEach( stack, paragraphify, this);

            last_li.push.apply( last_li, this.toTree( contained, [] ) );
          }

          var next_block = next[0] && next[0].valueOf() || "";

          if ( next_block.match(is_list_re) || next_block.match( /^ / ) ) {
            block = next.shift();

            // Check for an HR following a list: features/lists/hr_abutting
            var hr = this.dialect.block.horizRule( block, next );

            if ( hr ) {
              ret.push.apply(ret, hr);
              break;
            }

            // Make sure all listitems up the stack are paragraphs
            forEach( stack, paragraphify, this);

            loose = true;
            continue loose_search;
          }
          break;
        } // loose_search

        return ret;
      };
    })(),

    blockquote: function blockquote( block, next ) {
      if ( !block.match( /^>/m ) )
        return undefined;

      var jsonml = [];

      // separate out the leading abutting block, if any. I.e. in this case:
      //
      //  a
      //  > b
      //
      if ( block[ 0 ] != ">" ) {
        var lines = block.split( /\n/ ),
            prev = [],
            line_no = block.lineNumber;

        // keep shifting lines until you find a crotchet
        while ( lines.length && lines[ 0 ][ 0 ] != ">" ) {
            prev.push( lines.shift() );
            line_no++;
        }

        var abutting = mk_block( prev.join( "\n" ), "\n", block.lineNumber );
        jsonml.push.apply( jsonml, this.processBlock( abutting, [] ) );
        // reassemble new block of just block quotes!
        block = mk_block( lines.join( "\n" ), block.trailing, line_no );
      }


      // if the next block is also a blockquote merge it in
      while ( next.length && next[ 0 ][ 0 ] == ">" ) {
        var b = next.shift();
        block = mk_block( block + block.trailing + b, b.trailing, block.lineNumber );
      }

      // Strip off the leading "> " and re-process as a block.
      var input = block.replace( /^> ?/gm, "" ),
          old_tree = this.tree,
          processedBlock = this.toTree( input, [ "blockquote" ] ),
          attr = extract_attr( processedBlock );

      // If any link references were found get rid of them
      if ( attr && attr.references ) {
        delete attr.references;
        // And then remove the attribute object if it's empty
        if ( isEmpty( attr ) ) {
          processedBlock.splice( 1, 1 );
        }
      }

      jsonml.push( processedBlock );
      return jsonml;
    },

    referenceDefn: function referenceDefn( block, next) {
      var re = /^\s*\[(.*?)\]:\s*(\S+)(?:\s+(?:(['"])(.*?)\3|\((.*?)\)))?\n?/;
      // interesting matches are [ , ref_id, url, , title, title ]

      if ( !block.match(re) )
        return undefined;

      // make an attribute node if it doesn't exist
      if ( !extract_attr( this.tree ) ) {
        this.tree.splice( 1, 0, {} );
      }

      var attrs = extract_attr( this.tree );

      // make a references hash if it doesn't exist
      if ( attrs.references === undefined ) {
        attrs.references = {};
      }

      var b = this.loop_re_over_block(re, block, function( m ) {

        if ( m[2] && m[2][0] == "<" && m[2][m[2].length-1] == ">" )
          m[2] = m[2].substring( 1, m[2].length - 1 );

        var ref = attrs.references[ m[1].toLowerCase() ] = {
          href: m[2]
        };

        if ( m[4] !== undefined )
          ref.title = m[4];
        else if ( m[5] !== undefined )
          ref.title = m[5];

      } );

      if ( b.length )
        next.unshift( mk_block( b, block.trailing ) );

      return [];
    },

    para: function para( block, next ) {
      // everything's a para!
      return [ ["para"].concat( this.processInline( block ) ) ];
    }
  }
};

Markdown.dialects.Gruber.inline = {

    __oneElement__: function oneElement( text, patterns_or_re, previous_nodes ) {
      var m,
          res,
          lastIndex = 0;

      patterns_or_re = patterns_or_re || this.dialect.inline.__patterns__;
      var re = new RegExp( "([\\s\\S]*?)(" + (patterns_or_re.source || patterns_or_re) + ")" );

      m = re.exec( text );
      if (!m) {
        // Just boring text
        return [ text.length, text ];
      }
      else if ( m[1] ) {
        // Some un-interesting text matched. Return that first
        return [ m[1].length, m[1] ];
      }

      var res;
      if ( m[2] in this.dialect.inline ) {
        res = this.dialect.inline[ m[2] ].call(
                  this,
                  text.substr( m.index ), m, previous_nodes || [] );
      }
      // Default for now to make dev easier. just slurp special and output it.
      res = res || [ m[2].length, m[2] ];
      return res;
    },

    __call__: function inline( text, patterns ) {

      var out = [],
          res;

      function add(x) {
        //D:self.debug("  adding output", uneval(x));
        if ( typeof x == "string" && typeof out[out.length-1] == "string" )
          out[ out.length-1 ] += x;
        else
          out.push(x);
      }

      while ( text.length > 0 ) {
        res = this.dialect.inline.__oneElement__.call(this, text, patterns, out );
        text = text.substr( res.shift() );
        forEach(res, add )
      }

      return out;
    },

    // These characters are intersting elsewhere, so have rules for them so that
    // chunks of plain text blocks don't include them
    "]": function () {},
    "}": function () {},

    __escape__ : /^\\[\\`\*_{}\[\]()#\+.!\-]/,

    "\\": function escaped( text ) {
      // [ length of input processed, node/children to add... ]
      // Only esacape: \ ` * _ { } [ ] ( ) # * + - . !
      if ( this.dialect.inline.__escape__.exec( text ) )
        return [ 2, text.charAt( 1 ) ];
      else
        // Not an esacpe
        return [ 1, "\\" ];
    },

    "![": function image( text ) {

      // Unlike images, alt text is plain text only. no other elements are
      // allowed in there

      // ![Alt text](/path/to/img.jpg "Optional title")
      //      1          2            3       4         <--- captures
      var m = text.match( /^!\[(.*?)\][ \t]*\([ \t]*([^")]*?)(?:[ \t]+(["'])(.*?)\3)?[ \t]*\)/ );

      if ( m ) {
        if ( m[2] && m[2][0] == "<" && m[2][m[2].length-1] == ">" )
          m[2] = m[2].substring( 1, m[2].length - 1 );

        m[2] = this.dialect.inline.__call__.call( this, m[2], /\\/ )[0];

        var attrs = { alt: m[1], href: m[2] || "" };
        if ( m[4] !== undefined)
          attrs.title = m[4];

        return [ m[0].length, [ "img", attrs ] ];
      }

      // ![Alt text][id]
      m = text.match( /^!\[(.*?)\][ \t]*\[(.*?)\]/ );

      if ( m ) {
        // We can't check if the reference is known here as it likely wont be
        // found till after. Check it in md tree->hmtl tree conversion
        return [ m[0].length, [ "img_ref", { alt: m[1], ref: m[2].toLowerCase(), original: m[0] } ] ];
      }

      // Just consume the '!['
      return [ 2, "![" ];
    },

    "[": function link( text ) {

      var orig = String(text);
      // Inline content is possible inside `link text`
      var res = Markdown.DialectHelpers.inline_until_char.call( this, text.substr(1), "]" );

      // No closing ']' found. Just consume the [
      if ( !res ) return [ 1, "[" ];

      var consumed = 1 + res[ 0 ],
          children = res[ 1 ],
          link,
          attrs;

      // At this point the first [...] has been parsed. See what follows to find
      // out which kind of link we are (reference or direct url)
      text = text.substr( consumed );

      // [link text](/path/to/img.jpg "Optional title")
      //                 1            2       3         <--- captures
      // This will capture up to the last paren in the block. We then pull
      // back based on if there a matching ones in the url
      //    ([here](/url/(test))
      // The parens have to be balanced
      var m = text.match( /^\s*\([ \t]*([^"']*)(?:[ \t]+(["'])(.*?)\2)?[ \t]*\)/ );
      if ( m ) {
        var url = m[1];
        consumed += m[0].length;

        if ( url && url[0] == "<" && url[url.length-1] == ">" )
          url = url.substring( 1, url.length - 1 );

        // If there is a title we don't have to worry about parens in the url
        if ( !m[3] ) {
          var open_parens = 1; // One open that isn't in the capture
          for ( var len = 0; len < url.length; len++ ) {
            switch ( url[len] ) {
            case "(":
              open_parens++;
              break;
            case ")":
              if ( --open_parens == 0) {
                consumed -= url.length - len;
                url = url.substring(0, len);
              }
              break;
            }
          }
        }

        // Process escapes only
        url = this.dialect.inline.__call__.call( this, url, /\\/ )[0];

        attrs = { href: url || "" };
        if ( m[3] !== undefined)
          attrs.title = m[3];

        link = [ "link", attrs ].concat( children );
        return [ consumed, link ];
      }

      // [Alt text][id]
      // [Alt text] [id]
      m = text.match( /^\s*\[(.*?)\]/ );

      if ( m ) {

        consumed += m[ 0 ].length;

        // [links][] uses links as its reference
        attrs = { ref: ( m[ 1 ] || String(children) ).toLowerCase(),  original: orig.substr( 0, consumed ) };

        link = [ "link_ref", attrs ].concat( children );

        // We can't check if the reference is known here as it likely wont be
        // found till after. Check it in md tree->hmtl tree conversion.
        // Store the original so that conversion can revert if the ref isn't found.
        return [ consumed, link ];
      }

      // [id]
      // Only if id is plain (no formatting.)
      if ( children.length == 1 && typeof children[0] == "string" ) {

        attrs = { ref: children[0].toLowerCase(),  original: orig.substr( 0, consumed ) };
        link = [ "link_ref", attrs, children[0] ];
        return [ consumed, link ];
      }

      // Just consume the "["
      return [ 1, "[" ];
    },


    "<": function autoLink( text ) {
      var m;

      if ( ( m = text.match( /^<(?:((https?|ftp|mailto):[^>]+)|(.*?@.*?\.[a-zA-Z]+))>/ ) ) != null ) {
        if ( m[3] ) {
          return [ m[0].length, [ "link", { href: "mailto:" + m[3] }, m[3] ] ];

        }
        else if ( m[2] == "mailto" ) {
          return [ m[0].length, [ "link", { href: m[1] }, m[1].substr("mailto:".length ) ] ];
        }
        else
          return [ m[0].length, [ "link", { href: m[1] }, m[1] ] ];
      }

      return [ 1, "<" ];
    },

    "`": function inlineCode( text ) {
      // Inline code block. as many backticks as you like to start it
      // Always skip over the opening ticks.
      var m = text.match( /(`+)(([\s\S]*?)\1)/ );

      if ( m && m[2] )
        return [ m[1].length + m[2].length, [ "inlinecode", m[3] ] ];
      else {
        // TODO: No matching end code found - warn!
        return [ 1, "`" ];
      }
    },

    "  \n": function lineBreak( text ) {
      return [ 3, [ "linebreak" ] ];
    }

};

// Meta Helper/generator method for em and strong handling
function strong_em( tag, md ) {

  var state_slot = tag + "_state",
      other_slot = tag == "strong" ? "em_state" : "strong_state";

  function CloseTag(len) {
    this.len_after = len;
    this.name = "close_" + md;
  }

  return function ( text, orig_match ) {

    if ( this[state_slot][0] == md ) {
      // Most recent em is of this type
      //D:this.debug("closing", md);
      this[state_slot].shift();

      // "Consume" everything to go back to the recrusion in the else-block below
      return[ text.length, new CloseTag(text.length-md.length) ];
    }
    else {
      // Store a clone of the em/strong states
      var other = this[other_slot].slice(),
          state = this[state_slot].slice();

      this[state_slot].unshift(md);

      //D:this.debug_indent += "  ";

      // Recurse
      var res = this.processInline( text.substr( md.length ) );
      //D:this.debug_indent = this.debug_indent.substr(2);

      var last = res[res.length - 1];

      //D:this.debug("processInline from", tag + ": ", uneval( res ) );

      var check = this[state_slot].shift();
      if ( last instanceof CloseTag ) {
        res.pop();
        // We matched! Huzzah.
        var consumed = text.length - last.len_after;
        return [ consumed, [ tag ].concat(res) ];
      }
      else {
        // Restore the state of the other kind. We might have mistakenly closed it.
        this[other_slot] = other;
        this[state_slot] = state;

        // We can't reuse the processed result as it could have wrong parsing contexts in it.
        return [ md.length, md ];
      }
    }
  }; // End returned function
}

Markdown.dialects.Gruber.inline["**"] = strong_em("strong", "**");
Markdown.dialects.Gruber.inline["__"] = strong_em("strong", "__");
Markdown.dialects.Gruber.inline["*"]  = strong_em("em", "*");
Markdown.dialects.Gruber.inline["_"]  = strong_em("em", "_");


// Build default order from insertion order.
Markdown.buildBlockOrder = function(d) {
  var ord = [];
  for ( var i in d ) {
    if ( i == "__order__" || i == "__call__" ) continue;
    ord.push( i );
  }
  d.__order__ = ord;
};

// Build patterns for inline matcher
Markdown.buildInlinePatterns = function(d) {
  var patterns = [];

  for ( var i in d ) {
    // __foo__ is reserved and not a pattern
    if ( i.match( /^__.*__$/) ) continue;
    var l = i.replace( /([\\.*+?|()\[\]{}])/g, "\\$1" )
             .replace( /\n/, "\\n" );
    patterns.push( i.length == 1 ? l : "(?:" + l + ")" );
  }

  patterns = patterns.join("|");
  d.__patterns__ = patterns;
  //print("patterns:", uneval( patterns ) );

  var fn = d.__call__;
  d.__call__ = function(text, pattern) {
    if ( pattern != undefined ) {
      return fn.call(this, text, pattern);
    }
    else
    {
      return fn.call(this, text, patterns);
    }
  };
};

Markdown.DialectHelpers = {};
Markdown.DialectHelpers.inline_until_char = function( text, want ) {
  var consumed = 0,
      nodes = [];

  while ( true ) {
    if ( text.charAt( consumed ) == want ) {
      // Found the character we were looking for
      consumed++;
      return [ consumed, nodes ];
    }

    if ( consumed >= text.length ) {
      // No closing char found. Abort.
      return null;
    }

    var res = this.dialect.inline.__oneElement__.call(this, text.substr( consumed ) );
    consumed += res[ 0 ];
    // Add any returned nodes.
    nodes.push.apply( nodes, res.slice( 1 ) );
  }
}

// Helper function to make sub-classing a dialect easier
Markdown.subclassDialect = function( d ) {
  function Block() {}
  Block.prototype = d.block;
  function Inline() {}
  Inline.prototype = d.inline;

  return { block: new Block(), inline: new Inline() };
};

Markdown.buildBlockOrder ( Markdown.dialects.Gruber.block );
Markdown.buildInlinePatterns( Markdown.dialects.Gruber.inline );

Markdown.dialects.Maruku = Markdown.subclassDialect( Markdown.dialects.Gruber );

Markdown.dialects.Maruku.processMetaHash = function processMetaHash( meta_string ) {
  var meta = split_meta_hash( meta_string ),
      attr = {};

  for ( var i = 0; i < meta.length; ++i ) {
    // id: #foo
    if ( /^#/.test( meta[ i ] ) ) {
      attr.id = meta[ i ].substring( 1 );
    }
    // class: .foo
    else if ( /^\./.test( meta[ i ] ) ) {
      // if class already exists, append the new one
      if ( attr["class"] ) {
        attr["class"] = attr["class"] + meta[ i ].replace( /./, " " );
      }
      else {
        attr["class"] = meta[ i ].substring( 1 );
      }
    }
    // attribute: foo=bar
    else if ( /\=/.test( meta[ i ] ) ) {
      var s = meta[ i ].split( /\=/ );
      attr[ s[ 0 ] ] = s[ 1 ];
    }
  }

  return attr;
}

function split_meta_hash( meta_string ) {
  var meta = meta_string.split( "" ),
      parts = [ "" ],
      in_quotes = false;

  while ( meta.length ) {
    var letter = meta.shift();
    switch ( letter ) {
      case " " :
        // if we're in a quoted section, keep it
        if ( in_quotes ) {
          parts[ parts.length - 1 ] += letter;
        }
        // otherwise make a new part
        else {
          parts.push( "" );
        }
        break;
      case "'" :
      case '"' :
        // reverse the quotes and move straight on
        in_quotes = !in_quotes;
        break;
      case "\\" :
        // shift off the next letter to be used straight away.
        // it was escaped so we'll keep it whatever it is
        letter = meta.shift();
      default :
        parts[ parts.length - 1 ] += letter;
        break;
    }
  }

  return parts;
}

Markdown.dialects.Maruku.block.document_meta = function document_meta( block, next ) {
  // we're only interested in the first block
  if ( block.lineNumber > 1 ) return undefined;

  // document_meta blocks consist of one or more lines of `Key: Value\n`
  if ( ! block.match( /^(?:\w+:.*\n)*\w+:.*$/ ) ) return undefined;

  // make an attribute node if it doesn't exist
  if ( !extract_attr( this.tree ) ) {
    this.tree.splice( 1, 0, {} );
  }

  var pairs = block.split( /\n/ );
  for ( p in pairs ) {
    var m = pairs[ p ].match( /(\w+):\s*(.*)$/ ),
        key = m[ 1 ].toLowerCase(),
        value = m[ 2 ];

    this.tree[ 1 ][ key ] = value;
  }

  // document_meta produces no content!
  return [];
};

Markdown.dialects.Maruku.block.block_meta = function block_meta( block, next ) {
  // check if the last line of the block is an meta hash
  var m = block.match( /(^|\n) {0,3}\{:\s*((?:\\\}|[^\}])*)\s*\}$/ );
  if ( !m ) return undefined;

  // process the meta hash
  var attr = this.dialect.processMetaHash( m[ 2 ] );

  var hash;

  // if we matched ^ then we need to apply meta to the previous block
  if ( m[ 1 ] === "" ) {
    var node = this.tree[ this.tree.length - 1 ];
    hash = extract_attr( node );

    // if the node is a string (rather than JsonML), bail
    if ( typeof node === "string" ) return undefined;

    // create the attribute hash if it doesn't exist
    if ( !hash ) {
      hash = {};
      node.splice( 1, 0, hash );
    }

    // add the attributes in
    for ( a in attr ) {
      hash[ a ] = attr[ a ];
    }

    // return nothing so the meta hash is removed
    return [];
  }

  // pull the meta hash off the block and process what's left
  var b = block.replace( /\n.*$/, "" ),
      result = this.processBlock( b, [] );

  // get or make the attributes hash
  hash = extract_attr( result[ 0 ] );
  if ( !hash ) {
    hash = {};
    result[ 0 ].splice( 1, 0, hash );
  }

  // attach the attributes to the block
  for ( a in attr ) {
    hash[ a ] = attr[ a ];
  }

  return result;
};

Markdown.dialects.Maruku.block.definition_list = function definition_list( block, next ) {
  // one or more terms followed by one or more definitions, in a single block
  var tight = /^((?:[^\s:].*\n)+):\s+([\s\S]+)$/,
      list = [ "dl" ],
      i, m;

  // see if we're dealing with a tight or loose block
  if ( ( m = block.match( tight ) ) ) {
    // pull subsequent tight DL blocks out of `next`
    var blocks = [ block ];
    while ( next.length && tight.exec( next[ 0 ] ) ) {
      blocks.push( next.shift() );
    }

    for ( var b = 0; b < blocks.length; ++b ) {
      var m = blocks[ b ].match( tight ),
          terms = m[ 1 ].replace( /\n$/, "" ).split( /\n/ ),
          defns = m[ 2 ].split( /\n:\s+/ );

      // print( uneval( m ) );

      for ( i = 0; i < terms.length; ++i ) {
        list.push( [ "dt", terms[ i ] ] );
      }

      for ( i = 0; i < defns.length; ++i ) {
        // run inline processing over the definition
        list.push( [ "dd" ].concat( this.processInline( defns[ i ].replace( /(\n)\s+/, "$1" ) ) ) );
      }
    }
  }
  else {
    return undefined;
  }

  return [ list ];
};

// splits on unescaped instances of @ch. If @ch is not a character the result
// can be unpredictable

Markdown.dialects.Maruku.block.table = function table (block, next) {

    var _split_on_unescaped = function(s, ch) {
        ch = ch || '\\s';
        if (ch.match(/^[\\|\[\]{}?*.+^$]$/)) { ch = '\\' + ch; }
        var res = [ ],
            r = new RegExp('^((?:\\\\.|[^\\\\' + ch + '])*)' + ch + '(.*)'),
            m;
        while(m = s.match(r)) {
            res.push(m[1]);
            s = m[2];
        }
        res.push(s);
        return res;
    }

    var leading_pipe = /^ {0,3}\|(.+)\n {0,3}\|\s*([\-:]+[\-| :]*)\n((?:\s*\|.*(?:\n|$))*)(?=\n|$)/,
        // find at least an unescaped pipe in each line
        no_leading_pipe = /^ {0,3}(\S(?:\\.|[^\\|])*\|.*)\n {0,3}([\-:]+\s*\|[\-| :]*)\n((?:(?:\\.|[^\\|])*\|.*(?:\n|$))*)(?=\n|$)/,
        i, m;
    if (m = block.match(leading_pipe)) {
        // remove leading pipes in contents
        // (header and horizontal rule already have the leading pipe left out)
        m[3] = m[3].replace(/^\s*\|/gm, '');
    } else if (! ( m = block.match(no_leading_pipe))) {
        return undefined;
    }

    var table = [ "table", [ "thead", [ "tr" ] ], [ "tbody" ] ];

    // remove trailing pipes, then split on pipes
    // (no escaped pipes are allowed in horizontal rule)
    m[2] = m[2].replace(/\|\s*$/, '').split('|');

    // process alignment
    var html_attrs = [ ];
    forEach (m[2], function (s) {
        if (s.match(/^\s*-+:\s*$/))       html_attrs.push({align: "right"});
        else if (s.match(/^\s*:-+\s*$/))  html_attrs.push({align: "left"});
        else if (s.match(/^\s*:-+:\s*$/)) html_attrs.push({align: "center"});
        else                              html_attrs.push({});
    });

    // now for the header, avoid escaped pipes
    m[1] = _split_on_unescaped(m[1].replace(/\|\s*$/, ''), '|');
    for (i = 0; i < m[1].length; i++) {
        table[1][1].push(['th', html_attrs[i] || {}].concat(
            this.processInline(m[1][i].trim())));
    }

    // now for body contents
    forEach (m[3].replace(/\|\s*$/mg, '').split('\n'), function (row) {
        var html_row = ['tr'];
        row = _split_on_unescaped(row, '|');
        for (i = 0; i < row.length; i++) {
            html_row.push(['td', html_attrs[i] || {}].concat(this.processInline(row[i].trim())));
        }
        table[2].push(html_row);
    }, this);

    return [table];
}

Markdown.dialects.Maruku.inline[ "{:" ] = function inline_meta( text, matches, out ) {
  if ( !out.length ) {
    return [ 2, "{:" ];
  }

  // get the preceeding element
  var before = out[ out.length - 1 ];

  if ( typeof before === "string" ) {
    return [ 2, "{:" ];
  }

  // match a meta hash
  var m = text.match( /^\{:\s*((?:\\\}|[^\}])*)\s*\}/ );

  // no match, false alarm
  if ( !m ) {
    return [ 2, "{:" ];
  }

  // attach the attributes to the preceeding element
  var meta = this.dialect.processMetaHash( m[ 1 ] ),
      attr = extract_attr( before );

  if ( !attr ) {
    attr = {};
    before.splice( 1, 0, attr );
  }

  for ( var k in meta ) {
    attr[ k ] = meta[ k ];
  }

  // cut out the string and replace it with nothing
  return [ m[ 0 ].length, "" ];
};

Markdown.dialects.Maruku.inline.__escape__ = /^\\[\\`\*_{}\[\]()#\+.!\-|:]/;

Markdown.buildBlockOrder ( Markdown.dialects.Maruku.block );
Markdown.buildInlinePatterns( Markdown.dialects.Maruku.inline );

var isArray = Array.isArray || function(obj) {
  return Object.prototype.toString.call(obj) == "[object Array]";
};

var forEach;
// Don't mess with Array.prototype. Its not friendly
if ( Array.prototype.forEach ) {
  forEach = function( arr, cb, thisp ) {
    return arr.forEach( cb, thisp );
  };
}
else {
  forEach = function(arr, cb, thisp) {
    for (var i = 0; i < arr.length; i++) {
      cb.call(thisp || arr, arr[i], i, arr);
    }
  }
}

var isEmpty = function( obj ) {
  for ( var key in obj ) {
    if ( hasOwnProperty.call( obj, key ) ) {
      return false;
    }
  }

  return true;
}

function extract_attr( jsonml ) {
  return isArray(jsonml)
      && jsonml.length > 1
      && typeof jsonml[ 1 ] === "object"
      && !( isArray(jsonml[ 1 ]) )
      ? jsonml[ 1 ]
      : undefined;
}



/**
 *  renderJsonML( jsonml[, options] ) -> String
 *  - jsonml (Array): JsonML array to render to XML
 *  - options (Object): options
 *
 *  Converts the given JsonML into well-formed XML.
 *
 *  The options currently understood are:
 *
 *  - root (Boolean): wether or not the root node should be included in the
 *    output, or just its children. The default `false` is to not include the
 *    root itself.
 */
expose.renderJsonML = function( jsonml, options ) {
  options = options || {};
  // include the root element in the rendered output?
  options.root = options.root || false;

  var content = [];

  if ( options.root ) {
    content.push( render_tree( jsonml ) );
  }
  else {
    jsonml.shift(); // get rid of the tag
    if ( jsonml.length && typeof jsonml[ 0 ] === "object" && !( jsonml[ 0 ] instanceof Array ) ) {
      jsonml.shift(); // get rid of the attributes
    }

    while ( jsonml.length ) {
      content.push( render_tree( jsonml.shift() ) );
    }
  }

  return content.join( "\n\n" );
};

function escapeHTML( text ) {
  return text.replace( /&/g, "&amp;" )
             .replace( /</g, "&lt;" )
             .replace( />/g, "&gt;" )
             .replace( /"/g, "&quot;" )
             .replace( /'/g, "&#39;" );
}

function render_tree( jsonml ) {
  // basic case
  if ( typeof jsonml === "string" ) {
    return escapeHTML( jsonml );
  }

  var tag = jsonml.shift(),
      attributes = {},
      content = [];

  if ( jsonml.length && typeof jsonml[ 0 ] === "object" && !( jsonml[ 0 ] instanceof Array ) ) {
    attributes = jsonml.shift();
  }

  while ( jsonml.length ) {
    content.push( render_tree( jsonml.shift() ) );
  }

  var tag_attrs = "";
  for ( var a in attributes ) {
    tag_attrs += " " + a + '="' + escapeHTML( attributes[ a ] ) + '"';
  }

  // be careful about adding whitespace here for inline elements
  if ( tag == "img" || tag == "br" || tag == "hr" ) {
    return "<"+ tag + tag_attrs + "/>";
  }
  else {
    return "<"+ tag + tag_attrs + ">" + content.join( "" ) + "</" + tag + ">";
  }
}

function convert_tree_to_html( tree, references, options ) {
  var i;
  options = options || {};

  // shallow clone
  var jsonml = tree.slice( 0 );

  if ( typeof options.preprocessTreeNode === "function" ) {
      jsonml = options.preprocessTreeNode(jsonml, references);
  }

  // Clone attributes if they exist
  var attrs = extract_attr( jsonml );
  if ( attrs ) {
    jsonml[ 1 ] = {};
    for ( i in attrs ) {
      jsonml[ 1 ][ i ] = attrs[ i ];
    }
    attrs = jsonml[ 1 ];
  }

  // basic case
  if ( typeof jsonml === "string" ) {
    return jsonml;
  }

  // convert this node
  switch ( jsonml[ 0 ] ) {
    case "header":
      jsonml[ 0 ] = "h" + jsonml[ 1 ].level;
      delete jsonml[ 1 ].level;
      break;
    case "bulletlist":
      jsonml[ 0 ] = "ul";
      break;
    case "numberlist":
      jsonml[ 0 ] = "ol";
      break;
    case "listitem":
      jsonml[ 0 ] = "li";
      break;
    case "para":
      jsonml[ 0 ] = "p";
      break;
    case "markdown":
      jsonml[ 0 ] = "html";
      if ( attrs ) delete attrs.references;
      break;
    case "code_block":
      jsonml[ 0 ] = "pre";
      i = attrs ? 2 : 1;
      var code = [ "code" ];
      code.push.apply( code, jsonml.splice( i, jsonml.length - i ) );
      jsonml[ i ] = code;
      break;
    case "inlinecode":
      jsonml[ 0 ] = "code";
      break;
    case "img":
      jsonml[ 1 ].src = jsonml[ 1 ].href;
      delete jsonml[ 1 ].href;
      break;
    case "linebreak":
      jsonml[ 0 ] = "br";
    break;
    case "link":
      jsonml[ 0 ] = "a";
      break;
    case "link_ref":
      jsonml[ 0 ] = "a";

      // grab this ref and clean up the attribute node
      var ref = references[ attrs.ref ];

      // if the reference exists, make the link
      if ( ref ) {
        delete attrs.ref;

        // add in the href and title, if present
        attrs.href = ref.href;
        if ( ref.title ) {
          attrs.title = ref.title;
        }

        // get rid of the unneeded original text
        delete attrs.original;
      }
      // the reference doesn't exist, so revert to plain text
      else {
        return attrs.original;
      }
      break;
    case "img_ref":
      jsonml[ 0 ] = "img";

      // grab this ref and clean up the attribute node
      var ref = references[ attrs.ref ];

      // if the reference exists, make the link
      if ( ref ) {
        delete attrs.ref;

        // add in the href and title, if present
        attrs.src = ref.href;
        if ( ref.title ) {
          attrs.title = ref.title;
        }

        // get rid of the unneeded original text
        delete attrs.original;
      }
      // the reference doesn't exist, so revert to plain text
      else {
        return attrs.original;
      }
      break;
  }

  // convert all the children
  i = 1;

  // deal with the attribute node, if it exists
  if ( attrs ) {
    // if there are keys, skip over it
    for ( var key in jsonml[ 1 ] ) {
        i = 2;
        break;
    }
    // if there aren't, remove it
    if ( i === 1 ) {
      jsonml.splice( i, 1 );
    }
  }

  for ( ; i < jsonml.length; ++i ) {
    jsonml[ i ] = convert_tree_to_html( jsonml[ i ], references, options );
  }

  return jsonml;
}


// merges adjacent text nodes into a single node
function merge_text_nodes( jsonml ) {
  // skip the tag name and attribute hash
  var i = extract_attr( jsonml ) ? 2 : 1;

  while ( i < jsonml.length ) {
    // if it's a string check the next item too
    if ( typeof jsonml[ i ] === "string" ) {
      if ( i + 1 < jsonml.length && typeof jsonml[ i + 1 ] === "string" ) {
        // merge the second string into the first and remove it
        jsonml[ i ] += jsonml.splice( i + 1, 1 )[ 0 ];
      }
      else {
        ++i;
      }
    }
    // if it's not a string recurse
    else {
      merge_text_nodes( jsonml[ i ] );
      ++i;
    }
  }
}

} )( (function() {
  if ( false ) {}
  else {
    return exports;
  }
} )() );


/***/ }),

/***/ "./node_modules/ms/index.js":
/*!**********************************!*\
  !*** ./node_modules/ms/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}


/***/ }),

/***/ "./node_modules/node-fetch/browser.js":
/*!********************************************!*\
  !*** ./node_modules/node-fetch/browser.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = exports = self.fetch;

// Needed for TypeScript and Webpack.
exports.default = self.fetch.bind(self);

exports.Headers = self.Headers;
exports.Request = self.Request;
exports.Response = self.Response;


/***/ }),

/***/ "./node_modules/oembed-parser/index.js":
/*!*********************************************!*\
  !*** ./node_modules/oembed-parser/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Starting app
 * @ndaidong
**/

global.Promise = __webpack_require__(/*! promise-wtf */ "./node_modules/promise-wtf/dist/promise-wtf.min.js");

const main = __webpack_require__(/*! ./src/main */ "./node_modules/oembed-parser/src/main.js");
main.version = __webpack_require__(/*! ./package.json */ "./node_modules/oembed-parser/package.json").version;

module.exports = main;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/oembed-parser/package.json":
/*!*************************************************!*\
  !*** ./node_modules/oembed-parser/package.json ***!
  \*************************************************/
/*! exports provided: _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _shasum, _spec, _where, author, bugs, bundleDependencies, dependencies, deprecated, description, devDependencies, engines, homepage, keywords, license, main, name, repository, scripts, version, default */
/***/ (function(module) {

module.exports = {"_from":"oembed-parser","_id":"oembed-parser@1.1.1","_inBundle":false,"_integrity":"sha512-/TeVdTM1W0y66pWaqg0gl/ywb010siUil4QjiQ/v1i1sQlE6W767HxAcB0sh57Gy2HlWzTsnROJXU15AG5W5Hw==","_location":"/oembed-parser","_phantomChildren":{},"_requested":{"type":"tag","registry":true,"raw":"oembed-parser","name":"oembed-parser","escapedName":"oembed-parser","rawSpec":"","saveSpec":null,"fetchSpec":"latest"},"_requiredBy":["#USER","/"],"_resolved":"https://registry.npmjs.org/oembed-parser/-/oembed-parser-1.1.1.tgz","_shasum":"6c7e8fb87faefbf99a9408f87325151e274aa80a","_spec":"oembed-parser","_where":"C:\\Users\\preyadav1\\vagrant-ubuntu-xenial-node-8-master\\vagrant-ubuntu-xenial-node-8-master\\emoji","author":{"name":"@ndaidong"},"bugs":{"url":"https://github.com/ndaidong/oembed-parser/issues"},"bundleDependencies":false,"dependencies":{"bellajs":"^7.2.2","node-fetch":"^2.1.2","promise-wtf":"^1.2.4"},"deprecated":false,"description":"Get oEmbed data from given URL.","devDependencies":{"debug":"^3.1.0","eslint":"^4.19.1","eslint-config-goes":"^1.0.0","tap":"^12.0.1"},"engines":{"node":">= 6.0"},"homepage":"https://www.npmjs.com/package/oembed-parser","keywords":["oembed","extractor","parser","util"],"license":"MIT","main":"./index.js","name":"oembed-parser","repository":{"type":"git","url":"git+https://github.com/ndaidong/oembed-parser.git"},"scripts":{"lint":"eslint .","pretest":"npm run lint","reset":"node reset","start":"DEBUG=*:* node index","sync":"DEBUG=oembed-parser:* node sync","test":"tap test/start.js --coverage --reporter=spec"},"version":"1.1.1"};

/***/ }),

/***/ "./node_modules/oembed-parser/src/main.js":
/*!************************************************!*\
  !*** ./node_modules/oembed-parser/src/main.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// main

const {
  isValidURL,
  findProvider,
  fetchEmbed,
} = __webpack_require__(/*! ./utils */ "./node_modules/oembed-parser/src/utils/index.js");

const extract = (url) => {
  return new Promise((resolve, reject) => {
    if (!isValidURL(url)) {
      return reject(new Error('Invalid input URL'));
    }
    let p = findProvider(url);
    if (!p) {
      return reject(new Error(`No provider found with given url "${url}"`));
    }
    return resolve(fetchEmbed(url, p));
  });
};

const hasProvider = (url) => {
  return findProvider(url) !== null;
};

module.exports = {
  extract,
  hasProvider,
};


/***/ }),

/***/ "./node_modules/oembed-parser/src/utils/fetchEmbed.js":
/*!************************************************************!*\
  !*** ./node_modules/oembed-parser/src/utils/fetchEmbed.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// utils -> fetchEmbed

const fetch = __webpack_require__(/*! node-fetch */ "./node_modules/node-fetch/browser.js");

const fetchEmbed = (url, provider) => {
  return new Promise((resolve, reject) => {
    let {
      provider_name, // eslint-disable-line camelcase
      provider_url, // eslint-disable-line camelcase
      url: resourceUrl,
    } = provider;

    let link = `${resourceUrl}?format=json&url=${encodeURIComponent(url)}`;

    return fetch(link).then((res) => {
      return res.json();
    }).then((json) => {
      json.provider_name = provider_name; // eslint-disable-line camelcase
      json.provider_url = provider_url; // eslint-disable-line camelcase
      return resolve(json);
    }).catch((err) => {
      return reject(err);
    });
  });
};

module.exports = fetchEmbed;


/***/ }),

/***/ "./node_modules/oembed-parser/src/utils/findProvider.js":
/*!**************************************************************!*\
  !*** ./node_modules/oembed-parser/src/utils/findProvider.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// utils -> findProvider


const providerList = __webpack_require__(/*! ./providers.json */ "./node_modules/oembed-parser/src/utils/providers.json");

const getHostname = (url) => {
  let match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
  if (match && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
    return match[2];
  }
  return null;
};

const providers = providerList.map((item) => {
  let {
    provider_name, // eslint-disable-line camelcase
    provider_url, // eslint-disable-line camelcase
    endpoints,
  } = item;

  let endpoint = endpoints[0];
  let {
    schemes = [],
    url,
  } = endpoint;

  let hostname = getHostname(url);
  let domain = hostname ? hostname.replace('www.', '') : '';

  return {
    provider_name, // eslint-disable-line camelcase
    provider_url, // eslint-disable-line camelcase
    schemes,
    domain,
    url,
  };
}).filter((item) => {
  return item.domain !== '';
});

const findProvider = (url) => {
  let candidates = providers.filter((provider) => {
    let {
      schemes,
      domain,
    } = provider;
    if (!schemes.length) {
      return url.includes(domain);
    }
    return schemes.some((scheme) => {
      let reg = new RegExp(scheme.replace(/\*/g, '(.*)'), 'i');
      return url.match(reg);
    });
  });

  return candidates.length > 0 ? candidates[0] : null;
};

module.exports = findProvider;


/***/ }),

/***/ "./node_modules/oembed-parser/src/utils/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/oembed-parser/src/utils/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  isValidURL: __webpack_require__(/*! ./isValidURL */ "./node_modules/oembed-parser/src/utils/isValidURL.js"),
  findProvider: __webpack_require__(/*! ./findProvider */ "./node_modules/oembed-parser/src/utils/findProvider.js"),
  fetchEmbed: __webpack_require__(/*! ./fetchEmbed */ "./node_modules/oembed-parser/src/utils/fetchEmbed.js"),
  logger: __webpack_require__(/*! ./logger */ "./node_modules/oembed-parser/src/utils/logger.js"),
};


/***/ }),

/***/ "./node_modules/oembed-parser/src/utils/isValidURL.js":
/*!************************************************************!*\
  !*** ./node_modules/oembed-parser/src/utils/isValidURL.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * uri -> check if a url is valid
 * @ndaidong
 **/

const isValidURL = (str) => {
  if (!str) {
    return false;
  }

  /* eslint-disable*/
  let pattern = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
  /* eslint-enable*/

  if (!pattern.test(str)) {
    return false;
  }
  return true;
};

module.exports = isValidURL;


/***/ }),

/***/ "./node_modules/oembed-parser/src/utils/logger.js":
/*!********************************************************!*\
  !*** ./node_modules/oembed-parser/src/utils/logger.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// utils / logger

const {
  name,
} = __webpack_require__(/*! ../../package.json */ "./node_modules/oembed-parser/package.json");

const debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");

const info = debug(`${name}:info`);
const error = debug(`${name}:error`);
const warning = debug(`${name}:warning`);

module.exports = {
  info,
  error,
  warning,
};


/***/ }),

/***/ "./node_modules/oembed-parser/src/utils/providers.json":
/*!*************************************************************!*\
  !*** ./node_modules/oembed-parser/src/utils/providers.json ***!
  \*************************************************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, default */
/***/ (function(module) {

module.exports = [{"provider_name":"23HQ","provider_url":"http://www.23hq.com","endpoints":[{"schemes":["http://www.23hq.com/*/photo/*"],"url":"http://www.23hq.com/23/oembed"}]},{"provider_name":"Adways","provider_url":"http://www.adways.com","endpoints":[{"schemes":["http://play.adpaths.com/experience/*"],"url":"http://play.adpaths.com/oembed/*"}]},{"provider_name":"Alpha App Net","provider_url":"https://alpha.app.net/browse/posts/","endpoints":[{"schemes":["https://alpha.app.net/*/post/*","https://photos.app.net/*/*"],"url":"https://alpha-api.app.net/oembed","formats":["json"]}]},{"provider_name":"amCharts Live Editor","provider_url":"http://live.amcharts.com/","endpoints":[{"schemes":["http://live.amcharts.com/*"],"url":"http://live.amcharts.com/oembed"}]},{"provider_name":"Animatron","provider_url":"https://www.animatron.com/","endpoints":[{"schemes":["https://www.animatron.com/project/*","https://animatron.com/project/*"],"url":"https://animatron.com/oembed/json","discovery":true}]},{"provider_name":"Animoto","provider_url":"http://animoto.com/","endpoints":[{"schemes":["http://animoto.com/play/*"],"url":"http://animoto.com/oembeds/create"}]},{"provider_name":"Audiomack","provider_url":"https://www.audiomack.com","endpoints":[{"schemes":["https://www.audiomack.com/song/*","https://www.audiomack.com/album/*","https://www.audiomack.com/playlist/*"],"url":"https://www.audiomack.com/oembed","discovery":true}]},{"provider_name":"AudioSnaps","provider_url":"http://audiosnaps.com","endpoints":[{"schemes":["http://audiosnaps.com/k/*"],"url":"http://audiosnaps.com/service/oembed","discovery":true}]},{"provider_name":"Beautiful.AI","provider_url":"https://www.beautiful.ai/","endpoints":[{"url":"https://www.beautiful.ai/api/oembed","discovery":true}]},{"provider_name":"Blackfire.io","provider_url":"https://blackfire.io","endpoints":[{"schemes":["https://blackfire.io/profiles/*/graph","https://blackfire.io/profiles/compare/*/graph"],"url":"https://blackfire.io/oembed","discovery":true}]},{"provider_name":"Box Office Buz","provider_url":"http://boxofficebuz.com","endpoints":[{"url":"http://boxofficebuz.com/oembed","discovery":true}]},{"provider_name":"Buttondown","provider_url":"https://buttondown.email/","endpoints":[{"schemes":["https://buttondown.email/*"],"url":"https://buttondown.email/embed","formats":["json"]}]},{"provider_name":"Cacoo","provider_url":"https://cacoo.com","endpoints":[{"schemes":["https://cacoo.com/diagrams/*"],"url":"http://cacoo.com/oembed.{format}"}]},{"provider_name":"Carbon Health","provider_url":"https://carbonhealth.com","endpoints":[{"schemes":["https://carbonhealth.com/practice/*"],"url":"http://carbonhealth.com/oembed","discovery":true}]},{"provider_name":"CatBoat","provider_url":"http://img.catbo.at/","endpoints":[{"schemes":["http://img.catbo.at/*"],"url":"http://img.catbo.at/oembed.json","formats":["json"]}]},{"provider_name":"Ceros","provider_url":"http://www.ceros.com/","endpoints":[{"schemes":["http://view.ceros.com/*"],"url":"http://view.ceros.com/oembed","discovery":true}]},{"provider_name":"ChartBlocks","provider_url":"http://www.chartblocks.com/","endpoints":[{"schemes":["http://public.chartblocks.com/c/*"],"url":"http://embed.chartblocks.com/1.0/oembed"}]},{"provider_name":"chirbit.com","provider_url":"http://www.chirbit.com/","endpoints":[{"schemes":["http://chirb.it/*"],"url":"http://chirb.it/oembed.{format}","discovery":true}]},{"provider_name":"CircuitLab","provider_url":"https://www.circuitlab.com/","endpoints":[{"schemes":["https://www.circuitlab.com/circuit/*"],"url":"https://www.circuitlab.com/circuit/oembed/","discovery":true}]},{"provider_name":"Clipland","provider_url":"http://www.clipland.com/","endpoints":[{"schemes":["http://www.clipland.com/v/*","https://www.clipland.com/v/*"],"url":"https://www.clipland.com/api/oembed","discovery":true}]},{"provider_name":"Clyp","provider_url":"http://clyp.it/","endpoints":[{"schemes":["http://clyp.it/*","http://clyp.it/playlist/*"],"url":"http://api.clyp.it/oembed/","discovery":true}]},{"provider_name":"Codepen","provider_url":"https://codepen.io","endpoints":[{"schemes":["http://codepen.io/*","https://codepen.io/*"],"url":"http://codepen.io/api/oembed"}]},{"provider_name":"Codepoints","provider_url":"https://codepoints.net","endpoints":[{"schemes":["http://codepoints.net/*","https://codepoints.net/*","http://www.codepoints.net/*","https://www.codepoints.net/*"],"url":"https://codepoints.net/api/v1/oembed","discovery":true}]},{"provider_name":"CodeSandbox","provider_url":"https://codesandbox.io","endpoints":[{"schemes":["https://codesandbox.io/s/*","https://codesandbox.io/embed/*"],"url":"https://codesandbox.io/oembed"}]},{"provider_name":"CollegeHumor","provider_url":"http://www.collegehumor.com/","endpoints":[{"schemes":["http://www.collegehumor.com/video/*"],"url":"http://www.collegehumor.com/oembed.{format}","discovery":true}]},{"provider_name":"Commaful","provider_url":"https://commaful.com","endpoints":[{"schemes":["https://commaful.com/play/*"],"url":"https://commaful.com/api/oembed/"}]},{"provider_name":"Coub","provider_url":"http://coub.com/","endpoints":[{"schemes":["http://coub.com/view/*","http://coub.com/embed/*"],"url":"http://coub.com/api/oembed.{format}"}]},{"provider_name":"Crowd Ranking","provider_url":"http://crowdranking.com","endpoints":[{"schemes":["http://crowdranking.com/*/*"],"url":"http://crowdranking.com/api/oembed.{format}"}]},{"provider_name":"Cyrano Systems","provider_url":"http://www.cyranosystems.com/","endpoints":[{"schemes":["https://staging.cyranosystems.com/msg/*","https://app.cyranosystems.com/msg/*"],"url":"https://staging.cyranosystems.com/oembed","formats":["json"],"discovery":true}]},{"provider_name":"Daily Mile","provider_url":"http://www.dailymile.com","endpoints":[{"schemes":["http://www.dailymile.com/people/*/entries/*"],"url":"http://api.dailymile.com/oembed?format=json","formats":["json"]}]},{"provider_name":"Dailymotion","provider_url":"http://www.dailymotion.com","endpoints":[{"schemes":["http://www.dailymotion.com/video/*"],"url":"http://www.dailymotion.com/services/oembed","discovery":true}]},{"provider_name":"Deviantart.com","provider_url":"http://www.deviantart.com","endpoints":[{"schemes":["http://*.deviantart.com/art/*","http://*.deviantart.com/*#/d*","http://fav.me/*","http://sta.sh/*"],"url":"http://backend.deviantart.com/oembed"}]},{"provider_name":"Didacte","provider_url":"https://www.didacte.com/","endpoints":[{"schemes":["https://*.didacte.com/a/course/*"],"url":"https://*.didacte.com/cards/oembed'","discovery":true,"formats":["json"]}]},{"provider_name":"Digiteka","provider_url":"https://www.ultimedia.com/","endpoints":[{"schemes":["https://www.ultimedia.com/central/video/edit/id/*/topic_id/*/","https://www.ultimedia.com/default/index/videogeneric/id/*/showtitle/1/viewnc/1","https://www.ultimedia.com/default/index/videogeneric/id/*"],"url":"https://www.ultimedia.com/api/search/oembed"}]},{"provider_name":"Dipity","provider_url":"http://www.dipity.com","endpoints":[{"schemes":["http://www.dipity.com/*/*/"],"url":"http://www.dipity.com/oembed/timeline/"}]},{"provider_name":"DocDroid","provider_url":"https://www.docdroid.net/","endpoints":[{"schemes":["https://*.docdroid.net/*","http://*.docdroid.net/*","https://docdro.id/*","http://docdro.id/*"],"url":"https://www.docdroid.net/api/oembed","formats":["json"],"discovery":true}]},{"provider_name":"Dotsub","provider_url":"http://dotsub.com/","endpoints":[{"schemes":["http://dotsub.com/view/*"],"url":"http://dotsub.com/services/oembed"}]},{"provider_name":"DTube","provider_url":"https://d.tube/","endpoints":[{"schemes":["https://d.tube/v/*"],"url":"https://api.d.tube/oembed","discovery":true}]},{"provider_name":"edocr","provider_url":"http://www.edocr.com","endpoints":[{"schemes":["http://edocr.com/docs/*"],"url":"http://edocr.com/api/oembed"}]},{"provider_name":"eduMedia","provider_url":"https://www.edumedia-sciences.com/","endpoints":[{"url":"https://www.edumedia-sciences.com/oembed.json","discovery":true},{"url":"https://www.edumedia-sciences.com/oembed.xml","discovery":true}]},{"provider_name":"EgliseInfo","provider_url":"http://egliseinfo.catholique.fr/","endpoints":[{"schemes":["http://egliseinfo.catholique.fr/*"],"url":"http://egliseinfo.catholique.fr/api/oembed","discovery":true}]},{"provider_name":"Embed Articles","provider_url":"http://embedarticles.com/","endpoints":[{"schemes":["http://embedarticles.com/*"],"url":"http://embedarticles.com/oembed/"}]},{"provider_name":"Embedly","provider_url":"http://api.embed.ly/","endpoints":[{"url":"http://api.embed.ly/1/oembed"}]},{"provider_name":"Ethfiddle","provider_url":"https://www.ethfiddle.com/","endpoints":[{"schemes":["https://ethfiddle.com/*"],"url":"https://ethfiddle.com/services/oembed/","discovery":true}]},{"provider_name":"Eyrie","provider_url":"https://eyrie.io/","endpoints":[{"schemes":["https://eyrie.io/board/*","https://eyrie.io/sparkfun/*"],"url":"https://eyrie.io/v1/oembed","discovery":true}]},{"provider_name":"Facebook (Video)","provider_url":"https://www.facebook.com/","endpoints":[{"schemes":["https://www.facebook.com/*/videos/*","https://www.facebook.com/video.php"],"url":"https://www.facebook.com/plugins/video/oembed.json","discovery":true}]},{"provider_name":"Faithlife TV","provider_url":"https://faithlifetv.com","endpoints":[{"schemes":["https://faithlifetv.com/items/*","https://faithlifetv.com/items/resource/*/*","https://faithlifetv.com/media/*","https://faithlifetv.com/media/assets/*","https://faithlifetv.com/media/resource/*/*"],"url":"https://faithlifetv.com/api/oembed","discovery":true}]},{"provider_name":"Flat","provider_url":"https://flat.io","endpoints":[{"schemes":["https://flat.io/score/*","https://*.flat.io/score/*"],"url":"https://flat.io/services/oembed","discovery":true}]},{"provider_name":"Flickr","provider_url":"http://www.flickr.com/","endpoints":[{"schemes":["http://*.flickr.com/photos/*","http://flic.kr/p/*"],"url":"http://www.flickr.com/services/oembed/","discovery":true}]},{"provider_name":"Flourish","provider_url":"https://flourish.studio/","endpoints":[{"schemes":["https://public.flourish.studio/visualisation/*","https://public.flourish.studio/story/*"],"url":"https://app.flourish.studio/api/v1/oembed","discovery":true}]},{"provider_name":"FOX SPORTS Australia","provider_url":"http://www.foxsports.com.au","endpoints":[{"schemes":["http://fiso.foxsports.com.au/isomorphic-widget/*","https://fiso.foxsports.com.au/isomorphic-widget/*"],"url":"https://fiso.foxsports.com.au/oembed"}]},{"provider_name":"FrameBuzz","provider_url":"https://framebuzz.com/","endpoints":[{"schemes":["http://framebuzz.com/v/*","https://framebuzz.com/v/*"],"url":"https://framebuzz.com/oembed/","discovery":true}]},{"provider_name":"FunnyOrDie","provider_url":"http://www.funnyordie.com/","endpoints":[{"schemes":["http://www.funnyordie.com/videos/*"],"url":"http://www.funnyordie.com/oembed.{format}"}]},{"provider_name":"Geograph Britain and Ireland","provider_url":"https://www.geograph.org.uk/","endpoints":[{"schemes":["http://*.geograph.org.uk/*","http://*.geograph.co.uk/*","http://*.geograph.ie/*","http://*.wikimedia.org/*_geograph.org.uk_*"],"url":"http://api.geograph.org.uk/api/oembed"}]},{"provider_name":"Geograph Channel Islands","provider_url":"http://channel-islands.geograph.org/","endpoints":[{"schemes":["http://*.geograph.org.gg/*","http://*.geograph.org.je/*","http://channel-islands.geograph.org/*","http://channel-islands.geographs.org/*","http://*.channel.geographs.org/*"],"url":"http://www.geograph.org.gg/api/oembed"}]},{"provider_name":"Geograph Germany","provider_url":"http://geo-en.hlipp.de/","endpoints":[{"schemes":["http://geo-en.hlipp.de/*","http://geo.hlipp.de/*","http://germany.geograph.org/*"],"url":"http://geo.hlipp.de/restapi.php/api/oembed"}]},{"provider_name":"Getty Images","provider_url":"http://www.gettyimages.com/","endpoints":[{"schemes":["http://gty.im/*"],"url":"http://embed.gettyimages.com/oembed","formats":["json"]}]},{"provider_name":"Gfycat","provider_url":"https://gfycat.com/","endpoints":[{"schemes":["http://gfycat.com/*","http://www.gfycat.com/*","https://gfycat.com/*","https://www.gfycat.com/*"],"url":"https://api.gfycat.com/v1/oembed","discovery":true}]},{"provider_name":"GIPHY","provider_url":"https://giphy.com","endpoints":[{"schemes":["https://giphy.com/gifs/*","http://gph.is/*","https://media.giphy.com/media/*/giphy.gif"],"url":"https://giphy.com/services/oembed","discovery":true}]},{"provider_name":"GloriaTV","provider_url":"https://gloria.tv/","endpoints":[{"url":"https://gloria.tv/oembed/","discovery":true}]},{"provider_name":"Gyazo","provider_url":"https://gyazo.com","endpoints":[{"schemes":["https://gyazo.com/*"],"url":"https://api.gyazo.com/api/oembed","formats":["json"]}]},{"provider_name":"HuffDuffer","provider_url":"http://huffduffer.com","endpoints":[{"schemes":["http://huffduffer.com/*/*"],"url":"http://huffduffer.com/oembed"}]},{"provider_name":"Hulu","provider_url":"http://www.hulu.com/","endpoints":[{"schemes":["http://www.hulu.com/watch/*"],"url":"http://www.hulu.com/api/oembed.{format}"}]},{"provider_name":"iFixit","provider_url":"http://www.iFixit.com","endpoints":[{"schemes":["http://www.ifixit.com/Guide/View/*"],"url":"http://www.ifixit.com/Embed"}]},{"provider_name":"IFTTT","provider_url":"http://www.ifttt.com/","endpoints":[{"schemes":["http://ifttt.com/recipes/*"],"url":"http://www.ifttt.com/oembed/","discovery":true}]},{"provider_name":"Indaco","provider_url":"https://player.indacolive.com/","endpoints":[{"schemes":["https://player.indacolive.com/player/jwp/clients/*"],"url":"https://player.indacolive.com/services/oembed","formats":["json"]}]},{"provider_name":"Infogram","provider_url":"https://infogr.am/","endpoints":[{"schemes":["https://infogr.am/*"],"url":"https://infogr.am/oembed"}]},{"provider_name":"Infoveave","provider_url":"https://infoveave.net/","endpoints":[{"schemes":["https://*.infoveave.net/E/*","https://*.infoveave.net/P/*"],"url":"https://infoveave.net/services/oembed/","discovery":true}]},{"provider_name":"Inoreader","provider_url":"https://www.inoreader.com","endpoints":[{"schemes":["https://www.inoreader.com/oembed/"],"url":"https://www.inoreader.com/oembed/api/","discovery":true}]},{"provider_name":"inphood","provider_url":"http://inphood.com/","endpoints":[{"schemes":["http://*.inphood.com/*"],"url":"http://api.inphood.com/oembed","formats":["json"]}]},{"provider_name":"Instagram","provider_url":"https://instagram.com","endpoints":[{"schemes":["http://instagram.com/p/*","http://instagr.am/p/*","http://www.instagram.com/p/*","http://www.instagr.am/p/*","https://instagram.com/p/*","https://instagr.am/p/*","https://www.instagram.com/p/*","https://www.instagr.am/p/*"],"url":"https://api.instagram.com/oembed","formats":["json"]}]},{"provider_name":"iSnare Articles","provider_url":"https://www.isnare.com/","endpoints":[{"schemes":["https://www.isnare.com/*"],"url":"https://www.isnare.com/oembed/"}]},{"provider_name":"ivlismusic","provider_url":"https://music.ivlis.kr/","endpoints":[{"url":"https://music.ivlis.kr/oembed","discovery":true}]},{"provider_name":"Kickstarter","provider_url":"http://www.kickstarter.com","endpoints":[{"schemes":["http://www.kickstarter.com/projects/*"],"url":"http://www.kickstarter.com/services/oembed"}]},{"provider_name":"Kidoju","provider_url":"https://www.kidoju.com/","endpoints":[{"schemes":["https://www.kidoju.com/en/x/*/*","https://www.kidoju.com/fr/x/*/*"],"url":"https://www.kidoju.com/api/oembed"}]},{"provider_name":"Kit","provider_url":"https://kit.com/","endpoints":[{"schemes":["http://kit.com/*/*","https://kit.com/*/*"],"url":"https://embed.kit.com/oembed","discovery":true}]},{"provider_name":"Kitchenbowl","provider_url":"http://www.kitchenbowl.com","endpoints":[{"schemes":["http://www.kitchenbowl.com/recipe/*"],"url":"http://www.kitchenbowl.com/oembed","discovery":true}]},{"provider_name":"Knacki","provider_url":"http://jdr.knacki.info","endpoints":[{"schemes":["http://jdr.knacki.info/meuh/*","https://jdr.knacki.info/meuh/*"],"url":"https://jdr.knacki.info/oembed"}]},{"provider_name":"LearningApps.org","provider_url":"http://learningapps.org/","endpoints":[{"schemes":["http://learningapps.org/*"],"url":"http://learningapps.org/oembed.php","discovery":true}]},{"provider_name":"Ludus","provider_url":"https://ludus.one","endpoints":[{"schemes":["https://app.ludus.one/*"],"url":"https://app.ludus.one/oembed","discovery":true,"formats":["json"]}]},{"provider_name":"MathEmbed","provider_url":"http://mathembed.com","endpoints":[{"schemes":["http://mathembed.com/latex?inputText=*","http://mathembed.com/latex?inputText=*"],"url":"http://mathembed.com/oembed"}]},{"provider_name":"me.me","provider_url":"https://me.me/","endpoints":[{"schemes":["https://me.me/i/*"],"url":"https://me.me/oembed","discovery":true}]},{"provider_name":"Meetup","provider_url":"http://www.meetup.com","endpoints":[{"schemes":["http://meetup.com/*","https://www.meetup.com/*","https://meetup.com/*","http://meetu.ps/*"],"url":"https://api.meetup.com/oembed","formats":["json"]}]},{"provider_name":"MixCloud","provider_url":"http://mixcloud.com/","endpoints":[{"schemes":["http://www.mixcloud.com/*/*/"],"url":"http://www.mixcloud.com/oembed/"}]},{"provider_name":"Moby Picture","provider_url":"http://www.mobypicture.com","endpoints":[{"schemes":["http://www.mobypicture.com/user/*/view/*","http://moby.to/*"],"url":"http://api.mobypicture.com/oEmbed"}]},{"provider_name":"Modelo","provider_url":"http://modelo.io/","endpoints":[{"schemes":["https://beta.modelo.io/embedded/*"],"url":"https://portal.modelo.io/oembed","discovery":false}]},{"provider_name":"MorphCast","provider_url":"https://www.morphcast.com","endpoints":[{"schemes":["https://m-roll.morphcast.com/mroll/*"],"url":"https://m-roll.morphcast.com/service/oembed","discovery":true,"formats":["json"]}]},{"provider_name":"myBeweeg","provider_url":"https://mybeweeg.com","endpoints":[{"schemes":["https://mybeweeg.com/w/*"],"url":"https://mybeweeg.com/services/oembed"}]},{"provider_name":"nanoo.tv","provider_url":"https://www.nanoo.tv/","endpoints":[{"schemes":["http://*.nanoo.tv/link/*","http://nanoo.tv/link/*","http://*.nanoo.pro/link/*","http://nanoo.pro/link/*","https://*.nanoo.tv/link/*","https://nanoo.tv/link/*","https://*.nanoo.pro/link/*","https://nanoo.pro/link/*"],"url":"https://www.nanoo.tv/services/oembed","discovery":true}]},{"provider_name":"Nasjonalbiblioteket","provider_url":"https://www.nb.no/","endpoints":[{"url":"https://api.nb.no/catalog/v1/oembed","discovery":true}]},{"provider_name":"nfb.ca","provider_url":"http://www.nfb.ca/","endpoints":[{"schemes":["http://*.nfb.ca/film/*"],"url":"http://www.nfb.ca/remote/services/oembed/","discovery":true}]},{"provider_name":"Odds.com.au","provider_url":"https://www.odds.com.au","endpoints":[{"schemes":["https://www.odds.com.au/*","https://odds.com.au/*"],"url":"https://www.odds.com.au/api/oembed/"}]},{"provider_name":"Official FM","provider_url":"http://official.fm","endpoints":[{"schemes":["http://official.fm/tracks/*","http://official.fm/playlists/*"],"url":"http://official.fm/services/oembed.{format}"}]},{"provider_name":"On Aol","provider_url":"http://on.aol.com/","endpoints":[{"schemes":["http://on.aol.com/video/*"],"url":"http://on.aol.com/api"}]},{"provider_name":"Ora TV","provider_url":"http://www.ora.tv/","endpoints":[{"discovery":true,"url":"https://www.ora.tv/oembed/*?format={format}"}]},{"provider_name":"Orbitvu","provider_url":"https://orbitvu.co","endpoints":[{"schemes":["https://orbitvu.co/001/*/ov3601/view","https://orbitvu.co/001/*/ov3601/*/view","https://orbitvu.co/001/*/ov3602/*/view","https://orbitvu.co/001/*/2/orbittour/*/view","https://orbitvu.co/001/*/1/2/orbittour/*/view","http://orbitvu.co/001/*/ov3601/view","http://orbitvu.co/001/*/ov3601/*/view","http://orbitvu.co/001/*/ov3602/*/view","http://orbitvu.co/001/*/2/orbittour/*/view","http://orbitvu.co/001/*/1/2/orbittour/*/view"],"url":"http://orbitvu.co/service/oembed","discovery":true}]},{"provider_name":"Oumy","provider_url":"https://www.oumy.com/","endpoints":[{"schemes":["https://www.oumy.com/v/*"],"url":"https://www.oumy.com/oembed","discovery":true}]},{"provider_name":"Pastery","provider_url":"https://www.pastery.net","endpoints":[{"schemes":["http://pastery.net/*","https://pastery.net/*","http://www.pastery.net/*","https://www.pastery.net/*"],"url":"https://www.pastery.net/oembed","discovery":true}]},{"provider_name":"PingVP","provider_url":"https://www.pingvp.com/","endpoints":[{"url":"https://beta.pingvp.com.kpnis.nl/p/oembed.php","discovery":true}]},{"provider_name":"Pixdor","provider_url":"http://www.pixdor.com/","endpoints":[{"schemes":["https://store.pixdor.com/place-marker-widget/*/show","https://store.pixdor.com/map/*/show"],"url":"https://store.pixdor.com/oembed","formats":["json","xml"],"discovery":true}]},{"provider_name":"Poll Daddy","provider_url":"http://polldaddy.com","endpoints":[{"schemes":["http://*.polldaddy.com/s/*","http://*.polldaddy.com/poll/*","http://*.polldaddy.com/ratings/*"],"url":"http://polldaddy.com/oembed/"}]},{"provider_name":"Port","provider_url":"http://www.sellwithport.com/","endpoints":[{"schemes":["https://app.sellwithport.com/#/buyer/*"],"url":"https://api.sellwithport.com/v1.0/buyer/oembed"}]},{"provider_name":"Portfolium","provider_url":"https://portfolium.com","endpoints":[{"schemes":["https://portfolium.com/entry/*"],"url":"https://api.portfolium.com/oembed"}]},{"provider_name":"Punters","provider_url":"https://www.punters.com.au","endpoints":[{"schemes":["https://www.punters.com.au/*","https://punters.com.au/*"],"url":"https://www.punters.com.au/api/oembed/"}]},{"provider_name":"Quiz.biz","provider_url":"http://www.quiz.biz/","endpoints":[{"schemes":["http://www.quiz.biz/quizz-*.html"],"url":"http://www.quiz.biz/api/oembed","discovery":true}]},{"provider_name":"Quizz.biz","provider_url":"http://www.quizz.biz/","endpoints":[{"schemes":["http://www.quizz.biz/quizz-*.html"],"url":"http://www.quizz.biz/api/oembed","discovery":true}]},{"provider_name":"RapidEngage","provider_url":"https://rapidengage.com","endpoints":[{"schemes":["https://rapidengage.com/s/*"],"url":"https://rapidengage.com/api/oembed"}]},{"provider_name":"Reddit","provider_url":"https://reddit.com/","endpoints":[{"schemes":["https://reddit.com/r/*/comments/*/*","https://www.reddit.com/r/*/comments/*/*"],"url":"https://www.reddit.com/oembed"}]},{"provider_name":"ReleaseWire","provider_url":"http://www.releasewire.com/","endpoints":[{"schemes":["http://rwire.com/*"],"url":"http://publisher.releasewire.com/oembed/","discovery":true}]},{"provider_name":"RepubHub","provider_url":"http://repubhub.icopyright.net/","endpoints":[{"schemes":["http://repubhub.icopyright.net/freePost.act?*"],"url":"http://repubhub.icopyright.net/oembed.act","discovery":true}]},{"provider_name":"ReverbNation","provider_url":"https://www.reverbnation.com/","endpoints":[{"schemes":["https://www.reverbnation.com/*","https://www.reverbnation.com/*/songs/*"],"url":"https://www.reverbnation.com/oembed","discovery":true}]},{"provider_name":"RiffReporter","provider_url":"https://www.riffreporter.de/","endpoints":[{"url":"https://www.riffreporter.de/service/oembed","discovery":true}]},{"provider_name":"Roomshare","provider_url":"http://roomshare.jp","endpoints":[{"schemes":["http://roomshare.jp/post/*","http://roomshare.jp/en/post/*"],"url":"http://roomshare.jp/en/oembed.{format}"}]},{"provider_name":"RoosterTeeth","provider_url":"https://roosterteeth.com","endpoints":[{"schemes":["https://roosterteeth.com/*"],"url":"https://roosterteeth.com/oembed","formats":["json"],"discovery":true}]},{"provider_name":"Rumble","provider_url":"https://rumble.com/","endpoints":[{"url":"https://rumble.com/api/Media/oembed.{format}","discovery":true}]},{"provider_name":"Sapo Videos","provider_url":"http://videos.sapo.pt","endpoints":[{"schemes":["http://videos.sapo.pt/*"],"url":"http://videos.sapo.pt/oembed"}]},{"provider_name":"Screen9","provider_url":"http://www.screen9.com/","endpoints":[{"schemes":["https://console.screen9.com/*","https://*.screen9.tv/*"],"url":"https://api.screen9.com/oembed"}]},{"provider_name":"Screencast.com","provider_url":"http://www.screencast.com/","endpoints":[{"url":"https://api.screencast.com/external/oembed","discovery":true}]},{"provider_name":"Screenr","provider_url":"http://www.screenr.com/","endpoints":[{"schemes":["http://www.screenr.com/*/"],"url":"http://www.screenr.com/api/oembed.{format}"}]},{"provider_name":"ScribbleMaps","provider_url":"https://scribblemaps.com","endpoints":[{"schemes":["http://www.scribblemaps.com/maps/view/*","https://www.scribblemaps.com/maps/view/*","http://scribblemaps.com/maps/view/*","https://scribblemaps.com/maps/view/*"],"url":"https://scribblemaps.com/api/services/oembed.{format}","discovery":true}]},{"provider_name":"Scribd","provider_url":"http://www.scribd.com/","endpoints":[{"schemes":["http://www.scribd.com/doc/*"],"url":"http://www.scribd.com/services/oembed/"}]},{"provider_name":"ShortNote","provider_url":"https://www.shortnote.jp/","endpoints":[{"schemes":["https://www.shortnote.jp/view/notes/*"],"url":"https://www.shortnote.jp/oembed/","discovery":true}]},{"provider_name":"Shoudio","provider_url":"http://shoudio.com","endpoints":[{"schemes":["http://shoudio.com/*","http://shoud.io/*"],"url":"http://shoudio.com/api/oembed"}]},{"provider_name":"Show the Way, actionable location info","provider_url":"https://showtheway.io","endpoints":[{"schemes":["https://showtheway.io/to/*"],"url":"https://showtheway.io/oembed","discovery":true}]},{"provider_name":"Simplecast","provider_url":"https://simplecast.com","endpoints":[{"schemes":["https://simplecast.com/s/*"],"url":"https://simplecast.com/oembed","formats":["json"]}]},{"provider_name":"Sizzle","provider_url":"https://onsizzle.com/","endpoints":[{"schemes":["https://onsizzle.com/i/*"],"url":"https://onsizzle.com/oembed","discovery":true}]},{"provider_name":"Sketchfab","provider_url":"http://sketchfab.com","endpoints":[{"schemes":["http://sketchfab.com/models/*","https://sketchfab.com/models/*","https://sketchfab.com/*/folders/*"],"url":"http://sketchfab.com/oembed","formats":["json"]}]},{"provider_name":"SlideShare","provider_url":"http://www.slideshare.net/","endpoints":[{"schemes":["http://www.slideshare.net/*/*","http://fr.slideshare.net/*/*","http://de.slideshare.net/*/*","http://es.slideshare.net/*/*","http://pt.slideshare.net/*/*"],"url":"http://www.slideshare.net/api/oembed/2","discovery":true}]},{"provider_name":"SmugMug","provider_url":"http://www.smugmug.com/","endpoints":[{"schemes":["http://*.smugmug.com/*"],"url":"http://api.smugmug.com/services/oembed/","discovery":true}]},{"provider_name":"SocialExplorer","provider_url":"https://www.socialexplorer.com/","endpoints":[{"schemes":["https://www.socialexplorer.com/*/explore","https://www.socialexplorer.com/*/view","https://www.socialexplorer.com/*/edit","https://www.socialexplorer.com/*/embed"],"url":"https://www.socialexplorer.com/services/oembed/","discovery":true}]},{"provider_name":"Songlink","provider_url":"https://song.link","endpoints":[{"schemes":["https://song.link/*"],"url":"https://song.link/oembed","formats":["json"],"discovery":true}]},{"provider_name":"SoundCloud","provider_url":"http://soundcloud.com/","endpoints":[{"schemes":["http://soundcloud.com/*","https://soundcloud.com/*"],"url":"https://soundcloud.com/oembed"}]},{"provider_name":"Soundsgood","provider_url":"https://soundsgood.co","endpoints":[{"schemes":["https://play.soundsgood.co/playlist/*","https://soundsgood.co/playlist/*"],"url":"https://play.soundsgood.co/oembed","discovery":true,"formats":["json","xml"]}]},{"provider_name":"SpeakerDeck","provider_url":"https://speakerdeck.com","endpoints":[{"schemes":["http://speakerdeck.com/*/*","https://speakerdeck.com/*/*"],"url":"https://speakerdeck.com/oembed.json","discovery":true,"formats":["json"]}]},{"provider_name":"Spotful","provider_url":"https://bespotful.com","endpoints":[{"schemes":["http://play.bespotful.com/*"],"url":"https://api.bespotful.com/oembed","discovery":true}]},{"provider_name":"Spotify","provider_url":"https://spotify.com/","endpoints":[{"schemes":["https://*.spotify.com/*","spotify:*"],"url":"https://embed.spotify.com/oembed/"}]},{"provider_name":"Spreaker","provider_url":"https://www.spreaker.com/","endpoints":[{"schemes":["http://*.spreaker.com/*","https://*.spreaker.com/*"],"url":"https://api.spreaker.com/oembed","discovery":true}]},{"provider_name":"Streamable","provider_url":"https://streamable.com/","endpoints":[{"schemes":["http://streamable.com/*","https://streamable.com/*"],"url":"https://api.streamable.com/oembed.json","discovery":true}]},{"provider_name":"StreamOneCloud","provider_url":"https://www.streamone.nl","endpoints":[{"schemes":["https://content.streamonecloud.net/embed/*"],"url":"https://content.streamonecloud.net/oembed","discovery":true}]},{"provider_name":"Sutori","provider_url":"https://www.sutori.com/","endpoints":[{"schemes":["https://www.sutori.com/story/*"],"url":"https://www.sutori.com/api/oembed","discovery":true,"formats":["json"]}]},{"provider_name":"Sway","provider_url":"https://www.sway.com","endpoints":[{"schemes":["https://sway.com/*","https://www.sway.com/*"],"url":"https://sway.com/api/v1.0/oembed","discovery":true}]},{"provider_name":"Ted","provider_url":"http://ted.com","endpoints":[{"schemes":["http://ted.com/talks/*"],"url":"http://www.ted.com/talks/oembed.{format}"}]},{"provider_name":"The New York Times","provider_url":"https://www.nytimes.com","endpoints":[{"schemes":["https://www.nytimes.com/svc/oembed","https://nytimes.com/*","https://*.nytimes.com/*"],"url":"https://www.nytimes.com/svc/oembed/json/","discovery":true}]},{"provider_name":"They Said So","provider_url":"https://theysaidso.com/","endpoints":[{"schemes":["https://theysaidso.com/image/*"],"url":"https://theysaidso.com/extensions/oembed/","discovery":true}]},{"provider_name":"TickCounter","provider_url":"https://www.tickcounter.com","endpoints":[{"schemes":["http://www.tickcounter.com/countdown/*","http://www.tickcounter.com/countup/*","http://www.tickcounter.com/ticker/*","http://www.tickcounter.com/worldclock/*","https://www.tickcounter.com/countdown/*","https://www.tickcounter.com/countup/*","https://www.tickcounter.com/ticker/*","https://www.tickcounter.com/worldclock/*"],"url":"https://www.tickcounter.com/oembed","discovery":true}]},{"provider_name":"Toornament","provider_url":"https://www.toornament.com/","endpoints":[{"schemes":["https://www.toornament.com/tournaments/*/information","https://www.toornament.com/tournaments/*/registration/","https://www.toornament.com/tournaments/*/matches/schedule","https://www.toornament.com/tournaments/*/stages/*/"],"url":"https://widget.toornament.com/oembed","discovery":true,"formats":["json","xml"]}]},{"provider_name":"Topy","provider_url":"http://www.topy.se/","endpoints":[{"schemes":["http://www.topy.se/image/*"],"url":"http://www.topy.se/oembed/","discovery":true}]},{"provider_name":"Twitch","provider_url":"https://www.twitch.tv","endpoints":[{"schemes":["http://clips.twitch.tv/*","https://clips.twitch.tv/*","http://www.twitch.tv/*","https://www.twitch.tv/*","http://twitch.tv/*","https://twitch.tv/*"],"url":"https://api.twitch.tv/v4/oembed","formats":["json"]}]},{"provider_name":"Twitter","provider_url":"http://www.twitter.com/","endpoints":[{"schemes":["https://twitter.com/*/status/*","https://*.twitter.com/*/status/*"],"url":"https://publish.twitter.com/oembed"}]},{"provider_name":"Ubideo","provider_url":"https://player.ubideo.com/","endpoints":[{"schemes":["https://player.ubideo.com/*"],"url":"https://player.ubideo.com/api/oembed.json","formats":["json"]}]},{"provider_name":"UOL","provider_url":"https://mais.uol.com.br/","endpoints":[{"schemes":["https://*.uol.com.br/view/*","https://*.uol.com.br/video/*"],"url":"https://mais.uol.com.br/apiuol/v3/oembed/view","discovery":true}]},{"provider_name":"Ustream","provider_url":"http://www.ustream.tv","endpoints":[{"schemes":["http://*.ustream.tv/*","http://*.ustream.com/*"],"url":"http://www.ustream.tv/oembed","formats":["json"]}]},{"provider_name":"Utposts","provider_url":"https://www.utposts.com/","endpoints":[{"schemes":["https://www.utposts.com/products/*","http://www.utposts.com/products/*","https://utposts.com/products/*","http://utposts.com/products/*"],"url":"https://www.utposts.com/api/oembed","formats":["json"]}]},{"provider_name":"Uttles","provider_url":"http://uttles.com","endpoints":[{"schemes":["http://uttles.com/uttle/*"],"url":"http://uttles.com/api/reply/oembed","discovery":true}]},{"provider_name":"VeeR VR","provider_url":"http://veer.tv/","endpoints":[{"schemes":["http://veer.tv/videos/*"],"url":"https://api.veer.tv/oembed","discovery":true},{"schemes":["http://veervr.tv/videos/*"],"url":"https://api.veervr.tv/oembed","discovery":true}]},{"provider_name":"Verse","provider_url":"http://verse.com/","endpoints":[{"url":"http://verse.com/services/oembed/"}]},{"provider_name":"VEVO","provider_url":"http://www.vevo.com/","endpoints":[{"schemes":["http://www.vevo.com/*","https://www.vevo.com/*"],"url":"https://www.vevo.com/oembed","discovery":false}]},{"provider_name":"VideoJug","provider_url":"http://www.videojug.com","endpoints":[{"schemes":["http://www.videojug.com/film/*","http://www.videojug.com/interview/*"],"url":"http://www.videojug.com/oembed.{format}"}]},{"provider_name":"Vidlit","provider_url":"https://vidl.it/","endpoints":[{"schemes":["https://vidl.it/*"],"url":"https://api.vidl.it/oembed","discovery":true}]},{"provider_name":"Vidmizer","provider_url":"https://www.vidmizer.com/","endpoints":[{"schemes":["https://players.vidmizer.com/*"],"url":"https://app-v2.vidmizer.com/api/oembed","discovery":true}]},{"provider_name":"Vimeo","provider_url":"https://vimeo.com/","endpoints":[{"schemes":["https://vimeo.com/*","https://vimeo.com/album/*/video/*","https://vimeo.com/channels/*/*","https://vimeo.com/groups/*/videos/*","https://vimeo.com/ondemand/*/*","https://player.vimeo.com/video/*"],"url":"https://vimeo.com/api/oembed.{format}","discovery":true}]},{"provider_name":"Vlipsy","provider_url":"https://vlipsy.com/","endpoints":[{"schemes":["https://vlipsy.com/*"],"url":"https://vlipsy.com/oembed","discovery":true}]},{"provider_name":"wecandeo","provider_url":"http://www.wecandeo.com/","endpoints":[{"url":"http://play.wecandeo.com/oembed","discovery":true}]},{"provider_name":"Wiredrive","provider_url":"https://www.wiredrive.com/","endpoints":[{"schemes":["https://*.wiredrive.com/*"],"url":"http://*.wiredrive.com/present-oembed/","formats":["json"],"discovery":true}]},{"provider_name":"wizer.me","provider_url":"http://www.wizer.me/","endpoints":[{"schemes":["http://*.wizer.me/learn/*","https://*.wizer.me/learn/*","http://*.wizer.me/preview/*","https://*.wizer.me/preview/*"],"url":"http://app.wizer.me/api/oembed.{format}","discovery":true}]},{"provider_name":"Wootled","provider_url":"http://www.wootled.com/","endpoints":[{"url":"http://www.wootled.com/oembed"}]},{"provider_name":"WordPress.com","provider_url":"http://wordpress.com/","endpoints":[{"url":"http://public-api.wordpress.com/oembed/","discovery":true}]},{"provider_name":"Yes, I Know IT!","provider_url":"http://yesik.it","endpoints":[{"schemes":["http://yesik.it/*","http://www.yesik.it/*"],"url":"http://yesik.it/s/oembed","formats":["json"],"discovery":true}]},{"provider_name":"YFrog","provider_url":"http://yfrog.com/","endpoints":[{"schemes":["http://*.yfrog.com/*","http://yfrog.us/*"],"url":"http://www.yfrog.com/api/oembed","formats":["json"]}]},{"provider_name":"YouTube","provider_url":"https://www.youtube.com/","endpoints":[{"url":"https://www.youtube.com/oembed","discovery":true}]},{"provider_name":"ZnipeTV","provider_url":"https://www.znipe.tv/","endpoints":[{"schemes":["https://*.znipe.tv/*"],"url":"https://api.znipe.tv/v3/oembed/","discovery":true}]},{"provider_name":"ZProvider","provider_url":"https://reports.zoho.com/","endpoints":[{"schemes":["https://reports.zoho.com/ZDBDataSheetView.cc?OBJID=1432535000000003002&STANDALONE=true&INTERVAL=120&DATATYPESYMBOL=false&REMTOOLBAR=false&SEARCHBOX=true&INCLUDETITLE=true&INCLUDEDESC=true&SHOWHIDEOPT=true"],"url":"http://api.provider.com/oembed.json","discovery":true}]}];

/***/ }),

/***/ "./node_modules/oembed-providers/providers.json":
/*!******************************************************!*\
  !*** ./node_modules/oembed-providers/providers.json ***!
  \******************************************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, default */
/***/ (function(module) {

module.exports = [{"provider_name":"23HQ","provider_url":"http://www.23hq.com","endpoints":[{"schemes":["http://www.23hq.com/*/photo/*"],"url":"http://www.23hq.com/23/oembed"}]},{"provider_name":"Alpha App Net","provider_url":"https://alpha.app.net/browse/posts/","endpoints":[{"schemes":["https://alpha.app.net/*/post/*","https://photos.app.net/*/*"],"url":"https://alpha-api.app.net/oembed","formats":["json"]}]},{"provider_name":"amCharts Live Editor","provider_url":"http://live.amcharts.com/","endpoints":[{"schemes":["http://live.amcharts.com/*"],"url":"http://live.amcharts.com/oembed"}]},{"provider_name":"Animatron","provider_url":"https://www.animatron.com/","endpoints":[{"schemes":["https://www.animatron.com/project/*","https://animatron.com/project/*"],"url":"https://animatron.com/oembed/json","discovery":true}]},{"provider_name":"Animoto","provider_url":"http://animoto.com/","endpoints":[{"schemes":["http://animoto.com/play/*"],"url":"http://animoto.com/oembeds/create"}]},{"provider_name":"AudioSnaps","provider_url":"http://audiosnaps.com","endpoints":[{"schemes":["http://audiosnaps.com/k/*"],"url":"http://audiosnaps.com/service/oembed","discovery":true}]},{"provider_name":"Blackfire.io","provider_url":"https://blackfire.io","endpoints":[{"schemes":["https://blackfire.io/profiles/*/graph","https://blackfire.io/profiles/compare/*/graph"],"url":"https://blackfire.io/oembed","discovery":true}]},{"provider_name":"Box Office Buz","provider_url":"http://boxofficebuz.com","endpoints":[{"url":"http://boxofficebuz.com/oembed","discovery":true}]},{"provider_name":"Cacoo","provider_url":"https://cacoo.com","endpoints":[{"schemes":["https://cacoo.com/diagrams/*"],"url":"http://cacoo.com/oembed.{format}"}]},{"provider_name":"CatBoat","provider_url":"http://img.catbo.at/","endpoints":[{"schemes":["http://img.catbo.at/*"],"url":"http://img.catbo.at/oembed.json","formats":["json"]}]},{"provider_name":"ChartBlocks","provider_url":"http://www.chartblocks.com/","endpoints":[{"schemes":["http://public.chartblocks.com/c/*"],"url":"http://embed.chartblocks.com/1.0/oembed"}]},{"provider_name":"chirbit.com","provider_url":"http://www.chirbit.com/","endpoints":[{"schemes":["http://chirb.it/*"],"url":"http://chirb.it/oembed.{format}","discovery":true}]},{"provider_name":"CircuitLab","provider_url":"https://www.circuitlab.com/","endpoints":[{"schemes":["https://www.circuitlab.com/circuit/*"],"url":"https://www.circuitlab.com/circuit/oembed/","discovery":true}]},{"provider_name":"Clipland","provider_url":"http://www.clipland.com/","endpoints":[{"schemes":["http://www.clipland.com/v/*","https://www.clipland.com/v/*"],"url":"https://www.clipland.com/api/oembed","discovery":true}]},{"provider_name":"Clyp","provider_url":"http://clyp.it/","endpoints":[{"schemes":["http://clyp.it/*","http://clyp.it/playlist/*"],"url":"http://api.clyp.it/oembed/","discovery":true}]},{"provider_name":"Codepen","provider_url":"https://codepen.io","endpoints":[{"schemes":["http://codepen.io/*","https://codepen.io/*"],"url":"http://codepen.io/api/oembed"}]},{"provider_name":"Codepoints","provider_url":"https://codepoints.net","endpoints":[{"schemes":["http://codepoints.net/*","https://codepoints.net/*","http://www.codepoints.net/*","https://www.codepoints.net/*"],"url":"https://codepoints.net/api/v1/oembed","discovery":true}]},{"provider_name":"CollegeHumor","provider_url":"http://www.collegehumor.com/","endpoints":[{"schemes":["http://www.collegehumor.com/video/*"],"url":"http://www.collegehumor.com/oembed.{format}","discovery":true}]},{"provider_name":"Coub","provider_url":"http://coub.com/","endpoints":[{"schemes":["http://coub.com/view/*","http://coub.com/embed/*"],"url":"http://coub.com/api/oembed.{format}"}]},{"provider_name":"Crowd Ranking","provider_url":"http://crowdranking.com","endpoints":[{"schemes":["http://crowdranking.com/*/*"],"url":"http://crowdranking.com/api/oembed.{format}"}]},{"provider_name":"Daily Mile","provider_url":"http://www.dailymile.com","endpoints":[{"schemes":["http://www.dailymile.com/people/*/entries/*"],"url":"http://api.dailymile.com/oembed?format=json","formats":["json"]}]},{"provider_name":"Dailymotion","provider_url":"http://www.dailymotion.com","endpoints":[{"schemes":["http://www.dailymotion.com/video/*"],"url":"http://www.dailymotion.com/services/oembed","discovery":true}]},{"provider_name":"Deviantart.com","provider_url":"http://www.deviantart.com","endpoints":[{"schemes":["http://*.deviantart.com/art/*","http://*.deviantart.com/*#/d*","http://fav.me/*","http://sta.sh/*"],"url":"http://backend.deviantart.com/oembed"}]},{"provider_name":"Didacte","provider_url":"https://www.didacte.com/","endpoints":[{"schemes":["https://*.didacte.com/a/course/*"],"url":"https://*.didacte.com/cards/oembed'","discovery":true,"formats":["json"]}]},{"provider_name":"Dipity","provider_url":"http://www.dipity.com","endpoints":[{"schemes":["http://www.dipity.com/*/*/"],"url":"http://www.dipity.com/oembed/timeline/"}]},{"provider_name":"Docs","provider_url":"https://www.docs.com","endpoints":[{"schemes":["https://docs.com/*","https://www.docs.com/*"],"url":"https://docs.com/api/oembed","discovery":true}]},{"provider_name":"Dotsub","provider_url":"http://dotsub.com/","endpoints":[{"schemes":["http://dotsub.com/view/*"],"url":"http://dotsub.com/services/oembed"}]},{"provider_name":"edocr","provider_url":"http://www.edocr.com","endpoints":[{"schemes":["http://edocr.com/docs/*"],"url":"http://edocr.com/api/oembed"}]},{"provider_name":"eduMedia","provider_url":"https://www.edumedia-sciences.com/","endpoints":[{"url":"https://www.edumedia-sciences.com/oembed.json","discovery":true},{"url":"https://www.edumedia-sciences.com/oembed.xml","discovery":true}]},{"provider_name":"EgliseInfo","provider_url":"http://egliseinfo.catholique.fr/","endpoints":[{"schemes":["http://egliseinfo.catholique.fr/*"],"url":"http://egliseinfo.catholique.fr/api/oembed","discovery":true}]},{"provider_name":"Embed Articles","provider_url":"http://embedarticles.com/","endpoints":[{"schemes":["http://embedarticles.com/*"],"url":"http://embedarticles.com/oembed/"}]},{"provider_name":"Embedly","provider_url":"http://api.embed.ly/","endpoints":[{"url":"http://api.embed.ly/1/oembed"}]},{"provider_name":"Eyrie","provider_url":"https://eyrie.io/","endpoints":[{"schemes":["https://eyrie.io/board/*","https://eyrie.io/sparkfun/*"],"url":"https://eyrie.io/v1/oembed","discovery":true}]},{"provider_name":"Facebook (Video)","provider_url":"https://www.facebook.com/","endpoints":[{"schemes":["https://www.facebook.com/*/videos/*","https://www.facebook.com/video.php"],"url":"https://www.facebook.com/plugins/video/oembed.json","discovery":true}]},{"provider_name":"Flat","provider_url":"https://flat.io","endpoints":[{"schemes":["https://flat.io/score/*","https://*.flat.io/score/*"],"url":"https://flat.io/services/oembed","discovery":true}]},{"provider_name":"Flickr","provider_url":"http://www.flickr.com/","endpoints":[{"schemes":["http://*.flickr.com/photos/*","http://flic.kr/p/*"],"url":"http://www.flickr.com/services/oembed/","discovery":true}]},{"provider_name":"FOX SPORTS Australia","provider_url":"http://www.foxsports.com.au","endpoints":[{"schemes":["http://fiso.foxsports.com.au/isomorphic-widget/*","https://fiso.foxsports.com.au/isomorphic-widget/*"],"url":"https://fiso.foxsports.com.au/oembed"}]},{"provider_name":"FrameBuzz","provider_url":"https://framebuzz.com/","endpoints":[{"schemes":["http://framebuzz.com/v/*","https://framebuzz.com/v/*"],"url":"https://framebuzz.com/oembed/","discovery":true}]},{"provider_name":"FunnyOrDie","provider_url":"http://www.funnyordie.com/","endpoints":[{"schemes":["http://www.funnyordie.com/videos/*"],"url":"http://www.funnyordie.com/oembed.{format}"}]},{"provider_name":"Geograph Britain and Ireland","provider_url":"https://www.geograph.org.uk/","endpoints":[{"schemes":["http://*.geograph.org.uk/*","http://*.geograph.co.uk/*","http://*.geograph.ie/*","http://*.wikimedia.org/*_geograph.org.uk_*"],"url":"http://api.geograph.org.uk/api/oembed"}]},{"provider_name":"Geograph Channel Islands","provider_url":"http://channel-islands.geograph.org/","endpoints":[{"schemes":["http://*.geograph.org.gg/*","http://*.geograph.org.je/*","http://channel-islands.geograph.org/*","http://channel-islands.geographs.org/*","http://*.channel.geographs.org/*"],"url":"http://www.geograph.org.gg/api/oembed"}]},{"provider_name":"Geograph Germany","provider_url":"http://geo-en.hlipp.de/","endpoints":[{"schemes":["http://geo-en.hlipp.de/*","http://geo.hlipp.de/*","http://germany.geograph.org/*"],"url":"http://geo.hlipp.de/restapi.php/api/oembed"}]},{"provider_name":"Getty Images","provider_url":"http://www.gettyimages.com/","endpoints":[{"schemes":["http://gty.im/*"],"url":"http://embed.gettyimages.com/oembed","formats":["json"]}]},{"provider_name":"Gfycat","provider_url":"https://gfycat.com/","endpoints":[{"schemes":["http://gfycat.com/*","http://www.gfycat.com/*","https://gfycat.com/*","https://www.gfycat.com/*"],"url":"https://api.gfycat.com/v1/oembed","discovery":true}]},{"provider_name":"GIPHY","provider_url":"https://giphy.com","endpoints":[{"schemes":["http://giphy.com/*","https://giphy.com/*"],"url":"http://giphy.com/services/oembed","discovery":true}]},{"provider_name":"Gyazo","provider_url":"https://gyazo.com","endpoints":[{"schemes":["https://gyazo.com/*"],"url":"https://api.gyazo.com/api/oembed","formats":["json"]}]},{"provider_name":"HuffDuffer","provider_url":"http://huffduffer.com","endpoints":[{"schemes":["http://huffduffer.com/*/*"],"url":"http://huffduffer.com/oembed"}]},{"provider_name":"Hulu","provider_url":"http://www.hulu.com/","endpoints":[{"schemes":["http://www.hulu.com/watch/*"],"url":"http://www.hulu.com/api/oembed.{format}"}]},{"provider_name":"iFixit","provider_url":"http://www.iFixit.com","endpoints":[{"schemes":["http://www.ifixit.com/Guide/View/*"],"url":"http://www.ifixit.com/Embed"}]},{"provider_name":"IFTTT","provider_url":"http://www.ifttt.com/","endpoints":[{"schemes":["http://ifttt.com/recipes/*"],"url":"http://www.ifttt.com/oembed/","discovery":true}]},{"provider_name":"Indaco","provider_url":"https://player.indacolive.com/","endpoints":[{"schemes":["https://player.indacolive.com/player/jwp/clients/*"],"url":"https://player.indacolive.com/services/oembed","formats":["json"]}]},{"provider_name":"Infogram","provider_url":"https://infogr.am/","endpoints":[{"schemes":["https://infogr.am/*"],"url":"https://infogr.am/oembed"}]},{"provider_name":"Inoreader","provider_url":"https://www.inoreader.com","endpoints":[{"schemes":["https://www.inoreader.com/oembed/"],"url":"https://www.inoreader.com/oembed/api/","discovery":true}]},{"provider_name":"inphood","provider_url":"http://inphood.com/","endpoints":[{"schemes":["http://*.inphood.com/*"],"url":"http://api.inphood.com/oembed","formats":["json"]}]},{"provider_name":"Instagram","provider_url":"https://instagram.com","endpoints":[{"schemes":["http://instagram.com/p/*","http://instagr.am/p/*","https://instagram.com/p/*","https://instagr.am/p/*"],"url":"http://api.instagram.com/oembed","formats":["json"]}]},{"provider_name":"iSnare Articles","provider_url":"https://www.isnare.com/","endpoints":[{"schemes":["https://www.isnare.com/*"],"url":"https://www.isnare.com/oembed/"}]},{"provider_name":"Kickstarter","provider_url":"http://www.kickstarter.com","endpoints":[{"schemes":["http://www.kickstarter.com/projects/*"],"url":"http://www.kickstarter.com/services/oembed"}]},{"provider_name":"Kidoju","provider_url":"https://www.kidoju.com/","endpoints":[{"schemes":["https://www.kidoju.com/en/x/*/*","https://www.kidoju.com/fr/x/*/*"],"url":"https://www.kidoju.com/api/oembed"}]},{"provider_name":"Kit","provider_url":"https://kit.com/","endpoints":[{"schemes":["http://kit.com/*/*","https://kit.com/*/*"],"url":"https://embed.kit.com/oembed","discovery":true}]},{"provider_name":"Kitchenbowl","provider_url":"http://www.kitchenbowl.com","endpoints":[{"schemes":["http://www.kitchenbowl.com/recipe/*"],"url":"http://www.kitchenbowl.com/oembed","discovery":true}]},{"provider_name":"Knacki","provider_url":"http://jdr.knacki.info","endpoints":[{"schemes":["http://jdr.knacki.info/meuh/*","https://jdr.knacki.info/meuh/*"],"url":"https://jdr.knacki.info/oembed"}]},{"provider_name":"LearningApps.org","provider_url":"http://learningapps.org/","endpoints":[{"schemes":["http://learningapps.org/*"],"url":"http://learningapps.org/oembed.php","discovery":true}]},{"provider_name":"MathEmbed","provider_url":"http://mathembed.com","endpoints":[{"schemes":["http://mathembed.com/latex?inputText=*","http://mathembed.com/latex?inputText=*"],"url":"http://mathembed.com/oembed"}]},{"provider_name":"Meetup","provider_url":"http://www.meetup.com","endpoints":[{"schemes":["http://meetup.com/*","http://meetu.ps/*"],"url":"https://api.meetup.com/oembed","formats":["json"]}]},{"provider_name":"MixCloud","provider_url":"http://mixcloud.com/","endpoints":[{"schemes":["http://www.mixcloud.com/*/*/"],"url":"http://www.mixcloud.com/oembed/"}]},{"provider_name":"Moby Picture","provider_url":"http://www.mobypicture.com","endpoints":[{"schemes":["http://www.mobypicture.com/user/*/view/*","http://moby.to/*"],"url":"http://api.mobypicture.com/oEmbed"}]},{"provider_name":"Modelo","provider_url":"http://modelo.io/","endpoints":[{"schemes":["https://beta.modelo.io/embedded/*"],"url":"https://portal.modelo.io/oembed","discovery":false}]},{"provider_name":"myBeweeg","provider_url":"https://mybeweeg.com","endpoints":[{"schemes":["https://mybeweeg.com/w/*"],"url":"https://mybeweeg.com/services/oembed"}]},{"provider_name":"nfb.ca","provider_url":"http://www.nfb.ca/","endpoints":[{"schemes":["http://*.nfb.ca/film/*"],"url":"http://www.nfb.ca/remote/services/oembed/","discovery":true}]},{"provider_name":"Odds.com.au","provider_url":"https://www.odds.com.au","endpoints":[{"schemes":["https://www.odds.com.au/*","https://odds.com.au/*"],"url":"https://www.odds.com.au/api/oembed/"}]},{"provider_name":"Office Mix","provider_url":"http://mix.office.com/","endpoints":[{"schemes":["https://mix.office.com/watch/*","https://mix.office.com/embed/*"],"url":"https://mix.office.com/oembed","discovery":true}]},{"provider_name":"Official FM","provider_url":"http://official.fm","endpoints":[{"schemes":["http://official.fm/tracks/*","http://official.fm/playlists/*"],"url":"http://official.fm/services/oembed.{format}"}]},{"provider_name":"On Aol","provider_url":"http://on.aol.com/","endpoints":[{"schemes":["http://on.aol.com/video/*"],"url":"http://on.aol.com/api"}]},{"provider_name":"Ora TV","provider_url":"http://www.ora.tv/","endpoints":[{"discovery":true,"url":"https://www.ora.tv/oembed/*?format={format}"}]},{"provider_name":"Orbitvu","provider_url":"https://orbitvu.co","endpoints":[{"schemes":["https://orbitvu.co/001/*/ov3601/view","https://orbitvu.co/001/*/ov3601/*/view","https://orbitvu.co/001/*/ov3602/*/view","https://orbitvu.co/001/*/2/orbittour/*/view","https://orbitvu.co/001/*/1/2/orbittour/*/view","http://orbitvu.co/001/*/ov3601/view","http://orbitvu.co/001/*/ov3601/*/view","http://orbitvu.co/001/*/ov3602/*/view","http://orbitvu.co/001/*/2/orbittour/*/view","http://orbitvu.co/001/*/1/2/orbittour/*/view"],"url":"http://orbitvu.co/service/oembed","discovery":true}]},{"provider_name":"Oumy","provider_url":"https://www.oumy.com/","endpoints":[{"schemes":["https://www.oumy.com/v/*"],"url":"https://www.oumy.com/oembed","discovery":true}]},{"provider_name":"Pastery","provider_url":"https://www.pastery.net","endpoints":[{"schemes":["http://pastery.net/*","https://pastery.net/*","http://www.pastery.net/*","https://www.pastery.net/*"],"url":"https://www.pastery.net/oembed","discovery":true}]},{"provider_name":"Pixdor","provider_url":"http://www.pixdor.com/","endpoints":[{"schemes":["https://store.pixdor.com/place-marker-widget/*/show","https://store.pixdor.com/map/*/show"],"url":"https://store.pixdor.com/oembed","formats":["json","xml"],"discovery":true}]},{"provider_name":"Poll Daddy","provider_url":"http://polldaddy.com","endpoints":[{"schemes":["http://*.polldaddy.com/s/*","http://*.polldaddy.com/poll/*","http://*.polldaddy.com/ratings/*"],"url":"http://polldaddy.com/oembed/"}]},{"provider_name":"Port","provider_url":"http://www.sellwithport.com/","endpoints":[{"schemes":["https://app.sellwithport.com/#/buyer/*"],"url":"https://api.sellwithport.com/v1.0/buyer/oembed"}]},{"provider_name":"Portfolium","provider_url":"https://portfolium.com","endpoints":[{"schemes":["https://portfolium.com/entry/*"],"url":"https://api.portfolium.com/oembed"}]},{"provider_name":"Punters","provider_url":"https://www.punters.com.au","endpoints":[{"schemes":["https://www.punters.com.au/*","https://punters.com.au/*"],"url":"https://www.punters.com.au/api/oembed/"}]},{"provider_name":"Quiz.biz","provider_url":"http://www.quiz.biz/","endpoints":[{"schemes":["http://www.quiz.biz/quizz-*.html"],"url":"http://www.quiz.biz/api/oembed","discovery":true}]},{"provider_name":"Quizz.biz","provider_url":"http://www.quizz.biz/","endpoints":[{"schemes":["http://www.quizz.biz/quizz-*.html"],"url":"http://www.quizz.biz/api/oembed","discovery":true}]},{"provider_name":"RapidEngage","provider_url":"https://rapidengage.com","endpoints":[{"schemes":["https://rapidengage.com/s/*"],"url":"https://rapidengage.com/api/oembed"}]},{"provider_name":"Reddit","provider_url":"https://reddit.com/","endpoints":[{"schemes":["https://reddit.com/r/*/comments/*/*"],"url":"https://www.reddit.com/oembed"}]},{"provider_name":"ReleaseWire","provider_url":"http://www.releasewire.com/","endpoints":[{"schemes":["http://rwire.com/*"],"url":"http://publisher.releasewire.com/oembed/","discovery":true}]},{"provider_name":"RepubHub","provider_url":"http://repubhub.icopyright.net/","endpoints":[{"schemes":["http://repubhub.icopyright.net/freePost.act?*"],"url":"http://repubhub.icopyright.net/oembed.act","discovery":true}]},{"provider_name":"ReverbNation","provider_url":"https://www.reverbnation.com/","endpoints":[{"schemes":["https://www.reverbnation.com/*","https://www.reverbnation.com/*/songs/*"],"url":"https://www.reverbnation.com/oembed","discovery":true}]},{"provider_name":"Roomshare","provider_url":"http://roomshare.jp","endpoints":[{"schemes":["http://roomshare.jp/post/*","http://roomshare.jp/en/post/*"],"url":"http://roomshare.jp/en/oembed.{format}"}]},{"provider_name":"Rumble","provider_url":"https://rumble.com/","endpoints":[{"url":"https://rumble.com/api/Media/oembed.{format}","discovery":true}]},{"provider_name":"Sapo Videos","provider_url":"http://videos.sapo.pt","endpoints":[{"schemes":["http://videos.sapo.pt/*"],"url":"http://videos.sapo.pt/oembed"}]},{"provider_name":"Screen9","provider_url":"http://www.screen9.com/","endpoints":[{"schemes":["https://console.screen9.com/*","https://*.screen9.tv/*"],"url":"https://api.screen9.com/oembed"}]},{"provider_name":"Screencast.com","provider_url":"http://www.screencast.com/","endpoints":[{"url":"https://api.screencast.com/external/oembed","discovery":true}]},{"provider_name":"Screenr","provider_url":"http://www.screenr.com/","endpoints":[{"schemes":["http://www.screenr.com/*/"],"url":"http://www.screenr.com/api/oembed.{format}"}]},{"provider_name":"ScribbleMaps","provider_url":"https://scribblemaps.com","endpoints":[{"schemes":["http://www.scribblemaps.com/maps/view/*","https://www.scribblemaps.com/maps/view/*","http://scribblemaps.com/maps/view/*","https://scribblemaps.com/maps/view/*"],"url":"https://scribblemaps.com/api/services/oembed.{format}","discovery":true}]},{"provider_name":"Scribd","provider_url":"http://www.scribd.com/","endpoints":[{"schemes":["http://www.scribd.com/doc/*"],"url":"http://www.scribd.com/services/oembed/"}]},{"provider_name":"ShortNote","provider_url":"https://www.shortnote.jp/","endpoints":[{"schemes":["https://www.shortnote.jp/view/notes/*"],"url":"https://www.shortnote.jp/oembed/","discovery":true}]},{"provider_name":"Shoudio","provider_url":"http://shoudio.com","endpoints":[{"schemes":["http://shoudio.com/*","http://shoud.io/*"],"url":"http://shoudio.com/api/oembed"}]},{"provider_name":"Show the Way, actionable location info","provider_url":"https://showtheway.io","endpoints":[{"schemes":["https://showtheway.io/to/*"],"url":"https://showtheway.io/oembed","discovery":true}]},{"provider_name":"Silk","provider_url":"http://www.silk.co/","endpoints":[{"schemes":["http://*.silk.co/explore/*","https://*.silk.co/explore/*","http://*.silk.co/s/embed/*","https://*.silk.co/s/embed/*"],"url":"http://www.silk.co/oembed/","discovery":true}]},{"provider_name":"Sizzle","provider_url":"https://onsizzle.com/","endpoints":[{"schemes":["https://onsizzle.com/i/*"],"url":"https://onsizzle.com/oembed","discovery":true}]},{"provider_name":"Sketchfab","provider_url":"http://sketchfab.com","endpoints":[{"schemes":["http://sketchfab.com/models/*","https://sketchfab.com/models/*","https://sketchfab.com/*/folders/*"],"url":"http://sketchfab.com/oembed","formats":["json"]}]},{"provider_name":"SlideShare","provider_url":"http://www.slideshare.net/","endpoints":[{"schemes":["http://www.slideshare.net/*/*","http://fr.slideshare.net/*/*","http://de.slideshare.net/*/*","http://es.slideshare.net/*/*","http://pt.slideshare.net/*/*"],"url":"http://www.slideshare.net/api/oembed/2","discovery":true}]},{"provider_name":"SmugMug","provider_url":"http://www.smugmug.com/","endpoints":[{"schemes":["http://*.smugmug.com/*"],"url":"http://api.smugmug.com/services/oembed/","discovery":true}]},{"provider_name":"SoundCloud","provider_url":"http://soundcloud.com/","endpoints":[{"schemes":["http://soundcloud.com/*"],"url":"https://soundcloud.com/oembed"}]},{"provider_name":"Soundsgood","provider_url":"https://soundsgood.co","endpoints":[{"schemes":["https://play.soundsgood.co/playlist/*","https://soundsgood.co/playlist/*"],"url":"https://play.soundsgood.co/oembed","discovery":true,"formats":["json","xml"]}]},{"provider_name":"SpeakerDeck","provider_url":"https://speakerdeck.com","endpoints":[{"schemes":["http://speakerdeck.com/*/*","https://speakerdeck.com/*/*"],"url":"https://speakerdeck.com/oembed.json","discovery":true,"formats":["json"]}]},{"provider_name":"Spreaker","provider_url":"https://www.spreaker.com/","endpoints":[{"schemes":["http://*.spreaker.com/*","https://*.spreaker.com/*"],"url":"https://api.spreaker.com/oembed","discovery":true}]},{"provider_name":"Streamable","provider_url":"https://streamable.com/","endpoints":[{"schemes":["http://streamable.com/*","https://streamable.com/*"],"url":"https://api.streamable.com/oembed.json","discovery":true}]},{"provider_name":"StreamOneCloud","provider_url":"https://www.streamone.nl","endpoints":[{"schemes":["https://content.streamonecloud.net/embed/*"],"url":"https://content.streamonecloud.net/oembed","discovery":true}]},{"provider_name":"Sway","provider_url":"https://www.sway.com","endpoints":[{"schemes":["https://sway.com/*","https://www.sway.com/*"],"url":"https://sway.com/api/v1.0/oembed","discovery":true}]},{"provider_name":"Ted","provider_url":"http://ted.com","endpoints":[{"schemes":["http://ted.com/talks/*"],"url":"http://www.ted.com/talks/oembed.{format}"}]},{"provider_name":"The New York Times","provider_url":"https://www.nytimes.com","endpoints":[{"schemes":["https://www.nytimes.com/svc/oembed","https://nytimes.com/*","https://*.nytimes.com/*"],"url":"https://www.nytimes.com/svc/oembed/json/","discovery":true}]},{"provider_name":"They Said So","provider_url":"https://theysaidso.com/","endpoints":[{"schemes":["https://theysaidso.com/image/*"],"url":"https://theysaidso.com/extensions/oembed/","discovery":true}]},{"provider_name":"TickCounter","provider_url":"https://www.tickcounter.com","endpoints":[{"schemes":["http://www.tickcounter.com/countdown/*","http://www.tickcounter.com/countup/*","http://www.tickcounter.com/ticker/*","http://www.tickcounter.com/worldclock/*","https://www.tickcounter.com/countdown/*","https://www.tickcounter.com/countup/*","https://www.tickcounter.com/ticker/*","https://www.tickcounter.com/worldclock/*"],"url":"https://www.tickcounter.com/oembed","discovery":true}]},{"provider_name":"Topy","provider_url":"http://www.topy.se/","endpoints":[{"schemes":["http://www.topy.se/image/*"],"url":"http://www.topy.se/oembed/","discovery":true}]},{"provider_name":"Twitch","provider_url":"https://www.twitch.tv","endpoints":[{"schemes":["http://clips.twitch.tv/*","https://clips.twitch.tv/*","http://www.twitch.tv/*","https://www.twitch.tv/*","http://twitch.tv/*","https://twitch.tv/*"],"url":"https://api.twitch.tv/v4/oembed","formats":["json"]}]},{"provider_name":"Twitter","provider_url":"http://www.twitter.com/","endpoints":[{"schemes":["https://twitter.com/*/status/*"],"url":"https://publish.twitter.com/oembed"}]},{"provider_name":"Ubideo","provider_url":"https://player.ubideo.com/","endpoints":[{"schemes":["https://player.ubideo.com/*"],"url":"https://player.ubideo.com/api/oembed.json","formats":["json"]}]},{"provider_name":"UOL","provider_url":"https://mais.uol.com.br/","endpoints":[{"schemes":["https://*.uol.com.br/view/*","https://*.uol.com.br/video/*"],"url":"https://mais.uol.com.br/apiuol/v3/oembed/view","discovery":true}]},{"provider_name":"Ustream","provider_url":"http://www.ustream.tv","endpoints":[{"schemes":["http://*.ustream.tv/*","http://*.ustream.com/*"],"url":"http://www.ustream.tv/oembed","formats":["json"]}]},{"provider_name":"Uttles","provider_url":"http://uttles.com","endpoints":[{"schemes":["http://uttles.com/uttle/*"],"url":"http://uttles.com/api/reply/oembed","discovery":true}]},{"provider_name":"VeeR VR","provider_url":"http://veer.tv/","endpoints":[{"schemes":["http://veer.tv/videos/*"],"url":"https://api.veer.tv/oembed","discovery":true},{"schemes":["http://veervr.tv/videos/*"],"url":"https://api.veervr.tv/oembed","discovery":true}]},{"provider_name":"Verse","provider_url":"http://verse.media/","endpoints":[{"url":"http://verse.media/services/oembed/"}]},{"provider_name":"VEVO","provider_url":"http://www.vevo.com/","endpoints":[{"schemes":["http://www.vevo.com/*","https://www.vevo.com/*"],"url":"https://www.vevo.com/oembed","discovery":false}]},{"provider_name":"VideoJug","provider_url":"http://www.videojug.com","endpoints":[{"schemes":["http://www.videojug.com/film/*","http://www.videojug.com/interview/*"],"url":"http://www.videojug.com/oembed.{format}"}]},{"provider_name":"Vidlit","provider_url":"https://vidl.it/","endpoints":[{"schemes":["https://vidl.it/*"],"url":"https://api.vidl.it/oembed","discovery":true}]},{"provider_name":"Vimeo","provider_url":"https://vimeo.com/","endpoints":[{"schemes":["https://vimeo.com/*","https://vimeo.com/album/*/video/*","https://vimeo.com/channels/*/*","https://vimeo.com/groups/*/videos/*","https://vimeo.com/ondemand/*/*","https://player.vimeo.com/video/*"],"url":"https://vimeo.com/api/oembed.{format}","discovery":true}]},{"provider_name":"Vine","provider_url":"https://vine.co/","endpoints":[{"schemes":["http://vine.co/v/*","https://vine.co/v/*"],"url":"https://vine.co/oembed.json","discovery":true}]},{"provider_name":"Vlipsy","provider_url":"https://vlipsy.com/","endpoints":[{"schemes":["https://vlipsy.com/*"],"url":"https://vlipsy.com/oembed","discovery":true}]},{"provider_name":"Wiredrive","provider_url":"https://www.wiredrive.com/","endpoints":[{"schemes":["https://*.wiredrive.com/*"],"url":"http://*.wiredrive.com/present-oembed/","formats":["json"],"discovery":true}]},{"provider_name":"wizer.me","provider_url":"http://www.wizer.me/","endpoints":[{"schemes":["http://*.wizer.me/learn/*","https://*.wizer.me/learn/*","http://*.wizer.me/preview/*","https://*.wizer.me/preview/*"],"url":"http://app.wizer.me/api/oembed.{format}","discovery":true}]},{"provider_name":"Wootled","provider_url":"http://www.wootled.com/","endpoints":[{"url":"http://www.wootled.com/oembed"}]},{"provider_name":"WordPress.com","provider_url":"http://wordpress.com/","endpoints":[{"url":"http://public-api.wordpress.com/oembed/","discovery":true}]},{"provider_name":"YFrog","provider_url":"http://yfrog.com/","endpoints":[{"schemes":["http://*.yfrog.com/*","http://yfrog.us/*"],"url":"http://www.yfrog.com/api/oembed","formats":["json"]}]},{"provider_name":"YouTube","provider_url":"http://www.youtube.com/","endpoints":[{"url":"http://www.youtube.com/oembed","discovery":true}]}];

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/promise-wtf/dist/promise-wtf.min.js":
/*!**********************************************************!*\
  !*** ./node_modules/promise-wtf/dist/promise-wtf.min.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {// promise-wtf@1.2.4, by @ndaidong - built on Fri, 23 Jun 2017 09:41:50 GMT - published under MIT license
!function(n,e){ true?module.exports=e():undefined}(this,function(){"use strict";var n="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},e=function(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")},t=function(){function n(n,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}return function(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}}();return function(n,e){return e={exports:{}},n(e,e.exports),e.exports}(function(r){var o=r.exports?"node":"browser",u=0,i=1,f=2,c=function(n){return n&&"[object Function]"==={}.toString.call(n)},l=function(){function n(t){e(this,n);var r=u,o=null,l=void 0,s=this,a=function(n){if(r===u)return o=n,!1;var e=r===f?n.onResolved:n.onRejected;return e?n.resolve(e(l)):r===f?n.resolve(l):n.reject(l)},d=function(n){r=i,l=n,o&&a(o)};return s.then=function(e,t){return new n(function(n,r){return a({onResolved:e,onRejected:t,resolve:n,reject:r})})},s.catch=function(n){return s.then(null,n)},t(function n(e){e&&c(e.then)?e.then(n,d):(r=f,l=e,o&&a(o))},d)}return t(n,null,[{key:"resolve",value:function(e){return new n(function(n){return n(e)})}},{key:"reject",value:function(e){return new n(function(n,t){return t(e)})}},{key:"all",value:function(e){var t=[],r=n.resolve(null);return e.forEach(function(n){r=r.then(function(){return n}).then(function(n){t.push(n)})}),r.then(function(){return t})}}]),n}(),s=("node"===o?n:window).Promise||l;s.prototype.finally=function(n){return this.then(function(e){return s.resolve(n()).then(function(){return e})})},s.series=function(n){return new s(function(e,t){var r=n.length;return function o(u){n[u](function(n){return n?t(n):u<r-1?o(u+1):e()})}(0)})},r.exports=s})});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/util/support/isBufferBrowser.js":
/*!******************************************************!*\
  !*** ./node_modules/util/support/isBufferBrowser.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),

/***/ "./node_modules/util/util.js":
/*!***********************************!*\
  !*** ./node_modules/util/util.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(/*! ./support/isBuffer */ "./node_modules/util/support/isBufferBrowser.js");

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js");

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// <<<<<<<<<<<<<<<< MARKDOWN >>>>>>>>>>>>>>>>>>
var markdown = __webpack_require__(/*! markdown */ "./node_modules/markdown/lib/index.js").markdown;
var urlLive = __webpack_require__(/*! oembed-providers */ "./node_modules/oembed-providers/providers.json");
//var webpagePreview = require("webpage-preview");

document.getElementById('send').addEventListener('click', enableMarkdown);

//use this for messages to support markdown. All messages must go through
//this function to support markdown
function enableMarkdown() {
    //enter the id of chat box for this to get its value
    var val = document.getElementById('inpText').value;
    //enter id of where you want the message to be displayed, when user hits enter.
    document.getElementById('mark').innerText += markdown.toHTML(val);
}
// <<<<<<<<<<<<< MARKDOWN ENDS >>>>>>>>>>>>>>>>>


// <<<<<<<<<< FOR DESKTOP NOTIFICATIONS >>>>>>>>>>>>>

// checks window state
var vis = function () {
    var stateKey,
        eventKey,
        keys = {
        hidden: "visibilitychange",
        webkitHidden: "webkitvisibilitychange",
        mozHidden: "mozvisibilitychange",
        msHidden: "msvisibilitychange"
    };
    for (stateKey in keys) {
        if (stateKey in document) {
            eventKey = keys[stateKey];
            break;
        }
    }
    return function (c) {
        if (c) document.addEventListener(eventKey, c);
        return !document[stateKey];
    };
}();

var visible = vis(); // gives current state

// registers a handler for visibility changes
// enable web browser notifications as well when browser is active and
// if not, keep both, desk and web notification avtive, write that
// login instead of console statement
vis(function () {
    vis() ? console.log('visible') : DesktopNotification();
});

//0. give permission to browser to send notifications
function DesktopNotification() {
    console.log("permission");
    var currentWindow = window;
    if (Notification && Notification.permission === 'default') {
        Notification.requestPermission(function (permission) {
            if (!('permission' in Notification)) {
                Notification.permission = permission;
            }
        });
    }
    desktopNotification(currentWindow);
}

//1.check permission 
//we can request permission here again if its value is 'default' //using the previously discussed code
function desktopNotification(currentWindow) {
    console.log('desk not called');
    if (Notification.permission === "granted") {
        console.log("granted");
        var text = "Message can be displayed here";
        sendDesktopNotification(text, currentWindow);
    } else {
        console.log("not granted");
    }
}

//2. send Notification
function sendDesktopNotification(text, currentWindow) {
    let notification = new Notification('New Notification', {
        //icon: "user profile icon, fetch from DB",
        body: text,
        tag: "multiple notifications"
    });
    //’tag’ handles muti tab scenario i.e when multiple tabs are 
    // open then only one notification is sent

    //3. handle notification events and set timeout 
    notification.onclick = function () {
        currentWindow.focus();
    };
    setTimeout(notification.close.bind(notification), 10000);
}

// <<<<<<<<<<<<<<<<<< DESKTOP NOTIFICATION ENDS >>>>>>>>>>>>>>>>


// <<<<<<<<<<<<<< LIVE URL PREVIEW >>>>>>>>>>>>>>>>>>>

//console.log(urlLive);
// $.getJSON('https://api.embedly.com/1/oembed?' + $.param({
//   url: 'https://www.youtube.com/watch?v=jofNR_WkoCE',
//   key: ":key"
// }));

// // jQuery Embedly 
// $.embedly.oembed('https://www.youtube.com/watch?v=jofNR_WkoCE', {key: ":key"});
var { extract } = __webpack_require__(/*! oembed-parser */ "./node_modules/oembed-parser/index.js");

let url = 'https://music.amazon.in/search/flo+rida';
extract(url).then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
});

/***/ }),

/***/ 0:
/*!******************************!*\
  !*** multi ./src/js/main.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/js/main.js */"./src/js/main.js");


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map