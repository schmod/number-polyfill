// Generated by CoffeeScript 1.6.3
(function() {
  (function($) {
    var $downBtn, $fixture, $numberField, $upBtn, ui;
    ui = {
      typeIn: function(elem, txt) {
        var $elem, code, i, len, _i, _ref;
        $elem = $(elem);
        len = txt.length;
        $elem.focus();
        for (i = _i = 0, _ref = txt.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          code = txt.charCodeAt(i);
          $elem.trigger(jQuery.Event("keydown", {
            charCode: code,
            keyCode: code,
            which: code
          }));
          $elem.trigger(jQuery.Event("keyup", {
            charCode: code,
            keyCode: code,
            which: code
          }));
          $elem.trigger(jQuery.Event("keypress", {
            charCode: code,
            keyCode: code,
            which: code
          }));
        }
        $elem.blur();
        if ($elem.val() !== txt) {
          $elem.val(txt).change();
        }
      },
      click: function(elem, times) {
        var $elem, i, _i;
        if (times == null) {
          times = 1;
        }
        $elem = $(elem);
        for (i = _i = 0; 0 <= times ? _i < times : _i > times; i = 0 <= times ? ++_i : --_i) {
          $elem.trigger("mousedown");
          $elem.trigger("mouseup");
          $elem.trigger("click");
        }
      },
      mousewheelup: function(elem, times) {
        var $elem, i, _i;
        if (times == null) {
          times = 1;
        }
        $elem = $(elem);
        $elem.focus();
        for (i = _i = 0; 0 <= times ? _i < times : _i > times; i = 0 <= times ? ++_i : --_i) {
          $elem.trigger(jQuery.Event("mousewheel", {
            originalEvent: {
              wheelDelta: 3
            }
          }));
        }
        $elem.blur();
      },
      mousewheeldown: function(elem, times) {
        var $elem, i, _i;
        if (times == null) {
          times = 1;
        }
        $elem = $(elem);
        $elem.focus();
        for (i = _i = 0; 0 <= times ? _i < times : _i > times; i = 0 <= times ? ++_i : --_i) {
          $elem.trigger(jQuery.Event("mousewheel", {
            originalEvent: {
              wheelDelta: -3
            }
          }));
        }
        $elem.blur();
      }
    };
    $numberField = null;
    $upBtn = null;
    $downBtn = null;
    $fixture = $("#qunit-fixture");
    QUnit.testStart(function(details) {
      $fixture.append('<input id="myFixture" name="number" type="number" />');
      $fixture.children().inputNumber();
      $numberField = $('#myFixture');
      $upBtn = $('#myFixture + div.number-spin-btn-container > div.number-spin-btn-up');
      $downBtn = $('#myFixture + div.number-spin-btn-container > div.number-spin-btn-down');
    });
    test("adds the necessary elements around the field", 6, function() {
      ok($numberField.parent().is('span'), "Element is in a span.");
      ok($numberField.next().is('div'), "Element is followed by a button container div.");
      ok($numberField.next().is('div.number-spin-btn-container'), "Button container div has class 'number-spin-btn-container'.");
      equal($numberField.next().children().length, 2, "Button container div has two children.");
      ok($numberField.next().children().first().is('div.number-spin-btn-up'), "Button container div's first child has class 'number-spin-btn-up'.");
      ok($numberField.next().children().eq(1).is('div.number-spin-btn-down'), "Button container div's second child has class 'number-spin-btn-down'.");
    });
    test("allows values to be typed in", 1, function() {
      ui.typeIn($numberField, "12345");
      equal($numberField.val(), "12345", "Field value changes.");
    });
    test("doesn't allow non-numeric values", 4, function() {
      var changeEvents;
      changeEvents = 0;
      $numberField.val("0");
      $numberField.change(function(evt) {
        return changeEvents++;
      });
      ui.typeIn($numberField, "AAAAA");
      equal(changeEvents, 2, "Change event has fired twice.");
      equal($numberField.val(), "0", "Field value changes back to zero after typing letters in.");
      $numberField.val("BBBBBB").change();
      equal(changeEvents, 4, "Change event has fired four times.");
      equal($numberField.val(), "0", "Field value changes back to zero after trying to set the property to letters.");
    });
    test("doesn't allow values lower than min", 1, function() {
      $numberField.attr("min", "10");
      $numberField.val("5").change();
      equal($numberField.val(), "10", "Field value changes to min.");
    });
    test("allows changing min", 4, function() {
      $numberField.attr("min", "10");
      $numberField.val("15").change();
      $numberField.attr("min", "20");
      equal($numberField.val(), "20", "Field value changes to min when min is changed to higher than value.");
      $numberField.val("15").change();
      equal($numberField.val(), "20", "Field value changes back to min after being set to lower than min.");
      $numberField.attr("min", "10");
      equal($numberField.val(), "20", "Field value doesn't change when min decreases.");
      $numberField.val("15").change();
      equal($numberField.val(), "15", "Field value doesn't change to min when set to higher than min.");
    });
    test("allows deleting min", 3, function() {
      $numberField.attr("min", "10");
      $numberField.val("1").change();
      equal($numberField.val(), "10", "Field value changes to min after being set below min.");
      $numberField.removeAttr("min");
      $numberField.val("1").change();
      equal($numberField.val(), "1", "Field value can be set after min is deleted.");
      $numberField.attr("min", "10");
      equal($numberField.val(), "10", "Field value changes to min after min is restored.");
    });
    test("doesn't allow values higher than max", 1, function() {
      $numberField.attr("max", "100");
      $numberField.val("110").change();
      equal($numberField.val(), "100", "Field value changes to max.");
    });
    test("allows changing max", 4, function() {
      $numberField.attr("max", "150");
      $numberField.val("120").change();
      $numberField.attr("max", "100");
      equal($numberField.val(), "100", "Field value changes to max when max is changed to lower than value.");
      $numberField.val("120").change();
      equal($numberField.val(), "100", "Field value changes back to max after being set to higher than max.");
      $numberField.attr("max", "150");
      equal($numberField.val(), "100", "Field value doesn't change when max increases.");
      $numberField.val("120").change();
      equal($numberField.val(), "120", "Field value doesn't change to max when set to lower than max.");
    });
    test("allows deleting max", 3, function() {
      $numberField.attr("max", "100");
      $numberField.val("100000").change();
      equal($numberField.val(), "100", "Field value changes to max after being set above max.");
      $numberField.removeAttr("max");
      $numberField.val("100000").change();
      equal($numberField.val(), "100000", "Field value can be set after max is deleted.");
      $numberField.attr("max", "100");
      equal($numberField.val(), "100", "Field value changes to max after max is restored.");
    });
    test("applies opacity style properties gained from a class attribute to the button container", 3, function() {
      $numberField.addClass("opacityZero");
      equal($upBtn.parent().css("opacity"), 0, "Button container is now transparent.");
      $numberField.removeClass("opacityZero").addClass("opacityHalf");
      equal($upBtn.parent().css("opacity"), 0.5, "Button container is now translucent.");
      $numberField.removeClass("opacityHalf").addClass("opacityOne");
      equal($upBtn.parent().css("opacity"), 1, "Button container is now opaque.");
    });
    test("applies opacity style properties gained from a style attribute to the button container", 3, function() {
      $numberField.css("opacity", "0");
      equal($upBtn.parent().css("opacity"), "0", "Button container is now transparent.");
      $numberField.css("opacity", "0.5");
      equal($upBtn.parent().css("opacity"), "0.5", "Button container is now translucent.");
      $numberField.css("opacity", "1");
      equal($upBtn.parent().css("opacity"), "1", "Button container is now opaque.");
    });
    test("applies visibility style properties gained from a class attribute to the button container", 2, function() {
      $numberField.addClass("hiddenClass");
      equal($upBtn.parent().css("visibility"), "hidden", "Button container is now hidden.");
      $numberField.removeClass("hiddenClass");
      equal($upBtn.parent().css("visibility"), "visible", "Button container is now visible.");
    });
    test("applies visibility style properties gained from a style attribute to the button container", 2, function() {
      $numberField.css("visibility", "hidden");
      equal($upBtn.parent().css("visibility"), "hidden", "Button container is now hidden.");
      $numberField.css("visibility", "visible");
      equal($upBtn.parent().css("visibility"), "visible", "Button container is now visible.");
    });
    test("applies display style properties gained from a class attribute to the button container", 2, function() {
      $numberField.addClass("noneClass");
      equal($upBtn.parent().css("display"), "none", "Button container is now hidden.");
      $numberField.removeClass("noneClass");
      equal($upBtn.parent().css("display"), "inline-block", "Button container is now visible.");
    });
    test("applies display style properties gained from a style attribute to the button container", 2, function() {
      $numberField.css("display", "none");
      equal($upBtn.parent().css("display"), "none", "Button container is now hidden.");
      $numberField.css("display", "inline");
      equal($upBtn.parent().css("display"), "inline-block", "Button container is now visible.");
    });
    test("can be disabled", 4, function() {
      $numberField.val("1");
      $numberField.attr("disabled", "disabled");
      ui.mousewheelup($numberField);
      equal($numberField.val(), "1", "Value does not change with mousewheel up while disabled.");
      ui.mousewheeldown($numberField);
      equal($numberField.val(), "1", "Value does not change with mousewheel down while disabled.");
      ui.click($upBtn);
      equal($numberField.val(), "1", "Value does not change from clicking the up button while disabled.");
      ui.click($downBtn);
      equal($numberField.val(), "1", "Value does not change from clicking the down button while disabled.");
    });
    test("constrains values with the step attribute", 3, function() {
      $numberField.attr("step", "5");
      ui.typeIn($numberField, "40");
      equal($numberField.val(), "40", "Does not change value when in step.");
      ui.typeIn($numberField, "42");
      equal($numberField.val(), "40", "Rounds down to the nearest value in step.");
      ui.typeIn($numberField, "43");
      equal($numberField.val(), "45", "Rounds up to the nearest value in step.");
    });
    test("can use fractional steps", function() {
      var i, rounded, vals, _i, _len, _ref;
      $numberField.attr("step", "0.05");
      _ref = {
        "-10": ["-10", "-9.99", "-9.98", "-9.976"],
        "-9.95": ["-9.975", "-9.97", "-9.96", "-9.95", "-9.94", "-9.93", "-9.926"],
        "-0.05": ["-0.075", "-0.06", "-0.05", "-0.04", "-0.03", "-0.026"],
        "0": ["-0.025", "-0.02", "-0.01", "0", "0.01", "0.02", "0.024"],
        "0.05": ["0.025", "0.03", "0.04", "0.05", "0.06", "0.07", "0.074"],
        "9.95": ["9.925", "9.93", "9.94", "9.95", "9.96", "9.97", "9.974"],
        "10": ["9.975", "9.98", "9.99", "10"]
      };
      for (rounded in _ref) {
        vals = _ref[rounded];
        for (_i = 0, _len = vals.length; _i < _len; _i++) {
          i = vals[_i];
          ui.typeIn($numberField, i);
          equal($numberField.val(), rounded, "" + i + " gets rounded to " + rounded + ".");
        }
      }
    });
    test("can use fractional steps with a min attribute", function() {
      var i, rounded, vals, _i, _len, _ref;
      $numberField.attr("step", "0.05");
      $numberField.attr("min", "0.02");
      _ref = {
        "0.02": ["-10", "-5.43", "0", "0.01", "0.02", "0.03", "0.04", "0.044"],
        "0.07": ["0.045", "0.05", "0.06", "0.07", "0.08", "0.09", "0.094"],
        "0.12": ["0.095", "0.1", "0.11", "0.12", "0.13", "0.14", "0.144"],
        "9.97": ["9.945", "9.95", "9.96", "9.97", "9.98", "9.99", "9.994"],
        "10.02": ["9.995", "10", "10.01", "10.02"]
      };
      for (rounded in _ref) {
        vals = _ref[rounded];
        for (_i = 0, _len = vals.length; _i < _len; _i++) {
          i = vals[_i];
          ui.typeIn($numberField, i);
          equal($numberField.val(), rounded, "" + i + " gets rounded to " + rounded + ".");
        }
      }
    });
    test("increments the value on mousewheel up with an integer step", 10, function() {
      var i, _i;
      $numberField.attr("step", "2");
      ui.typeIn($numberField, "-10");
      for (i = _i = -8; _i <= 10; i = _i += 2) {
        ui.mousewheelup($numberField);
        equal($numberField.val(), i.toString(), "Increments value to " + i + ".");
      }
    });
    test("increments the value on mousewheel up with a fractional step", 21, function() {
      var i, _i, _len, _ref;
      $numberField.attr("step", "0.001");
      ui.typeIn($numberField, "-0.01");
      equal($numberField.val(), "-0.01", "Value starts at -0.01.");
      _ref = ["-0.009", "-0.008", "-0.007", "-0.006", "-0.005", "-0.004", "-0.003", "-0.002", "-0.001", "0", "0.001", "0.002", "0.003", "0.004", "0.005", "0.006", "0.007", "0.008", "0.009", "0.01"];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        ui.mousewheelup($numberField);
        equal($numberField.val(), i, "Increments value to " + i + ".");
      }
    });
    test("decrements the value on mousewheel down with an integer step", 10, function() {
      var i, _i;
      $numberField.attr("step", "2");
      ui.typeIn($numberField, "10");
      for (i = _i = 8; _i >= -10; i = _i += -2) {
        ui.mousewheeldown($numberField);
        equal($numberField.val(), i.toString(), "Decrements value to " + i + ".");
      }
    });
    test("decrements the value on mousewheel down with a fractional step", 21, function() {
      var i, _i, _len, _ref;
      $numberField.attr("step", "0.001");
      ui.typeIn($numberField, "0.01");
      equal($numberField.val(), "0.01", "Value starts at 0.01.");
      _ref = ["0.009", "0.008", "0.007", "0.006", "0.005", "0.004", "0.003", "0.002", "0.001", "0", "-0.001", "-0.002", "-0.003", "-0.004", "-0.005", "-0.006", "-0.007", "-0.008", "-0.009", "-0.01"];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        ui.mousewheeldown($numberField);
        equal($numberField.val(), i, "Decrements value to " + i + ".");
      }
    });
    module("upBtn");
    test("increments the value when clicked", 21, function() {
      var i, _i, _len, _ref;
      $numberField.attr("step", "0.001");
      ui.typeIn($numberField, "-0.01");
      equal($numberField.val(), "-0.01", "Value starts at -0.01.");
      _ref = ["-0.009", "-0.008", "-0.007", "-0.006", "-0.005", "-0.004", "-0.003", "-0.002", "-0.001", "0", "0.001", "0.002", "0.003", "0.004", "0.005", "0.006", "0.007", "0.008", "0.009", "0.01"];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        ui.click($upBtn);
        equal($numberField.val(), i, "Increments value to " + i + ".");
      }
    });
    module("downBtn");
    test("decrements the value when clicked", 21, function() {
      var i, _i, _len, _ref;
      $numberField.attr("step", "0.001");
      ui.typeIn($numberField, "0.01");
      equal($numberField.val(), "0.01", "Value starts at 0.01.");
      _ref = ["0.009", "0.008", "0.007", "0.006", "0.005", "0.004", "0.003", "0.002", "0.001", "0", "-0.001", "-0.002", "-0.003", "-0.004", "-0.005", "-0.006", "-0.007", "-0.008", "-0.009", "-0.01"];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        ui.click($downBtn);
        equal($numberField.val(), i, "Decrements value to " + i + ".");
      }
    });
  })(jQuery);

}).call(this);
