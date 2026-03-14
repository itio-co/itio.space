// src/ports/langchain/LangChainExecutionPort.ts
import { PipelineDefinition, PipelineExecution, ValidationResult } from '../../domain/langchain/types'

export interface LangChainExecutionPort {
  executePipeline(
    pipeline: PipelineDefinition,
    inputs: Record<string, string>
  ): Promise<PipelineExecution>

  validatePipeline(
    pipeline: PipelineDefinition
  ): Promise<ValidationResult>
}
