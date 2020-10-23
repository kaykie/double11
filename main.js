var baseWidth = 1080,baseHeight = 2400;
var height = device.height;
var width = device.width;

setScreenMetrics(baseWidth,baseHeight);

threads.start(function(){
  events.observeKey();
  events.on("key_down", function(keyCode, events){
    if(keyCode == keys.volume_up){
      toastLog('停止脚本使用')
      exit();
    }
  });
});
var canCapture = requestScreenCapture();
if(!canCapture){
  toast('请授权截图!')
  exit()
}

launchApp('手机淘宝')
sleep(3000);

click(820,860); // 点击双11活动主场 需要根据不同情况而改变

sleep(7000);

let catImg = images.read('/sdcard/catImg.jpg');
if(catImg === null){
  catImg = images.load('https://pic1.zhimg.com/80/v2-8a9af44ba48b553fbbdafd96475ad47c_1440w.jpeg'); // 图片不能为png格式的 无法加载到
  catImg.saveTo('/sdcard/catImg.jpg');
}

click('我知道啦！')

// let screenCaptureImg2 = images.grayscale(screenCaptureImg)
// images.save(screenCaptureImg2,'/sdcard/screenCaptureImg2.jpg')
sleep(2000);

// 如果有11月11日见弹出框 则关闭
var eleven = text('好的，11月11日见').findOnce();
if(eleven){
  click('好的，11月11日见');
  sleep(2000)
}

click('点击领取');
sleep(2000)

click(942,1973); // 点击  赚喵币


sleep(1500)
while(true){
  var goText = text('去浏览').findOnce();
  if(goText){
    click(goText.bounds().centerX(),goText.bounds().centerY());
    sleep(5000)
    swipe(baseWidth/3,baseHeight - 200,baseWidth/2,200,2000);
    sleep(15000);
    back();
    sleep(2000);
    click('领取奖励');
    sleep(1000)
  }else{
    var goSearch = text('去搜索').findOnce();
    if(goSearch){
      click(goSearch.bounds().centerX(),goSearch.bounds().centerY());
      sleep(5000)
      swipe(baseWidth/3,baseHeight - 200,baseWidth/2,200,2000);
      sleep(15000);
      back();
      sleep(2000);
      click('领取奖励');
      sleep(1000);
    }else{
      var array = ['逛一逛"运动尖货"(0/2)','逛一逛"运动尖货"(1/2)','逛一逛"运动户外"(0/2)','逛一逛"运动户外"(1/2)','逛一逛"潮酷新品"(0/2)','逛一逛"潮酷新品"(1/2)','逛一逛"潮酷出行"(0/2)','逛一逛"潮酷出行"(1/2)','逛一逛"潮流趋势"(0/2)','逛一逛"潮流趋势"(1/2)','逛一逛"时尚配饰"(0/2)','逛一逛"时尚配饰"(1/2)','逛一逛"家居百货"(0/2)','逛一逛"家居百货"(1/2)'];
      var goTo = null;
      for(var i = 0;i<array.length;i++){
        var a = text(array[i]).findOnce();
        if(a){
          goTo = a;
          break;
        }
      }
      if(goTo){
        click(goTo.bounds().centerX(),goTo.bounds().centerY());
        sleep(2000)
        swipe(baseWidth/3,baseHeight - 200,baseWidth/2,200,2000);
        sleep(15500);
        back();
        sleep(2000);
        click('领取奖励');
        sleep(1000);
      }else{
        break
      }
    }
  }
}
toastLog('结束!');
click(974,650); // 点击右上角关闭
exit();




function readImg(name,url){
  let catImg = images.read('/sdcard/'+name);
  if(catImg === null){
    catImg = images.load(url); // 图片不能为png格式的 无法加载到
    catImg.saveTo('/sdcard/'+name);
  };
  return catImg
}