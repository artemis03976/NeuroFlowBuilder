@echo off
echo Starting NeuroFlow Builder Dev Environment...

:: 创建临时文件夹存放进程 ID
if not exist tmp mkdir tmp

:: 启动后端服务
echo Staring Backend Service...
start /B cmd /c "cd backend && python -m uvicorn main:app --host 0.0.0.0 --port 8379 --reload && pause" 

:: 等待几秒确保后端启动
timeout /t 3 /nobreak > nul

:: 启动前端服务
echo Starting Frontend Service...
cd frontend && (
  :: 检测包管理器并启动
  if exist yarn.lock (
    start /B cmd /c "yarn dev && pause"
  ) else if exist package-lock.json (
    start /B cmd /c "npm run dev && pause"
  ) else if exist pnpm-lock.yaml (
    start /B cmd /c "pnpm dev && pause"
  ) else (
    start /B cmd /c "npm run dev && pause"
  )
)

echo.
echo 服务启动中，请稍候...
echo 前端和后端服务现已在独立的命令行窗口中运行
echo 关闭这些窗口可停止相应的服务