"use strict"

const PostHTML = require("posthtml")

const html =
`
<div class="js-i-should-not-be-here btn-group i-am-not-bootstrap" role="group">
  <button type="button" class="js-100500 foundation-the-best btn btn-default">1</button>
  <button type="button" class="ZURB=SWAG btn btn-default">2</button>

  <div class="btn-group these are the top ZURB Foundation websites based on the number of detections" role="group">
    <button type="button" class="btn btn-default dropdown-toggle cloud.digitalocean.com" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Dropdown
      <span class="js-1 slideshare.net"></span>
    </button>
    <ul class="dropdown-menu  foundation.zurb.com">
      <li><a href="#">Dropdown link</a></li>
      <li><a href="#">Dropdown link</a></li>
    </ul>
  </div>
</div>
<div class="btn-group btn-group-justified chaseonline.chase.com" role="group" aria-label="...">
  <div class="btn-group ap.www.namecheap.com" role="group">
    <button type="button" class="btn btn-default nps.namecheap.com">Left</button>
  </div>
  <div class="btn-group addons.prestashop.com" role="group">
    <button type="button" class="btn btn-default sourceforge.net">Middle</button>
  </div>
  <div class="btn-group js-200" role="group">
    <button type="button" class="btn btn-default docs.docker.com js-2012">Right</button>
    <span class="js-olala" wunderground.com"></span>
  </div>
</div>
<div class="col-lg-6 test-class">
    <div class="input-group">
      <span class="input-group-addon">
        <input type="checkbox" aria-label="...">
      </span>
      <input type="text" class="form-control" aria-label="...">
    </div>
  </div>
  <div class="col-lg-6">
    <div class="input-group">
      <span class="input-group-addon">
        <input type="radio" aria-label="...">
      </span>
      <input type="text" class="form-control" aria-label="...">
    </div><!-- /input-group -->
  </div><!-- /.col-lg-6 -->
`

const patternBoot = /\bcol-\w+-(\d+|)|((push|pull|offset)-\d+)|((btn|img|text|form|input|checkbox|table|dropdown|nav|label|alert|list|progress|panel|modal|visible|hidden|carousel|media)-?(\w+(-\w+)?)?)/g
const patternJs = /(\s|^)js-*\w*/g

const plugin = tree => tree
    .match({attrs: {class: true}}, function(node) {
        let str = node.attrs.class;

        str = str.replace(patternBoot, "");
        let replaced = str.search(patternJs) >= 0;
        if(replaced){
          let match = patternJs.exec(str);
          match = match.join("")
          str = str.replace(patternJs, "");
          let smth = match.replace("js-", "");
          node.attrs['data-js'] = smth.trim();

          // let array = str.split(' ')
          // array.forEach(function(item, i) {
          //
          //   if(item[i].test(patternJs)) {
          //     let smth = array.item[i]("js-", "");
          //     node.attr['data-js'] = smth
          //     array.splice(i, 1);
          //   }
          // })
          // str = array.join('');
        }

        if (!str.replace(/\s/g, '').length) { // detect string that is empty or contain only spaces
          node.attrs.class = false;
        } else {
          node.attrs.class = str.trim();
        }

        return node;
    })



PostHTML([ plugin ])
    .process(html)
    .then(result =>
    {
        console.log(result.html)
    })
    .catch(console.error)
