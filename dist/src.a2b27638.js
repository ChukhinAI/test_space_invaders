// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/sprite.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sprite = function Sprite(img, x, y, w, h, scX, scY) {
  _classCallCheck(this, Sprite);

  this.img = img; // this.x = (x + x + 1) / 2 - 1/2; // +1

  this.x = x + 2;
  this.y = y + 3;
  this.w = w;
  this.h = h;
  this.scaleX = scX;
  this.scaleY = scY;
};

exports.default = Sprite;
},{}],"src/cannon.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Cannon = /*#__PURE__*/function () {
  function Cannon(x, y, sprite) {
    _classCallCheck(this, Cannon);

    this.x = x;
    this.y = y;
    this._sprite = sprite;
    this.lives = 3;
  }

  _createClass(Cannon, [{
    key: "draw",
    value: function draw(ctx, time) {
      ctx.drawImage(this._sprite.img, this._sprite.x, this._sprite.y, this._sprite.w, this._sprite.h, this.x * this._sprite.scaleX, this.y, this._sprite.w * this._sprite.scaleX, this._sprite.h * this._sprite.scaleY);
    }
  }, {
    key: "getBoundingRect",
    value: function getBoundingRect() {
      return {
        x: this.x * this._sprite.scaleX,
        y: this.y,
        w: this._sprite.w * this._sprite.scaleX,
        h: this._sprite.h * this._sprite.scaleY
      };
    }
  }]);

  return Cannon;
}();

exports.default = Cannon;
},{}],"src/bullet.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Bullet = /*#__PURE__*/function () {
  function Bullet(x, y, vy, w, h, color) {
    _classCallCheck(this, Bullet);

    this.x = x;
    this.y = y;
    this.vy = vy;
    this.w = w;
    this.h = h;
    this.color = color;
  }

  _createClass(Bullet, [{
    key: "update",
    value: function update(dir, cnvsHeight) {
      if (dir) this.y += this.vy;else this.y -= this.vy;
      if (this.y > cnvsHeight || this.y + this.w < 0) return true;
      return false;
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.w, this.h);
    }
  }, {
    key: "getBoundingRect",
    value: function getBoundingRect() {
      return {
        x: this.x,
        y: this.y,
        w: this.w,
        h: this.h
      };
    }
  }]);

  return Bullet;
}();

exports.default = Bullet;
},{}],"src/alien.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bullet = _interopRequireDefault(require("./bullet"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Alien = /*#__PURE__*/function () {
  function Alien(x, y, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        spriteA = _ref2[0],
        spriteB = _ref2[1];

    _classCallCheck(this, Alien);

    this.x = x;
    this.y = y;
    this._spriteA = spriteA;
    this._spriteB = spriteB; //this.moveDir = false; // left

    this.mooving = false;
    this.steps = 1;
    this.lastSecondMove = 0;
  }

  _createClass(Alien, [{
    key: "shoot",
    value: function shoot(count) {
      var shouldShoot = Math.random() < 1 / count / 6;

      if (shouldShoot) {
        return new _bullet.default((this.x + this._spriteA.w / 2) * this._spriteA.scaleX, (this.y + this._spriteA.h) * this._spriteA.scaleY, -2, 2, 2, "yellow");
      }

      return undefined;
    }
  }, {
    key: "draw",
    value: function draw(ctx, time) {
      var sp = Math.ceil(time / 1000) % 2 === 0 ? this._spriteA : this._spriteB;
      ctx.drawImage(sp.img, sp.x, sp.y, sp.w, sp.h, this.x * sp.scaleX, this.y * sp.scaleY, sp.w * sp.scaleX, sp.h * sp.scaleY);
    }
  }, {
    key: "move",
    value: function move(time) {
      var second = Math.ceil(time / 1000);
      if (second == this.lastSecondMove) return;
      this.lastSecondMove = second;
      var shouldMoveHorizontal = second % 2 === 0;
      var shouldMoveDown = second % 5 === 0;

      if (shouldMoveHorizontal) {
        //if (this.moveDir) // mooving
        if (this.mooving) {
          this.x += 20;
        } else {
          this.x -= 20;
        }

        this.steps--;

        if (this.steps == 0) {
          //this.moveDir = !this.moveDir
          this.mooving = !this.mooving;
          this.steps = 2;
        }
      }

      if (shouldMoveDown) {
        this.y += 10;
      }
    }
  }, {
    key: "getBoundingRect",
    value: function getBoundingRect() {
      var sp = this._spriteA;
      return {
        x: this.x * sp.scaleX,
        y: this.y * sp.scaleY,
        w: sp.w * sp.scaleX,
        h: sp.h * sp.scaleY
      };
    }
  }]);

  return Alien;
}();

