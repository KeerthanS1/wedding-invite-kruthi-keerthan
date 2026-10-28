/**
 * Runs while the HTML is still being read, before any of the site's JavaScript loads:
 * for each hero carousel (phone and larger-screen sets) it records the play order (file-name
 * order), shows the first photo, marks the next one, and for the visible set asks the browser to fetch that
 * first photo straight away with a high-priority preload hint. Nothing React renders is modified except
 * classes and data-* attributes that the Hero component expects.
 *
 * Rendered from the (server) page right after <Hero />, so the hero markup already exists.
 */
const SCRIPT = `(function(){
document.querySelectorAll('[data-hero-set]').forEach(function(set){
  var s=set.querySelectorAll('[data-slide]');
  var n=s.length;
  if(!n)return;
  var order=[];for(var k=0;k<n;k++)order.push(k);
  set.setAttribute('data-order',order.join(','));
  s[order[0]].classList.add('is-active');
  if(n>1)s[order[1]].classList.add('is-next');
  if(getComputedStyle(set).display==='none')return;
  var srcset=s[order[0]].getAttribute('data-preload');
  if(!srcset)return;
  var l=document.createElement('link');
  l.rel='preload';l.as='image';
  l.setAttribute('imagesrcset',srcset);
  l.setAttribute('fetchpriority','high');
  document.head.appendChild(l);
});
})();`;

export function PickFirstPhoto() {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />;
}
