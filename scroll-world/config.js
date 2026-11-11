/* NGT scroll-world film: the config that mounts the scrub engine once the camera chain is rendered.
   Architecture A (one continuous forward take): five legs, no connectors, crossfade 0.08.
   Today the page shows these five scenes as the photo-chapters section (#process in index.html);
   to switch, render the legs (README.md), encode them into assets/vid/, and mount this config
   on a full-bleed container that replaces that section's photographs. */
window.NGT_SCROLL_WORLD = {
  diveScroll: 1.6,   // 5 x 1.6 = 8 screens of scroll + the pinned screen = 9 whole screens
  opening: { scroll: 1 },   // one screen of scroll for the title card before leg 0: 1 + 8 + 1 = 10 screens
  crossfade: 0.08,
  arriveAt: 0.42,   // the camera has reached the next scene by this share of a leg
  leaveAt: 0.36,    // and leaves the current scene after this share
  nav: false,
  atmosphere: false,
  brand: null,
  hint: '스크롤해서 공정을 따라가 보세요',
  connectors: [],
  sections: [
    { id: 'review', label: '도면·공차 검토', still: 'assets/img/film0.jpg', clip: 'assets/vid/leg0.mp4', clipMobile: 'assets/vid/leg0-m.mp4', accent: '#6fb8cc',
      eyebrow: '도면·공차 검토', title: '가공은 도면 검토에서 시작합니다',
      body: '형상과 기준면, 관리 포인트를 먼저 확인하고 제조성을 검토합니다.', tags: ['DFM', '공차 검토'] },
    { id: 'cam', label: '5축 공정 설계', still: 'assets/img/film1.jpg', clip: 'assets/vid/leg1.mp4', clipMobile: 'assets/vid/leg1-m.mp4', accent: '#6fb8cc',
      eyebrow: '5축 공정 설계', title: '공구 경로를 직접 설계합니다',
      body: '고정, 공구 접근, 가공 순서를 정하고 자체 CAM 로직으로 포스트 프로세싱을 제어합니다.', tags: ['CAD/CAM', '자체 CAM 로직'] },
    { id: 'machining', label: '동시 5축 가공', still: 'assets/img/film2.jpg', clip: 'assets/vid/leg2.mp4', clipMobile: 'assets/vid/leg2-m.mp4', accent: '#6fb8cc',
      eyebrow: '동시 5축 가공', title: '복합 형상을 한 번에 깎습니다',
      body: '독일·일본산 동시 5축 머시닝센터로 알루미늄, SUS, 티타늄을 가공합니다.', tags: ['알루미늄', 'SUS', '티타늄'] },
    { id: 'metrology', label: 'CMM·3D 정밀 검사', still: 'assets/img/film3.jpg', clip: 'assets/vid/leg3.mp4', clipMobile: 'assets/vid/leg3-m.mp4', accent: '#6fb8cc',
      eyebrow: 'CMM·3D 정밀 검사', title: '미크론 단위로 확인합니다',
      body: '3차원 좌표측정기와 3D 스캐너, 조도 측정기로 공차를 검사합니다.', tags: ['CMM', '3D 스캐너', '조도 측정'] },
    { id: 'parts', label: '마킹과 성적서', still: 'assets/img/film4.jpg', clip: 'assets/vid/leg4.mp4', clipMobile: 'assets/vid/leg4-m.mp4', accent: '#6fb8cc',
      eyebrow: '마킹과 성적서', title: '검사 이력과 함께 출하합니다',
      body: '레이저 마킹으로 부품을 식별하고 검사 성적서를 발행합니다.',
      cta: { primary: { label: '견적 문의하기', href: '#inquiry' } } },
  ],
};
