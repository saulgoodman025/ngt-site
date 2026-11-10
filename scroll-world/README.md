# NGT scroll-world 영상 체인 — 렌더 대기 상태

결정 사항은 `work/BRIEF.md`. 오늘 완료된 것: 5개 장면 스틸(`assets/img/ch1..5.jpg`, 원본 `work/still_*.png`),
스크럽 엔진(`scrub-engine.js`), 엔진 설정(`config.js`). **영상 레그 5개는 아직 렌더되지 않았습니다.**

## 왜 아직인가
Higgsfield 계정이 free 플랜이라 영상 모델(seedance_2_0)이 "Requires basic plan or higher"로 거부됩니다
(2026-11-10 확인, 과금 없음). 이미지도 z_image 한 모델만 허용됩니다.

## 플랜 업그레이드 후 실행 순서 (아키텍처 A, 연속 전진 테이크)
1. leg0: start_image = 장면 1 스틸(job 0b36cfb6-2b6e-4554-8bbe-7aad10fed172), end_image 없음.
2. leg i (1..4): start_image = **이전 레그의 실제 마지막 프레임**(`ffmpeg -sseof -0.15 -i leg{i-1}.mp4 -frames:v 1 -q:v 2 last.png`,
   업로드 후 media_id 사용). 프롬프트는 BRIEF.md의 LEG PLAN + "전진 settle" 핸드오프 문구 유지.
3. 각 레그의 마지막 프레임을 눈으로 확인한 뒤 다음 레그 생성(역방향·미완 오비트면 재롤).
4. 인코딩: `ffmpeg -i src.mp4 -an -vf "unsharp=5:5:0.8:5:5:0.0" -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p -g 8 -keyint_min 8 -sc_threshold 0 -movflags +faststart assets/vid/legN.mp4`
5. 페이지에 `scrub-engine.js` + `config.js`를 로드하고 `mountScrollWorld(container, window.NGT_SCROLL_WORLD)`.

## 예상 비용 (2026-11-10 견적)
- 720p fast 8초: 레그당 20크레딧 → 5레그 100 + 재롤 여유 ≈ 115크레딧 (Basic 플랜 이상)
- 1080p std 8초: 레그당 96크레딧 → ≈ 550크레딧 (Plus 플랜 이상)
- 네트워크: 업로드 호스트 `upload.higgsfield.ai`를 환경 허용 목록에 추가해야 프레임 업로드 가능.
