# NeuralFlow Builder - Visual Deep Learning Workflow Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.9+](https://img.shields.io/badge/python-3.9+-blue.svg)](https://www.python.org/downloads/)
[![React 18+](https://img.shields.io/badge/react-18+-61dafb.svg)](https://reactjs.org/)

NeuralFlow Builder is an intuitive visual programming platform for constructing deep learning models through drag-and-drop workflows, supporting one-click code generation and model training.

## Key Features

- **Visual Workflow Construction**
  - Drag-and-drop neural network layers using ReactFlow
  - Real-time dimension validation between layers

- **Automated Code Generation**
  - One-click PyTorch code generation (see `pytorch_model.py.j2` template)
  - Customizable code templates
  - Unique model ID tracking

- **Integrated Training Suite**
  - Training configuration UI
  - Real-time training monitoring
  - Early stopping & model checkpointing
  - Mixed precision training support

- **Enterprise-Grade Architecture**
  - Frontend: React + Zustand + Ant Design
  - Backend: FastAPI + PyTorch Lightning

## Quick Start

### Prerequisites
- Python 3.9+
- Node.js 16+

### Installation
```bash
# Backend
cd backend
pip install -r requirements.txt

# Frontend
cd frontend
npm install
```

### Running
```bash
# Start backend
uvicorn app.main:app --reload

# Start frontend
npm start
```

## Workflow Example
1. Drag layers from palette to canvas
2. Connect layers following data flow
3. Configure layer parameters by clicking the nodes
5. Generate PyTorch code via Build button
6. Configure training parameters
7. Start model training