// Транслит input

function translit(startid,endid){
var text=document.getElementById(startid).value;
var transl=new Array();
    transl['А']='A';     transl['а']='a';
    transl['Б']='B';     transl['б']='b';
    transl['В']='V';     transl['в']='v';
    transl['Г']='G';     transl['г']='g';
    transl['Д']='D';     transl['д']='d';
    transl['Е']='E';     transl['е']='e';
    transl['Ё']='Yo';    transl['ё']='yo';
    transl['Ж']='Zh';    transl['ж']='zh';
    transl['З']='Z';     transl['з']='z';
    transl['И']='I';     transl['и']='i';
    transl['Й']='J';     transl['й']='j';
    transl['К']='K';     transl['к']='k';
    transl['Л']='L';     transl['л']='l';
    transl['М']='M';     transl['м']='m';
    transl['Н']='N';     transl['н']='n';
    transl['О']='O';     transl['о']='o';
    transl['П']='P';     transl['п']='p';
    transl['Р']='R';     transl['р']='r';
    transl['С']='S';     transl['с']='s';
    transl['Т']='T';     transl['т']='t';
    transl['У']='U';     transl['у']='u';
    transl['Ф']='F';     transl['ф']='f';
    transl['Х']='X';     transl['х']='x';
    transl['Ц']='C';     transl['ц']='c';
    transl['Ч']='Ch';    transl['ч']='ch';
    transl['Ш']='Sh';    transl['ш']='sh';
    transl['Щ']='Shh';    transl['щ']='shh';
    transl['Ъ']='"';     transl['ъ']='"';
    transl['Ы']='Y\'';    transl['ы']='y\'';
    transl['Ь']='\'';    transl['ь']='\'';
    transl['Э']='E\'';    transl['э']='e\'';
    transl['Ю']='Yu';    transl['ю']='yu';
    transl['Я']='Ya';    transl['я']='ya';

    var result='';
    for(i=0;i<text.length;i++) {
        if(transl[text[i]]!=undefined) { result+=transl[text[i]]; }
        else { result+=text[i]; }
    }
    document.getElementById(endid).value=result;
}

// Семейное положение

$(document).ready(function(){
	
$arrman=['женат','в «гражданском браке»','разведен','холост','вдовец'];
$arrwoman=['замужем','в «гражданском браке»','разведена','не замужем','вдова'];

$('input[name=sex]').change(function(){
	$val=$(this).val();
	$('#marital-status').html('<option></option>');
	if($val=='male'){
		$arr=$arrman;
	}else{
		$arr=$arrwoman;
	}
	for($i=0;$i<$arr.length;$i++){
		$('#marital-status').append('<option value="'+$arr[$i]+'">'+$arr[$i]+'</option>');
	}		
});

// Checkbox подтверждение
	
	var check = document.getElementById('agree');
	var sendbtn = document.getElementById('submit');
	
	check.onchange = function() {
	sendbtn.disabled = this.checked?false:true;
		
	};
	
// Mask для Моб. телефона
		
   $("#tel").mask("+7(999) 999-9999");
	
// Дата рождения
   
function getOlder($cls){
	var fulldate = new Date(); 
	var thisyear = fulldate.getFullYear();
	var thismonth = fulldate.getMonth()+1;
	var thisday = fulldate.getDate();
	var datayear = parseInt($("#data-year").val());
	var datamonth = parseInt($("#data-month").val());
	var dataday = parseInt($("#data-day").val());
	console.log(thismonth);
	console.log(datamonth);

	$correct='';
	
	if(!datayear || !datamonth || !dataday){
		$correct='';
	}else{
		if((thisyear-90) == datayear){
			if(thismonth == datamonth){
				if(thisday >= dataday){
					$correct=$cls;
				}
			}else if(thismonth > datamonth){
				$correct=$cls;
			}
			
		}else if((thisyear-90) > datayear){
			$correct=$cls;
		}
	}
	
	return $correct;
}

$('.form__field-data select').change(function(){
	$classOlder='older';
	$('.form__field-data').removeClass($classOlder);
	 $res=getOlder($classOlder);
	if($res==$classOlder){
		$('.form__field-data').addClass($classOlder);
	}
});

	
	
});


// Отправка результата в Google Sheets

$(document).ready(function() {
    $('#form').submit(function() {
        var surname = $("#surname").val();
        var changedsur = $("#changedsur:checked").val();
		
		if($("#changedsur:checked").length){ 
		$chnVal='Да'; 
		}else{ 

		$chnVal='Нет'; 

		}
		
        var name = $("#name").val();
        var patron = $("#patronymic").val();
        var surnamelat = $("#surname-latin").val();
        var namelat = $("#name-latin").val();
		var data = $("#data-day").val()+'.'+$("#data-month").val()+'.'+$("#data-year").val();
        var sex = $("input[name=sex]:checked").data('val');
        var status = $("#marital-status").val();
        var edu = $("#education").val();
        var phone = $("#tel").val();
        var email = $("#email").val();
        var http = new XMLHttpRequest();
        var url = "https://script.google.com/macros/s/AKfycbwloIRFwwZJhC9WHcyFFP7dEJgUqLFKW9eN5GaH/exec";
        var params = "p1="+surname+"&p2="+$chnVal+"&p3="+name+"&p4="+patron+"&p5="+surnamelat+"&p6="+namelat+"&p7="+data+"&p8="+sex+"&p9="+status+"&p10="+edu+"&p11="+phone+"&p12="+email;
        http.open("GET", url+"?"+params, true);
        http.onreadystatechange = function() {
            if(http.readyState == 4 && http.status == 200) {
                //alert(http.responseText);
            }
        }
        http.send(null);
    });
});
