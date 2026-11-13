# Builds privacy.html from the policy on the existing site (saved copies passed as arguments), with the
# edits the new site needs: no Google Analytics, no consent banner, language choice kept in browser storage.
import re, sys, html
from bs4 import BeautifulSoup
KEEP = {'h1','h2','h3','p','table','thead','tbody','tr','th','td','ul','li','dl','dt','dd','div','section','a'}
def load(path):
    s = open(path, encoding='utf-8').read().replace('<!-- -->', '')
    m = BeautifulSoup(s, 'html.parser').find('main')
    for t in m.find_all(True):
        scope = t.get('scope'); href = t.get('href')
        t.attrs = {}
        if scope: t['scope'] = scope
        if href: t['href'] = href
    return m
def edit(m, lang):
    ko = lang == 'ko'
    secs = m.find_all('section')
    s1, s2, s5, s6, s7 = secs[0], secs[1], secs[4], secs[5], secs[6]
    s1.find('tbody').find_all('tr')[1].decompose()                      # visit statistics row
    s2.find('ul').find_all('li')[1].decompose()                         # visit statistics retention
    s5.find('tbody').find_all('tr')[2].decompose()                      # Google LLC as processor
    s6.find_all('h3')[1].decompose(); s6.find_all('dl')[1].decompose()  # Google LLC overseas transfer
    s6.find_all('p')[-1].decompose()                                    # Google signals sentence
    ps = s7.find_all('p', recursive=False)
    ps[0].string = '회사는 이용 편의를 위해 다음 정보를 이용자의 기기에 저장합니다.' if ko else 'The Company stores the following on your device for convenience.'
    rows = s7.find('tbody').find_all('tr')
    c = rows[0].find_all('td')
    c[0].string = 'ngt-lang (브라우저 저장소)' if ko else 'ngt-lang (browser storage)'
    c[2].string = '직접 삭제할 때까지' if ko else 'Until you delete it'
    rows[1].decompose(); rows[2].decompose()
    lis = s7.find('ul').find_all('li')
    lis[0].decompose(); lis[2].decompose()
    lis[1].string = ('웹 브라우저 설정에서 저장을 차단하거나 저장된 정보를 삭제할 수 있습니다. 차단하면 언어 선택이 기억되지 않을 수 있습니다.' if ko
                     else "You can block or delete this stored information in your web browser's settings. Blocking it may stop your language choice from being remembered.")
    for p in s7.find_all('p'):
        if p.find('button'): p.decompose()
    for b in m.find_all('button'): b.decompose()
    for t in m.find_all('table'):                                       # tables scroll sideways on a phone
        w = t.parent
        if w.name == 'div': w['class'] = 'pp-table'
    for d in m.find_all('dl'): d['class'] = 'pp-dl'
    inner = m.find('div')
    out = inner.decode_contents()
    left = [w for w in ('Google', '애널리틱스', 'Analytics', '_ga') if w in out.replace('Cloudflare Web Analytics', '')]
    if left: print(lang, [x.get_text()[:160] for x in inner.find_all(["p","li","td","dd"]) if any(w in x.get_text().replace("Cloudflare Web Analytics","") for w in left)])
    return out
ko = edit(load(sys.argv[1]), 'ko'); en = edit(load(sys.argv[2]), 'en')
idx = open('index.html', encoding='utf-8').read()
head = idx[:idx.index('</head>')]
head = head.replace('<html lang="ko"', '<html lang="ko" data-title-key="ptitle"')
head = re.sub(r'<title>.*?</title>', '<title>개인정보 처리방침 | (주)뉴젠텍</title>', head)
head = re.sub(r'<meta name="description"[^>]*>', '<meta name="description" content="(주)뉴젠텍 개인정보 처리방침">', head)
head = re.sub(r'<meta property="og:[^>]*>\n', '', head); head = re.sub(r'<meta name="twitter:card"[^>]*>\n', '', head)
nav = idx[idx.index('<header class="nav'):idx.index('</header>') + 9]
nav = nav.replace('href="#top"', 'href="index.html"').replace('href="#process"', 'href="index.html#process"').replace('href="#tech"', 'href="index.html#tech"') \
         .replace('href="#industries"', 'href="index.html#industries"').replace('href="#capacity"', 'href="index.html#capacity"').replace('href="#quality"', 'href="index.html#quality"')
nav = nav.replace('href="#contact"', 'href="index.html#contact"')
nav = nav.replace('<a class="skip-link" href="index.html"', '<a class="skip-link" href="#top"')
foot = idx[idx.index('<footer class="foot"'):idx.index('</footer>') + 9]
foot = foot.replace('id="footer"', 'id="contact"')
for a in ('process', 'tech', 'industries', 'company', 'capacity', 'history', 'quality', 'top'):
    foot = foot.replace(f'href="#{a}"', f'href="index.html#{a}"' if a != 'top' else 'href="index.html"')
foot = foot.replace('href="privacy.html"', 'href="privacy.html" aria-current="page"')
page = head + '''</head>
<body class="pp-page">
''' + nav + '''
<main id="top">
  <section class="ngt ngt--grid ngt--glow pp" aria-labelledby="pp-k">
    <div class="ngt__in">
      <p class="ngt-kicker" id="pp-k"><span data-i18n="privacy">개인정보 처리방침</span></p>
      <p class="pp-note" data-i18n="ppnote" hidden></p>
      <article class="pp-doc" lang="ko" data-pp="ko">
''' + ko + '''
      </article>
      <article class="pp-doc" lang="en" data-pp="en" hidden>
''' + en + '''
      </article>
      <p class="pp-back"><a href="index.html" data-i18n="ppback">← 홈으로 돌아가기</a></p>
    </div>
  </section>
</main>
''' + foot + '''
<script src="assets/i18n.js"></script>
<script>(function(){var l=window.NGT_LANG||'ko',show=l==='ko'?'ko':'en';document.querySelectorAll('[data-pp]').forEach(function(a){a.hidden=a.dataset.pp!==show});var n=document.querySelector('.pp-note');if(n&&(l==='ja'||l==='zh'))n.hidden=false})();</script>
<script src="assets/ngt.js"></script>
<script type="module" src="assets/system.js"></script>
</body>
</html>
'''
open('privacy.html', 'w', encoding='utf-8').write(page)
print('privacy.html', len(page), 'ko', len(ko), 'en', len(en))
