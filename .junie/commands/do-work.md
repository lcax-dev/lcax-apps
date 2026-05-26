---
name: do-work
description: how an agent should implement work
---

# TASK

Fix issue $issueId

Read the issue. If it has a parent PRD, read that too.
Use the [issue tracker's](/docs/agents/issue-tracker.md) list issue to do so.

Only work on the issue specified.

Create a branch name using the format `junie/{id}-{slug}`.
Work on that branch. Make commits and run tests.

# CONTEXT

Here are the last 10 commits:

<recent-commits>

!`git log -n 10 --format="%H%n%ad%n%B---" --date=short`

</recent-commits>

# EXPLORATION

Explore the repo and fill your context window with relevant information that will allow you to complete the task.

Pay extra attention to test files that touch the relevant parts of the code.

# EXECUTION

If applicable, use RGR and the tdd skill to complete the task.

1. RED: write one test
2. GREEN: write the implementation to pass that test
3. REPEAT until done
4. REFACTOR the code

# FEEDBACK LOOPS

Before committing, run `npm run check` and `npm run test` to ensure the tests pass.

# COMMIT

Make a git commit. The commit message must:

1. Start with `JUNIE:` prefix
2. Include task completed + PRD reference
3. Key decisions made
4. Files changed
5. Blockers or notes for next iteration

Keep it concise.

# THE ISSUE

When the task is complete, leave a comment on the issue with what was done.
Do not close the issue - this will be done later.

Push the changes and create a PR using the @.github/PULL_REQUEST_TEMPLATE.md template.

Once complete, output <promise>COMPLETE</promise>.

# FINAL RULES

ONLY WORK ON A SINGLE TASK.