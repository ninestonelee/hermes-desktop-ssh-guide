# Windows Hermes Desktop + SSH 핸즈온 · 텐센트 Lighthouse 서버 연결

**바로 보기:** https://ninestonelee.github.io/hermes-desktop-ssh-guide/

혼자 쓰고 간단히 관리하는 구성: Windows PC에 Hermes Desktop을 설치하고, 텐센트클라우드 Lighthouse VPS에서 24시간 도는 Hermes Agent에 **SSH 연결**로 붙는 단계별 웹 가이드입니다. 대시보드 포트(9119)를 열거나 세션 토큰을 복사할 필요가 없습니다.

- 기준: Hermes Agent v0.23.4 (2026-11 안정판), Hermes Desktop 공식 문서, Tencent Cloud Lighthouse 공식 문서 (2026-11-25 확인)
- **앱 화면**: Windows 앱과 같은 화면 코드인 Hermes Webapp(v0.23.4)에서 직접 캡처했습니다.
- **연결 성공 화면**: Lighthouse Hermes 템플릿처럼 구성한 Ubuntu 24.04 테스트 서버(사용자 `agentuser`)에 실제 SSH로 연결해 캡처했습니다.
- 개인 경로는 가렸고, `203.0.113.10`은 설명용 예시 IP(문서용 대역)입니다.

비공식 학습 자료이며 Nous Research, Tencent Cloud와 관련이 없습니다.
