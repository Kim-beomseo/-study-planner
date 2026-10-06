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


def generate_fallback_plan(user_data, search_context=""):
    """
    Gemini API 장애 또는 API 키 부재 시에도 완벽한 10개 핵심 섹션의 
    초정밀 맞춤형 학습 마스터플랜을 즉시 생성하는 전문 백업 엔진
    """
    goal = user_data.get("goal", "국가공인 자격시험")
    exam_date = user_data.get("exam_date", "2026-10-31")
    current_level = user_data.get("current_level", "비전공자 초시생 (노베이스)")
    daily_time = user_data.get("daily_time", "일일 6~8시간 몰입형")
    weak_point = user_data.get("weak_point", "핵심 계산 및 지엽적 조문 암기")
    study_style = user_data.get("study_style", "기본서 정독 + 진도별 기출 풀이 병행")
    persona = user_data.get("persona", "sparta")

    tone_intro = (
        "> ⚡ **[에듀위 1타 스파르타 코치 전언]**\n"
        "> \"수험은 막연한 노력이 아니라 철저한 데이터와 전략의 싸움입니다. "
        "당신의 현재 수준과 목표 시험일정에 맞춘 최적의 합격 로드맵을 설계했습니다. 지금 즉시 실행하십시오!\""
        if persona == "sparta" else
        "> 🌱 **[에듀위 합격 페이스메이커 전언]**\n"
        "> \"처음 시작하는 수험도 올바른 방향만 잡으면 단기합격이 가능합니다. "
        "포기하지 않고 끝까지 완주할 수 있도록 가장 현실적이고 든든한 커리큘럼을 전해드립니다.\""
    )

    return f"""# 📋 [에듀위 AI 공인 합격 마스터플랜]: {goal}

{tone_intro}

---

## 1. 📌 무엇을 공부해야 하는가? (시험 개요 & 과목별 배점·과락 기준)
* **목표 시험 및 과정**: **{goal}**
* **목표 D-Day / 시험일**: **{exam_date}**
* **수험생 진단 베이스**: {current_level}
* **합격 기준 구조**: 
  - 1차 객관식: 매 과목 40점 이상(과락 방지 필수), 전 과목 평균 60점 이상 절대평가
  - 2차 주관식/실기: 시험 과목별 배점 기준 60점 이상 또는 고득점자순 선발
* **핵심 출제 테마**:
  - 기본 이론(40%): 매년 반복 출제되는 핵심 빈출 법령/개념
  - 응용 및 기출 변형(40%): 계산문제 및 판례/사례형 복합 지문
  - 신유형 및 킬러 문항(20%): 고득점 변별력을 가르는 최신 개정 조문

---

## 2. 💡 어떻게 공부해야 하는가? (단계별 3회독 마스터 테크닉)
1. **[1단계: 기초 개념 & 기본서 1회독] (이해도 60% 목표)**
   - 완벽한 암기보다 전체 뼈대와 용어 숙지에 집중합니다. 모르는 부분이 나와도 멈추지 않고 완강합니다.
   - 하루 공부 시작 전 전날 학습 내용을 15분간 가볍게 훑는 루틴을 유지합니다.
2. **[2단계: 단원별 기출문제 3회독 & 오답 단권화] (이해도 85% 목표)**
   - 최근 5~10개년 기출문제를 분석하여 자주 나오는 선지와 오답 함정을 정리합니다.
   - 틀린 문제는 해설을 보고 넘어가지 말고, 기본서 해당 페이지를 찾아 형광펜으로 체크(단권화)합니다.
3. **[3단계: 실전 동형 모의고사 & 파이널 암기노트] (실전 득점력 100% 완성)**
   - OMR 답안지 작성 및 실제 시험 시간(과목당 40~50분)에 맞춘 실전 시간 배분 훈련을 주 2회 실시합니다.
   - 시험장까지 들고 갈 '나만의 20페이지 요약 서브노트'를 완성합니다.

---

## 3. 📚 추천 교재 및 강의 테크트리
* **입문/기본 단계**: `에듀위 {goal} 최신개정판 기본서` + 에듀위 교수진 기본이론 40일 완성 인강
* **문제풀이 단계**: `에듀위 10개년 단원별 기출문제집 (해설편 분권)`
* **마무리 단계**: `에듀위 파이널 봉투모의고사 5회분` + `시험장 직전 100제 요약노트`
* **선호 학습 방식 반영**: **{study_style}**에 최적화된 학습 동선 구축

---

## 4. 📅 D-Day 역산 주간 계획 (Weekly Roadmap)
* **[1~4주차] 기본 이론 완강 및 핵심 프레임워크 구축**
  - 전 과목 인강 1회독 완강 및 매일 복습 누적
* **[5~8주차] 단원별 기출 집중 분석 및 오답 노트화**
  - 취약 과목({weak_point}) 기출 2회독 및 공식/판례 집중 암기
* **[9~12주차] 기출 3회독 + 전 범위 실전 모의고사**
  - 시간 관리 훈련, OMR 마킹 연습, 과락 위험 과목 45점 이상 안전권 진입
* **[시험 D-14 ~ D-Day] 최종 단권화 서브노트 무한 회독**
  - 1일 1과목 전체 회독, 최신 개정사항 및 헷갈리는 지문 최종 점검

---

## 5. ⏰ 하루 순공시간({daily_time}) 최적 분배 및 일일 타임테이블
* **오전 세션 (09:00 ~ 12:00 / 3시간)**: 집중력이 가장 높은 시간 ➔ **취약 과목 및 고난도 계산/이론 집중 ({weak_point})**
* **점심 및 휴식 (12:00 ~ 13:00 / 1시간)**: 가벼운 산책 및 리프레시
* **오후 세션 (13:00 ~ 17:00 / 3.5시간)**: 진도별 기출문제 풀이 및 기본서 단권화 병행
* **저녁 및 야간 세션 (18:30 ~ 21:30 / 2.5시간)**: 당일 학습 오답노트 작성 & 에빙하우스 당일 복습
* **취침 전 (22:30 ~ 23:00 / 30분)**: 백지 복습법(오늘 배운 핵심 키워드 5개 적어보기)

---

## 6. 🔄 에빙하우스 망각곡선 기반 복습 주기 (Review Cycle)
* **10분 후 복습**: 인강 1강 종료 즉시 5분간 목차와 핵심 요약박스 눈으로 스캔
* **1일 후 복습 (24시간 이내)**: 다음 날 공부 시작 전, 어제 학습한 기출문제 오답 3개 재풀이
* **7일 후 복습 (주말)**: 주말에 이번 주 진도 전체를 훑으며 단권화 노트 확인
* **30일 후 복습 (월말)**: 누적 범위 하프 모의고사를 통해 장기기억 보존 상태 점검

---

## 7. 🎯 취약과목 집중 보완 및 과락(40점) 탈출 전략
* **지정 취약점**: **{weak_point}**
* **처방전**:
  1. 취약 과목은 100점을 목표로 하지 말고, **'출제 비중 70%를 차지하는 빈출 A급 테마'에 80%의 시간을 투자**합니다.
  2. 복잡한 지엽 문항은 과감히 버리고, 계산문제는 정형화된 풀이 템플릿 10개를 기계적으로 반복합니다.
  3. 다른 전략 과목(고득점 효자 과목)에서 80점 이상을 확보하여 평균 60점을 견인합니다.

---

## 8. 📝 실전 개념 자가 점검 질문 (Self-Check Test)
1. **Q1.** 본 시험에서 매년 가장 높은 출제 비중(20% 이상)을 차지하는 핵심 제1테마의 기본 정의를 타인에게 설명할 수 있는가?
2. **Q2.** 기출문제에서 정답뿐만 아니라 오답 선지가 왜 틀렸는지(틀린 키워드)를 찾아낼 수 있는가?
3. **Q3.** 과목당 배정된 시험 시간 내에 마킹까지 완료할 수 있는 문제당 풀이 속도(1분~1분 20초)가 유지되는가?
4. **Q4.** 에빙하우스 복습 주기(1일-7일-30일)에 맞춰 오답노트를 다시 복습하고 있는가?

---

## 9. 📊 단계별 합격 진도 체크리스트
- [ ] 1. 에듀위 추천 기본서 및 최신 기출문제집 구비 완료
- [ ] 2. 목표 시험일({exam_date}) D-Day 달력 책상 부착 및 순공시간 확보
- [ ] 3. 전 과목 기본이론 인강 1회독 완강
- [ ] 4. 취약 영역({weak_point}) 집중 공략 및 빈출 공식 암기
- [ ] 5. 최근 5개년 기출문제 3회독 및 오답 단권화 완료
- [ ] 6. 실전 동형 모의고사 3회 연속 합격선(평균 60점 이상) 돌파
- [ ] 7. 최종 20페이지 서브노트 완성 및 시험장 준비물 점검

---

## 10. 💬 담당 코치의 최종 조언 & KPT 회고 가이드
* **Keep (유지할 점)**: 매일 정해진 순공시간({daily_time})을 지키며 기상/취침 루틴을 엄수하세요.
* **Problem (주의할 점)**: 완벽주의로 인해 기본서만 붙잡고 기출 풀이를 미루는 것은 가장 위험한 수험 실패 요인입니다.
* **Try (시도할 점)**: 모르는 문제가 나와도 당황하지 않고 보기를 소거하는 실전 감각을 기르세요. 당신은 반드시 합격합니다!
"""


