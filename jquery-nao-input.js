(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS style for Browserify
		module.exports = factory;
	} else {
		// Browser globals
		factory(jQuery);
	}
}(
/**
 * @param {jQuery} $
 */
function($) {
	// disable drop open behavior
	$('html').on('dragover drop', function(e) { e.preventDefault() });
	
	$.fn.scrollbars = function(a,b,c) {
		if(window.isMobile || window.isTouch) {//} && window.isTouch) {
			switch(a) {
				case 'scrollTo':
					return this.scrollTop(b);
				// case 'update':
				// 	return this.mCustomScrollbar('update');
				case '':
					return this;
				default:
					console.log('SCROLLBARS: ',a,b,c)
					if(typeof a == 'object' && typeof b == 'undefined') {
						this.css('overflow', 'auto')
					}
					return this;
			}
		} else {
			return this.mCustomScrollbar(a,b,c);
		}
	}
	
	$.fn.mCustomScrollbarx = function(opt) {
		return this;
	}
	
	$.fn.naoInput = function(opt) {
		// console.log('RIPPLE :: ', this);
		var tag = 'div';
		var lsc = {
			theme: "minimal-dark",
			scrollInertia: 250,
			advanced: {
				autoScrollOnFocus: false,
				updateOnContentResize:true,
				updateOnImageLoad:true,
				updateOnSelectorChange:false,
				releaseDraggableSelectors:false,
			},
			keyboard: { enable: false },
			mouseWheel: {
				enable: true,
				scrollAmount: "auto",
				axis: "y",
				preventDefault: false,
				deltaFactor: "auto",
				normalizeDelta: false,
				invert: false,
				disableOver: ["datalist"]
			}
		};
		var stopProp = function(e) {
			// console.log('STOP '+ e.keyCode);
			if(e && e.preventDefault && e.keyCode && e.keyCode == 13) e.preventDefault();
			if(e && e.stopPropagation) e.stopPropagation();
		};
		var prevDeft = function(e) {
			// console.log('PREVENT ', e);
			if(e && e.preventDefault) e.preventDefault();
			if(e && e.stopPropagation) e.stopPropagation();
		};
		this.each( function( i, elm ) {
			var def = {
				label: '',
				attr: {},
				options: [],
			};
			def = $.extend(def, opt);
			let inEl = $(elm)//.find('input');
			var inID = inEl.attr('id') ? inEl.attr('id') : 'IN'+parseInt(Math.random()*1E10);
			var type = inEl.is('input') && inEl.attr('type') ? inEl.attr('type') : undefined;
			var plhl = inEl.attr('placeholder');
			var vval = inEl.attr('value');
			var llbl = inEl.attr('label');
			if(typeof plhl === 'string' && plhl.trim() !== '') {
				def.label = plhl;
				inEl.attr('placeholder', '');
			} else if(typeof llbl === 'string' && llbl.trim() !== '') {
				def.label = llbl;
				// inEl.attr('placeholder', '');
			} else {
				// def.label = '';
			}
			if(type == 'submit' || type == 'reset' || type == 'button') {
				inEl
					.addClass('input__field input__field--nao')
					.attr(def.attr)
				var wrap = $('<'+tag+'>')
					.addClass('nao-input input--nao--btn')
					.ripple({ duration: '2x' })
					.insertAfter(inEl)
					.prepend(inEl)
					.on('keyup keydown keypress', stopProp)
				return;
			}
			if(type == 'radio' || type == 'checkbox') {
				inEl
					.addClass('input__radio--nao')
					.attr(def.attr)
					.attr({
						id: inID,
					})
				var lbl1 = $('<label for="'+inID+'">').html(def.label)
				var labl = $('<label for="'+inID+'" class="ic">').html('').ripple({ type: 'icon-big' })
				var wrap = $('<'+tag+'>')
					.addClass('nao-input input--nao--radio')
					.append(lbl1)
					.append(labl)
					.insertAfter(inEl)
					.prepend(inEl)
					.on('keyup keydown keypress', stopProp)
				return;
			}
			if(type == 'file') {
				inEl
					.addClass('input__file--nao')
					.attr(def.attr)
					.attr({
						id: inID,
					})
					.on('change', function(e) {
						var txt = [], files = inEl[0].files;
						for(var f=0; f<files.length; f++) {
							txt.push(files[f].name);
						}
						if(files.length == 1) inam.text(files[0].name)
						else if(files.length > 1) inam.text(files.length+' files selected.')
						else inam.text('')
						// inam.text(txt.length == 0 ? labl : txt.join(', '))
					})
				var iccl = 'file', acpt = inEl.attr('accept'), labl = def.label;
				if(typeof acpt == 'undefined') {
					if(typeof inEl.attr('directory') !== 'undefined' || typeof inEl.attr('webkitdirectory') !== 'undefined') iccl = 'folder';
					else iccl = 'file';
				}
				else if(acpt.search(/image\/./) == 0) iccl = 'image';
				else if(acpt.search(/audio\/./) == 0) iccl = 'logo-itunes';
				else if(acpt.search(/video\/./) == 0) iccl = 'video';
				var inam = $('<span>')
				var ilbl = $('<span>')
					.html(labl)
				var lbl1 = $('<label for="'+inID+'">')
					.prepend($('<span class="ic ic-'+iccl+'"></span>').ripple({ type: 'icon-big' }))
					.append(ilbl)
					.append(inam)
					// .ripple({ duration: '2x' })
					// .on('drop', function(e) {
					// 	inEl[0].files = e.originalEvent.dataTransfer.files;
					// 	inEl.trigger('change')
					// 	e.preventDefault();
					// })
				var wrap = $('<'+tag+'>')
					.addClass('nao-input input--nao--file')
					.append(lbl1)
					.insertAfter(inEl)
					.prepend(inEl)
					.on('keyup keydown keypress', stopProp)
				return;
			}
			if(type == 'number') {
				inEl
					.addClass('input__num--nao')
					.attr(def.attr)
					.on('input', function(e) {
						// console.log('INPUT >>');
						valu.text(inEl[0].value);
					})
				var labl = $('<span>')
					.text(def.label)
				var valu = $('<span>')
					.text(inEl[0].value)
				var btn1 = $('<button>')
					.addClass('ic ic-arrow-angle-left')
					.ripple()
					.attr('title', 'Decriment')
					.click(function(e) {
						e.preventDefault();
						inEl[0].stepDown();
						valu.text(inEl[0].value);
					})
				var btn2 = $('<button>')
					.addClass('ic ic-arrow-angle-right')
					.ripple()
					.attr('title', 'Increment')
					.click(function(e) {
						e.preventDefault();
						inEl[0].stepUp();
						valu.text(inEl[0].value);
					})
				var wrap = $('<'+tag+'>')
					.addClass('nao-input input--nao--num')
					.insertAfter(inEl)
					.prepend(inEl)
					.prepend(labl)
					.prepend(btn1)
					.append(valu)
					.append(btn2)
					.on('keyup keydown keypress', stopProp)
				return;
			}
			if(type == 'range') {
				inEl
					.addClass('input__range--nao')
					.attr(def.attr)
					.attr({
						id: inID,
					})
					.on('input change', function(e) {
						// console.log('INPUT >>');
						let valu = inEl.val()
						if(!sliding) {
							sldr.slider('value', valu).find('span.ui-slider-handle').attr('title', valu);
							cntr.html('<span value="'+valu+'"></span>');
							lbl2.attr('value', valu);
						}
					})
				var min = parseFloat(inEl.attr('min')), 
					max = parseFloat(inEl.attr('max')), 
					step = parseFloat(inEl.attr('step')),
					value = parseFloat(inEl.attr('value')),
					orient = inEl.attr('data-orientation'),
					sliding = false;
				// console.log(min, max, step);
				var cntr = $('<span>')
					.addClass('ui-slider-counter')
				var lbl1 = $('<div>')
					.addClass('nao-label')
					.html('<span>'+def.label+'</span>')
				var lbl2 = $('<span>')
					.addClass('nao-range-value')
					.attr('unit', inEl.attr('unit') || '')
					.attr('value', value)
					.appendTo(lbl1)
				var sldr = $('<div>')
					.addClass('nao-slider')
					.slider({
						min: Number.isNaN(min) ? 0 : min,
						max: Number.isNaN(max) ? 100 : max,
						step: Number.isNaN(step) ? 0.001 : step,
						value: Number.isNaN(value) ? 0 : value,
						animate: 'fast',
						orientation: orient === 'vertical' ? orient : 'horizontal',
						create: function(e, ui) {
							// console.log(sldr);
							var valu = Number.isNaN(value) ? $(this).slider('value') : value;
							var hndl = $(this).find('span.ui-slider-handle')
								.attr('title', valu)
								.append(cntr.html('<span value="'+valu+'"></span>'))
							lbl2.attr('value', valu)
						},
						slide: function(e, ui) {
							// var val = sldr.slider('value')
							var valu = ui.value;
							// console.log(val)
							inEl.val(valu).trigger('input');
							$(this).find('span.ui-slider-handle').attr('title', valu);
							cntr.html('<span value="'+valu+'"></span>');
							lbl2.attr('value', valu);
						},
						start: function(e, ui) {
							if(!sliding) inEl.trigger('focus', e).trigger('refocus', e)
							sliding = true;
						},
						stop: function(e, ui) {
							inEl.trigger('change', e)
							sliding = false;
						},
					})
				var wrap = $('<'+tag+'>')
					.addClass('nao-input input--nao--range')
					.append(lbl1)
					.append(sldr)
					.insertAfter(inEl)
					.prepend(inEl)
					.on('keyup keydown keypress', stopProp)
				return;
			}
			if(type == 'time') {
				var isPickerOpen = false;
				var bindSelection = $([]);
				var hidePikr = function(e) {
					isPickerOpen = false;
					wrap.removeClass('open');
					$(window).off('mousedown', blurPikr)//.unbind('mousedown', blurPikr);
					bindSelection.off('focus', blurPikr)//.unbind('focus', blurPikr);
					// $('a, input, textarea, button, select, [tabindex]').not(wrap.parents().add(wrap.children()).add(wrap)).unbind('focus', blurPikr);
				}
				var showPikr = function(e) {
					isPickerOpen = true;
					wrap.addClass('open');
					$(window).on('mousedown', blurPikr)//.bind('mousedown', blurPikr);
					bindSelection = $('a, input, textarea, button, select, [tabindex]').not(wrap.parents().add(wrap.children()).add(wrap)).on('focus', blurPikr)//.bind('focus', blurPikr);
				}
				var togglePicker = function(e) {
					// e.stopPropagation();
					// e.preventDefault();
					if(e && e.preventDefault) e.preventDefault();
					if(isPickerOpen) {
						hidePikr(e);
					} else {
						showPikr(e);
					}
				}
				var blurPikr = function(e) {
					// var pa = $(e.target).parents(); // $(e.originalEvent.path)
					// var hs = pa.filter(wrap)
					// if(hs.length == 0) togglePicker(e);
					var hs = $(e.originalEvent.target).parentsUntil('body').index(wrap)
					if(hs < 0) hidePikr(e)//togglePicker(e);
				}
				var valToStr = function(val) {
					var dtt = val.split(':');
					return dtt.join(':');
				}
				var setPicker = function(val) {
					var dtt = val.split(':').map(function(v) { return parseInt(v); }), dpk = $(pikr);
					var h = dtt[0] <= 12 && dtt[0] > 0 ? dtt[0] : (dtt[0] == 0 ? 12 : dtt[0]%12);
					labl.html([h<10 ? '0'+h : h, ':', dtt[1]<10 ? '0'+dtt[1] : dtt[1], dtt[0] < 12 ? 'AM' : 'PM'].join(' '));
					// dpk.prop('selected').h = Number(dtt[0]);
					// dpk.prop('selected').m = Number(dtt[1]);
					// dpk.prop('selected').s = 0;
				}
				var resetPicker = function(val) {
					inEl.val(null)
					labl.html('')
					hrct.html('')
					mnct.html('')
					var dpk = $(pikr);
					// dpk.prop('selected').h = 0;
					// dpk.prop('selected').m = 0;
					// dpk.prop('selected').s = 0;
				}
				var incdecTime = function(val, inc, lim, nonzero) {
					var zro = nonzero ? 1 : 0;
					var ret = 0;
					lim = parseInt(lim)+zro;
					val = parseInt(val)%lim;
					inc = parseInt(inc)%lim;
					if(Number.isNaN(val)) val = zro;
					if(val+inc >= lim) ret = (zro+inc-1)%lim;
					else if(val+inc < zro) ret = (lim+inc)%lim;
					else ret = (val+inc)%lim;
					return (ret < 10) ? '0'+ret : ''+ret;
				}
				var incdecValu = function(hinc, minc) {
					hrct.text(incdecTime(hrct.text().trim() , hinc, 12, true));
					mnct.text(incdecTime(mnct.text().trim(), minc, 60));
					setTime();
				}
				var setTime = function() {
					var h = parseInt(hrct.text());
					var m = parseInt(mnct.text());
					var p = (apct.text().trim() === 'AM' ? false : true); // if its PM
					if(Number.isNaN(h)) h = 12;
					if(Number.isNaN(m)) m = 0;
					h = p ? 12+h%12 : h%12
					var v = [(h < 10 ? '0'+h : h), (m < 10 ? '0'+m : m), '00'].join(':');
					setPicker(v);
					// console.log(v);
					inEl.val(v);
				}
				var setValues = function(val) {
					setPicker(val);
					var dtt = val.split(':').map(function(v) { return parseInt(v); }), dpk = $(pikr);
					var h = dtt[0] <= 12 && dtt[0] > 0 ? dtt[0] : (dtt[0] == 0 ? 12 : dtt[0]%12);
					var t = [h<10 ? '0'+h : h, dtt[1]<10 ? '0'+dtt[1] : dtt[1], dtt[0] < 12 ? 'AM' : 'PM'];
					hrct.text(t[0]);
					mnct.text(t[1]);
					apct.text(t[2]);
				}
				inEl
					.addClass('input__date--nao')
					.attr(def.attr)
					.attr({
						id: inID,
					})
					.on('input', function(e) {
						// console.log('CHNG', inEl.val());
					})
					.on('change', function(e) {
						// console.log('INPUT >>');
						if(isPickerOpen) hidePikr(e);
						setValues(inEl.val())
					})
				var valu = inEl.val() || inEl.attr('value');
				var labl = $('<button>')
					.addClass('nao-label')
					// .attr('tabindex','')
					// .html(def.label)
					.attr('label', def.label)
					.html(valToStr(valu))
					.click(togglePicker)
					// .focus(togglePicker)
				var crss = $('<span>')
					.addClass('ic ic-cross')
					.click(resetPicker)
				var pikr = $('<div>')
					.addClass('nao-date')
					.addClass('nao-time')
				// date specific
				var wtch = $('<div>')
					.appendTo(pikr)
					// .append()
				var hrct = $('<div>')
					.html('')
				var hrup = $('<button>')
					.addClass('ic ic-arrow-angle-up')
					.ripple()
					.click(function(e) {
						e.preventDefault();
						incdecValu(1, 0);
					})
				var hrdw = $('<button>')
					.addClass('ic ic-arrow-angle-down')
					.ripple()
					.click(function(e) {
						e.preventDefault();
						incdecValu(-1, 0);
					})
				var hrwp = $('<div>')
					.addClass('time-strip')
					.appendTo(wtch)
					.append(hrup)
					.append(hrct)
					.append(hrdw)
				var mnct = $('<div>')
					.html('')
				var mnup = $('<button>')
					.addClass('ic ic-arrow-angle-up')
					.ripple()
					.click(function(e) {
						e.preventDefault();
						incdecValu(0, 1);
					})
				var mndw = $('<button>')
					.addClass('ic ic-arrow-angle-down')
					.ripple()
					.click(function(e) {
						e.preventDefault();
						incdecValu(0, -1);
					})
				var mnwp = $('<div>')
					.addClass('time-strip')
					.appendTo(wtch)
					.append(mnup)
					.append(mnct)
					.append(mndw)
				var apct = $('<button>')
					.addClass('ampm')
					.html('AM')
					.ripple()
					.click(function(e) {
						e.preventDefault();
						apct.text(apct.text().trim() === 'AM' ? 'PM' : 'AM');
						incdecValu(0, 0);
						setTime();
					})
				var apwp = $('<div>')
					.addClass('time-strip')
					.appendTo(wtch)
					.append('<div>&nbsp;</div>')
					.append(apct)
					.append('<div>&nbsp;</div>')
				if(typeof valu === 'string' && valu.split(':').length === 3) setValues(valu);
				var wrap = $('<'+tag+'>')
					.addClass('nao-input input--nao--date')
					// .append(lbl1)
					.append(labl)
					.append(crss)
					.append(pikr)
					.insertAfter(inEl)
					.prepend(inEl)
					.on('keyup keydown keypress', stopProp)
				return;
			}
			if(type == 'date') {
				var weekDays = 'Sun Mon Tue Wed Thu Fri Sat'.split(' ');
				var yearMonths = 'January February March April May June July August September October November December'.split(' ');
				var yearMonthsShort = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');
				var isPickerOpen = false;
				var bindSelection = $([]);
				var hidePikr = function(e) {
					isPickerOpen = false;
					wrap.removeClass('open');
					$(window).off('mousedown', blurPikr)//.unbind('mousedown', blurPikr);
					bindSelection.off('focus', blurPikr)//.unbind('focus', blurPikr);
					// $('a, input, textarea, button, select, [tabindex]').not(wrap.parents().add(wrap.children()).add(wrap)).unbind('focus', blurPikr);
				}
				var showPikr = function(e) {
					isPickerOpen = true;
					wrap.addClass('open');
					$(window).on('mousedown', blurPikr)//.bind('mousedown', blurPikr);
					bindSelection = $('a, input, textarea, button, select, [tabindex]').not(wrap.parents().add(wrap.children()).add(wrap)).on('focus', blurPikr)//.bind('focus', blurPikr);
				}
				var togglePicker = function(e) {
					// e.stopPropagation();
					// e.preventDefault();
					if(e && e.preventDefault) e.preventDefault();
					if(isPickerOpen) {
						hidePikr(e);
					} else {
						showPikr(e);
					}
				}
				var blurPikr = function(e) {
					// var pa = $(e.target).parents(); // $(e.originalEvent.path)
					// var hs = pa.filter(wrap)
					// if(hs.length == 0) togglePicker(e);
					var hs = $(e.originalEvent.target).parentsUntil('body').index(wrap)
					if(hs < 0) hidePikr(e)//togglePicker(e);
				}
				var valToStr = function(val) {
					var dtt = val.split('-');
					return [dtt[2], yearMonths[dtt[1]*1-1], dtt[0]].join(' ');
				}
				var setPicker = function(val) {
					var dtt = val.split('-'), dpk = $(pikr);
					labl.html([dtt[2], yearMonths[dtt[1]*1-1], dtt[0]].join(' '));
					dpk.prop('selected').y = Number(dtt[0]);
					dpk.prop('selected').m = Number(dtt[1]);
					dpk.prop('selected').d = Number(dtt[2]);
				}
				var resetPicker = function(val) {
					inEl.val(null)
					labl.html('')
					pikr.find('td.active').removeClass('active')
					$(pikr).prop('selected').d = 0;
				}
				inEl
					.addClass('input__date--nao')
					.attr(def.attr)
					.attr({
						id: inID,
					})
					.on('input', function(e) {
						// console.log('CHNG', inEl.val());
					})
					.on('change', function(e) {
						// console.log('INPUT >>');
						if(isPickerOpen) hidePikr(e);
						setPicker(inEl.val())
					})
				var valu = inEl.val() || inEl.attr('value');
				var labl = $('<button>')
					.addClass('nao-label')
					// .attr('tabindex','')
					// .html(def.label)
					.attr('label', def.label)
					.html(valToStr(valu))
					.click(togglePicker)
				var lbl1 = $('<button>')
					.addClass('nao-label')
					// .attr('tabindex','')
					.html(valToStr(valu))
					.click(togglePicker)
				// if(lbl2.html().trim() === '') lbl2.html('No date selected')
				var crss = $('<span>')
					.addClass('ic ic-cross')
					.click(resetPicker)
				var pikr = $('<div>')
					.addClass('nao-date')
				// cut code to calender
					.calendar({
						autoSelect: true,
						select: function(date) {
							// console.log(date);
							var arr = [
								date.getFullYear(),
								date.getMonth() < 9 ? '0'+(date.getMonth()+1) : date.getMonth()+1,
								date.getDate() < 10 ? '0'+date.getDate() : date.getDate()
							];
							var ymd = arr.join('-')
							var dmy = [arr[2], yearMonths[arr[1]-1], arr[0]].join(' ')
							// console.log(ymd);
							inEl.val(ymd)
							labl.html(dmy)
						},
						toggle: function(y, m) {
							// console.log(y, m);
							var sel = $(this).prop('selected')
							// console.log(sel);
						},
					})
				// var cldr = $('<div>')
				// 	.appendTo(dpkr)
				if(typeof valu === 'string' && valu.split('-').length === 3) setPicker(valu);
				var wrap = $('<'+tag+'>')
					.addClass('nao-input input--nao--date')
					// .append(lbl1)
					.append(labl)
					.append(crss)
					.append(pikr)
					.insertAfter(inEl)
					.prepend(inEl)
					.on('keyup keydown keypress', stopProp)
				return;
			}
			if(type == 'combobox' || inEl.is('input') && def.options.length > 0) {
				var currIndx = -1;
				var inpTmOut = 0;
				var isPickerOpen = false;
				var isScrollInit = false;
				var bindSelection = $([]);
				var hidePikr = function(e) {
					// console.log('combobox > hidePikr >> ', e);
					isPickerOpen = false;
					if(e) e.stopPropagation();
					wrap.removeClass('cs-active');
					// inEl.blur();
					$(window).off('mousedown', blurPikr)//.unbind('mousedown', blurPikr);
					bindSelection.off('focus', blurPikr)//.unbind('focus', blurPikr);
					// $('a, input, textarea, button, select, [tabindex]').not(wrap.parents().add(wrap.children()).add(wrap)).unbind('focus', blurPikr);
					lswp.find('.mCustomScrollBox').removeAttr('tabindex')
				}
				var showPikr = function(e) {
					// console.log('combobox > showPikr >> ', e);
					isPickerOpen = true;
					if(e) e.stopPropagation();
					if(!isScrollInit) isScrollInit = lswp.scrollbars(lsc)
					else lswp.scrollbars('scrollTo', 0)//.scrollbars("disable",true).scrollbars('update')
					wrap.addClass('cs-active');
					// inEl.focus();
					$(window).on('mousedown', blurPikr)//.bind('mousedown', blurPikr);
					bindSelection = $('a, input, textarea, button, select, [tabindex]').not(wrap.parents().add(wrap.children()).add(wrap)).on('focus', blurPikr)//.bind('focus', blurPikr);
					lswp.find('.mCustomScrollBox').removeAttr('tabindex')
				}
				var togglePicker = function(e) {
					// console.log('combobox > togglePicker >> '+isPickerOpen, e);
					e.stopPropagation();
					if(isPickerOpen) {
						hidePikr(e);
					} else {
						showPikr(e);
					}
				}
				var blurPikr = function(e) {
					// console.log('combobox > blurPikr >> ', e);
					// e.stopPropagation();
					// if(typeof e !== 'object') return togglePicker(e);
					// var hs = $(e.originalEvent.path).filter(wrap)
					// if(hs.length === 0) togglePicker(e);
					var hs = $(e.originalEvent.target).parentsUntil('body').index(wrap)
					if(hs < 0) hidePikr(e)//togglePicker(e);
				}
				var focusInput = function(e) {
					// console.log('combobox > focusInput >> ', e);
					e.stopPropagation();
					if(isPickerOpen) return;
					else showPikr(e);
					takeInput(e)
				}
				var takeInput = function(e) {
					// console.log('combobox > takeInput >> ', e);
					var foc = list.children('li.cs-focus')
					// console.log(e);
					if(foc.length == 1 && e.originalEvent && e.originalEvent.data == " ") {
						foc.trigger('click');
						inEl.blur();
					}
					foc.removeClass('cs-focus')
					var val = inEl.val().trim();
					if(val == '') return list.removeClass('empty').children('li').addClass('visible');
					var exp = new RegExp(val.split(/[\W\s]+/g).join('.+?'), 'g');
					var add = [], rem = [];
					var lis = list.children('li').each(function(i,v) {
						var $v = $(v), mat = $v.text().match(exp)
						if(mat !== null) add.push(v)
						else rem.push(v)
					})
					// console.log(add, rem);
					currIndx = -1;
					$(rem).removeClass('visible')
					$(add).addClass('visible')
					clearTimeout(inpTmOut);
					inpTmOut = setTimeout(function() {
						lswp.find('.mCustomScrollBox').removeAttr('tabindex')
					}, 500);
					if(add.length == 0) list.addClass('empty')
					else list.removeClass('empty')
				}
				inEl
					.addClass('input__field input__combobox--nao')
					.attr(def.attr)
					.attr('placeholder', def.label)
					.focus(focusInput)
					.click(focusInput)
					.on('input', takeInput)
				if(type == 'combobox') inEl.attr('type', 'text');
				var wrap = $('<'+tag+'>')
					.addClass('nao-input cs-select cs-skin-elastic input--nao--combobox')
					.insertAfter(inEl)
					.prepend(inEl)
					.on('keyup keydown keypress', function(e) {
						if(e && e.type == 'keyup' && e.keyCode == 13) {
							var foc = list.children('li.cs-focus')
							if(foc.length == 1) {
								foc.trigger('click');
								inEl.blur();
							}
						}
					})
					.blur(function(e) {
						// if(selc._isOpen()) selc._toggleSelect()
					})
					.keydown(function(e) {
						// console.log(e.keyCode);
						// inEl.parent().next()
						if(e.keyCode == 38 || e.keyCode == 40) {
							e.preventDefault();
							list.children('li.cs-focus').removeClass('cs-focus')
							var visb = list.children('li.visible')
							currIndx += (e.keyCode == 38) ? -1 : 1
							if(currIndx < 0) currIndx = 0;
							if(currIndx > visb.length-1) currIndx = visb.length-1;
							var currItem = $(visb[currIndx]).addClass('cs-focus')
							lswp.scrollbars('scrollTo', currItem[0].offsetTop)
						}
					})
					// .attr('tabindex', 0)
					// .blur(function(e) {
					// 	// debugger
					// 	if(isPickerOpen) hidePikr(e);
					// })
					.on('keyup keydown keypress', stopProp)
				var phol = $('<span>')
					.addClass('cs-placeholder')
					.attr('placeholder', def.label)
					.insertAfter(inEl)
					.prepend(inEl)
					// .on('click mouseup mousedown focus blur', function(e) {
					// 	e.stopPropagation();
					// })
					.on('click', function(e) {
						// console.log('combobox > phol.click >> ', e);
						togglePicker(e)
						if(isPickerOpen && !inEl.is(':focus')) {
							inEl.focus()
							takeInput(e)
						}
					})
				var lswp = $('<div>')
					.addClass('cs-options')
					.insertAfter(phol)
				var list = $('<ul>')
					.appendTo(lswp)
				var opts = def.options;
				for(var i=0; i<opts.length; i++) {
					// var li = $('<li>')
					// 	.html('<span>'+opts[i]+'</span>')
					// 	.click()
					list.append('<li class="combobox-option"><span>'+opts[i]+'</span></li>')
				}
				// inEl.parent().next()
				// lswp.scrollbars(sop)
					// .find('.mCustomScrollBox').removeAttr('tabindex')
				setTimeout(function() {
					lswp.find('.mCustomScrollBox').removeAttr('tabindex')
					// console.log('TIME_OUT', lswp.find('.mCustomScrollBox'));
				}, 1000);
				// inEl.parent().parent()
				// inEl.parent().next()
				list.find('li')
					.ripple()
					// .on('mousedown', function(e) {
					// 	inEl.val($(e.target).text().trim())
					// })
					.on('click', function(e) {
						// console.log('combobox > list.click >> ', e);
						inEl.val($(e.target).text().trim())
						togglePicker(e);
					})
				return;
			}
			if(inEl.is('select')) {
				/* 
				let selc = new SelectFx(elm);
				// console.log(inEl.prev());
				inEl.prev()
					.scrollbars({
						theme: "minimal-dark",
						scrollInertia: 250,
					})
					.find('.mCustomScrollBox').removeAttr('tabindex')
				inEl.parent()
					.attr('class', 'nao-input cs-select cs-skin-elastic')
					.blur(function(e) {
						if(selc._isOpen()) selc._toggleSelect()
					})
				inEl.prev().find('li').ripple();
				return;
				// */
				
				var currIndx = -1;
				var inpTmOut = 0;
				var isPickerOpen = false;
				var isScrollInit = false;
				var bindSelection = $([]);
				var hidePikr = function(e) {
					// console.log('combobox > hidePikr >> ', e);
					isPickerOpen = false;
					if(e) e.stopPropagation();
					wrap.removeClass('cs-active');
					$(window).off('mousedown', blurPikr)//.unbind('mousedown', blurPikr);
					bindSelection.off('focus', blurPikr)//.unbind('focus', blurPikr);
					// $('a, input, textarea, button, select, [tabindex]').not(wrap.parents().add(wrap.children()).add(wrap)).unbind('focus', blurPikr);
					lswp.find('.mCustomScrollBox').removeAttr('tabindex')
				}
				var showPikr = function(e) {
					// console.log('combobox > showPikr >> ', e);
					isPickerOpen = true;
					if(e) e.stopPropagation();
					// currIndx = -1;
					// list.children('li.cs-focus').removeClass('cs-focus')
					if(!isScrollInit) isScrollInit = lswp.scrollbars(lsc)
					wrap.addClass('cs-active');
					$(window).on('mousedown', blurPikr)//.bind('mousedown', blurPikr);
					bindSelection = $('a, input, textarea, button, select, [tabindex]').not(wrap.parents().add(wrap.children()).add(wrap)).on('focus', blurPikr)//.bind('focus', blurPikr);
					lswp.find('.mCustomScrollBox').removeAttr('tabindex')
					var visb = list.children('li')
					var currItem = $(visb[currIndx]).addClass('cs-focus');
					lswp.scrollbars('scrollTo', currItem[0].offsetTop, { scrollInertia: 0 });
				}
				var togglePicker = function(e) {
					// console.log('combobox > togglePicker >> '+isPickerOpen, e);
					// e.stopPropagation();
					if(isPickerOpen) {
						hidePikr(e);
					} else {
						showPikr(e);
					}
				}
				var blurPikr = function(e) {
					// console.log('combobox > blurPikr >> ', e);
					// var hs = $(e.originalEvent.path).filter(wrap)
					// if(hs.length === 0) hidePikr(e)//togglePicker(e);
					var hs = $(e.originalEvent.target).parentsUntil('body').index(wrap)
					if(hs < 0) hidePikr(e)//togglePicker(e);
				}
				var focusInput = function(e) {
					// console.log('combobox > focusInput >> ', e);
					e.stopPropagation();
					if(isPickerOpen) return;
					else showPikr(e);
				}
				var selectItem = function(e) {
					// console.log('combobox > selectItem >> ', e);
					if(e && e.stopPropagation) e.stopPropagation();
					var $tar = $(this), vlue = $tar.attr('value')
					$tar.addClass('cs-selected cs-focus').attr('selected', 'selected').siblings('.cs-selected, .cs-focus').removeClass('cs-selected cs-focus').removeAttr('selected')
					inEl.find('[value="'+vlue+'"]').first().attr('selected', true).siblings('[selected]').removeAttr('selected')
					inEl.val(vlue)
					phol.html($tar.text())
					currIndx = list.children('li').index($tar);
					inEl.trigger('input', { isForcedAction: true }).trigger('change', { isForcedAction: true });
					if(isPickerOpen) hidePikr(e);
				}
				inEl
					.addClass('input__field input__combobox--nao')
					.attr(def.attr)
					.attr('placeholder', def.label)
					.on('input change', function(e,d) {
						// console.log('NAO CHANNGE', d)
						if(d && d.isForcedAction) return;
						var vlue = inEl.val();
						// list.find('[value="'+vlue+'"]').first().click(e)
						console.log(list.find('[value="'+vlue+'"]').first());
						var targ = list.find('[value="'+vlue+'"]').first();
						if(targ.length > 0) selectItem.bind(targ[0])();
					})
					.focus(function(e) {
						e.preventDefault()
					})
				var wrap = $('<'+tag+'>')
					.attr('tabindex', 0)
					.addClass('nao-input cs-select cs-skin-elastic input--nao--select')
					.insertAfter(inEl)
					.prepend(inEl)
					.on('keyup keydown keypress', function(e) {
						// console.log('combobox > wrap.keys >> ', e);
						if(e && ((e.type == 'keyup' && e.keyCode == 13) || (e.type == 'keydown' && e.keyCode == 32))) {
							e.preventDefault();
							if(!isPickerOpen) return showPikr(e);
							var foc = list.children('li.cs-focus')
							if(foc.length == 1) selectItem.bind(foc[0])();
						}
					})
					.on('keyup keydown keypress', stopProp)
					// .focus(function(e) {
					// 	inEl.trigger('focus', e)
					// })
					.blur(function(e) {
						// if(isPickerOpen) hidePikr(e)
					})
					.keydown(function(e) {
						// console.log('combobox > wrap.keydown >> ', e);
						if(e.keyCode == 38 || e.keyCode == 40) {
							e.preventDefault();
							list.children('li.cs-focus').removeClass('cs-focus')
							var visb = list.children('li')
							currIndx += (e.keyCode == 38) ? -1 : 1
							if(currIndx < 0) currIndx = 0;
							if(currIndx > visb.length-1) currIndx = visb.length-1;
							var currItem = $(visb[currIndx]).addClass('cs-focus');
							lswp.scrollbars('scrollTo', currItem[0].offsetTop);
							if(!isPickerOpen) selectItem.bind(currItem[0])();
						}
					})
				var phol = $('<span>')
					// .attr('tabindex', 0)
					.attr('placeholder', def.label)
					.addClass('cs-placeholder')
					.insertAfter(inEl)
					.on('click', function(e) {
						// console.log('combobox > wrap.click >> ', e);
						// if(e.type == 'click' || (e.type == 'keypress' && e.keyCode == 32) || (e.type == 'keydown' && e.keyCode == 13)) {
							e.stopPropagation();
							e.preventDefault();
							inEl.trigger('focus', e)
							togglePicker(e)
						// }
					})
				var lswp = $('<div>')
					.addClass('cs-options')
					.insertAfter(phol)
				var list = $('<ul>')
					.appendTo(lswp)
				var opts = def.options;
				if(Array.isArray(def.options) && def.options.length > 0) {
					// for(var i=0; i<opts.length; i++) {
					// 	list.append('<li class="combobox-option"><span>'+opts[i]+'</span></li>')
					// }
					var data = def.options;
					inEl.empty();
					data.forEach(function(v) {
						var slct =  typeof v == 'object' && v.selected == true;
						$('<li>')
							.attr('value', typeof v == 'object' ? v.value : v)
							.attr('class', typeof v == 'object' && v.class ? v.class : '')
							.attr('selected', slct ? 'selected' : '')
							.addClass(slct ? 'cs-selected' : '')
							// .addClass('combobox-option')
							.append('<span>'+(typeof v == 'object' ? v.text : v)+'</span>')
							.appendTo(list)
						$('<option>')
							.html(typeof v == 'object' ? v.text : v)
							.attr('value', typeof v == 'object' ? v.value : v)
							.attr('data-class', typeof v == 'object' && v.class ? v.class : '')
							.appendTo(inEl)
					});
					// console.log(inp);
				} else {
					// console.log('NO DATA');
					inEl.find('option').each(function(i,v) {
						var $v = $(v),
							text = $v.html().trim(),
							clas = $v.attr('data-class'),
							vlue = $v.attr('value'),
							slct = $v.attr('selected') && ($v.attr('selected') == 'selected' || $v.attr('selected') == 'true') ? true : false;
						var $l = $('<li>')
							.attr('value', vlue ? vlue : '')
							.attr('class', clas ? clas : '')
							// .attr('selected', slct ? 'selected' : '')
							// .addClass(slct ? 'cs-selected' : '')
							// .addClass('combobox-option')
							.append('<span>'+(text != '' ? text : (vlue ? vlue : ''))+'</span>')
							.appendTo(list)
						if(slct) $l.attr('selected', 'selected').addClass('cs-selected')
					})
				}
				list.children('li[selected=""]').removeAttr('selected')
				var valu = inEl.attr('value');
				if(valu && inEl.find('[value="'+valu+'"]').length > 0) {
					list.find('[value="'+valu+'"]').first().addClass('cs-selected').attr('selected', 'selected').siblings('.cs-selected').removeClass('cs-selected').removeAttr('selected')
					inEl.find('[value="'+valu+'"]').first().attr('selected', true).siblings('[selected]').removeAttr('selected')
				} else {
					inEl.removeAttr('value')
				}
				// lswp.scrollbars(sop)
					// .find('.mCustomScrollBox').removeAttr('tabindex')
				setTimeout(function() {
					lswp.find('.mCustomScrollBox').removeAttr('tabindex')
					// console.log('TIME_OUT', lswp.find('.mCustomScrollBox'));
				}, 1000);
				
				list.children('li')
					.ripple()
					.on('click', selectItem)//.bind('click', selectItem)
					// .bind('click', function(e) { selectItem.bind(e.currentTarget)(e) })
				list.children('li[selected="selected"]').click()
				return;
			}
			if(inEl.is('textarea')) {
				inEl
					.attr(def.attr)
					.addClass(inEl.val() === '' ? 'input__area--nao empty' : 'input__area--nao')
					// .scrollbars({
					// 	theme: "minimal-dark",
					// 	scrollInertia: 250,
					// })
				var area = $('<div>')
					.addClass('input--nao--area')
					// .attr('contenteditable', true)
					// .on('input', function(e) {
					// 	// console.log(e);
					// 	inEl.html(area.html())
					// })
				let phld = $('<div class="area-placeholder"></div>')
					.text(def.label)
				var arwr = $('<div>')
					.addClass('textarea--nao--wrap')
					.insertAfter(inEl)
					.append(inEl)
					.append(phld)
					.append(area)
				var wrap = $('<div>')
					.addClass('nao-input textarea--nao')
					.insertAfter(arwr)
					.append(arwr)
					.on('keyup keydown keypress', stopProp)
				var textareaLineHeight = parseInt(inEl.css('line-height')) || parseInt($(document.body).css('line-height'));
				// console.log('HEI:', textareaLineHeight, inEl.css('line-height'))
				var scrollEnabled = false;
				var textarea = inEl, textareaClone = area;

				textarea.bind("mouseup touchend keyup keydown input change", function (e) {
					if(!!window.isTouch || $(document.body).hasClass('istouch')) return;
					if(!(textareaLineHeight >= 0)) textareaLineHeight = parseInt(inEl.css('line-height'));
					if(!scrollEnabled) {
						arwr.scrollbars({
							theme: "minimal-dark",
							setTop: 0,
							scrollInertia: 0,
							advanced: { autoScrollOnFocus: false },
							keyboard: { enable: false },
							snapAmount: textareaLineHeight,
							mouseWheel: {
								enable: true,
								scrollAmount: "auto",
								axis: "y",
								preventDefault: false,
								deltaFactor: "auto",
								normalizeDelta: false,
								invert: false,
								disableOver: ["datalist"]
							},
						})
						arwr.find('.mCustomScrollBox').removeAttr('tabindex')
						// setTimeout(function() { arwr.scrollbars("scrollTo", 0) }, 20);
						textarea.focus();
						scrollEnabled = true;
					}
					var $this = $(this),
						textareaContent = $this.val(),
						clength = textareaContent.length,
						cursorPosition = textarea.getCursorPosition();
					// console.log(textareaContent.substr(0, cursorPosition).search(/[\n\r]$/));
					if(textareaContent === '') $this.addClass('empty')
					else $this.removeClass('empty')
					textareaContent = "<span>" + textareaContent.substr(0, cursorPosition) 
						+ (textareaContent.substr(0, cursorPosition).search(/[^\n\r][\n\r]$/) > 0 ? '<br/>' : '') 
						+ "</span>" + textareaContent.substr(cursorPosition, textareaContent.length);
					textareaContent = textareaContent.replace(/\n/g, "<br />");
					textareaClone.html(textareaContent + "");
					$this.css("height", textareaClone.height());
					// $this.css("height", inEl[0].scrollHeight);
					var textareaCloneSpanOffset = 0,
						textareaCloneSpan = textareaClone.children("span"),
						viewLimitBottom = (parseInt(textareaClone.css("min-height"))) - textareaCloneSpanOffset, viewLimitTop = textareaCloneSpanOffset,
						awarCon = arwr.find(".mCSB_container"),
						arwrTop = (awarCon.length > 0 ? awarCon : arwr).position().top,
						viewRatio = Math.round(textareaCloneSpan.height() + arwrTop);
					if (viewRatio > viewLimitBottom || viewRatio < viewLimitTop) {
						if ((textareaCloneSpan.height() - textareaCloneSpanOffset) > 0) {
							arwr.scrollbars("scrollTo", textareaCloneSpan.height() - textareaCloneSpanOffset - textareaLineHeight);
						} else {
							arwr.scrollbars("scrollTo", 0);
						}
					}
				})
				return;
			}
			if(inEl.is('input')) {
				// var inEl = $(v)//.find('input');
				inEl
					// .addClass('input__field input__field--nao')
					.attr(def.attr)
					.attr({
						id: inID,
						// type: 'text',
					})
					// .attr(def.attr)
				var htxt = '<label for="'+inID+'">\
					<span>'+def.label+'</span>\
				</label>\
				<svg width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">\
					<path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"/>\
				</svg>';
				htxt = '<label for="'+inID+'">\
					<span>'+def.label+'</span>\
				</label>\
				<svg width="100%" height="100%" viewBox="0 0 400 60" preserveAspectRatio="none">\
					<line x1="0" y1="58" x2="100%" y2="58" stroke-opacity="0.6"/>\
				</svg>\
				<svg width="100%" height="100%" viewBox="0 0 400 60" preserveAspectRatio="none">\
					<line x1="0" y1="58" x2="100%" y2="58" stroke-opacity="1.0"/>\
				</svg>';
				// 	.html('<label class="input__label input__label--nao" for="'+inID+'">\
				// 	<span class="input__label-content input__label-content--nao">'+def.label+'</span>\
				// </label>\
				// <svg class="graphic graphic--nao" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">\
				// 	<path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"/>\
				// </svg>')
				var wrap = $('<'+tag+'>')
					.addClass('nao-input input--nao--txt')
					.html(htxt)
					.insertAfter(inEl)
					.prepend(inEl)
					.on('keyup keydown keypress', stopProp)
				// in case the input is already filled..
				if( inEl.val().trim() !== '' ) {
					inEl.addClass( 'input--filled' );
				}

				// events:
				// inEl.on( 'change', onInputValue );
				inEl.on( 'focus', onInputFocus );
				inEl.on( 'blur', onInputBlur );
				requestAnimationFrame(function() {
					inEl.trigger('blur')
				})
				return;
			}
			if(inEl.is('button')) {
				inEl
					.addClass('nao-input input--nao--btn')
					.ripple({ duration: 1000 })
					.on('keyup keydown keypress', stopProp)
				return;
			}
			else {
				if(inEl.is('.nao-input') || inEl.parents('.nao-input').length > 0) return;
				inEl.find('input,select,textarea,button').naoInput(opt);
			}
		} );

		function onInputValue( ev ) {
			var par = $(ev.target).parent()
			if(!par.hasClass('input--filled') && $(ev.target).val() !== '') par.addClass( 'input--filled' );
		}
		
		function onInputFocus( ev ) {
			$(ev.target).parent().addClass( 'input--filled' );
		}

		function onInputBlur( ev ) {
			if( $(ev.target).val().trim() === '' ) {
				$(ev.target).val('').parent().removeClass( 'input--filled' );
			} else {
				$(ev.target).parent().addClass( 'input--filled' );
			}
		}
		return this;
	}
	// $.fn.naoInputDismiss = function(ondown=false) {
	// 	return this;
	// }
	$.fn.getCursorPosition = function () {
		var el = $(this).get(0), pos = 0;
		if ("selectionStart" in el) {
			pos = el.selectionStart;
		} else if ("selection" in document) {
			el.focus();
			var sel = document.selection.createRange(), selLength = document.selection.createRange().text.length;
			sel.moveStart("character", -el.value.length);
			pos = sel.text.length - selLength;
		}
		return pos;
	}
	return $;
}));