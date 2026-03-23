---
name: hitl
description: Develop tasks with a Human in the Loop
---

# INPUTS

A PRD have been provided to you. Read it to understand the PRD, by looking up the PRD `gh issue view $taskId`

Review the last few commits to understand what work has been done. See the commits by running `git log -n 5 --format="%H%n%ad%n%B---" --date=short 2>/dev/null || echo "No commits found"` 

Look up the sub-issues in the PRD.
Decide which sub-issue to work on next.
This should be the one YOU decide has the highest priority – not necessarily the first in the list.
Only select sub-issues which have the "Ready" status.

If there are no more sub-issues to complete, output <promise>NO MORE TASKS</promise>.

Once you have decided on a sub-issue, set that status to `In progress` in the GitHub project board.

# EXPLORATION

Explore the repo.

# IMPLEMENTATION

Complete the task.

# FEEDBACK LOOPS

Before committing, run the feedback loops:

- `npm run lint` to run the linting
- `npm run format` to check formatting 
- `npm run tsc` to check the types
- `npm run build` to check the build

# COMMIT

Make a git commit. The commit message must:

1. Include key decisions made
2. Include files changed
3. Blockers or notes for next iteration
4. Follow conventional commit format

# Done
Move sub-issues status to `In review` in the GitHub project board.

# FINAL RULES

ONLY WORK ON A SINGLE SUB-ISSUE