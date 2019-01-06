window.onload=function() {
	//顶部悬浮
	var cover = document.getElementById("cover");

    window.onscroll = function() {
        var st = document.documentElement.scrollTop || document.body.scrollTop;
        if(st > 180) {
            cover.style.position = 'fixed';
        } else {
            cover.style.position = 'static';
        }
    }
	var select=document.getElementsByTagName('select')[0];
	select.onchange=function(){
		select.nextElementSibling.innerHTML='￥'+select.value;
	}
	var yin=document.getElementsByClassName('yinc')[0];
	var x1,x2,x3,x4,x5,x6,x7,x8;
	function you(){
		yin.children[0].onmouseover=function(){
			clearInterval(x2);
			x1=dates3(this,'left');
		}
		yin.children[0].onmouseout=function(){
			clearInterval(x1);
			x2=dates4(this,'left');
		}
		yin.children[1].onmouseover=function(){
			clearInterval(x4);
			x3=dates3(this,'left');
		}
		yin.children[1].onmouseout=function(){
			clearInterval(x3);
			x4=dates4(this,'left');
		}
		yin.children[2].onmouseover=function(){
			clearInterval(x6);
			this.lastElementChild.src='img/erwei.png';
			this.lastElementChild.style.marginTop=0+'px';
			x5=dates3(this,'left');
		}
		yin.children[2].onmouseout=function(){
			clearInterval(x5);
			this.lastElementChild.src='img/serwei.png';
			this.lastElementChild.style.marginTop=40+'px';
			x6=dates4(this,'left');
		}
		yin.children[3].onmouseover=function(){
			clearInterval(x8);
			x7=dates3(this,'left');
		}
		yin.children[3].onmouseout=function(){
			clearInterval(x7);
			x8=dates4(this,'left');
		}
	}
	you();
	function dates3(obj,attr){
		var n=parseInt(getStyle(obj,attr));
		var xx=setInterval(function(){
			if(n!=0){
				n=n-2;
				obj.style[attr]=n+"px";
			}
			else
				clearInterval(xx);
		},10);
		return xx;
	}
	function dates4(obj,attr){
		var n=parseInt(getStyle(obj,attr));
		var xx=setInterval(function(){
			if(n!=80){
				n=n+2;
				obj.style[attr]=n+"px";
			}
			else
				clearInterval(xx);
		},10);
		return xx;
	}
	var gg=document.getElementById('gg');
	gg.onmouseover=function(){
		clearInterval(x3);
	}
	 gg.onmouseout=function(){
		gun();
	}
	var slider=document.getElementById("slider");
	var box=document.getElementById('box');
	var left=document.getElementById('left');
	var right=document.getElementById('right');
	var rl=document.getElementById('rl').children;
	var y=1;
	function lunbo(){
		if(parseInt(getStyle(slider,'left'))%800==0){
			++y;
			dates(slider,{left:-800*y},function(){
				if(y==7){
					slider.style.left=-800+'px';
					y=1;
				}
			});
			gai(y);
		}
	}
	var timer=setInterval(lunbo,3200);
	function dates(obj,json,callback){
		clearInterval(obj.timer);
		obj.timer=setInterval(
			function(){
				var ting=true;
				for(var attr in json){
					var now=parseInt(getStyle(obj,attr)*100);
					now=(attr=='opacity')?now:parseInt(getStyle(obj,attr));
					var speed=(json[attr]-now)/5;
					speed=speed>0?Math.ceil(speed):Math.floor(speed);
					obj.style[attr]=(attr=='opacity')?(now+speed)/100+'px':now+speed+'px';
					var current=now+speed;
					if(json[attr]!==current)
						ting=false;
				}
				if(ting){
					clearInterval(obj.timer);
					callback&&callback();
				}
		},40)
	}
	function getStyle(obj,style){
    	if(getComputedStyle(obj))
    		return getComputedStyle(obj)[style];
    	else
    		obj.currentStyle[style];
    }
    box.onmouseover=function(){
    	clearInterval(timer);
    	dates(left,{opacity:50});
    	dates(right,{opacity:50});
    }
    box.onmouseout=function(){
    	timer=setInterval(lunbo,3200);
    	dates(left,{opacity:0});
    	dates(right,{opacity:0});
    }
    right.onclick=lunbo;
    left.onclick=function(){
    	if(parseInt(getStyle(slider,'left'))%800==0){
    		y--;
			dates(slider,{left:-800*y},function(){
				if(y==0){
					slider.style.left=-4800+'px';
					y=6; 
				}
			});
			gai(y);
    	}
    }
    for (var i = rl.length - 1; i >= 0; i--) {
    	rl[i].y=i+1;
    	rl[i].onclick=function(){
    		y=this.y;
    		dates(slider,{left:-800*this.y});
    		gai(this.y);
    	}
    }
    function gai(n){
    	for (var i = rl.length - 1; i >= 0; i--)
    		rl[i].className="";
    	if(n==7)
    		rl[0].className="active";
    	else if(n==0)
    		rl[5].className="active";
    	else
    		rl[n-1].className="active";
    }
	//公告滚动
	var gg=document.getElementById('gg');
	for (var i = 0; i<gg.children.length; ++i)
			gg.children[i].style.top=i*30+'px';
	function gun(){
		x3=setInterval(function(){
			for (var i = gg.children.length - 1; i >= 0; i--){
				if(parseInt(getStyle(gg.children[i],'top'))<=-30)
					gg.children[i].style.top=360+'px';
				dates2(gg.children[i],{top:parseInt(getStyle(gg.children[i],'top'))-30});
			}
		},560);
	}
	gun();
	function dates2(obj,json,callback){
		clearInterval(obj.timer);
		obj.timer=setInterval(
			function(){
				var ting=true;
				for(var attr in json){
					var now=parseInt(getStyle(obj,attr));
					var speed=-3;
					obj.style[attr]=now+speed+'px';
					var current=now+speed;
					if(json[attr]!==current){
						ting=false;
					}
				}
				if(ting)
					clearInterval(obj.timer);
		},40)
	}
}


