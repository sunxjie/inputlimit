(function($) {
    $.fn.sLimit = function(options) {
        var defaults = {
			max: 0,
            tip: '',
			rule: 'auto'
        };
        var opts = $.extend({}, defaults, options);

        this.each(function() {
			var $this = $(this) ,
				$tipbox = $(opts.tip),
				_text = $this.val();

			// 返回val的长度
			var getLen = function(str) {
				var _textlen = 0, regexCn = /[\x00-\xff]+/;
				for (var i = 0; i < str.length; i++) {
					_textlen += !regexCn.test(str.charAt(i)) ? 2 : 1;
				}
				_textlen = Math.ceil(_textlen / 2);
				return _textlen;
			}

			// 返回val在规定字节长度max内的值
			var getMaxVal = function(str, max) {
				var text = "";
				var _textlen = 0, regexCn = /[\x00-\xff]+/;
				for (var i = 0; i < str.length; i++) {
					_textlen += !regexCn.test(str.charAt(i)) ? 2 : 1;
					if (_textlen > max*2) break;
					text += str[i];
				}
				return text;
			}

			// 执行
			var inputInit = function(text) {
				var _tempnum = 0;
				var _textlen = getLen(text);
				if ($tipbox) {
					if ( _textlen < opts.max ) {
						if ( opts.rule == "desc" ) _tempnum = opts.max - _textlen;
						if ( opts.rule == "asc" )  _tempnum = _textlen;
					}
					if ( _textlen >= opts.max ) {
						if ( opts.rule == "desc" ) _tempnum = 0;
						if ( opts.rule == "asc" )  _tempnum = opts.max;
						$this.val(getMaxVal(text, opts.max));
					}
					$tipbox.text( _tempnum );
				} else {
					if ( _textlen >= opts.max )  $this.val(getMaxVal(text, opts.max));
				}
			}

			$this.bind('focus keyup change', function() {
				var _text = $(this).val();
				inputInit(_text);
			});

			inputInit(_text);
		});

		return this;
    };
})(window.jQuery || window.Zepto);