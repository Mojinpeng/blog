window.onload=function(){
		var oScroll=document.getElementById("scroll");	
		var oUl=oScroll.getElementsByTagName('ul');
		var lis=document.getElementById('slider_list').getElementsByTagName('li');
		var cir=oScroll.getElementsByTagName('i');
	//轮播图小点样式控制
	function change(){
		var timer=null;
			for (var i = 0; i < cir.length; i++) {
				cir[i].onmouseover=function(num){
					return function(){
					clearTimeout(timer);
					timer=setTimeout(function(){
						for (var j = 0; j < cir.length; j++) {
						cir[j].setAttribute("class","circle");
						move(lis[j],{opacity:0});
						lis[j].style.zIndex=0;

						}
					cir[num].setAttribute("class","circle circle_active");
					lis[num].style.zIndex=1;
					move(lis[num],{opacity:100});
						},300)
						
				}
			}(i);
		}
	}
	change();
	//搜索框清空
		var input=document.getElementById("search");
		var oldValue=input.value;
			input.onfocus=function(){
				input.value="";			
			}
			input.onblur=function(){
				input.value=oldValue;
			}

	//侧边导航栏(只是做一个演示，item只写两个，所以鼠标放入后面的goods中时会报错)
	function openlist(){
		var goods=document.getElementById("main_col1").getElementsByTagName('li');
		var submenu=document.getElementById("submenu");
		var item=submenu.children;
		for (var i = 0; i < goods.length; i++) {
			goods[i].onmouseover=function(index){
				return function(){
					goods[index].setAttribute("class","menu_item menu_item_active")
					submenu.style.display="block";
					item[index].style.display="block";
				}
			}(i);		
			goods[i].onmouseout=function(index){
				return	function(){
					goods[index].setAttribute("class","menu_item")
					submenu.style.display="none";
					item[index].style.display="none";
				}			
			}(i);
		}
	}
	openlist();
	//右侧新闻tab
	function news(){
		var tab=document.getElementById("news_tab").getElementsByTagName("a");
		var newsBox=document.getElementById("news_content_box").getElementsByTagName("div");
		for (var i = 0; i < tab.length-1; i++) {
			tab[i].onmouseover=function(index){
				return function(){
					for (var j = 0; j < tab.length-1; j++) {
						tab[j].removeAttribute("class","news_tab_on");
						newsBox[j].removeAttribute("class","news_show");
					}
					tab[index].setAttribute("class","news_tab_on");
					newsBox[index].setAttribute("class","news_show");
				}
			}(i);
				// tab[index].removeAttribute("class","news_tab_on");
				// newsBox[index].setAttribute("class","news_content_item");
		}
	}
	//添加雪碧图(京东上的雪碧图是乱的，所以我自己扣下来做了一个)
	news();
	function sprite(){
		var icon=document.getElementById("service_list").getElementsByTagName("i");
		for (var i = 0; i < icon.length; i++) {
			icon[i].style.backgroundPosition="0 "+(-35*i)+"px";
		}
	}
	sprite();
	//轮播图切换
	
	var oScroll=document.getElementById("scroll");
	var index=0;

	oScroll.onmouseover=function(){
		next.style.display="block";
		prev.style.display="block";
		stop();
	}
	oScroll.onmouseout=function(){
		next.style.display="none";
		prev.style.display="none";
		play();
	}
	next.onclick=function(){
		Arrow(1);
	}
	prev.onclick=function(){
		Arrow(-1);
	}
	function play(){
		timer=setInterval(function(){
			next.onclick();
		},3000)
	}
	function stop(){
		clearInterval(timer);
	}
	play();
	function Arrow(num){
	
		var next=document.getElementById('next');
		var prev=document.getElementById('prev');
		index+=num;
		if (index>lis.length-1) {
			index=0;
		}
		else if(index<0){
			index=lis.length-1;
		}	
			for (var i = 0; i < lis.length; i++) {
				lis[i].style.zIndex=0;
				move(lis[i],{opacity:0});
				cir[i].className="circle";	
			}
			lis[index].style.zIndex=1;
			move(lis[index],{opacity:100});
			cir[index].className="circle circle_active";
	}
//运动框架
function getStyle(obj, name)
{
	if(obj.currentStyle)
	{
		return obj.currentStyle[name];
	}
	else
	{
		return getComputedStyle(obj, false)[name];
	}
}
function move(obj,json,fnEnd){
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
		var stop=true;
		for (var attr in json){
			var cur=0;
			if (attr=="opacity") {
				cur=Math.round(parseFloat(getStyle(obj,attr))*100);
			}
			else{
				cur=parseInt(getStyle(obj,attr));
			}
			var step=(json[attr]-cur)/10;
			step=step>0?Math.ceil(step):Math.floor(step);
			stop=false;
			if(cur!=json[attr]){
			}
			if (attr=='opacity') {
				obj.style.filter="alpha(opacity:"+(cur+step)+")";
				obj.style.opacity=(cur+step)/100;
			}
			else{
				obj.style[attr]=cur+step+"px";
			}
		}
			if (stop) {
				clearInterval(obj,timer);
				if(fnEnd){fnEnd();}
			}
		},30)
	}
}