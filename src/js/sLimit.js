/**
 * 输入框文字长度限制
 * @author sunxjie
 * @date 2017.08.29
 * @github https://github.com/sunxjie/sLimit.js
 */

;
(function($) {

	$.fn.sLimit = function(options) {
		var sLimit = new limit(this, options);
		return sLimit.init();
	};

	var limit = function(ele, options) {
		this.$element = ele,
		this.defaults = {
			max: 0,
            tip: '',
			rule: 'asc'
		},
		this.opts = $.extend({}, this.defaults, options);
	};

	limit.prototype = {
		init: function() {
			var _templen = 0,
				_text = $.trim(this.$element.val()),
				_textlen = this.getlen(_text),
				opts = this.opts,
				$tipbox = $(opts.tip);

			switch(opts.rule) {
				case "desc":
					if (_textlen < this.opts.max) {
						_templen = this.opts.max - _textlen;
					} else {
						_templen = 0;
						this.$element.val(this.getmax(_text));
					}
					break;
				case "asc":
					if (_textlen < opts.max) {
						_templen = _textlen;
					} else {
						_templen = opts.max;
						this.$element.val(this.getmax(_text));
					}
					break;
			};

			if ($tipbox) $tipbox.text(_templen);
		},
		// 获取内容的总字数
		getlen: function(text) {
			var _len = 0,
				_regexCn = /[\x00-\xff]+/;
			for (var i = 0; i < text.length; i++) {
				_len += !_regexCn.test(text.charAt(i)) ? 2 : 1;
			}
			_len = Math.ceil(_len / 2);
			return _len;
		},
		// 获取最大字数的内容
		getmax: function(text) {
			var _len = 0,
				_regexCn = /[\x00-\xff]+/,
				_temptext = "";
			for (var i = 0; i < text.length; i++) {
				_len += !_regexCn.test(text.charAt(i)) ? 2 : 1;
				if (_len > this.opts.max*2) break;
				_temptext += text[i];
			}
			return _temptext;
		}
	};

})(window.jQuery || window.Zepto);