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
            tag: "2026 합격의 공식, 에듀위 AI 케어",
            title: "합격까지 가장 빠른 지름길,<br><span class='hero-highlight'>AI 1:1 맞춤 단기합격 플래너</span>",
            desc: "빅데이터 분석과 실시간 기출 트렌드(Serper API)를 결합하여<br>에빙하우스 망각곡선 기반 최적의 합격 로드맵을 즉시 설계해 드립니다."
        },
        "view-license": {
            tag: "10년 연속 합격자 수 1위",
            title: "대한민국 대표 국가공인 자격증,<br><span class='hero-highlight'>에듀위 단기합격 커리큘럼</span>",
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
            title: "기출 적중률 99.8%의 신화,<br><span class='hero-highlight'>2026 에듀위 합격 수험서 라인업</span>",
            desc: "10개년 기출 빅데이터를 단권화한 핵심 기본서와 문제집을 확인하고<br>교재 맞춤형 AI 공부 플랜을 연동해 보세요."
        },
        "view-predict": {
            tag: "에듀위 빅데이터 연구소",
            title: "실시간 합격선 & 백분위 진단,<br><span class='hero-highlight'>2026 합격예측 풀서비스</span>",
            desc: "내 모의고사 또는 가채점 점수를 입력하면 합격 확률을 정밀 분석하고<br>취약점을 보완할 수 있는 AI 플랜을 도출합니다."
        },
        "view-reviews": {
            tag: "선배 30만 동문의 증명",
            title: "꿈을 현실로 만든 생생한 기록,<br><span class='hero-highlight'>에듀위 실시간 합격수기</span>",
            desc: "비전공자, 직장인, 주부 수험생들의 실제 공부시간과<br>합격 비결을 확인하고 동기부여를 얻으세요."
        },
        "view-mypage": {
            tag: "2026 합격 케어 센터",
            title: "나만의 합격 학습 대시보드,<br><span class='hero-highlight'>마이학습룸 (My Study Room)</span>",
            desc: "내가 생성한 AI 맞춤 플랜 히스토리, 가채점 진단 결과, 찜한 수험서와<br>일일 순공 달성률을 한눈에 체계적으로 관리하세요."
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
    // 2. 서브 카테고리 필터링 (자격증, 공무원, 토익, 교재)
    // -------------------------------------------------------------
    const subFilterButtons = document.querySelectorAll(".sub-filter-btn");
    subFilterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const parentSection = btn.closest(".tab-view");
            if (!parentSection) return;

            // 같은 섹션 내의 서브 필터 버튼 활성화 상태 갱신
            const siblingBtns = parentSection.querySelectorAll(".sub-filter-btn");
            siblingBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-subfilter");
            const filterableCards = parentSection.querySelectorAll("[data-sub]");

            filterableCards.forEach(card => {
                const cardSub = card.getAttribute("data-sub");
                if (filterValue === "all" || cardSub === filterValue) {
                    card.style.display = "";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // -------------------------------------------------------------
    // 2-1. 1-Click AI 플랜 연동 기능 (자격증, 공무원, 토익 카드 버튼)
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
    const bookPlanBtns = document.querySelectorAll(".btn-book-plan");
    bookPlanBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const bookTitle = btn.getAttribute("data-title") || "";
            switchTab("view-planner");
            document.getElementById("goal").value = `${bookTitle} 마스터 플랜`;
            alert(`📖 [${bookTitle}] 교재 학습 플랜 생성을 위해 폼에 연동되었습니다.`);
        });
    });

    // -------------------------------------------------------------
    // 3. 에듀위 합격예측 풀서비스 실시간 다과목 정밀 진단 시스템
    // -------------------------------------------------------------
    const examConfigs = {
        "gov_tax": {
            name: "9급 세무직 공무원 (국세청)",
            cutoff: 82.0,
            standard: "과목당 40점 이상, 전 과목 평균 82점 이상 합격선",
            subjects: [
                { name: "국어", avg: 76.5, defaultScore: 85 },
                { name: "영어", avg: 72.0, defaultScore: 80 },
                { name: "한국사", avg: 85.5, defaultScore: 90 },
                { name: "세법개론", avg: 68.0, defaultScore: 75 },
                { name: "회계학", avg: 64.5, defaultScore: 85 }
            ],
            advice: {
                high: "세법과 회계학 전공과목에서 80점 이상을 획득하여 국세청 세무직 합격이 매우 안정적입니다. 면접 스터디 준비를 병행하세요!",
                border: "회계학 또는 세법개론의 시간 배분 부족으로 합격선 근처에 머물고 있습니다. 계산식 문제 풀이 속도를 20초 단축하는 훈련이 필요합니다.",
                low: "전공과목(세법/회계학) 점수가 부족합니다. 1타 교수진의 기출 OX 단권화 특강으로 필수 조문과 분개 패턴을 집중 보강하세요."
            }
        },
        "gov_admin": {
            name: "9급 일반행정직 공무원",
            cutoff: 89.0,
            standard: "과목당 40점 이상, 전 과목 평균 89점 고득점 컷",
            subjects: [
                { name: "국어", avg: 80.0, defaultScore: 90 },
                { name: "영어", avg: 75.5, defaultScore: 85 },
                { name: "한국사", avg: 88.0, defaultScore: 95 },
                { name: "행정법총론", avg: 78.5, defaultScore: 90 },
                { name: "행정학개론", avg: 74.0, defaultScore: 85 }
            ],
            advice: {
                high: "일반행정직 고득점 합격권입니다. 행정법 최신 판례 3개년만 최종 확인하면 필기 수석 합격도 기대됩니다.",
                border: "합격선(89점)과 근소한 차이입니다. 행정법 판례 키워드 매칭과 영어 독해 시간 단축에 집중하세요.",
                low: "행정학 조직론/재무행정론 파트와 국어 문법 영역 기본서를 다시 1회독 정독해야 합니다."
            }
        },
        "real_estate_1": {
            name: "공인중개사 1차 시험",
            cutoff: 60.0,
            standard: "과목당 40점 이상 과락 없이, 2과목 평균 60점 이상 합격",
            subjects: [
                { name: "부동산학개론", avg: 62.5, defaultScore: 70 },
                { name: "민법 및 민사특별법", avg: 58.0, defaultScore: 65 }
            ],
            advice: {
                high: "1차 2과목 평균이 65점을 넘어 무난한 합격 안정권입니다. 이제 2차 실무 과목 암기에 집중하세요!",
                border: "민법 과락(40점 미만)은 피했으나 평균 60점 경계선입니다. 개론의 계산문제 3문항만 더 맞히면 확실합니다.",
                low: "민법 판례 조문 이해가 부족하여 과락 위험이 있습니다. 심정욱 교수님의 핵심 그림판례 특강 수강을 강력 권장합니다."
            }
        },
        "cta_1": {
            name: "세무사 (CTA) 1차 시험",
            cutoff: 60.0,
            standard: "과목당 40점 이상 과락 없이, 4과목 평균 60점 이상",
            subjects: [
                { name: "재정학", avg: 62.0, defaultScore: 75 },
                { name: "세법학개론", avg: 56.5, defaultScore: 65 },
                { name: "회계학개론", avg: 52.0, defaultScore: 60 },
                { name: "행정소송법(선택법)", avg: 70.5, defaultScore: 80 }
            ],
            advice: {
                high: "회계학 과락을 방어하고 선택법과 재정학에서 고득점을 받아 세무사 1차 합격이 확실시됩니다. 2차 주관식을 즉시 시작하세요!",
                border: "회계학개론 점수가 50점대 초반으로 불안합니다. 재정학에서 75점 이상을 확보하는 전략적 시간 배분이 필요합니다.",
                low: "세법학과 회계학 기본서 예제 회독 수가 부족합니다. 에듀위 세무사 1차 파이널 모의고사로 실전 감각을 끌어올리세요."
            }
        },
        "financial_mgr": {
            name: "재경관리사 (삼일회계법인)",
            cutoff: 70.0,
            standard: "과목별 과락 70점 기준 (3과목 모두 각각 70점 이상 합격)",
            subjects: [
                { name: "재무회계", avg: 68.0, defaultScore: 75 },
                { name: "세무회계", avg: 65.5, defaultScore: 72 },
                { name: "원가관리회계", avg: 62.0, defaultScore: 78 }
            ],
            advice: {
                high: "3과목 모두 70점을 넘어 단기 합격이 확실합니다. 삼일회계법인 공인 자격증 취득을 축하드립니다!",
                border: "1~2개 과목이 60점대에 머물러 과락(70점 미만) 위험이 있습니다. 세무회계 서식과 원가 CVP 공식을 재점검하세요.",
                low: "원가관리회계 종합원가계산과 재무회계 기준서 말문제를 10개년 기출로 무한 반복하셔야 합니다."
            }
        },
        "elec_engineer": {
            name: "전기기사 필기",
            cutoff: 60.0,
            standard: "과목당 40점 이상, 5과목 평균 60점 이상 합격",
            subjects: [
                { name: "전기자기학", avg: 54.0, defaultScore: 60 },
                { name: "전력공학", avg: 66.5, defaultScore: 75 },
                { name: "전기기기", avg: 58.0, defaultScore: 65 },
                { name: "회로이론 및 제어공학", avg: 60.5, defaultScore: 70 },
                { name: "전기설비기술기준", avg: 72.0, defaultScore: 85 }
            ],
            advice: {
                high: "전력공학과 법규에서 75점 이상을 확보하여 전기기사 필기 합격이 확정적입니다. 즉시 2차 실기 시퀀스 도면을 준비하세요!",
                border: "전기자기학 40점 과락 경계선입니다. 유도 공식은 과감히 생략하고 최종 결과 공식 암기 위주로 선회하세요.",
                low: "회로이론 교류 전력 계산과 자기학 기초가 흔들리고 있습니다. 에듀위 기초수학/CBT 기출 5개년 반복이 필수입니다."
            }
        }
    };

    const predExamType = document.getElementById("predExamType");
    const subjectInputsContainer = document.getElementById("subjectInputsContainer");
    const runFullPredictBtn = document.getElementById("runFullPredictBtn");

    const reportTargetBadge = document.getElementById("reportTargetBadge");
    const myAvgScore = document.getElementById("myAvgScore");
    const expectedCutoff = document.getElementById("expectedCutoff");
    const scoreDiff = document.getElementById("scoreDiff");
    const finalVerdict = document.getElementById("finalVerdict");
    const predictTableBody = document.getElementById("predictTableBody");
    const rankBox = document.getElementById("rankBox");
    const rankText = document.getElementById("rankText");
    const reportMeterBar = document.getElementById("reportMeterBar");
    const adviceBox = document.getElementById("adviceBox");
    const profCommentText = document.getElementById("profCommentText");
    const applyDeficitPlanBtn = document.getElementById("applyDeficitPlanBtn");

    let currentLowestSubject = "";
    let currentExamName = "";

    // 과목 입력창 동적 생성 함수
    function renderSubjectInputs(examKey) {
        const config = examConfigs[examKey];
        if (!config || !subjectInputsContainer) return;

        currentExamName = config.name;
        subjectInputsContainer.innerHTML = "";

        config.subjects.forEach((subj, idx) => {
            const div = document.createElement("div");
            div.className = "subj-input-item";
            div.innerHTML = `
                <label for="subj_${idx}">${subj.name} (평균 ${subj.avg}점)</label>
                <input type="number" id="subj_${idx}" min="0" max="100" value="${subj.defaultScore}" placeholder="점수">
            `;
            subjectInputsContainer.appendChild(div);
        });
    }

    if (predExamType) {
        predExamType.addEventListener("change", (e) => {
            renderSubjectInputs(e.target.value);
        });
        // 초기 로드 시 9급 세무직 과목 렌더링
        renderSubjectInputs(predExamType.value);
    }

    if (runFullPredictBtn) {
        runFullPredictBtn.addEventListener("click", () => {
            const examKey = predExamType.value;
            const config = examConfigs[examKey];
            if (!config) return;

            let total = 0;
            let count = config.subjects.length;
            let hasFail = false; // 40점 미만 과락
            let scores = [];
            let lowestScore = 999;
            let lowestSubjName = "";

            // 재경관리사는 70점 미만이면 과락
            const failStandard = (examKey === "financial_mgr") ? 70 : 40;

            for (let i = 0; i < count; i++) {
                const input = document.getElementById(`subj_${i}`);
                const val = parseInt(input.value);

                if (isNaN(val) || val < 0 || val > 100) {
                    alert(`[${config.subjects[i].name}] 점수를 0~100 사이로 입력해 주세요.`);
                    return;
                }

                total += val;
                const isSubjectFail = val < failStandard;
                if (isSubjectFail) hasFail = true;

                if (val < lowestScore) {
                    lowestScore = val;
                    lowestSubjName = config.subjects[i].name;
                }

                scores.push({
                    name: config.subjects[i].name,
                    score: val,
                    avg: config.subjects[i].avg,
                    isFail: isSubjectFail
                });
            }

            currentLowestSubject = lowestSubjName;
            const avg = Math.round((total / count) * 10) / 10;
            const cutoff = config.cutoff;
            const diff = Math.round((avg - cutoff) * 10) / 10;

            // 상단 요약 업데이트
            reportTargetBadge.innerText = config.name;
            myAvgScore.innerText = `${avg} 점`;
            expectedCutoff.innerText = `${cutoff} 점`;

            if (diff >= 0) {
                scoreDiff.innerText = `+${diff} 점 (상회)`;
                scoreDiff.style.color = "#10b981";
            } else {
                scoreDiff.innerText = `${diff} 점 (미달)`;
                scoreDiff.style.color = "#ef4444";
            }

            // 합격 판정 로직
            let verdictText = "";
            let verdictClass = "";
            let percentile = 50;
            let adviceContent = "";

            if (hasFail) {
                verdictText = "과락 불합격 위험";
                verdictClass = "verdict-pass-fail";
                percentile = 25;
                adviceContent = `⚠️ [${lowestSubjName}] 과목이 과락 기준(${failStandard}점) 미만으로 나타났습니다. 평균 점수와 무관하게 한 과목이라도 과락이면 불합격 처리되므로, 해당 과목의 기본 개념을 즉시 보강해야 합니다.`;
            } else if (diff >= 5) {
                verdictText = "👑 확실 합격권";
                verdictClass = "verdict-pass-sure";
                percentile = 92;
                adviceContent = config.advice.high;
            } else if (diff >= 0) {
                verdictText = "🟢 합격 안정권";
                verdictClass = "verdict-pass-safe";
                percentile = 78;
                adviceContent = config.advice.border;
            } else if (diff >= -5) {
                verdictText = "🟡 합격 경계선 (보완필요)";
                verdictClass = "verdict-pass-border";
                percentile = 55;
                adviceContent = config.advice.border;
            } else {
                verdictText = "🔴 집중 트레이닝 요망";
                verdictClass = "verdict-pass-fail";
                percentile = 35;
                adviceContent = config.advice.low;
            }

            finalVerdict.innerText = verdictText;
            finalVerdict.className = `verdict-tag ${verdictClass}`;

            // 마이학습룸을 위한 최근 가채점 진단 결과 localStorage 저장
            savePredictReport({
                examName: currentExamName,
                totalScore: total,
                avgScore: avg.toFixed(1),
                diffCutoff: (avg - config.cutoff) >= 0 ? `+${(avg - config.cutoff).toFixed(1)}` : `${(avg - config.cutoff).toFixed(1)}`,
                verdict: verdictText,
                verdictClass: verdictClass,
                weakSubject: currentLowestSubject,
                weakScore: lowestScore,
                cutoff: config.cutoff,
                date: new Date().toLocaleDateString("ko-KR")
            });

            // 테이블 렌더링
            predictTableBody.innerHTML = "";
            scores.forEach(s => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td style="font-weight: 700;">${s.name}</td>
                    <td style="font-size: 15px; font-weight: 800; color: ${s.isFail ? '#dc2626' : '#111111'};">${s.score}점</td>
                    <td style="color: #64748b;">${s.avg}점</td>
                    <td>
                        <span class="${s.isFail ? 'tag-fail' : 'tag-pass'}">
                            ${s.isFail ? '과락 (' + s.score + '점)' : 'PASS'}
                        </span>
                    </td>
                `;
                predictTableBody.appendChild(tr);
            });

            // 누적 석차 및 백분위 미터바
            const totalApplicants = 34812;
            const rankEstimate = Math.max(1, Math.round(totalApplicants * (1 - (percentile / 100))));
            rankText.innerHTML = `상위 ${(100 - percentile).toFixed(1)}% (약 ${rankEstimate.toLocaleString()}등 / ${totalApplicants.toLocaleString()}명 중)`;
            reportMeterBar.style.width = `${percentile}%`;
            rankBox.style.display = "block";

            // 교수진 총평 및 AI 플랜 연동 버튼
            profCommentText.innerHTML = adviceContent;
            adviceBox.style.display = "block";

            // 결과창으로 스크롤 이동
            document.getElementById("fullPredictReport").scrollIntoView({ behavior: "smooth" });
        });
    }

    if (applyDeficitPlanBtn) {
        applyDeficitPlanBtn.addEventListener("click", () => {
            switchTab("view-planner");
            document.getElementById("goal").value = `${currentExamName} 합격선 돌파`;
            document.getElementById("weak_point").value = `${currentLowestSubject} 점수 향상 및 킬러문항 보완`;
            document.getElementById("current_level").value = "에듀위 실시간 합격예측 가채점 완료 (취약 단원 보완 필요)";
            alert(`🎯 [${currentExamName}]의 취약 과목인 [${currentLowestSubject}] 정보가 AI 플래너 폼에 자동으로 채워졌습니다!\n세부 플랜을 생성해 보세요.`);
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
                <p>경영 비전공자이자 이직을 준비하던 일반 회사원이었습니다. 재무제표의 기본 원리도 몰랐기에 처음에는 차변, 대변부터 막막했습니다. 하지만 에듀위 환급반과 AI 플래너를 통해 60일 단기 합격 커리큘럼을 시작했습니다.</p>
                
                <h4>⏱️ 하루 순공 시간 및 루틴</h4>
                <ul>
                    <li><strong>오전 출근길 (40분):</strong> 에듀위 스마트폰 앱으로 전날 들은 핵심 요약 인강 1.4배속 복습</li>
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
                <p>민법은 조문보다 판례의 결론('유효/무효', '취소 가능 여부')을 키워드로 묶어서 외웠습니다. 에듀위 심정욱 교수님의 그림 판례집을 식탁에 두고 설거지할 때도 인강 오디오를 귀에 꽂고 살았습니다.</p>

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
                <p>공무원 시험은 머리가 아니라 '회독의 싸움'입니다. 첫 3개월은 전 과목 기본이론 완강, 이후 5개월은 10개년 기출문제집 7회독, 마지막 3개월은 에듀위 동형 모의고사로 시간 안배 훈련을 했습니다.</p>
                
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

            alert(`🏆 [${data.author}]의 합격 루틴이 AI 플래너 폼에 완벽히 복사되었습니다!\n아래 [에듀위 AI 맞춤 합격 플랜 생성하기] 버튼을 눌러 나만의 로드맵을 완성하세요.`);
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
            alert(`🎉 환영합니다, ${id} 님! 에듀위 AI 수험케어 서비스에 로그인되었습니다.`);

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
            alert(`👏 ${name} 님의 에듀위 회원가입이 완료되었습니다!\n관심 분야 [${cat}] 30% 합격 지원 쿠폰이 발급되었습니다. 로그인해 주세요.`);
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
            submitBtn.innerHTML = '<span class="btn-icon">⏳</span><span class="btn-text">에듀위 AI가 플랜 수립 및 실시간 검색 중...</span>';

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

                // 마이학습룸 플랜 보관함에 자동 저장
                savePlanToHistory({
                    id: "plan_" + Date.now(),
                    goal: goal,
                    exam_date: examDate,
                    current_level: currentLevel,
                    daily_time: dailyTime,
                    weak_point: weakPoint,
                    study_style: studyStyle,
                    persona: persona === "sparta" ? "스파르타 모드" : "페이스메이커",
                    created_at: new Date().toLocaleDateString("ko-KR"),
                    markdown: currentMarkdownText
                });

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
                submitBtn.innerHTML = '<span class="btn-icon">⚡</span><span class="btn-text">에듀위 AI 맞춤 합격 플랜 생성하기</span>';
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
            const fileName = `에듀위_${safeGoalName}_합격플랜.md`;

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

    // =========================================================================
    // 7. 실시간 소셜 프루프 티커 (Social Proof Live Ticker) 롤링
    // =========================================================================
    const tickerMessages = [
        '🔥 지금 <strong class="text-gold">3,428명</strong>의 수험생이 에듀위 AI 플랜으로 열공 중입니다.',
        '⚡ 방금 전 서울 노원구 합격생이 <strong>[세무사 1차 90일 파이널 완성 플랜]</strong>을 생성했습니다.',
        '🏆 [공인중개사 동차] 직장인 김*진 님 - 모의고사 <strong>42점 ➔ 82.5점 (+40점 상승)</strong> 합격 인증!',
        '📈 최근 1시간 내 에듀위 실시간 합격예측 풀서비스 채점 <strong>184건</strong> 돌파!',
        '🎉 [재경관리사 60일 패스] 비전공자 박*우 님 - 3과목 전원 <strong>80점 이상 고득점 합격</strong>!'
    ];
    let tickerIdx = 0;
    const spTickerActive = document.getElementById("spTickerActive");
    if (spTickerActive) {
        setInterval(() => {
            tickerIdx = (tickerIdx + 1) % tickerMessages.length;
            spTickerActive.style.opacity = "0";
            spTickerActive.style.transform = "translateY(10px)";
            setTimeout(() => {
                spTickerActive.innerHTML = tickerMessages[tickerIdx];
                spTickerActive.style.opacity = "1";
                spTickerActive.style.transform = "translateY(0)";
            }, 300);
        }, 3600);
    }

    // =========================================================================
    // 8. 코칭 모드 라디오 버튼 선택 상태 강조 인터랙션
    // =========================================================================
    const personaRadios = document.querySelectorAll('input[name="persona"]');
    function updatePersonaCardVisuals() {
        personaRadios.forEach(radio => {
            const card = radio.closest(".persona-card");
            if (card) {
                if (radio.checked) {
                    card.classList.add("is-active");
                } else {
                    card.classList.remove("is-active");
                }
            }
        });
    }
    personaRadios.forEach(radio => {
        radio.addEventListener("change", updatePersonaCardVisuals);
    });
    updatePersonaCardVisuals();

    // =========================================================================
    // 9. 점수 상승 실화 카드 [⚡ 이 루틴 적용] 버튼 이벤트 바인딩
    // =========================================================================
    document.querySelectorAll(".btn-sp-use").forEach(btn => {
        btn.addEventListener("click", () => {
            const goal = btn.getAttribute("data-goal");
            const date = btn.getAttribute("data-date");
            const weak = btn.getAttribute("data-weak");

            switchTab("view-planner");
            if (goal) document.getElementById("goal").value = goal;
            if (date) document.getElementById("exam_date").value = date;
            if (weak) document.getElementById("weak_point").value = weak;

            // 스파르타 모드로 추천 세팅
            const spartaRadio = document.querySelector('input[name="persona"][value="sparta"]');
            if (spartaRadio) {
                spartaRadio.checked = true;
                updatePersonaCardVisuals();
            }

            alert(`🏆 합격 선배의 검증된 루틴 [${goal}]이(가) AI 플래너 폼에 세팅되었습니다!
아래 [에듀위 AI 맞춤 합격 플랜 생성하기] 버튼을 눌러보세요.`);
        });
    });

    // =========================================================================
    // 10. 교재 [❤️ 찜하기] 토글 & 마이학습룸 연동
    // =========================================================================
    const defaultWishBooks = [
        { title: "2026 에듀위 세무사 1차 재정학 핵심이론+기출 OX", author: "세무사 시험연구소", price: "38,700원", link: "https://www.yes24.com/Product/Search?domain=BOOK&query=%EC%97%90%EB%93%80%EC%9C%8C+%EC%84%B8%EB%AC%B4%EC%82%AC" },
        { title: "2026 에듀위 재경관리사 3과목 한권끝장", author: "에듀위 세무/회계 교수진", price: "34,200원", link: "https://www.yes24.com/Product/Search?domain=BOOK&query=%EC%97%90%EB%93%80%EC%9C%8C+%EC%9E%AC%EA%B2%BD%EA%B4%80%EB%A6%AC%EC%82%AC+%ED%95%9C%EA%B5%8C%EB%81%9D%EC%9E%A5" },
        { title: "에듀위 토익 실전 1000제 (LC/RC 최신 기출경향)", author: "에듀위 어학연구소", price: "23,400원", link: "https://www.yes24.com/Product/Search?domain=BOOK&query=%EC%97%90%EB%93%80%EC%9C%8C+%ED%86%A0%EC%9D%B5" }
    ];

    function getWishlist() {
        const stored = localStorage.getItem("eduwe_wish_books");
        return stored ? JSON.parse(stored) : defaultWishBooks;
    }

    function saveWishlist(list) {
        localStorage.setItem("eduwe_wish_books", JSON.stringify(list));
    }

    // 교재 카드 찜 버튼 클릭 리스너
    document.querySelectorAll(".btn-book-wish").forEach(btn => {
        const title = btn.getAttribute("data-title");
        const list = getWishlist();
        if (list.some(b => b.title.includes(title) || title.includes(b.title))) {
            btn.classList.add("active");
            btn.innerText = "❤️ 찜됨";
        }

        btn.addEventListener("click", () => {
            let currentList = getWishlist();
            const exists = currentList.findIndex(b => b.title.includes(title) || title.includes(b.title));
            if (exists >= 0) {
                currentList.splice(exists, 1);
                btn.classList.remove("active");
                btn.innerText = "❤️ 찜";
                alert(`💔 [${title}] 교재가 마이학습룸 찜 목록에서 제거되었습니다.`);
            } else {
                currentList.unshift({
                    title: title,
                    author: "에듀위 전문 교수진 편저",
                    price: "베스트셀러",
                    link: `https://www.yes24.com/Product/Search?domain=BOOK&query=${encodeURIComponent("에듀윌 " + title)}`
                });
                btn.classList.add("active");
                btn.innerText = "❤️ 찜됨";
                alert(`❤️ [${title}] 교재가 마이학습룸 찜 목록에 안전하게 보관되었습니다!`);
            }
            saveWishlist(currentList);
        });
    });

    // =========================================================================
    // 11. AI 플랜 히스토리 & 가채점 리포트 저장소
    // =========================================================================
    const defaultPlanHistory = [
        {
            id: "plan_sample_1",
            goal: "세무사 1차 90일 파이널 완성 플랜",
            exam_date: "2026-05-09",
            persona: "스파르타 모드",
            created_at: "2026.09.28",
            markdown: "### 📌 2026 세무사 1차 90일 파이널 플랜\n- **주차별 목표**: 1~4주 기본서 예제 3회독, 5~8주 기출 10개년 단원별 풀이, 9~12주 파이널 모의고사\n- **취약 파트 집중**: 세법학개론 부가가치세/소득세 계산구조 완성\n- **일일 순공 목표**: 평일 4시간, 주말 8시간"
        },
        {
            id: "plan_sample_2",
            goal: "공인중개사 동차 단기 합격 완성",
            exam_date: "2026-10-31",
            persona: "페이스메이커",
            created_at: "2026.09.20",
            markdown: "### 📌 2026 공인중개사 동차 합격 플랜\n- **민법 40점 탈출**: 판례 키워드 연결 암기\n- **부동산학개론**: 계산 공식 10선 마스터\n- **망각곡선 복습 주기 준수**: 1일/3일/7일 족집게 OX 반복"
        }
    ];

    function getPlanHistory() {
        const stored = localStorage.getItem("eduwe_plan_history");
        return stored ? JSON.parse(stored) : defaultPlanHistory;
    }

    function savePlanToHistory(planObj) {
        const list = getPlanHistory();
        list.unshift(planObj);
        localStorage.setItem("eduwe_plan_history", JSON.stringify(list));
    }

    function savePredictReport(reportObj) {
        localStorage.setItem("eduwe_last_predict", JSON.stringify(reportObj));
    }

    function getPredictReport() {
        const stored = localStorage.getItem("eduwe_last_predict");
        if (stored) return JSON.parse(stored);
        return {
            examName: "9급 세무직 공무원",
            totalScore: 417.5,
            avgScore: "83.5",
            diffCutoff: "+1.0",
            verdict: "🟢 합격 안정권",
            verdictClass: "verdict-pass-safe",
            weakSubject: "세법개론",
            weakScore: 65,
            cutoff: 82.5,
            date: "2026.09.29"
        };
    }

    // =========================================================================
    // 12. 마이학습룸 (MyPage) 종합 렌더링
    // =========================================================================
    function renderMyPage() {
        // 1. 플랜 히스토리 렌더링
        const planList = getPlanHistory();
        const planContainer = document.getElementById("planHistoryList");
        const planCountBadge = document.getElementById("planCountBadge");
        if (planCountBadge) planCountBadge.innerText = `${planList.length}개 보관 중`;

        if (planContainer) {
            planContainer.innerHTML = "";
            if (planList.length === 0) {
                planContainer.innerHTML = '<p style="color: #94a3b8; font-size: 13px; padding: 20px 0; text-align: center;">보관된 AI 맞춤 플랜이 없습니다. 상단에서 새 플랜을 생성해 보세요!</p>';
            } else {
                planList.forEach((plan, idx) => {
                    const item = document.createElement("div");
                    item.className = "plan-hist-item";
                    item.innerHTML = `
                        <div class="plan-hist-info">
                            <h4>${plan.goal}</h4>
                            <div class="plan-hist-meta">
                                <span class="hist-tag">${plan.persona || 'AI 코칭'}</span>
                                <span>📅 시험: ${plan.exam_date || '2026'}</span>
                                <span>생성일: ${plan.created_at}</span>
                            </div>
                        </div>
                        <div class="plan-hist-actions">
                            <button class="btn-hist-view" data-idx="${idx}">👁️ 다시보기</button>
                            <button class="btn-hist-del" data-idx="${idx}">🗑️</button>
                        </div>
                    `;
                    planContainer.appendChild(item);
                });

                // 플랜 다시보기 리스너
                planContainer.querySelectorAll(".btn-hist-view").forEach(btn => {
                    btn.addEventListener("click", () => {
                        const idx = parseInt(btn.getAttribute("data-idx"));
                        const selectedPlan = planList[idx];
                        if (selectedPlan) {
                            switchTab("view-planner");
                            currentMarkdownText = selectedPlan.markdown;
                            resultContent.innerHTML = marked.parse(currentMarkdownText);
                            placeholder.style.display = "none";
                            resultContent.style.display = "block";
                            actionButtons.style.display = "flex";
                            resultContent.scrollIntoView({ behavior: "smooth" });
                        }
                    });
                });

                // 플랜 삭제 리스너
                planContainer.querySelectorAll(".btn-hist-del").forEach(btn => {
                    btn.addEventListener("click", () => {
                        const idx = parseInt(btn.getAttribute("data-idx"));
                        if (confirm("이 AI 맞춤 플랜을 보관함에서 삭제하시겠습니까?")) {
                            planList.splice(idx, 1);
                            localStorage.setItem("eduwe_plan_history", JSON.stringify(planList));
                            renderMyPage();
                        }
                    });
                });
            }
        }

        // 2. 가채점 분석 리포트 렌더링
        const predReport = getPredictReport();
        const predContainer = document.getElementById("mypagePredictContent");
        const predTag = document.getElementById("myPredStatusTag");
        if (predTag) {
            predTag.innerText = predReport.verdict;
        }

        if (predContainer) {
            predContainer.innerHTML = `
                <div class="mypage-pred-box">
                    <div class="mpred-top">
                        <span class="mpred-exam-name">🏛️ ${predReport.examName}</span>
                        <span style="font-size: 12px; color: #64748b;">진단일: ${predReport.date}</span>
                    </div>
                    <div class="mpred-scores">
                        <div class="mps-item">
                            <span class="mps-lbl">내 평균점수</span>
                            <span class="mps-val text-gold">${predReport.avgScore}점</span>
                        </div>
                        <div class="mps-item">
                            <span class="mps-lbl">합격 컷오프</span>
                            <span class="mps-val">${predReport.cutoff}점</span>
                        </div>
                        <div class="mps-item">
                            <span class="mps-lbl">컷 대비 편차</span>
                            <span class="mps-val" style="color: #10b981;">${predReport.diffCutoff}점</span>
                        </div>
                    </div>
                    <div class="mpred-weak-alert">
                        <strong>⚠️ 취약 과목 진단:</strong> [${predReport.weakSubject}] ${predReport.weakScore}점<br>
                        합격선 돌파를 위해 해당 단원 5개년 기출 3회독 누적 복습을 권장합니다.
                    </div>
                    <button class="btn-eduwe-cta" id="myPageDeficitBtn" style="padding: 10px; font-size: 13px;">
                        ⚡ [${predReport.weakSubject}] 취약 과목 AI 집중 보완 플랜 생성하기
                    </button>
                </div>
            `;

            const defBtn = document.getElementById("myPageDeficitBtn");
            if (defBtn) {
                defBtn.addEventListener("click", () => {
                    switchTab("view-planner");
                    document.getElementById("goal").value = `${predReport.examName} 합격선 돌파`;
                    document.getElementById("weak_point").value = `${predReport.weakSubject} 기출 회독 및 약점 단원 마스터`;
                    document.getElementById("current_level").value = `가채점 평균 ${predReport.avgScore}점 (취약: ${predReport.weakSubject})`;
                    alert(`🎯 [${predReport.weakSubject}] 보완 정보가 AI 플래너 폼에 자동으로 채워졌습니다!`);
                });
            }
        }

        // 3. 찜한 교재 목록 렌더링
        const wishList = getWishlist();
        const wishContainer = document.getElementById("wishlistContainer");
        const wishBadge = document.getElementById("wishCountBadge");
        if (wishBadge) wishBadge.innerText = `${wishList.length}권 보관`;

        if (wishContainer) {
            wishContainer.innerHTML = "";
            if (wishList.length === 0) {
                wishContainer.innerHTML = '<p style="color: #94a3b8; font-size: 13px; padding: 20px 0; text-align: center;">찜한 수험서가 없습니다. 교재 탭에서 마음에 드는 책을 찜해 보세요!</p>';
            } else {
                wishList.forEach((book, idx) => {
                    const row = document.createElement("div");
                    row.className = "wish-item";
                    row.innerHTML = `
                        <div class="wish-info">
                            <h5>${book.title}</h5>
                            <p>${book.author || '에듀위 수험서'} | <span style="color: #ef4444; font-weight: 700;">${book.price || '베스트셀러'}</span></p>
                        </div>
                        <div class="wish-actions">
                            <a href="${book.link}" target="_blank" class="btn-wish-buy">🛒 구매</a>
                            <button class="btn-wish-plan" data-title="${book.title}">⚡ 플랜</button>
                            <button class="btn-wish-del" data-idx="${idx}" title="삭제">✕</button>
                        </div>
                    `;
                    wishContainer.appendChild(row);
                });

                // 플랜 연동 리스너
                wishContainer.querySelectorAll(".btn-wish-plan").forEach(btn => {
                    btn.addEventListener("click", () => {
                        const title = btn.getAttribute("data-title");
                        switchTab("view-planner");
                        document.getElementById("goal").value = `${title} 완독 및 합격`;
                        document.getElementById("study_style").value = "기본서 회독 + 기출 5개년 반복 풀이";
                        alert(`📚 [${title}] 교재 기반 학습 플랜이 폼에 채워졌습니다!`);
                    });
                });

                // 삭제 리스너
                wishContainer.querySelectorAll(".btn-wish-del").forEach(btn => {
                    btn.addEventListener("click", () => {
                        const idx = parseInt(btn.getAttribute("data-idx"));
                        wishList.splice(idx, 1);
                        saveWishlist(wishList);
                        renderMyPage();
                    });
                });
            }
        }
    }

    // =========================================================================
    // 13. 오늘의 합격 순공 체크리스트 인터랙션
    // =========================================================================
    const todoCheckboxes = document.querySelectorAll(".todo-check");
    const todoRateText = document.getElementById("todoRateText");
    const todoProgressFill = document.getElementById("todoProgressFill");

    function updateTodoProgress() {
        if (!todoCheckboxes.length) return;
        let checkedCount = 0;
        todoCheckboxes.forEach(cb => {
            const item = cb.closest(".todo-item");
            if (cb.checked) {
                checkedCount++;
                if (item) item.classList.add("done");
            } else {
                if (item) item.classList.remove("done");
            }
        });
        const rate = Math.round((checkedCount / todoCheckboxes.length) * 100);
        if (todoRateText) todoRateText.innerText = `달성률 ${rate}%`;
        if (todoProgressFill) todoProgressFill.style.width = `${rate}%`;
    }

    todoCheckboxes.forEach(cb => {
        cb.addEventListener("change", updateTodoProgress);
    });
    updateTodoProgress();

});
