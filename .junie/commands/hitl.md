---
name: hitl
description: Develop tasks with a Human in the Loop
---

# INPUTS

A task have been provided to you. Read it to understand the task, by looking up the task `gh issue view $taskId`

Review the last few commits to understand what work has been done. See the commits by running `git log -n 5 --format="%H%n%ad%n%B---" --date=short 2>/dev/null || echo "No commits found"` 

If there are no more tasks to complete, output <promise>NO MORE TASKS</promise>.

# EXPLORATION

Explore the repo.

# IMPLEMENTATION

Complete the task.

# FEEDBACK LOOPS

Before committing, run the feedback loops:

- `npm run lint` to run the linting
- `npm run format` to check formatting 
- `npm run tsc` to check the types
# COMMIT

Make a git commit. The commit message must:

1. Include key decisions made
2. Include files changed
3. Blockers or notes for next iteration

# FINAL RULES

ONLY WORK ON A SINGLE TASK.