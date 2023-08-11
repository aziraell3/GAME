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
			D4SkillDB.layerFunc('selectAspect', true, '선택된 위상이 없습니다<br>1개 이상의 위상 선택후 이미지를 생성해주세요.', false);
		}
	});
	D4SkillDB.scrollFunc();
	/*
	$('#container .box-url .setting-url').each(function(){
		if ($(this).val() !== '') {
			D4SkillDB.expandFunc($('#container .box-title .button-url-link'), true);
		}
	})
	*/

	//한줄 noti
	//$('.box-notice-alert').delay(1000).animate({'max-height': '100px'}, 'slow').delay(1000 * 4).animate({'max-height': '0px'}, 'slow');
})
var D4SkillDB = (function(){
	var method = {};
	var obj = {};
	var option = {};
	var optionArr = [];
	var parts = [];
	var gems = [
		// ver		ori|dlc|s1~9
		// grade	nor|leg|uni
		// parts	com|wep|def|acc
		// icon		rub|sap|toz|eme|ame|dia|skl
		// type
			// off : 사악한 심장
			// def : 냉혹한 심장
			// uti : 간악한 심장
			// tra : 진노한 심장
		{display:'show', ver:'ori', job:'com', grade:'nor', parts:'com', icon:'rub', type:'com', name:'루비',  detail:'<p class="gem_effect"><span class="wep">제압 피해 <span class="c_number">24%</span> 증가</span><span class="def">최대 생명력 <span class="c_number">4%</span> 증가</span><span class="acc">화염 저항력 <span class="c_number">24.1%</span> 증가</span></p>'},
		{display:'show', ver:'ori', job:'com', grade:'nor', parts:'com', icon:'sap', type:'com', name:'사파이어',  detail:'<p class="gem_effect"><span class="wep">군중 제어 효과 영향을 받는 적에게 주는 극대화 피해 <span class="c_number">12%</span> 증가</span><span class="def">보강 상태에서 피해 <span class="c_number">3%</span> 감소</span><span class="acc">냉기 저항 <span class="c_number">22.1%</span> 증가</span></p>'},
		{display:'show', ver:'ori', job:'com', grade:'nor', parts:'com', icon:'toz', type:'com', name:'토파즈',  detail:'<p class="gem_effect"><span class="wep">기본 기술 피해 <span class="c_number">20%</span> 증가</span><span class="def">제어 방해 효과를 받을 때 피해 <span class="c_number">10%</span> 감소</span><span class="acc">번개 저항 <span class="c_number">22.1%</span> 증가</span></p>'},
		{display:'show', ver:'ori', job:'com', grade:'nor', parts:'com', icon:'eme', type:'com', name:'에메랄드',  detail:'<p class="gem_effect"><span class="wep">취약한 적에게 주는 극대화 피해 <span class="c_number">12%</span> 증가</span><span class="def">가시 <span class="c_number">+250</span> 증가</span><span class="acc">독 저항 <span class="c_number">22.1%</span> 증가</span></p>'},
		{display:'show', ver:'ori', job:'com', grade:'nor', parts:'com', icon:'ame', type:'com', name:'자수정',  detail:'<p class="gem_effect"><span class="wep">지속 피해 <span class="c_number">8%</span> 증가</span><span class="def">지속 피해 <span class="c_number">8%</span> 감소</span><span class="acc">암흑 저항 <span class="c_number">22.1%</span> 증가</span></p>'},
		{display:'show', ver:'ori', job:'com', grade:'nor', parts:'com', icon:'dia', type:'com', name:'다이아몬드',  detail:'<p class="gem_effect"><span class="wep">궁극기 공격력 <span class="c_number">15%</span> 상승</span><span class="def">보호막 생성량 <span class="c_number">5%</span> 증가</span><span class="acc">모든 원소 저항 <span class="c_number">22.1%</span> 증가</span></p>'},
		{display:'show', ver:'ori', job:'com', grade:'nor', parts:'com', icon:'skl', type:'com', name:'해골',  detail:'<p class="gem_effect"><span class="wep">처치 시 생명력 <span class="c_number">+24</span> 회복</span><span class="def">받는 치유량 <span class="c_number">5%</span> 증가</span><span class="acc">방어도 <span class="c_number">+250</span> 상승</span></p>'},
		
		{display:'show', ver:'s1', job:'com', grade:'leg', parts:'acc', icon:'off', type:'off', name:'피카나(사악함, 공격력)',  detail:'<p class="gem_effect"><span class="acc">극대화 적중 시 적이 0.75~2.50초 동안 전기를 띱니다. 전기를 띤 대상들 간에 번개가 튀며 68~136의 번개 피해를 줍니다.</span></p>'},
		{display:'show', ver:'s1', job:'com', grade:'leg', parts:'acc', icon:'off', type:'off', name:'어두운 춤(사악함, 공격력 - 단계 III)',  detail:'<p class="gem_effect"><span class="acc">생명력이 60% 이상인 경우, 핵심 기술이 5초마다 주 자원 대신 68~51의 생명력을 사용합니다. 생명력을 소모한 기술은 10~20% 증가한 피해를 줍니다.</span></p>'},
		{display:'show', ver:'s1', job:'com', grade:'leg', parts:'acc', icon:'off', type:'off', name:'유혹적인 운명(사악함, 공격력 - 단계 III)',  detail:'<p class="gem_effect"><span class="acc">극대화 적중 시 40~60%의 추가 피해를 주지만, 비 극대화 적중 시 주는 피해가 20~15% 감소합니다.</span></p>'},
		{display:'show', ver:'s1', job:'com', grade:'leg', parts:'acc', icon:'def', type:'def', name:'사자심장(흉포함, 방어력)',  detail:'<p class="gem_effect"><span class="acc">보호막 생성량이 10% 증가합니다. 보호막이 활성화된 동안 매초 3~7의 생명력을 회복합니다.</span></p>'},
		{display:'show', ver:'s1', job:'com', grade:'leg', parts:'acc', icon:'def', type:'def', name:'보복(흉포함, 방어력 - 단계 III)',  detail:'<p class="gem_effect"><span class="acc">받는 피해의 10~20%가 억제됩니다. 방어, 기만, 또는 섬뜩함 기술을 사용하면 억제되었던 모든 피해가 250% 증폭되어 폭발하며 주위의 적들에게 최대 1360~2040의 화염 피해를 줍니다.</span></p>'},
		{display:'show', ver:'s1', job:'com', grade:'leg', parts:'acc', icon:'def', type:'def', name:'신중한 마음(흉포함, 방어력 - 단계 III)',  detail:'<p class="gem_effect"><span class="acc">일격에 20% 이상의 생명력을 잃을 경우, 2.0~4.0초간 면역을 얻습니다. 이 효과는 110초에 한 번씩만 발동합니다.</span></p>'},
		{display:'show', ver:'s1', job:'com', grade:'leg', parts:'acc', icon:'uti', type:'uti', name:'결의(간악함, 보조)',  detail:'<p class="gem_effect"><span class="acc">자원 고갈 효과가 40~50% 감소합니다. 추가로, 자원 생성량이 3.0~8.0% 증가합니다.</span></p>'},
		{display:'show', ver:'s1', job:'com', grade:'leg', parts:'acc', icon:'uti', type:'uti', name:'반격(간악함, 보조 - 단계 III)',  detail:'<p class="gem_effect"><span class="acc">자신에게 걸린 군중 제어 효과가 제거될 때마다 주위 적들에게 510~680의 화염 피해를 줍니다.</span></p>'},
		{display:'show', ver:'s1', job:'com', grade:'leg', parts:'acc', icon:'uti', type:'uti', name:'치밀한 자(간악함, 보조 - 단계 III)',  detail:'<p class="gem_effect"><span class="acc">주 자원을 150~200 소모하면 다음 공격에 적중당한 적을 2초 동안 기절시킵니다.</span></p>'},
		{display:'show', ver:'s1', job:'com', grade:'leg', parts:'acc', icon:'tra', type:'tra', name:'악의 맹약(진노함, 초월적)',  detail:'<p class="gem_effect"><span class="acc">적을 20마리 처치할 때마다 악의 보너스를 돌아가며 적용받습니다. <span class="text-block">사악함 : 공격 속도를 20% 획득합니다.</span><span class="text-block">간악함: 핵심 및 기본 기술이 15% 확률로 자원을 완전히 회복시킵니다.</span><span class="text-block">흉포함: 21초마다 85~102 피해를 흡수하는 보호막을 획득합니다.</span></span></p>'},
		{display:'show', ver:'s1', job:'com', grade:'leg', parts:'acc', icon:'tra', type:'tra', name:'죄어오는 죽음(진노함, 초월적)',  detail:'<p class="gem_effect"><span class="acc">대상에게 걸린 서로 다른 군중 제어 효과 하나당 지속 피해 효과가 30~40% 증가합니다. 저지 불가 상태의 괴물과 비틀거리는 우두머리는 그 대신 지속 피해 효과로부터 110~130%의 추가 피해를 받습니다.</span></p>'},
		{display:'show', ver:'s1', job:'com', grade:'leg', parts:'acc', icon:'tra', type:'tra', name:'이발사(진노함, 초월적 - 단계 III)',  detail:'<p class="gem_effect"><span class="acc">2.0~4.0초 동안 대상이 받은 극대화 피해와 그 이후의 모든 피해를 흡수합니다. 그 후, 흡수된 피해가 한꺼번에 주위의 적들을 향해 폭발합니다. 축적된 피해는 매초 10% 증가합니다.</span></p>'},
		{display:'show', ver:'s1', job:'bab', grade:'leg', parts:'acc', icon:'off', type:'off', name:'집중된 분노(사악함, 공격력)',  detail:'<p class="gem_effect"><span class="acc">2초 내에 100~60 분노를 사용한 이후, 비 기본 기술의 극대화 확률이 20~30% 증가합니다.</span></p>'},
		{display:'show', ver:'s1', job:'bab', grade:'leg', parts:'acc', icon:'def', type:'def', name:'되살아나는 생명력(흉포함, 방어력)',  detail:'<p class="gem_effect"><span class="acc">생명력이 40~60% 이하인 경우, 모든 출처에서 받는 회복량이 50~60% 증가합니다.</span></p>'},
		{display:'show', ver:'s1', job:'bab', grade:'leg', parts:'acc', icon:'uti', type:'uti', name:'무시무시한 속도(간악함, 보조)',  detail:'<p class="gem_effect"><span class="acc">기술의 공격 속도가 20~35%보다 높으면 기술이 20~30% 확률로 모든 적을 1.25초 동안 넘어뜨립니다.</span></p>'},
		{display:'show', ver:'s1', job:'bab', grade:'leg', parts:'acc', icon:'tra', type:'tra', name:'고통 감내(진노함, 초월적 - 단계 IV)',  detail:'<p class="gem_effect"><span class="acc">받는 피해가 5~15% 확률로 무시되고 대신 생명력을 17~68 회복합니다.</span></p>'},
		{display:'show', ver:'s1', job:'dru', grade:'leg', parts:'acc', icon:'off', type:'off', name:'분노하는 달(사악함, 공격력)',  detail:'<p class="gem_effect"><span class="acc">처치 시 5% 확률로 늑대 동료를 20~30초 동안 소환합니다. 추가로 늑대 기술의 등급이 +3 증가합니다.</span></p>'},
		{display:'show', ver:'s1', job:'dru', grade:'leg', parts:'acc', icon:'def', type:'def', name:'동요하는 바람(흉포함, 방어력) ',  detail:'<p class="gem_effect"><span class="acc">근거리에 적이 8~13마리 있을 때 자동으로 회오리 갑옷을 시전합니다. 이 효과는 10~20초에 한 번씩만 발동합니다.</span></p>'},
		{display:'show', ver:'s1', job:'dru', grade:'leg', parts:'acc', icon:'uti', type:'uti', name:'거침없는 힘(간악함, 보조)',  detail:'<p class="gem_effect"><span class="acc">궁극기가 활성화되어 있는 동안 원거리에 있는 적 최대 30~50마리를 자신에게 끌어옵니다.</span></p>'},
		{display:'show', ver:'s1', job:'dru', grade:'leg', parts:'acc', icon:'tra', type:'tra', name:'고삐 풀린 야수(진노함, 초월적 - 단계 IV)',  detail:'<p class="gem_effect"><span class="acc">기절, 빙결 또는 넘어뜨리기 효과에 적중당하면 40~60% 확률로 회색곰의 격노가 자동으로 3초 동안 활성화됩니다.</span></p>'},
		{display:'show', ver:'s1', job:'nec', grade:'leg', parts:'acc', icon:'off', type:'off', name:'신성모독자(사악함, 공격력)',  detail:'<p class="gem_effect"><span class="acc">시체 주위를 걸어가면 매초 장착 중인 시체 기술이 자동으로 시전 되며 30~40% 감소한 피해를 줍니다.</span></p>'},
		{display:'show', ver:'s1', job:'nec', grade:'leg', parts:'acc', icon:'def', type:'def', name:'노화 오라(흉포함, 방어력)',  detail:'<p class="gem_effect"><span class="acc">주위에 적이 5마리 이상 있을 때, 주위 적들에게 자동으로 5~15초 동안 노화의 저주를 거는 오라를 얻습니다.</span></p>'},
		{display:'show', ver:'s1', job:'nec', grade:'leg', parts:'acc', icon:'uti', type:'uti', name:'얼어붙은 공포(간악함, 보조)',  detail:'<p class="gem_effect"><span class="acc">행운의 적중: 최대 10~20% 확률로 2.5초 동안 공포에 질리게 합니다. 공포에 질린 적이 매초 20% 확률로 빙결됩니다.</span></p>'},
		{display:'show', ver:'s1', job:'nec', grade:'leg', parts:'acc', icon:'tra', type:'tra', name:'대향연(진노함, 초월적 - 단계 IV)',  detail:'<p class="gem_effect"><span class="acc">각각의 하수인이 매초 정수를 1.0~2.0 고갈시키지만 50~75%의 추가 피해를 줍니다. 하수인이 없을 경우 이 추가 피해 효과가 자신에게 적용되어 매초 정수를 5씩 고갈시킵니다.</span></p>'},
		{display:'show', ver:'s1', job:'rog', grade:'leg', parts:'acc', icon:'off', type:'off', name:'집속탄(사악함, 공격력)',  detail:'<p class="gem_effect"><span class="acc">행운의 적중: 최대 20% 확률로 섬광 수류탄을 3개 발사해 26~32의 물리 피해를 주고 적을 0.50초 동안 기절시킵니다.</span></p>'},
		{display:'show', ver:'s1', job:'rog', grade:'leg', parts:'acc', icon:'def', type:'def', name:'속임수(흉포함, 방어력)',  detail:'<p class="gem_effect"><span class="acc">기만 기술 사용 시, 적을 도발하는 불안정한 그림자 미끼 덫을 그 자리에 놓습니다. 그림자 미끼 덫은 6.0초 후에 폭발하여 680~1020의 암흑 피해를 줍니다. 이 효과는 5초에 한 번씩만 발동합니다.</span></p>'},
		{display:'show', ver:'s1', job:'rog', grade:'leg', parts:'acc', icon:'uti', type:'uti', name:'절단 사격(간악함, 보조)',  detail:'<p class="gem_effect"><span class="acc">행운의 적중: 최대 20~40% 확률로 암살 기술이 적을 3초 동안 40% 감속시키고, 명사수 기술이 적을 밀쳐냅니다.</span></p>'},
		{display:'show', ver:'s1', job:'rog', grade:'leg', parts:'acc', icon:'tra', type:'tra', name:'사악한 약제사(진노함, 초월적 - 단계 IV)',  detail:'<p class="gem_effect"><span class="acc">공격 시 5~15% 확률로 모든 주입 효과를 원래 지속 효력의 40~50%로 적용합니다.</span></p>'},
		{display:'show', ver:'s1', job:'soc', grade:'leg', parts:'acc', icon:'off', type:'off', name:'탈라샤(사악함, 공격력)',  detail:'<p class="gem_effect"><span class="acc">각 고유 원소로 피해를 줄 때마다 3~10초 동안 주는 피해가 7~12% 증가합니다.</span></p>'},
		{display:'show', ver:'s1', job:'soc', grade:'leg', parts:'acc', icon:'def', type:'def', name:'주문 파괴(흉포함, 방어력)',  detail:'<p class="gem_effect"><span class="acc">원소 피해를 받은 후에 5초 동안 해당 원소에 대한 저항이 20~40% 증가합니다.</span></p>'},
		{display:'show', ver:'s1', job:'soc', grade:'leg', parts:'acc', icon:'uti', type:'uti', name:'앙심(간악함, 보조)',  detail:'<p class="gem_effect"><span class="acc">군중 제어 효과에 걸렸을 때, 20~40% 확률로 해당 효과를 건 적과 주위 모든 적이 3초 동안 같은 효과에 걸립니다.</span></p>'},
		{display:'show', ver:'s1', job:'soc', grade:'leg', parts:'acc', icon:'tra', type:'tra', name:'전능(진노함, 초월적 -단계 IV)',  detail:'<p class="gem_effect"><span class="acc">투사체를 발사하는 핵심 기술이 마나를 모두 소모합니다. 추가 마나를 35~45 소모할 때마다, 추가 투사체를 하나 발사하고 피해가 3.0~5.0% 증가합니다.</span></p>'},
			
	];
	method.init = function(){
		method.setElement();
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
		method.uiFunc();
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
		obj.invenOptionList = $('#container .inven .equ .option-list');
		obj.delOpt = $('.button-option-del');
	
		//encodeURI()
		obj.urlStr = window.location.href;
		obj.url = new URL(obj.urlStr);
		obj.urlParams = obj.url.searchParams;
	};
	method.uiFunc = function(){
		obj.container.on('focusout', function(){ $(this).removeAttr('tabindex') });
		$('#wrap [data-display=hide]').remove(); //data-display="hide" 삭제

		$(document).on('keydown', '[role=button]', function(e){
			if (e.keyCode === 32 || e.keyCode === 13) {// enter & space 
				e.preventDefault();
				$(this).trigger('click');
			}
		});
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
		$('#container .inven .equ').each(function(){
			$(this).on('click', '.box-aspect .aspect-detail', function(){
				if ($(this).find('.aspect-parts, .acquest').length > 0) {
					$(this).toggleClass('active');
				}
			}).on('click', '.box-aspect .gem-info', function(){
				if ($(this).find('.detail').length > 0) {
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
		//은총 로딩 셋팅
		obj.spiritBoons.find('.button-spirit[aria-selected=true]').each(function(){
			var $desc = $(this).parents('.spirit-grid').find('.spirit-description');
			$desc.append('<p class="spirit-selected" data-target="'+$(this).attr('id')+'"><span class="text-name">'+$(this).text()+'</span><span class="text-detail">'+$(this).attr('title')+'</span></p>');
		})
	};

	method.jobSelect = function(){ 
		//직업 선택
		$('#header .button-job, .button-reset').on('click', function(){
			var $this = $(this);
			var $job = $(this).attr('data-tab-select');
			if (!$(this).is('[aria-selected=true]')) {
				if ($('[aria-controls=aspectSelect][data-target]').length > 0 || $('[aria-controls=gemSelect][data-gem-icon]').length > 0  || $('input[type=text]').val() !== '') {
					method.layerFunc('settingReset', true, '현재 셋팅된 <strong>위상/옵션/보석/입력값</strong>등이 있습니다.<br>확인을 누르면 셋팅된  <strong class="underline">위상/옵션/보석/입력값</strong> 들이 초기화 됩니다. <br>그래도 초기화 하시겠습니까?', true);
					$(document).on('click', '#settingReset .button-submit', function(){
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
					($this.hasClass('sub-equ-char')) 
						? $('.inven-wep .equ').eq(1).removeClass('wep').addClass('sub') 
						: $('.inven-wep .equ').eq(1).addClass('wep').removeClass('sub')
					$('#container .inven-spirit .spirit-grid').removeClass('active').find('.button-spirit').attr('aria-selected', false).prop('disabled', false);
					$('#container .spirit-description').empty();
					if ($job == 'dru' || $job == 'soc') {
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
				method.delOpt();
				method.delSpirit();
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
			var $optBtn = $detailButton.find('.button-option-select');
			var $optListLen = $detailButton.find('.option-list .grid-option').length;
			obj.aspectID = $(this).attr('id');
			obj.partsID = $('.inven .equ .option.active').attr('id');
			$('.sort-by-all').trigger('click');
			$('#'+$target).attr('aria-selected', false);
			$('.inven .equ .option.active').addClass('selected').attr({'data-target':$(this).attr('id')}).parent().attr({'data-parts':$(this).parent().attr('data-parts'), 'data-ver':$(this).parent().attr('data-ver')})//[data-*]
			obj.aspectOpen.removeClass('active');
			obj.aspectLayer.removeClass('active');
			obj.container.find('.inven').removeClass('active');
			//$detailButton.find('.box-aspect').empty().append($(this).children().clone());
			$(this).attr({'data-select-parts':obj.partsID});
			($(this).find('.aspect-name').hasClass('type-uni')) 
				? $detailButton.addClass('type-uni')
				: $detailButton.removeClass('type-uni');
			method.invCheck(obj.aspectID);
			obj.urlParams.set(obj.partsID, obj.aspectID);
			method.getSetting();
			method.fixedViewPort(false);
			//옵션+ 일때 위상 선택 후 옵션창 열기
			if (obj.body.is('.option-view') && $optListLen < 1 && $(this).parent().attr('data-grade') !== 'uni') {
				$optBtn.trigger('click');
			}
		})
	};
	/*
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
	*/

	method.itemOption = function(){
		//아이템 옵션 선택
		var $optionButton = $('.button-option-select');
		var $optionLayer = $('#'+$optionButton.attr('aria-controls'));
		var $optionInput = $optionLayer.find('.option-input');
		var $optionCopy = $optionLayer.find('.button-copy');
		var $selected = $optionLayer.find('.selected-option');
		var $alert = $('.box-alert');
		$optionButton.on('click', function(){
			if ($(this).parents('.equ').find('.option').is('[data-target]')) {
				var $parts = $(this).attr('data-option-parts');
				var $invenOption = $(this).siblings('.option-list');
				(!$invenOption.find('.grid-option').length < 1) 
					? $(this).removeClass('modify')
					: $(this).addClass('modify');
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
			} else {
				method.layerFunc($optionButton.attr('aria-controls'), false);
				method.layerFunc('selectAspect', true, '위상을 먼저 선택해주세요.', false);
			}
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
			var $opt = [];
			var $inven = $('.trigger-active').siblings('.option-list');
			$inven.empty().append($('.selected-option .grid-option').clone());
			method.layerFunc('optionSelect', false);
			$('.selected-option .grid-option').each(function(idx, item){
				var $this = $(item).attr('aria-controls');
				$opt.push($this);
				$inven.attr('data-target', $opt)
			})
			obj.urlParams.delete($inven.attr('id'));
			obj.urlParams.set($inven.attr('id'), $opt);
			method.getSetting();
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
			$layerGems.find('.gems-list').append('<div data-display="'+gem.display+'" class="gems-grid" data-job="'+gem.job+'" data-grade="'+gem.grade+'" data-parts="'+gem.parts+'"><button class="button-gem each-gem" data-gem-icon="'+gem.icon+'" data-gem-grade="'+gem.grade+'" "aria-selected="false" id="G'+index+'"><span class="gem-info"><span class="name">'+gem.name+'</span><span class="detail">'+gem.detail+'</span></span></button></div>');
		});
		$layerGems.find('[data-grade=leg]').wrapAll('<div class="gems-group" data-group="leg"></div>');
		$layerGems.find('[data-grade=nor]').wrapAll('<div class="gems-group" data-group="nor"></div>');
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
			if ($(this).is('.active')) { //선택 강조
				var $target = $('#'+$(this).attr('data-target'));
				$layerGems.find('.button-gem').removeClass('selected');
				if ($target.is('[data-gem-grade=leg]')) {
					$target.addClass('selected').focus();
				}
			} else {
				$layerGems.find('.button-gem').removeClass('selected');
				$layerGems.find('.layer-body').animate({scrollTop: '0'}, 300);
			}

		})
		$layerGems.on('click', '.button-gem, .button-close', function(){
			if ($(this).is('.button-gem')) {
				var $gem = $(this).attr('data-gem-icon');
				var $id = $(this).attr('id');
				var $target = $('[aria-controls=gemSelect].active').attr('id');
				if ($(this).is('[data-gem-grade=leg]')) {
					$layerGems.find('.button-gem').attr('aria-selected', false);
					$(this).attr('aria-selected', true);
				}
				$('[aria-controls=gemSelect].active').addClass('selected').attr({'data-gem-icon':$gem, 'data-target':$id});
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
	method.spiritBoons = function(){
		//영혼 은총
		var $spirit = obj.spiritBoons.find('button');
		var $grid = obj.spiritBoons.find('.spirit-grid');
		$grid.each(function(index){
			var $button = $(this).find('.button-spirit');
			function blessingActive(){}
			$(this).on('click', '.button-blessing[aria-selected=false]', function(){
				var $spi = [];
				$grid.find('.button-blessing').attr('aria-selected', false);
				$(this).attr('aria-selected', true);
				$grid.find('[aria-selected]').attr('disabled', false);
				$grid.find('[aria-selected=true] ~ [aria-selected=true]').attr('aria-selected', false);
				if ($('[data-target='+$('.spirit-grid.active').find('[aria-selected=true]').attr('id')+']').siblings().attr('data-target') !== undefined) { 
					//은총 재선택일때 이중선택 해제
					$('#'+$('[data-target='+$('.spirit-grid.active').find('[aria-selected=true]').attr('id')+']').siblings().attr('data-target')).prop('aria-selected', false);
					$('[data-target='+$('.spirit-grid.active').find('[aria-selected=true]').attr('id')+']').siblings().remove();
					$('.button-spirit[aria-selected=true]').each(function(){
						$spi.push($(this).attr('id'))
						$('#spirit').attr('data-target', $spi)
					})
					obj.urlParams.set('SPD', $('#spirit').attr('data-target'));
					method.getSetting();
				}
				$grid.find('.button-blessing').attr('aria-selected', false);
				$(this).attr('aria-selected', true);
				$(this).parents('.spirit-grid').addClass('active').siblings().removeClass('active');
				$('.description').slideUp(300);
				obj.urlParams.set('SPB', obj.spiritBoons.find('.button-blessing[aria-selected=true]').attr('id'));
				method.getSetting();
			}).on('click', '.button-spirit[aria-selected]', function(){
				var $spi = [];
				var $name = $(this).attr('name');
				var $text = $(this).text();
				var $id = $(this).attr('id');
				var $detail = $(this).attr('title');
				var $description = $(this).parents('.spirit-grid').find('.spirit-description');
				var $thisGrid = $(this).parents('.spirit-grid');
				var $line = $(this).parents('.spirit-frame');
				if ($thisGrid.is('.active')) {
					if ($(this).is('[aria-selected=true]')) {
						$(this).attr('aria-selected', false)
						if ($('.spirit-description').find('[data-target]').length > 1) {
							$('.spirit-description [data-target='+$id+']').remove();
						}
					} else {
						$(this).attr('aria-selected', true)
						$description.append('<p class="spirit-selected" data-target="'+$id+'"><span class="text-name">'+$text+'</span><span class="text-detail">'+$detail+'</span></p>');
					}
					($line.find('[aria-selected=true]').length == 2 ) 
						? obj.spiritBoons.find('.spirit-grid.active').find('[aria-selected=false]').prop('disabled', true)
						: obj.spiritBoons.find('.spirit-grid.active').find('[aria-selected]').prop('disabled', false)
				} else {
					$(this).attr('aria-selected', true).siblings().attr('aria-selected', false);
					$description.html('<p class="spirit-selected" data-target="'+$id+'"><span class="text-name">'+$text+'</span><span class="text-detail">'+$detail+'</span></p>');
				}
				$('.button-spirit[aria-selected=true]').each(function(){
					$spi.push($(this).attr('id'))
					$('#spirit').attr('data-target', $spi)
				})
				obj.urlParams.set('SPD', $('#spirit').attr('data-target'));
				method.getSetting();
			})
		})
	};
	method.getSetting = function(){
		var job = obj.urlParams.get('job');
		//직업 로드
		if (job == undefined) {
			obj.urlParams.set('job', 'dru');
			//$('#header .button-job[data-tab-select]').attr('aria-selected', false);
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
				$box.empty().append($('#'+$(this).attr('data-target')).find('.aspect-detail').clone().attr({'role':'button', 'tabindex':'0'}));
				$('#'+$(this).attr('data-target')).attr({'aria-selected': true,'data-select-parts': $parts}); //선택된 위상 표시
			}
			//유니크 장비 체크
			($(this).siblings('.text').find('.aspect-name').is('.type-uni')) 
				? $(this).siblings('.text').addClass('type-uni')
				: $(this).siblings('.text').removeClass('type-uni');
			//보조무기 선택여부
			if ($('#wep2, #wep4').is('.selected') && obj.job == 'dru' || obj.job == 'soc' || obj.job == 'nec') { method.wepChange(false) };
		})
		//보석 로드
		obj.gems.each(function(){
			$(this).attr('data-target', obj.urlParams.get($(this).attr('id')));
			$(this).attr('data-gem-icon', $('#'+$(this).attr('data-target')).attr('data-gem-icon'));
			if ($(this).is('[data-target]') && $('#'+$(this).attr('data-target')).attr('data-gem-grade') == 'leg' ) {
				$(this).parents('.equ').find('.text .box-aspect .gem-info').remove();
				$(this).parents('.equ').find('.text .box-aspect').append($('#'+$(this).attr('data-target')).attr('aria-selected', true).find('.gem-info').clone().attr({'data-gem-type':$('#'+$(this).attr('data-target')).attr('data-gem-icon'), 'role':'button', 'tabindex':'0'}));
			} else {
				$(this).parents('.equ').find('.text .box-aspect .gem-info').remove();
			}
		})
		//URL입력값
		obj.settingInput.each(function(){
			var $id = $(this).attr('id');
			var $more = $('#'+$id).siblings('.link-frame');
			var $iframe = $('#'+$id).parents('.box-line').find('iframe');
			$('#'+$id).val(obj.urlParams.get($id));
			$iframe.attr('src', obj.urlParams.get($id));
			if ($('#'+$id).val().indexOf('http') !== -1 ) {
				if ($('#'+$id).val().length > 0) {
					$more.show();
				} else {
					$more.attr('aria-expanded', false).hide();
					$iframe.parent().attr('aria-hidden', true).hide();
				}
			} else {
				$more.attr('aria-expanded', false).hide();
				$iframe.parent().attr('aria-hidden', true).hide();
			}
		})
		//은총 로드
		obj.spiritBoons.find('.button-spirit').each(function(){
			var $this = $('#spirit');
			var $desc = $(this).parents('.list-type').siblings('.spirit-description')
			if ($('#'+obj.urlParams.get('SPB')).length > 0) {
				method.expandFunc('.spirit-open', true);
				$('#'+obj.urlParams.get('SPB')).attr('aria-selected', true).parents('.spirit-grid').addClass('active');
				$('#container .inven-spirit .description').hide();
			}
			$this.attr('data-target', obj.urlParams.get('SPD'));
			if ($this.is('[data-target]')) {
				var $sp = $this.attr('data-target').split(',')
				$.each($sp, function(index, item){
					$('#'+item).attr('aria-selected', true);
				});
				($('.spirit-grid.active').find('.button-spirit[aria-selected=true]').length >= 2 )
					? $('.spirit-grid.active').find('.button-spirit[aria-selected=false]').attr('disabled', true)
					: $('.spirit-grid.active').find('.button-spirit[aria-selected]').attr('disabled', false)
			}
		})
		//옵션 로드
		obj.invenOptionList.each(function(index){
			var $this = $(this);
			var $id = $(this).attr('id');
			$(this).attr('data-target', obj.urlParams.get($id));
			if ($(this).attr('data-target') == undefined || $(this).attr('data-target') == '') {
				obj.urlParams.delete($(this).attr('id'));
			} else {
				if ($this.find('.grid-option').length == 0) {
					var $opt = $(this).attr('data-target').split(',');
					obj.body.addClass('option-view').find('#container .box-title .button-option-view').attr('aria-checked', true);
					$this.siblings('.button-option-select').addClass('modify');
					$.each($opt, function(index, item){
						$this.append($('#'+item).clone().removeAttr('id').attr('aria-controls', item))
					});
				}
			}
		})
		//옵션 삭제
		if ($('.option-list .grid-option').length > 0) {
			obj.delOpt.show();
			obj.delOpt.on('click', function(){
				method.layerFunc('optionDelete', true, '선택된 <strong>모든 부위 옵션이 초기화</strong> 됩니다.<br>진행 하시겠습니까?', true);
				$(document).on('click', '#optionDelete .button-submit', function(){
					$('.option-list').empty().removeAttr('data-target');
					$('#container .inven .equ .button-option-select').removeClass('modify');
					obj.delOpt.hide();
					method.delOpt();
					method.getSetting();
				})
			})
		}
		history.replaceState({}, null, obj.url);
	};
	method.delEqu = function(){
		obj.aspect.each(function(){
			var $id = $(this).attr('id')
			obj.urlParams.delete($id);
		})
	};
	method.delGems = function(){
		obj.gems.each(function(){
			var $id = $(this).attr('id')
			obj.urlParams.delete($id);
		})
	};
	method.delUrl = function(){
		obj.settingInput.each(function(){
			var $id = $(this).attr('id')
			obj.urlParams.delete($id);
		})
	};
	method.delOpt = function(){
		obj.invenOptionList.each(function(){
			var $id = $(this).attr('id')
			obj.urlParams.delete($id);
		})
	};
	method.delSpirit = function(){
		obj.urlParams.delete('SPB');
		obj.urlParams.delete('SPD');
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
				if ($(this).is('.button-option-select')) {
					$(this).addClass('trigger-active');
				}
				method.layerFunc($target, true);
			}
		})
	};
	method.layerFuncClose = function(){
		$('.box-layer').on('click', '[data-dismiss=modal], .dimmed', function(e){
			e.preventDefault();
			var $target = $(this).parents('[role=dialog], [role=alertdialog]').attr('id');
			$('[aria-controls='+$target+']').removeClass('trigger-active');
			method.layerFunc($target, false);
		})
	};
	method.layerFunc = function($target, $boolean, $content, $confirm){
		$('.common-layer').attr('id', $target);
		if ($('#'+$target).get(0) !== undefined) {
			var $targetPopup = $('#'+$target);
			var $cont = $('#layerContent');
			var firstTabStop = 0;
			var lastTabStop = 0;
			if ($confirm) {
				$targetPopup.attr('role', 'dialog');
				if ($targetPopup.find('.button-cancel').length < 1) {
					$targetPopup.find('.box-button').append('<button class="button-cancel" data-dismiss="modal">취소</button>');
				}
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
				//firstTabStop.focus();
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
					$('[aria-haspopup=dialog][aria-controls='+$target+']').focus().removeClass('trigger-active');
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
	method.aspectMultiply = function($number){
		obj.aspectList.find('.txt_calc').each(function(){
			var $basicNum = $(this).attr('data-origin');
			$(this).text(parseInt($basicNum * $number / 10));
		});
	};
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
		$('.option-list').removeAttr('data-target').empty(); //옵션 리셋
		obj.delOpt.removeAttr('style') //옵션 삭제 버튼 숨김
		method.layerFunc('optionSelect', false); //옵션 레이어 닫기
		method.fixedViewPort(false);
	};
	method.fixedViewPort = function(fixedView){
		(fixedView) ? obj.body.addClass('scroll-lock header-flip') : obj.body.removeClass('scroll-lock header-flip');
	};
	return{
		init : method.init,
		scrollFunc : method.scrollFunc,
		//setAspect : method.setAspect,
		layerFunc : method.layerFunc,
	}
})();
D4SkillDB.init();