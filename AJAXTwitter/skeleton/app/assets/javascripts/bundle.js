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
/******/ 	return __webpack_require__(__webpack_require__.s = "./frontend/twitter.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./frontend/api_util.js":
/*!******************************!*\
  !*** ./frontend/api_util.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

const APIUtil = {
  followUser: (id) => (
    $.ajax({
      url: `/users/${id}/follow`,
      type: 'POST',
      dataType: 'json'
    })
  ),

  unfollowUser: (id) => (
    $.ajax({
      url: `/users/${id}/follow`,
      type: 'DELETE',
      dataType: 'json'
    })
  ),

  searchUsers: (queryVal) => (
    $.ajax({
      url: `/users/search`,
      type: 'GET',
      dataType: 'json',
      data: {queryVal}
    })
  ),

  createTweet: (data) => (
    $.ajax({
      url: '/tweets',
      type: 'POST',
      dataType: 'json',
      data: {data}
    })
  )

};

module.exports = APIUtil;


/***/ }),

/***/ "./frontend/follow_toggle.js":
/*!***********************************!*\
  !*** ./frontend/follow_toggle.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(/*! ./api_util */ "./frontend/api_util.js");

class FollowToggle {
  constructor(el, options) {
    // debugger
    // debugger
    this.$el = $(el);
    this.userId = this.$el.data('user-id') || options.userId;
    this.followState = (this.$el.data('initial-follow-state') ||
      options.followState);
    this.render();
    this.$el.on('click', this.handleClick.bind(this));

  }

  render() {
    // debugger
    if (this.followState === "unfollowed") {
      this.$el.html("Follow!");
      this.$el.prop("disabled", false);
    } else if (this.followState === "followed") {
        this.$el.html("Unfollow!");
        this.$el.prop("disabled", false);
    } else if (this.followState === "following") {
        this.$el.html("Following!!");
        this.$el.prop("disabled", true);
    } else if (this.followState === "unfollowing") {
        this.$el.html("Unfollowing!!");
        this.$el.prop("disabled", true);
    }
  }

  handleClick(e) {
    e.preventDefault();
    const that = this;


    if (this.followState === "unfollowed") {
      this.followState = "following";
      this.render();
      APIUtil.followUser(this.userId).then( () => {
        that.followState = "followed";
        that.render();
      });

    } else {
      this.followState = "unfollowing";
      this.render();
      APIUtil.unfollowUser(this.userId).then( () => {
        that.followState = "unfollowed";
        that.render();
      });

    }
  }
}


module.exports = FollowToggle;


/***/ }),

/***/ "./frontend/tweet_compose.js":
/*!***********************************!*\
  !*** ./frontend/tweet_compose.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(/*! ./api_util.js */ "./frontend/api_util.js");

class TweetCompose {
  constructor(form) {
    this.$el = $(form);
    this.$el.on('submit', this.submit.bind(this));
  }

  submit(e) {
    e.preventDefault();

    let data = this.$el.serializeJSON();
    this.$el.find(':input').prop('disabled', true);

    APIUtil.createTweet(data).then( (tweet) => this.handleSuccess(tweet));
  }

  handleSuccess(tweet) {
    this.$el.find(':input').prop('disabled', false);
    
    this.clearInput();
  }

  clearInput() {
    this.$input.val("");

  }
}


/***/ }),

/***/ "./frontend/twitter.js":
/*!*****************************!*\
  !*** ./frontend/twitter.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const FollowToggle = __webpack_require__(/*! ./follow_toggle.js */ "./frontend/follow_toggle.js");
const UsersSearch = __webpack_require__(/*! ./users_search.js */ "./frontend/users_search.js");
const TweetCompose = __webpack_require__(/*! ./tweet_compose.js */ "./frontend/tweet_compose.js");

$( () => {
  $('button.follow-toggle').each( (i, button) => new FollowToggle(button));
  $('nav.users-search').each( (i, nav) => new UsersSearch(nav));
  $('form.tweet-compose').each( (i, form) => new TweetCompose(form));

});


/***/ }),

/***/ "./frontend/users_search.js":
/*!**********************************!*\
  !*** ./frontend/users_search.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(/*! ./api_util.js */ "./frontend/api_util.js");

const FollowToggle = __webpack_require__(/*! ./follow_toggle */ "./frontend/follow_toggle.js");

class UsersSearch {
  constructor(el) {
    // debugger
    this.$el = $(el);
    this.$input = this.$el.find('input[name=username]');
    this.$ul = this.$el.find('.users');
    this.$input.on('input', this.handleInput.bind(this));

  }

  handleInput(e) {
    // e.preventDefault();
    // debugger

    APIUtil.searchUsers(this.$input.val())
    .then( users => this.renderResults(users));
  }

  renderResults(users) {
    // debugger
    this.$ul.empty();

    for (let i = 0; i < users.length; i++){
      let user = users[i];

      let $a = $('<a>');

      $a.text(`${user.username}`);
      $a.attr('href', `/users/${user.id}`);

      let $tag = $('<button></button>');
      // debugger
      new FollowToggle($tag, {
        userId: user.id,
        followState: user.followed ? 'followed' : 'unfollowed'
      });
      // debugger

      let $li = $('<li>');
      $li.append($a);
      $li.append($tag);
      this.$ul.append($li);
      // console.log(this.$ul);
      // debugger

    }

  }

}

module.exports = UsersSearch;


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map