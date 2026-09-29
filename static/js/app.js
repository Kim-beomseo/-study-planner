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
    // 4. 모달 팝업 제어 (로그인, 회원가입, 고객만족센터)
    // -------------------------------------------------------------
    const loginModal = document.getElementById("loginModal");
    const registerModal = document.getElementById("registerModal");
    const csModal = document.getElementById("csModal");

    const openLoginBtn = document.getElementById("openLoginBtn");
    const openRegisterBtn = document.getElementById("openRegisterBtn");
    const openCsBtn = document.getElementById("openCsBtn");
    const footerCsBtn = document.getElementById("footerCsBtn");
    const switchToRegister = document.getElementById("switchToRegister");

    const modalCloses = document.querySelectorAll(".modal-close");

    function closeModal() {
        loginModal.classList.remove("show");
        registerModal.classList.remove("show");
        csModal.classList.remove("show");
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
    [loginModal, registerModal, csModal].forEach(modal => {
        if (modal) {
            modal.addEventListener("click", (e) => {
                if (e.target === modal) closeModal();
            });
        }
    });

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
