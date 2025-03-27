from fastapi import APIRouter, HTTPException
import uuid
from app.schemas import BuildRequest  # 导入数据模型
from services.parser.main_parser import NetworkParser
from services.code_generator import PyTorchCodeGenerator

router = APIRouter()


@router.post("/")
async def build_model(
        network_data: BuildRequest
):
    """
    Generating PyTorch code from network data
    """
    try:
        # Generate unique identifiers
        model_id = str(uuid.uuid4())
        # Saving Models by ID
        output_path = f"./generations/pytorch_model_{model_id}.py"

        # 1. Parsing node and edge information
        network_parser = NetworkParser(network_data)
        parsed_data = network_parser.parse()

        # 2. Generate PyTorch code
        code_generator = PyTorchCodeGenerator()
        pytorch_code = code_generator.generate_code(parsed_data, output_path)

        # 3. Return generated results
        return {
            "model_id": model_id,
            "code": pytorch_code,
            "message": "Code generated successfully"
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
