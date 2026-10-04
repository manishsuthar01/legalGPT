-- ==============================================================================
-- LegalGPT Database Migration: contracts and analysis_reports
-- Execute this script in your Supabase SQL Editor:
-- Dashboard -> SQL Editor -> New query -> Run
-- ==============================================================================

-- 1. Enable required PostgreSQL extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create `contracts` table for persistent document metadata
CREATE TABLE IF NOT EXISTS public.contracts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id TEXT NOT NULL,
    file_name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    file_size BIGINT,
    mime_type TEXT,
    country TEXT NOT NULL DEFAULT 'US',
    status TEXT NOT NULL CHECK (status IN ('pending', 'processing', 'completed', 'failed')) DEFAULT 'pending',
    risk_score INTEGER CHECK (risk_score IS NULL OR (risk_score >= 0 AND risk_score <= 100)),
    overall_risk TEXT CHECK (overall_risk IS NULL OR overall_risk IN ('LOW', 'MEDIUM', 'HIGH')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indices for rapid querying by user, status, and creation date
CREATE INDEX IF NOT EXISTS idx_contracts_user_id ON public.contracts(user_id);
CREATE INDEX IF NOT EXISTS idx_contracts_status ON public.contracts(status);
CREATE INDEX IF NOT EXISTS idx_contracts_created_at ON public.contracts(created_at DESC);

-- 3. Create `analysis_reports` table for finalized legal advisory reports
CREATE TABLE IF NOT EXISTS public.analysis_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contract_id UUID NOT NULL REFERENCES public.contracts(id) ON DELETE CASCADE,
    summary TEXT NOT NULL,
    overall_risk TEXT NOT NULL CHECK (overall_risk IN ('LOW', 'MEDIUM', 'HIGH')),
    risk_score INTEGER NOT NULL CHECK (risk_score >= 0 AND risk_score <= 100),
    risk_score_breakdown JSONB NOT NULL DEFAULT '{}'::jsonb,
    risk_cards JSONB NOT NULL DEFAULT '[]'::jsonb,
    advisor_feedback JSONB NOT NULL DEFAULT '[]'::jsonb,
    reviewer_feedback JSONB NOT NULL DEFAULT '[]'::jsonb,
    positive_findings JSONB NOT NULL DEFAULT '[]'::jsonb,
    missing_clauses JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_analysis_reports_contract_id ON public.analysis_reports(contract_id);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analysis_reports ENABLE ROW LEVEL SECURITY;

-- 5. Row Level Security Policies for `contracts`
DROP POLICY IF EXISTS "Users can view their own contracts" ON public.contracts;
CREATE POLICY "Users can view their own contracts"
    ON public.contracts FOR SELECT
    USING (auth.uid()::text = user_id);

DROP POLICY IF EXISTS "Users can insert their own contracts" ON public.contracts;
CREATE POLICY "Users can insert their own contracts"
    ON public.contracts FOR INSERT
    WITH CHECK (auth.uid()::text = user_id);

DROP POLICY IF EXISTS "Users can update their own contracts" ON public.contracts;
CREATE POLICY "Users can update their own contracts"
    ON public.contracts FOR UPDATE
    USING (auth.uid()::text = user_id);

DROP POLICY IF EXISTS "Users can delete their own contracts" ON public.contracts;
CREATE POLICY "Users can delete their own contracts"
    ON public.contracts FOR DELETE
    USING (auth.uid()::text = user_id);

-- 6. Row Level Security Policies for `analysis_reports`
DROP POLICY IF EXISTS "Users can view analysis reports for their contracts" ON public.analysis_reports;
CREATE POLICY "Users can view analysis reports for their contracts"
    ON public.analysis_reports FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.contracts
            WHERE public.contracts.id = public.analysis_reports.contract_id
            AND public.contracts.user_id = auth.uid()::text
        )
    );

DROP POLICY IF EXISTS "Users can insert analysis reports for their contracts" ON public.analysis_reports;
CREATE POLICY "Users can insert analysis reports for their contracts"
    ON public.analysis_reports FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.contracts
            WHERE public.contracts.id = public.analysis_reports.contract_id
            AND public.contracts.user_id = auth.uid()::text
        )
    );

DROP POLICY IF EXISTS "Users can update analysis reports for their contracts" ON public.analysis_reports;
CREATE POLICY "Users can update analysis reports for their contracts"
    ON public.analysis_reports FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.contracts
            WHERE public.contracts.id = public.analysis_reports.contract_id
            AND public.contracts.user_id = auth.uid()::text
        )
    );

DROP POLICY IF EXISTS "Users can delete analysis reports for their contracts" ON public.analysis_reports;
CREATE POLICY "Users can delete analysis reports for their contracts"
    ON public.analysis_reports FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM public.contracts
            WHERE public.contracts.id = public.analysis_reports.contract_id
            AND public.contracts.user_id = auth.uid()::text
        )
    );
