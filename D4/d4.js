$(document).ready(function(){
	$('#imageConvert').on('click', function () {
		$('body').scrollTop(0);
		html2canvas(document.getElementById('imageCanvas'), {
			allowTaint: true,
			useCORS: true
		}).then(function (canvas) {
			$('#previewImg').html('<img src="'+canvas.toDataURL()+'">');
		});
	});
	$('#wep1').addClass('active');
	$('#skill-num39').click();
})

var D4SkillDB = (function(){
	var method = {};
	var obj = {};
	var option = {};
	var board = [
		{job:'dru', name:'착취', detail:'블라블라'},
		{job:'dru', name:'변신술사', detail:'블라블라'},
	];
	var skills = [
		// job = com|dru|bab|soc|rog|nec
		// parts = wep|sub|hel|che|glo|pan|boo|amu|rin
		// type = leg|uni
		// icon = off|def|uti|res|mob|emp
		// name = skill name
		// detail = skill detail
			// off = amu wep glo rin
			// def = sub hel che pan amu
			// uti = sub hel che amu glo boo
			// res = rin
			// mob = amu boo
			// uti = sub hel che amu glo boo
		/* uniqe item */
		{job:'dru', parts:'wep', type:'uni', icon:'wep', name:'차오르는 철월',  detail:'<p class="unique_option"><span class="c_important">칼날 발톱</span>으로 적을 처치하면 <span class="c_random">1 – 2.5</span>초 동안 <span class="c_important"><span class="text-line">은폐</span></span>를 얻습니다. 공격으로 <span class="c_important"><span class="text-line">은폐</span></span> 상태를 깨면 <span class="c_number"><span class="text-line">2</span></span>초 동안 공격이 확정적으로 극대화 적중하는 매복을 부여합니다.</p>'},
		{job:'dru', parts:'wep', type:'uni', icon:'wep', name:'마녀의 큰지팡이',  detail:'<p class="unique_option"><span class="c_important">발톱</span>이 <span class="c_important">폭풍</span> 기술로 변하고 <span class="c_important">폭풍 강타</span>도 시전해 원래 피해의 <span class="c_number">120 – 150%</span>만큼 피해를 줍니다.</p>'},
		{job:'dru', parts:'che', type:'uni', icon:'che', name:'미친 늑대의 환희',  detail:'<p class="unique_option">늑대인간 형상이 진정한 형상이 되며, 모든 <span class="c_important">늑대인간</span> 기술 등급이 <span class="c_number">+2</span> 상승합니다.</p>'},
		{job:'dru', parts:'che', type:'uni', icon:'che', name:'만족을 모르는 분노',  detail:'<p class="unique_option">곰인간 형상이 진정한 형상이 되며, 모든 <span class="c_important">곰인간</span> 기술 등급이 <span class="c_number">+2</span> 상승합니다.</p>'},
		{job:'dru', parts:'hel', type:'uni', icon:'hel', name:'폭풍의 포효',  detail:'<p class="unique_option"><span class="c_label">행운의 적중:</span> <span class="c_important">폭풍</span> 기술이 최대 <span class="c_random">15 – 25%</span> 확률로 영력을 <span class="c_number">4</span> 부여합니다.<br>기본 <span class="c_important">폭풍</span> 기술이 <span class="c_important">늑대인간</span> 기술로도 취급됩니다.</p>'},
		{job:'dru', parts:'hel', type:'uni', icon:'hel', name:'바실리의 기도',  detail:'<p class="unique_option"><span class="c_important">대지</span> 기술이 이제 <span class="c_important">곰인간</span> 기술로도 취급되며 자신을 <span class="c_number"><span class="text-line">4 - 8</span></span>만큼 <span class="c_important"><span class="text-line">보강</span></span>합니다.</p>'},
		{job:'dru', parts:'pan', type:'uni', icon:'pan', name:'폭풍의 동료',  detail:'<p class="unique_option">자신의 <span class="c_important">늑대</span> 동료에게 폭풍의 힘이 깃들어 늑대가 번개 피해를 주고 <span class="c_important">폭풍의 포효</span> 능력을 얻습니다.</p>'},
		{job:'dru', parts:'rin', type:'uni', icon:'rin', name:'사냥꾼의 정점',  detail:'<p class="unique_option"><span class="c_important">변신</span> 기술로 대상을 처치하면 다음 보너스를 얻습니다.<br><span class="c_gold">늑대인간:</span> 다음 비<span class="c_important">궁극기</span> <span class="c_important">곰인간</span> 기술이 자원을 소모하지 않으며 재사용 대기시간이 사라집니다.<br><span class="c_gold">곰인간:</span> 다음 <span class="c_important">늑대인간</span> 기술로 처음 피해를 주면 생명력을 <span class="c_number"><span class="text-line">216 - 413</span></span> 회복합니다.</p>'},
		
		{job:'bab', parts:'wep', type:'uni', icon:'wep', name:'라말라드니의 역작',  detail:'<p class="unique_option">보유한 분노 1당 이 무기를 사용하는 기술이 주는 피해가 <span class="c_random">0.1 – 0.3%</span> 증가하지만, 매초 분노를 <span class="c_number">2</span> 잃습니다.</p>'},
		{job:'bab', parts:'wep', type:'uni', icon:'wep', name:'선조의 맹세',  detail:'<p class="unique_option"><span class="c_important">강철 손아귀</span>가 사슬을 <span class="c_number">2</span>개 추가로 던집니다. <span class="c_important">강철 손아귀</span>에 적중당한 적은 <span class="c_number">3</span>초 동안 <span class="c_random">55 – 65%</span> 감속됩니다.</p>'},
		{job:'bab', parts:'wep', type:'uni', icon:'wep', name:'지옥망치',  detail:'<p class="unique_option"><span class="c_important">지각 변동</span>이 바닥에 불을 붙이고 적을 불태워 <span class="c_number">3</span>초에 걸쳐 <span class="c_random"><span class="text-line">294 - 420</span></span>의 추가 피해를 줍니다.</p>'},
		{job:'bab', parts:'wep', type:'uni', icon:'wep', name:'과잉 살상기',  detail:'<p class="unique_option"><span class="c_important">결정타</span>가 충격파를 일으켜, 적들에게 기본 공격력의 <span class="c_random">16 – 30%</span>만큼 피해를 줍니다. 이 효과에 적이 죽으면 <span class="c_important">결정타</span>의 재사용 대기시간이 초기화됩니다.</p>'},
		{job:'bab', parts:'wep', type:'uni', icon:'wep', name:'심홍색의 전장',  detail:'<p class="unique_option">이 무기를 사용하는 동안 <span class="c_important">파열</span>로 적 1마리 이상에게 피해를 주면 피 웅덩이가 생깁니다. 피 웅덩이는 <span class="c_number">6</span>초에 걸쳐 <span class="c_random"><span class="text-line">151 - 285</span></span>의 출혈 피해를 줍니다. 웅덩이 안에 서 있는 적은 받는 출혈 피해가 <span class="c_number">10%</span> 증가합니다.</p>'},
		{job:'bab', parts:'amu', type:'uni', icon:'amu', name:'전투 무아지경',  detail:'<p class="unique_option"><span class="c_important">광분</span> 중첩이 최대일 때, 다른 기술들의 공격 속도가 <span class="c_random">10 – 20%</span> 증가합니다.</p>'},
		{job:'bab', parts:'boo', type:'uni', icon:'boo', name:'만보',  detail:'<p class="unique_option"><span class="c_important">걸어다니는 무기고</span> 핵심 지속 효과의 마지막 피해 보너스를 얻은 후, 자동으로 <span class="c_important">발 구르기</span>를 시전하고 분노를 <span class="c_random"><span class="text-line">32 – 50</span></span> 얻습니다. 이 효과는 <span class="c_number"><span class="text-line">30</span></span>초에 한 번씩만 발동합니다.</p>'},
		{job:'bab', parts:'che', type:'uni', icon:'che', name:'하로가스의 분노',  detail:'<p class="unique_option"><span class="c_label">행운의 적중: </span> 정예에게 출혈을 유발할 때마다 최대 <span class="c_random">20 – 40%</span> 확률로 비<span class="c_important">궁극기</span> 기술의 재사용 대기시간이 <span class="c_number">1.5</span>초 감소합니다.</p>'},
		{job:'bab', parts:'glo', type:'uni', icon:'glo', name:'고르의 파멸적인 손 보호구',  detail:'<p class="unique_option"><span class="c_important">소용돌이</span>가 끝난 후 폭발하며 주변 적들에게 총 기본 공격력의 <span class="c_random">16 - 26%</span>를 화염 피해로 줍니다.</p>'},
		
		{job:'soc', parts:'wep', type:'uni', icon:'wep', name:'화염흉터',  detail:'<p class="unique_option"><span class="c_important">소각</span>을 사용하는 동안 주기적으로 적들에게 이끌리는 잿불을 쏘아 각각 <span class="c_random"><span class="text-line">84 - 168</span></span>의 화염 피해를 줍니다.</p>'},
		{job:'soc', parts:'wep', type:'uni', icon:'wep', name:'끝없는 분노의 지팡이',  detail:'<p class="unique_option"><span class="c_important">화염구</span>를 <span class="c_number">3</span>번 시전할 때마다 <span class="c_number">2</span>개의 추가 투사체가 발사됩니다.</p>'},
		{job:'soc', parts:'wep', type:'uni', icon:'wep', name:'람 에센의 지팡이',  detail:'<p class="unique_option"><span class="c_important">번개 줄기</span>가 적을 관통하지만 주는 피해가 <span class="c_random">40 – 30%</span> 감소합니다.</p>'},
		{job:'soc', parts:'amu', type:'uni', icon:'amu', name:'에사도라의 넘실거리는 카메오',  detail:'<p class="unique_option"><span class="c_important"><span class="text-line">짜릿한 에너지</span></span>를 얻을 때 <span class="c_number">10%</span> 확률로 번개 회오리 일어나 <span class="c_random"><span class="text-line">260 - 336</span></span>의 번개 피해를 줍니다.</p>'},
		{job:'soc', parts:'boo', type:'uni', icon:'boo', name:'에수의 가보',  detail:'<p class="unique_option">극대화 확률이 자신의 이동 속도 보너스의 <span class="c_random">15 – 25%</span>만큼 증가합니다. (원소술사 전용)</p>'},
		{job:'soc', parts:'che', type:'uni', icon:'che', name:'무한의 의복',  detail:'<p class="unique_option"><span class="c_important">순간이동</span> 사용 후, 근거리에 있는 적들이 자신에게 끌려와 <span class="c_random">2 – 3</span>초 동안 기절하지만, <span class="c_important">순간이동</span>의 재사용 대기시간이 <span class="c_number">20%</span> 증가합니다.</p>'},
		{job:'soc', parts:'glo', type:'uni', icon:'glo', name:'계몽자의 장갑',  detail:'<p class="unique_option"><span class="c_important">화염구</span>가 이동하면서 튕겨 바닥에 부딪힐 때마다 폭발하지만, 폭발이 주는 피해는 <span class="c_random">65 – 75%</span> 감소합니다.</p>'},
		{job:'soc', parts:'pan', type:'uni', icon:'pan', name:'얼음심장 브레이스',  detail:'<p class="unique_option"><span class="c_important"><span class="text-line">빙결</span></span>된 상태에서 죽는 적이 <span class="c_random">11 – 20%</span> 확률로 <span class="c_important">서릿발</span>을 내뿜습니다.</p>'},
		
		{job:'rog', parts:'wep', type:'uni', icon:'wep', name:'규탄',  detail:'<p class="unique_option"><span class="c_important">연계 점수</span> <span class="c_number">3</span>점을 소모하면 <span class="c_important">핵심</span> 기술의 피해가 <span class="c_random">20 – 40%</span> 증가합니다. 이 무기를 사용하는 <span class="c_important">기본</span> 기술이 <span class="c_number">30%</span> 확률로 <span class="c_important">연계 점수</span> <span class="c_number">3</span>점을 생성합니다.</p>'},
		{job:'rog', parts:'wep', type:'uni', icon:'wep', name:'하늘사냥꾼',  detail:'<p class="unique_option">적에게 처음 주는 직접 피해가 항상 극대화로 적중합니다. 기술 시전 시점에 <span class="c_important">정밀함</span> 핵심 지속 효과 중첩이 최대일 경우 <span class="c_important">기력</span>을 <span class="c_random"><span class="text-line">15 – 25</span></span> 얻습니다. 이 효과는 시전 1회당 한 번만 발동합니다.</p>'},
		{job:'rog', parts:'wep', type:'uni', icon:'wep', name:'바람살',  detail:'<p class="unique_option"><span class="c_label">행운의 적중:</span> 이 무기로 가한 공격이 적중하면 최대 <span class="c_random">10 – 20%</span> 확률로 피해가 2배로 증가하고 대상을 밀쳐냅니다.</p>'},
		{job:'rog', parts:'amu', type:'uni', icon:'amu', name:'하칸의 말',  detail:'<p class="unique_option"><span class="c_important">화살비주입 기술</span>이 <span class="c_important">주입</span>됩니다.</p>'},
		{job:'rog', parts:'glo', type:'uni', icon:'glo', name:'그림자의 매듭끈',  detail:'<p class="unique_option"><span class="c_label">행운의 적중:</span> <span class="c_important">명사수</span> 또는 <span class="c_important">암살</span> 기술로 <span class="c_important"><span class="text-line">취약</span></span>한 적에게 피해를 주면 최대 <span class="c_random">20 – 30%</span> 확률로 자신의 공격을 흉내내는 복제된 그림자를 소환합니다.</p>'},
		{job:'rog', parts:'hel', type:'uni', icon:'hel', name:'이름 없는 자의 머리쓰개',  detail:'<p class="unique_option">군중 제어의 영향을 받는 적을 상대로 행운의 적중 확률이 <span class="c_random">15 – 25%</span> 증가합니다.</p>'},
		{job:'rog', parts:'pan', type:'uni', icon:'pan', name:'어둠 속의 눈',  detail:'<p class="unique_option"><span class="c_important">죽음의 덫</span>이 우두머리 또는 플레이어에게 적중하지 않을 경우 적을 처치할 때까지 계속 자동으로 충전됩니다. 하지만 <span class="c_important">죽음의 덫</span>의 재사용 대기시간이 <span class="c_random">15 – 30%</span> 증가합니다.</p>'},
		
		{job:'com', parts:'wep', type:'uni', icon:'wep', name:'도살자의 식칼',  detail:'<p class="unique_option"><span class="c_label">행운의 적중:</span> 적에게 공격이 극대화로 적중하면 최대 <span class="c_number">100%</span> 확률로 해당 적이 <span class="c_number">4</span>초 동안 공포에 질리고 <span class="c_random">40 – 75%</span> 감속됩니다.</p>'},
		{job:'com', parts:'wep', type:'uni', icon:'wep', name:'아시아라의 칸자르',  detail:'<p class="unique_option">이 무기로 가한 공격이 적중하면 공격 속도가 <span class="c_number">4</span>초 동안 <span class="c_random">4 – 6%</span>만큼, 최대 <span class="c_random">20.0 - 30.0%</span>까지 증가합니다.</p>'},
		{job:'com', parts:'wep', type:'uni', icon:'wep', name:'궤멸자',  detail:'<p class="unique_option"><span class="c_label">행운의 적중:</span> 자신의 기술이 <span class="c_random">15 - 25%</span> 확률로 주위의 적에게 <span class="c_number"><span class="text-line">1092</span></span>의 암흑 피해를 주고 <span class="c_number">5</span>초 동안 적이 주는 피해를 <span class="c_number">20%</span> 감소시킵니다.</p>'},
		{job:'com', parts:'wep', type:'uni', icon:'wep', name:'한아비',  detail:'<p class="unique_option">자신의 극대화 피해가 <span class="c_random">60 – 100%</span> 증가합니다.<br>이 무기에 붙는 나머지 속성이 일반적인 수준보다 높게 붙을 수 있습니다.</p>'},
		{job:'com', parts:'amu', type:'uni', icon:'amu', name:'셀리그의 녹은 심장',  detail:'<p class="unique_option"><span class="c_number">+30%</span>의 최대 자원을 얻습니다. 추가로, 피해를 받을 때 잃을 생명력 <span class="c_number">1%</span>마다 자원이 대신 <span class="c_random"><span class="text-line">3 – 8</span></span> 소모됩니다.</p>'},
		{job:'com', parts:'boo', type:'uni', icon:'boo', name:'참회의 경갑',  detail:'<p class="unique_option">적에게 <span class="c_important"><span class="text-line">오한</span></span>을 느끼게 하는 서리의 흔적을 남깁니다. <span class="c_important"><span class="text-line">오한</span></span>을 느끼는 적에게 주는 피해가 <span class="c_random">7 – 10%</span> 증가합니다.</p>'},
		{job:'com', parts:'che', type:'uni', icon:'che', name:'서슬판금',  detail:'<p class="unique_option">가시를 <span class="c_random"><span class="text-line">1680 - 2310</span></span> 얻습니다.</p>'},
		{job:'com', parts:'glo', type:'uni', icon:'glo', name:'운명의 주먹',  detail:'<p class="unique_option">공격 시 무작위로 원래 피해의 <span class="c_number">1%</span>  ~<span class="c_random">200 – 300%</span>만큼 피해를 줍니다.</p>'},
		{job:'com', parts:'glo', type:'uni', icon:'glo', name:'서리불꽃',  detail:'<p class="unique_option"><span class="c_label">행운의 적중:</span> 최대 <span class="c_random">15 – 25%</span> 확률로 적들을 <span class="c_number">2</span>초 동안 <span class="c_important"><span class="text-line">빙결</span></span>시킵니다.</p>'},
		{job:'com', parts:'hel', type:'uni', icon:'hel', name:'안다리엘의 두개골',  detail:'<p class="unique_option"><span class="c_label">행운의 적중:</span> 최대 <span class="c_random">15 – 20%</span> 확률로 독발을 발동하여 범위 내의 적들에게 <span class="c_number">5</span>초에 걸쳐 <span class="c_number">1890의 중독 피해를 줍니다.</span class="c_number"></p>'},
		{job:'com', parts:'hel', type:'uni', icon:'hel', name:'할리퀸 관모',  detail:'<p class="unique_option"><span class="c_number">10 – 20%</span>의 피해 감소를 얻습니다.<br>추가로, 모든 기술 등급이 <span class="c_number">+4</span> 상승합니다.</p>'},
		{job:'com', parts:'pan', type:'uni', icon:'pan', name:'만용',  detail:'<p class="unique_option">생명력을 <span class="c_number">100%</span> 위로 치유하는 효과가 <span class="c_number">8</span>초 동안 최대 생명력의 <span class="c_random">40 – 80%</span>에 해당하는 <span class="c_important"><span class="text-line">보호막</span></span>을 부여합니다.</p>'},
		{job:'com', parts:'rin', type:'uni', icon:'rin', name:'어머니의 품',  detail:'<p class="unique_option"><span class="c_important">핵심</span> 기술이 <span class="c_number">5</span>마리 이상의 적에게 적중하면 자원 소모량의 <span class="c_random">20 – 40%</span>를 돌려받습니다.</p>'},

		/* legend item */
		{job:'dru', parts:'sub hel che amu glo boo', type:'leg', icon:'uti', name:'모래수렁',  detail:'<p class="aspect_effect"><span class="c_important">대지</span> 기술로 피해를 주면 적중당한 적이 <span class="c_number">5</span>초 동안 <span class="c_number">25%</span> 감속됩니다.</p>'},
		{job:'dru', parts:'amu wep glo rin', type:'leg', icon:'off', name:'짓밟힌 대지',  detail:'<p class="aspect_effect"><span class="c_important">짓밟기</span>가 이제 지속시간 동안 <span class="c_important">산사태</span> 기둥을 <span class="c_number">6</span>개 소환합니다. 산사태는 원래 피해의 <span class="c_random">70 – 80%</span>만큼 피해를 줍니다. 또한 <span class="c_important">짓밟기</span>가 <span class="c_important">자연 마법</span>과 <span class="c_important">대지</span> 기술로 취급됩니다.</p>'},
		{job:'dru', parts:'amu wep glo rin', type:'leg', icon:'off', name:'공포스러운 곰',  detail:'<p class="aspect_effect"><span class="c_important">쳐부수기</span>가 <span class="c_important">대지</span> 기술로도 취급됩니다. <span class="c_important">쳐부수기</span> 시전 후 대지 파편이 <span class="c_number">2</span>초에 걸쳐 <span class="c_random">147</span>의 피해를 줍니다.</p>'},
		{job:'dru', parts:'amu wep glo rin', type:'leg', icon:'off', name:'반격',  detail:'<p class="aspect_effect"><span class="c_important"><span class="text-line">보강</span></span>의 양에 따라 <span class="c_important">핵심</span> 기술이 주는 피해가 최대 <span class="c_random">20%</span> 증가합니다.</p>'},
		{job:'dru', parts:'amu wep glo rin', type:'leg', icon:'off', name:'충격파',  detail:'<p class="aspect_effect"><span class="c_important">쳐부수기</span>가 전방으로 이동하는 충격파를 만들어, 경로에 있는 대상에게 <span class="c_important">쳐부수기</span> 피해의 <span class="c_random">60-100%</span>만큼 피해를 줍니다.</p>'},
		{job:'dru', parts:'amu wep glo rin', type:'leg', icon:'off', name:'광란의 야수인간',  detail:'<p class="aspect_effect"><span class="c_important">회색곰의 격노</span>의 지속시간이 <span class="c_random">1</span>초 증가합니다. 추가로, <span class="c_important">회색곰의 격노</span>가 활성화되어 있는 동안 공격이 극대화로 적중하면 지속시간 동안 극대화 피해가 <span class="c_number">10%</span> 증가합니다.</p>'},
		{job:'dru', parts:'amu wep glo rin', type:'leg', icon:'off', name:'폭풍추격자',  detail:'<p class="aspect_effect"><span class="c_important">회오리바람</span>이 최대 <span class="c_random">1-5</span>마리의 대상을 찾아갑니다.</p>'},
		{job:'dru', parts:'amu wep glo rin', type:'leg', icon:'off', name:'깨진돌',  detail:'<p class="aspect_effect">군중 제어의 영향을 받는 적에게 <span class="c_important">대지</span> 기술이 주는 극대화 피해가 <span class="c_random">30%</span> 증가합니다.</p>'},
		{job:'dru', parts:'amu wep glo rin', type:'leg', icon:'off', name:'여파',  detail:'<p class="aspect_effect"><span class="c_important">산사태</span>의 흙 기둥이 각각 한 번 더 타격하며, 적중할 때마다 <span class="c_random">6-12%</span>의 추가 피해를 줍니다.</p>'},
		{job:'dru', parts:'sub hel che amu glo boo', type:'leg', icon:'uti', name:'탄도학',  detail:'<p class="aspect_effect"><span class="c_important"><span class="text-line">보강</span></span> 효과가 있을 때 <span class="c_important">대지</span> 기술 등급이 <span class="c_number">+2</span> 상승합니다.</p>'},
		{job:'dru', parts:'rin', type:'leg', icon:'res', name:'만족을 모르는 자',  detail:'<p class="aspect_effect"><span class="c_important">칼날 발톱</span>으로 적을 처치하면 다음 <span class="c_important">늑대인간</span> 기술의 영력 생성량이 <span class="c_number">20%</span> 증가하고 주는 피해가 <span class="c_number">20%</span> 증가합니다.</p>'},
		{job:'dru', parts:'rin', type:'leg', icon:'res', name:'짓이겨진',  detail:'<p class="aspect_effect">곰인간일 때 적중당하면 <span class="c_random">20%</span> 확률로 영력을 <span class="c_number">1</span> 얻습니다.</p>'},
		{job:'dru', parts:'rin', type:'leg', icon:'res', name:'잔잔한 산들바람',  detail:'<p class="aspect_effect"><span class="c_label">행운의 적중:</span> <span class="c_important">바람 칼날</span>이 최대 <span class="c_random">5-10%</span> 확률로 영력을 완전히 회복시킵니다.</p>'},
		{job:'dru', parts:'amu wep glo rin', type:'leg', icon:'off', name:'폭풍우',  detail:'<p class="aspect_effect"><span class="c_important">싹쓸바람</span>의 피해가 지속되는 시간 1초당 <span class="c_random">7.0%</span>증가합니다.</p>'},
		{job:'dru', parts:'sub hel che pan amu', type:'leg', icon:'def', name:'치유하는 돌',  detail:'<p class="aspect_effect"><span class="c_important">대지 방벽</span>의 지속시간이 <span class="c_number">6</span>초 증가합니다. 추가로, <span class="c_important">대지</span> 기술로 적을 처치하면 활성화된 <span class="c_important">대지 방벽</span>의 <span class="c_important"><span class="text-line">보호막</span></span>이 <span class="c_random">21</span> 회복됩니다.</p>'},
		{job:'dru', parts:'amu wep glo rin', type:'leg', icon:'off', name:'과충전',  detail:'<p class="aspect_effect"><span class="c_label">행운의 적중:</span> 번개 피해를 줄 때 최대 <span class="c_random">10%</span>확률로 대상을 <span class="c_number">3</span>초 동안 과부하시켜, 대상에게 주는 직접 피해가 주변 적들에게 흘러 <span class="c_number">294</span>의 추가 피해를 줍니다.</p>'},
		{job:'dru', parts:'amu wep glo rin', type:'leg', icon:'off', name:'자연의 균형',  detail:'<p class="aspect_effect"><span class="c_important">폭풍</span> 기술을 시전하면 <span class="c_number">4</span>초 동안 <span class="c_important">대지</span> 기술의 극대화 피해가 <span class="c_random">30.0-45.0%</span> 증가합니다.<br><span class="c_important">대지</span> 기술을 시전하면 <span class="c_number">4</span>초 동안 <span class="c_important">폭풍</span> 기술의 극대화 확률이 <span class="c_random">8.0-12.0%</span> 증가합니다.</p>'},
		{job:'dru', parts:'amu wep glo rin', type:'leg', icon:'off', name:'변신수의 빚',  detail:'<p class="aspect_effect"><span class="c_important">곰인간</span> 기술로 중독된 적에게 피해를 주면 즉시 중독 피해의 <span class="c_random">120%</span>를 주고 중독을 소모합니다.</p>'},
		{job:'dru', parts:'sub hel che pan amu', type:'leg', icon:'def', name:'가죽방랑자',  detail:'<p class="aspect_effect">형상을 바꾸는 <span class="c_important">변신</span> 기술을 사용하면 생명력을 <span class="c_random">21</span> 얻습니다. 생명력이 가득 찼을 때는 같은 양의 <span class="c_important"><span class="text-line">보강</span></span> 효과를 얻습니다.</p>'},
		{job:'dru', parts:'amu wep glo rin', type:'leg', icon:'off', name:'지각변동',  detail:'<p class="aspect_effect"><span class="c_important">대지의 쐐기</span>가 일직선상으로 쐐기를 날리고 <span class="c_random">1.5 – 2.5</span>초의 재사용 대기시간이 적용됩니다.</p>'},
		{job:'dru', parts:'amu wep glo rin', type:'leg', icon:'off', name:'폭풍발톱',  detail:'<p class="aspect_effect"><span class="c_important">칼날 발톱</span>이 극대화로 적중하면 대상과 주변 적들에게 주는 피해의 <span class="c_random">20%</span>를 번개 피해로 줍니다.</p>'},
		{job:'dru', parts:'rin', type:'leg', icon:'res', name:'균형 잡힌 자원',  detail:'<p class="aspect_effect"><span class="c_important">회색곰의 격노</span>가 활성화되어 있는 동안 최대 영력이 <span class="c_random">30 – 50</span>, 영력 생성량이 <span class="c_number">20%</span> 증가합니다.</p>'},
		{job:'dru', parts:'sub hel che pan amu', type:'leg', icon:'def', name:'용오름의 힘',  detail:'<p class="aspect_effect"><span class="c_important">회오리 갑옷</span>이 물리 피해 감소도 부여합니다. 추가로 <span class="c_important">회오리 갑옷</span>이 주위 모든 아군에게도 적용됩니다.</p>'},
		{job:'dru', parts:'amu wep glo rin', type:'leg', icon:'off', name:'우두머리',  detail:'<p class="aspect_effect">늑대 동료들이 이제 늑대인간 동료입니다. 늑대인간 동료들은 <span class="c_random">75-100%</span>의 추가 피해를 주고 광견병을 퍼뜨립니다.</p>'},
		{job:'dru', parts:'amu wep glo rin', type:'leg', icon:'off', name:'밤울음꾼',  detail:'<p class="aspect_effect"><span class="c_important">피의 울부짖음</span>이 극대화 확률을 <span class="c_random">5.0%</span> 증가시킵니다. 추가로, <span class="c_important">피의 울부짖음</span>이 주위의 동료와 플레이어에게 <span class="c_number">3</span>초 동안 영향을 미칩니다.</p>'},
		{job:'dru', parts:'amu wep glo rin', type:'leg', icon:'off', name:'자연의 야만성',  detail:'<p class="aspect_effect"><span class="c_important">자연의 격노</span> 핵심 지속 효과와 관련하여 <span class="c_important">늑대인간</span> 기술이 <span class="c_important">폭풍</span> 기술로 기능하며 <span class="c_important">곰인간</span> 기술이 <span class="c_important">대지</span> 기술로 기능합니다.</p>'},
		{job:'dru', parts:'amu wep glo rin', type:'leg', icon:'off', name:'양치기',  detail:'<p class="aspect_effect">활성화되어 있는 동료 한 마리당 <span class="c_important">핵심</span> 기술이 주는 피해가 <span class="c_random">6.0%</span> 증가합니다.</p>'},
		{job:'dru', parts:'sub hel che pan amu', type:'leg', icon:'def', name:'원기',  detail:'<p class="aspect_effect">늑대인간 변신 상태에서 <span class="c_random">10.0%</span>의 피해 감소를 얻습니다.</p>'},
		{job:'dru', parts:'sub hel che amu glo boo', type:'leg', icon:'uti', name:'어두운 포효',  detail:'<p class="aspect_effect"><span class="c_important">쇠약의 포효</span>가 <span class="c_important">늑대인간</span> 기술로 취급됩니다. 추가로, <span class="c_important">쇠약의 포효</span>가 중독된 적을 <span class="c_random">2 – 4</span>초 동안 이동 불가 상태로 만듭니다.</p>'},
		{job:'dru', parts:'amu wep glo rin', type:'leg', icon:'off', name:'거친 분노',  detail:'<p class="aspect_effect">동료들이 <span class="c_important">야수의 광란</span> 핵심 지속 효과의 보너스를 얻습니다.</p>'},
		{job:'dru', parts:'sub hel che amu glo boo', type:'leg', icon:'uti', name:'폭풍변형자',  detail:'<p class="aspect_effect"><span class="c_important">싹쓸바람</span>이 활성화되어 있는 동안 <span class="c_important">변신</span> 기술 등급이 <span class="c_number">+2</span> 상승합니다.</p>'},
		{job:'dru', parts:'amu wep glo rin', type:'leg', icon:'off', name:'룬세공사의 도관',  detail:'<p class="aspect_effect">자신이 시전하는 <span class="c_important">폭풍</span> 기술이 극대화로 적중하면 주위의 공기를 <span class="c_random">1.0-2.0</span>초 동안 충전하여, 범위 내의 적 한 마리를 번갯불로 주기적으로 후려쳐 <span class="c_random">240</span>의 번개 피해를 줍니다. 추가 극대화 적중 시 이 지속시간이 연장됩니다.</p>'},
		{job:'dru', parts:'amu wep glo rin', type:'leg', icon:'off', name:'강폭풍',  detail:'<p class="aspect_effect"><span class="c_important">대지의 힘</span> 핵심 지속 효과가 <span class="c_important">폭풍</span> 기술에도 적용됩니다.</p>'},
		{job:'dru', parts:'sub hel che amu glo boo', type:'leg', icon:'uti', name:'공생하는',  detail:'<p class="aspect_effect"><span class="c_important">자연의 격노</span> 핵심 지속 효과가 자원 소모 없이 기술을 발동시킬 때, 반대되는 유형의 비<span class="c_important">궁극기</span> 기술의 재사용 대기시간이 <span class="c_random">4 – 8</span>초 감소합니다.</p>'},
		{job:'dru', parts:'sub hel che pan amu', type:'leg', icon:'def', name:'대지수호자',  detail:'<p class="aspect_effect">군중 제어 상태로 만드는 적 하나당 다음 <span class="c_important">대지 방벽</span>에 <span class="c_random">15 – 25%</span>만큼, 최대 <span class="c_number">100%</span>의 보너스를 얻습니다.</p>'},
		{job:'dru', parts:'amu wep glo rin', type:'leg', icon:'off', name:'번개춤꾼',  detail:'<p class="aspect_effect"><span class="c_important">번개 폭풍</span>이 극대화로 적중하면 춤추는 번개 줄기 <span class="c_number">3</span>개가 생겨납니다. 번개줄기는 범위 내의 적들을 찾아가 <span class="c_random">210-252</span>의 번개 피해를 줍니다.</p>'},
		{job:'dru', parts:'amu wep glo rin', type:'leg', icon:'off', name:'광포한 늑대',  detail:'<p class="aspect_effect"><span class="c_important">회색곰의 격노</span> 사용 시 광포한 늑대인간으로 변신합니다. 광포한 늑대인간일 때 피해 감소 대신 <span class="c_random">15--25%</span>의 이동 속도와 <span class="c_random">30-50%</span>의 영력 소모량 감소 보너스를 얻습니다. 추가로, 적 처치 시 최대 생명력의 <span class="c_number">10%</span>가 회복됩니다.</p>'},
		{job:'dru', parts:'amu wep glo rin', type:'leg', icon:'off', name:'쑥대밭',  detail:'<p class="aspect_effect">동료를 <span class="c_number">1</span>마리 추가로 얻습니다. 추가로, 동료 기술이 <span class="c_random">100-150%</span>의 추가 피해를 줍니다.</p>'},
		{job:'dru', parts:'amu wep glo rin', type:'leg', icon:'off', name:'변형 돌',  detail:'<p class="aspect_effect"><span class="c_important">바위</span>가 <span class="c_important">핵심</span> 기술로 변경되어 <span class="c_number">60</span>의 영력을 소모하며 원래 피해의 <span class="c_random">80-100%</span>만큼 피해를 줍니다.</p>'},
		{job:'dru', parts:'amu wep glo rin', type:'leg', icon:'off', name:'흐릿한 야수',  detail:'<p class="aspect_effect">질주하는 동안 <span class="c_important">칼날 발톱</span>이 주위의 중독된 적을 찾아 즉시 <span class="c_random">60 – 90%</span>의 중독 피해를 줍니다.</p>'},
		
		{job:'bab', parts:'sub hel che pan amu', type:'leg', icon:'def', name:'담금질하는 타격',  detail:'<p class="aspect_effect">무기를 <span class="c_number">6</span>번 교체한 후 <span class="c_random">46</span>의 <span class="c_important><span class=" text-line"="">보강</span> 효과를 얻습니다.</p>'},
		{job:'bab', parts:'sub hel che pan amu', type:'leg', icon:'def', name:'불카토스',  detail:'<p class="aspect_effect"><span class="c_important">도약</span>이 <span class="c_important">지진</span>을 발생시켜 <span class="c_number">4</span>초에 걸쳐 <span class="c_random">164</span>의 물리 피해를 줍니다. <span class="c_important">지진</span> 안에 서 있는 동안 피해 감소가 <span class="c_random">5%</span> 증가합니다.</p>'},
		{job:'bab', parts:'sub hel che pan amu', type:'leg', icon:'def', name:'무감각한 진노',  detail:'<p class="aspect_effect">분노가 최대일 때 생성하는 분노 1당 <span class="c_random">1.3</span>의 <span class="c_important"><span class="text-line">보강</span></span> 효과를 얻습니다.</p>'},
		{job:'bab', parts:'sub hel che pan amu', type:'leg', icon:'def', name:'무쇠 피',  detail:'<p class="aspect_effect">주위에 출혈하는 적 하나당 피해 감소를 <span class="c_random">2.0%</span>만큼, 최대 <span class="c_random">10%</span>까지 얻습니다.</p>'},
		{job:'bab', parts:'sub hel che pan amu', type:'leg', icon:'def', name:'철갑 전사',  detail:'<p class="aspect_effect"><span class="c_important">철갑 피부</span>가 <span class="c_important"><span class="text-line">저지 불가</span></span>와 <span class="c_random">10%</span>의 피해 감소를 부여합니다.</p>'},
		{job:'bab', parts:'amu wep glo rin', type:'leg', icon:'off', name:'대지격퇴자',  detail:'<p class="aspect_effect">무기를 <span class="c_number">10</span>번 교체한 후, 다음 공격이 <span class="c_important"><span class="text-line">제압</span></span> 효과를 얻고 주는 <span class="c_important"><span class="text-line">제압</span></span> 피해가 <span class="c_random">30%</span> 증가합니다.</p>'},
		{job:'bab', parts:'amu wep glo rin', type:'leg', icon:'off', name:'선조의 메아리',  detail:'<p class="aspect_effect"><span class="c_label">행운의 적중:</span> <span class="c_important">선조의 부름</span>이 행동막대에 지정되어 있는 동안 <span class="c_important">도약</span>, <span class="c_important">지각 변동</span> 또는 <span class="c_important">소용돌이</span>로 적에게 피해를 주면 최대 40% 확률로 선조가 소환되어 같은 기술을 사용합니다.</p>'},
		{job:'bab', parts:'amu wep glo rin', type:'leg', icon:'off', name:'광폭한 찢기',  detail:'<p class="aspect_effect"><span class="c_important"><span class="text-line">광폭화</span></span> 상태에서 직접 피해를 줄 때 마다, <span class="c_number">5</span>초에 걸쳐 기본 공격력의 <span class="c_random">20%</span>를 추가 출혈 피해로 줍니다.</p>'},
		{job:'bab', parts:'amu wep glo rin', type:'leg', icon:'off', name:'선조의 힘',  detail:'<p class="aspect_effect"><span class="c_important">선조의 망치</span>가 밖으로 진동하며 적들에게 기본 공격력의 <span class="c_random">32%</span>만큼 피해를 줍니다.</p>'},
		{job:'bab', parts:'amu wep glo rin', type:'leg', icon:'off', name:'죽음의 소원',  detail:'<p class="aspect_effect"><span class="c_important"><span class="text-line">광폭화</span></span> 상태에서 <span class="c_random">46</span>의 가시를 얻습니다.</p>'},
		{job:'bab', parts:'amu wep glo rin', type:'leg', icon:'off', name:'광포한 소용돌이',  detail:'<p class="aspect_effect"><span class="c_important">소용돌이</span>에 정신을 집중하는 시간 1초당 극대화 확률이 <span class="c_random">5%</span>만큼, 최대 <span class="c_random">20%</span>까지 증가합니다.</p>'},
		{job:'bab', parts:'amu wep glo rin', type:'leg', icon:'off', name:'역전용사 싸움꾼',  detail:'<p class="aspect_effect"><span class="c_important">핵심</span> 기술이 적에게 직접 피해를 줄 때마다 다음 <span class="c_important">돌진</span> 또는 <span class="c_important">도약</span> 기술이 주는 피해가 <span class="c_random">15%</span>만큼, 최대 <span class="c_random">225%<!--?span-->까지 증가합니다.</span></p>'},
		{job:'bab', parts:'amu wep glo rin', type:'leg', icon:'off', name:'싸움꾼',  detail:'<p class="aspect_effect"><span class="c_important">발차기</span> 또는 <span class="c_important">돌진</span>에 피해를 받은 후 <span class="c_number">2</span>초 내에 죽은 적이 폭발하며 주변 적들에게 <span class="c_random">420</span>의 피해를 줍니다.</p>'},
		{job:'bab', parts:'rin', type:'leg', icon:'res', name:'맹렬한 분노',  detail:'<p class="aspect_effect"><span class="c_important">핵심</span> 기술로 적을 처치하면 기본 분노 소모량의 <span class="c_random">10.0%</span>를 반환받습니다. 이 효과는 시전 1회당 한 번만 발동합니다.</p>'},
		{job:'bab', parts:'rin', type:'leg', icon:'res', name:'갈증 해소',  detail:'<p class="aspect_effect"><span class="c_label">행운의 적중:</span> <span class="c_important">분쇄</span>가 출혈 상태의 적 최소 한 마리에게 직접 피해를 주면 최대 <span class="c_random">30%</span> 확률로 분노를 <span class="c_number">20</span> 얻습니다.</p>'},
		{job:'bab', parts:'rin', type:'leg', icon:'res', name:'가차없는 무기 전문가',  detail:'<p class="aspect_effect"><span class="c_important">걸어다니는 무기고</span> 핵심 지속 효과의 모든 피해 보너스가 활성화되어 있는 동안 분노 생성량이 <span class="c_random">20%</span> 증가합니다.</p>'},
		{job:'bab', parts:'rin', type:'leg', icon:'res', name:'울려퍼지는 분노',  detail:'<p class="aspect_effect"><span class="c_important">외침</span> 기술이 활성화되어 있는 동안 매초 분노를 <span class="c_random">2</span> 생성합니다.</p>'},
		{job:'bab', parts:'sub hel che amu glo boo', type:'leg', icon:'uti', name:'빈혈',  detail:'<p class="aspect_effect"><span class="c_label">행운의 적중:</span> 출혈 상태의 적에게 직접 피해를 주면 최대 <span class="c_random">20%</span> 확률로 적을 <span class="c_number">2</span>초 동안 기절시킵니다.</p>'},
		{job:'bab', parts:'sub hel che amu glo boo', type:'leg', icon:'off', name:'가차없는 광전사',  detail:'<p class="aspect_effect"><span class="c_label">행운의 적중:</span> <span class="c_important">핵심</span> 기술로 적에게 피해를 주면 최대 <span class="c_random">22%</span> 확률로 <span class="c_important"><span class="text-line">광폭화</span></span>의 지속시간이 <span class="c_number">1</span>초 증가합니다. 극대화 적중 시 이 지속 시간이 2배로 증가합니다.</p>'},
		{job:'bab', parts:'amu boo', type:'leg', icon:'mob', name:'영원한 발 구르기',  detail:'<p class="aspect_effect"><span class="c_important">발차기</span> 또는 <span class="c_important">발 구르기</span>로 적에게 피해를 주면 <span class="c_important">도약</span>의 재사용 대기시간이 초기화 됩니다.</p>'},
		{job:'bab', parts:'amu wep glo rin', type:'leg', icon:'off', name:'먼지 돌풍',  detail:'<p class="aspect_effect"><span class="c_important">소용돌이</span>가 먼지 돌풍을 남겨 주변 적들에게 <span class="c_random">67 - 105</span>의 피해를 줍니다.</p>'},
		{job:'bab', parts:'amu wep glo rin', type:'leg', icon:'off', name:'불타는 분노',  detail:'<p class="aspect_effect"><span class="c_important"><span class="text-line">광폭화</span></span> 상태에서 주변 적들에게 매초 <span class="c_random">35 - 62</span>의 화염 피해를 줍니다.</p>'},
		{job:'bab', parts:'amu wep glo rin', type:'leg', icon:'off', name:'지진',  detail:'<p class="aspect_effect"><span class="c_important">발 구르기</span>가 지진을 일으켜 적들에게 <span class="c_number">4</span>초에 걸쳐 <span class="c_random">172 - 334</span>의 물리 피해를 줍니다. 지진 안에 서 있는 동안 주는 피해가 <span class="c_random">5 - 15%</span> 증가합니다.</p>'},
		{job:'bab', parts:'amu wep glo rin', type:'leg', icon:'off', name:'칼바람',  detail:'<p class="aspect_effect"><span class="c_important">이중 타격</span>을 <span class="c_number">2</span>초 내에 <span class="c_number">2</span>번 시전하면 먼지 돌풍이 일어나 대상 뒤에 적들에게 <span class="c_random">67 - 105</span>의 피해를 줍니다.</p>'},
		{job:'bab', parts:'amu wep glo rin', type:'leg', icon:'off', name:'해골 격파자',  detail:'<p class="aspect_effect">출혈 상태인 적을 기절시키면 적의 총 출혈 피해의 <span class="c_random">22 - 40%</span>를 즉시 물리 피해로 줍니다.</p>'},
		{job:'bab', parts:'rin', type:'leg', icon:'res', name:'거인의 발걸음',  detail:'<p class="aspect_effect">적중당한 적 하나당 <span class="c_important">도약</span>의 재사용 대기시간이 <span class="c_random">3 - 5</span>초만큼, 최대 <span class="c_number">9</span>초까지 감소합니다.</p>'},
		{job:'bab', parts:'rin', type:'leg', icon:'res', name:'광폭한 분노',  detail:'<p class="aspect_effect"><span class="c_important"><span class="text-line">광폭화</span></span> 상태에서 초당 <span class="c_random">3.0 - 6.0</span>의 분노를 얻습니다.</p>'},
		{job:'bab', parts:'sub hel che amu glo boo', type:'leg', icon:'uti', name:'휘감는 소용돌이',  detail:'<p class="aspect_effect"><span class="c_important">소용돌이</span>가 주기적으로 적들을 끌어당깁니다.</p>'},
		{job:'bab', parts:'rin', type:'leg', icon:'res', name:'곰 혈족 광전사',  detail:'<p class="aspect_effect"><span class="c_important"><span class="text-line">광폭화</span></span> 상태에서 적을 처치하면 <span class="c_number">40%</span> 확률로 <span class="c_number">2</span>초 동안 <span class="c_important">난투</span> 기술의 재사용 대기시간 감소 효과가 <span class="c_random">16 – 32%</span> 증가합니다.</p>'},
		{job:'bab', parts:'rin', type:'leg', icon:'res', name:'담대한 족장',  detail:'<p class="aspect_effect"><span class="c_important">외침</span> 기술을 시전할 때마다 주위에 있는 적 1마리당 해당 기술의 재사용 대기시간이 <span class="c_random">1 – 1.9초</span>만큼, 최대 <span class="c_number">6</span>초까지 감소합니다.</p>'},
		{job:'bab', parts:'sub hel che amu glo boo', type:'leg', icon:'uti', name:'무기 전문가',  detail:'<p class="aspect_effect"><span class="c_important">무기 숙련</span> 기술이 추가 충전을 얻습니다.<br><span class="c_label">행운의 적중:</span> <span class="c_important">무기 숙련</span> 기술로 적에게 피해를 주면 최대 <span class="c_random">32 – 50%</span> 확률로 <span class="c_number">2</span>초 동안 적을 기절시킵니다.</p>'},
		{job:'bab', parts:'amu wep glo rin', type:'leg', icon:'off', name:'무한한 분노',  detail:'<p class="aspect_effect">분노 중첩이 최대일 때 생성하는 분노 1당 다음 <span class="c_important">핵심</span> 기술이 주는 피해가 <span class="c_random">1 – 2%</span>만큼, 최대 <span class="c_random">15 - 30%</span>까지 증가합니다.</p>'},
		{job:'bab', parts:'amu wep glo rin', type:'leg', icon:'off', name:'스며드는 진노',  detail:'<p class="aspect_effect">분노를 <span class="c_number">100</span> 소모한 후 다음 <span class="c_important">무기 숙련</span> 기술이 주는 피해가 <span class="c_random">82 – 100%</span> 증가합니다.</p>'},
		{job:'bab', parts:'sub hel che amu glo boo', type:'leg', icon:'uti', name:'행운인도자',  detail:'<p class="aspect_effect"><span class="c_important">걸어다니는 무기고</span> 핵심 지속 효과의 모든 피해 보너스가 활성화되어 있는 동안 행운의 적중 확률이 <span class="c_random">12 – 20%</span> 증가합니다.</p>'},
		{job:'bab', parts:'amu wep glo rin', type:'leg', icon:'off', name:'흉악한',  detail:'<p class="aspect_effect">다음 <span class="c_important">핵심</span> 기술로 분노를 <span class="c_number">100</span> 생성하면 <span class="c_important">먼지 돌풍</span>이 일어나 대상 뒤의 적들에게 <span class="c_random">165 – 297</span> 의 피해를 줍니다.</p>'},

		{job:'soc', parts:'sub hel che pan amu', type:'leg', icon:'def', name:'눈경비병',  detail:'<p class="aspect_effect">자신의 <span class="c_important">눈보라</span> 안에 있는 동안 받는 피해가 <span class="c_random">10%</span> 감소합니다.</p>'},
		{job:'soc', parts:'sub hel che pan amu', type:'leg', icon:'def', name:'흔들리지 않는 자',  detail:'<p class="aspect_effect">직접 피해를 받으면 <span class="c_random">2%</span> 확률로 <span class="c_important">방어</span> 기술 하나의 재사용 대기시간이 초기화됩니다.</p>'},
		{job:'soc', parts:'sub hel che pan amu', type:'leg', icon:'def', name:'눈의 장막',  detail:'<p class="aspect_effect"><span class="c_important">얼음 갑옷</span> 시전 시 <span class="c_random">2.0</span>초 동안 <span class="c_important"><span class="text-line">저지 불가</span></span> 상태가 됩니다.</p>'},
		{job:'soc', parts:'amu wep glo rin', type:'leg', icon:'off', name:'큰불',  detail:'<p class="aspect_effect"><span class="c_important">소각</span>을 사용하는 동안 자신이 주는 연소 피해가 <span class="c_random">20%</span> 증가합니다.</p>'},
		{job:'soc', parts:'amu wep glo rin', type:'leg', icon:'off', name:'제어',  detail:'<p class="aspect_effect">이동 불가, 기절 또는 <span class="c_important"><span class="text-line">빙결</span></span> 상태의 적에게 주는 피해가 <span class="c_random">25%</span> 증가합니다.</p>'},
		{job:'soc', parts:'amu wep glo rin', type:'leg', icon:'off', name:'세 가지 저주',  detail:'<p class="aspect_effect"><span class="c_important">운석 낙하</span>가 <span class="c_important"><span class="text-line">건강</span></span> 상태의 대상에게 주는 극대화 피해가 <span class="c_random">35%</span> 증가합니다.</p>'},
		{job:'soc', parts:'amu wep glo rin', type:'leg', icon:'off', name:'전하 응집',  detail:'<p class="aspect_effect">자신이 시전한 <span class="c_important">번개 줄기</span>가 <span class="c_random">15.0%</span> 확률로 적들에게 이끌리고 지속시간이 <span class="c_number">300%</span> 증가합니다.</p>'},
		{job:'soc', parts:'amu wep glo rin', type:'leg', icon:'off', name:'파고드는 추위',  detail:'<p class="aspect_effect">적을 <span class="c_important"><span class="text-line">빙결</span></span>시킬 때 <span class="c_random">25%</span> 확률로 해당 적이 <span class="c_number">3</span>초 동안 <span class="c_important"><span class="text-line">취약</span></span>해집니다.</p>'},
		{job:'soc', parts:'amu wep glo rin', type:'leg', icon:'off', name:'꿰뚫는 추위',  detail:'<p class="aspect_effect"><span class="c_important">얼음 파편</span>이 <span class="c_random">3</span>번 관통하면서, 적을 추가로 적중할 때마다 <span class="c_random">25%</span> 감소한 피해를 줍니다.</p>'},
		{job:'soc', parts:'amu wep glo rin', type:'leg', icon:'off', name:'갈라지는 마력',  detail:'<p class="aspect_effect"><span class="c_important">번개 창</span> 시전 시 <span class="c_random">11%</span> 확률로 추가 <span class="c_important">번개 창</span>이 생성됩니다.</p>'},
		{job:'soc', parts:'amu wep glo rin', type:'leg', icon:'off', name:'폭풍 격화',  detail:'<p class="aspect_effect"><span class="c_important"><span class="text-line">보호막</span></span>이 있을 때 <span class="c_important"><span class="text-line">취약</span></span>한 적에게 주는 피해가 <span class="c_random">11%</span> 증가합니다.</p>'},
		{job:'soc', parts:'amu wep glo rin', type:'leg', icon:'off', name:'정령술사',  detail:'<p class="aspect_effect">마나가 <span class="c_number">100</span> 이상일 때 <span class="c_important">핵심</span> 또는 <span class="c_important">숙련</span> 기술을 시전하면 극대화 확률이 <span class="c_random">20.0%</span> 증가합니다.</p>'},
		{job:'soc', parts:'rin', type:'leg', icon:'res', name:'영재',  detail:'<p class="aspect_effect">재사용 대기시간이 있는 기술을 사용할 때 마나가 <span class="c_random">15</span> 회복됩니다.</p>'},
		{job:'soc', parts:'rin', type:'leg', icon:'res', name:'방화',  detail:'<p class="aspect_effect"><span class="c_label">행운의 적중:</span> 연소 피해를 주면 최대 <span class="c_random">5%</span> 확률로 마나가 <span class="c_number">10</span> 회복됩니다.</p>'},
		{job:'soc', parts:'rin', type:'leg', icon:'res', name:'재충전',  detail:'<p class="aspect_effect"><span class="c_important">연쇄 번개</span>가 자신에게 튕길 때 마다 마나를 <span class="c_random">4</span> 얻습니다.</p>'},
		{job:'soc', parts:'rin', type:'leg', icon:'res', name:'효율',  detail:'<p class="aspect_effect"><span class="c_important">기본</span> 기술 시전 시 다음 <span class="c_important">핵심</span> 기술의 마나 소모량이 <span class="c_random">10%</span> 감소합니다.</p>'},
		{job:'soc', parts:'sub hel che amu glo boo', type:'leg', icon:'uti', name:'그슬린 사지',  detail:'<p class="aspect_effect">이동 불가 효과가 끝난 후, 적들이 <span class="c_number">4</span>초 동안 <span class="c_random">25%</span> 감속됩니다.</p>'},
		{job:'soc', parts:'amu boo', type:'leg', icon:'mob', name:'충전',  detail:'<p class="aspect_effect"><span class="c_important"><span class="text-line">짜릿한 에너지</span></span>를 얻으면 <span class="c_number">4</span>초 동안 이동 속도가 <span class="c_random">10%</span> 증가합니다.</p>'},
		{job:'soc', parts:'amu boo', type:'leg', icon:'mob', name:'속박하는 도관',  detail:'<p class="aspect_effect"><span class="c_important">순간이동</span>한 뒤 <span class="c_number">3</span>초 후 <span class="c_random">20%</span>의 이동 속도를 얻습니다.</p>'},
		{job:'soc', parts:'amu boo', type:'leg', icon:'mob', name:'화염방랑자',  detail:'<p class="aspect_effect">내 <span class="c_important">화염벽</span>에 닿으면 <span class="c_number">4</span>초 동안 <span class="c_random">15%</span>의 이동 속도를 얻습니다.</p>'},
		{job:'soc', parts:'sub hel che pan amu', type:'leg', icon:'def', name:'둘러싸인',  detail:'<p class="aspect_effect"><span class="c_important">냉대</span>가 활성화되어 있는 동안 매초 최대 생명력과 마나의 <span class="c_random">10-20%</span>를 회복합니다.</p>'},
		{job:'soc', parts:'sub hel che pan amu', type:'leg', icon:'def', name:'서리 대공세',  detail:'<p class="aspect_effect"><span class="c_important">서릿발</span>이 추가 충전을 얻지만 충전당 재사용 대기시간이 <span class="c_random">40-30%</span> 증가합니다.</p>'},
		{job:'soc', parts:'sub hel che pan amu', type:'leg', icon:'def', name:'영생하는 방어 위상',  detail:'<p class="aspect_effect">군중 제어의 영향을 받는 적 또는 <span class="c_important"><span class="text-line">취약</span></span>한 적에게 받는 피해가 <span class="c_random">20-25%</span> 감소합니다.</p>'},
		{job:'soc', parts:'amu wep glo rin', type:'leg', icon:'off', name:'구렁이의 공격 위상',  detail:'<p class="aspect_effect"><span class="c_important">히드라</span>를 추가로 1마리 더 소환해 둘 수 있지만, <span class="c_important">히드라</span>의 지속시간이 <span class="c_random">25-20%</span> 감소합니다.</p>'},
		{job:'soc', parts:'amu wep glo rin', type:'leg', icon:'off', name:'끊어지지 않는 끈의 공격 위상',  detail:'<p class="aspect_effect"><span class="c_important">연쇄 번개</span>가 <span class="c_random">25-35%</span> 확률로 <span class="c_number">2</span>번 추가로 연쇄됩니다.</p>'},
		{job:'soc', parts:'amu wep glo rin', type:'leg', icon:'off', name:'산산조각 난 공격 위상',  detail:'<p class="aspect_effect">적이 빙결된 상태로 죽으면 <span class="c_important">산산조각</span> 핵심 지속 효과의 폭발이 주는 피해가 <span class="c_random">30-40%</span> 증가합니다.</p>'},
		{job:'soc', parts:'amu wep glo rin', type:'leg', icon:'off', name:'산산조각 난 별의 공격 위상',  detail:'<p class="aspect_effect"><span class="c_important">운석</span> 주위에 작은 운석들이 떨어지며, 충돌 시 <span class="c_random">99-132</span>의 화염 피해를 줍니다. 작은 운석은 추가로 적중하는 적들을 불태워 <span class="c_number">6</span>초에 걸쳐 <span class="c_random">297-396</span>의 피해를 줍니다.</p>'},
		{job:'soc', parts:'amu wep glo rin', type:'leg', icon:'off', name:'안정적인 공격 위상',  detail:'<p class="aspect_effect"><span class="c_important">불안정한 전류</span>가 활성화되어 있지 않은 동안, <span class="c_important">감전</span> 기술이 <span class="c_random">5-10%</span> 확률로 자원 소모 없이 시전을 발동시킵니다.</p>'},
		{job:'soc', parts:'amu wep glo rin', type:'leg', icon:'off', name:'얼어붙은 기억의 공격 위상',  detail:'<p class="aspect_effect"><span class="c_important">눈사태</span> 핵심 지속 효과가 추가 <span class="c_number">1</span>회의 시전에 적용됩니다.</p>'},
		{job:'soc', parts:'amu wep glo rin', type:'leg', icon:'off', name:'얼어붙은 흔적의 공격 위상',  detail:'<p class="aspect_effect"><span class="c_important">얼음 갑옷</span>이 활성화되어 있는 동안, 뒤에 폭발하는 얼음 가시를 남겨 <span class="c_random">56-84%</span>의 피해를 줍니다. 얼음 가시가 적들에게 <span class="c_number">10%</span>의 <span class="c_important"><span class="text-line">오한</span></span>을 느끼게 합니다.</p>'},
		{job:'soc', parts:'amu wep glo rin', type:'leg', icon:'off', name:'얼음 궤도의 공격 위상',  detail:'<p class="aspect_effect"><span class="c_important">얼음 보주</span>가 목표 지점에 도달한 후 그 자리에서 <span class="c_number">2</span>번 추가로 폭발하여 피해의 <span class="c_random">20-30%</span>를 줍니다.</p>'},
		{job:'soc', parts:'amu wep glo rin', type:'leg', icon:'off', name:'풍부한 에너지의 공격 위상',  detail:'<p class="aspect_effect"><span class="c_important"><span class="text-line">짜릿한 에너지</span></span>가 <span class="c_random">20-30%</span> 확률로 추가 적에게 연쇄됩니다.</p>'},
		{job:'soc', parts:'amu wep glo rin', type:'leg', icon:'off', name:'휘감는 불길의 공격 위상',  detail:'<p class="aspect_effect">적이 전체 생명력보다 많은 지속 피해에 영향을 받고 있을 때, 해당 적에게 주는 연소 피해가 <span class="c_random">30-40%</span> 증가합니다.</p>'},
		{job:'soc', parts:'sub hel che amu glo boo', type:'leg', icon:'uti', name:'속박하는 불씨의 보조 위상',  detail:'<p class="aspect_effect"><span class="c_important">화염 보호막</span>이 있을 때 적 사이를 제약 없이 이동할 수 있습니다. <span class="c_important">화염 보호막</span>이 활성화되어 있는 동안 통과하는 적이 <span class="c_random">2.0-3.0</span>초 동안 이동 불가 상태가 됩니다.</p>'},
		{job:'soc', parts:'sub hel che amu glo boo', type:'leg', icon:'uti', name:'요행의 보조 위상',  detail:'<p class="aspect_effect"><span class="c_important"><span class="text-line">보호막</span></span>이 있을 때 행운의 적중 확률이 <span class="c_random">10-20%</span> 증가합니다.</p>'},
		{job:'soc', parts:'amu wep glo rin', type:'leg', icon:'off', name:'고대 불길의 공격 위상',  detail:'<p class="aspect_effect"><span class="c_important">에수의 흉포함</span> 핵심 지속 효과의 두 가지 보너스가 모두 활성화되어 있는 동안, 공격 속도가 <span class="c_random">40 – 50%</span> 증가합니다.</p>'},
		{job:'soc', parts:'amu wep glo rin', type:'leg', icon:'off', name:'마법사 군주의 공격 위상',  detail:'<p class="aspect_effect">근거리에 있는 적 하나당 <span class="c_important">비르의 숙련</span> 핵심 지속 효과의 피해 감소가 <span class="c_random">20 – 30%</span>만큼, 최대 <span class="c_random">60 – 90%</span>까지 증가합니다.</p>'},
		{job:'soc', parts:'amu wep glo rin', type:'leg', icon:'off', name:'빙하의 공격 위상',  detail:'<p class="aspect_effect"><span class="c_important">눈보라</span>를 시전하면 주기적으로 폭발하는 <span class="c_important">얼음 가시</span>가 생성되어 <span class="c_random">100 - 150</span>의 피해를 줍니다. <span class="c_important">얼음 가시</span>가 <span class="c_important"><span class="text-line">빙결</span></span>된 적에게 주는 피해가 <span class="c_number">25%</span> 증가합니다.</p>'},
		{job:'soc', parts:'amu wep glo rin', type:'leg', icon:'off', name:'아마겟돈의 공격 위상',  detail:'<p class="aspect_effect"><span class="c_important">불지옥</span>의 지속시간 동안 <span class="c_important">작은 운석</span>이 마구 떨어지며, 충돌 시 <span class="c_random">205 - 250</span>의 화염 피해를 줍니다. <span class="c_important">작은 운석</span>이 적을 <span class="c_number">3</span>초 동안 이동 불가 상태로 만듭니다.</p>'},
		{job:'soc', parts:'amu wep glo rin', type:'leg', icon:'off', name:'압도적인 전류의 공격 위상',  detail:'<p class="aspect_effect"><span class="c_important">불안정한 전류</span>가 <span class="c_random">10 – 20%</span> 확률로 추가 <span class="c_important">감전</span> 기술을 시전합니다.</p>'},
		{job:'soc', parts:'amu wep glo rin', type:'leg', icon:'off', name:'얼어붙은 동토의 공격 위상',  detail:'<p class="aspect_effect"><span class="c_important">냉대</span>가 활성화되어 있는 동안, 범위 내에 폭발하는 <span class="c_important">얼음 가시</span>가 생성되어 <span class="c_random">206 – 289</span>의 냉기 피해를 줍니다. <span class="c_important">얼음 가시</span>의 폭발 반경이 <span class="c_number">50%</span> 증가합니다.</p>'},
		{job:'soc', parts:'rin', type:'leg', icon:'res', name:'정신집중의 자원 위상',  detail:'<p class="aspect_effect"><span class="c_number">3</span>초 동안 피해를 받지 않으면 마나 재생량이 <span class="c_random">10 – 20%</span> 증가합니다.</p>'},
		{job:'soc', parts:'amu wep glo rin', type:'leg', icon:'off', name:'중력의 공격 위상',  detail:'<p class="aspect_effect"><span class="c_important">구상 번개</span>가 자신의 주위를 돌지만, 주는 피해가 <span class="c_random">10 – 20%</span> 감소합니다.</p>'},

		{job:'rog', parts:'sub hel che pan amu', type:'leg', icon:'def', name:'휩싸는 위상',  detail:'<p class="aspect_effect">가만히 서 있는 동안 <span class="c_number">3</span>초마다 자원 소모 없이 <span class="c_important">어둠의 장막</span> 그림자를 얻습니다. <span class="c_important">어둠의 장막</span> 그림자 하나당 피해 감소가 <span class="c_random">2.0%</span> 증가합니다.</p>'},
		{job:'rog', parts:'sub hel che pan amu', type:'leg', icon:'def', name:'흡수되는 양식의 위상',  detail:'<p class="aspect_effect"><span class="c_label">행운의 적중:</span> <span class="c_important">핵심</span> 기술로 <span class="c_important"><span class="text-line">취약</span></span>한 적에게 피해를 주면 최대 <span class="c_random">10%</span> 확률로 치유 물약이 떨어집니다.</p>'},
		{job:'rog', parts:'sub hel che pan amu', type:'leg', icon:'def', name:'으스스한 기만의 위상',  detail:'<p class="aspect_effect">군중 제어의 영향을 받는 적에게 받는 피해가 <span class="c_random">15.0%</span> 감소합니다. 군중 제어의 영향을 받는 적에게 직접 피해를 받을 때마다 <span class="c_number">2</span>초 동안 <span class="c_number">15%</span>의 이동 속도를 얻습니다.</p>'},
		{job:'rog', parts:'sub hel che pan amu', type:'leg', icon:'def', name:'사기꾼의 위상',  detail:'<p class="aspect_effect">군중 제어의 영향을 받는 적에게 받는 피해가 <span class="c_random">15.0%</span> 감소합니다. 군중 제어의 영향을 받는 적에게 직접 피해를 받을 때마다 <span class="c_number">2</span>초 동안 <span class="c_number">15%</span>의 이동 속도를 얻습니다.</p>'},
		{job:'rog', parts:'amu wep glo rin', type:'leg', icon:'off', name:'화살 폭풍의 위상',  detail:'<p class="aspect_effect"><span class="c_label">행운의 적중:</span> <span class="c_important">명사수</span> 기술이 최대 <span class="c_number">10%</span> 확률로 적의 위치에 화살 폭풍을 내려 <span class="c_number">3</span>초에 걸쳐 <span class="c_random">454</span>의 물리 피해를 줍니다. 화살 폭풍은 최대 <span class="c_number">5</span>개까지 활성화할 수 있습니다.</p>'},
		{job:'rog', parts:'amu wep glo rin', type:'leg', icon:'off', name:'빙빙 도는 칼날의 위상',  detail:'<p class="aspect_effect"><span class="c_important">연타</span>가 주위의 적에게 원형으로 피해를 주며 주는 피해가 <span class="c_random">8%</span> 증가합니다.</p>'},
		{job:'rog', parts:'amu wep glo rin', type:'leg', icon:'off', name:'교묘한 사격 위상',  detail:'<p class="aspect_effect"><span class="c_important">꿰뚫는 사격</span>이 적에게 피해를 줄 때마다 <span class="c_number">2</span>개의 추가 화살이 양쪽으로 갈라져 날아갑니다. 이 갈래 화살은 <span class="c_important">꿰뚫는 사격</span> 기본 공격력의 <span class="c_random">10%</span>만큼 피해를 주고 갈라지지 않습니다.</p>'},
		{job:'rog', parts:'amu wep glo rin', type:'leg', icon:'off', name:'발파덫 사냥꾼의 위상',  detail:'<p class="aspect_effect"><span class="c_label">행운의 적중:</span> 자신의 <span class="c_important">덫</span> 기술의 영향을 받는 적에게 직접 피해를 주면 최대 <span class="c_random">30%</span> 확률로 대상이 <span class="c_number">3</span>초 동안 <span class="c_important"><span class="text-line">취약</span></span>해집니다.</p>'},
		{job:'rog', parts:'amu wep glo rin', type:'leg', icon:'off', name:'한 맺힌 위상',  detail:'<p class="aspect_effect"><span class="c_label">행운의 적중:</span> 적을 <span class="c_important"><span class="text-line">취약</span></span>하게 만들면 최대 <span class="c_random">30%</span> 확률로 <span class="c_number">3</span>초 동안 극대화 확률이 <span class="c_number">3%</span>만큼, 최대 <span class="c_number">9%</span>까지 증가합니다.</p>'},
		{job:'rog', parts:'amu wep glo rin', type:'leg', icon:'off', name:'갈라지는 일제 사격의 위상',  detail:'<p class="aspect_effect"><span class="c_important">탄막</span>의 화살이 튕길 때마다 <span class="c_random">15%</span> 확률로 <span class="c_number">2</span>개로 갈라집니다.</p>'},
		{job:'rog', parts:'amu wep glo rin', type:'leg', icon:'off', name:'타락의 위상',  detail:'<p class="aspect_effect"><span class="c_important"><span class="text-line">취약</span></span>한 적을 대상으로 <span class="c_important">주입</span> 기술의 효력이 <span class="c_random">20%</span>증가합니다.</p>'},
		{job:'rog', parts:'amu wep glo rin', type:'leg', icon:'off', name:'불안정한 주입의 위상',  detail:'<p class="aspect_effect"><span class="c_important">주입</span> 기술 시전 시 자신의 주위에 <span class="c_important">주입</span>된 폭발이 일어나, <span class="c_important">주입</span> 효과를 적용하고 같은 유형으로 <span class="c_random">118</span>의 피해를 줍니다.</p>'},
		{job:'rog', parts:'amu wep glo rin', type:'leg', icon:'off', name:'폭발성 그림자의 위상',  detail:'<p class="aspect_effect"><span class="c_important">어둠의 장막</span>의 그림자가 제거되면 폭발하여 자신의 주위에 <span class="c_random">45</span>의 암흑 피해를 줍니다.</p>'},
		{job:'rog', parts:'amu wep glo rin', type:'leg', icon:'off', name:'말썽꾼의 위상',  detail:'<p class="aspect_effect"><span class="c_important">쇠못 덫</span>이 폭발하는 <span class="c_important">섬광 수류탄</span>도 던집니다. 수류탄은 총 <span class="c_random">118</span>의 물리 피해를 주고 적들을 <span class="c_number">0.5</span>초 동안 기절시킵니다.</p>'},
		{job:'rog', parts:'amu wep glo rin', type:'leg', icon:'off', name:'기회주의자의 위상',  detail:'<p class="aspect_effect">공격으로 <span class="c_important"><span class="text-line">은폐</span></span> 상태가 해제될 때, 자신의 위치 주위에 폭발하는 <span class="c_important">섬광 수류탄</span> 더미를 떨어뜨립니다. 수류탄은 총 <span class="c_random">302</span>의 물리 피해를 주고 적을 <span class="c_number">0.50</span>초 동안 기절시킵니다.</p>'},
		{job:'rog', parts:'amu wep glo rin', type:'leg', icon:'off', name:'칼춤꾼의 위상',  detail:'<p class="aspect_effect"><span class="c_important">회전 칼날</span>이 돌아온 후 짧은 시간 동안 궤도를 돌며, 적중당 <span class="c_important">회전 칼날</span>이 돌아왔을 때 주는 피해의 <span class="c_random">10%</span>만큼 피해를 줍니다. 칼날이 돌아오는 거리에 따라, 궤도 피해가 돌아왔을 때 주는 피해의 최대 <span class="c_random">20%</span>까지 증가합니다.</p>'},
		{job:'rog', parts:'amu wep glo rin', type:'leg', icon:'off', name:'그림자베기 위상',  detail:'<p class="aspect_effect"><span class="c_important">질주</span>를 시전할 때, 자신의 위치에 복제된 그림자가 생성되어 <span class="c_important">질주</span>를 시전하고 기본 공격력의 <span class="c_random">25%</span>만큼 피해를 줍니다.</p>'},
		{job:'rog', parts:'rin', type:'leg', icon:'res', name:'걸신들린 위상',  detail:'<p class="aspect_effect"><span class="c_important"><span class="text-line">취약</span></span>한 적을 처치하면 <span class="c_number">4</span>초 동안 기력 재생이 <span class="c_random">50%</span> 증가합니다.</p>'},
		{job:'rog', parts:'rin', type:'leg', icon:'res', name:'원기력의 위상',  detail:'<p class="aspect_effect">정예 적에게 <span class="c_important">기본</span> 기술로 피해를 주면 기력이 <span class="c_random">3</span> 생성됩니다.</p>'},
		{job:'rog', parts:'sub hel che amu glo boo', type:'leg', icon:'uti', name:'폭발하는 정력의 위상',  detail:'<p class="aspect_effect"><span class="c_important">수류탄</span> 기술이 <span class="c_important">덫</span> 기술로 취급됩니다. <span class="c_important">덫</span>을 충전하거나 수류탄을 떨어뜨릴 때마다 <span class="c_number">3</span>초 동안 이동 속도가 <span class="c_random">10%</span> 증가합니다.</p>'},
		{job:'rog', parts:'sub hel che pan amu', type:'leg', icon:'def', name:'어스름한 방어 위상',  detail:'<p class="aspect_effect"><span class="c_label">행운의 적중:</span> <span class="c_important">명사수</span> 기술이 극대화로 적중하면 최대 <span class="c_random">34%</span> 확률로 어둠의 장막 그림자 하나를 자원 소모 없이 생성합니다.</p>'},
		{job:'rog', parts:'sub hel che pan amu', type:'leg', icon:'def', name:'탈출의 명수의 방어 위상',  detail:'<p class="aspect_effect">주변 적에게 피해를 받으면 <span class="c_important">연막 수류탄</span>을 떨어뜨려 <span class="c_number">10</span>초 내 다음 공격 <span class="c_number">100</span>번을 회피합니다. 이 효과는 <span class="c_random">2-7</span>초에 한 번씩만 발동됩니다.</p>'},
		{job:'rog', parts:'amu wep glo rin', type:'leg', icon:'off', name:'반복되는 공격 위상',  detail:'<p class="aspect_effect"><span class="c_important">연발 사격</span>이 <span class="c_random">30-45%</span> 확률로 다른 대상에게 튕깁니다.</p>'},
		{job:'rog', parts:'sub hel che amu glo boo', type:'leg', icon:'uti', name:'난도질꾼의 보조 위상',  detail:'<p class="aspect_effect"><span class="c_label">행운의 적중:</span> <span class="c_important"><span class="text-line">취약</span></span>한 적에게 직접 피해를 주면 최대 <span class="c_random">37%</span> 확률로 적을 <span class="c_number">2</span>초 동안 멍하게 만듭니다.</p>'},
		{job:'rog', parts:'sub hel che amu glo boo', type:'leg', icon:'uti', name:'동상에 걸린 보조 위상',  detail:'<p class="aspect_effect"><span class="c_important><span class =" text-line"="">오한</span>을 느끼는 적이 <span class="c_important">수류탄</span> 기술에 적중당하면 극대화 확률의 2배 확률로 즉시 <span class="c_number">2</span>초 동안 <span class="c_important"><span class="text-line">빙결</span></span>됩니다. <span class="c_important"><span class="text-line">빙결</span></span>된 적에게 주는 극대화 피해가 <span class="c_random">10 – 25%</span> 증가합니다.</p>'},
		{job:'rog', parts:'amu wep glo rin', type:'leg', icon:'off', name:'맹독 연금술사의 공격 위상',  detail:'<p class="aspect_effect"><span class="c_label">행운의 적중:</span> <span class="c_important">암흑 주입</span> 기술로 중독된 적에게 피해를 주면 최대 <span class="c_number">75%</span> 확률로 독성 폭발이 일어나 대상과 주변 적들에게 <span class="c_number">5</span>초에 걸쳐 <span class="c_random">66 – 111</span> 의 중독 피해를 줍니다.</p>'},
		{job:'rog', parts:'amu wep glo rin', type:'leg', icon:'off', name:'불시의 공격 위상',  detail:'<p class="aspect_effect"><span class="c_important">피하기</span> 또는 <span class="c_important">그림자 걸음</span>을 사용할 때 뒤에 폭발하는 <span class="c_important">섬광 수류탄</span> 더미를 남깁니다. 수류탄은 총 <span class="c_random">83 – 165</span> 의 물리 피해를 주고 적들을 <span class="c_number">0.5</span>초 동안 기절시킵니다.</p>'},
		{job:'rog', parts:'sub hel che pan amu', type:'leg', icon:'def', name:'빼앗긴 원기의 방어 위상',  detail:'<p class="aspect_effect"><span class="c_important">기세</span> 핵심 지속 효과가 중첩 1회당 매초 생명력을 <span class="c_random">10 - 30</span> 치유합니다.</p>'},
		{job:'rog', parts:'amu wep glo rin', type:'leg', icon:'off', name:'상승효과의 공격 위상',  detail:'<p class="aspect_effect"><span class="c_important">날쌘 몸놀림</span> 기술을 사용하면 다음 <span class="c_important">기만</span> 기술의 재사용 대기시간이 <span class="c_number">20%</span> 감소합니다. <span class="c_important">기만</span> 기술을 사용하면 다음 <span class="c_important">날쌘 몸놀림</span> 기술이 주는 피해가 <span class="c_random">10 – 30%</span> 증가합니다.</p>'},
		{job:'rog', parts:'sub hel che pan amu', type:'leg', icon:'def', name:'순간 빙결 방어 위상',  detail:'<p class="aspect_effect"><span class="c_important">피하기</span>로 <span class="c_important"><span class="text-line">오한</span></span>을 느끼거나 <span class="c_important"><span class="text-line">빙결</span></span>된 적을 통과할 때마다 <span class="c_number">5</span>초 동안 <span class="c_random">50</span>만큼, 최대 <span class="c_random">125 - 250</span> 의 피해를 흡수하는 <span class="c_important"><span class="text-line">보호막</span></span>을 얻습니다.</p>'},
		{job:'rog', parts:'sub hel che pan amu', type:'leg', icon:'def', name:'신출귀몰한 으름장의 방어 위상',  detail:'<p class="aspect_effect"><span class="c_important">백병전</span> 핵심 지속 효과의 두 가지 보너스를 모두 적용받는 동안, 근거리에 있는 적에게 적중당할 때마다 회피 확률이 <span class="c_random">1 – 5%</span> 증가합니다. 회피에 성공하면 이 보너스가 초기화됩니다.</p>'},
		{job:'rog', parts:'amu wep glo rin', type:'leg', icon:'off', name:'얼음 연금술사의 공격 위상',  detail:'<p class="aspect_effect"><span class="c_label">행운의 적중:</span> <span class="c_important">암흑 주입</span> 기술로 <span class="c_important"><span class="text-line">오한</span></span>을 느끼거나 빙결된 적에게 피해를 주면 최대 <span class="c_number">75%</span> 확률로 폭발이 일어나 대상과 주변 적들에게 <span class="c_random">182 – 330</span>의 냉기 피해를 주고 <span class="c_number">15%</span>의 <span class="c_important"><span class="text-line">오한</span></span>을 느끼게 합니다.</p>'},
		{job:'rog', parts:'sub hel che amu glo boo', type:'leg', icon:'uti', name:'유독한 얼음의 보조 위상',  detail:'<p class="aspect_effect"><span class="c_important"><span class="text-line">오한</span></span>을 느끼는 적이 <span class="c_important">독 주입</span>으로 중독되면 매초 <span class="c_number">20%</span>의 <span class="c_important"><span class="text-line">오한</span></span>을 추가로 느낍니다. <span class="c_important"><span class="text-line">빙결</span></span>된 적에게 주는 독 피해가 <span class="c_random">10 – 25%</span> 증가합니다.</p>'},
		{job:'rog', parts:'amu boo', type:'leg', icon:'mob', name:'유린자의 기동력 위상',  detail:'<p class="aspect_effect"><span class="c_important">그림자 걸음</span>이 추가 충전을 얻습니다. <span class="c_important">그림자 걸음</span>으로 적을 처치하면 충전을 하나 돌려받고 <span class="c_number">2</span>초 동안 <span class="c_important">그림자 걸음</span>이 주는 피해가 <span class="c_random">1 – 6%</span>만큼, 최대 <span class="c_random">5 – 30%</span>까지 증가합니다.</p>'},
		{job:'rog', parts:'sub hel che pan amu', type:'leg', icon:'def', name:'잔혹한 자양의 방어 위상',  detail:'<p class="aspect_effect"><span class="c_important">희생</span>의 핵심 지속 효과에 따른 폭발에 피해를 받은 적 하나당 자신의 생명력이 <span class="c_random">25 - 45</span>만큼, 최대 <span class="c_random">75 - 135</span>까지 회복됩니다.</p>'},
		{job:'rog', parts:'sub hel che amu glo boo', type:'leg', icon:'uti', name:'재촉하는 안개의 보조 위상',  detail:'<p class="aspect_effect"><span class="c_important">질주</span>가 끝날 때 자동으로 <span class="c_important">연막 수류탄</span>을 떨어뜨립니다. 이 방법으로 적이 <span class="c_important"><span class="text-line">멍해질</span></span> 때마다 <span class="c_important">"&gt;질주</span>의 재사용 대기시간이 <span class="c_random">0.25 – 0.35</span>초만큼, 최대 <span class="c_random">0.75 – 1.05</span>초까지 감소합니다.</p>'},
		{job:'rog', parts:'sub hel che pan amu', type:'leg', icon:'def', name:'치명적인 땅거미의 방어 위상',  detail:'<p class="aspect_effect"><span class="c_important">피하기</span>로 <span class="c_important">암흑 주입</span>에 걸린 적을 통과하면 <span class="c_number">4</span>초 동안 <span class="c_important"><span class="text-line">은폐</span></span> 상태가 됩니다. 공격을 가해 <span class="c_important"><span class="text-line">은폐</span></span>가 풀리면 <span class="c_number">4</span>초 동안 처치 시 최대 생명력의 <span class="c_random">1 – 5%</span> 회복 효과를 얻습니다.</p>'},
		{job:'rog', parts:'amu wep glo rin', type:'leg', icon:'off', name:'침투자의 공격 위상',  detail:'<p class="aspect_effect"><span class="c_important">맹독 덫</span>을 사용해도 <span class="c_important"><span class="text-line">은폐</span></span>가 풀리지 않고, <span class="c_important"><span class="text-line">은폐</span></span> 상태일 때 재사용 대기시간이나 덫 충전 시간이 발동되지 않습니다. <span class="c_important"><span class="text-line">은폐</span></span> 상태에서 빠져나올 때 <span class="c_important">맹독 덫</span>이 작동하고 <span class="c_important">맹독 덫</span>의 재사용 대기시간은 설치한 덫 하나당 <span class="c_random">5 – 8</span>초가 됩니다.</p>'},
		{job:'rog', parts:'amu wep glo rin', type:'leg', icon:'off', name:'터져 나가는 맹독의 공격 위상',  detail:'<p class="aspect_effect"><span class="c_label">행운의 적중:</span> <span class="c_important">독 주입</span>된 기술이 극대화로 적중하면 <span class="c_number">10%</span> 확률로 맹독 웅덩이가 생성됩니다. 웅덩이는 안에 있는 적에게 <span class="c_number">3</span>초에 걸쳐 <span class="c_random">540 – 675</span>의 피해를 줍니다. 웅덩이 안에 서 있는 동안 자신의 <span class="c_important">독 주입</span> 기술에 재사용 대기시간과 충전 한도가 적용되지 않습니다.</p>'},
		{job:'rog', parts:'amu wep glo rin', type:'leg', icon:'off', name:'흉내낸 주입의 공격 위상',  detail:'<p class="aspect_effect">복제된 그림자가 기술에 적용된 <span class="c_important">주입</span>도 흉내냅니다.<br><span class="c_important">주입</span> 기술을 시전하면 활성화된 <span class="c_important">복제된 그림자</span>의 피해가 <span class="c_number">5</span>초 동안 <span class="c_random">8 – 16%</span> 증가합니다.</p>'},

		{job:'com', parts:'sub hel che pan amu', type:'leg', icon:'def', name:'불복',  detail:'<p class="aspect_effect">어떤 형태로든 피해를 주면 방어도가 <span class="c_number">4</span>초 동안 <span class="c_random">0.25%</span> 증가합니다. 이 효과는 최대 <span class="c_random">25.00%</span>까지 중첩됩니다.</p>'},
		{job:'com', parts:'rin', type:'leg', icon:'res', name:'어스름',  detail:'<p class="aspect_effect">적을 군중 제어 상태로 만들면 주 자원을 <span class="c_random">1-4</span> 회복합니다.</p>'},
		{job:'com', parts:'amu wep glo rin', type:'leg', icon:'off', name:'재빠른',  detail:'<p class="aspect_effect"><span class="c_important">기본</span> 기술의 공격 속도가 <span class="c_random">15%</span> 증가합니다.</p>'},
		{job:'com', parts:'rin', type:'leg', icon:'res', name:'별빛 자원',  detail:'<p class="aspect_effect">자신이 생명력을 <span class="c_number">20%</span> 회복할 때마다 주 자원을 <span class="c_random">10-20%</span> 얻습니다.</p>'},
		{job:'com', parts:'sub hel che pan amu', type:'leg', icon:'def', name:'위세',  detail:'<p class="aspect_effect"><span class="c_important">기본</span> 기술이 <span class="c_random">2.0</span>초 동안 <span class="c_number">20%</span>의 피해 감소를 부여합니다.</p>'},
		{job:'com', parts:'sub hel che pan amu', type:'leg', icon:'def', name:'보호자',  detail:'<p class="aspect_effect">정예 적에게 피해를 주면 <span class="c_number">10</span>초 동안 최대 <span class="c_random">315</span>의 <span class="c_important"><span class="text-line">보호막</span></span>을 얻습니다. 이 효과는 <span class="c_number">30</span>초에 한 번만 발동합니다.</p>'},
		{job:'com', parts:'amu wep glo rin', type:'leg', icon:'off', name:'내면의 고요',  detail:'<p class="aspect_effect">가만히 서 있는 시간 1초당 주는 피해가 <span class="c_random">5.0%</span>만큼, 최대 <span class="c_number">30%</span>까지 증가합니다.</p>'},
		{job:'com', parts:'amu boo', type:'leg', icon:'mob', name:'바람 격퇴자',  detail:'<p class="aspect_effect">극대화 적중 시 이동 속도가 <span class="c_number">1</span>초 동안 <span class="c_random">8.0%</span>만큼, 최대 <span class="c_number">6</span>초까지 증가합니다.</p>'},
		{job:'com', parts:'amu wep glo rin', type:'leg', icon:'off', name:'자만하는',  detail:'<p class="aspect_effect"><span class="c_important"><span class="text-line">보호막</span></span>이 있을 때 주는 피해가 <span class="c_random">23-33%</span> 증가합니다.</p>'},
		{job:'com', parts:'amu wep glo rin', type:'leg', icon:'off', name:'응보',  detail:'<p class="aspect_effect">원거리에 있는 적이 자신을 적중시킬 때 <span class="c_number">8%</span>의 확률로 <span class="c_number">2</span>초 동안 기절합니다. 기절한 적에게 주는 피해가 <span class="c_random">20%</span> 증가합니다.</p>'},
		{job:'com', parts:'amu wep glo rin', type:'leg', icon:'off', name:'검의 달인',  detail:'<p class="aspect_effect">시전 시 사용할 수 있는 주 자원에 따라 기술이 주는 피해가 최대 <span class="c_random">10%</span> 증가합니다. 이 효과는 주 자원이 가득 찼을 때 효과를 발휘합니다.</p>'},
		{job:'com', parts:'sub hel che pan amu', type:'leg', icon:'def', name:'군중 속 현자',  detail:'<p class="aspect_effect">근거리에 있는 적 하나당 매초 생명력을 <span class="c_random">2.2-8.8%</span>만큼, 최대 <span class="c_number">44.0%</span>까지 회복합니다.</p>'},
		{job:'com', parts:'amu wep glo rin', type:'leg', icon:'off', name:'기대하는 자',  detail:'<p class="aspect_effect">적을 <span class="c_important">기본</span> 기술로 공격하면 다음으로 시전하는 <span class="c_important">핵심</span> 기술이 주는 피해가 <span class="c_random">5%</span>만큼, 최대 <span class="c_number">30%</span>까지 증가합니다.</p>'},
		{job:'com', parts:'amu boo', type:'leg', icon:'mob', name:'유령방랑자',  detail:'<p class="aspect_effect"><span class="c_important"><span class="text-line">저지 불가</span></span> 상태인 동안과 그 후 <span class="c_number">4</span>초 동안, 이동 속도가 <span class="c_random">10%</span> 증가하고 적 사이를 제약 없이 이동할 수 있습니다.</p>'},
		{job:'com', parts:'sub hel che amu glo boo', type:'leg', icon:'uti', name:'공통의 비참',  detail:'<p class="aspect_effect"><span class="c_label">행운의 적중:</span> 공격이 군중 제어의 영향을 받는 적에게 적중하면 최대 <span class="c_random">30%</span> 확률로 해당 군중 제어 효과가 영향을 받지 않는 다른 적에게 퍼집니다.</p>'},
		{job:'com', parts:'sub hel che amu glo boo', type:'leg', icon:'uti', name:'신출귀몰한',  detail:'<p class="aspect_effect">군중 제어 상태에서 <span class="c_important"><span class="text-line">부상</span></span>당하면 <span class="c_number">4</span>초 동안 <span class="c_important"><span class="text-line">저지 불가</span></span> 상태가 됩니다. 이 효과에는 <span class="c_random">40</span>초의 재사용 대기시간이 있습니다.</p>'},
		{job:'com', parts:'amu wep glo rin', type:'leg', icon:'res', name:'동화 자원',  detail:'<p class="aspect_effect">지속 피해의 영향을 받는 적을 상대로 회피 확률이 <span class="c_number">8%</span> 증가합니다. 회피할 때 주 자원을 <span class="c_random">5 – 10</span> 얻습니다.</p>'},
		{job:'com', parts:'amu wep glo rin', type:'leg', icon:'off', name:'바늘불꽃',  detail:'<p class="aspect_effect">가시 피해를 줄 때 <span class="c_random">20%</span> 확률로 주위 모든 적에게 피해를 줍니다.</p>'},
		{job:'com', parts:'sub hel che pan amu', type:'leg', icon:'def', name:'차폐하는 방벽',  detail:'<p class="aspect_effect"><span class="c_important"><span class="text-line">보호막</span></span>이 있을 때 주는 피해가 <span class="c_random">23-33%</span> 증가합니다.</p>'},
		{job:'com', parts:'amu wep glo rin', type:'leg', icon:'off', name:'천벌',  detail:'<p class="aspect_effect">부상당한 적을 상대로 극대화 확률이 <span class="c_random">13-25%</span> 증가합니다. 자신이 <span class="c_important"><span class="text-line">건강</span></span> 상태일 때 군중 제어 효과의 지속시간이 <span class="c_random">25-50%</span> 증가합니다.</p>'},
		{job:'com', parts:'amu wep glo rin', type:'leg', icon:'off', name:'가속하는',  detail:'<p class="aspect_effect"><span class="c_important">핵심</span> 기술이 극대화로 적중하면 공격 속도가 <span class="c_number">3</span>초 동안 <span class="c_random">20-40%</span> 증가합니다.</p>'},
		{job:'com', parts:'sub hel che amu glo boo', type:'leg', icon:'uti', name:'착취자',  detail:'<p class="aspect_effect">군중 제어 효과의 지속시간이 <span class="c_number">20%</span> 증가하고 저지 불가 상태인 적에게 주는 피해가 <span class="c_random">20-50%</span> 증가합니다.</p>'},
	];
	method.init = function(){
		method.setElement();
		method.layerFunc();
		$.each(skills, function(index, skill){
			obj.skillWrap.append('<div class="box__skill-grid '+skill.parts+'" data-job="'+skill.job+'" data-parts="'+skill.icon+'"><button type="button" class="button-skill" aria-selected="false" id="skill-num'+index+'"><span class="skill-icon icon-'+skill.icon+'"></span><span class="skill-detail"><span class="skill-name job-'+skill.job+' type-'+skill.type+'">'+skill.name+'</span><span class="skill-more">'+skill.detail+'</span></span></button></div>');
		});
		$.each(board, function(index, skill){
			//obj.boardWrap.append('<div class="box__skill-grid" data-job="'+skill.job+'"><button type="button" class="button-skill" aria-selected="false" id="board-num'+index+'"></span><span class="skill-detail"><span class="skill-name">'+skill.name+'</span><span class="skill-more">'+skill.detail+'</span></button></div>');
		});
		method.skillDB();

		//직업 선택
		$('#header .button-job').on('click', function(){
			var $this = $(this);
			var $job = $(this).attr('data-tab-select');
			if (!$(this).is('[aria-selected=true]')) {
				if ($('.inven .equ .option.selected').length > 0) {
					if (confirm("현재 선택된 위상이 있습니다.\n직업을 변경하면 선택했던 위상들이 초기화 됩니다. \n그래도 바꿀래영?")) {
						jobChange($this);
					}
				} else {
					jobChange($this);
				}
			}
			function jobChange($jobBtn){
				var $this = $jobBtn;
				$this.attr('aria-selected', true).siblings().attr('aria-selected', false);
				obj.wrapper.attr('data-job-select', $job);
				($this.hasClass('sub-equ-char')) ? $('.inven-wep .equ').eq(1).removeClass('wep').addClass('sub') : $('.inven-wep .equ').eq(1).addClass('wep').removeClass('sub')
				method.skillreset();
			}
		})
		//레이어 필터링 버튼
		$('.skill-head button').on('click', function(){
			var $this = $(this).attr('class');
			if ($(this).is('[aria-selected]')) {
				$(this).attr('aria-selected', true).siblings('[aria-selected]').attr('aria-selected', false);
			}
			obj.skillWrap.attr('data-filter', $this);
		})
	};
	method.setElement = function(){
		obj.body = $('body');
		obj.wrapper = $('#container');
		obj.skillWrap = obj.wrapper.find('#skillList');
		obj.boardWrap = obj.wrapper.find('#board');
		obj.skillOpenButton = obj.wrapper.find('.inven .equ:not(.emp) .option');
		obj.skillTarget = $('#'+obj.skillOpenButton.attr('data-target'));
		obj.lastButton = obj.skillOpenButton.is('.latest');
		obj.skillLayer = obj.wrapper.find('#skillSelect');
	};
	method.layerFunc = function(){
		//레이어 오픈
		obj.skillOpenButton.on('click', function(){
			var $parts = $(this).parents('.equ').attr('class').split(' ')[1];
			var $layer = $('#'+$(this).attr('aria-controls'));
			obj.skillOpenButton.removeClass('active latest');
			//obj.skillLayer.addClass('active').attr('data-sorting', $parts);
			$('.inven-skill-select').removeClass('active').removeAttr('data-sorting');
			$layer.addClass('active').attr('data-sorting', $parts);
			obj.wrapper.find('.inven').addClass('active');
			$(this).addClass('active latest');
			(!$(this).is('.selected'))
				? $('.sort-by-dis').addClass('disabled') 
				: $('.sort-by-dis').removeClass('disabled')
			method.layerSort($parts);
			$layer.find('.box-skill-select').scrollTop(0);
			method.fixedViewPort(true);
		})
		$('.js-disabled').on('click', function(){
			var $target = $('.inven .equ .option.latest').attr('data-target');
			if (!$(this).is('.disabled')) {
				obj.skillWrap.find('#'+$target).attr('aria-selected', false);
				$('.inven .equ .option.latest').removeAttr('data-target').removeClass('selected').siblings('.text').find('.detail, .more').empty();
			} else {
				return false;
			}
			obj.skillOpenButton.removeClass('active');
			$(this).parents('.inven-skill-select').removeClass('active').removeAttr('data-sorting');
			//obj.skillLayer.removeClass('active').removeAttr('data-sorting');
			obj.wrapper.find('.inven').removeClass('active');
			method.fixedViewPort(false);
		})
	};
	method.skillreset = function(){
		obj.skillOpenButton.removeClass('active selected latest').removeAttr('data-target');
		obj.skillLayer.removeClass('active').removeAttr('data-sorting');
		obj.wrapper.find('.inven').removeClass('active').find('.equ .text .detail, .equ .text .more').empty().removeClass('type-uni type-leg');
		obj.skillButton.attr('aria-selected', false);
		method.fixedViewPort(false);
	}
	method.layerSort = function($target){
		obj.job = obj.wrapper.attr('data-job-select');
		var $target = obj.skillLayer.attr('data-sorting');
		obj.skillLayer.find('.box__skill-grid').addClass('hide').removeClass('show');
		obj.skillLayer.find('.box__skill-grid.'+$target+'[data-job='+obj.job+'], .box__skill-grid.'+$target+'[data-job=com]').removeClass('hide').addClass('show');
		
	};
	method.invCheck = function($id){
		var $invSkill = [];
		obj.skillOpenButton.each(function(index){
			var $target = ($(this).attr('data-target') !== undefined) ? $(this).attr('data-target') : '';
			$invSkill.push($target)
			if ($id == $(this).attr('data-target')) {
				$(this).not('.latest').attr('data-target', $id).removeAttr('data-target').removeClass('selected').siblings('.text').find('.detail, .more').empty();
			}
		});
		$.each($invSkill, function(index){
			$('#'+$invSkill[index]).attr('aria-selected', true);
		})
	};
	method.skillDB = function(){
		obj.skillButton = obj.wrapper.find('.button-skill');
		obj.skillButton.on('click', function(){
			var $detail = $(this).find('.skill-name');
			var $tooltip = $(this).find('.skill-more').html();
			var $detailButton = $('.inven .equ .option.active').siblings('.text').find('.detail');
			var $target = $('.inven .equ .option.active').attr('data-target');
			obj.skillID = $(this).attr('id');
			$('.sort-by-all').trigger('click');
			$('#'+$target).attr('aria-selected', false);
			$('.inven .equ .option.active').addClass('selected').attr('data-target', $(this).attr('id'));
			obj.skillOpenButton.removeClass('active');
			obj.skillLayer.removeClass('active');
			obj.wrapper.find('.inven').removeClass('active');
			$detailButton.text($detail.text()).next().html($tooltip);
			($(this).find('.skill-name').hasClass('type-uni')) 
				? $detailButton.addClass('type-uni')
				: $detailButton.removeClass('type-uni')
			method.invCheck(obj.skillID);
			method.fixedViewPort(false);
		})
	};
	method.fixedViewPort = function(fixedView){
		(fixedView) ? obj.body.addClass('scroll-lock') : obj.body.removeClass('scroll-lock');
	};
	return{
		init : method.init,
		skillDB : method.skillDB,
		layerSort : method.layerSort,
		layerFunc : method.layerFunc,
		fixedViewPort : method.fixedViewPort,
	}
})();
D4SkillDB.init();