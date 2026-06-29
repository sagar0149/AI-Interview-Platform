import os
import whisper
import ollama

# Load the local Whisper model (downloads automatically the first time)
# "base" is fast, accurate enough for interviews, and runs well on normal laptops
print("Loading Whisper model...")
model = whisper.load_model("base") 

def analyze_video(filepath: str, question: str):
    """
    Takes a video file and an interview question, extracts the audio locally via Whisper, 
    and evaluates the answer entirely locally using Ollama.
    """
    
    try:
        # ==========================================
        # 1. LOCAL SPEECH-TO-TEXT (Whisper)
        # ==========================================
        print(f"Transcribing video: {filepath}...")
        
        # Whisper automatically extracts audio from the webm file
        result = model.transcribe(filepath)
        user_transcript = result["text"].strip()
        print(f"Transcript: {user_transcript}")

        # ==========================================
        # 2. LOCAL AI EVALUATION (Ollama)
        # ==========================================
        print("Evaluating answer with Ollama...")
        
        system_prompt = """
        You are an expert technical recruiter and interview coach. 
        Evaluate the candidate's answer based on the question asked.
        Be encouraging but strictly honest. 
        Provide a concise, 3-4 sentence paragraph highlighting what they did well and what they missed.
        """
        
        user_prompt = f"""
        Interview Question: "{question}"
        Candidate's Answer: "{user_transcript}"
        
        Evaluate this answer.
        """

        # Call your local Ollama model (Make sure you ran `ollama pull llama3`)
        response = ollama.chat(model='llama3', messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ])
        
        answer_feedback = response['message']['content']

        # ==========================================
        # 3. BEHAVIORAL ANALYSIS (Placeholder)
        # ==========================================
        # To do this for real, you would use OpenCV and MediaPipe to track the eyes.
        
        word_count = len(user_transcript.split())
        
        if word_count < 10:
            speaking_confidence = "Hesitant and brief."
            score = 45
            recommendation = "You need to elaborate much more. Try using the STAR method to structure your answer."
        elif word_count < 40:
            speaking_confidence = "Moderate pacing, but could be more detailed."
            score = 75
            recommendation = "Good start, but add more specific examples from your past experience."
        else:
            speaking_confidence = "Strong, articulate, and well-paced delivery."
            score = 92
            recommendation = "Excellent detailed response. Keep maintaining this level of depth."

        return {
            "transcript": user_transcript,
            "answer_feedback": answer_feedback,
            "confidence_score": score,
            "eye_contact": "Good (Requires OpenCV integration)",
            "facial_expression": "Neutral (Requires OpenCV integration)",
            "body_language": "Stable (Requires OpenCV integration)",
            "speaking_confidence": speaking_confidence,
            "recommendation": recommendation
        }

    except Exception as e:
        print(f"Error in analyze_video: {str(e)}")
        return {
            "transcript": "Audio could not be processed.",
            "answer_feedback": f"An error occurred: {str(e)}",
            "confidence_score": 0,
            "eye_contact": "N/A",
            "facial_expression": "N/A",
            "body_language": "N/A",
            "speaking_confidence": "N/A",
            "recommendation": "Please try recording your answer again."
        }