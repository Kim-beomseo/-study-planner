document.addEventListener("DOMContentLoaded", () => {
    // -------------------------------------------------------------
    // 1. 탭 네비게이션 전환 (SPA 방식)
    // -------------------------------------------------------------
    const tabTriggers = document.querySelectorAll(".nav-tab-trigger");
    const tabViews = document.querySelectorAll(".tab-view");
    const navItems = document.querySelectorAll(".main-nav .nav-item");
    const heroTag = document.getElementById("heroTag");
    const heroTitle = document.getElementById("heroTitle");
    const heroDesc = document.getElementById("heroDesc");

    const heroContents = {
        "view-planner": {
            tag: "2026 합격의 공식, 에듀윌 AI 케어",
            title: "합격까지 가장 빠른 지름길,<br><span class='hero-highlight'>AI 1:1 맞춤 단기합격 플래너</span>",
            desc: "빅데이터 분석과 실시간 기출 트렌드(Serper API)를 결합하여<br>에빙하우스 망각곡선 기반 최적의 합격 로드맵을 즉시 설계해 드립니다."
        },
        "view-license": {
            tag: "10년 연속 합격자 수 1위",
            title: "대한민국 대표 국가공인 자격증,<br><span class='hero-highlight'>에듀윌 단기합격 커리큘럼</span>",
            desc: "공인중개사, 재경관리사, 정보처리기사 등 국가자격증 시험 정보와<br>과정별 1-Click AI 맞춤 플랜 생성을 즉시 이용하실 수 있습니다."
        },
        "view-gov": {
            tag: "2026 공무원 단기합격 전문관",
            title: "독한 교수진의 족집게 트레이닝,<br><span class='hero-highlight'>9급·7급·경찰·소방 공무원 패스</span>",
            desc: "최신 출제경향을 분석한 과목별 고득점 공략법과<br>순공 시간 확보를 위한 철저한 일일 루틴을 제시합니다."
        },
        "view-toeic": {
            tag: "스펙 완성 올인원",
            title: "취업 프리패스의 시작,<br><span class='hero-highlight'>토익 850+ & 공기업 취업 자격증</span>",
            desc: "단기간 토익 고득점 비법부터 한능검 1급, 컴활 1급 실기까지<br>취업 필수 스펙을 가장 빠르게 완성해 드립니다."
        },
        "view-books": {
            tag: "예스24 / 교보문고 베스트셀러 1위",
            title: "기출 적중률 99.8%의 신화,<br><span class='hero-highlight'>2026 에듀윌 합격 수험서 라인업</span>",
            desc: "10개년 기출 빅데이터를 단권화한 핵심 기본서와 문제집을 확인하고<br>교재 맞춤형 AI 공부 플랜을 연동해 보세요."
        },
        "view-predict": {
            tag: "에듀윌 빅데이터 연구소",
            title: "실시간 합격선 & 백분위 진단,<br><span class='hero-highlight'>2026 합격예측 풀서비스</span>",
            desc: "내 모의고사 또는 가채점 점수를 입력하면 합격 확률을 정밀 분석하고<br>취약점을 보완할 수 있는 AI 플랜을 도출합니다."
        },
        "view-reviews": {
            tag: "선배 30만 동문의 증명",
            title: "꿈을 현실로 만든 생생한 기록,<br><span class='hero-highlight'>에듀윌 실시간 합격수기</span>",
            desc: "비전공자, 직장인, 주부 수험생들의 실제 공부시간과<br>합격 비결을 확인하고 동기부여를 얻으세요."
        }
    };

    function switchTab(targetId) {
        // 모든 탭 숨기기
        tabViews.forEach(view => view.classList.remove("active"));
        // 대상 탭 표시
        const targetView = document.getElementById(targetId);
        if (targetView) {
            targetView.classList.add("active");
        }

        // 네비게이션 액티브 클래스 동기화
        navItems.forEach(item => {
            if (item.getAttribute("data-target") === targetId) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        });

        // 히어로 배너 내용 업데이트
        if (heroContents[targetId]) {
            heroTag.innerHTML = heroContents[targetId].tag;
            heroTitle.innerHTML = heroContents[targetId].title;
            heroDesc.innerHTML = heroContents[targetId].desc;
        }

        // 상단으로 부드럽게 스크롤
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    tabTriggers.forEach(trigger => {
        trigger.addEventListener("click", (e) => {
            e.preventDefault();
            const target = trigger.getAttribute("data-target");
            if (target) {
                switchTab(target);
            }
        });
    });

    // -------------------------------------------------------------
    // 2. 1-Click AI 플랜 연동 기능 (자격증, 공무원, 토익 카드 버튼)
    // -------------------------------------------------------------
    const applyPlanBtns = document.querySelectorAll(".btn-apply-plan");
    applyPlanBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const goal = btn.getAttribute("data-goal") || "";
            const date = btn.getAttribute("data-date") || "";
            const weak = btn.getAttribute("data-weak") || "";

            // 플래너 탭으로 전환
            switchTab("view-planner");

            // 폼 필드 자동 입력
            if (goal) document.getElementById("goal").value = goal;
            if (date) document.getElementById("exam_date").value = date;
            if (weak) document.getElementById("weak_point").value = weak;

            // 시각적 강조 피드백
            const formCard = document.querySelector(".form-card");
            if (formCard) {
                formCard.style.outline = "3px solid #ffd200";
                setTimeout(() => {
                    formCard.style.outline = "none";
                }, 1500);
            }

            alert(`📌 [${goal}] 시험 정보가 폼에 자동 입력되었습니다!\n나머지 정보를 확인하고 생성 버튼을 눌러주세요.`);
        });
    });

    // 교재 클릭 시 플랜 연동
    const bookOrderBtns = document.querySelectorAll(".btn-book-order");
    bookOrderBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const bookTitle = btn.getAttribute("data-title") || "";
            switchTab("view-planner");
            document.getElementById("goal").value = `${bookTitle} 마스터 플랜`;
            alert(`📖 [${bookTitle}] 교재 학습 플랜 생성을 위해 폼에 연동되었습니다.`);
        });
    });

    // -------------------------------------------------------------
    // 3. 합격예측 풀서비스 실시간 시뮬레이터
    // -------------------------------------------------------------
    const calcPredictBtn = document.getElementById("calcPredictBtn");
    const predScoreInput = document.getElementById("predScore");
    const predExamSelect = document.getElementById("predExam");
    const predictResultBox = document.getElementById("predictResultBox");
    const predBadge = document.getElementById("predBadge");
    const predTitle = document.getElementById("predTitle");
    const predComment = document.getElementById("predComment");
    const predMeterBar = document.getElementById("predMeterBar");
    const predToPlanBtn = document.getElementById("predToPlanBtn");

    if (calcPredictBtn) {
        calcPredictBtn.addEventListener("click", () => {
            const score = parseInt(predScoreInput.value);
            const exam = predExamSelect.value;

            if (isNaN(score) || score < 0 || score > 100) {
                alert("0점에서 100점 사이의 점수를 올바르게 입력해 주세요.");
                return;
            }

            // 합격선 기준 계산
            let cutOff = 60;
            if (exam === "재경관리사") cutOff = 70;
            else if (exam === "9급일반행정") cutOff = 88;

            let prob = 50;
            let status = "합격 유력";
            let badgeColor = "#10b981";
            let comment = "";

            if (score >= cutOff + 10) {
                prob = Math.min(98, 85 + (score - cutOff));
                status = "👑 확실 합격권";
                badgeColor = "#10b981";
                comment = `합격선(${cutOff}점)보다 여유 있게 상회하고 있습니다. 상위 5% 이내 고득점 합격이 매우 유력합니다!`;
            } else if (score >= cutOff) {
                prob = 75 + (score - cutOff) * 2;
                status = "🟢 합격 안정권";
                badgeColor = "#3b82f6";
                comment = `현재 합격선(${cutOff}점)을 넘어서고 있습니다. 오답률 높은 킬러문항만 점검하면 충분히 합격 가능합니다.`;
            } else if (score >= cutOff - 10) {
                prob = 45 + (score - (cutOff - 10)) * 2;
                status = "🟡 합격 경계선 (보완 필요)";
                badgeColor = "#f59e0b";
                comment = `합격선(${cutOff}점)까지 앞으로 약 ${cutOff - score}점 부족합니다. 취약 영역 집중 보완이 시급합니다!`;
            } else {
                prob = Math.max(15, 30 - (cutOff - score));
                status = "🔴 집중 트레이닝 필요";
                badgeColor = "#ef4444";
                comment = `기본기 재정립이 필요합니다. 에듀윌 핵심요약 인강과 스파르타 플랜으로 개념을 다시 다져보세요.`;
            }

            predBadge.innerText = status;
            predBadge.style.backgroundColor = badgeColor;
            predTitle.innerText = `합격 확률 약 ${prob}% 예상`;
            predComment.innerText = comment;
            predMeterBar.style.width = `${prob}%`;

            predictResultBox.style.display = "block";
        });
    }

    if (predToPlanBtn) {
        predToPlanBtn.addEventListener("click", () => {
            const exam = predExamSelect.value;
            const score = predScoreInput.value || "미정";
            switchTab("view-planner");
            document.getElementById("goal").value = `${exam} 단기합격 점수 향상`;
            document.getElementById("current_level").value = `현재 모의고사 약 ${score}점 수준, 합격선 돌파 목표`;
            alert(`🎯 [${exam}] 예측 결과가 AI 플래너 폼에 반영되었습니다. 세부 플랜을 생성해 보세요!`);
        });
    }

    // -------------------------------------------------------------
    // 4. 모달 팝업 제어 (로그인, 회원가입, 고객만족센터, 합격수기 상세)
    // -------------------------------------------------------------
    const loginModal = document.getElementById("loginModal");
    const registerModal = document.getElementById("registerModal");
    const csModal = document.getElementById("csModal");
    const reviewModal = document.getElementById("reviewModal");

    const openLoginBtn = document.getElementById("openLoginBtn");
    const openRegisterBtn = document.getElementById("openRegisterBtn");
    const openCsBtn = document.getElementById("openCsBtn");
    const footerCsBtn = document.getElementById("footerCsBtn");
    const switchToRegister = document.getElementById("switchToRegister");

    const modalCloses = document.querySelectorAll(".modal-close");

    function closeModal() {
        if (loginModal) loginModal.classList.remove("show");
        if (registerModal) registerModal.classList.remove("show");
        if (csModal) csModal.classList.remove("show");
        if (reviewModal) reviewModal.classList.remove("show");
    }

    if (openLoginBtn) openLoginBtn.addEventListener("click", () => loginModal.classList.add("show"));
    if (openRegisterBtn) openRegisterBtn.addEventListener("click", () => registerModal.classList.add("show"));
    if (openCsBtn) openCsBtn.addEventListener("click", () => csModal.classList.add("show"));
    if (footerCsBtn) footerCsBtn.addEventListener("click", () => csModal.classList.add("show"));

    if (switchToRegister) {
        switchToRegister.addEventListener("click", () => {
            loginModal.classList.remove("show");
            registerModal.classList.add("show");
        });
    }

    modalCloses.forEach(btn => btn.addEventListener("click", closeModal));

    // 배경 클릭 시 모달 닫기
    [loginModal, registerModal, csModal, reviewModal].forEach(modal => {
        if (modal) {
            modal.addEventListener("click", (e) => {
                if (e.target === modal) closeModal();
            });
        }
    });

    // -------------------------------------------------------------
    // 4-1. 합격수기 데이터베이스 & 상세 팝업 연동
    // -------------------------------------------------------------
    const reviewData = {
        "1": {
            badge: "재경관리사 합격",
            title: "비전공자 직장인, 2달 만에 재경관리사 84점으로 합격했습니다!",
            author: "김○진 님 (직장인 3년차)",
            period: "2개월 (단기완성)",
            time: "평일 3시간 / 주말 6시간",
            score: "재무 88점 / 세무 80점 / 원가 84점",
            goal: "재경관리사 (삼일회계법인)",
            examDate: "2026-11-21",
            weak: "원가관리회계 계산식, 부가가치세 세무조정",
            story: `
                <h4>📌 베이스 및 수험 계기</h4>
                <p>경영 비전공자이자 이직을 준비하던 일반 회사원이었습니다. 재무제표의 기본 원리도 몰랐기에 처음에는 차변, 대변부터 막막했습니다. 하지만 에듀윌 환급반과 AI 플래너를 통해 60일 단기 합격 커리큘럼을 시작했습니다.</p>
                
                <h4>⏱️ 하루 순공 시간 및 루틴</h4>
                <ul>
                    <li><strong>오전 출근길 (40분):</strong> 에듀윌 스마트폰 앱으로 전날 들은 핵심 요약 인강 1.4배속 복습</li>
                    <li><strong>퇴근 후 저녁 (2시간 30분):</strong> 기본서 챕터별 인강 수강 후 진도별 연습문제 30문항 풀이</li>
                    <li><strong>주말 (토/일 각 6시간):</strong> 평일 누적 오답 5회독 + 기출 5개년 타이머 실전 모의고사</li>
                </ul>

                <h4>💡 과목별 핵심 합격 노하우</h4>
                <p><strong>1. 재무회계:</strong> 말문제(이론 문항) 40%를 먼저 다 맞히는 전략으로 기준서 문장을 통째로 눈에 익혔습니다.<br>
                <strong>2. 세무회계:</strong> 법인세, 소득세, 부가세 서식의 계산 흐름도를 단권화 노트에 손으로 직접 그리며 암기했습니다.<br>
                <strong>3. 원가관리회계:</strong> 가장 취약했던 종합원가계산과 CVP 분석 공식 15개를 매일 아침 빈 종이에 백지 복습했습니다.</p>

                <h4>🎯 후배 수험생들에게 전하는 꿀팁</h4>
                <p>"혼자 공부할 때는 진도가 밀리기 십상이었는데, 망각곡선 복습 주기에 맞춰 1일, 3일, 7일 뒤에 자동으로 복습하라고 알려주는 루틴 덕분에 시험장에서도 기출 지문이 바로 눈에 보였습니다. 고민할 시간에 지금 바로 플랜을 세우세요!"</p>
            `
        },
        "2": {
            badge: "공인중개사 동차",
            title: "아이 키우며 주부 5개월 만에 1·2차 동차 합격 성공기",
            author: "이○영 님 (전업주부)",
            period: "5개월",
            time: "하루 4~5시간 (오전 자투리 활용)",
            score: "1차 평균 72.5점 / 2차 평균 68점",
            goal: "공인중개사 1·2차 동차합격",
            examDate: "2026-10-31",
            weak: "민법 판례 지문 암기, 부동산공법 체계도",
            story: `
                <h4>📌 주부의 현실적인 수험 전략</h4>
                <p>초등학생 아이 둘을 케어하며 동차를 준비하느라 책상에 길게 앉아있을 수 없었습니다. 대신 아이들이 등교한 오전 9시부터 오후 1시까지를 '스파르타 순공 시간'으로 정하고 스마트폰을 금고에 넣었습니다.</p>
                
                <h4>💡 1차 합격의 열쇠: 민법 판례 정복</h4>
                <p>민법은 조문보다 판례의 결론('유효/무효', '취소 가능 여부')을 키워드로 묶어서 외웠습니다. 에듀윌 심정욱 교수님의 그림 판례집을 식탁에 두고 설거지할 때도 인강 오디오를 귀에 꽂고 살았습니다.</p>

                <h4>💡 2차 합격의 열쇠: 중개사법 고득점 (85점)</h4>
                <p>공법이 과락만 면하자는 전략이었기 때문에, 중개사법에서 85점 이상을 받아 점수를 메워야 했습니다. 서식과 벌칙 조항을 손바닥 수첩에 적어 마트 갈 때나 신호 대기 중에도 회독했습니다.</p>
            `
        },
        "3": {
            badge: "9급 일반행정직",
            title: "노베이스 공시생, 1년 만에 필기 합격권 돌파 비결",
            author: "박○수 님 (수험기간 11개월)",
            period: "11개월",
            time: "하루 순공 9시간 (주 6일)",
            score: "국어 95 / 영어 90 / 한국사 100 / 행법 95 / 행학 85",
            goal: "9급 일반행정직 합격",
            examDate: "2026-06-13",
            weak: "행정법총론 각론 판례, 영어 어휘 및 빈칸추론",
            story: `
                <h4>📌 1년 1회독 무한 루틴</h4>
                <p>공무원 시험은 머리가 아니라 '회독의 싸움'입니다. 첫 3개월은 전 과목 기본이론 완강, 이후 5개월은 10개년 기출문제집 7회독, 마지막 3개월은 에듀윌 동형 모의고사로 시간 안배 훈련을 했습니다.</p>
                
                <h4>💡 슬럼프 극복 비결</h4>
                <p>공부가 안 될 때는 무리해서 책을 보지 않고, 합격생 수기와 멘토 플래너의 격려 조언을 읽으며 마음을 다잡았습니다. 일요일 오후는 반드시 온전한 휴식을 취해 월요일 번아웃을 예방했습니다.</p>
            `
        },
        "4": {
            badge: "정보처리기사",
            title: "비전공 문과생의 정처기 실기 76점 4주 단기합격 전략",
            author: "정○호 님 (취업준비생)",
            period: "실기 4주 집중",
            time: "하루 순공 6시간",
            score: "실기 76점 (합격)",
            goal: "정보처리기사 실기 단기완성",
            examDate: "2026-10-18",
            weak: "C언어 포인터 해석, SQL Join 쿼리 작성",
            story: `
                <h4>📌 코딩 경험 전무한 문과생의 접근법</h4>
                <p>프로그래밍 언어(C, Java, Python)가 총 20문제 중 8~10문제나 출제되므로 코딩을 포기하면 절대 합격할 수 없습니다. 직접 비주얼 스튜디오에 코드를 타이핑하며 변수 추적표(디버깅 테이블)를 손으로 그렸습니다.</p>
                <p>SQL은 SELECT, FROM, WHERE, GROUP BY, HAVING 순서를 외우고 서브쿼리와 JOIN 패턴 20개를 완벽 암기하여 만점을 받았습니다.</p>
            `
        },
        "5": {
            badge: "토익 890점",
            title: "토익 600점대 정체기 탈출! Part 7 시간 단축 비법",
            author: "최○라 님 (대학 4학년)",
            period: "5주 완성",
            time: "하루 4시간",
            score: "LC 465점 / RC 425점 (총 890점)",
            goal: "토익 850점 이상 달성",
            examDate: "2026-11-15",
            weak: "Part 7 삼중지문 시간부족, LC 영국/호주 발음",
            story: `
                <h4>📌 점수 정체기 뚫는 법</h4>
                <p>항상 마지막 15문제를 찍어서 600점대에 머물렀습니다. 문제 풀이 순서를 [Part 5 -> 6 -> Part 7 삼중지문(180~200번) -> 단일지문(147~175번)]으로 바꾼 것만으로 정답률이 폭발했습니다.</p>
                <p>LC는 1.2배속 쉐도잉을 매일 30분씩 하여 호주 발음 연음 현상을 극복했습니다.</p>
            `
        },
        "6": {
            badge: "전기기사",
            title: "수포자 문과 출신의 전기기사 필기+실기 6개월 동차 정복",
            author: "한○우 님 (이직 성공)",
            period: "6개월 동차",
            time: "하루 순공 7시간",
            score: "필기 68점 / 실기 64점 (동차합격)",
            goal: "전기기사 필기/실기 동차합격",
            examDate: "2026-10-25",
            weak: "전기자기학 미적분 공식, 수변전설비 시퀀스 도면",
            story: `
                <h4>📌 수포자의 전기기사 도전기</h4>
                <p>미분, 적분을 몰라도 전기기사는 합격할 수 있습니다. 기출에 반복 출제되는 공식 유도 과정은 과감히 버리고, 최종 공식의 대입 요령과 단위 환산에만 집중했습니다.</p>
                <p>실기 단답형 300제는 아침 기상 직후 1시간씩 녹음된 음성을 들으며 백지에 적는 연습을 무한 반복했습니다.</p>
            `
        }
    };

    let activeReviewId = "1";

    // 수기 필터링 버튼 클릭 이벤트
    const filterBtns = document.querySelectorAll(".filter-btn");
    const reviewCards = document.querySelectorAll("#reviewGrid .review-card");

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.getAttribute("data-filter");
            reviewCards.forEach(card => {
                const category = card.getAttribute("data-category");
                if (filter === "all" || category === filter) {
                    card.style.display = "flex";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // 수기 전문 읽기 버튼 이벤트
    const readReviewBtns = document.querySelectorAll(".btn-read-review");
    const modalReviewBadge = document.getElementById("modalReviewBadge");
    const modalReviewTitle = document.getElementById("modalReviewTitle");
    const modalReviewAuthor = document.getElementById("modalReviewAuthor");
    const modalReviewPeriod = document.getElementById("modalReviewPeriod");
    const modalReviewTime = document.getElementById("modalReviewTime");
    const modalReviewScore = document.getElementById("modalReviewScore");
    const modalReviewStory = document.getElementById("modalReviewStory");
    const copyReviewerRoutineBtn = document.getElementById("copyReviewerRoutineBtn");

    readReviewBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.getAttribute("data-id");
            activeReviewId = id;
            const data = reviewData[id];

            if (data) {
                modalReviewBadge.innerText = data.badge;
                modalReviewTitle.innerText = data.title;
                modalReviewAuthor.innerText = data.author;
                modalReviewPeriod.innerText = data.period;
                modalReviewTime.innerText = data.time;
                modalReviewScore.innerText = data.score;
                modalReviewStory.innerHTML = data.story;

                reviewModal.classList.add("show");
            }
        });
    });

    // "이 합격생의 공부 루틴으로 내 AI 플랜 세우기" 버튼 클릭
    if (copyReviewerRoutineBtn) {
        copyReviewerRoutineBtn.addEventListener("click", () => {
            const data = reviewData[activeReviewId];
            if (!data) return;

            closeModal();
            switchTab("view-planner");

            // 플래너 폼에 합격생 데이터 자동 주입
            document.getElementById("goal").value = data.goal;
            document.getElementById("exam_date").value = data.examDate;
            document.getElementById("current_level").value = `합격자 기준 벤치마킹 (${data.period} 합격 목표, 현재 기본 베이스 형성 중)`;
            document.getElementById("daily_time").value = data.time;
            document.getElementById("weak_point").value = data.weak;

            alert(`🏆 [${data.author}]의 합격 루틴이 AI 플래너 폼에 완벽히 복사되었습니다!\n아래 [에듀윌 AI 맞춤 합격 플랜 생성하기] 버튼을 눌러 나만의 로드맵을 완성하세요.`);
        });
    }

    // 로그인 폼 처리
    const loginForm = document.getElementById("loginForm");
    const userUtilArea = document.getElementById("userUtilArea");

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const id = document.getElementById("loginId").value.trim();
            closeModal();
            // 로그인 상태 UI 갱신
            userUtilArea.innerHTML = `
                <span class="user-logged-badge">⭐ ${id} 님 (2026 합격 D-Day 케어 중)</span>
                <a href="javascript:void(0);" id="logoutBtn" style="color: #cbd5e1;">로그아웃</a>
                <span class="bar">|</span>
                <a href="javascript:void(0);" id="reCsBtn">고객만족센터 1600-6700</a>
                <span class="bar">|</span>
                <a href="javascript:void(0);" class="nav-tab-trigger highlight" data-target="view-reviews">합격수기</a>
            `;
            alert(`🎉 환영합니다, ${id} 님! 에듀윌 AI 수험케어 서비스에 로그인되었습니다.`);

            // 동적으로 생성된 로그아웃 및 고객센터 버튼 이벤트 바인딩
            document.getElementById("logoutBtn").addEventListener("click", () => {
                location.reload();
            });
            document.getElementById("reCsBtn").addEventListener("click", () => {
                csModal.classList.add("show");
            });
        });
    }

    // 회원가입 폼 처리
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("regName").value.trim();
            const cat = document.getElementById("regCategory").value;
            closeModal();
            alert(`👏 ${name} 님의 에듀윌 회원가입이 완료되었습니다!\n관심 분야 [${cat}] 30% 합격 지원 쿠폰이 발급되었습니다. 로그인해 주세요.`);
            loginModal.classList.add("show");
        });
    }

    // 1:1 상담 예약 폼 처리
    const csForm = document.getElementById("csForm");
    if (csForm) {
        csForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const phone = document.getElementById("csPhone").value;
            const sub = document.getElementById("csSubject").value;
            closeModal();
            alert(`📞 상담 예약이 정상 접수되었습니다!\n연락처: ${phone}\n상담 내용: ${sub}\n전문 수험 상담사가 10분 이내로 연락드리겠습니다.`);
        });
    }

    // -------------------------------------------------------------
    // 5. AI 학습 플래너 핵심 기능 (폼 제출, Gemini API, 복사, 다운로드)
    // -------------------------------------------------------------
    const plannerForm = document.getElementById("plannerForm");
    const submitBtn = document.getElementById("submitBtn");
    const loading = document.getElementById("loading");
    const placeholder = document.getElementById("placeholder");
    const resultContent = document.getElementById("resultContent");
    const actionButtons = document.getElementById("actionButtons");
    const copyBtn = document.getElementById("copyBtn");
    const downloadBtn = document.getElementById("downloadBtn");

    let currentMarkdownText = "";
    let currentGoal = "학습플랜";

    if (plannerForm) {
        plannerForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            // 6가지 사용자 입력값 및 선택값 수집
            const goal = document.getElementById("goal").value.trim();
            const examDate = document.getElementById("exam_date").value;
            const currentLevel = document.getElementById("current_level").value.trim();
            const dailyTime = document.getElementById("daily_time").value.trim();
            const weakPoint = document.getElementById("weak_point").value.trim();
            const studyStyle = document.getElementById("study_style").value;
            const persona = document.querySelector('input[name="persona"]:checked').value;

            if (!goal || !examDate || !currentLevel || !dailyTime || !weakPoint || !studyStyle) {
                alert("모든 입력 항목을 빠짐없이 채워주세요.");
                return;
            }

            currentGoal = goal;

            // UI 상태: 로딩 시작
            placeholder.style.display = "none";
            resultContent.style.display = "none";
            actionButtons.style.display = "none";
            loading.style.display = "block";
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="btn-icon">⏳</span><span class="btn-text">에듀윌 AI가 플랜 수립 및 실시간 검색 중...</span>';

            try {
                const response = await fetch("/generate", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        goal: goal,
                        exam_date: examDate,
                        current_level: currentLevel,
                        daily_time: dailyTime,
                        weak_point: weakPoint,
                        study_style: studyStyle,
                        persona: persona
                    })
                });

                const data = await response.json();

                if (!response.ok || !data.success) {
                    throw new Error(data.error || "학습 플랜을 생성하는 중 문제가 발생했습니다.");
                }

                // 마크다운 원본 보관 및 HTML 렌더링
                currentMarkdownText = data.content;
                resultContent.innerHTML = marked.parse(currentMarkdownText);

                // UI 상태: 결과 표시
                loading.style.display = "none";
                resultContent.style.display = "block";
                actionButtons.style.display = "flex";

            } catch (error) {
                console.error("Error:", error);
                alert("오류 발생: " + error.message);
                loading.style.display = "none";
                placeholder.style.display = "block";
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<span class="btn-icon">⚡</span><span class="btn-text">에듀윌 AI 맞춤 합격 플랜 생성하기</span>';
            }
        });
    }

    // 마크다운 내용 클립보드 복사 기능
    if (copyBtn) {
        copyBtn.addEventListener("click", async () => {
            if (!currentMarkdownText) return;

            try {
                await navigator.clipboard.writeText(currentMarkdownText);
                const originalText = copyBtn.innerText;
                copyBtn.innerText = "✅ 복사 완료!";
                setTimeout(() => {
                    copyBtn.innerText = originalText;
                }, 2000);
            } catch (err) {
                console.error("클립보드 복사 실패:", err);
                alert("클립보드 복사에 실패했습니다.");
            }
        });
    }

    // 마크다운 (.md) 파일 다운로드 기능
    if (downloadBtn) {
        downloadBtn.addEventListener("click", () => {
            if (!currentMarkdownText) return;

            // 파일명 생성 (특수문자 정제)
            const safeGoalName = currentGoal.replace(/[^a-zA-Z0-9가-힣]/g, "_");
            const fileName = `에듀윌_${safeGoalName}_합격플랜.md`;

            const blob = new Blob([currentMarkdownText], { type: "text/markdown;charset=utf-8" });
            const downloadUrl = URL.createObjectURL(blob);
            const a = document.createElement("a");

            a.href = downloadUrl;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(downloadUrl);
        });
    }
});
