'use client'

import ProblemPage from '@/components/ProblemPage'
import { getProblem } from '@/data/problems'

const Content = () => <ProblemPage problem={getProblem('akne-behandlung')} />

export default Content
