// src/adapters/langchain/ApiLangChainExecutionAdapter.ts
import axios from 'axios'
import { LangChainExecutionPort } from '../../ports/langchain/LangChainExecutionPort'
import { PipelineDefinition, PipelineExecution, ValidationResult } from '../../domain/langchain/types'

export class ApiLangChainExecutionAdapter implements LangChainExecutionPort {
  async executePipeline(
    pipeline: PipelineDefinition,
    inputs: Record<string, string>
  ): Promise<PipelineExecution> {
    const response = await axios.post<PipelineExecution>('/api/langchain/execute', {
      pipeline,
      inputs,
    })
    return response.data
  }

  async validatePipeline(
    pipeline: PipelineDefinition
  ): Promise<ValidationResult> {
    const response = await axios.post<ValidationResult>('/api/langchain/validate', {
      pipeline,
    })
    return response.data
  }
}
