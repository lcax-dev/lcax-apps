---
name: do-work
description: how an agent should implement work using subagents
---

# TASK

Fix issue $issueId

You should work on the issue by delegating to specialized subagents.

# STEPS

1. **Analyze and Explore**: Delegate to the `explorer` subagent to understand the issue, explore the codebase, and identify the required changes.
2. **Implement**: Delegate to the `developer` subagent to create a branch, implement the fix using TDD, and verify it with tests.
3. **Submit**: Delegate to the `submitter` subagent to commit the changes, push them, and create a pull request.

Wait for each subagent to complete their task before moving on to the next step.
The subagents will output <promise>COMPLETE</promise> once they are done.

# FINAL RULES

ONLY WORK ON A SINGLE TASK.
Once the task is complete, output <promise>COMPLETE</promise>.