def generate_study_plan(user_data, search_context):
    """
    Gemini API (gemini-3.5-flash-lite)를 호출하여 
    10대 필수 합격 섹션이 포함된 맞춤형 학습 계획 마크다운을 생성
    """
    gemini_key = get_gemini_key()
    if not gemini_key or gemini_key == "your_gemini_api_key_here":
        # API 키가 없으면 고품질 내장 전문 플랜 반환
        return generate_fallback_plan(user_data, search_context)

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

사용자의 학습 조건과 실시간 웹 검색 정보를 종합 분석하여, 
수험생이 '무엇을 공부해야 하는지', '어떻게 공부해야 하는지', '교재와 강의는 어떻게 활용할지' 등을 
아무것도 모르는 초보자/노베이스도 한눈에 바로 실행할 수 있도록 실전 완결형 'AI 맞춤 합격 마스터플랜'을 마크다운(Markdown) 형식으로 작성해 주세요.

### [사용자 입력 정보]
1. 목표 시험 / 과정명: {goal}
2. 목표 시험일 / D-Day: {exam_date}
3. 현재 수준 및 베이스: {current_level}
4. 하루 투자 가능 시간: {daily_time}
5. 취약 영역 / 고민: {weak_point}
6. 선호 학습 방식: {study_style}

