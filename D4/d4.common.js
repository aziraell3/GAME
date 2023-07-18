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
						$('.down-notice').removeClass('loading').addClass('complate').html('이미지가 생성되었습니다!');
					});
			
			}, 500)
		} else {
			D4SkillDB.layerFunc('layerCommon', true, '선택된 위상이 없습니다<br>1개 이상의 위상 선택후 이미지를 생성해주세요.', false);
		}
	});
	D4SkillDB.scrollFunc();
	$('#container .box-url .setting-url').each(function(){
		if ($(this).val() !== '') {
			D4SkillDB.expandFunc($('#container .box-title .button-url-link'), true);
		}
	})
})
var D4SkillDB = (function(){
	var method = {};
	var obj = {};
	var option = {};
	var optionArr = [];
	var parts = [];
	var gems = [
		// ver		ori|dlc|sea1~9
		// grade	nor|leg|uni
		// parts	com|wep|def|acc
		// icon		rub|sap|toz|eme|ame|dia|skl
		{ver:'ori', grade:'nor', parts:'com', icon:'rub', type:'gem', name:'루비',  detail:'<p class="gem_effect"><span class="wep">제압 피해 <span class="c_number">24%</span> 증가</span><span class="def">최대 생명력 <span class="c_number">4%</span> 증가</span><span class="acc">화염 저항력 <span class="c_number">24.1%</span> 증가</span></p>'},
		{ver:'ori', grade:'nor', parts:'com', icon:'sap', type:'gem', name:'사파이어',  detail:'<p class="gem_effect"><span class="wep">군중 제어 효과 영향을 받는 적에게 주는 극대화 피해 <span class="c_number">12%</span> 증가</span><span class="def">보강 상태에서 피해 <span class="c_number">3%</span> 감소</span><span class="acc">냉기 저항 <span class="c_number">22.1%</span> 증가</span></p>'},
		{ver:'ori', grade:'nor', parts:'com', icon:'toz', type:'gem', name:'토파즈',  detail:'<p class="gem_effect"><span class="wep">기본 기술 피해 <span class="c_number">20%</span> 증가</span><span class="def">제어 방해 효과를 받을 때 피해 <span class="c_number">10%</span> 감소</span><span class="acc">번개 저항 <span class="c_number">22.1%</span> 증가</span></p>'},
		{ver:'ori', grade:'nor', parts:'com', icon:'eme', type:'gem', name:'에메랄드',  detail:'<p class="gem_effect"><span class="wep">취약한 적에게 주는 극대화 피해 <span class="c_number">12%</span> 증가</span><span class="def">가시 <span class="c_number">+250</span> 증가</span><span class="acc">독 저항 <span class="c_number">22.1%</span> 증가</span></p>'},
		{ver:'ori', grade:'nor', parts:'com', icon:'ame', type:'gem', name:'자수정',  detail:'<p class="gem_effect"><span class="wep">지속 피해 <span class="c_number">8%</span> 증가</span><span class="def">지속 피해 <span class="c_number">8%</span> 감소</span><span class="acc">암흑 저항 <span class="c_number">22.1%</span> 증가</span></p>'},
		{ver:'ori', grade:'nor', parts:'com', icon:'dia', type:'gem', name:'다이아몬드',  detail:'<p class="gem_effect"><span class="wep">궁극기 공격력 <span class="c_number">15%</span> 상승</span><span class="def">보호막 생성량 <span class="c_number">5%</span> 증가</span><span class="acc">모든 원소 저항 <span class="c_number">22.1%</span> 증가</span></p>'},
		{ver:'ori', grade:'nor', parts:'com', icon:'skl', type:'gem', name:'해골',  detail:'<p class="gem_effect"><span class="wep">처치 시 생명력 <span class="c_number">+24</span> 회복</span><span class="def">받는 치유량 <span class="c_number">5%</span> 증가</span><span class="acc">방어도 <span class="c_number">+250</span> 상승</span></p>'},
		
		{ver:'sea1', grade:'leg', parts:'acc', icon:'emp', type:'gem', name:'[테스트]<br> 전설보석 1',  detail:'<p class="gem_effect"><span class="acc">전용 옵션 블라블라블라</span></p>'},
		{ver:'sea1', grade:'leg', parts:'acc', icon:'emp', type:'gem', name:'[테스트]<br> 전설보석 2',  detail:'<p class="gem_effect"><span class="acc">전용 옵션 블라블라블라</span></p>'},
	];
	method.init = function(){
		method.setElement();
		method.uiFunc();
		method.expandFunc();
		method.aspectLayer();
		method.aspectDB();
		method.spiritBoons();
		method.jobSelect();
		$(window).on('scroll resize',function(){
			method.scrollFunc();
		});
		method.setGems();
		method.layerFuncInit();
		method.itemOption();
		method.getSetting();
	};
	method.setElement = function(){
		obj.body = $('body');
		obj.container = $('#container');
		obj.job = obj.container.attr('data-job-select');
		obj.headerH = $('#header').outerHeight();
		obj.aspect = $('#container .inven .equ .option');
		obj.aspectList = obj.container.find('#aspectList');
		obj.boardWrap = obj.container.find('#board');
		obj.spiritBoons = obj.container.find('#spirit');
		obj.aspectOpen = obj.container.find('[aria-controls=aspectSelect]');
		obj.aspectTarget = $('#'+obj.aspectOpen.attr('data-target'));
		obj.aspectLayer = $('#'+obj.aspectOpen.attr('aria-controls'));
		obj.gems = $('#container .inven .equ .gems .each-gem');
		obj.gemOpen = obj.container.find('[aria-controls=gemSelect]');
		obj.gemLayer = $('#'+obj.gemOpen.attr('aria-controls'));
		obj.lastButton = obj.aspectOpen.is('.latest');
		obj.optionList = $('#optionList');
		obj.settingInput = $('input[type=text]');
	
		obj.urlStr = window.location.href;
		obj.url = new URL(obj.urlStr);
		obj.urlParams = obj.url.searchParams;
		//obj.copyUrl = $('#settingUrl');
	};
	method.uiFunc = function(){
		$('[role=button]').each(function(){
			$(this).attr('tabindex', '0');
			$(this).on('keydown', function(e){
				if (e.keyCode === 32 || e.keyCode === 13) {// enter & space 
					e.preventDefault();
					$(this).trigger('click');
				}
			});
		})
		$('[role=switch][aria-checked]').on('click', function(){
			var $tag = $(this).attr('data-tag');
			$(this).attr('aria-checked', function (i, attr) {
				return attr == 'true' ? 'false' : 'true'
			});
			if ($(this).is('.button-gem[aria-checked=false]')) {
				//$('html, body').animate({scrollTop: $('.inven-gems').offset().top + obj.headerH}, 300);
			}
			obj.body.toggleClass($tag);
		})
		$('.button-url').on('click', function(){
			if ($(this).is('.link-button')) {
				var $url = $(this).siblings('.setting-url').val();
				if ($url.length > 0) {
					window.open($url, '_blank');
				}
			} else if ($(this).is('.del-button')) { // .del-button
				$(this).hide().siblings('.setting-url').val('').focus();
			}
		})
		$('#container .inven .equ .box-aspect').each(function(){
			$(this).on('click', function(){
				if ($(this).find('.aspect-parts, .acquest').length > 0) {
					$(this).toggleClass('active');
				}
			})
		})
		$('[aria-expanded][aria-controls]').on('click', function(){
			if ($(this).is('[aria-expanded=true]')) {
				method.expandFunc($(this), false)
			} else {
				method.expandFunc($(this), true)
			}
		})
		$('.button-expand-close').on('click', function(){
			$('[aria-controls='+$(this).parents('[aria-hidden]').attr('id')+']').trigger('click');
			//$(this).parents('[aria-hidden]').slideUp(200);
			//$('[aria-controls='+$(this).parents('[aria-hidden]').attr('id')+']').removeClass('expend').attr('aria-expanded', false);
		})

		obj.settingInput.each(function(){
			if (obj.urlParams.get($(this).attr('id')) == undefined) {
				$('#'+$(this).attr('id')).siblings('.del-button').hide();
			}
			$(this).on('focus keyup', function(){
				if ($(this).val().length < 1) {
					$(this).siblings('.del-button').hide();
				} else {
					$(this).siblings('.del-button').show();
				}
			}).on('focusout blur', function(){
				if ($(this).val().length < 1) {
					obj.urlParams.delete($(this).attr('id'));
					$(this).siblings('.del-button').hide();
				} else {
					obj.urlParams.set($(this).attr('id'), $(this).val());
					$(this).siblings('.del-button').show();
				}
				method.getSetting();
			}).on('click', function(){
				$(this).select();
			})
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
		$('#header .button-job, .button-reset').on('click', function(){
			var $this = $(this);
			var $job = $(this).attr('data-tab-select');
			if (!$(this).is('[aria-selected=true]')) {
				if ($('[aria-controls=aspectSelect][data-target]').length > 0 || $('[aria-controls=gemSelect][data-gem-icon]').length > 0  || $('input[type=text]').val() !== '') {
					D4SkillDB.layerFunc('layerCommon', true, '<strong>현재 셋팅된 위상/보석/입력값</strong>등이 있습니다.<br>확인을 누르면 셋팅된  <strong class="underline">위상/보석/입력값 들이 초기화</strong> 됩니다. <br>그래도 초기화 하시겠습니까?', true);
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
				if ($jobBtn.is('.button-job')) {
					$this.attr('aria-selected', true).siblings().attr('aria-selected', false);
					obj.container.attr('data-job-select', $job);	
					($this.hasClass('sub-equ-char')) ? $('.inven-wep .equ').eq(1).removeClass('wep').addClass('sub') : $('.inven-wep .equ').eq(1).addClass('wep').removeClass('sub')
					$('#container .inven-spirit .spirit-grid').removeClass('active').find('.button-spirit').attr('aria-selected', false).prop('disabled', false);
					$('#container .spirit-description').empty();
					if ($job == 'dru') {
						$('#wep2-opt').attr('data-option-parts', 'sub');
					} else if ($job == 'nec') {
						$('#wep2-opt').attr('data-option-parts', 'shl');
						$('#wep4-opt').attr('data-option-parts', 'sub');
					} else {
						$('#wep2-opt, #wep4-opt').attr('data-option-parts', 'wep');
					}
					obj.urlParams.set('job', $job);
				}
				method.delEqu();
				method.delGems();
				method.delUrl();
				method.getSetting();
				method.aspectReset();
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
	method.setGems = function(){ 
		//각 장비별 보석 셋팅
		$('.inven .equ').each( function(){
			if ($(this).find('.gems').length > 0) {
				$(this).attr('data-has', 'gem')
			}
		})
		var $layerGems = $('#gemSelect');
		$.each(gems, function(index, gem){
			$layerGems.find('.gems-list').append('<div class="gems-grid" data-grade="'+gem.grade+'" data-parts="'+gem.parts+'"><button class="button-gem each-gem" data-gem-icon="'+gem.icon+'" data-gem-grade="'+gem.grade+'" id="G'+index+'"><span class="name">'+gem.name+'</span><span class="detail">'+gem.detail+'</span></button></div>');
		});
		$layerGems.find('[data-grade=leg]').wrapAll('<div class="gems-group" data-group="leg"></div>');
		$layerGems.find('[data-grade=nor]').wrapAll('<div class="gems-group" data-group="nor"></div>');
		//gemLists();
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
		})
		$layerGems.on('click', '.button-gem, .button-close', function(){
			if ($(this).is('.button-gem')) {
				var $gem = $(this).attr('data-gem-icon');
				var $id = $(this).attr('id');
				var $target = $('[aria-controls=gemSelect].active').attr('id');
				$('[aria-controls=gemSelect].active').attr({'data-gem-icon':$gem, 'data-target':$id});
				obj.urlParams.set($target, $id);
				method.getSetting();
			}
			$('[aria-controls=gemSelect]').removeClass('active');
			$('.inven-gems .option').removeClass('active');
			$layerGems.removeClass('active');
			$layerGems.removeAttr('data-gem-type').find('.gems-list');
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
			var windHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
			var scrolled = (scrollTop / windHeight) * 100;
			$('.bar').css('width', scrolled+'%');
		});
	};
	method.aspectLayer = function(){
		//위상 레이어 오픈
		obj.aspectOpen.on('click', function(){
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
		//세팅된 모든값 리셋
		obj.aspectOpen.removeClass('active selected latest').removeAttr('data-target');
		obj.aspectLayer.removeClass('active').removeAttr('data-sorting');
		obj.container.find('.inven').removeClass('active').find('.equ .text .detail, .equ .text .more').empty().removeClass('type-uni type-leg');
		obj.aspectButton.attr('aria-selected', false).removeAttr('data-select-parts');
		obj.aspectOpen.parent().removeAttr('data-parts data-ver'); //[data-*]
		obj.aspect.removeClass('active').removeAttr('data-gem-icon');
		obj.gemOpen.removeAttr('data-gem-icon'); //세팅된 보석 리셋
		method.wepChange(true); //주무기 보석 칸 리셋
		//$('.gems').removeClass('single-gem').parents('.equ').attr('data-multiply', '20');; //주무기 보석 칸 리셋
		//$('#wep2, #wep4').parents('.equ').attr('data-wep-type', 'sub');
		$('#container .inven .equ .button-option-select').removeClass('modify');
		
		$('.box-aspect').empty(); //위상 리셋
		$('#previewImg').empty(); //생성된 이미지 리셋
		$('.option-list').empty(); //선호 옵션 리셋
		method.layerFunc('optionSelect', false); //옵션 레이어 닫기
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
				$(this).not('.latest').attr('data-target', $id).removeAttr('data-target').removeClass('selected').siblings('.text').find('.box-aspect').empty();
				$(this).not('.latest').parent().removeAttr('data-parts data-ver'); //[data-*]
				//동일 위상 양손무기 / 한손+보조  세팅값
				if (obj.job == 'dru' || obj.job == 'soc' || obj.job == 'nec') {
					if ($id == $('#wep1').attr('data-target') && !$('#wep2, #wep4').is('.selected')) {
						
						console.log('무기 ON')
						method.wepChange(true);
					} else if ($id == $('#wep2').attr('data-target') || $('#wep4').attr('data-target') && !$('#wep1').is('.selected')) {
						console.log('무기 OFF')
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
			
			$(this).attr({'data-select-parts':obj.partsID});
			($(this).find('.aspect-name').hasClass('type-uni')) 
				? $detailButton.addClass('type-uni')
				: $detailButton.removeClass('type-uni');
			/*
			if (obj.job == 'dru' || obj.job == 'soc' || obj.job == 'nec') {
				if ($('#wep1').is('.selected')) {
					//method.wepChange(true);
				} else if ($('#wep2, #wep4').is('.selected')) {
					//method.wepChange(false);
				}
			}
			*/
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
	method.expandFunc = function($this, $boolean){
		var $target = $('#'+$($this).attr('aria-controls'));;
		if ($boolean) {
			$($this).addClass('expend').attr('aria-expanded', true);
			$target.attr('aria-hidden', true).slideDown(200);
		} else {
			$($this).removeClass('expend').attr('aria-expanded', false);
			$target.attr('aria-hidden', false).slideUp(200);
		}
	}
	method.spiritBoons = function(){
		//영혼 은총
		var $spirit = obj.spiritBoons.find('button');
		var $grid = obj.spiritBoons.find('.spirit-grid');
		$grid.each(function(index){
			var $button = $(this).find('.button-spirit');
			$(this).on('click', '.button-blessing[aria-selected=false]', function(){
				$grid.find('.button-blessing').attr('aria-selected', false);
				$(this).attr('aria-selected', true);
				$grid.find('[aria-selected]').attr('disabled', false);
				$grid.find('[aria-selected=true] ~ [aria-selected=true]').attr('aria-selected', false);
				$('[data-target='+$('.spirit-grid.active').find('[aria-selected=true]').attr('id')+']').siblings().remove();
				$(this).parents('.spirit-grid').addClass('active').siblings().removeClass('active');
				$('.description').slideUp(300);
			})
			$(this).on('click', '.button-spirit[aria-selected]', function(){
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
			/*
			$spirit.each(function(){
				$(this).on('click', function(){
					var $this = $(this).attr('id');
					var $thisSelect = ($(this).attr('aria-selected') == 'true') ? 1 : null;
					
					console.log($this, $thisSelect)
					
					//obj.urlParams.delete($(this).siblings().attr('id'));
					
					if ($(this).is('.button-blessing')) {
						obj.urlParams.set('blessing', $this);
					} else {
						obj.urlParams.set($this, $thisSelect);
					}
					method.getSetting();
				})
			})
			*/
			
		})
	};

	method.getSetting = function(){
		var job = obj.urlParams.get('job');
		var $option = $('#container .inven .equ .option-list');
		
		//직업 로드
		if (job == null) {
			obj.urlParams.set('job', 'dru');
			$('#header .button-job[data-tab-select]').attr('aria-selected', false);
			$('#header .button-job[data-tab-select=dru]').attr('aria-selected', true);
		} else {
			obj.urlParams.set('job', job);
			$('#container').attr('data-job-select', job);
			$('#header .button-job[data-tab-select]').attr('aria-selected', false);
			$('#header .button-job[data-tab-select='+job+']').attr('aria-selected', true);
		}
		//장비 위상 로드
		obj.aspect.each(function(){
			var $thisWrap = $(this).parents('.equ');
			//var $parts = $(this).parent().attr('class').split('equ ')[1];
			var $parts = $(this).attr('id');
			var $box =  $(this).siblings('.text').find('.box-aspect');
			$(this).attr('data-target', obj.urlParams.get($(this).attr('id')));
			if ($(this).is('[data-target]')) {
				$thisWrap.attr({'data-parts': $('#'+$(this).attr('data-target')).parent().attr('data-parts'), 'data-ver':$('#'+$(this).attr('data-target')).parent().attr('data-ver')}).find('.option').addClass('selected');
				$box.empty().append($('#'+$(this).attr('data-target')).find('.aspect-detail').clone());
				$('#'+$(this).attr('data-target')).attr({'aria-selected': true,'data-select-parts': $parts}); //선택된 위상 표시
			}
			//유니크 장비 체크
			if ($(this).siblings('.text').find('.aspect-name').is('.type-uni')) {
				$(this).siblings('.text').addClass('type-uni');
			}
			//보조무기 선택여부
			if ($('#wep2, #wep4').is('.selected') && obj.job == 'dru' || obj.job == 'soc' || obj.job == 'nec') { method.wepChange(false) };
		})
		//보석 로드
		obj.gems.each(function(){
			$(this).attr('data-target', obj.urlParams.get($(this).attr('id')));
			$(this).attr('data-gem-icon', $('#'+$(this).attr('data-target')).attr('data-gem-icon'));
		})
		//은총 로드
		//$('#'+obj.urlParams.get('blessing')).click();
		obj.spiritBoons.find('button').each(function(){
			//$(this).attr('data-target', obj.urlParams.get($(this).attr('id')));
			//$(this).attr('data-gem-icon', $('#'+$(this).attr('data-target')).attr('data-gem-icon'));
		})
		//URL입력값
		obj.settingInput.each(function(){
			var $id = $(this).attr('id');
			$('#'+$id).val(obj.urlParams.get($id));
		})

		history.replaceState({}, null, obj.url);
	};

	method.delEqu = function(){
		obj.aspect.each(function(){
			var $id = $(this).attr('id')
			obj.urlParams.delete($id);
		})
	},
	method.delGems = function(){
		obj.gems.each(function(){
			var $id = $(this).attr('id')
			obj.urlParams.delete($id);
		})
	},
	method.delUrl = function(){
		obj.settingInput.each(function(){
			var $id = $(this).attr('id')
			obj.urlParams.delete($id );
		})
	},
	method.delOpt = function(){
		$('#container .inven .equ .option-list').each(function(){
			var $id = $(this).attr('id')
			obj.urlParams.delete($id );
		})
	},
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
					$('[aria-haspopup=dialog][aria-controls='+$target+']').removeClass('trigger-active');
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
		expandFunc : method.expandFunc,
		aspectDB : method.aspectDB,
		layerSort : method.layerSort,
		SetAspect : method.setAspect,
		layerFunc : method.layerFunc,
		scrollFunc : method.scrollFunc,
		getSetting : method.getSetting,
	}
})();
D4SkillDB.init();