class BottomLoader{
  constructor(isDebounce){
    this.BUFF = 200;
    this.viewportHeight = window.screen.height;
    this.DIFF = this.viewportHeight;
    this.cbContent = {};
    this.count = 1;
    this.last = 0;
    this.init(isDebounce);
  }
  init(isDeb){
    var self = this;
    var timer = null;
    window.addEventListener('scroll', function () {
      if(isDeb){
        if (typeof timer === 'number') {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            //添加onscroll事件处理
            self.detect();
        }, self.BUFF);
      }else{
        self.throttle(200,self.detect);
      }
    }, false);
  }
  detect(){
    var self = this;
    var docHeight = document.body.clientHeight;
    var scrollTop = document.body.scrollTop; //scroll distance
    //console.log('detect');
    var elBottomPos = docHeight;
    var cbContent=self.cbContent;
    if ((self.viewportHeight + scrollTop + cbContent.diff >= elBottomPos )/*&&(scrollTop + cbContent.diff <= elBottomPos )*/){
      cbContent.callback && cbContent.callback(self.count);
      console.log('Loader '+self.count+" times");
      self.count ++;
    }
  }
  addCallback(callback,config){
    var self = this;
    self.cbContent = {
      diff: config.diff || self.DIFF,
      callback: callback
    };
    if(config.immediately){
      self.detect();
    }
  }
  throttle(delay, action){
    var self = this;
    var curr = +new Date();
    if (curr - self.last > delay){
      // console.log('in');
      action.apply(this, arguments);
      self.last = curr ;
    };
  }
}
export default BottomLoader;