exports.default = Alien;
},{"./bullet":"src/bullet.js"}],"src/bunker.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Bunker = /*#__PURE__*/function () {
  function Bunker(x, y, sprite) {
    _classCallCheck(this, Bunker);

    this.x = x;
    this.y = y;
    this._sprite = sprite;
    this.lives = 20;
  }

  _createClass(Bunker, [{
    key: "getBoundingRect",
    value: function getBoundingRect() {
      return {
        x: this.x * this._sprite.scaleX,
        y: this.y,
        w: this._sprite.w * this._sprite.scaleX,
        h: this._sprite.h * this._sprite.scaleY
      };
    }
  }, {
    key: "draw",
    value: function draw(ctx, time) {
      ctx.drawImage(this._sprite.img, this._sprite.x, this._sprite.y, this._sprite.w, this._sprite.h, //this._sprite.h + 10,this._sprite.y - 10
      this.x * this._sprite.scaleX, this.y, this._sprite.w * this._sprite.scaleX, this._sprite.h * this._sprite.scaleY);
      ctx.fillStyle = "yellow";
      ctx.font = "22px Arial, jet-brains mono";
      ctx.fillText(this.lives, this.x * this._sprite.scaleX + this._sprite.w * this._sprite.scaleX / 2 - 10, this.y - 40);
    }
  }]);

  return Bunker;
}();

exports.default = Bunker;
},{}],"src/input-handler.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var InputHandler = /*#__PURE__*/function () {
  function InputHandler() {
    var _this = this;

    _classCallCheck(this, InputHandler);

    this.down = {};
    this.pressed = {};
    document.addEventListener("keydown", function (e) {
      _this.down[e.keyCode] = true;
    });
    document.addEventListener("keyup", function (e) {
      delete _this.down[e.keyCode];
      delete _this.pressed[e.keyCode];
    });
  }
  /**
   * Returns whether a key is pressod down
   * @param  {number} code the keycode to check
   * @return {bool} the result from check
   */


  _createClass(InputHandler, [{
    key: "isDown",
    value: function isDown(code) {
      return this.down[code];
    }
    /**
     * Return wheter a key has been pressed
     * @param  {number} code the keycode to check
     * @return {bool} the result from check
     */

  }, {
    key: "isPressed",
    value: function isPressed(code) {
      // if key is registred as pressed return false else if
      // key down for first time return true else return false
      if (this.pressed[code]) {
        return false;
      } else if (this.down[code]) {
        return this.pressed[code] = true;
      }

      return false;
    }
  }]);

  return InputHandler;
}();

exports.default = InputHandler;
},{}],"assets/14_2.png":[function(require,module,exports) {
module.exports = "/14_2.21d337f2.png";
},{}],"src/game.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.preload = preload;
exports.init = init;
exports.update = update;
exports.draw = void 0;

var _sprite = _interopRequireDefault(require("./sprite"));

var _cannon = _interopRequireDefault(require("./cannon"));

var _bullet = _interopRequireDefault(require("./bullet"));

var _alien = _interopRequireDefault(require("./alien"));

var _bunker = _interopRequireDefault(require("./bunker"));

var _inputHandler = _interopRequireDefault(require("./input-handler"));

