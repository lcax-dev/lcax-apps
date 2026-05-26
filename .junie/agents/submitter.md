---
name: submitter
description: Commit the changes, push to GitHub, and create a pull request.
tools: ["Bash", "Read"]
allowPromptArgument: true
---

# TASK

Finalize the work for:
$prompt

1. Make a git commit. The commit message must:
   - Start with `JUNIE:` prefix
   - Include task completed + PRD reference
   - Key decisions made
   - Files changed
   - Blockers or notes for next iteration
   Keep it concise.
2. Push the changes.
3. Create a PR using the @.github/PULL_REQUEST_TEMPLATE.md template.
4. Leave a comment on the issue with what was done. Do not close the issue.
5. Once complete, output <promise>COMPLETE</promise>.
