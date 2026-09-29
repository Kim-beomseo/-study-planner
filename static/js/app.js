document.addEventListener("DOMContentLoaded", () => {
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

    // 폼 제출 이벤트 리스너
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
        submitBtn.innerText = "⏳ 플랜 수립 및 실시간 검색 중...";

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
            submitBtn.innerText = "🚀 실시간 맞춤 학습 플랜 생성하기";
        }
    });

    // 마크다운 내용 클립보드 복사 기능
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

    // 마크다운 (.md) 파일 다운로드 기능
    downloadBtn.addEventListener("click", () => {
        if (!currentMarkdownText) return;

        // 파일명 생성 (특수문자 정제)
        const safeGoalName = currentGoal.replace(/[^a-zA-Z0-9가-힣]/g, "_");
        const fileName = `${safeGoalName}_학습플랜.md`;

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
});
