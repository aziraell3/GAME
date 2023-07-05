var D4Option = (function(){
	var method = {};
	var options = [
		// job = com|dru|bab|soc|rog|nec
		// parts = wep|sub|hel|che|glo|pan|boo|amu|rin
		// type = leg|uni
		// icon = off|def|uti|res|mob|emp
		// name = aspect name
		// detail = aspect detail
			// off = amu wep glo rin
			// def = sub hel che pan amu
			// uti = sub hel che amu glo boo
			// res = rin
			// mob = amu boo
		//{ver:'dlc', job:'com', icon:'off', type:'leg', parts:'wep sub hel che glo pan boo amu rin', 	name:'[DLC] TEST 위상',  detail:'<p class="aspect_effect"><span class="c_important">TYPE TEST</span> : XXX자원을 <span class="c_random"><span class="txt_calc" data-origin="10"></span> - <span class="txt_calc" data-origin="20"></span>%</span> 얻습니다.</p>'},

	];
	method.init = function(){
		$.each(options, function(index, option){
			$('#optionList').append('<div class="box__aspect-grid '+aspect.parts+'" data-job="'+aspect.job+'" data-parts="'+aspect.icon+'" data-ver="'+aspect.ver+'"><button type="button" class="button-aspect icon-'+aspect.icon+'" aria-selected="false" id="SKN'+index+'"><span class="aspect-detail"><span class="aspect-name job-'+aspect.job+' type-'+aspect.type+'">'+aspect.name+'</span><span class="aspect-more">'+aspect.detail+'</span><span class="aspect-parts"></span></span></button></div>');
		});
	};
	return{
		init : method.init
	}
})();
D4Option.init();