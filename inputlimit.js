/**
 * 输入框文字长度限制
 * @author sunxjie
 * @date 2017.08.29
 * @github https://github.com/sunxjie/inputlimit
 */

;(function($) {
    $.fn.inputlimit = function(options) {
        var defaults = {
			max: 0,
            tip: '',
			rule: 'asc'
        };
        var opts = $.extend({}, defaults, options);

        this.each(function() {
			var _this = $(this);
			var _text = $.trim(_this.val());
			var _tipbox = $(opts.tip);
			var _regexCn = /[\x00-\xff]+/;

			var inputlimit = {
				init : function(text) {
					var _templen = 0;
					var _textlen = this.getTextlen(text);
					switch(opts.rule) {
						case "desc":
							if (_textlen < opts.max) {
								_templen = opts.max - _textlen;
							} else {
								_templen = 0;
								_this.val(this.getTextmax(text, opts.max));
							}
							break;
						case "asc":
							if (_textlen < opts.max) {
								_templen = _textlen;
							} else {
								_templen = opts.max;
								_this.val(this.getTextmax(text, opts.max));
							}
							break;
					}
					if (_tipbox) _tipbox.text(_templen);
				},
				// 获取内容的总字数
				getTextlen : function(text) {
					var _len = 0;
					for (var i = 0; i < text.length; i++) {
						_len += !_regexCn.test(text.charAt(i)) ? 2 : 1;
					}
					_len = Math.ceil(_len / 2);
					return _len;
				},
				// 获取最大字数的内容
				getTextmax : function(text, max) {
					var _len = 0,
						_temptext = "";
					for (var i = 0; i < text.length; i++) {
						_len += !_regexCn.test(text.charAt(i)) ? 2 : 1;
						if (_len > max*2) break;
						_temptext += text[i];
					}
					return _temptext;
				}
			}

			_this.bind('focus keyup change', function() {
				var _text = $(this).val();
				inputlimit.init(_text);
			});

			inputlimit.init(_text);
		});

		return this;
    };
})(window.jQuery || window.Zepto);