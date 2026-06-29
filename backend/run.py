import uvicorn

if __name__ == "__main__":
    # "app.main:app" points to the 'app' object inside backend/app/main.py
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)