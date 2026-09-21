import { scheduleDailyHighlightsJob } from './daily-highlights.job.js'

export function startJobs() {
    scheduleDailyHighlightsJob()
}
