$(document).ready(function(){
	$('#imageConvert').on('click', function () {
		if ($('.inven .equ .option.selected').length > 0) {
			$('#previewImg').addClass('loading').removeClass('complate').empty();
			$('.down-notice').addClass('loading').removeClass('complate').html('이미지를 생성중입니다. 잠시 기다려주세요.');
			$('html, body').animate({scrollTop: parseInt($('#download').offset().top - 120)}, 500);
			setTimeout(function(){
					html2canvas(document.getElementById('imageCanvas'), {
						allowTaint: true,
						useCORS: true,
						scale: 2.0,
					}).then(function (canvas) {
						$('#previewImg').removeClass('loading').addClass('complate').html('<img src="'+canvas.toDataURL()+'">');
						$('html, body').animate({scrollTop: parseInt($('#download').offset().top - 120)}, 500);
						$('.down-notice').addClass('loading').removeClass('complate').html('이미지가 생성되었습니다!');
					});
			
			}, 500)
		} else {
			D4SkillDB.layerFunc('layerCommon', true, '선택된 위상이 없습니다<br>1개 이상의 위상 선택후 이미지를 생성해주세요.', false);
		}
	});
	$('.button-notice').trigger('click');
	setTimeout(function(){
		$('.button-notice').trigger('click');
	}, 5000);
	$('.button-gem').trigger('click');
	//$('.button-option-view').trigger('click');
	D4SkillDB.scrollFunc();
})
var D4SkillDB = (function(){
	var method = {};
	var obj = {};
	var option = {};
	var parts = [];
	var gems = [
		{ver:'ori', icon:'rub', type:'gem', name:'루비',  detail:'<p class="gem_effect"><span class="wep">제압 피해 <span class="c_number">24%</span> 증가</span><span class="def">최대 생명력 <span class="c_number">4%</span> 증가</span><span class="acc">화염 저항력 <span class="c_number">24.1%</span> 증가</span></p>'},
		{ver:'ori', icon:'sap', type:'gem', name:'사파이어',  detail:'<p class="gem_effect"><span class="wep">군중 제어 효과 영향을 받는 적에게 주는 극대화 피해 <span class="c_number">12%</span> 증가</span><span class="def">보강 상태에서 피해 <span class="c_number">3%</span> 감소</span><span class="acc">냉기 저항 <span class="c_number">22.1%</span> 증가</span></p>'},
		{ver:'ori', icon:'toz', type:'gem', name:'토파즈',  detail:'<p class="gem_effect"><span class="wep">기본 기술 피해 <span class="c_number">20%</span> 증가</span><span class="def">제어 방해 효과를 받을 때 피해 <span class="c_number">10%</span> 감소</span><span class="acc">번개 저항 <span class="c_number">22.1%</span> 증가</span></p>'},
		{ver:'ori', icon:'eme', type:'gem', name:'에메랄드',  detail:'<p class="gem_effect"><span class="wep">취약한 적에게 주는 극대화 피해 <span class="c_number">12%</span> 증가</span><span class="def">가시 <span class="c_number">+250</span> 증가</span><span class="acc">독 저항 <span class="c_number">22.1%</span> 증가</span></p>'},
		{ver:'ori', icon:'ame', type:'gem', name:'자수정',  detail:'<p class="gem_effect"><span class="wep">지속 피해 <span class="c_number">8%</span> 증가</span><span class="def">지속 피해 <span class="c_number">8%</span> 감소</span><span class="acc">암흑 저항 <span class="c_number">22.1%</span> 증가</span></p>'},
		{ver:'ori', icon:'dia', type:'gem', name:'다이아몬드',  detail:'<p class="gem_effect"><span class="wep">궁극기 공격력 <span class="c_number">15%</span> 상승</span><span class="def">보호막 생성량 <span class="c_number">5%</span> 증가</span><span class="acc">모든 원소 저항 <span class="c_number">22.1%</span> 증가</span></p>'},
		{ver:'ori', icon:'skl', type:'gem', name:'해골',  detail:'<p class="gem_effect"><span class="wep">처치 시 생명력 <span class="c_number">+24</span> 회복</span><span class="def">받는 치유량 <span class="c_number">5%</span> 증가</span><span class="acc">방어도 <span class="c_number">+250</span> 상승</span></p>'},
	];
	method.init = function(){
		method.setElement();
		method.uiFunc();
		method.expandFunc();
		method.aspectLayer();
		method.aspectDB();
		method.spiritBoons();
		method.jobSelect();
		//method.scrollFunc();
		$(window).on('scroll resize',function(){
			method.scrollFunc();
		});
		method.setGems();
		method.layerFuncInit();
		method.itemOption();
		method.getSetting();
		//method.getUrl();
	};
	method.setElement = function(){
		obj.body = $('body');
		obj.container = $('#container');
		obj.job = obj.container.attr('data-job-select');
		obj.headerH = $('#header').outerHeight();
		obj.aspectList = obj.container.find('#aspectList');
		obj.boardWrap = obj.container.find('#board');
		obj.spiritBoons = obj.container.find('#spirit');
		obj.aspectOpen = obj.container.find('[aria-controls=aspectSelect]');
		obj.aspectTarget = $('#'+obj.aspectOpen.attr('data-target'));
		obj.aspectLayer = $('#'+obj.aspectOpen.attr('aria-controls'));
		obj.gemOpen = obj.container.find('[aria-controls=gemSelect]');
		obj.gemLayer = $('#'+obj.gemOpen.attr('aria-controls'));
		obj.lastButton = obj.aspectOpen.is('.latest');
		obj.optionList = $('#optionList');
	
		obj.urlStr = window.location.href;
		obj.url = new URL(obj.urlStr);
		obj.urlParams = obj.url.searchParams;
		obj.copyUrl = $('#settingUrl');
	};
	method.uiFunc = function(){
		$('[role=switch][aria-checked]').on('click', function(){
			var $tag = $(this).attr('data-tag');
			$(this).attr('aria-checked', function (i, attr) {
				return attr == 'true' ? 'false' : 'true'
			});
			if ($(this).is('.button-gem[aria-checked=false]')) {
				$('html, body').animate({scrollTop: $('.inven-gems').offset().top + obj.headerH}, 300);
			}
			obj.body.toggleClass($tag);
		})
		$('.setting-copy, .setting-url').on('click', function(){
			var el = $('#settingUrl');
			//$('#settingUrl').select();
			//document.execCommand("copy");
			/*
			var oldContentEditable = el.contentEditable,
				oldReadOnly = el.readOnly,
				range = document.createRange();

			el.contentEditable = true;
			el.readOnly = false;
			range.selectNodeContents(el);

			var s = window.getSelection();
			s.removeAllRanges();
			s.addRange(range);

			el.setSelectionRange(0, 999999); // A big number, to cover anything that could be inside the element.

			el.contentEditable = oldContentEditable;
			el.readOnly = oldReadOnly;
			*/
			el.select();
			document.execCommand('copy');
		})
	};
	method.itemOption = function(){
		//아이템 옵션 선택
		var $optionButton = $('.button-option-select');
		var $optionLayer = $('#'+$optionButton.attr('aria-controls'));
		var $optionInput = $optionLayer.find('.option-input');
		var $optionCopy = $optionLayer.find('.button-copy');
		var $selected = $optionLayer.find('.selected-option');
		var $alert = $('.box-alert');

		$optionButton.on('click', function(){
			var $parts = $(this).attr('data-option-parts');
			var $invenOption = $(this).siblings('.option-list');
			//D4Option.init();
			if (!$(this).val() == '') {
				$optionInput.val($(this).val());
				$(this).removeClass('modify');
			} else {
				$optionInput.val('');
				$(this).addClass('modify');
			}
			$optionLayer.attr('data-select-option-parts', $parts);

			$('.select-option .grid-option').attr('aria-selected', false);
			$selected.empty().append($invenOption.find('.grid-option').clone());
			$selected.find('.grid-option').each(function(){
				var $id = $('#'+$(this).attr('aria-controls'));
				$id.attr('aria-selected', true);
			})
			$('.option-group').each(function(){
				$(this).show();
				if ($(this).find('.grid-option:visible').length < 1) {
					$(this).hide();
				}
			})
			method.fixedViewPort(true);
		})

		$optionLayer.on('click', '.select-option .grid-option', function(e){
			if (!$(this).is('[aria-selected=true]') && $('.selected-option .grid-option').length < 4) {
				$selected.append($(this).clone().attr('aria-controls', $(this).attr('id')).removeAttr('id'))
				$(this).attr('aria-selected', true);
			} else {
				$alert.html('<p class="option-alert">선호 옵션은 4개까지만 선택 가능합니다. 선택했던 옵션을 삭제하고 재선택해주세요.</p>');
				$('.option-alert').delay(100).animate({ 'max-height': '50px' }, 500).delay(2000).animate({ 'max-height': '0px' }, 500);
			}
		}).on('click', '.selected-option .option-del', function(){
			var $target = $('#'+$(this).parent().attr('aria-controls'));
			$(this).parent().remove();
			$target.attr('aria-selected', false);
		}).on('click', '.option-submit', function(){
			var $inven = $('.trigger-active').siblings('.option-list');
			$inven.empty().append($('.selected-option .grid-option').clone());
			method.layerFunc('optionSelect', false);
		})
	};

	method.jobSelect = function(){ 
		//직업 선택
		$('#header .button-job').on('click', function(){
			var $this = $(this);
			var $job = $(this).attr('data-tab-select');
			if (!$(this).is('[aria-selected=true]')) {
				if ($('[aria-controls=aspectSelect][data-target], [aria-controls=gemSelect][data-gem-icon]').length > 0) {
					D4SkillDB.layerFunc('layerCommon', true, '<strong>현재 선택된 위상이나 보석</strong>이 있습니다.<br>직업을 변경하면 선택했던 <strong>위상과 보석들이 초기화</strong> 됩니다. <br>그래도 초기화 하시겠습니까?', true);
					$('.box-layer').on('click', '.button-submit', function(){
						jobChange($this);
					})
				} else {
					jobChange($this);
				}
			}
			function jobChange($jobBtn){
				var $this = $jobBtn;
				if (!obj.body.is('.scroll-lock')) {
					$('html, body').animate({scrollTop: '0'}, 300);
				}
				$this.attr('aria-selected', true).siblings().attr('aria-selected', false);
				obj.container.attr('data-job-select', $job);
				($this.hasClass('sub-equ-char')) ? $('.inven-wep .equ').eq(1).removeClass('wep').addClass('sub') : $('.inven-wep .equ').eq(1).addClass('wep').removeClass('sub')
				$('#container .inven-spirit .spirit-grid').removeClass('active').find('.button-spirit').attr('aria-selected', false).prop('disabled', false);
				$('#container .spirit-description').empty();
				$('.description').slideDown(300);
				if ($job == 'dru') {
					$('#wep2-opt').attr('data-option-parts', 'sub');
				} else if ($job == 'nec') {
					console.log('nec')
					$('#wep2-opt').attr('data-option-parts', 'shl');
					$('#wep4-opt').attr('data-option-parts', 'sub');
				} else {
					$('#wep2-opt, #wep4-opt').attr('data-option-parts', 'wep');
				}
				obj.urlParams.set('job', $job);
				method.delParam();
				method.getSetting();
				method.aspectReset();
				//history.replaceState({}, null, location.pathname)
				
				//console.log(obj.url);
			}
		})
		//레이어 필터링 버튼
		$('.aspect-head button').on('click', function(){
			var $this = $(this).attr('class');
			if ($(this).is('[aria-selected]')) {
				$(this).attr('aria-selected', true).siblings('[aria-selected]').attr('aria-selected', false);
			}
			obj.aspectList.attr('data-filter', $this);
		})
	};
	method.delParam = function(){
		console.log('delParam');
		obj.urlParams.delete('hel');
		obj.urlParams.delete('che');
		obj.urlParams.delete('glo');
		obj.urlParams.delete('pan');
		obj.urlParams.delete('boo');
		obj.urlParams.delete('amu');
		obj.urlParams.delete('rin1');
		obj.urlParams.delete('rin2');
		obj.urlParams.delete('wep1');
		obj.urlParams.delete('wep2');
		obj.urlParams.delete('wep3');
		obj.urlParams.delete('wep4');
	},
	method.setGems = function(){ 
		//각 장비별 보석 셋팅
		$('.inven .equ').each( function(){
			if ($(this).find('.gems').length > 0) {
				$(this).attr('data-has', 'gem')
			}
		})
		var $layerGems = $('#gemSelect');
		obj.gemOpen.on('click', function(){
			var $type = $(this).attr('data-gem-type')
			var $wrap = $(this).parents('.inven-gems');
			$('[aria-controls=gemSelect]').removeClass('active');
			$(this).addClass('active');
			$layerGems.addClass('active').attr('data-gem-type', $type);
			if (!$(this).is('.each-gem')) {
				$layerGems.removeClass('layer-dimmed').addClass('layer-bottom');
				method.fixedViewPort(false);
			} else {
				$layerGems.addClass('layer-dimmed').removeClass('layer-bottom');
				setTimeout(function(){ $('html, body').animate({scrollTop: $layerGems.offset().top - obj.headerH +'px'}, 300); }, 100)
				method.fixedViewPort(true);
			}
			if ($layerGems.find('.gems-grid').length < 1) {
				$.each(gems, function(index, gem){
					$layerGems.find('.gems-list').append('<div class="gems-grid"><button class="button-gem" data-gem-icon="'+gem.icon+'"><span class="detail">'+gem.detail+'</span></button></div>');
				});
			}
		})
		$layerGems.on('click', '.button-gem, .button-close', function(){
			if ($(this).is('.button-gem')) {
				var $gem = $(this).attr('data-gem-icon');
				$('[aria-controls=gemSelect].active').attr('data-gem-icon', $gem);
			}
			$('[aria-controls=gemSelect]').removeClass('active');
			$('.inven-gems .option').removeClass('active');
			$layerGems.removeClass('active');
			$layerGems.removeAttr('data-gem-type').find('.gems-list').empty();
			method.fixedViewPort(false);
		})
	};
	method.scrollFunc = function(){
		$(window).scroll(function () {
			var scrollTop = $(this).scrollTop();
			var $header = 40;
			(scrollTop > $header) 
				? obj.body.addClass('header-flip')
				: obj.body.removeClass('header-flip');
		});
	};
	method.aspectLayer = function(){
		//위상 레이어 오픈
		obj.aspectOpen.on('click', function(){
			//D4Aspect.init();
			var $parts = $(this).parents('.equ').attr('class').split(' ')[1];
			var $layer = $('#'+$(this).attr('aria-controls'));
			obj.aspectOpen.removeClass('active latest');
			$('.inven-aspect-select').removeClass('active').removeAttr('data-sorting');
			$layer.addClass('active').attr('data-sorting', $parts);
			obj.container.find('.inven').addClass('active');
			$(this).addClass('active latest');
			(!$(this).is('.selected'))
				? $('.sort-by-dis').attr('disabled', true) 
				: $('.sort-by-dis').attr('disabled', false)
			method.layerSort($parts);
			if ($(this).is('.selected')) { //선택 강조
				var $target = $('#'+$(this).attr('data-target'));
				obj.aspectLayer.find('.button-aspect').removeClass('selected');
				$target.addClass('selected').focus();
			} else {
				obj.aspectLayer.find('.button-aspect').removeClass('selected');
				$layer.find('.box-aspect-select').animate({scrollTop: '0'}, 300);
			}

			var $multi = ($(this).parents('.equ').attr('data-multiply') == undefined) ? 10 : $(this).parents('.equ').attr('data-multiply');
			//console.log($multi)
			method.aspectMultiply($multi);
			method.fixedViewPort(true);
		})
		//닫기 & 해제
		$('.js-disabled').on('click', function(){
			var $target = $('.inven .equ .option.latest').attr('data-target');
			if ($(this).is('.sort-by-dis')) {
				obj.urlParams.delete($('.inven .equ .option.latest').attr('id'), $('.inven .equ .option.latest').attr('data-target'));
				method.getSetting();

				obj.aspectList.find('#'+$target).attr('aria-selected', false);
				$('.inven .equ .option.latest').parent().removeAttr('data-parts data-ver'); //[data-*]
				$('.inven .equ .option.latest').removeAttr('data-target').removeClass('selected').siblings('.text').find('.box-aspect').empty();
				if ($('.inven .equ .option.latest').is('#wep2, #wep4')) {
					method.wepChange(true);
					if (obj.job == 'bab'){
						method.wepChange(false);
					}
				}
			}
			obj.aspectOpen.removeClass('active');
			$(this).parents('.inven-aspect-select').removeClass('active').removeAttr('data-sorting');
			obj.container.find('.inven').removeClass('active');
			method.fixedViewPort(false);
		})
	};
	method.aspectMultiply = function($number){
		obj.aspectList.find('.txt_calc').each(function(){
			var $basicNum = $(this).attr('data-origin');
			$(this).text(parseInt($basicNum * $number / 10));
		});
	}
	method.aspectReset = function(){
		//세팅된 위상 리셋
		obj.aspectOpen.removeClass('active selected latest').removeAttr('data-target');
		obj.aspectLayer.removeClass('active').removeAttr('data-sorting');
		obj.container.find('.inven').removeClass('active').find('.equ .text .detail, .equ .text .more').empty().removeClass('type-uni type-leg');
		obj.aspectButton.attr('aria-selected', false).removeAttr('data-select-parts');
		obj.aspectOpen.parent().removeAttr('data-parts data-ver'); //[data-*]
		$('#container .inven .equ .option').removeClass('active').removeAttr('data-gem-icon');
		obj.gemOpen.removeAttr('data-gem-icon'); //세팅된 보석 리셋
		method.wepChange(true); //주무기 보석 칸 리셋
		//$('.gems').removeClass('single-gem').parents('.equ').attr('data-multiply', '20');; //주무기 보석 칸 리셋
		//$('#wep2, #wep4').parents('.equ').attr('data-wep-type', 'sub');
		$('#container .inven .equ .button-option-select').removeClass('modify');
		
		$('.box-aspect').empty();
		$('.option-list').empty(); //선호 옵션 리셋
		method.layerFunc('optionSelect', false); //옵션 레이어 닫기
		method.delParam();
		method.fixedViewPort(false);
	};
	method.layerSort = function($target){
		//타입별 위상 정렬
		var $target = obj.aspectLayer.attr('data-sorting');
		$job = obj.container.attr('data-job-select');
		obj.aspectLayer.find('.box__aspect-grid').addClass('hide').removeClass('show');
		obj.aspectLayer.find('.box__aspect-grid.'+$target+'[data-job='+$job+'], .box__aspect-grid.'+$target+'[data-job=com]').removeClass('hide').addClass('show');
		
	};
	method.invCheck = function($id){
		//동일 위상 선택시 다른영역 리셋
		var $invSkill = [];
		obj.aspectOpen.each(function(index){
			var $target = ($(this).attr('data-target') !== undefined) ? $(this).attr('data-target') : '';
			$invSkill.push($target)
			if ($id == $(this).attr('data-target')) {
				//$(this).not('.latest').attr('data-target', $id).removeAttr('data-target').removeClass('selected').siblings('.text').find('.detail, .more').empty();
				$(this).not('.latest').attr('data-target', $id).removeAttr('data-target').removeClass('selected').siblings('.text').find('.box-aspect').empty();
				$(this).not('.latest').parent().removeAttr('data-parts data-ver'); //[data-*]

				//동일 위상 양손무기 / 한손+보조  세팅값
				if (obj.job == 'dru' || obj.job == 'soc' || obj.job == 'nec') {
					if ($id == $('#wep1').attr('data-target') && !$('#wep2, #wep4').is('.selected')) {
						method.wepChange(true);
					} else if ($id == $('#wep2').attr('data-target') || $('#wep4').attr('data-target') && !$('#wep1').is('.selected')) {
						method.wepChange(false);
					}
				}
				obj.urlParams.delete($(this).attr('id'), $id);
				method.getSetting();
			}
		});
		$.each($invSkill, function(index){
			$('#'+$invSkill[index]).attr({'aria-selected':true});
		})
	};
	method.wepChange = function(weapon){
		var $job = $('#container').attr('data-job-select')
		if (weapon) {
			$('#wep1').siblings().removeClass('single-gem').parents('.equ').attr('data-multiply', '20');
			$('#wep2, #wep4').parents('.equ').attr('data-wep-type', 'sub');
		} else {
			$('#wep1').siblings('.gems').addClass('single-gem').parents('.equ').attr('data-multiply', '10');	
			$('#wep2, #wep4').parents('.equ').removeAttr('data-wep-type');
			if ($job == 'rog' || $job == 'bab') {
				$('#wep1').siblings('.gems').removeClass('single-gem').parents('.equ').attr('data-multiply', '20');
			}
		}
	};
	method.aspectDB = function(){
		//위상 선택
		obj.aspectButton = obj.container.find('.button-aspect');
		obj.container.on('click', '.button-aspect', function(){
			var $detail = $(this).find('.aspect-name');
			var $tooltip = $(this).find('.aspect-more').html();
			var $parts = $(this).find('.aspect-parts').html();
			var $detailButton = $('.inven .equ .option.active').siblings('.text');
			var $target = $('.inven .equ .option.active').attr('data-target');
			obj.aspectID = $(this).attr('id');
			obj.partsID = $('.inven .equ .option.active').attr('id');
			$('.sort-by-all').trigger('click');
			$('#'+$target).attr('aria-selected', false);
			$('.inven .equ .option.active').addClass('selected').attr({'data-target':$(this).attr('id')}).parent().attr({'data-parts':$(this).parent().attr('data-parts'), 'data-ver':$(this).parent().attr('data-ver')})//[data-*]
				 
			obj.aspectOpen.removeClass('active');
			obj.aspectLayer.removeClass('active');
			obj.container.find('.inven').removeClass('active');
			
			$detailButton.find('.box-aspect').empty().append($(this).children().clone());
			//$detailButton.text($detail.text()).next().html($tooltip).next().html($parts);
			
			$(this).attr({'data-select-parts':obj.partsID});
			($(this).find('.aspect-name').hasClass('type-uni')) 
				? $detailButton.addClass('type-uni')
				: $detailButton.removeClass('type-uni');
			if (obj.job == 'dru' || obj.job == 'soc' || obj.job == 'nec') {
				if ($('#wep1').is('.selected')) {
					//method.wepChange(true);
				} else if ($('#wep2, #wep4').is('.selected')) {
					//method.wepChange(false);
				}
			}
			method.invCheck(obj.aspectID);
			method.fixedViewPort(false);


			obj.urlParams.set(obj.partsID, obj.aspectID);
			method.getSetting();
		})
	};
	method.setAspect = function($part, $target){
		var $job = $('#container').attr('data-job-select');
		var $inven = $('#'+$part);
		var $aspect = $('#'+$target);
		var $aspectName = $aspect.find('.aspect-name').html();
		var $aspectMore = $aspect.find('.aspect-more').html();
		if (!$target == undefined || !$target == '') {
			$inven.addClass('selected').attr('data-target', $target);
			$inven.siblings().find('.detail').text($aspectName);
			$inven.siblings().find('.more').html($aspectMore);
			$aspect.attr({'aria-selected':true, 'data-select':$target});
			($aspect.find('.aspect-name').hasClass('type-uni')) 
				? $inven.siblings().find('.detail').addClass('type-uni')
				: $inven.siblings().find('.detail').removeClass('type-uni')
		}
	};
	method.fixedViewPort = function(fixedView){
		(fixedView) ? obj.body.addClass('scroll-lock header-flip') : obj.body.removeClass('scroll-lock header-flip');
	};
	method.expandFunc = function(){
		$('[aria-expanded][aria-controls]').on('click', function(){
			var $target = $('#'+$(this).attr('aria-controls'));
			if ($(this).is('[aria-expanded=true]')) {
				$(this).removeClass('expend').attr('aria-expanded', false);
				$target.attr('aria-hidden', false).slideUp(200);
			} else {
				$(this).addClass('expend').attr('aria-expanded', true);
				$target.attr('aria-hidden', true).slideDown(200);
			}
			$('.button-expand-close').on('click', function(){
				$(this).parents('[aria-hidden]').slideUp(200);
				$('[aria-controls='+$(this).parents('[aria-hidden]').attr('id')+']').removeClass('expend').attr('aria-expanded', false);
			})
		})
	}
	method.spiritBoons = function(){
		//영혼 은총
		var $grid = obj.spiritBoons.find('.spirit-grid');
		$grid.each(function(index){
			var $button = $(this).find('.button-spirit');
			$(this).find('.button-blessing').on('click', function(){
				$grid.find('[aria-selected]').attr('disabled', false);
				$grid.find('[aria-selected=true] ~ [aria-selected=true]').attr('aria-selected', false);
				$('[data-target='+$('.spirit-grid.active').find('[aria-selected=true]').attr('id')+']').siblings().remove();
				$(this).parents('.spirit-grid').addClass('active').siblings().removeClass('active');
				$('.description').slideUp(300);
			})
			$(this).find('.button-spirit[aria-selected]').on('click', function(){
				var $name = $(this).text();
				var $id = $(this).attr('id');
				var $detail = $(this).attr('title');
				var $description = $(this).parents('.spirit-grid').find('.spirit-description');
				var $thisGrid = $(this).parents('.spirit-grid');
				var $line = $(this).parents('.spirit-frame');
				if ($thisGrid.is('.active')) {
					if ($(this).is('[aria-selected=true]')) {
						$(this).attr('aria-selected', false)
						$('[data-target='+$id+']').remove();
					} else {
						$(this).attr('aria-selected', true)
						$description.append('<p class="spirit-selected" data-target="'+$id+'"><span class="text-name">'+$name+'</span><span class="text-detail">'+$detail+'</span></p>');
					}
					($line.find('[aria-selected=true]').length == 2 ) 
						? obj.spiritBoons.find('.spirit-grid.active').find('[aria-selected=false]').prop('disabled', true)
						: obj.spiritBoons.find('.spirit-grid.active').find('[aria-selected]').prop('disabled', false)
				} else {
					$(this).attr('aria-selected', true).siblings().attr('aria-selected', false);
					$description.html('<p class="spirit-selected" data-target="'+$id+'"><span class="text-name">'+$name+'</span><span class="text-detail">'+$detail+'</span></p>');
				}
			})
		})
	};

	method.getSetting = function(){
		var option = obj.urlParams.get('opt');
		var gem = obj.urlParams.get('gem');
		var job = obj.urlParams.get('job');
		var $aspect = $('#container .inven .equ .option');
		var $gem = $('#container .inven .equ .gems .each-gem');
		var $option = $('#container .inven .equ .option-list .grid-option');
	
		if (job == null) {
			$('#header .button-job[data-tab-select]').attr('aria-selected', false);
			$('#header .button-job[data-tab-select=dru]').attr('aria-selected', true);
		} else {
			obj.urlParams.set('job', job)
			$('#container').attr('data-job-select', job);
			$('#header .button-job[data-tab-select]').attr('aria-selected', false);
			$('#header .button-job[data-tab-select='+job+']').attr('aria-selected', true);
		}
		
		if (option == 1) {
			$('.button-option-view').attr('aria-checked', true);
			obj.body.addClass('option-view')
		}
		if (gem == 0) {
			$('.button-gem').attr('aria-checked', false);
			obj.body.removeClass('gems')
		}
		$aspect.each(function(){
			var $thisWrap = $(this).parents('.equ');
			var $box =  $(this).siblings('.text').find('.box-aspect');
			$(this).attr('data-target', obj.urlParams.get($(this).attr('id')));
			if ($(this).is('[data-target]')) {
				$thisWrap.attr({'data-parts': $('#'+$(this).attr('data-target')).parent().attr('data-parts'), 'data-ver':$('#'+$(this).attr('data-target')).parent().attr('data-ver')}).find('.option').addClass('selected');
				$box.empty().append($('#'+$(this).attr('data-target')).find('.aspect-detail').clone());
			}
		})
		obj.copyUrl.val(obj.url);
		history.replaceState({}, null, obj.url);
	};
	method.layerFuncInit = function(){
		$('[aria-haspopup=dialog][aria-controls]').on('click', function(e){
			e.preventDefault();
			var $target = $(this).attr('aria-controls');
			if ($('#'+$target).find('.dimmed').get(0) == undefined) {
				$('#'+$target).append('<div class="dimmed" role="none"></div>');
				method.layerFuncClose();
			}
			if ($('#'+$target).get(0) !== undefined) {
				$(this).addClass('trigger-active');
				method.layerFunc($target, true);
			}
		})
	};
	method.layerFuncClose = function(){
		$('.box-layer').on('click', '[data-dismiss=modal], .dimmed', function(e){
			e.preventDefault();
			var $target = $(this).parents('[role=dialog], [role=alertdialog]').attr('id');
			method.layerFunc($target, false);
		})
	};
	method.layerFunc = function($target, $boolean, $content, $confirm){
		if ($('#'+$target).get(0) !== undefined) {
			var $targetPopup = $('#'+$target);
			var $cont = $('#layerContent');
			var firstTabStop = 0;
			var lastTabStop = 0;
			if ($confirm) {
				$targetPopup.attr('role', 'dialog');
				$targetPopup.find('.box-button').append('<button class="button-cancel" data-dismiss="modal">취소</button>');
			} else {
				$targetPopup.attr('role', 'alertdialog');
				$targetPopup.find('.box-button .button-cancel').remove();
			}
			if ($boolean) {
				if (!$targetPopup.is('.active')) {
					$targetPopup.addClass('active').attr({'aria-hidden':'false'});
				}
				var focusableElementsString = $targetPopup.find('a[href], area[href], input:not([disabled], [aria-hidden=true]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]');
				var firstTabStop = focusableElementsString[0];
				var lastTabStop = focusableElementsString[focusableElementsString.length - 1];
				firstTabStop.focus();
				if ($('#'+$target).find('.dimmed').get(0) == undefined) {
					$('#'+$target).append('<div class="dimmed" role="none"></div>');
					method.layerFuncClose();
				}
				$cont.html($content);
				$targetPopup.bind('keydown', trapTabKey);
			} else {
				$cont.empty();
				$targetPopup.unbind('keydown', trapTabKey, false);
				$targetPopup.removeClass('active').attr({'aria-hidden':'true'});
				if ($('[aria-haspopup=dialog][aria-controls='+$target+']').length > 0) {
					$('[aria-haspopup=dialog][aria-controls='+$target+']').removeClass('trigger-active').focus();
				} else if($('.active').get(0) !== undefined) {
					$('.active').find('[data-dismiss=modal]').focus();
				} else {
					$('#container').attr('tabindex', '0').focus();
				}
			}
			method.fixedViewPort($boolean);
			function trapTabKey(e) {
				// Check for TAB key press
				if (e.keyCode === 9) {
					// SHIFT + TAB
					if (e.shiftKey) {
						if (document.activeElement === firstTabStop) {
							e.preventDefault();
							lastTabStop.focus();
						}
					// TAB
					} else {
						if (document.activeElement === lastTabStop) {
							e.preventDefault();
							firstTabStop.focus();
						}
					}
				}
				// ESCAPE
				if (e.keyCode === 27) {
					$targetPopup.find('[data-dismiss=modal], .dimmed').click();
				}
			}
		}
	};
	return{
		init : method.init,
		aspectDB : method.aspectDB,
		layerSort : method.layerSort,
		SetAspect : method.setAspect,
		layerFunc : method.layerFunc,
		scrollFunc : method.scrollFunc,
		getSetting : method.getSetting,
	}
})();
D4SkillDB.init();