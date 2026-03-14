// src/redux/langchainSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PipelineExecution, PipelineDefinition, ValidationResult } from '@/domain/langchain/types'
import { LangChainService } from '@/services/langchain/LangChainService'
import { ApiLangChainExecutionAdapter } from '@/adapters/langchain/ApiLangChainExecutionAdapter'

const langchainService = new LangChainService(new ApiLangChainExecutionAdapter())

interface LangChainState {
  execution: PipelineExecution | null
  isValidating: boolean
  validationErrors: string[]
}

const initialState: LangChainState = {
  execution: null,
  isValidating: false,
  validationErrors: [],
}

export const validatePipelineThunk = createAsyncThunk<
  ValidationResult,
  PipelineDefinition
>('langchain/validate', async (pipeline) => {
  return await langchainService.validatePipeline(pipeline)
})

export const executePipelineThunk = createAsyncThunk<
  PipelineExecution,
  { pipeline: PipelineDefinition; inputs: Record<string, string> }
>('langchain/execute', async ({ pipeline, inputs }) => {
  return await langchainService.executePipeline(pipeline, inputs)
})

const langchainSlice = createSlice({
  name: 'langchain',
  initialState,
  reducers: {
    resetExecution(state) {
      state.execution = null
      state.validationErrors = []
    },
  },
  extraReducers: (builder) => {
    builder
      // Validate
      .addCase(validatePipelineThunk.pending, (state) => {
        state.isValidating = true
        state.validationErrors = []
      })
      .addCase(validatePipelineThunk.fulfilled, (state, action) => {
        state.isValidating = false
        state.validationErrors = action.payload.errors
      })
      .addCase(validatePipelineThunk.rejected, (state, action) => {
        state.isValidating = false
        state.validationErrors = [action.error.message || 'Validation failed']
      })
      // Execute
      .addCase(executePipelineThunk.pending, (state) => {
        state.execution = {
          id: '',
          status: 'running',
          logs: [],
        }
      })
      .addCase(executePipelineThunk.fulfilled, (state, action) => {
        state.execution = action.payload
      })
      .addCase(executePipelineThunk.rejected, (state, action) => {
        state.execution = {
          id: '',
          status: 'error',
          error: action.error.message || 'Execution failed',
          logs: [],
        }
      })
  },
})

export const { resetExecution } = langchainSlice.actions
export default langchainSlice.reducer
