'use strict';

const regex = /(<blockquote>[\n|\s]*<p>\[!)(NOTE|IMPORTANT|WARNING|TIP)\]([^]*?)<\/p>[\n|\s]*<\/blockquote>/gm;

//transformation rules
const alertConfig = {
  "NOTE": {
    className: "is-info",
    ja: "注意",
  },
  "IMPORTANT": {
    className: "is-important",
    ja: "重要"
  },
  "WARNING": {
    className: "is-warning",
    ja: "注意"
  },
  "TIP": {
    className: "is-success",
    ja: "ヒント"
  }
}

hexo.extend.filter.register('after_post_render', function (data) {
  data.content = data.content.replace(regex, function(match, _, p2, p3){
    const alert = alertConfig[p2];
    const title = alert.ja;
    const className = alert.className;
    
    const content = p3.split('<br>');

    if(content[0] === ""){
      //delete first empty line
      content.shift();
    }

    //generate p tags
    const p = '<p>' + content.join('</p><p>') + '</p>';

    return `<div class="alert ${className}"><p class="alert-title">${title}</p>${p}</div>`;
  });
  return data;
});