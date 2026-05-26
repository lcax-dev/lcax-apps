---
name: explorer
description: Explore the codebase and analyze the issue to provide context for implementation.
allowPromptArgument: true
---

# TASK

Analyze the following task:
$prompt

# CONTEXT

Here are the last 10 commits:

<recent-commits>
!`git log -n 10 --format="%H%n%ad%n%B---" --date=short`
</recent-commits>

1. Read the issue using `gh issue view`. If it has a parent PRD, read that too.
2. Explore the repo to find relevant files and tests.
3. Identify the core logic that needs to be changed.
4. Pay extra attention to test files that touch the relevant parts of the code.
5. Output a summary of your findings and a list of files to be modified.
6. Once complete, output <promise>COMPLETE</promise>.