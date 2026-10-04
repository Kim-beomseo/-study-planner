import os
import json
import requests
from flask import Flask, render_template, request, jsonify, send_from_directory, make_response
from dotenv import load_dotenv
from google import genai

# 환경변수 로드 (.env 명시적 경로 지정)
basedir = os.path.abspath(os.path.dirname(__file__))
env_path = os.path.join(basedir, ".env")
load_dotenv(env_path)

app = Flask(__name__)

# 환경변수에서 API 키 추출
def get_gemini_key():
    return os.getenv("GEMINI_API_KEY")

def get_serper_key():
    return os.getenv("SERPER_API_KEY")


def search_serper(goal, exam_date):
    """
    Serper API를 호출하여 학습목표 및 시험 관련 최신 정보(시험 일정, 기출 경향, 공부 꿀팁)를 검색
    """
    serper_key = get_serper_key()
    if not serper_key or serper_key == "your_serper_api_key_here":
        return "Serper API 키가 설정되지 않아 실시간 검색 정보를 불러오지 못했습니다."

    url = "https://google.serper.dev/search"
    headers = {
        "X-API-KEY": serper_key,
        "Content-Type": "application/json"
    }

    # 검색 쿼리 구성
    query = f"{goal} 공부법 시험 준비 합격 후기 최신 팁"
    payload = json.dumps({
        "q": query,
        "gl": "kr",
        "hl": "ko",
        "num": 5
    })

    try:
        response = requests.post(url, headers=headers, data=payload, timeout=6)
        response.raise_for_status()
        data = response.json()

        search_snippets = []
        if "organic" in data:
            for item in data["organic"][:5]:
                title = item.get("title", "")
                snippet = item.get("snippet", "")
                search_snippets.append(f"- {title}: {snippet}")

        if search_snippets:
            return "\n".join(search_snippets)
        return "관련 검색 결과가 충분하지 않습니다."
    except Exception as e:
        print(f"Serper API 요청 중 오류 발생: {e}")
        return f"실시간 검색 중 일시적 오류 발생: {e}"


def generate_study_plan(user_data, search_context):
    """
    Gemini API (gemini-3.5-flash-lite)를 호출하여 
    6가지 필수 섹션이 포함된 맞춤형 학습 계획 마크다운을 생성
    """
    gemini_key = get_gemini_key()
    if not gemini_key or gemini_key == "your_gemini_api_key_here":
        raise ValueError(".env 파일에 GEMINI_API_KEY가 올바르게 설정되지 않았습니다.")

    client = genai.Client(api_key=gemini_key)

    goal = user_data.get("goal", "")
    exam_date = user_data.get("exam_date", "")
    current_level = user_data.get("current_level", "")
    daily_time = user_data.get("daily_time", "")
    weak_point = user_data.get("weak_point", "")
    study_style = user_data.get("study_style", "")
    persona = user_data.get("persona", "mentor")  # mentor(친절) or sparta(엄격)

    if persona == "sparta":
        persona_tone = (
            "당신은 엄격하고 타협 없는 '스파르타 1타 수험 코치'입니다. "
            "나태함을 절대 용납하지 않고, 낭비 시간 없는 극도의 효율성과 철저한 실행을 단호한 어조로 요구하세요."
        )
    else:
        persona_tone = (
            "당신은 따뜻하고 격려를 아끼지 않으면서도 매우 현실적인 '학습 멘토'입니다. "
            "학습자의 현재 수준과 상황에 공감하며 꾸준히 실천할 수 있는 지속 가능한 공부법을 차분하게 제시하세요."
        )

    prompt = f"""
{persona_tone}

사용자의 학습 조건과 실시간 웹 검색 정보를 종합 분석하여, 실전에서 즉시 적용 가능한 '맞춤형 AI 학습 플래너'를 마크다운(Markdown) 형식으로 작성해 주세요.

### [사용자 입력 정보]
1. 학습 목표: {goal}
2. 목표 시험일/마감일: {exam_date}
3. 현재 수준: {current_level}
4. 하루 투자 가능 시간: {daily_time}
5. 취약 영역: {weak_point}
6. 선호 학습 방식: {study_style}

### [실시간 웹 검색 최신 정보 (Serper API 제공)]
{search_context}

---

### [필수 작성 지침 및 섹션 구성]
반드시 다음 6가지 항목을 명확한 H2(##) 섹션으로 모두 포함하여 빠짐없이 마크다운으로 작성하세요:

# 📋 [AI 맞춤형 학습 플랜]: {goal}

## 1. 📅 주간 계획 (Weekly Plan)
- 시험일({exam_date})까지 남은 기간을 고려하여 주차별 핵심 마일스톤과 주간 달성 목표를 구체적으로 수립.

## 2. ⏰ 일일 계획 (Daily Schedule)
- 하루 가용 시간({daily_time})과 선호 학습 방식({study_style})을 고려한 시간대별/순서별 구체적 타임라인 및 일일 루틴.
- 취약 영역({weak_point})을 집중 보완하는 시간대 반드시 배정.

## 3. 🔄 에빙하우스 망각곡선 기반 복습 주기 (Review Cycle)
- 1일 후, 3일 후, 7일 후, 14일 후, 30일 후 등 체계적인 망각곡선 주기 복습 방법론 명시.
- 배운 내용을 장기기억으로 넘기기 위한 복습 액션 플랜.

## 4. 📝 실전 점검 문항 (Self-Check Questions)
- 학습 성취도를 스스로 즉시 검증해볼 수 있는 핵심 개념 질문 또는 자가 테스트 질문 3~4가지 제시.

## 5. 📊 진도 체크리스트 (Progress Tracker)
- 학습자가 완료 여부를 직접 체크([ ] 형식)하며 성취감을 느낄 수 있는 단계별 체크리스트 목록.

## 6. 💡 학습 회고 가이드 (Reflection & Feedback)
- 하루 또는 일주일 공부를 마친 후, KPT(Keep, Problem, Try) 프레임워크 등을 바탕으로 스스로 돌아보고 개선할 수 있는 구체적인 회고 템플릿과 멘토의 격려/조언.
"""

    response = client.models.generate_content(
        model="gemini-3.5-flash-lite",
        contents=prompt
    )
    return response.text


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/manifest.json")
def manifest():
    return send_from_directory("static", "manifest.json", mimetype="application/manifest+json")


@app.route("/sw.js")
def service_worker():
    response = make_response(send_from_directory("static", "sw.js", mimetype="application/javascript"))
    response.headers["Service-Worker-Allowed"] = "/"
    return response


@app.route("/generate", methods=["POST"])
def generate():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "요청 데이터가 비어 있습니다."}), 400

        required_fields = ["goal", "exam_date", "current_level", "daily_time", "weak_point", "study_style"]
        for field in required_fields:
            if not data.get(field):
                return jsonify({"error": f"'{field}' 항목을 모두 입력해 주세요."}), 400

        # 1. Serper API로 최신 학습/시험 정보 검색
        search_context = search_serper(data.get("goal"), data.get("exam_date"))

        # 2. Gemini API (gemini-3.5-flash-lite)로 학습 플랜 생성
        plan_content = generate_study_plan(data, search_context)

        return jsonify({
            "success": True,
            "content": plan_content
        })

    except Exception as e:
        print(f"서버 처리 오류: {e}")
        return jsonify({"error": f"학습 플랜 생성 중 오류가 발생했습니다: {str(e)}"}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
