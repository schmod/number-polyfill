# Number polyfill

This is a polyfill for implementing the HTML5 `<input type="number">` element in browsers that do not currently support it.  

It has been modified to be used inside of an AngularJS directive, based on @kumarharsh's [suggestion](http://stackoverflow.com/questions/18512478/angularjs-set-form-to-dirty-on-model-change-from-outside-angular).

## Manual usage

From within an Angular directive, call `.inputNumber(ngModel,scope)`

Once `number-polyfill` and its stylesheet have been loaded, it could be used inside of a directive like this:
```javascript
angular.module('appModule')
	.directive('input', function () {
		return {
			restrict: 'E',
			require: '?ngModel',
			link: function (scope, elem, attrs, ngModel) {
				if(('type' in attrs) && attrs.type === 'number'){
					$(elem).inputNumber(ngModel, scope);
				}
			}
		};
	});
```

## Dependencies

This script requires [jQuery](http://jquery.com/).

## Demo

http://jonstipe.github.com/number-polyfill/demo.html

## Test suite

http://jonstipe.github.com/number-polyfill/unittest.html

## See also

[Compatibility chart for input number elements](http://caniuse.com/input-number)

## License (MIT)
Copyright (c) 2011 Jonathan Stipe

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