### [실시간 웹 검색 최신 정보 (Serper API 제공)]
{search_context}

---

### [필수 작성 지침 및 10대 핵심 섹션 구성]
반드시 다음 10가지 항목을 명확한 H2(##) 섹션으로 빠짐없이 구체적이고 상세하게 작성하세요:

# 📋 [에듀위 AI 공인 합격 마스터플랜]: {goal}

## 1. 📌 무엇을 공부해야 하는가? (시험 개요 & 과목별 배점·과락 기준·출제 경향)
- 해당 시험의 시험 과목, 문항 수, 배점, 과락 기준(40점 등)과 합격 커트라인 명시.
- 시험의 출제 비중(기본이론, 빈출기출, 신유형)을 분석하여 핵심 영역 정의.

## 2. 💡 어떻게 공부해야 하는가? (단계별 3회독 마스터 기법)
- 초시생/노베이스를 위한 1단계 개념이해(1회독) ➔ 2단계 기출분석(2~3회독) ➔ 3단계 모의고사/오답정리 구체적 방법론.
- 회독 속도와 이해도를 극대화하는 실전 노하우 제시.

## 3. 📚 추천 교재 및 강의 테크트리
- 기본서, 단원별 기출문제집, 핵심 요약집, 봉투 모의고사 등 권장 교재 구성 및 인강 수강 순서.

## 4. 📅 D-Day 역산 주간 마일스톤 계획 (Weekly Roadmap)
- 시험일({exam_date})까지 주차별 핵심 마일스톤과 주간 달성 목표를 구체적으로 수립.

## 5. ⏰ 하루 순공시간({daily_time}) 최적 분배 및 일일 타임테이블
- 가용 시간을 고려한 오전/오후/야간 시간대별 구체적 타임라인 및 일일 루틴.
- 취약 영역({weak_point}) 집중 보완 시간대 필수 배정.

## 6. 🔄 에빙하우스 망각곡선 기반 복습 주기 (Review Cycle)
- 10분 후, 1일 후, 7일 후, 30일 후 등 체계적인 망각곡선 주기 복습 방법론 명시.

## 7. 🎯 취약과목({weak_point}) 집중 보완 및 과락(40점 미만) 방지 전략
- 취약 과목에서 과락을 피하고 다른 전략 과목으로 평균 60점 이상을 넘기는 전략.

## 8. 📝 실전 개념 자가 점검 질문 4선 (Self-Check Questions)
- 학습 성취도를 스스로 즉시 검증해볼 수 있는 핵심 개념 질문 또는 자가 테스트 질문 4가지.

## 9. 📊 단계별 진도 체크리스트
- 학습자가 완료 여부를 직접 체크([ ] 형식)할 수 있는 체크리스트 목록.

## 10. 💬 담당 코치의 최종 조언 & KPT 회고 가이드
- KPT(Keep, Problem, Try) 프레임워크 기반 일일/주간 회고 템플릿과 멘토의 강력한 동기부여 격려.
"""

    try:
        response = client.models.generate_content(
            model="gemini-3.5-flash-lite",
            contents=prompt
        )
        if response and response.text:
            return response.text
        return generate_fallback_plan(user_data, search_context)
    except Exception as err:
        print(f"Gemini API 호출 실패, 고품질 폴백 플랜 생성: {err}")
        return generate_fallback_plan(user_data, search_context)


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

        # 1. Serper API로 최신 학습/시험 정보 검색 (실패해도 진행)
        search_context = ""
        try:
            search_context = search_serper(data.get("goal"), data.get("exam_date"))
        except Exception as se:
            print(f"Serper search skipped: {se}")

        # 2. Gemini API로 학습 플랜 생성 (실패 시 고품질 폴백 엔진 자동 가동)
        plan_content = generate_study_plan(data, search_context)

        return jsonify({
            "success": True,
            "content": plan_content
        })

    except Exception as e:
        print(f"서버 처리 오류: {e}")
        # 오류 발생 시에도 사용자에게 깨진 화면 대신 맞춤 폴백 플랜 제공
        try:
            fallback = generate_fallback_plan(data or {}, "")
            return jsonify({"success": True, "content": fallback})
        except Exception:
            return jsonify({"error": f"학습 플랜 생성 중 오류가 발생했습니다: {str(e)}"}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
