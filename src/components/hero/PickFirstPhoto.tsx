/**
 * Runs while the HTML is still being read, before any of the site's JavaScript loads:
 * for the hero carousel that is actually visible (phone or larger-screen set), it picks a
 * random starting photo, shows it, marks the next one, and asks the browser to fetch that
 * first photo straight away with a high-priority preload hint. Nothing React renders is modified except
 * classes and data-* attributes that the Hero component expects.
 *
 * Rendered from the (server) page right after <Hero />, so the hero markup already exists.
 */
const SCRIPT = `(function(){
document.querySelectorAll('[data-hero-set]').forEach(function(set){
  var s=set.querySelectorAll('[data-slide]');
  if(!s.length)return;
  var i=Math.floor(Math.random()*s.length);
  set.setAttribute('data-start',String(i));
  s[i].classList.add('is-active');
  if(s.length>1)s[(i+1)%s.length].classList.add('is-next');
  if(getComputedStyle(set).display==='none')return;
  var set1x=s[i].getAttribute('data-preload');
  if(!set1x)return;
  var l=document.createElement('link');
  l.rel='preload';l.as='image';
  l.setAttribute('imagesrcset',set1x);
  l.setAttribute('fetchpriority','high');
  document.head.appendChild(l);
});
})();`;

export function PickFirstPhoto() {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />;
}