var _ = _interopRequireDefault(require("../assets/14_2.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import assetPath from '../assets/invaders_m_4.png'
var canvas = document.getElementById("cnvs"); //let ctx = canvas.getContext('2d'); // ACHTUNG!

var assets;
var sprites = {
  aliens: [],
  cannon: null,
  bunker: null,
  cannonShield: null
};
var gameState = {
  bullets: [],
  aliens: [],
  bunkers: [],
  alienBullets: [],
  cannon: null,
  score: 0
};
var inputHandler = new _inputHandler.default();

function sleep(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
}

function preload(onPreloadComplete) {
  //  It was at this moment I knew: I fckd up
  // sleep(2000);
  //setTimeout(() => {  console.log("World!"); }, 20000);
  assets = new Image();
  assets.addEventListener("load", function () {
    var scaleX = 2;
    var scaleY = 2;
    sprites.cannon = new _sprite.default(assets, 63, 0, 20, 32, scaleX, scaleY); // оригинал

    sprites.cannonShield = new _sprite.default(assets, 120, 3, 38, 42, scaleX, scaleY);
    sprites.bunker = new _sprite.default(assets, 84, 8, 35, 24, scaleX, scaleY);
    sprites.aliens = [[new _sprite.default(assets, 0, 0, 22, 16, scaleX, scaleY), new _sprite.default(assets, 0, 16, 22, 16, scaleX, scaleY)], [new _sprite.default(assets, 23, 0, 14, 16, scaleX, scaleY), new _sprite.default(assets, 23, 16, 14, 16, scaleX, scaleY)], [new _sprite.default(assets, 38, 0, 24, 16, scaleX, scaleY), new _sprite.default(assets, 38, 16, 24, 16, scaleX, scaleY)]];
    onPreloadComplete();
  });
  assets.src = _.default;
}

function classicFormation() {
  var alienTypes = [0, 1, 2];

  for (var i = 0, len = alienTypes.length; i < len; i++) {
    for (var j = 0; j < 22; j++) {
      var alienType = alienTypes[i];
      var alienX = 28 + j * 28;
      var alienY = 28 + i * 28; // 30 + i*30;

      if (alienType === 1) {
        alienX += 3; // aliens of this type is a bit thinner
      }

      gameState.aliens.push(new _alien.default(alienX, alienY, sprites.aliens[alienType]));
    }
  }
}

function svinfylkingFormation() {
  var alienTypes = [0, 1, 2];
  var split = 2; //2

  for (var i = 0; i < 5; i++) {
    for (var j = -2 + split; j < 22 - split; j++) {
      var alienType = alienTypes[i % 3];
      var alienX = 28 + j * 28;
      var alienY = 28 + i * 28;

      if (alienType === 1) {
        alienX += 3; // aliens of this type is a bit thinner
      }

      gameState.aliens.push(new _alien.default(alienX, alienY, sprites.aliens[alienType]));
    }

    split += 2;
  }
}

function init(canvas) {
  if (Math.random() < 0.5) svinfylkingFormation();else classicFormation();

  for (var j = 0; j < 8; j++) {
    var bunkerX = 28 + j * 90;
    gameState.bunkers.push(new _bunker.default(bunkerX, canvas.height - 250, sprites.bunker));
  }

  gameState.cannon = new _cannon.default(100, canvas.height - 100, sprites.cannon);
}

function update(time, stopGame) {
  if (inputHandler.isDown(37)) {
    // Left
    if (gameState.cannon.x - 4 >= 0) // somehow works
      gameState.cannon.x -= 4;
  }

  if (inputHandler.isDown(39)) {
    // Right
    if ((gameState.cannon.x + 4 + gameState.cannon._sprite.w) * gameState.cannon._sprite.scaleX <= canvas.width) gameState.cannon.x += 4;
  }

  if (inputHandler.isPressed(32)) {
    // Space
    var bulletX = (gameState.cannon.x + gameState.cannon._sprite.w / 2) * gameState.cannon._sprite.scaleX;
    var bulletY = gameState.cannon.y;
    gameState.bullets.push(new _bullet.default(bulletX, bulletY, -8, 2, 6, "#fff"));
  }

  gameState.bullets.forEach(function (b, i, self) {
    if (b.update(true, canvas.height)) self.splice(i, 1);
  });
  gameState.alienBullets.forEach(function (b, i, self) {
    if (b.update(false, canvas.height)) self.splice(i, 1);
  });
  gameState.aliens.forEach(function (alien, index, self) {
    var bullet = alien.shoot(self.length);
    if (bullet !== undefined) gameState.alienBullets.push(bullet);
    alien.move(time);
  });

  if (collisionCheck()) {
    exports.draw = draw = showLoseScreen; // aliens win(

    stopGame();
  }

  if (gameState.aliens.length == 0) {
    exports.draw = draw = showWinScreen; // humans win))

    stopGame();
  }
}

function showLoseScreen() {
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "100px Arial, sans-serif";
  ctx.fillText("Gameover!", canvas.width / 2 - 300, canvas.height / 2 - 200);
  ctx.fillText("Final score: " + gameState.score, canvas.width / 2 - 300, canvas.height / 2 + 120 - 200);
}

function showWinScreen() {
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "100px Arial, sans-serif";
  ctx.fillText("You win!", canvas.width / 2 - 300, canvas.height / 2 - 200);
  ctx.fillText("Your score: " + gameState.score, canvas.width / 2 - 300, canvas.height / 2 + 120 - 200);
}

var draw = function draw(canvas, time) {
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  gameState.aliens.forEach(function (a) {
    return a.draw(ctx, time);
  });
  gameState.cannon.draw(ctx);
  gameState.cannonShield.draw(ctx);
  gameState.bullets.forEach(function (b) {
    return b.draw(ctx);
  });
  gameState.bunkers.forEach(function (b) {
    return b.draw(ctx);
  });
  gameState.alienBullets.forEach(function (b) {
    return b.draw(ctx);
  });
  drawInfo(ctx);
};

exports.draw = draw;

function drawInfo(ctx) {
  ctx.fillStyle = "#9FFF9F";
  ctx.fillRect(0, 50, ctx.width, 10);
  ctx.font = "24px Arial, sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Score: " + gameState.score + "    Shields: " + gameState.cannon.lives, 20, 20);
}

function rectIntersection(r1, r2) {
  var leftX = Math.max(r1.x, r2.x);
  var rightX = Math.min(r1.x + r1.w, r2.x + r2.w);
  var topY = Math.max(r1.y, r2.y);
  var botY = Math.min(r1.y + r1.h, r2.y + r2.h);

  if (rightX > leftX && botY > topY) {
    return true;
  }

  return false;
}

function activateShield() // в данный момент выпилена
{
  var ctx = canvas.getContext('2d');
  var cannon = gameState.cannon; //ctx.clearRect(0, 0, canvas.width, canvas.height); // achtung

  ctx.lineWidth = 50; // толщина линии
  //ctx.arc(cannon.x,cannon.y,300,0, Math.PI,true);

  ctx.arc(300, 700, 200, 0, Math.PI, true);
  console.log('y=', cannon.y);
  ctx.strokeStyle = 'red';
  ctx.fillStyle = "orange";
  ctx.stroke();
  console.log('est probitie');
}

function collisionCheck() {
  var bullets = gameState.bullets;
  var alienBullets = gameState.alienBullets;
  var bunkers = gameState.bunkers;
  var aliens = gameState.aliens;
  var cannon = gameState.cannon;
  var gameOver = false;
  bullets.forEach(function (bullet, i, bullets) {
    aliens.forEach(function (alien, j, aliens) {
      if (rectIntersection(bullet, alien.getBoundingRect())) {
        bullets.splice(i, 1);
        aliens.splice(j, 1);
        gameState.score += 50;
      }
    });
  });
  alienBullets.forEach(function (alienBullet, i, alienBullets) {
    if (rectIntersection(alienBullet, cannon.getBoundingRect())) {
      alienBullets.splice(i, 1);
      cannon.lives--; //activateShield(); // пусть хоть 1-2 секунды будет активирован, найти как это сделать// изменил стратегию

      if (cannon.lives <= 0) {
        gameOver = true;
      }
    }

    bunkers.forEach(function (bunker, j, bunkers) {
      if (rectIntersection(bunker.getBoundingRect(), alienBullet.getBoundingRect())) {
        alienBullets.splice(i, 1);
        bunker.lives--;

        if (bunker.lives <= 0) {
          bunkers.splice(j, 1);
        }
      }
    });
  });
  aliens.forEach(function (alien, i, aliens) {
    var cB = cannon.getBoundingRect();
    var aB = alien.getBoundingRect();

    if (aB.y + aB.h > cB.y) {
      gameOver = true;
    }

    bunkers.forEach(function (bunker, j, bunkers) {
      if (rectIntersection(bunker.getBoundingRect(), aB)) {
        aliens.splice(i, 1);
        bunker.lives -= 8;

        if (bunker.lives <= 0) {
          bunkers.splice(j, 1);
        }
      }
    });
  });
  return gameOver;
}
},{"./sprite":"src/sprite.js","./cannon":"src/cannon.js","./bullet":"src/bullet.js","./alien":"src/alien.js","./bunker":"src/bunker.js","./input-handler":"src/input-handler.js","../assets/14_2.png":"assets/14_2.png"}],"src/index.js":[function(require,module,exports) {
"use strict";

var _game = require("./game");

var canvas = document.getElementById("cnvs");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var tickLength = 16; //ms

var lastTick;
var lastRender;
var stopCycle;

function run(tFrame) {
  stopCycle = window.requestAnimationFrame(run);
  var nextTick = lastTick + tickLength;
  var numTicks = 0;

  if (tFrame > nextTick) {
    var timeSinceTick = tFrame - lastTick;
    numTicks = Math.floor(timeSinceTick / tickLength);
  }

  for (var i = 0; i < numTicks; i++) {
    lastTick = lastTick + tickLength;
    (0, _game.update)(lastTick, stopGame);
  }

  (0, _game.draw)(canvas, tFrame);
  lastRender = tFrame;
}

function stopGame() {
  window.cancelAnimationFrame(stopCycle);
}

function onPreloadComplete() {
  lastTick = performance.now();
  lastRender = lastTick;
  stopCycle = null;
  (0, _game.init)(canvas);
  run();
} //setTimeout(() => {  console.log("World10!"); }, 10000);


(0, _game.preload)(onPreloadComplete); // without waiting
//setTimeout(() => {  preload(onPreloadComplete); }, 69000); // with titles
},{"./game":"src/game.js"}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57530" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map